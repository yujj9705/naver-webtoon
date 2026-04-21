// // 온보딩 페이지 자동 넘어가기
// setTimeout(() => {
//   window.location.href = 'login.html';
// }, 2000);

// 로그인 more+btn 눌렀을때 드롭다운
function toggleMenu() {
  const dropdown = document.getElementById("dropdown");
  dropdown.classList.toggle("show");
}

// 다른 곳 클릭시 드롭다운 닫기
document.addEventListener("click", (e) => {
  if (!e.target.closest("#saveAccount")) {
    document.getElementById("dropdown").classList.remove("show");
  }
});

// signup
let timerInterval = null;
let timeLeft = 293; // 4분 53초
let termsAgreed = false;
let gender = null;
let nation = "domestic";

// 약관 토글
function toggleTerms() {
  termsAgreed = !termsAgreed;
  const img = document.getElementById("termsCheckImg");
  const header = document.querySelector(".terms-header");
  const items = document.querySelectorAll(".item-check");

  if (termsAgreed) {
    header.style.borderColor = "#00C73C";
    items.forEach(
      (i) =>
        (i.style.filter =
          "invert(48%) sepia(90%) saturate(400%) hue-rotate(100deg)"),
    );
  } else {
    header.style.borderColor = "";
    items.forEach((i) => (i.style.filter = ""));
  }
  checkNextBtn();
}

// 성별 선택
function selectGender(g) {
  gender = g;
  document.getElementById("btnMale").classList.toggle("active", g === "male");
  document
    .getElementById("btnFemale")
    .classList.toggle("active", g === "female");
  checkNextBtn();
}

// 내/외국인 선택
function selectNation(n) {
  nation = n;
  document
    .getElementById("btnDomestic")
    .classList.toggle("active", n === "domestic");
  document
    .getElementById("btnForeign")
    .classList.toggle("active", n === "foreign");
}

// 인증요청
function requestCode() {
  const phone = document.getElementById("phoneInput").value;
  if (!phone) return;

  document.getElementById("codeRow").classList.remove("hidden");
  document.getElementById("codeMsg").classList.remove("hidden");
  document.getElementById("verifyBtn").textContent = "재요청";
  document.getElementById("verifyBtn").classList.add("active");

  startTimer();
  checkNextBtn();
}

// 타이머
function startTimer() {
  if (timerInterval) clearInterval(timerInterval);
  timeLeft = 293;
  updateTimerDisplay();
  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();
    if (timeLeft <= 0) clearInterval(timerInterval);
  }, 1000);
}

function updateTimerDisplay() {
  const min = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const sec = String(timeLeft % 60).padStart(2, "0");
  document.getElementById("timer").textContent = `${min}분 ${sec}초`;
}

function extendTime() {
  timeLeft = 293;
  updateTimerDisplay();
}

// 다음 버튼 활성화
function checkNextBtn() {
  const name = document.getElementById("nameInput").value;
  const birth = document.getElementById("birthInput").value;
  const phone = document.getElementById("phoneInput").value;
  const code = document.getElementById("codeInput")?.value;
  const btn = document.getElementById("nextBtn");

  const valid =
    termsAgreed &&
    name &&
    birth.length === 8 &&
    gender &&
    phone.length >= 10 &&
    code;
  btn.disabled = !valid;
}

// 입력 변화 감지
document.addEventListener("input", checkNextBtn);
