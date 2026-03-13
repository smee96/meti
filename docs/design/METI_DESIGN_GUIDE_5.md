# METI — 첫 화면 디자인 스펙
> Screen 01 · 스플래시 / 온보딩 진입 화면  
> 젠스파크 개발 적용용 · 2026

---

## 1. 화면 개요

| 항목 | 내용 |
|------|------|
| 화면명 | 첫 화면 (Splash / Onboarding) |
| 역할 | 앱 최초 진입 · 브랜드 인식 · 시작/로그인 유도 |
| 다음 화면 | 시작하기 → 회원가입 / 로그인 → 로그인 화면 |

---

## 2. 컬러

| 항목 | HEX | 용도 |
|------|-----|------|
| 앱 배경 | `#0A2260` | 전체 배경 · 단색 · 그라디언트 없음 |
| 브라우저/외부 배경 | `#FFFFFF` | 웹 미리보기 외부 |
| 텍스트 · 로고 | `#FFFFFF` | METI 로고, 카드 이름, 버튼 |
| 보조 텍스트 | `rgba(255,255,255,0.65)` | 로그인 버튼 텍스트 |
| 카드 텍스트 서브 | `rgba(255,255,255,0.5)` | 직책 |
| 카드 로고 | `rgba(255,255,255,0.7)` | 카드 내 METI 로고 |
| 구분선 | `rgba(255,255,255,0.15)` | 수평 룰 라인 |
| 구분 도트 | `rgba(255,255,255,0.3)` | 룰 중앙 원형 점 |
| 시작 버튼 배경 | `#FFFFFF` | 흰색 버튼 |
| 시작 버튼 텍스트 | `#0D2B6E` | 진한 네이비 |
| 로그인 버튼 테두리 | `rgba(255,255,255,0.25)` | 아웃라인 버튼 |
| 홈 인디케이터 | `rgba(255,255,255,0.25)` | 하단 바 |

---

## 3. 타이포그래피

### 폰트 임포트
```html
<link href="https://fonts.googleapis.com/css2?family=Tenor+Sans&family=Noto+Sans+KR:wght@300;400;500;700&display=swap" rel="stylesheet">
```

### 사용 폰트

| 용도 | 폰트 | 크기 | 굵기 | letter-spacing |
|------|------|------|------|----------------|
| 메인 로고 METI | Tenor Sans | 58px | 400 | 18px |
| 카드 로고 METI | Tenor Sans | 14px | 400 | 6px |
| 카드 이름 | Noto Sans KR | 17px | 500 | 0.3px |
| 카드 직책 | Noto Sans KR | 11px | 300 | 0.5px |
| 시작하기 버튼 | Noto Sans KR | 15px | 700 | 0.5px |
| 로그인 버튼 | Noto Sans KR | 14px | 400 | 0 |

> **표기 원칙**: METI는 항상 **전체 대문자(METI)** 로 표기

---

## 4. 레이아웃 구조

```
┌─────────────────────────────┐
│  상태바 (시간 · 배터리)       │
├─────────────────────────────┤
│                             │
│                             │
│          METI               │  ← Tenor Sans 58px / 자간 18px
│     ────── • ──────         │  ← 구분 룰
│                             │
│  ┌───────────────────────┐  │
│  │ METI              [QR]│  │  ← 카드 뒷면 (offset +12px)
│  │                       │  │
│  │ 홍길동                │  │
│  │ Product Manager · METI│  │
│  └───────────────────────┘  │  ← 명함 카드 (glassmorphism)
│                             │
│     • ○ ○ ○ ○ ○            │  ← 테마 선택 도트 6개
│                             │
├─────────────────────────────┤
│  [      시작하기      ]      │  ← 흰색 솔리드 버튼
│  [      로그인        ]      │  ← 아웃라인 버튼
├─────────────────────────────┤
│           ━━━━━━            │  ← 홈 인디케이터
└─────────────────────────────┘
```

---

## 5. 컴포넌트 상세 스펙

### 앱 프레임
```
width         : 390px
height        : 844px
border-radius : 52px
background    : #0A2260 (단색 · 그라디언트 없음)
```

### 메인 로고
```
font-family   : 'Tenor Sans', serif
font-size     : 58px
color         : #FFFFFF
letter-spacing: 18px
padding-left  : 18px  (letter-spacing 시각 보정)
위치          : 화면 세로 중앙 기준 위쪽
```

### 구분 룰
```
구성     : 라인 — 원형 도트 — 라인
라인     : flex:1, height 1px, rgba(255,255,255,0.15)
도트     : 4×4px, border-radius 50%, rgba(255,255,255,0.3)
margin   : 위 28px / 아래 26px
```

### 명함 카드 (미리보기)
```
width         : 100% (좌우 패딩 28px 내)
height        : 150px
border-radius : 16px
background    : rgba(255,255,255,0.10)
border        : 1px solid rgba(255,255,255,0.18)
backdrop-filter: blur(20px)
box-shadow    : inset 0 1px 0 rgba(255,255,255,0.2)
padding       : 20px 24px

::before → 우상단 radial glow
  radial-gradient(ellipse 65% 55% at 80% 10%, rgba(255,255,255,0.08) → transparent)

::after → 하단 얇은 라인
  linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent), height 1px
```

### 카드 뒷면 (그림자 레이어)
```
position : absolute
offset   : top -8px / left +12px / right -12px / bottom +8px
border-radius : 16px
background    : rgba(255,255,255,0.06)
border        : 1px solid rgba(255,255,255,0.08)
z-index  : 카드보다 뒤
```

### QR 장식
```
위치     : 카드 우하단 (bottom 16px, right 18px)
크기     : 32×32px
구성     : 5×5 grid, gap 2px
색상     : #fff
opacity  : 0.2
역할     : 장식 (실제 QR 아님)
```

### 테마 도트
```
기본 dot  : 6×6px, border-radius 50%, rgba(255,255,255,0.2)
활성 dot  : 20×6px, border-radius 3px, #fff
gap       : 7px
margin-top: 18px
개수      : 6개 (테마 6종 암시)
```

### 시작하기 버튼 (Primary)
```
width         : 100%
height        : 54px
border-radius : 16px
background    : #FFFFFF
color         : #0D2B6E
font-size     : 15px, weight 700
box-shadow    : 0 8px 24px rgba(5,15,50,0.25)
active        : scale(0.98)
```

### 로그인 버튼 (Secondary)
```
width         : 100%
height        : 50px
border-radius : 16px
background    : transparent
border        : 1.5px solid rgba(255,255,255,0.25)
color         : rgba(255,255,255,0.65)
font-size     : 14px, weight 400
margin-top    : 10px
active        : background rgba(255,255,255,0.07)
```

### 홈 인디케이터
```
width         : 134px
height        : 5px
border-radius : 3px
background    : rgba(255,255,255,0.25)
position      : bottom 10px, 가로 중앙
```

---

## 6. 진입 애니메이션

```css
/* 로고 */
@keyframes logoIn {
  from { opacity:0; transform: translateY(12px) scale(0.97); }
  to   { opacity:1; transform: translateY(0) scale(1); }
}
duration : 0.9s
easing   : cubic-bezier(.16,1,.3,1)
delay    : 0.2s

/* 구분 룰 */
duration : 0.5s / delay 0.7s / easing ease

/* 명함 카드 */
@keyframes cardIn {
  from { opacity:0; transform: translateY(18px); }
  to   { opacity:1; transform: translateY(0); }
}
duration : 0.9s / delay 0.85s / easing cubic-bezier(.16,1,.3,1)

/* 테마 도트 */
duration : 0.5s / delay 1.1s / easing ease

/* CTA 버튼 */
duration : 0.7s / delay 1.2s / easing ease
```

---

## 7. 화면 흐름

```
첫 화면
  ├── 시작하기 → 회원가입 화면
  └── 로그인   → 로그인 화면
```

---

*Screen 01 · METI · 2026*
