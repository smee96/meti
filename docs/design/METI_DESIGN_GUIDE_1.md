# METI — 디자인 가이드 v1.0
> 디지털 명함 플랫폼 · Meet + Interact  
> 젠스파크 개발 적용용 디자인 스펙 문서

---

## 1. 브랜드 컨셉

### 포지셔닝
- **겉**: 깔끔하고 신뢰감 있는 디지털 명함 앱
- **속**: 게임(HappyTree) + 네트워킹 + 제휴 혜택 생태계
- **핵심 전략**: 명함 앱으로 자연스럽게 진입 → 게임/보상으로 락인

### 브랜드 키워드
```
신뢰감 · 세련됨 · 연결 · 성장 · 가볍지 않은 즐거움
```

### 톤 앤 매너
- **Warm Professional** — 딱딱한 비즈니스도, 가벼운 소셜 앱도 아닌 그 사이
- 전문성은 있되 딱딱하지 않게
- 명함 교환이라는 행동의 부산물로 게임 보상이 자연스럽게 따라오는 경험

---

## 2. 컬러 시스템

### Primary Colors

| 이름 | HEX | 용도 |
|------|-----|------|
| Deep Teal | `#1A4A5E` | 브랜드 메인, 주요 버튼, 헤더 |
| Mid Teal | `#1E6B82` | 서브 강조, 링크, 아이콘 |
| Light Teal | `#2A8FA8` | Hover 상태, 보조 요소 |

### Accent Colors

| 이름 | HEX | 용도 |
|------|-----|------|
| Mint Green | `#2EC4A0` | 액센트, HappyTree 게임 요소, CTA |
| Mint Light | `#4DDFC4` | Hover, 밝은 강조 |
| Mint Pale | `#E6FAF6` | 배경 강조, 태그 배경 |

### Neutral Colors

| 이름 | HEX | 용도 |
|------|-----|------|
| Off White | `#F5F7F8` | 페이지 배경 |
| Gray Light | `#EEF1F3` | 카드 배경, 구분선 |
| Gray Mid | `#B0BEC5` | Placeholder, 비활성 텍스트 |
| Charcoal | `#2D3A3E` | 본문 텍스트 |
| Text Light | `#637074` | 보조 텍스트, 설명 |

### Dark Mode (메인 페이지 배경)

| 이름 | HEX | 용도 |
|------|-----|------|
| Dark BG | `#0E1C22` | 다크 배경 기본 |
| Dark Surface | `#1A3A4A` | 다크 카드/컨테이너 |
| Dark Deep | `#111E25` | 섹션 배경 |

### 컬러 사용 원칙
- **Primary(Teal)**는 신뢰/전문성 → 주요 액션, 네비게이션에 사용
- **Accent(Mint)**는 생동감/HappyTree 연결 → 게임 보상, 포인트 강조에 사용
- 두 색상이 충돌하지 않도록 한 화면에서 비율은 **Teal 70 : Mint 30** 유지
- 다크 배경은 메인/랜딩 페이지, 라이트 배경은 앱 내부 화면에 사용

---

## 3. 타이포그래피

### 폰트 패밀리

```
Display : DM Serif Display (영문 헤드라인, 브랜드 강조)
Body    : Pretendard (한국어 전체, UI 전반)
Mono    : JetBrains Mono (코드, HEX 값 등)
```

> **CDN 임포트**
> ```html
> <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Noto+Sans+KR:wght@300;400;500;700&display=swap" rel="stylesheet">
> ```
> Pretendard는 CDN: `https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css`

### 타입 스케일

| 레벨 | 크기 | 굵기 | 용도 |
|------|------|------|------|
| Display | 48–72px | 400 (Serif) | 랜딩 메인 헤드라인 |
| H1 | 32px | 700 | 페이지 제목 |
| H2 | 24px | 700 | 섹션 제목 |
| H3 | 18px | 600 | 카드 제목, 서브 섹션 |
| Body | 15px | 400 | 본문, 설명 |
| Small | 13px | 400 | 보조 설명, 메타 |
| Caption | 11px | 400 | 라벨, 태그, 날짜 |
| Overline | 10–11px | 500, 자간 4px | 섹션 레이블 (대문자) |

### 텍스트 컬러 규칙
```
제목     → #2D3A3E (Charcoal)
본문     → #637074 (Text Light)
강조     → #1A4A5E (Deep Teal) 또는 #2EC4A0 (Mint)
비활성   → #B0BEC5 (Gray Mid)
다크배경 → rgba(255,255,255,0.85) / rgba(255,255,255,0.5)
```

---

## 4. 디지털 명함 — 카드 테마 시스템

> 사용자가 명함 생성 시 테마를 선택할 수 있어야 함.  
> 아래 3가지 기본 테마를 제공하고, 추후 프리미엄 테마 확장 가능.

### 카드 공통 스펙
```
크기       : 340 × 200px (비율 1.7:1, 실물 명함과 유사)
Border Radius : 20px
Shadow     : 0 20px 60px rgba(0,0,0,0.25)
Hover      : translateY(-6px) + shadow 증가 (transition 0.3s ease)
QR코드     : 우하단 고정, 불투명도 30–35%
```

### 카드 레이아웃 구조
```
[상단 좌측] METI 로고 텍스트 (작게)
[하단 좌측] 이름 (크게) → 직책/회사 → 연락처
[하단 우측] QR 코드 (작게)
```

---

### Theme 1 — Dark Teal (기본 추천)
```css
background: linear-gradient(135deg, #1A4A5E 0%, #0D2E3A 100%);

/* 장식 요소 */
::before → 우상단 원형 Mint glow (rgba(46,196,160,0.08))
::after  → 좌측 세로 라인 (Mint, 투명도 30%)

/* 텍스트 */
로고    : #2EC4A0 (Mint)
이름    : #FFFFFF
직책    : rgba(255,255,255,0.6)
연락처  : rgba(255,255,255,0.5)
```

### Theme 2 — Clean Light
```css
background: linear-gradient(135deg, #F5F7F8 0%, #EEF3F5 100%);

/* 장식 요소 */
상단 3px 라인 : linear-gradient(90deg, #1E6B82, #2EC4A0)
::before     → 우하단 원형 Mint glow (rgba(46,196,160,0.06))

/* 텍스트 */
로고    : #1E6B82 (Mid Teal)
이름    : #2D3A3E (Charcoal)
직책    : #637074 (Text Light)
연락처  : #637074 (Text Light)
```

### Theme 3 — Mint Gradient
```css
background: linear-gradient(135deg, #1E6B82 0%, #2EC4A0 100%);

/* 장식 요소 */
패턴 오버레이 : 체크무늬 SVG, rgba(white, 0.04)

/* 텍스트 */
로고    : rgba(255,255,255,0.8)
이름    : #FFFFFF
직책    : rgba(255,255,255,0.75)
연락처  : rgba(255,255,255,0.65)
```

### 향후 추가 테마 (Phase 2)
- **Gold Premium** — 다크 배경 + 골드(#E8C97A) 액센트
- **Mono** — 흑백 미니멀
- **Custom** — 사용자 커스텀 색상 선택

---

## 5. 컴포넌트 스펙

### Buttons

```css
/* 공통 */
border-radius : 12px
padding       : 12px 24px
font-size     : 14px
font-weight   : 600
transition    : all 0.2s ease

/* Primary (Deep Teal) */
background : linear-gradient(135deg, #1E6B82, #1A4A5E)
color      : #FFFFFF
box-shadow : 0 4px 16px rgba(26,74,94,0.35)
hover      : translateY(-2px), shadow 증가

/* Accent (Mint) */
background : linear-gradient(135deg, #2EC4A0, #1E9E82)
color      : #FFFFFF
box-shadow : 0 4px 16px rgba(46,196,160,0.35)

/* Outline */
background : transparent
border     : 1.5px solid #1E6B82
color      : #1E6B82

/* Ghost */
background : #EEF1F3
color      : #2D3A3E
```

### Input Fields

```css
padding       : 14px 18px
border-radius : 12px
border        : 1.5px solid #EEF1F3
font-size     : 14px
color         : #2D3A3E
transition    : border-color 0.2s

/* Focus */
border-color  : #1E6B82
box-shadow    : 0 0 0 3px rgba(30,107,130,0.12)
```

### Tags / Chips

```css
/* 공통 */
padding       : 6px 14px
border-radius : 100px
font-size     : 12px
font-weight   : 500

/* Teal Tag */
background : rgba(30,107,130,0.12)
color      : #1E6B82

/* Mint Tag (게임/보상) */
background : rgba(46,196,160,0.12)
color      : #1E9E82

/* Gray Tag */
background : #EEF1F3
color      : #637074
```

### Cards / Surfaces

```css
border-radius : 20px
padding       : 28px
background    : #FFFFFF
box-shadow    : 0 4px 24px rgba(0,0,0,0.06)
```

---

## 6. HappyTree 게임 UI 요소

### 보상 뱃지 (Reward Badge)

```css
/* 컨테이너 */
display       : inline-flex
align-items   : center
gap           : 8px
background    : linear-gradient(135deg, #1A3A2A, #0D2A1A)
border        : 1px solid rgba(46,196,160,0.3)
border-radius : 100px
padding       : 8px 16px 8px 8px

/* 아이콘 원 */
width/height  : 32px
border-radius : 50%
background    : linear-gradient(135deg, #2EC4A0, #1E8B6A)

/* 텍스트 */
이벤트명 : rgba(255,255,255,0.85), 13px
포인트   : #2EC4A0, 13px, weight 600
```

### 보상 테이블 데이터

| 이벤트 | 보상 |
|--------|------|
| 앱 설치 + 첫 명함 생성 | 화분 1개 + ♥ 300,000 |
| 내 명함 조회됨 | ♥ +10 |
| 내 명함 저장됨 | ♥ +100 |
| 명함 교환 완료 | ♥ +50 |
| 신규 가입 추천 | ♥ +500 · ⭐ +1 |

### 게임 아이콘 매핑
```
🌱 첫 시작, 새 화분
🪴 화분 성장, 레벨업
🌳 최고 레벨, 완성
⭐ 별(프리미엄 재화)
♥  하트(기본 재화)
```

---

## 7. 레이아웃 & 스페이싱

### 그리드
```
최대 너비  : 1200px (데스크탑)
컨테이너   : 좌우 padding 48px (데스크탑), 24px (모바일)
컬럼 Gap   : 20–28px
```

### 스페이싱 스케일
```
4 / 8 / 12 / 16 / 20 / 24 / 28 / 32 / 40 / 48 / 56 / 64px
```

### 섹션 구조 (메인 페이지)
```
Hero Section      → 다크 배경 (#0E1C22), 그라디언트 오버레이
Color/Type Section → 라이트 배경 (#F5F7F8)
Card Showcase     → 다크 배경 (#111E25)
Components        → 라이트 배경 (#F5F7F8)
Footer            → 최다크 (#0A161C)
```

---

## 8. 애니메이션

### 기본 트랜지션
```css
/* 모든 인터랙티브 요소 공통 */
transition: all 0.2s ease;

/* 카드 호버 */
transform: translateY(-6px) rotate(0.5deg);
box-shadow: 0 30px 80px rgba(0,0,0,0.35);
transition: transform 0.3s ease, box-shadow 0.3s ease;

/* 버튼 호버 */
transform: translateY(-2px);
```

### 페이지 진입 애니메이션
```css
@keyframes floatUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* 순차 딜레이 */
.delay-1 { animation-delay: 0.1s; }
.delay-2 { animation-delay: 0.2s; }
.delay-3 { animation-delay: 0.3s; }
.delay-4 { animation-delay: 0.4s; }
```

---

## 9. 아이콘 & 이미지

- **아이콘 라이브러리**: Font Awesome 또는 Lucide (라인 스타일)
- **두께**: 1.5–2px stroke, 너무 두껍지 않게
- **크기**: 16 / 20 / 24px 기준
- **컬러**: 컨텍스트에 따라 Teal 또는 Mint, 비활성은 Gray Mid

---

## 10. 개발 적용 우선순위

### Phase 1 UI 구현 순서
1. **글로벌 CSS 변수** 세팅 (컬러, 폰트, 스페이싱)
2. **공통 컴포넌트** — Button, Input, Tag, Card
3. **명함 카드 3가지 테마** 구현 + 선택 UI
4. **메인/랜딩 페이지** — Hero, 기능 소개
5. **앱 내부 화면** — 명함 생성, 지갑, 게임 현황

### CSS 변수 선언 (root)
```css
:root {
  /* Primary */
  --color-teal-deep   : #1A4A5E;
  --color-teal-mid    : #1E6B82;
  --color-teal-light  : #2A8FA8;

  /* Accent */
  --color-mint        : #2EC4A0;
  --color-mint-light  : #4DDFC4;
  --color-mint-pale   : #E6FAF6;

  /* Neutral */
  --color-bg          : #F5F7F8;
  --color-surface     : #FFFFFF;
  --color-gray-light  : #EEF1F3;
  --color-gray-mid    : #B0BEC5;
  --color-charcoal    : #2D3A3E;
  --color-text-light  : #637074;

  /* Dark */
  --color-dark-bg     : #0E1C22;
  --color-dark-surface: #1A3A4A;

  /* Typography */
  --font-display      : 'DM Serif Display', serif;
  --font-body         : 'Pretendard', 'Noto Sans KR', sans-serif;

  /* Spacing */
  --radius-sm         : 8px;
  --radius-md         : 12px;
  --radius-lg         : 20px;
  --radius-full       : 100px;

  /* Shadow */
  --shadow-sm         : 0 4px 16px rgba(0,0,0,0.06);
  --shadow-md         : 0 8px 32px rgba(0,0,0,0.12);
  --shadow-lg         : 0 20px 60px rgba(0,0,0,0.25);
}
```

---

## 11. 참고 레퍼런스 앱

| 앱 | 참고 포인트 |
|----|------------|
| 토스 | 신뢰감 있는 컬러, 깔끔한 UX, 미니멀 레이아웃 |
| 노션 | 여백 활용, 타이포그래피, 정보 위계 |
| 링크드인 | 전문성, 명함/프로필 정보 구조 |
| 리멤버 | 명함 UI 레퍼런스 (극복 대상) |

---

*문서 버전: v1.0 · 최종 수정: 2026-03-12*  
*METI Project — Private*
