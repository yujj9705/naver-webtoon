/* =====================
   랭킹 슬라이드
   ===================== */
const rankingSlide = document.querySelector(".ranking-list-slide");
const rankCards = document.querySelectorAll(".rank-card");
const rdots = document.querySelectorAll(".rdot");
let currentRank = 0;
let autoSlideTimer = null;

function goToRank(index) {
  const total = rankCards.length;
  currentRank = (index + total) % total;
  const card = rankCards[0];
  const cardWidth = card.offsetWidth + 10;
  rankingSlide.scrollTo({ left: currentRank * cardWidth, behavior: "smooth" });
  updateRdots();
}

function updateRdots() {
  rdots.forEach((d, i) => d.classList.toggle("active", i === currentRank));
}

function startAutoSlide() {
  stopAutoSlide();
  autoSlideTimer = setInterval(() => {
    goToRank(currentRank + 1);
  }, 4000);
}

function stopAutoSlide() {
  if (autoSlideTimer) {
    clearInterval(autoSlideTimer);
    autoSlideTimer = null;
  }
}

if (rankingSlide && rankCards.length > 0) {
  // 터치 스와이프
  let touchStartX = 0;
  rankingSlide.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
      stopAutoSlide();
    },
    { passive: true },
  );

  rankingSlide.addEventListener("touchend", (e) => {
    const diff = touchStartX - e.changedTouches[0].screenX;
    if (Math.abs(diff) > 50) {
      goToRank(diff > 0 ? currentRank + 1 : currentRank - 1);
    }
    startAutoSlide();
  });

  // 마우스 드래그
  let mouseStartX = 0;
  let isDown = false;
  rankingSlide.addEventListener("mousedown", (e) => {
    e.preventDefault();
    isDown = true;
    mouseStartX = e.clientX;
    stopAutoSlide();
  });
  rankingSlide.addEventListener("mouseup", (e) => {
    if (!isDown) return;
    isDown = false;
    const diff = mouseStartX - e.clientX;
    if (Math.abs(diff) > 50) {
      goToRank(diff > 0 ? currentRank + 1 : currentRank - 1);
    }
    startAutoSlide();
  });

  // 스크롤 위치 동기화
  rankingSlide.addEventListener("scroll", () => {
    if (rankCards[0].offsetWidth === 0) return;
    const cardWidth = rankCards[0].offsetWidth + 10;
    currentRank = Math.round(rankingSlide.scrollLeft / cardWidth);
    updateRdots();
  });

  // 인디케이터 클릭
  rdots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      goToRank(i);
      stopAutoSlide();
      startAutoSlide();
    });
  });

  // 자동슬라이드 시작
  startAutoSlide();
}
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
  {
    inactive: "assets/icons/홈1.png",
    active: "assets/icons/홈2.png",
    href: "main-home.html",
  },
  {
    inactive: "assets/icons/웹툰1.png",
    active: "assets/icons/웹툰2.png",
    href: "daily.html",
  },
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

    if (navIcons[index].href) {
      window.location.href = navIcons[index].href;
    }
  });
});
