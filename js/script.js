// 온보딩 페이지 자동 넘어가기
setTimeout(() => {
  window.location.href = "login.html";
}, 2000);

// 로그인 more+btn 눌렀을때 드롭다운
function toggleMenu() {
  const dropdown = document.getElementById("dropdown");
  dropdown.classList.toggle("show");
}

// 다른 곳 클릭시 드롭다운 닫기
document.addEventListener("click", (e) => {
  if (!e.target.closest("#saveAccount")) {
    document.getElementById("dropdown")?.classList.remove("show");
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

// ─── State ────────────────────────────────────────────────────────────────────
const MAX_GENRES = 3;
let selectedGenres = new Set();
let selectedFocus = null;
let currentScreen = "screenGenre"; // HTML id 기준: screenGenre | screenFocus | screenComplete

// ─── Screen navigation ────────────────────────────────────────────────────────

function showScreen(id) {
  const current = document.querySelector(".screen.active");
  const next = document.getElementById(id);
  if (!current || !next || next === current) return;

  // 현재 화면 → exit-left, absolute
  current.classList.remove("active");
  current.classList.add("exit-left");

  // 다음 화면 → active, relative
  next.style.position = "relative";
  next.classList.add("active");

  currentScreen = id;

  // 애니메이션 끝난 후 exit 화면 정리
  setTimeout(() => {
    current.classList.remove("exit-left");
    current.style.position = "absolute";
  }, 400);
}

function goBack() {
  if (currentScreen === "screenFocus") showScreen("screenGenre");
  if (currentScreen === "screenComplete") showScreen("screenFocus");
}

// ─── Toast ────────────────────────────────────────────────────────────────────

function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2500);
}

// ─── Genre: 이미지 교체 ──────────────────────────────────────────────────────

function hoverCard(el) {
  // 호버 시 이미지 교체 없음 — CSS scale만 동작
}

function unhoverCard(el) {
  // 호버 해제 시 이미지 교체 없음
}

function setCardImage(el, state) {
  // 클릭(선택/해제) 시에만 이미지 교체
  const img = el.querySelector(".genre-icon");
  if (!img) return;
  img.src = state === "active" ? el.dataset.imgActive : el.dataset.imgDefault;
}

// ─── Genre: 선택 토글 ────────────────────────────────────────────────────────

function toggleGenre(el, name) {
  if (el.classList.contains("selected")) {
    // 선택 해제
    el.classList.remove("selected");
    selectedGenres.delete(name);
    setCardImage(el, "default");
  } else {
    // 최대 개수 초과
    if (selectedGenres.size >= MAX_GENRES) {
      showToast("최대 3가지까지만 선택할 수 있어요");
      el.style.animation = "shake 0.3s ease";
      setTimeout(() => (el.style.animation = ""), 300);
      return;
    }
    // 선택
    el.classList.add("selected");
    selectedGenres.add(name);
    setCardImage(el, "active");
  }
  updateGenreUI();
}

function updateGenreUI() {
  const countEl = document.getElementById("genre-count");
  const btn = document.getElementById("genreBtn");
  const count = selectedGenres.size;

  if (countEl) countEl.textContent = count;
  btn.className = count > 0 ? "btn-primary active" : "btn-primary inactive";
}

function onGenreConfirm() {
  if (selectedGenres.size === 0) return;
  showScreen("screenFocus");
}

function skipGenre() {
  document.getElementById("skip-modal").classList.add("show");
}

function closeSkipModal(skip) {
  document.getElementById("skip-modal").classList.remove("show");
  if (skip) showScreen("screenFocus");
}

// ─── Focus mode ───────────────────────────────────────────────────────────────

function selectFocus(el) {
  // 이전 선택 해제
  document
    .querySelectorAll(".focus-card")
    .forEach((c) => c.classList.remove("selected"));

  // 현재 카드 선택
  el.classList.add("selected");
  selectedFocus = el.querySelector(".focus-pct").textContent;

  // 카운터, 버튼, 노트 업데이트
  const focusCountEl = document
    .getElementById("screenFocus")
    .querySelector("#genre-count");
  if (focusCountEl) focusCountEl.textContent = "1";

  document.getElementById("focusBtn").className = "btn-primary active";
  document.getElementById("focusNote").textContent =
    "선택을 완료하여 빠른페이지로 남겨집니다.";
}

function onFocusConfirm() {
  if (!selectedFocus) return;
  showScreen("screenComplete");
}

function skipFocus() {
  showScreen("screenComplete");
}

// ─── Complete ─────────────────────────────────────────────────────────────────

function goHome() {
  showToast("메인 화면으로 이동합니다");
  setTimeout(() => {
    // 실제 서비스에서는 window.location.href = '/main' 등으로 교체
    alert("✅ 온보딩 완료! 메인 페이지로 이동합니다.");
  }, 300);
}

// ─── Entry point (index.html에서 로그인 / 게스트 후 호출) ─────────────────────

window.startOnboarding = function () {
  showScreen("screenGenre");
};
