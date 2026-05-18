# 🍀 NAVER WEBTOON UX Renewal

기존 네이버 웹툰 서비스의 탐색 구조를 개선하여  
**사용자가 더 빠르게 원하는 웹툰을 발견하고 탐색할 수 있도록 리디자인한 UIUX 프로젝트**입니다.

> 사용자는 로그인 후 취향과 집중도를 선택하고,  
> 맞춤형 추천 웹툰과 요일별 웹툰 탐색을 통해 보다 직관적으로 콘텐츠를 탐색할 수 있습니다.

---

# 프로젝트 링크

| 구분 | 링크 |
|---|---|
| GitHub | https://github.com/yujj9705/naver-webtoon.git |
| Notion 기획 문서 | https://bolder-shingle-eec.notion.site/35f65522b1d8801c8365f16c5077d8d6?source=copy_link |

---

# 프로젝트 개요

| 항목 | 내용 |
|---|---|
| 프로젝트명 | NAVER WEBTOON UX Renewal |
| 유형 | 웹툰 플랫폼 UX/UI 리디자인 |
| 핵심 목표 | 추천 웹툰 접근성 향상 및 탐색 흐름 개선 |
| 주요 기능 | 맞춤형 추천, 요일별 웹툰, 관심 저장, 마이페이지 |
| 제작 방식 | HTML, CSS, JavaScript |
| 디자인 툴 | Figma, Photoshop |
| 배포 | GitHub Pages |

---

# 핵심 기능

| 기능 | 설명 |
|---|---|
| 맞춤형 추천 | 사용자의 취향 및 집중도 기반 추천 콘텐츠 제공 |
| 요일별 웹툰 | 요일 기준 웹툰 탐색 기능 |
| 온보딩 UX | 장르 및 집중도 선택 기반 초기 사용자 경험 설계 |
| 관심 저장 | 관심 웹툰 저장 기능 |
| 마이페이지 | 최근 본 작품 및 저장 목록 확인 |
| 반응형 UI | 다양한 화면 환경 대응 |

---

# 서비스 흐름

```mermaid
flowchart LR

    A[사용자 진입]
    --> B[로그인 여부 선택]

    B --> C[취향 / 집중도 선택]

    C --> D[맞춤형 추천]

    D --> E[추천 웹툰 탐색]

    E --> F[요일별 웹툰 탐색]

    F --> G[웹툰 상세]

    G --> H[관심 / 저장]

    H --> I[마이페이지]

style D fill:#00D564,color:#fff
style I fill:#00D564,color:#fff
```

---

# 화면 구조

```mermaid
flowchart TD

    A[index.html<br/>Splash & Login]

    A --> B[signup.html<br/>회원가입]
    A --> C[login.html<br/>로그인]
    A --> D[login-naver.html<br/>간편 로그인]

    C --> E[onboarding.html<br/>취향/집중도 선택]
    D --> E

    E --> F[main-home.html<br/>추천 웹툰]

    F --> G[daily.html<br/>요일별 웹툰]
    F --> H[웹툰 상세]

    H --> I[관심 저장]

    I --> J[my-page.html<br/>마이페이지]
```

---

# 사용자 여정

```mermaid
journey
    title NAVER WEBTOON 사용자 여정

    section 로그인 및 진입
      서비스 진입: 5: 사용자
      로그인 선택: 4: 사용자

    section 취향 설정
      장르 선택: 5: 사용자
      집중도 선택: 4: 사용자

    section 추천 탐색
      맞춤 추천 확인: 5: 사용자
      추천 웹툰 탐색: 5: 사용자
      요일별 탐색: 4: 사용자

    section 콘텐츠 소비
      웹툰 상세 확인: 4: 사용자
      관심 웹툰 저장: 4: 사용자

    section 관리
      마이페이지 확인: 4: 사용자
      최근 본 작품 확인: 4: 사용자
```

---

# 정보 구조도 (Information Architecture)

```mermaid
flowchart TD

    A[NAVER WEBTOON]

    A --> B[Authentication]
    B --> B1[회원가입]
    B --> B2[로그인]
    B --> B3[네이버 간편 로그인]

    A --> C[Onboarding]
    C --> C1[장르 선택]
    C --> C2[집중도 선택]

    A --> D[HOME]
    D --> D1[맞춤형 추천]
    D --> D2[추천 카드]
    D --> D3[추천 이유]
    D --> D4[인기 웹툰]

    A --> E[요일별 웹툰]
    E --> E1[월요일]
    E --> E2[화요일]
    E --> E3[수요일]
    E --> E4[목요일]
    E --> E5[금요일]
    E --> E6[토요일]
    E --> E7[일요일]

    A --> F[상세 페이지]
    F --> F1[웹툰 소개]
    F --> F2[작품 정보]
    F --> F3[관심 저장]

    A --> G[마이페이지]
    G --> G1[최근 본 웹툰]
    G --> G2[관심 웹툰]
    G --> G3[취향 설정]
```

---

# UX 개선 방향

| 기존 문제 | 개선 방향 |
|---|---|
| 추천 웹툰 접근 어려움 | 추천 콘텐츠 상단 우선 배치 |
| 요일 중심 단순 탐색 | 추천 + 요일 구조 분리 |
| 반복적인 탐색 흐름 | 관심 웹툰 저장 기능 추가 |
| 개인화 경험 부족 | 취향 기반 추천 UX 강화 |
| 서비스 진입 단순화 부족 | 온보딩 기반 탐색 흐름 추가 |

---

# 디자인 방향

| 구분 | 내용 |
|---|---|
| KEYWORD | Personalized / Clear / Content Focused |
| COLOR | 네이버 브랜드 컬러 기반 |
| UI | 카드형 UI 및 콘텐츠 중심 레이아웃 |
| UX | 탐색 피로 최소화 및 접근성 강화 |
| RESPONSIVE | 모바일 중심 반응형 구조 |

---

# 기술 스택

### Frontend

![HTML5](https://img.shields.io/badge/HTML5-구조-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-스타일-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-인터랙션-F7DF1E?style=flat-square&logo=javascript&logoColor=black)

### Tools

![Figma](https://img.shields.io/badge/Figma-UI%2FUX-black?style=flat-square&logo=figma&logoColor=white)
![Photoshop](https://img.shields.io/badge/Photoshop-Visual-31A8FF?style=flat-square&logo=adobephotoshop&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-저장소-181717?style=flat-square&logo=github&logoColor=white)

---

# 주요 구현 포인트

| 구분 | 구현 내용 |
|---|---|
| UI 구조 | 추천 / 요일별 / 마이페이지 흐름 구성 |
| 스타일링 | 카드형 UI 기반 반응형 디자인 |
| 인터랙션 | 저장 기능 및 탐색 흐름 구현 |
| UX 개선 | 추천 콘텐츠 우선 배치 |
| 온보딩 | 사용자 취향 기반 추천 흐름 설계 |
| 콘텐츠 흐름 | 사용자 탐색 단계 최소화 |

---

# 상태 흐름 구조

```mermaid
flowchart TD

    A[사용자 진입]
    --> B[로그인 여부 선택]

    B --> C[취향 / 집중도 선택]

    C --> D[맞춤형 추천]

    D --> E[추천 웹툰 탐색]

    E --> F[요일별 웹툰 탐색]

    F --> G[웹툰 상세]

    G --> H[관심 / 저장]

    H --> I[마이페이지]

style D fill:#00D564,color:#fff
style I fill:#00D564,color:#fff
```

---

# 폴더 구조

```text
naver-webtoon
├── assets
├── css
├── js
├── images
├── index.html
├── onboarding.html
├── signup.html
├── login.html
├── login-naver.html
├── main-home.html
├── daily.html
├── my-page.html
└── README.md
```

---

# 페이지별 역할

| 페이지 | 역할 |
|---|---|
| `index.html` | Splash & Login |
| `signup.html` | 회원가입 페이지 |
| `login.html` | 로그인 페이지 |
| `login-naver.html` | 네이버 간편 로그인 |
| `onboarding.html` | 장르 및 집중도 선택 온보딩 |
| `main-home.html` | 맞춤 추천 웹툰 화면 |
| `daily.html` | 요일별 웹툰 탐색 |
| `my-page.html` | 마이페이지 |

---

# 작업 과정

```mermaid
gantt
    title 프로젝트 작업 흐름
    dateFormat  YYYY-MM-DD

    section 기획
    UX 문제 분석           :done, a1, 2026-05-01, 1d
    정보 구조 설계         :done, a2, 2026-05-02, 1d

    section 디자인
    UI 디자인              :done, b1, 2026-05-03, 3d
    프로토타입 제작         :done, b2, 2026-05-05, 2d

    section 구현
    HTML/CSS 퍼블리싱      :done, c1, 2026-05-06, 3d
    JavaScript 기능 구현    :done, c2, 2026-05-08, 2d

    section 마무리
    테스트 및 수정          :done, d1, 2026-05-10, 1d
    GitHub 업로드          :done, d2, 2026-05-10, 1d
```

---

# 프로젝트에서 신경 쓴 부분

| 관점 | 내용 |
|---|---|
| UX | 추천 콘텐츠 접근 흐름 개선 |
| UI | 콘텐츠 중심 카드형 UI 구성 |
| Navigation | 정보 구조 단순화 |
| Interaction | 저장 및 탐색 인터랙션 강화 |
| Onboarding | 사용자 취향 기반 진입 흐름 설계 |
| Portfolio | 기획 → UX → 구현 흐름 정리 |

---

# 개선 예정

```mermaid
flowchart LR

    A[현재 버전]
    --> B[추천 알고리즘 고도화]
    --> C[사용자 데이터 기반 개인화]
    --> D[반응형 디테일 개선]
    --> E[다크모드 지원]
```

| 개선 항목 | 방향 |
|---|---|
| 추천 기능 | 사용자 취향 기반 추천 강화 |
| 데이터 관리 | 사용자별 저장 데이터 관리 |
| UI 개선 | 애니메이션 및 인터랙션 강화 |
| 접근성 | 웹 접근성 및 사용성 개선 |
| 포트폴리오 | 디자인 시스템 정리 추가 |

---

# 프로젝트 의의

이 프로젝트는 단순한 웹툰 UI 제작이 아닌,  
사용자가 콘텐츠를 탐색하는 흐름 자체를 개선하는 데 초점을 둔 UX 리디자인 프로젝트입니다.

특히 사용자의 취향과 집중도를 기반으로 추천 흐름을 설계하고,  
추천 콘텐츠 접근성과 정보 구조를 재설계하여 더 빠르고 직관적인 콘텐츠 탐색 경험을 제공하고자 하였습니다.

---

# 제작자

| 구분 | 내용 |
|---|---|
| 이름 | 최유정 / Yujeong Choi |
| 역할 | UIUX 설계, 웹디자인, 퍼블리싱 |
| GitHub | https://github.com/yujj9705 |
