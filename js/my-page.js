/* ============================================================
   my-page.js
   취향달력 + MY 페이지 전체 동작
   ============================================================ */

// ── 8가지 장르 정의 ────────────────────────────────────────────
// icon 경로는 실제 assets/icons/ 폴더 기준
const GENRES = {
  romance: { name: "로맨스", icon: "assets/icons/로맨스.png" },
  fantasy: { name: "판타지", icon: "assets/icons/판타지.png" },
  drama: { name: "드라마", icon: "assets/icons/드라마.png" },
  action: { name: "액션", icon: "assets/icons/액션.png" },
  horror: { name: "공포", icon: "assets/icons/공포.png" },
  gag: { name: "개그", icon: "assets/icons/개그.png" },
  mystery: { name: "미스터리", icon: "assets/icons/미스터리.png" },
  new: { name: "신규", icon: "assets/icons/신규.png" },
};

// ── 달력 상태 ──────────────────────────────────────────────────
let currentYear = 2026;
let currentMonth = 3; // 0-index: 3 = April

/**
 * 날짜 → 장르 키 매핑
 * 키: "YYYY-M-D" (월은 0-index)
 * 실제 서비스에서는 API로 받아옴
 */
const calendarData = {
  "2026-3-1": "romance",
  "2026-3-2": "romance",
  "2026-3-3": "fantasy",
  "2026-3-4": "romance",
  "2026-3-5": "romance",
  "2026-3-6": "fantasy",
  "2026-3-7": "romance",
  "2026-3-8": "romance",
  "2026-3-9": "drama",
  "2026-3-10": "drama",
  "2026-3-11": "romance",
  "2026-3-12": "romance",
  "2026-3-13": "romance",
  "2026-3-14": "romance",
  "2026-3-15": "fantasy",
  "2026-3-16": "romance",
  "2026-3-17": "action",
  "2026-3-18": "action",
  "2026-3-19": "mystery",
  "2026-3-20": "romance",
  "2026-3-21": "horror",
  "2026-3-22": "gag",
  "2026-3-23": "drama",
  "2026-3-24": "action",
  "2026-3-25": "fantasy",
  "2026-3-26": "romance",
};

// ── 달력 렌더링 ────────────────────────────────────────────────
function renderCalendar(year, month) {
  const grid = document.querySelector(".calendar-grid");
  if (!grid) return;

  // 요일 헤더 보존 후 날짜 셀만 제거
  const headers = Array.from(grid.querySelectorAll(".cal-day-header"));
  grid.innerHTML = "";
  headers.forEach((h) => grid.appendChild(h));

  const today = new Date();
  const firstDay = new Date(year, month, 1).getDay(); // 0=Sun
  // MON 기준 오프셋 (MON=0 … SUN=6)
  const offset = firstDay === 0 ? 6 : firstDay - 1;
  const lastDate = new Date(year, month + 1, 0).getDate();

  // 앞 빈칸
  for (let i = 0; i < offset; i++) {
    const el = document.createElement("div");
    el.className = "cal-cell empty";
    grid.appendChild(el);
  }

  // 날짜 셀
  for (let d = 1; d <= lastDate; d++) {
    const key = `${year}-${month}-${d}`;
    const genreKey = calendarData[key] || null;
    const isToday =
      today.getFullYear() === year &&
      today.getMonth() === month &&
      today.getDate() === d;

    const el = document.createElement("div");
    el.className =
      "cal-cell" +
      (genreKey ? " has-genre" : " no-genre") +
      (isToday ? " today" : "");

    if (genreKey && GENRES[genreKey]) {
      const img = document.createElement("img");
      img.src = GENRES[genreKey].icon;
      img.alt = GENRES[genreKey].name;
      el.title = GENRES[genreKey].name;
      el.appendChild(img);
    }

    const num = document.createElement("span");
    num.className = "cal-num";
    num.textContent = d;
    el.appendChild(num);

    grid.appendChild(el);
  }

  // 뒤 빈칸
  const total = offset + lastDate;
  const rows = Math.ceil(total / 7);
  const remaining = rows * 7 - total;
  for (let i = 0; i < remaining; i++) {
    const el = document.createElement("div");
    el.className = "cal-cell empty";
    grid.appendChild(el);
  }

  // 월 라벨 업데이트
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const label = document.getElementById("calMonthLabel");
  if (label) label.textContent = `${monthNames[month]}, ${year}`;
}

// ── 달력 이전 / 다음 달 ────────────────────────────────────────
function initCalendarNav() {
  document.getElementById("prevMonth")?.addEventListener("click", () => {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    renderCalendar(currentYear, currentMonth);
  });

  document.getElementById("nextMonth")?.addEventListener("click", () => {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    renderCalendar(currentYear, currentMonth);
  });
}

// ── 쿠키 액션 버튼 ────────────────────────────────────────────
function initCookieButtons() {
  document.querySelectorAll(".cookie-action-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const label = btn.querySelector("span")?.textContent || "";
      console.log(`[쿠키] ${label} 클릭`);
      // 실제: 페이지 라우팅
    });
  });

  document.querySelector(".cs-btn")?.addEventListener("click", () => {
    console.log("[쿠키] 고객센터 클릭");
  });
}

// ── 피드 더 보기 ───────────────────────────────────────────────
function initFeedMore() {
  document.querySelector(".feed-more-btn")?.addEventListener("click", () => {
    console.log("[피드] 더 보기 클릭");
  });

  document.querySelectorAll(".feed-item").forEach((item) => {
    item.addEventListener("click", () => {
      const title = item.querySelector(".feed-title")?.textContent;
      console.log(`[피드] "${title}" 클릭`);
    });
  });
}

// ── 최근 본 작품 ───────────────────────────────────────────────
function initRecentItems() {
  document.querySelectorAll(".recent-item").forEach((item) => {
    item.addEventListener("click", () => {
      const name = item.querySelector(".recent-name")?.textContent;
      const ep = item.querySelector(".recent-ep-badge")?.textContent;
      console.log(`[최근] "${name}" ${ep} 이어보기`);
    });
  });

  document.querySelector(".recent-see-all")?.addEventListener("click", () => {
    console.log("[최근] 전체보기 클릭");
  });
}

// ── AI 추천 + 버튼 ────────────────────────────────────────────
function initAiButtons() {
  document.querySelectorAll(".ai-add-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const title = btn
        .closest(".ai-card")
        ?.querySelector(".ai-card-title")?.textContent;

      if (btn.textContent.trim() === "+") {
        btn.textContent = "✓";
        btn.style.background = "var(--primary)";
        btn.style.color = "var(--secondary-900)";
        console.log(`[AI추천] "${title}" 관심 추가`);
      } else {
        btn.textContent = "+";
        btn.style.background = "";
        btn.style.color = "";
        console.log(`[AI추천] "${title}" 관심 제거`);
      }
    });
  });

  document.querySelectorAll(".ai-card").forEach((card) => {
    card.addEventListener("click", () => {
      const title = card.querySelector(".ai-card-title")?.textContent;
      console.log(`[AI추천] "${title}" 작품 클릭`);
    });
  });

  document.querySelector(".ai-more-btn")?.addEventListener("click", () => {
    console.log("[AI추천] 더 많은 추천 보기 클릭");
  });
}

// ── 통계 숫자 카운트업 ────────────────────────────────────────
function animateNumbers() {
  document.querySelectorAll(".stat-num").forEach((el) => {
    const target = parseInt(el.textContent, 10);
    if (isNaN(target)) return;

    let current = 0;
    const step = target / (900 / 16);

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        el.textContent = target;
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(current);
      }
    }, 16);
  });
}

// ── 통계 섹션 진입 시 카운트업 실행 (IntersectionObserver) ────
function initStatsObserver() {
  const section = document.querySelector(".stats-section");
  if (!section) return;

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateNumbers();
          obs.disconnect();
        }
      });
    },
    { threshold: 0.35 },
  );

  obs.observe(section);
}

// ── 하단 탭 전환 ──────────────────────────────────────────────
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

// ── DOMContentLoaded ──────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  renderCalendar(currentYear, currentMonth);
  initCalendarNav();
  initCookieButtons();
  initFeedMore();
  initRecentItems();
  initAiButtons();
  initStatsObserver();
  initBottomNav();
});
