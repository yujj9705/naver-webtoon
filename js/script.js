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
