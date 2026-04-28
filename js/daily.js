/* =====================
   랭킹 슬라이드
   ===================== */
const rankingList = document.querySelector(".ranking-list");
const rankingCards = document.querySelectorAll(".ranking-list .rec-card");
const rdots = document.querySelectorAll(".rdot");
let currentRank = 0;

function goToRank(index) {
  currentRank = Math.max(0, Math.min(index, rankingCards.length - 1));
  const cardWidth = rankingCards[0].offsetWidth + 10;
  rankingList.scrollTo({ left: currentRank * cardWidth, behavior: "smooth" });
  updateRdots();
}

function updateRdots() {
  rdots.forEach((d, i) => d.classList.toggle("active", i === currentRank));
}

if (rankingList) {
  let touchStartX = 0;
  let touchStartY = 0;
  let mouseStartX = 0;
  let isDown = false;

  rankingList.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    },
    { passive: true },
  );

  rankingList.addEventListener(
    "touchmove",
    (e) => {
      const dx = Math.abs(e.changedTouches[0].screenX - touchStartX);
      const dy = Math.abs(e.changedTouches[0].screenY - touchStartY);
      if (dx > dy) e.preventDefault();
    },
    { passive: false },
  );

  rankingList.addEventListener("touchend", (e) => {
    const diff = touchStartX - e.changedTouches[0].screenX;
    if (Math.abs(diff) > 50) {
      goToRank(diff > 0 ? currentRank + 1 : currentRank - 1);
    }
  });

  rankingList.addEventListener("mousedown", (e) => {
    e.preventDefault();
    isDown = true;
    mouseStartX = e.clientX;
  });

  rankingList.addEventListener("mouseup", (e) => {
    if (!isDown) return;
    isDown = false;
    const diff = mouseStartX - e.clientX;
    if (Math.abs(diff) > 50) {
      goToRank(diff > 0 ? currentRank + 1 : currentRank - 1);
    }
  });

  rankingList.addEventListener("scroll", () => {
    const cardWidth = rankingCards[0].offsetWidth + 10;
    currentRank = Math.round(rankingList.scrollLeft / cardWidth);
    updateRdots();
  });
}

rdots.forEach((dot, i) => {
  dot.addEventListener("click", () => goToRank(i));
});

/* =====================
   요일 탭 전환
   ===================== */
const dayTabs = document.querySelectorAll(".day-tab");

dayTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    dayTabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");
    renderWebtoonGrid(tab.dataset.day);
  });
});

// function renderWebtoonGrid(day) {
//   const grid = document.getElementById("webtoonGrid");
//   const count = 18;
//   grid.innerHTML = Array.from(
//     { length: count },
//     (_, i) => `
//     <div class="webtoon-card">
//       <div class="webtoon-thumb"></div>
//       <p class="webtoon-card-title">제목</p>
//     </div>
//   `,
//   ).join("");
// }

/* =====================
   정렬 탭
   ===================== */
const sortTabs = document.querySelectorAll(".sort-tab");

sortTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    sortTabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");
  });
});

/* =====================
   하단 네비게이션
   ===================== */
const navItems = document.querySelectorAll(".nav-item");

const navIcons = [
  { inactive: "assets/icons/홈1.png", active: "assets/icons/홈2.png" },
  { inactive: "assets/icons/웹툰1.png", active: "assets/icons/웹툰2.png" },
  { inactive: "assets/icons/관심1.png", active: "assets/icons/관심2.png" },
  { inactive: "assets/icons/마이1.png", active: "assets/icons/마이2.png" },
  { inactive: "assets/icons/알림1.png", active: "assets/icons/알림2.png" },
];

navItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    navItems.forEach((n, i) => {
      n.classList.remove("active");
      n.querySelector(".nav-icon").src = navIcons[i].inactive;
    });
    item.classList.add("active");
    item.querySelector(".nav-icon").src = navIcons[index].active;
  });
});
