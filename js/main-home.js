(() => {
  //  맞춤형 추천 슬라이드

  const recommendList = document.querySelector(".recommend-list");
  const recCards = document.querySelectorAll(".rec-card");
  let currentCard = 0;

  function goToCard(index) {
    currentCard = Math.max(0, Math.min(index, recCards.length - 1));
    const cardWidth = recCards[0].offsetWidth + 10;
    recommendList.scrollTo({
      left: currentCard * cardWidth,
      behavior: "smooth",
    });
  }

  if (recommendList) {
    let touchStartX = 0;
    let touchStartY = 0;
    let mouseStartX = 0;
    let isDown = false;

    recommendList.addEventListener(
      "touchstart",
      (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
      },
      { passive: true },
    );

    recommendList.addEventListener(
      "touchmove",
      (e) => {
        const dx = Math.abs(e.changedTouches[0].screenX - touchStartX);
        const dy = Math.abs(e.changedTouches[0].screenY - touchStartY);
        if (dx > dy) e.preventDefault(); // 가로 스와이프일 때만 세로 스크롤 막기
      },
      { passive: false },
    );

    recommendList.addEventListener("touchend", (e) => {
      const diff = touchStartX - e.changedTouches[0].screenX;
      if (Math.abs(diff) > 50) {
        goToCard(diff > 0 ? currentCard + 1 : currentCard - 1);
      }
    });

    recommendList.addEventListener("mousedown", (e) => {
      e.preventDefault();
      isDown = true;
      mouseStartX = e.clientX;
    });

    recommendList.addEventListener("mouseup", (e) => {
      if (!isDown) return;
      isDown = false;
      const diff = mouseStartX - e.clientX;
      if (Math.abs(diff) > 50) {
        goToCard(diff > 0 ? currentCard + 1 : currentCard - 1);
      }
    });

    recommendList.addEventListener("scroll", () => {
      const cardWidth = recCards[0].offsetWidth + 10;
      currentCard = Math.round(recommendList.scrollLeft / cardWidth);
    });
  }

  /* =====================
   모달 (맞춤형 설정)
   ===================== */
  const modal = document.getElementById("modal");

  function openModal() {
    modal.classList.add("show");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.remove("show");
    document.body.style.overflow = "";
  }

  // 설정 버튼 클릭
  const settingBtn = document.querySelector(".choice-setting button");
  if (settingBtn) {
    settingBtn.addEventListener("click", openModal);
  }

  // 모달 바깥 클릭 시 닫기
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });
  }

  /* =====================
   장르 선택 (다중)
   ===================== */
  let selectedGenres = ["판타지", "코믹", "액션"]; // 기본값

  function toggleGenre(btn) {
    const checked = document.querySelectorAll("#genreOptions button.selected");

    if (btn.classList.contains("selected")) {
      btn.classList.remove("selected");
    } else {
      if (checked.length >= 3) return;
      btn.classList.add("selected");
    }
  }

  /* =====================
   집중도 선택 (단일)
   ===================== */
  let selectedFocus = "슬슬 빠지는 중"; // 기본값

  function selectFocus(btn) {
    document
      .querySelectorAll("#focusOptions button")
      .forEach((b) => b.classList.remove("selected"));
    btn.classList.add("selected");
    selectedFocus = btn.textContent;
  }

  /* =====================
   적용하기
   ===================== */
  function applySelection() {
    // 장르 업데이트
    const checkedGenres = document.querySelectorAll(
      "#genreOptions button.selected",
    );
    selectedGenres = Array.from(checkedGenres).map((b) => b.textContent);

    const genreContainer = document.getElementById("selectedGenres");
    if (genreContainer) {
      genreContainer.innerHTML =
        selectedGenres.length > 0
          ? selectedGenres.map((g) => `<span># ${g}</span>`).join("")
          : "<span>선택 없음</span>";
    }

    // 집중도 업데이트
    const focusContainer = document.getElementById("selectedFocus");
    if (focusContainer) {
      focusContainer.innerHTML = `<span># ${selectedFocus}</span>`;
    }

    closeModal();
  }

  /* =====================
   모달 초기 선택 상태 반영
   ===================== */
  window.addEventListener("DOMContentLoaded", () => {
    // 기본 장르 선택 표시
    document.querySelectorAll("#genreOptions button").forEach((btn) => {
      if (selectedGenres.includes(btn.textContent)) {
        btn.classList.add("selected");
      }
    });

    // 기본 집중도 선택 표시
    document.querySelectorAll("#focusOptions button").forEach((btn) => {
      if (btn.textContent === selectedFocus) {
        btn.classList.add("selected");
      }
    });
  });

  /* =====================
   최근 본 웹툰 슬라이드 화살표
   ===================== */
  const recentList = document.querySelector(".recent-list");
  const prevBtn = document.querySelector(".slide-arrow.prev");
  const nextBtn = document.querySelector(".slide-arrow.next");

  if (prevBtn && recentList) {
    prevBtn.addEventListener("click", () => {
      recentList.scrollBy({ left: -128, behavior: "smooth" });
    });
  }

  if (nextBtn && recentList) {
    nextBtn.addEventListener("click", () => {
      recentList.scrollBy({ left: 128, behavior: "smooth" });
    });
  }

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
    {
      inactive: "assets/icons/마이1.png",
      active: "assets/icons/마이2.png",
      href: "my-page.html",
    },
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

      // href 있을 때만 이동
      if (navIcons[index].href) {
        window.location.href = navIcons[index].href;
      }
    });
  });
  /* =====================
   탭 전환 (추천웹툰 / 요일웹툰 / 베스트도전)
   ===================== */
  const tabBtns = document.querySelectorAll(".tab-btn");
  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });
})();
