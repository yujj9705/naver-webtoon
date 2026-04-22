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
let gender = `male`;
let nation = "domestic";

// 약관 동의 토글
function toggleTerms() {
  termsAgreed = !termsAgreed;

  const termsCheckImg = document.getElementById("termsCheckImg");
  const termsBox = document.getElementById("termsBox");
  const items = document.querySelectorAll(".item-check");
  const detail = document.getElementById("termsDetail");
  const arrow = document.getElementById("termsArrow");

  if (termsAgreed) {
    termsCheckImg.src = "assets/icons/가입-체크h.png";
    termsBox.style.borderColor = "#00dc64";
    items.forEach(
      (i) =>
        (i.style.filter =
          "invert(48%) sepia(90%) saturate(400%) hue-rotate(100deg)"),
    );
    detail.classList.add("collapsed");
    arrow.src = "assets/icons/가입-다운.png";
    arrow.alt = "전체페이지 펼치기";
  } else {
    termsCheckImg.src = "assets/icons/가입-체크.png";
    termsBox.style.borderColor = "";
    items.forEach((i) => (i.style.filter = ""));
    detail.classList.remove("collapsed");
    arrow.src = "assets/icons/가입-업.png";
    arrow.alt = "전체페이지 접기";
  }

  checkNextBtn();
}

// 성별 선택 — HTML id 기준 (maleBtn / femaleBtn)
function selectGender(g) {
  gender = g;
  document.getElementById("maleBtn").classList.toggle("active", g === "male");
  document
    .getElementById("femaleBtn")
    .classList.toggle("active", g === "female");
  checkNextBtn();
}

// 내/외국인 선택 — HTML id 기준 (domesticBtn / foriegnBtn), onclick="selectNational()" 기준
function selectNational(n) {
  nation = n;
  document
    .getElementById("domesticBtn")
    .classList.toggle("active", n === "domestic");
  document
    .getElementById("foriegnBtn")
    .classList.toggle("active", n === "foreign");
}

// 인증요청 — HTML onclick="sendCode()" 기준
function sendCode() {
  const phone = document.getElementById("phoneInput").value;
  if (!phone) return;

  // 인증번호 입력행 표시
  document.getElementById("codeRow").classList.remove("hidden");

  // .code div(시간연장 포함) + 메시지 표시
  const codeDiv = document.querySelector(".code");
  const codeMsg = document.getElementById("codeMsg");
  codeDiv.classList.remove("hidden");
  codeMsg.classList.remove("hidden");

  // 버튼 텍스트 → 재요청
  const verifyBtn = document.getElementById("verifyBtn");
  verifyBtn.textContent = "재요청";
  verifyBtn.classList.add("active");

  startTimer();
  checkNextBtn();
}

// 타이머 시작
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

// 타이머 표시 — timerText span만 업데이트해서 시계 아이콘 img 보존
function updateTimerDisplay() {
  const min = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const sec = String(timeLeft % 60).padStart(2, "0");
  const timerText = document.getElementById("timerText");
  if (timerText) {
    timerText.textContent = `${min}분 ${sec}초`;
  }
}

// 시간 연장
function extendTime() {
  timeLeft = 293;
  updateTimerDisplay();
}

// 다음 버튼 활성화 조건 검사
function checkNextBtn() {
  const name = document.getElementById("nameInput").value;
  const birth = document.getElementById("birthInput").value;
  const phone = document.getElementById("phoneInput").value;
  const codeRow = document.getElementById("codeRow");
  const codeInput = document.getElementById("codeInput");
  const code = codeInput ? codeInput.value : "";
  const btn = document.getElementById("nextBtn");

  // 인증번호 행이 보일 때만 code 검사
  const codeVisible = !codeRow.classList.contains("hidden");

  const valid =
    termsAgreed &&
    name.trim() !== "" &&
    birth.length === 8 &&
    gender !== null &&
    phone.length >= 10 &&
    (codeVisible ? code.length === 6 : true);

  btn.disabled = !valid;
}

// 다음 버튼 클릭
function goNext() {
  window.location.href = "";
}

// 입력 변화 감지
document.addEventListener("input", checkNextBtn);
