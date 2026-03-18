# METI 디자인 외주 요구사항 문서

**작성일**: 2026-03-18  
**버전**: v1.0  
**대상**: 외부 디자이너/디자인 에이전시

---

## 📋 프로젝트 개요

### 프로젝트명
**METI** (Meet + Interact) - 디지털 명함 서비스

### 서비스 컨셉
"명함 한 장이 새로운 세계를 열다"
- 링크/QR로 공유 가능한 디지털 명함
- 앱 설치 없이 웹에서 열람/저장
- 모바일 우선 (Mobile-first) 디자인

### 타겟 유저
- **1차**: 30-40대 직장인 (중급 관리자, 영업/마케팅)
- **2차**: 20-30대 프리랜서 (디자이너, 개발자, 크리에이터)
- **3차**: 전문직/임원 (변호사, 회계사, 스타트업 대표)

### 디자인 톤앤매너
- **Warm Professional**: 따뜻하면서도 전문적인
- **Vibrant Personal**: 젊고 개성 있는 (서브)
- **신뢰감 + 친근함**의 균형

---

## 🎨 현재 디자인 시스템

### 컬러 팔레트

#### Primary Colors (주 색상)
```
Teal (청록)
- Primary: #1A4A5E
- Medium: #1E6B82
- Light: #2A8FA8

용도: 주요 버튼, 네비게이션, 강조
```

#### Accent Colors (강조 색상)
```
Mint Green (민트 그린)
- Primary: #2EC4A0
- Light: #4DDFC4
- Pale: #E6FAF6

용도: 게임 요소, 포인트 표시, 호버 효과
배분: UI의 30% (Teal 70%)
```

#### Neutral Colors (중립 색상)
```
Off White: #F5F7F8 (페이지 배경)
Gray Light: #EEF1F3 (카드 배경)
Gray Mid: #B0BEC5 (플레이스홀더)
Charcoal: #2D3A3E (메인 텍스트)
Text Light: #637074 (보조 텍스트)
```

#### Dark Mode
```
Dark BG: #1E1B2E (메인 배경)
Dark Surface: #2D2840 (카드/패널)
```

### 타이포그래피

#### 폰트 패밀리
```
영문 헤드라인: DM Serif Display
한글 UI: Pretendard
코드/HEX: JetBrains Mono
```

#### 타입 스케일
```
Display: 48-72px (랜딩 히어로)
H1: 32px (페이지 제목)
H2: 24px (섹션 제목)
H3: 18px (서브 섹션)
Body: 15px (본문)
Small: 13px (캡션)
Caption: 11px (힌트)
```

### 명함 디자인 스펙

#### 명함 카드 크기
```
가로: 340px
세로: 200px
모서리: 20px radius
그림자: 0 20px 60px rgba(0,0,0,0.15)
```

#### QR 코드
```
크기: 60x60px (카드 우측 하단)
불투명도: 30-35%
```

#### 테마 (10가지)
1. Deep Navy (#0A2260) - 신뢰감 있는 클래식
2. Midnight Teal (#0D3D4D) - 세련된 청록
3. Forest Deep (#1A3D2E) - 자연의 깊은 초록
4. Royal Burgundy (#4A1E2E) - 고급스러운 버건디
5. Charcoal Dark (#1C1C1E) - 모던한 차콜
6. Slate Blue (#2C3E50) - 중후한 슬레이트 블루
7. Deep Purple (#3D2857) - 창의적인 딥 퍼플
8. Warm Brown (#3E2723) - 따뜻한 브라운
9. Olive Night (#3D4A2C) - 차분한 올리브
10. Sunset Orange (#8B4513) - 따뜻한 석양

---

## 📱 디자인 범위

### 필수 화면 (Priority 1)

#### 1. 랜딩 페이지 (`/`)
- **목적**: 서비스 소개 및 회원가입 유도
- **구성요소**:
  - Hero Section (히어로 섹션)
  - Feature Cards (주요 기능 3-4개)
  - Testimonials (사용자 후기)
  - CTA Button (회원가입 유도)
  - Footer
- **디바이스**: Desktop (1920px), Tablet (768px), Mobile (390px)

#### 2. 공개 명함 페이지 (`/c/:id`)
- **목적**: 명함 열람 및 저장
- **구성요소**:
  - 명함 카드 (프로필 사진, 이름, 직책, 회사, 연락처)
  - 소셜 링크 버튼
  - 저장/공유 버튼
  - QR 코드
- **디바이스**: Mobile-first (390px), Tablet (768px)
- **특이사항**: 모바일에서 가장 많이 사용됨

#### 3. 명함 생성/수정 페이지 (`/my/card/new`, `/my/card/:id/edit`)
- **목적**: 명함 정보 입력 및 편집
- **구성요소**:
  - 2단 레이아웃 (폼 + 실시간 미리보기)
  - 프로필 사진 업로드
  - 입력 폼 (이름, 연락처, 직책, 회사 등)
  - 테마 선택기 (10가지 색상)
  - 소셜 링크 관리 (최대 5개)
- **디바이스**: Mobile (390px), Desktop (1440px)
- **특이사항**: 
  - 모바일에서는 폼과 미리보기가 세로 배치
  - 실시간 미리보기 필수

#### 4. 내 명함 목록 (`/my/cards`)
- **목적**: 생성한 명함 관리
- **구성요소**:
  - 명함 카드 그리드 (최대 5개)
  - 검색 바
  - 새 명함 만들기 버튼
  - 명함 카드 액션 (보기, 공유, 수정, 삭제)
- **디바이스**: Mobile (390px), Desktop (1200px)

### 추가 화면 (Priority 2)

#### 5. 회원가입/로그인 (`/auth/register`, `/auth/login`)
- **목적**: 사용자 인증
- **구성요소**:
  - 이메일/비밀번호 입력
  - 소셜 로그인 버튼 (Google, Kakao - 예정)
  - 약관 동의 체크박스
- **디바이스**: Mobile (390px), Desktop (1200px)

#### 6. 명함 지갑 (`/my/wallet`)
- **목적**: 받은 명함 저장 및 관리
- **구성요소**:
  - 명함 카드 그리드
  - 검색/필터
  - 그룹/태그 관리
  - 즐겨찾기
- **디바이스**: Mobile (390px), Desktop (1200px)

#### 7. HappyTree 게임 (`/game`)
- **목적**: 게임화를 통한 참여 유도
- **구성요소**:
  - 화분 목록 (3-5개)
  - 포인트 표시
  - 물주기 버튼
  - 수확 애니메이션
  - 레벨 진행 바
- **디바이스**: Mobile (390px)
- **톤**: Playful, Fun (Mint 색상 활용)

### 컴포넌트 (공통)

#### 버튼
```
Primary: Teal 그라데이션 (135deg)
Accent: Mint 그라데이션 (135deg)
Outline: 1.5px border
Ghost: 투명 배경

크기:
- Large: 14px text, 12px 24px padding
- Medium: 13px text, 10px 20px padding
- Small: 12px text, 8px 16px padding

모서리: 12px radius
호버: translateY(-2px) + shadow
```

#### 입력 필드
```
padding: 14px 18px
border-radius: 12px
border: 1.5px solid #EEF1F3
focus: border #1E6B82

placeholder: #B0BEC5
text: #2D3A3E
```

#### 태그/뱃지
```
padding: 6px 14px
border-radius: 100px (pill shape)
font-size: 12px, weight 500

색상:
- Teal: #1A4A5E bg, white text
- Mint: #E6FAF6 bg, #2EC4A0 text
- Gray: #EEF1F3 bg, #637074 text
```

---

## 📦 작업물 제출 형식

### 1. Figma 파일 구조

#### 페이지 구성
```
📁 METI Design System
  ├─ 🎨 Design System
  │   ├─ Colors
  │   ├─ Typography
  │   ├─ Components
  │   └─ Icons
  ├─ 📱 Mobile Screens (390px)
  │   ├─ Landing
  │   ├─ Public Card
  │   ├─ Card Editor
  │   ├─ My Cards
  │   └─ Auth
  ├─ 💻 Desktop Screens (1440px)
  │   ├─ Landing
  │   ├─ Card Editor
  │   └─ My Cards
  └─ 🧩 Components Library
      ├─ Buttons
      ├─ Forms
      ├─ Cards
      └─ Navigation
```

#### 컴포넌트 작성 규칙
- ✅ **Auto Layout 사용** (반응형 대응)
- ✅ **컴포넌트화** (재사용 가능하도록)
- ✅ **Variants 활용** (버튼 상태, 카드 테마 등)
- ✅ **명명 규칙**: `Component/Variant/State` (예: `Button/Primary/Hover`)
- ✅ **8px Grid 시스템** 준수

### 2. 에셋 Export 규격

#### 아이콘
```
형식: SVG
크기: 24x24px, 20x20px, 16x16px
색상: Single color (#2D3A3E)
명명: icon-{name}-{size}.svg
예시: icon-user-24.svg

필수 아이콘 목록:
- icon-user (사용자)
- icon-card (명함)
- icon-wallet (지갑)
- icon-game (게임)
- icon-qr (QR코드)
- icon-share (공유)
- icon-edit (편집)
- icon-delete (삭제)
- icon-search (검색)
- icon-plus (추가)
- icon-check (확인)
- icon-close (닫기)
- icon-arrow-left (뒤로)
- icon-arrow-right (앞으로)
- icon-download (다운로드)
- icon-upload (업로드)
- icon-link (링크)
- icon-phone (전화)
- icon-email (이메일)
- icon-company (회사)
```

#### 이미지
```
형식: PNG (투명 배경), JPG (사진)
크기: 
  - @1x (기본)
  - @2x (Retina)
  - @3x (고해상도)
명명: image-{name}@{scale}.{ext}
예시: image-hero@2x.png

압축: TinyPNG 또는 ImageOptim 사용
```

#### 로고
```
형식: SVG (벡터), PNG (래스터)
크기:
  - Full: 200px height
  - Icon: 64x64px, 32x32px
색상: 
  - Primary (기본)
  - White (어두운 배경용)
  - Black (밝은 배경용)
명명: 
  - logo-full.svg
  - logo-icon-64.svg
  - logo-white.svg
```

### 3. CSS Variable 추출

**디자인 시스템 → CSS 변환 자동화를 위해:**

#### 컬러
```css
/* Figma에서 Color Styles를 다음 형식으로 명명 */
Primary/Teal/Base
Primary/Teal/Medium
Primary/Teal/Light
Accent/Mint/Base
Accent/Mint/Light
Neutral/OffWhite
...

/* 자동 변환 예시 */
--color-primary-teal-base: #1A4A5E;
--color-primary-teal-medium: #1E6B82;
--color-accent-mint-base: #2EC4A0;
```

#### 타이포그래피
```css
/* Figma Text Styles 명명 */
Display/Large
Heading/H1
Heading/H2
Body/Regular
Body/Small
...

/* 자동 변환 예시 */
--font-display-large: 72px/1.2 'DM Serif Display';
--font-heading-h1: 32px/1.4 'Pretendard';
```

#### 간격 (Spacing)
```css
/* 8px Grid System */
--spacing-1: 8px;
--spacing-2: 16px;
--spacing-3: 24px;
--spacing-4: 32px;
--spacing-5: 40px;
--spacing-6: 48px;
```

### 4. 프로토타입 (선택)

**인터랙션이 중요한 화면:**
- 명함 테마 선택 애니메이션
- 명함 카드 뒤집기 효과
- 소셜 링크 추가/삭제 인터랙션
- 게임 화분 물주기 애니메이션

**Figma Prototype 설정:**
- Flow: User Journey 기반
- Transition: Smart Animate 활용
- Duration: 200-300ms (부드러운 애니메이션)

---

## 💾 파일 제출 체크리스트

### Figma 파일
- [ ] **공유 링크**: View & Comment 권한
- [ ] **페이지 구성**: Design System, Mobile, Desktop, Components
- [ ] **컴포넌트**: 재사용 가능하게 작성
- [ ] **네이밍**: 일관성 있는 명명 규칙
- [ ] **반응형**: Auto Layout 적용

### 에셋 (ZIP 파일)
```
meti-design-assets.zip
├── icons/
│   ├── svg/
│   │   ├── icon-user-24.svg
│   │   ├── icon-card-24.svg
│   │   └── ...
│   └── png/ (필요시)
├── images/
│   ├── hero@2x.png
│   ├── feature-1@2x.png
│   └── ...
├── logos/
│   ├── logo-full.svg
│   ├── logo-full.png
│   ├── logo-icon-64.svg
│   └── logo-white.svg
└── fonts/ (웹폰트 라이센스 확인 필요)
    ├── Pretendard-Regular.woff2
    └── ...
```

### 문서
- [ ] **디자인 가이드**: 컬러, 타이포그래피, 컴포넌트 사용법
- [ ] **변경 사항 로그**: 현재 디자인 대비 변경 내용
- [ ] **반응형 브레이크포인트**: Mobile, Tablet, Desktop 기준
- [ ] **접근성 체크**: 색상 대비율 (WCAG AA 기준)

---

## 🎯 디자인 제약사항

### 기술적 제약
1. **Cloudflare Pages 배포**: 정적 파일만 가능
2. **CDN 라이브러리 활용**: TailwindCSS, FontAwesome
3. **프레임워크**: Hono (백엔드), React (프론트엔드 - 최소 사용)
4. **모바일 우선**: 90% 이상 모바일 사용 예상

### 성능 제약
1. **LCP < 2.5초**: Largest Contentful Paint (모바일)
2. **이미지 최적화**: WebP 권장, PNG/JPG 압축 필수
3. **폰트 서브셋**: 한글 2,350자 + 영문 (용량 최소화)

### 브랜드 제약
1. **로고 변경 불가**: 현재 "METI" 워드마크 유지
2. **주 색상 유지**: Teal + Mint 조합 필수
3. **톤앤매너**: Warm Professional 지향

---

## 📞 커뮤니케이션

### 진행 방식
1. **킥오프 미팅**: 프로젝트 이해 및 질문 (1시간)
2. **1차 시안**: 주요 화면 3개 (랜딩, 공개 명함, 명함 편집)
3. **피드백**: 수정 요청 및 방향 조정
4. **2차 시안**: 전체 화면 완성
5. **최종 검수**: 에셋 추출 및 문서 정리

### 제공 자료
- ✅ 현재 디자인 가이드 (`docs/design/METI_DESIGN_GUIDE_ALL.md`)
- ✅ 프로젝트 PRD (`docs/01_PRD.md`)
- ✅ 화면 플로우 (`docs/02_SCREENS_AND_FLOWS.md`)
- ✅ 현재 구현된 웹사이트 (테스트 URL)
- ✅ 경쟁사 벤치마크 (요청 시)

### 질문 채널
- **이메일**: [프로젝트 담당자 이메일]
- **Slack/Discord**: [워크스페이스 초대]
- **응답 시간**: 영업일 기준 24시간 이내

---

## 💰 예산 및 일정

### 예산 (참고)
```
페이지당 20-30만원 (모바일 + 데스크톱)
컴포넌트 라이브러리: 50-100만원
총 예상: 200-400만원
```

### 일정 (참고)
```
Week 1: 킥오프 + 1차 시안 (주요 화면 3개)
Week 2: 피드백 + 2차 시안 (전체 화면)
Week 3: 최종 검수 + 에셋 추출
Week 4: 개발팀 적용 지원 (선택)
```

---

## ✅ 검수 기준

### 디자인 품질
- [ ] **일관성**: 모든 화면이 동일한 디자인 시스템 사용
- [ ] **반응형**: Mobile, Tablet, Desktop 모두 대응
- [ ] **접근성**: 색상 대비율 4.5:1 이상 (WCAG AA)
- [ ] **사용성**: 터치 영역 최소 44x44px (모바일)

### 기술 준수
- [ ] **컴포넌트화**: 재사용 가능하게 작성
- [ ] **네이밍**: 일관성 있는 명명 규칙
- [ ] **에셋 최적화**: 이미지 압축, SVG 정리
- [ ] **폰트 라이센스**: 웹폰트 사용 권한 확인

### 문서화
- [ ] **디자인 가이드**: 사용법 명시
- [ ] **변경 로그**: 수정 내역 기록
- [ ] **컴포넌트 스펙**: 크기, 색상, 간격 명시

---

## 📎 참고 링크

### 디자인 레퍼런스
- **Linktree**: https://linktr.ee (소셜 링크 관리)
- **Bento**: https://bento.me (개인 프로필)
- **Card**: https://card.me (디지털 명함)
- **Carrd**: https://carrd.co (심플한 랜딩)

### 기술 문서
- **TailwindCSS**: https://tailwindcss.com/docs
- **FontAwesome**: https://fontawesome.com/icons
- **Cloudflare Pages**: https://pages.cloudflare.com

### 현재 구현
- **테스트 URL**: [제공 예정]
- **Figma 원본**: [제공 예정]
- **디자인 가이드**: `/docs/design/METI_DESIGN_GUIDE_ALL.md`

---

**문의**: [프로젝트 담당자]  
**최종 수정**: 2026-03-18  
**버전**: v1.0
