# METI — 디자인 가이드 통합본
> 디지털 명함 플랫폼 · Meet + Interact  
> 젠스파크 개발 적용용 · 전체 버전 비교 문서

---

## 버전 개요

| 버전 | 컨셉명 | 무드 | 타겟 |
|------|--------|------|------|
| v1 | Warm Professional | 신뢰 · 안정 · 세련 | 30-40대 직장인 · B2B |
| v2 | Vibrant | 에너지 · 개성 · 화사함 | 20-30대 스타트업 · 크리에이터 |
| v3 | Aurum | 럭셔리 · 격조 · 프리미엄 | 전문직 · 임원 · 고급 프리랜서 |
| v4 | Indigo Script | 깊이 · 신뢰 · 우아함 | 전 연령 · 품격 있는 이미지 |

---

---

# V1 — Warm Professional

## 브랜드 컨셉

**포지셔닝**
- 겉: 깔끔하고 신뢰감 있는 디지털 명함 앱
- 속: 게임(HappyTree) + 네트워킹 + 제휴 혜택 생태계
- 핵심 전략: 명함 앱으로 자연스럽게 진입 → 게임/보상으로 락인

**톤 앤 매너**
- Warm Professional — 딱딱한 비즈니스도, 가벼운 소셜 앱도 아닌 그 사이
- 전문성은 있되 딱딱하지 않게
- 명함 교환이라는 행동의 부산물로 게임 보상이 자연스럽게 따라오는 경험

---

## 컬러 시스템

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
- Primary(Teal)는 신뢰/전문성 → 주요 액션, 네비게이션에 사용
- Accent(Mint)는 생동감/HappyTree 연결 → 게임 보상, 포인트 강조에 사용
- 한 화면에서 비율 Teal 70 : Mint 30 유지
- 다크 배경은 메인/랜딩 페이지, 라이트 배경은 앱 내부 화면에 사용

---

## 타이포그래피

### 폰트 패밀리

```
Display : DM Serif Display (영문 헤드라인, 브랜드 강조)
Body    : Pretendard (한국어 전체, UI 전반)
Mono    : JetBrains Mono (코드, HEX 값 등)
```

> CDN 임포트
> ```html
> <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Noto+Sans+KR:wght@300;400;500;700&display=swap" rel="stylesheet">
> ```
> Pretendard CDN: `https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css`

### 타입 스케일

| 레벨 | 크기 | 굵기 | 용도 |
|------|------|------|------|
| Display | 48–72px | 400 Serif | 랜딩 메인 헤드라인 |
| H1 | 32px | 700 | 페이지 제목 |
| H2 | 24px | 700 | 섹션 제목 |
| H3 | 18px | 600 | 카드 제목 |
| Body | 15px | 400 | 본문 |
| Small | 13px | 400 | 보조 설명 |
| Caption | 11px | 500, 자간 4px | 섹션 레이블 (대문자) |

---

## 명함 카드 테마 3종

### 카드 공통 스펙
```
크기          : 340 × 200px
Border Radius : 20px
Shadow        : 0 20px 60px rgba(0,0,0,0.25)
Hover         : translateY(-6px) rotate(0.5deg), transition 0.3s ease
QR 장식       : 우하단 고정, opacity 30–35%
```

### Theme 1 — Signature Teal (다크)
```css
background: linear-gradient(135deg, #1A4A5E 0%, #0D2E3A 100%);
::before → 우상단 원형 Mint glow rgba(46,196,160,0.08)
::after  → 좌측 세로 라인 Mint opacity 30%

로고    : #2EC4A0
이름    : #FFFFFF, weight 700
직책    : rgba(255,255,255,0.6)
연락처  : rgba(255,255,255,0.5)
```

### Theme 2 — Clean Light
```css
background: linear-gradient(135deg, #F5F7F8 0%, #EEF3F5 100%);
상단 라인 : linear-gradient(90deg, #1E6B82, #2EC4A0), height 3px
::before  → 우하단 원형 Mint glow rgba(46,196,160,0.06)

로고    : #1E6B82
이름    : #2D3A3E, weight 700
직책    : #637074
연락처  : #637074
```

### Theme 3 — Mint Gradient
```css
background: linear-gradient(135deg, #1E6B82 0%, #2EC4A0 100%);
패턴 오버레이 : 체크무늬 SVG rgba(white, 0.04)

로고    : rgba(255,255,255,0.8)
이름    : #FFFFFF, weight 700
직책    : rgba(255,255,255,0.75)
연락처  : rgba(255,255,255,0.65)
```

---

## UI 컴포넌트

### Buttons
```css
공통: border-radius 12px, padding 12px 24px, font-size 14px, font-weight 600

Primary (Teal)
background : linear-gradient(135deg, #1E6B82, #1A4A5E)
box-shadow : 0 4px 16px rgba(26,74,94,0.35)

Accent (Mint)
background : linear-gradient(135deg, #2EC4A0, #1E9E82)
box-shadow : 0 4px 16px rgba(46,196,160,0.35)

Outline
border     : 1.5px solid #1E6B82
color      : #1E6B82

Ghost
background : #EEF1F3
color      : #2D3A3E
```

### Input Fields
```css
padding       : 14px 18px
border-radius : 12px
border        : 1.5px solid #EEF1F3
focus border  : #1E6B82
focus shadow  : 0 0 0 3px rgba(30,107,130,0.12)
```

### Tags
```css
padding       : 6px 14px
border-radius : 100px
font-size     : 12px, weight 500

Teal : background rgba(30,107,130,0.12), color #1E6B82
Mint : background rgba(46,196,160,0.12), color #1E9E82
Gray : background #EEF1F3, color #637074
```

---

## HappyTree 게임 UI

### 보상 뱃지
```css
background    : linear-gradient(135deg, #1A3A2A, #0D2A1A)
border        : 1px solid rgba(46,196,160,0.3)
border-radius : 100px
padding       : 8px 16px 8px 8px

아이콘 원 : linear-gradient(135deg, #2EC4A0, #1E8B6A), 32px
포인트 텍스트 : #2EC4A0, weight 600
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

## CSS 변수 (v1)

```css
:root {
  --teal-deep   : #1A4A5E;
  --teal-mid    : #1E6B82;
  --teal-light  : #2A8FA8;
  --mint        : #2EC4A0;
  --mint-light  : #4DDFC4;
  --mint-pale   : #E6FAF6;
  --bg          : #F5F7F8;
  --surface     : #FFFFFF;
  --gray-light  : #EEF1F3;
  --gray-mid    : #B0BEC5;
  --charcoal    : #2D3A3E;
  --text-light  : #637074;
  --dark-bg     : #0E1C22;
  --dark-surface: #1A3A4A;
  --font-display: 'DM Serif Display', serif;
  --font-body   : 'Pretendard', 'Noto Sans KR', sans-serif;
  --radius-md   : 12px;
  --radius-lg   : 20px;
  --radius-full : 100px;
  --shadow-sm   : 0 4px 16px rgba(0,0,0,0.06);
  --shadow-md   : 0 8px 32px rgba(0,0,0,0.12);
  --shadow-card : 0 20px 60px rgba(0,0,0,0.25);
}
```

---

---

# V2 — Vibrant

## 브랜드 컨셉

**포지셔닝**
- 겉: 개성 있고 화사한 디지털 명함 앱
- 속: 게임(HappyTree) + 네트워킹 + 제휴 혜택 생태계
- 핵심 전략: 명함 테마 선택이라는 자기표현 욕구로 진입 → 게임/보상으로 락인

**타겟**: 20-30대 스타트업, 프리랜서, 크리에이터

**톤 앤 매너**
- Vibrant Personal — 나답게, 화사하게, 그러나 프로답게
- 그라디언트 컬러로 에너지감과 생동감 표현
- 폰트는 굵고 임팩트 있게, 레이아웃은 여백 충분히

---

## 컬러 시스템

### 테마 그라디언트 팔레트

| 테마명 | 시작색 | 끝색 |
|--------|--------|------|
| Sunset Coral | `#FF6B6B` | `#FECA57` |
| Aurora Violet | `#6C5CE7` | `#FD79A8` |
| Ocean Teal | `#0ABDE3` | `#55EFC4` |
| Blossom Pink | `#FFE4F0` | `#FD79A8` |
| Midnight | `#1E1B2E` | `#A29BFE` |
| Forest | `#1A3C34` | `#55EFC4` |

### 단색 팔레트

| 이름 | HEX | 용도 |
|------|-----|------|
| Coral | `#FF6B6B` | 주요 CTA |
| Orange | `#FF9F43` | 그라디언트 중간 |
| Yellow | `#FECA57` | 포인트 |
| Indigo | `#6C5CE7` | 주요 버튼, 링크 |
| Violet | `#A29BFE` | 보조 강조 |
| Teal | `#00CEC9` | 게임 요소 |
| Mint | `#55EFC4` | HappyTree 보상 |
| Pink | `#FD79A8` | 소셜, 감성 요소 |

### Base Colors

| 이름 | HEX | 용도 |
|------|-----|------|
| Dark BG | `#1E1B2E` | 메인/히어로 배경 |
| Dark Surface | `#2D2840` | 다크 카드, 섹션 |
| Warm White | `#FFF9F5` | 라이트 배경 |
| Plum Text | `#3D3557` | 본문 텍스트 |
| Sub Text | `#7C7499` | 보조 텍스트 |

### 컬러 사용 원칙
- 그라디언트 방향 135deg 기본
- 한 화면에 그라디언트 2가지 이하
- 히어로 다크 배경에는 blob 효과로 컬러감 표현
- 텍스트 그라디언트는 헤드라인 및 포인트 수치에만 사용

### 그라디언트 텍스트
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
```

---

## 타이포그래피

### 폰트 패밀리

```
Display / Heading : Plus Jakarta Sans
Body (한국어)     : Noto Sans KR / Pretendard
```

> CDN 임포트
> ```html
> <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Noto+Sans+KR:wght@300;400;500;700&display=swap" rel="stylesheet">
> ```

### 타입 스케일

| 레벨 | 크기 | 굵기 | letter-spacing |
|------|------|------|----------------|
| Display | 64–80px | 800 | -2px |
| H1 | 44px | 800 | -1.5px |
| H2 | 26px | 800 | -0.5px |
| Body | 15px | 400 | 0 |
| Caption | 11px | 600 | 3px |

---

## 명함 카드 테마 6종

### 카드 공통 스펙
```
크기          : 320 × 188px
Border Radius : 22px
Shadow        : 0 20px 56px rgba(0,0,0,0.18)
Hover         : translateY(-8px) scale(1.02)
              cubic-bezier(.34,1.56,.64,1) 0.35s
QR 장식       : 우하단 opacity 25%
테마 라벨     : 우상단 pill 배지
```

### Theme A — Sunset Coral
```css
background: linear-gradient(135deg, #FF6B6B 0%, #FF9F43 60%, #FECA57 100%);
로고    : rgba(255,255,255,0.85)
이름    : #FFFFFF, weight 800
직책    : rgba(255,255,255,0.85)
연락처  : rgba(255,255,255,0.7)
pill    : background rgba(255,255,255,0.2), color #fff
```

### Theme B — Aurora Violet
```css
background: linear-gradient(135deg, #6C5CE7 0%, #A29BFE 50%, #FD79A8 100%);
로고    : rgba(255,255,255,0.7)
이름    : #FFFFFF, weight 800
직책    : rgba(255,255,255,0.8)
연락처  : rgba(255,255,255,0.6)
pill    : background rgba(255,255,255,0.15), color rgba(255,255,255,0.9)
```

### Theme C — Ocean Teal
```css
background: linear-gradient(135deg, #0ABDE3 0%, #00CEC9 50%, #55EFC4 100%);
로고    : rgba(255,255,255,0.75)
이름    : #FFFFFF, weight 800
직책    : rgba(255,255,255,0.8)
연락처  : rgba(255,255,255,0.65)
pill    : background rgba(255,255,255,0.2), color #fff
```

### Theme D — Midnight
```css
background: linear-gradient(135deg, #1E1B2E 0%, #2D2840 60%, #3D3557 100%);
border    : 1px solid rgba(162,155,254,0.2)
로고    : #A29BFE
이름    : #FFFFFF, weight 800
직책    : rgba(255,255,255,0.55)
연락처  : rgba(255,255,255,0.4)
pill    : background rgba(162,155,254,0.2), color rgba(162,155,254,0.9)
```

### Theme E — Blossom
```css
background: linear-gradient(135deg, #FFF0F5 0%, #FFE4F0 100%);
border    : 1px solid rgba(253,121,168,0.15)
상단 라인 : linear-gradient(90deg, #FD79A8, #FF6B6B), height 3px
로고    : #FD79A8
이름    : #1E1B2E, weight 800
직책    : #9D6B7E
연락처  : #B08090
pill    : background rgba(253,121,168,0.12), color #D45E8A
```

### Theme F — Forest
```css
background: linear-gradient(135deg, #1A3C34 0%, #0F2A24 100%);
로고    : #55EFC4
이름    : #FFFFFF, weight 800
직책    : rgba(255,255,255,0.55)
연락처  : rgba(255,255,255,0.4)
pill    : background rgba(85,239,196,0.15), color #55EFC4
```

---

## 히어로 섹션 — Blob 효과

```css
배경: #1E1B2E

blob-1 : #A29BFE, 380×380px, top:-100px right:-60px, blur:80px, opacity:0.55
blob-2 : #FF6B6B, 280×280px, bottom:-80px left:200px, blur:80px, opacity:0.4
blob-3 : #00CEC9, 200×200px, top:60px left:-40px, blur:80px, opacity:0.3
blob-4 : #FECA57, 160×160px, bottom:40px right:300px, blur:80px, opacity:0.25
```

---

## UI 컴포넌트

### Buttons
```css
공통: border-radius 12px, padding 11px 22px, font-size 14px, font-weight 700

Coral   : linear-gradient(135deg, #FF6B6B, #FF9F43), shadow rgba(255,107,107,0.4)
Violet  : linear-gradient(135deg, #6C5CE7, #A29BFE), shadow rgba(108,92,231,0.4)
Teal    : linear-gradient(135deg, #00CEC9, #55EFC4), shadow rgba(0,206,201,0.35)
Outline : border 2px solid #6C5CE7, color #6C5CE7
```

### Tags
```css
padding: 6px 14px, border-radius 100px, font-size 12px, weight 600

Coral  : background rgba(255,107,107,0.1),  color #E85555
Violet : background rgba(108,92,231,0.1),   color #6C5CE7
Teal   : background rgba(0,206,201,0.1),    color #00A8A5
Pink   : background rgba(253,121,168,0.1),  color #D45E8A
Yellow : background rgba(254,202,87,0.15),  color #B8860B
```

### Input Fields
```css
border        : 1.5px solid #EEE9FF
border-radius : 12px
background    : #FDFCFF
focus border  : #6C5CE7
focus shadow  : 0 0 0 3px rgba(108,92,231,0.12)
```

---

## CSS 변수 (v2)

```css
:root {
  --coral        : #FF6B6B;
  --orange       : #FF9F43;
  --yellow       : #FECA57;
  --indigo       : #6C5CE7;
  --violet       : #A29BFE;
  --teal         : #00CEC9;
  --mint         : #55EFC4;
  --pink         : #FD79A8;
  --dark-bg      : #1E1B2E;
  --dark-surface : #2D2840;
  --bg           : #FFF9F5;
  --surface      : #FFFFFF;
  --gray-light   : #F0EEF8;
  --text         : #3D3557;
  --text-sub     : #7C7499;
  --text-muted   : #B0A8CC;
  --font-display : 'Plus Jakarta Sans', sans-serif;
  --font-body    : 'Pretendard', 'Noto Sans KR', sans-serif;
  --radius-md    : 12px;
  --radius-lg    : 20px;
  --radius-card  : 22px;
  --radius-full  : 100px;
  --shadow-card  : 0 20px 56px rgba(0,0,0,0.18);
  --shadow-hover : 0 32px 80px rgba(0,0,0,0.28);
}
```

---

---

# V3 — Aurum (Gold / Ivory)

## 브랜드 컨셉

**포지셔닝**
- 무드: 럭셔리 · 격조 · 프리미엄
- 핵심 인상: 고급 호텔 명함, 프라이빗 멤버십 카드
- 타겟: 전문직 · 임원 · 고급 프리랜서

**톤 앤 매너**
- Refined Luxury — 화려하지 않되 격이 있는
- 골드는 포인트로만, 아이보리로 공간의 여유를 표현
- 무거운 Obsidian과 따뜻한 크림의 대비로 깊이감 연출

---

## 컬러 시스템

### Gold Palette

| 이름 | HEX | 용도 |
|------|-----|------|
| Gold Deep | `#9A7B3E` | 브랜드 코어, 강조 텍스트 |
| Gold Mid | `#C4A45A` | 라인, 버튼, 태그 |
| Gold Light | `#E2C47A` | 그라디언트 끝, 카드 장식 |
| Gold Shine | `#F0D68A` | 하이라이트, 빛 효과 |
| Gold Pale | `#F5E8C4` | 배경 포인트 |

### Base Palette

| 이름 | HEX | 용도 |
|------|-----|------|
| Obsidian | `#12100E` | 히어로 배경, 시그니처 카드 |
| Dark Warm | `#1C1812` | 다크 섹션 배경 |
| Dark Mid | `#2A241C` | 다크 서피스 |
| Ivory | `#FAF6EE` | 메인 배경 |
| Ivory Dark | `#F0E9D8` | 섹션 배경 |
| Cream | `#EDE3CC` | 구분선, 인풋 배경 |
| Warm Sand | `#E8D9B8` | Sand 카드 |

### Text Colors

| 이름 | HEX | 용도 |
|------|-----|------|
| Text Warm | `#3A3020` | 본문 |
| Text Sub | `#7A6E58` | 보조 |
| Text Muted | `#B0A48A` | Placeholder |

### Accent Colors

| 이름 | HEX | 용도 |
|------|-----|------|
| Rouge | `#C0504A` | Burgundy 카드 |
| Sage | `#7A9E7E` | Forest 카드 |

### 컬러 사용 원칙
- 골드는 포인트 역할만 — 메인 컬러 아님
- 배경은 아이보리 계열로 따뜻한 공간감
- 다크 섹션은 Obsidian(#12100E) — 순수 검정보다 따뜻함
- 골드 그라디언트: `linear-gradient(135deg, #9A7B3E, #E2C47A)`
- 골드 텍스트 그라디언트: `linear-gradient(90deg, #9A7B3E, #E2C47A)`

---

## 타이포그래피

### 폰트 패밀리

```
Display / Serif : Cormorant Garamond
Body / UI       : Outfit
한국어          : Noto Sans KR
```

> CDN 임포트
> ```html
> <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,600&family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet">
> ```

### 타입 스케일

| 레벨 | 크기 | 굵기 | 폰트 |
|------|------|------|------|
| Display | 80–90px | 300 Light | Cormorant |
| H1 | 44–50px | 300–400 | Cormorant |
| H2 | 24px | 700 | Outfit |
| Body | 14px | 300–400 | Outfit/Noto |
| Caption | 10px | 500–600, 자간 5px | Outfit |

### 폰트 사용 원칙
- Cormorant 이탤릭체 적극 활용 → 우아함 극대화
- 골드 그라디언트 텍스트는 Display + 이탤릭 조합에만 적용
- 한국어 본문은 Noto Sans KR weight 300 사용
- 명함 로고는 Cormorant letter-spacing 4px

---

## 명함 카드 테마 6종

### 카드 공통 스펙
```
크기          : 330 × 194px
Border Radius : 18px
Hover         : translateY(-8px) scale(1.015)
              cubic-bezier(.34,1.4,.64,1) 0.4s
명함 로고     : Cormorant Garamond, letter-spacing 4px
이름          : Cormorant Garamond, 22px
테마 라벨     : 우상단 pill, font-size 8px
```

### Theme 1 — Obsidian Gold (시그니처)
```css
background : #12100E
border     : none
shadow     : 0 20px 60px rgba(0,0,0,0.5)

::before → radial-gradient ellipse 70% 60% at 80% 20%
          rgba(194,164,90,0.14) → transparent
::after  → 하단 1px 라인
          linear-gradient(90deg, transparent, #C4A45A, transparent)

로고   : gradient #E2C47A → #C4A45A (텍스트 그라디언트)
이름   : #FAF6EE
직책   : rgba(250,246,238,0.6)
연락처 : rgba(250,246,238,0.5)
장식   : 우하단 SVG 코너 패턴 (골드 선, opacity 0.2)
pill   : background rgba(194,164,90,0.15), color #E2C47A
        border 1px solid rgba(194,164,90,0.25)
```

### Theme 2 — Ivory Gold (라이트)
```css
background : linear-gradient(135deg, #FAF6EE, #F0E9D8)
border     : 1px solid rgba(194,164,90,0.2)
shadow     : 0 16px 48px rgba(58,48,32,0.12)

상단 라인  : linear-gradient(90deg, #9A7B3E, #E2C47A, #9A7B3E), height 2px

로고   : #9A7B3E
이름   : #3A3020
직책   : #7A6E58
연락처 : #7A6E58
pill   : background rgba(154,123,62,0.1), color #9A7B3E
```

### Theme 3 — Burgundy
```css
background : linear-gradient(135deg, #2C1010, #1A0A0A)
border     : 1px solid rgba(192,80,74,0.2)
shadow     : 0 20px 60px rgba(0,0,0,0.45)

::before → 우상단 원형 rgba(192,80,74,0.1), 200px

로고   : rgba(192,80,74,0.8)
이름   : #FAF6EE
직책   : rgba(250,246,238,0.5)
연락처 : rgba(250,246,238,0.4)
pill   : background rgba(192,80,74,0.15), color #D4706A
        border 1px solid rgba(192,80,74,0.2)
```

### Theme 4 — Warm Sand
```css
background : linear-gradient(135deg, #E8D9B8, #D4C49A)
shadow     : 0 16px 48px rgba(58,48,32,0.18)

::before → radial-gradient ellipse 50% 50% at 85% 85%
          rgba(255,255,255,0.25)

로고   : rgba(58,48,32,0.6)
이름   : #3A3020
직책   : #7A6E58
연락처 : #7A6E58
pill   : background rgba(58,48,32,0.1), color #3A3020
```

### Theme 5 — Forest Sage
```css
background : linear-gradient(135deg, #1A2818, #0F1C10)
border     : 1px solid rgba(122,158,126,0.2)
shadow     : 0 20px 60px rgba(0,0,0,0.4)

::before → radial-gradient ellipse 60% 60% at 80% 80%
          rgba(122,158,126,0.12)

로고   : #7A9E7E
이름   : #FAF6EE
직책   : rgba(250,246,238,0.5)
연락처 : rgba(250,246,238,0.4)
pill   : background rgba(122,158,126,0.15), color #7A9E7E
        border 1px solid rgba(122,158,126,0.2)
```

### Theme 6 — Graphite
```css
background : linear-gradient(135deg, #1C1C1E, #2C2C2E)
border     : 1px solid rgba(250,246,238,0.06)
shadow     : 0 20px 60px rgba(0,0,0,0.4)

::after → 상단 1px 라인
          linear-gradient(90deg, transparent, rgba(250,246,238,0.15), transparent)

로고   : rgba(250,246,238,0.3)
이름   : rgba(250,246,238,0.9)
직책   : rgba(250,246,238,0.35)
연락처 : rgba(250,246,238,0.3)
pill   : background rgba(250,246,238,0.07), color rgba(250,246,238,0.5)
```

---

## UI 컴포넌트

### Buttons
```css
공통: border-radius 10px, padding 11px 22px, font-size 13px, weight 600

Gold   : linear-gradient(135deg, #C4A45A, #9A7B3E), shadow rgba(154,123,62,0.4)
Dark   : background #1C1812, shadow rgba(0,0,0,0.3)
Outline: border 1.5px solid #C4A45A, color #9A7B3E
Ivory  : background #F0E9D8, border 1px solid #EDE3CC, color #3A3020
```

### Tags
```css
Gold  : background rgba(194,164,90,0.12), color #9A7B3E
        border 1px solid rgba(194,164,90,0.2)
Warm  : background #EDE3CC, color #7A6E58
Rouge : background rgba(192,80,74,0.1), color #C0504A
Sage  : background rgba(122,158,126,0.1), color #7A9E7E
```

### Input Fields
```css
border        : 1px solid rgba(194,164,90,0.2)
border-radius : 10px
background    : #FAF6EE
focus border  : #C4A45A
focus shadow  : 0 0 0 3px rgba(194,164,90,0.1)
```

---

## CSS 변수 (v3)

```css
:root {
  --gold-deep   : #9A7B3E;
  --gold-mid    : #C4A45A;
  --gold-light  : #E2C47A;
  --gold-shine  : #F0D68A;
  --obsidian    : #12100E;
  --dark-warm   : #1C1812;
  --ivory       : #FAF6EE;
  --ivory-dark  : #F0E9D8;
  --cream       : #EDE3CC;
  --text-warm   : #3A3020;
  --text-sub    : #7A6E58;
  --text-muted  : #B0A48A;
  --rouge       : #C0504A;
  --sage        : #7A9E7E;
  --font-display: 'Cormorant Garamond', serif;
  --font-body   : 'Outfit', 'Noto Sans KR', sans-serif;
  --radius-md   : 10px;
  --radius-lg   : 18px;
  --radius-full : 100px;
  --shadow-card : 0 20px 60px rgba(0,0,0,0.5);
  --shadow-light: 0 16px 48px rgba(58,48,32,0.12);
}
```

---

---

# V4 — Indigo Script (진한 청색 + 흘림체)

## 브랜드 컨셉

**포지셔닝**
- 무드: 깊이 · 신뢰 · 우아함
- 핵심 인상: 깊은 바다, 밤하늘, 고요한 힘
- 타겟: 전 연령 · 품격 있는 이미지를 원하는 전문직

**톤 앤 매너**
- Deep & Elegant — 강렬하되 차분하게
- 진한 네이비 단일 계열로 일관된 인상
- 흘림체 로고로 부드러움과 개성 동시 표현
- 스캔라인/빛 줄기 등 미세 텍스처로 깊이감 연출

---

## 컬러 시스템

### Navy / Blue Palette

| 이름 | HEX | 용도 |
|------|-----|------|
| Deep Navy | `#050C1A` | 브랜드 코어, 히어로 배경 |
| Navy Rich | `#091428` | 카드 배경 |
| Navy Mid | `#0C1D3D` | 서피스 |
| Navy Surf | `#112250` | 카드 그라디언트 |
| Navy Light | `#1A3368` | 보조 배경 |
| Indigo | `#1B2F6E` | 기본 컬러 |
| Royal | `#2441A0` | Primary |
| Cobalt | `#1455C8` | CTA · 주요 액션 |
| Sky Accent | `#4F8EF7` | 하이라이트, 강조 |
| Ice Blue | `#C8D8F8` | 라이트 강조, 카드 텍스트 |
| Ice Pale | `#EBF1FD` | 라이트 배경, 섹션 |

### Neutral

| 이름 | HEX | 용도 |
|------|-----|------|
| White Warm | `#F4F6FB` | 메인 배경 |
| Silver | `#C8D0DC` | 구분선 |
| Silver Light | `#E8EDF5` | 인풋 배경 |
| Text Dark | `#0A1628` | 본문 텍스트 |
| Text Mid | `#3A4E72` | 보조 텍스트 |
| Text Sub | `#7A8EAA` | 설명 텍스트 |
| Text Muted | `#AAB8CC` | Placeholder |

### 컬러 사용 원칙
- 청색 단일 계열만 사용 — 다른 계열 컬러 혼용 금지
- 히어로 배경은 Deep Navy(#050C1A) + 방사형 그라디언트 레이어
- Sky Accent(#4F8EF7)는 강조/하이라이트 포인트에만
- 다크 배경 텍스트: Ice Blue 계열로 명도 조절
- 보상 포인트 그라디언트: `linear-gradient(90deg, #2441A0, #4F8EF7)`

### 히어로 배경 효과
```css
/* 레이어드 방사형 그라디언트 */
background:
  radial-gradient(ellipse 55% 70% at 75% 35%, rgba(36,65,160,0.45) 0%, transparent 65%),
  radial-gradient(ellipse 35% 50% at 15% 75%, rgba(20,85,200,0.2) 0%, transparent 55%),
  radial-gradient(ellipse 25% 35% at 90% 85%, rgba(79,142,247,0.12) 0%, transparent 50%);

/* 미세 수평 스캔라인 */
background: repeating-linear-gradient(
  0deg,
  transparent, transparent 3px,
  rgba(79,142,247,0.015) 3px, rgba(79,142,247,0.015) 4px
);

/* 우측 빛 줄기 */
background: conic-gradient(
  from 200deg at 100% 50%,
  transparent 0deg,
  rgba(36,65,160,0.12) 15deg,
  transparent 30deg
);
```

---

## 타이포그래피

### 폰트 패밀리

```
Script (브랜드 로고) : Great Vibes (흘림체)
Serif (서브 타이틀)  : Italiana
Body / UI            : Noto Sans KR
```

> CDN 임포트
> ```html
> <link href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Italiana&family=Noto+Sans+KR:wght@300;400;500;700&display=swap" rel="stylesheet">
> ```

### 타입 스케일

| 레벨 | 크기 | 폰트 | 용도 |
|------|------|------|------|
| Brand Logo | 100–120px | Great Vibes | 히어로 메인 타이틀 |
| Card Logo | 26–28px | Great Vibes | 명함 카드 내 로고 |
| Sub Title | 15px | Italiana, 자간 10px | Meet · Interact 태그라인 |
| H2 | 24px | Noto 700 | 섹션 제목 |
| Body | 14px | Noto 300 | 본문 |
| Caption | 10px | Noto 600, 자간 5px | 레이블 |

### 흘림체 스타일링
```css
/* 히어로 타이틀 */
font-family : 'Great Vibes', cursive;
font-size   : 120px;
line-height : 0.85;
letter-spacing : 2px;
color       : #FFFFFF;
text-shadow :
  0 0 60px rgba(79,142,247,0.4),
  0 2px 4px rgba(0,0,0,0.5);

/* 그라디언트 효과 */
background: linear-gradient(135deg, #C8D8F8 0%, #4F8EF7 40%, #FFFFFF 70%, #A8C4F0 100%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;

/* 카드 내 로고 */
font-size   : 26–28px;
letter-spacing : 1px;
text-shadow : 0 0 30px rgba(79,142,247,0.5);
```

### 장식 요소
```css
/* 골드라인 대신 — 청색 가는 선 */
.hero-rule-line    : background linear-gradient(90deg, #1455C8, rgba(36,65,160,0.1))
.rule-diamond      : background #4F8EF7, 5×5px rotate(45deg), box-shadow 0 0 8px #4F8EF7
.eyebrow-line      : width 40px, background linear-gradient(90deg, #1455C8, transparent)
```

---

## 명함 카드 테마 6종

### 카드 공통 스펙
```
크기          : 334 × 196px
Border Radius : 20px
Hover         : translateY(-8px) scale(1.015)
              cubic-bezier(.34,1.4,.64,1) 0.38s
명함 로고     : Great Vibes, 26px (흘림체 통일)
이름          : Italiana, 20px, letter-spacing 1px
테마 라벨     : 우상단 pill
```

### Theme 1 — Deep Navy (시그니처)
```css
background : linear-gradient(145deg, #112250 0%, #050C1A 100%)
border     : 1px solid rgba(79,142,247,0.15)
shadow     : 0 20px 60px rgba(5,12,26,0.6)

::before → radial-gradient ellipse 65% 55% at 80% 20%
          rgba(36,65,160,0.5) → transparent
::after  → 하단 1px 라인
          linear-gradient(90deg, transparent, rgba(79,142,247,0.4), transparent)

로고   : #C8D8F8, text-shadow 0 0 30px rgba(79,142,247,0.5)
이름   : #FFFFFF
직책   : rgba(200,216,248,0.7)
연락처 : rgba(200,216,248,0.5)
pill   : background rgba(79,142,247,0.15), color #4F8EF7
        border 1px solid rgba(79,142,247,0.25)
```

### Theme 2 — Royal Blue
```css
background : linear-gradient(145deg, #2441A0 0%, #1B2F6E 100%)
shadow     : 0 20px 56px rgba(5,12,26,0.45)

::before → radial-gradient ellipse 50% 50% at 90% 10%
          rgba(255,255,255,0.1) → transparent

로고   : rgba(255,255,255,0.9)
이름   : #FFFFFF
직책   : rgba(200,216,248,0.7)
연락처 : rgba(200,216,248,0.6)
pill   : background rgba(255,255,255,0.15), color rgba(255,255,255,0.85)
```

### Theme 3 — Ice (라이트)
```css
background : linear-gradient(145deg, #FFFFFF 0%, #EBF1FD 100%)
border     : 1px solid rgba(36,65,160,0.12)
shadow     : 0 16px 48px rgba(5,12,26,0.1)

상단 라인  : linear-gradient(90deg, #0C1D3D, #1455C8, #4F8EF7), height 2.5px

로고   : #0C1D3D
이름   : #0A1628
직책   : #7A8EAA
연락처 : #7A8EAA
pill   : background rgba(20,85,200,0.08), color #1455C8
```

### Theme 4 — Cobalt Bright
```css
background : linear-gradient(145deg, #1455C8 0%, #0B3D8C 100%)
shadow     : 0 20px 56px rgba(5,12,26,0.45)

::before → 우상단 원형 rgba(255,255,255,0.07), 220px

로고   : rgba(200,216,248,0.85)
이름   : #FFFFFF
직책   : rgba(200,216,248,0.65)
연락처 : rgba(200,216,248,0.5)
pill   : background rgba(255,255,255,0.15), color rgba(255,255,255,0.85)
```

### Theme 5 — Midnight Denim
```css
background : linear-gradient(145deg, #1A2A4A 0%, #0D1A30 100%)
border     : 1px solid rgba(200,216,248,0.06)
shadow     : 0 20px 56px rgba(5,12,26,0.5)

::after → 상단 1px 라인
          linear-gradient(90deg, transparent, rgba(200,216,248,0.2), transparent)

로고   : rgba(200,216,248,0.7)
이름   : rgba(255,255,255,0.9)
직책   : rgba(200,216,248,0.4)
연락처 : rgba(200,216,248,0.35)
pill   : background rgba(200,216,248,0.08), color rgba(200,216,248,0.55)
```

### Theme 6 — Silver Frost (라이트)
```css
background : linear-gradient(145deg, #E8EDF8 0%, #D4DCF0 100%)
border     : 1px solid rgba(36,65,160,0.1)
shadow     : 0 16px 48px rgba(5,12,26,0.1)

::before → radial-gradient ellipse 60% 60% at 80% 80%
          rgba(255,255,255,0.5) → transparent

로고   : #1B2F6E
이름   : #0A1628
직책   : #3A4E72
연락처 : #7A8EAA
pill   : background rgba(36,65,160,0.1), color #1B2F6E
```

---

## UI 컴포넌트

### Buttons
```css
공통: border-radius 10px, padding 11px 22px, font-size 13px, weight 600

Navy   : linear-gradient(135deg, #112250, #050C1A), shadow rgba(5,12,26,0.4)
Royal  : linear-gradient(135deg, #2441A0, #1B2F6E), shadow rgba(36,65,160,0.4)
Cobalt : linear-gradient(135deg, #1455C8, #2441A0), shadow rgba(20,85,200,0.4)
Sky    : linear-gradient(135deg, #4F8EF7, #1455C8), shadow rgba(79,142,247,0.4)
Outline: border 1.5px solid #1455C8, color #1455C8
Ghost  : background #EBF1FD, color #3A4E72
```

### Tags
```css
Navy   : background rgba(9,20,40,0.08),   color #0C1D3D
Royal  : background rgba(36,65,160,0.1),   color #2441A0
Cobalt : background rgba(20,85,200,0.1),   color #1455C8
Sky    : background rgba(79,142,247,0.12), color #1A5CC8
Ice    : background #EBF1FD, color #3A4E72
        border 1px solid rgba(36,65,160,0.1)
```

### Input Fields
```css
border        : 1.5px solid #E8EDF5
border-radius : 10px
background    : #F4F6FB
focus border  : #1455C8
focus shadow  : 0 0 0 3px rgba(20,85,200,0.1)
```

---

## CSS 변수 (v4)

```css
:root {
  --navy-deep   : #050C1A;
  --navy-rich   : #091428;
  --navy-mid    : #0C1D3D;
  --navy-surf   : #112250;
  --navy-light  : #1A3368;
  --indigo      : #1B2F6E;
  --royal       : #2441A0;
  --cobalt      : #1455C8;
  --sky         : #4F8EF7;
  --ice         : #C8D8F8;
  --ice-pale    : #EBF1FD;
  --white-warm  : #F4F6FB;
  --silver-lt   : #E8EDF5;
  --text-dark   : #0A1628;
  --text-mid    : #3A4E72;
  --text-sub    : #7A8EAA;
  --text-muted  : #AAB8CC;
  --font-script : 'Great Vibes', cursive;
  --font-serif  : 'Italiana', serif;
  --font-body   : 'Noto Sans KR', sans-serif;
  --radius-md   : 10px;
  --radius-lg   : 20px;
  --radius-full : 100px;
  --shadow-dark : 0 20px 60px rgba(5,12,26,0.6);
  --shadow-mid  : 0 20px 56px rgba(5,12,26,0.45);
  --shadow-lite : 0 16px 48px rgba(5,12,26,0.1);
}
```

---

---

## 공통 — HappyTree 게임 UI

### 보상 테이블 (전 버전 공통)

| 이벤트 | 보상 |
|--------|------|
| 🌱 앱 설치 + 첫 명함 생성 | 화분 1개 + ♥ 300,000 |
| 👀 내 명함 조회됨 | ♥ +10 |
| 💾 내 명함 저장됨 | ♥ +100 |
| 🤝 명함 교환 완료 | ♥ +50 |
| ✨ 신규 가입 추천 | ♥ +500 · ⭐ +1 |

### 보상 뱃지 공통 구조
```css
display       : inline-flex
align-items   : center
gap           : 10px
border-radius : 100px
padding       : 7–8px 16–18px 7–8px 7–8px

아이콘 원
  width/height  : 32–34px
  border-radius : 50%
  /* 버전별 색상 적용 */

포인트 텍스트
  font-weight : 700
  /* 버전별 그라디언트 적용 */
```

### 게임 아이콘
```
🌱 첫 시작, 새 화분
🪴 화분 성장, 레벨업
🌳 최고 레벨, 완성
⭐ 별 (프리미엄 재화)
♥  하트 (기본 재화)
```

---

## 공통 — 레이아웃 & 스페이싱

```
최대 너비  : 1200px
컨테이너   : 좌우 padding 52–60px (데스크탑) / 24px (모바일)
컬럼 Gap   : 18–24px
스페이싱   : 4 / 8 / 12 / 16 / 20 / 24 / 28 / 32 / 40 / 52 / 64px
```

### 공통 진입 애니메이션
```css
@keyframes rise {
  from { opacity: 0; transform: translateY(22px); }
  to   { opacity: 1; transform: translateY(0); }
}
.d1 { animation-delay: 0.05s; }
.d2 { animation-delay: 0.13s; }
.d3 { animation-delay: 0.21s; }
.d4 { animation-delay: 0.30s; }
.d5 { animation-delay: 0.38s; }
.d6 { animation-delay: 0.46s; }
```

### 카드 호버 공통
```css
transition: transform 0.35–0.4s cubic-bezier(.34,1.4–1.56,.64,1),
            box-shadow 0.35–0.4s ease;
hover: translateY(-8px) scale(1.015–1.02)
```

---

## 버전 최종 비교

| 항목 | v1 Warm Pro | v2 Vibrant | v3 Aurum | v4 Indigo |
|------|------------|------------|----------|-----------|
| 메인 컬러 | Deep Teal | 멀티 그라디언트 | Gold/Ivory | Deep Navy |
| 배경 | 라이트+다크 혼용 | 다크 히어로 | 아이보리 | 다크 히어로 |
| 폰트 | DM Serif + Pretendard | Plus Jakarta Sans | Cormorant + Outfit | Great Vibes + Italiana |
| 명함 테마 | 3종 | 6종 | 6종 | 6종 |
| 타겟 | 30-40대 B2B | 20-30대 크리에이터 | 전문직·임원 | 전 연령·품격 |
| 인상 | 신뢰·안정 | 에너지·개성 | 럭셔리·격조 | 깊이·우아함 |
| 특징 | 균형잡힌 베이스 | 화사한 그라디언트 | 골드 포인트 | 흘림체 로고 |

---

*문서 버전: 통합본 v1.0 · 최종 수정: 2026-03-12*  
*METI Project — Private*
