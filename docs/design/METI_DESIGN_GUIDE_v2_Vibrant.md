# METI — 디자인 가이드 v2.0 (Vibrant Concept)
> 디지털 명함 플랫폼 · Meet + Interact  
> 젠스파크 개발 적용용 디자인 스펙 문서 · Vibrant Edition

---

## 1. 브랜드 컨셉

### 포지셔닝
- **겉**: 개성 있고 화사한 디지털 명함 앱
- **속**: 게임(HappyTree) + 네트워킹 + 제휴 혜택 생태계
- **핵심 전략**: 명함 테마 선택이라는 자기표현 욕구로 진입 → 게임/보상으로 락인

### 타겟
- **주력**: 20-30대 스타트업, 프리랜서, 크리에이터
- **확장**: 자기표현 욕구가 있는 전 연령 직장인

### 톤 앤 매너
- **Vibrant Personal** — 나답게, 화사하게, 그러나 프로답게
- 명함이 곧 나의 첫인상 → 개성 있는 테마 선택이 핵심 UX
- 그라디언트 컬러로 에너지감과 생동감 표현
- 폰트는 굵고 임팩트 있게, 레이아웃은 여백 충분히

---

## 2. 컬러 시스템

### 테마 그라디언트 팔레트 (명함 테마 기반)

| 테마명 | 시작색 | 끝색 | 용도 |
|--------|--------|------|------|
| Sunset Coral | `#FF6B6B` | `#FECA57` | 명함 A / 주요 CTA 버튼 |
| Aurora Violet | `#6C5CE7` | `#FD79A8` | 명함 B / 보조 강조 |
| Ocean Teal | `#0ABDE3` | `#55EFC4` | 명함 C / 게임 UI |
| Blossom Pink | `#FFE4F0` | `#FD79A8` | 명함 E / 라이트 테마 |
| Midnight | `#1E1B2E` | `#A29BFE` | 명함 D / 다크 테마 |
| Forest | `#1A3C34` | `#55EFC4` | 명함 F / 프리미엄 다크 |

### 단색 팔레트

| 이름 | HEX | 용도 |
|------|-----|------|
| Coral | `#FF6B6B` | 주요 액션, 경고 |
| Orange | `#FF9F43` | 그라디언트 중간, 보조 |
| Yellow | `#FECA57` | 포인트, 뱃지 |
| Indigo | `#6C5CE7` | 주요 버튼, 링크 |
| Violet | `#A29BFE` | 보조 강조, 태그 |
| Sky | `#74B9FF` | 정보성 UI |
| Teal | `#00CEC9` | 게임 요소, 성공 상태 |
| Mint | `#55EFC4` | HappyTree 보상 |
| Pink | `#FD79A8` | 소셜, 감성 요소 |

### Base Colors

| 이름 | HEX | 용도 |
|------|-----|------|
| Dark BG | `#1E1B2E` | 메인/히어로 배경 |
| Dark Surface | `#2D2840` | 다크 카드, 섹션 |
| Warm White | `#FFF9F5` | 라이트 페이지 배경 |
| Surface White | `#FFFFFF` | 카드, 컴포넌트 배경 |
| Gray BG | `#F0EEF8` | 구분선, 인풋 배경 |
| Plum Text | `#3D3557` | 본문 텍스트 |
| Sub Text | `#7C7499` | 보조 텍스트 |
| Muted | `#B0A8CC` | Placeholder, 비활성 |

### 컬러 사용 원칙
- 그라디언트는 **135deg** 방향 기본
- 한 화면에 그라디언트는 **2가지 이하** 사용
- 다크 배경(히어로)에서는 블롭(blob) 효과로 컬러감 표현
- 텍스트 그라디언트는 헤드라인 및 포인트 수치에만 사용
- 버튼/태그/뱃지는 각 테마 컬러와 일관되게

---

## 3. 타이포그래피

### 폰트 패밀리

```
Display / Heading : Plus Jakarta Sans (영문 + 숫자 강조)
Body (한국어)     : Noto Sans KR / Pretendard
Mono              : JetBrains Mono (코드, HEX 등)
```

> **CDN 임포트**
> ```html
> <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,700&family=Noto+Sans+KR:wght@300;400;500;700&display=swap" rel="stylesheet">
> ```
> Pretendard CDN: `https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css`

### 타입 스케일

| 레벨 | 크기 | 굵기 | letter-spacing | 용도 |
|------|------|------|----------------|------|
| Display | 64–80px | 800 | -2px | 랜딩 히어로 |
| H1 | 44px | 800 | -1.5px | 페이지 메인 타이틀 |
| H2 | 26px | 800 | -0.5px | 섹션 제목 |
| H3 | 18px | 700 | 0 | 카드 제목 |
| Body | 15px | 400 | 0 | 본문 |
| Small | 13px | 500 | 0 | 보조 설명 |
| Caption | 11px | 600 | 3px | 섹션 레이블 (대문자) |
| Tag | 12px | 600 | 0 | 태그, 배지 |

### 그라디언트 텍스트 (핵심 포인트)

```css
/* 메인 헤드라인 */
background: linear-gradient(90deg, #FF6B6B, #6C5CE7, #00CEC9);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;

/* 보상 수치 */
background: linear-gradient(90deg, #FF6B6B, #6C5CE7);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;

/* 섹션 레이블 */
background: linear-gradient(90deg, #FF6B6B, #A29BFE);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
```

---

## 4. 디지털 명함 — 카드 테마 6종

> 사용자가 명함 생성 시 테마를 선택.  
> 히어로 섹션에서 컬러 도트로 미리보기 제공.

### 카드 공통 스펙
```
크기          : 320 × 188px (비율 ~1.7:1)
Border Radius : 22px
Shadow        : 0 20px 56px rgba(0,0,0,0.18)
Hover         : translateY(-8px) scale(1.02), transition cubic-bezier(.34,1.56,.64,1) 0.35s
QR 장식       : 우하단 고정, opacity 25%
테마 라벨     : 우상단 pill 배지
```

### 카드 레이아웃
```
[상단 좌측] METI 로고 (소형, 투명도 있게)
[하단 좌측] 이름 → 직책/회사 → 이메일
[우하단]    QR 장식 (opacity 낮게)
[우상단]    테마명 pill
```

---

### Theme A — Sunset Coral ☀️
```css
background: linear-gradient(135deg, #FF6B6B 0%, #FF9F43 60%, #FECA57 100%);

/* 장식 */
::before → 우상단 원형, rgba(255,255,255,0.12), 200px
::after  → 좌하단 원형, rgba(255,255,255,0.08), 120px

/* 텍스트 */
로고    : rgba(255,255,255,0.85)
이름    : #FFFFFF, weight 800
직책    : rgba(255,255,255,0.85), weight 500
이메일  : rgba(255,255,255,0.7)

/* 테마 라벨 pill */
background : rgba(255,255,255,0.2)
color      : #FFFFFF
```

### Theme B — Aurora Violet 🌌
```css
background: linear-gradient(135deg, #6C5CE7 0%, #A29BFE 50%, #FD79A8 100%);

/* 장식 */
::before → 전체 덮는 radial gradient, rgba(white,0.15) ellipse 80% 20%

/* 텍스트 */
로고    : rgba(255,255,255,0.7)
이름    : #FFFFFF, weight 800
직책    : rgba(255,255,255,0.8)
이메일  : rgba(255,255,255,0.6)

/* 테마 라벨 pill */
background : rgba(255,255,255,0.15)
color      : rgba(255,255,255,0.9)
```

### Theme C — Ocean Teal 🌊
```css
background: linear-gradient(135deg, #0ABDE3 0%, #00CEC9 50%, #55EFC4 100%);

/* 장식 */
::before → 우상단 원형, rgba(255,255,255,0.08), 250px

/* 텍스트 */
로고    : rgba(255,255,255,0.75)
이름    : #FFFFFF, weight 800
직책    : rgba(255,255,255,0.8)
이메일  : rgba(255,255,255,0.65)

/* 테마 라벨 pill */
background : rgba(255,255,255,0.2)
color      : #FFFFFF
```

### Theme D — Midnight 🌙
```css
background: linear-gradient(135deg, #1E1B2E 0%, #2D2840 60%, #3D3557 100%);
border    : 1px solid rgba(162,155,254,0.2);

/* 장식 */
::before → 우상단 원형, rgba(162,155,254,0.1), 180px
::after  → 좌하단 가로선, gradient violet→transparent, 60×2px

/* 텍스트 */
로고    : #A29BFE (Violet)
이름    : #FFFFFF, weight 800
직책    : rgba(255,255,255,0.55)
이메일  : rgba(255,255,255,0.4)

/* 테마 라벨 pill */
background : rgba(162,155,254,0.2)
color      : rgba(162,155,254,0.9)
```

### Theme E — Blossom 🌸
```css
background: linear-gradient(135deg, #FFF0F5 0%, #FFE4F0 100%);
border    : 1px solid rgba(253,121,168,0.15);

/* 장식 */
상단 3px 라인 : linear-gradient(90deg, #FD79A8, #FF6B6B)
::before     → 우하단 원형, rgba(253,121,168,0.08), 160px

/* 텍스트 */
로고    : #FD79A8 (Pink)
이름    : #1E1B2E (Dark), weight 800
직책    : #9D6B7E
이메일  : #B08090

/* 테마 라벨 pill */
background : rgba(253,121,168,0.12)
color      : #D45E8A
```

### Theme F — Forest 🌲
```css
background: linear-gradient(135deg, #1A3C34 0%, #0F2A24 100%);

/* 장식 */
::before → 전체 덮는 radial gradient, rgba(85,239,196,0.12) ellipse 90% 90%

/* 텍스트 */
로고    : #55EFC4 (Mint)
이름    : #FFFFFF, weight 800
직책    : rgba(255,255,255,0.55)
이메일  : rgba(255,255,255,0.4)

/* 테마 라벨 pill */
background : rgba(85,239,196,0.15)
color      : #55EFC4
```

---

## 5. 히어로 섹션 — 테마 선택 UI

### 배경 Blob 효과
```css
/* 다크 배경 위에 컬러 블롭 배치 */
배경 : #1E1B2E

blob-1 : violet  (#A29BFE), 380×380px, top:-100px right:-60px, blur:80px, opacity:0.55
blob-2 : coral   (#FF6B6B), 280×280px, bottom:-80px left:200px, blur:80px, opacity:0.4
blob-3 : teal    (#00CEC9), 200×200px, top:60px left:-40px, blur:80px, opacity:0.3
blob-4 : yellow  (#FECA57), 160×160px, bottom:40px right:300px, blur:80px, opacity:0.25
```

### 테마 선택 도트 (Color Picker)
```css
/* 도트 공통 */
width/height  : 36px
border-radius : 50%
border        : 2px solid rgba(255,255,255,0.3)
box-shadow    : 0 4px 12px rgba(0,0,0,0.2)
transition    : transform 0.2s

/* 활성 상태 */
border        : 2px solid #FFFFFF
transform     : scale(1.1)
box-shadow    : 0 6px 20px rgba(0,0,0,0.35)

/* 각 도트 그라디언트 */
A (Coral)   : linear-gradient(135deg, #FF6B6B, #FECA57)
B (Violet)  : linear-gradient(135deg, #6C5CE7, #FD79A8)
C (Teal)    : linear-gradient(135deg, #0ABDE3, #55EFC4)
D (Midnight): linear-gradient(135deg, #1E1B2E, #A29BFE)
E (Blossom) : linear-gradient(135deg, #FFE4F0, #FD79A8)
F (Forest)  : linear-gradient(135deg, #1A3C34, #55EFC4)
```

### 플로팅 카드 (히어로 우측)
```css
/* 메인 카드 */
animation : float 4s ease-in-out infinite
  0%,100% → translateY(0) rotate(-2deg)
  50%     → translateY(-10px) rotate(-1deg)

/* 뒤 카드 (장식) */
animation : float2 4s ease-in-out infinite
  0%,100% → translateY(0) rotate(3deg)
  50%     → translateY(-6px) rotate(4deg)
opacity   : 0.6
z-index   : -1
```

### Live Dot (활성 상태 표시)
```css
width/height  : 6px
border-radius : 50%
background    : #55EFC4

animation: pulse 2s infinite
  0%,100% → opacity:1, scale:1
  50%     → opacity:0.5, scale:1.4
```

---

## 6. 컴포넌트 스펙

### Buttons

```css
/* 공통 */
border-radius : 12px
padding       : 11px 22px
font-size     : 14px
font-weight   : 700
transition    : all 0.2s ease
hover         : translateY(-2px), filter brightness(1.05)

/* Coral (Primary CTA) */
background : linear-gradient(135deg, #FF6B6B, #FF9F43)
color      : #FFFFFF
box-shadow : 0 4px 16px rgba(255,107,107,0.4)

/* Violet */
background : linear-gradient(135deg, #6C5CE7, #A29BFE)
color      : #FFFFFF
box-shadow : 0 4px 16px rgba(108,92,231,0.4)

/* Teal */
background : linear-gradient(135deg, #00CEC9, #55EFC4)
color      : #FFFFFF
box-shadow : 0 4px 16px rgba(0,206,201,0.35)

/* Outline */
background : transparent
border     : 2px solid #6C5CE7
color      : #6C5CE7
```

### Tags / Chips

```css
/* 공통 */
padding       : 6px 14px
border-radius : 100px
font-size     : 12px
font-weight   : 600

/* Coral */  background: rgba(255,107,107,0.1);  color: #E85555;
/* Violet */ background: rgba(108,92,231,0.1);   color: #6C5CE7;
/* Teal */   background: rgba(0,206,201,0.1);    color: #00A8A5;
/* Pink */   background: rgba(253,121,168,0.1);  color: #D45E8A;
/* Yellow */ background: rgba(254,202,87,0.15);  color: #B8860B;
```

### Input Fields

```css
padding       : 13px 18px
border-radius : 12px
border        : 1.5px solid #EEE9FF
font-size     : 14px
background    : #FDFCFF
color         : #3D3557
transition    : border-color 0.2s, box-shadow 0.2s

/* Focus */
border-color  : #6C5CE7
box-shadow    : 0 0 0 3px rgba(108,92,231,0.12)
```

### Cards / Surfaces

```css
border-radius : 20px
padding       : 28px
background    : #FFFFFF
box-shadow    : 0 4px 20px rgba(0,0,0,0.06)
```

---

## 7. HappyTree 게임 UI 요소

### 보상 뱃지

```css
/* 컨테이너 */
background    : linear-gradient(135deg, rgba(108,92,231,0.12), rgba(253,121,168,0.08))
border        : 1px solid rgba(108,92,231,0.2)
border-radius : 100px
padding       : 8px 18px 8px 8px
backdrop-filter: blur(4px)

/* 아이콘 원 */
width/height  : 34px
border-radius : 50%

아이콘 A (이벤트) : linear-gradient(135deg, #FF6B6B, #FF9F43)
아이콘 B (별)     : linear-gradient(135deg, #6C5CE7, #A29BFE)
아이콘 C (게임)   : linear-gradient(135deg, #00CEC9, #55EFC4)

/* 포인트 텍스트 */
font-weight : 700
background  : linear-gradient(90deg, #FF6B6B, #6C5CE7)
-webkit-background-clip: text
-webkit-text-fill-color: transparent
```

### 보상 테이블

| 이벤트 | 보상 |
|--------|------|
| 🌱 앱 설치 + 첫 명함 생성 | 화분 1개 + ♥ 300,000 |
| 👀 내 명함 조회됨 | ♥ +10 |
| 💾 내 명함 저장됨 | ♥ +100 |
| 🤝 명함 교환 완료 | ♥ +50 |
| ✨ 신규 가입 추천 | ♥ +500 · ⭐ +1 |

---

## 8. 레이아웃 & 스페이싱

### 그리드
```
최대 너비  : 1200px
컨테이너   : 좌우 padding 52px (데스크탑) / 24px (모바일)
컬럼 Gap   : 20–24px
```

### 스페이싱 스케일
```
4 / 8 / 10 / 12 / 16 / 20 / 24 / 28 / 32 / 36 / 40 / 52 / 64px
```

### 섹션 구조
```
Hero          → 다크 (#1E1B2E) + blob 효과 + 플로팅 카드
Color/Type    → 라이트 (#FFF9F5)
Card Showcase → 다크 (#2D2840)
Components    → 라이트 (#FFF9F5)
Footer        → 최다크 (#1E1B2E)
```

---

## 9. 애니메이션

### 페이지 진입
```css
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* 순차 딜레이 */
.d1 { animation-delay: 0.05s; }
.d2 { animation-delay: 0.12s; }
.d3 { animation-delay: 0.20s; }
.d4 { animation-delay: 0.28s; }
.d5 { animation-delay: 0.36s; }
.d6 { animation-delay: 0.44s; }
```

### 카드 호버
```css
transition: transform 0.35s cubic-bezier(.34,1.56,.64,1), box-shadow 0.35s ease;
hover: translateY(-8px) scale(1.02)
      box-shadow: 0 32px 80px rgba(0,0,0,0.28)
```

### 플로팅 카드
```css
@keyframes float {
  0%,100% { transform: translateY(0) rotate(-2deg); }
  50%     { transform: translateY(-10px) rotate(-1deg); }
}
animation: float 4s ease-in-out infinite;
```

---

## 10. CSS 변수 선언

```css
:root {
  /* Theme Gradients */
  --grad-coral   : linear-gradient(135deg, #FF6B6B, #FF9F43, #FECA57);
  --grad-violet  : linear-gradient(135deg, #6C5CE7, #A29BFE, #FD79A8);
  --grad-teal    : linear-gradient(135deg, #0ABDE3, #00CEC9, #55EFC4);
  --grad-midnight: linear-gradient(135deg, #1E1B2E, #2D2840, #3D3557);
  --grad-blossom : linear-gradient(135deg, #FFF0F5, #FFE4F0);
  --grad-forest  : linear-gradient(135deg, #1A3C34, #0F2A24);
  --grad-text    : linear-gradient(90deg, #FF6B6B, #6C5CE7, #00CEC9);

  /* Solid Colors */
  --coral        : #FF6B6B;
  --orange       : #FF9F43;
  --yellow       : #FECA57;
  --indigo       : #6C5CE7;
  --violet       : #A29BFE;
  --sky          : #74B9FF;
  --teal         : #00CEC9;
  --mint         : #55EFC4;
  --pink         : #FD79A8;

  /* Base */
  --dark-bg      : #1E1B2E;
  --dark-surface : #2D2840;
  --bg           : #FFF9F5;
  --surface      : #FFFFFF;
  --gray-light   : #F0EEF8;
  --text         : #3D3557;
  --text-sub     : #7C7499;
  --text-muted   : #B0A8CC;

  /* Typography */
  --font-display : 'Plus Jakarta Sans', sans-serif;
  --font-body    : 'Pretendard', 'Noto Sans KR', sans-serif;

  /* Radius */
  --radius-sm    : 8px;
  --radius-md    : 12px;
  --radius-lg    : 20px;
  --radius-card  : 22px;
  --radius-full  : 100px;

  /* Shadow */
  --shadow-sm    : 0 4px 16px rgba(0,0,0,0.06);
  --shadow-md    : 0 8px 24px rgba(0,0,0,0.1);
  --shadow-card  : 0 20px 56px rgba(0,0,0,0.18);
  --shadow-hover : 0 32px 80px rgba(0,0,0,0.28);
}
```

---

## 11. v1 vs v2 비교

| 항목 | v1 (Warm Professional) | v2 (Vibrant) |
|------|------------------------|--------------|
| 주 컬러 | Deep Teal 단색 | 멀티 그라디언트 |
| 명함 테마 | 3종 | 6종 |
| 타겟 | 30-40대, B2B | 20-30대, 크리에이터 |
| 인상 | 신뢰, 안정 | 에너지, 개성 |
| 폰트 | Pretendard + DM Serif | Plus Jakarta Sans |
| 배경 | 라이트 베이스 | 다크 히어로 + 라이트 내부 |
| 텍스트 강조 | Teal/Mint 단색 | 그라디언트 텍스트 |

> 두 버전의 카드 테마를 합쳐 총 9종 제공도 고려 가능.  
> v1의 Dark Teal · Clean Light · Mint Gradient + v2의 6종 테마

---

## 12. 개발 적용 우선순위

### Phase 1 UI 구현 순서
1. **CSS 변수** 선언 (컬러, 폰트, 반경, 그림자)
2. **히어로 섹션** — 다크 배경 + blob + 플로팅 카드 + 도트 선택기
3. **명함 카드 6종 테마** + 선택 UI (도트 picker)
4. **공통 컴포넌트** — Button, Input, Tag, Badge
5. **앱 내부 화면** — 명함 생성, 지갑, 게임 현황

---

## 13. 참고 레퍼런스

| 앱/서비스 | 참고 포인트 |
|-----------|------------|
| Linear | 다크 배경 + 그라디언트 blob |
| Framer | 카드 테마 선택 UX |
| Notion | 여백, 정보 위계 |
| Lensa / Unfold | 테마 선택형 앱 UX |
| Raycast | 그라디언트 활용 방식 |

---

*문서 버전: v2.0 Vibrant · 최종 수정: 2026-03-12*  
*METI Project — Private*
