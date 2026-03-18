# 디자인 에셋 적용 가이드 (개발자용)

**작성일**: 2026-03-18  
**버전**: v1.0  
**대상**: METI 개발팀

---

## 📋 개요

외주 디자이너로부터 받은 디자인 에셋을 METI 프로젝트에 통합하는 가이드입니다.

---

## 📦 에셋 받기 전 체크리스트

### 1. Figma 파일 확인
- [ ] **공유 링크 접근 가능** (View & Comment 권한)
- [ ] **페이지 구성 확인** (Design System, Mobile, Desktop, Components)
- [ ] **컴포넌트 라이브러리 존재** (재사용 가능)
- [ ] **Auto Layout 적용** (반응형 대응)
- [ ] **네이밍 일관성** (Component/Variant/State)

### 2. 에셋 ZIP 파일 확인
```
meti-design-assets.zip
├── icons/ (SVG 필수)
├── images/ (PNG @2x 필수)
├── logos/ (SVG + PNG)
└── fonts/ (선택, 라이센스 확인)
```

### 3. 문서 확인
- [ ] **디자인 가이드 PDF/Markdown**
- [ ] **변경 사항 로그**
- [ ] **컴포넌트 스펙 시트** (크기, 색상, 간격)

---

## 🗂️ 에셋 정리 및 배치

### 1. 디렉토리 구조 생성

```bash
cd /home/user/meti/apps/web

# 디렉토리 생성
mkdir -p public/assets/icons
mkdir -p public/assets/images
mkdir -p public/assets/logos
mkdir -p public/fonts
mkdir -p src/styles/design-system
```

### 2. 에셋 배치

#### 아이콘 (SVG)
```bash
# icons/*.svg → public/assets/icons/
cp meti-design-assets/icons/svg/*.svg public/assets/icons/

# 파일명 정규화 (소문자, 하이픈)
# icon-user-24.svg → icon-user-24.svg (이미 정규화됨)
```

**사용 예시:**
```html
<!-- HTML에서 -->
<img src="/assets/icons/icon-user-24.svg" alt="User" />

<!-- 또는 inline SVG -->
<svg class="icon-user">
  <use href="/assets/icons/icon-user-24.svg#icon"></use>
</svg>
```

#### 이미지 (PNG/JPG)
```bash
# images/*.png → public/assets/images/
cp meti-design-assets/images/*.png public/assets/images/

# @2x 이미지만 사용 (Retina 대응)
# image-hero@2x.png
```

**사용 예시:**
```html
<!-- srcset으로 반응형 이미지 -->
<img 
  src="/assets/images/hero@2x.png" 
  srcset="/assets/images/hero@2x.png 2x"
  alt="Hero" 
/>
```

#### 로고 (SVG/PNG)
```bash
# logos/*.* → public/assets/logos/
cp meti-design-assets/logos/* public/assets/logos/
```

**사용 예시:**
```html
<!-- SVG 로고 (권장) -->
<img src="/assets/logos/logo-full.svg" alt="METI" class="logo" />

<!-- 다크 모드 -->
<img src="/assets/logos/logo-white.svg" alt="METI" class="logo-dark" />
```

#### 폰트 (웹폰트)
```bash
# fonts/*.woff2 → public/fonts/
cp meti-design-assets/fonts/*.woff2 public/fonts/

# 라이센스 확인 필수!
# Pretendard는 오픈소스 (SIL Open Font License)
```

**CSS 설정:**
```css
/* src/styles/fonts.css */
@font-face {
  font-family: 'Pretendard';
  src: url('/fonts/Pretendard-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'DM Serif Display';
  src: url('/fonts/DMSerifDisplay-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
```

---

## 🎨 디자인 시스템 통합

### 1. CSS Variables 추출

**Figma → CSS 자동 변환 (Figma Plugin 사용 권장)**

#### 플러그인 추천
- **Figma Tokens**: Design Tokens 추출
- **Style Dictionary**: 멀티 플랫폼 토큰 변환
- **CSS Gen**: CSS Variables 자동 생성

#### 수동 변환 (필요 시)

**컬러 추출:**
```css
/* src/styles/design-system/colors.css */
:root {
  /* Primary - Teal */
  --color-primary-teal-base: #1A4A5E;
  --color-primary-teal-medium: #1E6B82;
  --color-primary-teal-light: #2A8FA8;

  /* Accent - Mint */
  --color-accent-mint-base: #2EC4A0;
  --color-accent-mint-light: #4DDFC4;
  --color-accent-mint-pale: #E6FAF6;

  /* Neutral */
  --color-neutral-offwhite: #F5F7F8;
  --color-neutral-gray-light: #EEF1F3;
  --color-neutral-gray-mid: #B0BEC5;
  --color-neutral-charcoal: #2D3A3E;
  --color-neutral-text-light: #637074;

  /* Dark Mode */
  --color-dark-bg: #1E1B2E;
  --color-dark-surface: #2D2840;
}

/* Dark Mode Override */
[data-theme="dark"] {
  --color-bg: var(--color-dark-bg);
  --color-surface: var(--color-dark-surface);
}
```

**타이포그래피 추출:**
```css
/* src/styles/design-system/typography.css */
:root {
  /* Font Families */
  --font-display: 'DM Serif Display', serif;
  --font-body: 'Pretendard', -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* Font Sizes */
  --font-size-display: 72px;
  --font-size-h1: 32px;
  --font-size-h2: 24px;
  --font-size-h3: 18px;
  --font-size-body: 15px;
  --font-size-small: 13px;
  --font-size-caption: 11px;

  /* Line Heights */
  --line-height-tight: 1.2;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.75;

  /* Font Weights */
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
}

/* Typography Classes */
.text-display {
  font-family: var(--font-display);
  font-size: var(--font-size-display);
  line-height: var(--line-height-tight);
}

.text-h1 {
  font-family: var(--font-body);
  font-size: var(--font-size-h1);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-normal);
}

/* ... 나머지 타이포그래피 클래스 */
```

**간격 시스템:**
```css
/* src/styles/design-system/spacing.css */
:root {
  /* 8px Grid System */
  --spacing-1: 8px;
  --spacing-2: 16px;
  --spacing-3: 24px;
  --spacing-4: 32px;
  --spacing-5: 40px;
  --spacing-6: 48px;
  --spacing-7: 56px;
  --spacing-8: 64px;

  /* Semantic Spacing */
  --spacing-xs: var(--spacing-1);
  --spacing-sm: var(--spacing-2);
  --spacing-md: var(--spacing-3);
  --spacing-lg: var(--spacing-4);
  --spacing-xl: var(--spacing-5);
}
```

**모서리 (Border Radius):**
```css
/* src/styles/design-system/borders.css */
:root {
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 20px;
  --radius-full: 9999px; /* pill shape */

  /* Shadows */
  --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 4px 8px rgba(0, 0, 0, 0.15);
  --shadow-lg: 0 10px 20px rgba(0, 0, 0, 0.2);
  --shadow-xl: 0 20px 40px rgba(0, 0, 0, 0.25);
}
```

### 2. 컴포넌트 스타일 작성

**버튼 컴포넌트:**
```css
/* src/styles/components/button.css */
.btn {
  padding: var(--spacing-2) var(--spacing-3);
  border-radius: var(--radius-md);
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-semibold);
  font-family: var(--font-body);
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-1);
}

.btn-primary {
  background: linear-gradient(135deg, var(--color-primary-teal-base), var(--color-primary-teal-medium));
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.btn-accent {
  background: linear-gradient(135deg, var(--color-accent-mint-base), var(--color-accent-mint-light));
  color: white;
}

.btn-outline {
  background: transparent;
  border: 1.5px solid var(--color-primary-teal-base);
  color: var(--color-primary-teal-base);
}

.btn-ghost {
  background: transparent;
  color: var(--color-neutral-charcoal);
}
```

**입력 필드:**
```css
/* src/styles/components/input.css */
.input {
  padding: 14px 18px;
  border-radius: var(--radius-md);
  border: 1.5px solid var(--color-neutral-gray-light);
  font-size: var(--font-size-body);
  font-family: var(--font-body);
  color: var(--color-neutral-charcoal);
  transition: all 0.3s ease;
}

.input::placeholder {
  color: var(--color-neutral-gray-mid);
}

.input:focus {
  outline: none;
  border-color: var(--color-primary-teal-medium);
  box-shadow: 0 0 0 3px rgba(30, 107, 130, 0.1);
}
```

**카드:**
```css
/* src/styles/components/card.css */
.card {
  background: white;
  border-radius: var(--radius-xl);
  padding: var(--spacing-3);
  box-shadow: var(--shadow-md);
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.card-title {
  font-size: var(--font-size-h3);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-2);
}

.card-body {
  font-size: var(--font-size-body);
  color: var(--color-neutral-text-light);
  line-height: var(--line-height-relaxed);
}
```

### 3. Import 순서 (중요!)

**src/index.tsx 또는 main entry:**
```typescript
// 1. Reset & Base
import './styles/reset.css';

// 2. Design System (순서 중요!)
import './styles/design-system/colors.css';
import './styles/design-system/typography.css';
import './styles/design-system/spacing.css';
import './styles/design-system/borders.css';

// 3. Components
import './styles/components/button.css';
import './styles/components/input.css';
import './styles/components/card.css';

// 4. Fonts (마지막에 로드)
import './styles/fonts.css';
```

---

## 🔄 기존 코드 마이그레이션

### 1. Inline Styles → CSS Classes

**Before (Inline):**
```typescript
// Bad: 하드코딩된 스타일
return c.html(`
  <button style="background: #1A4A5E; color: white; padding: 12px 24px; border-radius: 12px;">
    클릭
  </button>
`);
```

**After (CSS Classes):**
```typescript
// Good: CSS 클래스 사용
return c.html(`
  <link rel="stylesheet" href="/styles/main.css">
  <button class="btn btn-primary">
    클릭
  </button>
`);
```

### 2. 색상 하드코딩 → CSS Variables

**Before:**
```css
.card {
  background: #F5F7F8;
  border: 1px solid #EEF1F3;
  color: #2D3A3E;
}
```

**After:**
```css
.card {
  background: var(--color-neutral-offwhite);
  border: 1px solid var(--color-neutral-gray-light);
  color: var(--color-neutral-charcoal);
}
```

### 3. 템플릿 파일 업데이트

**editor-styles.ts 마이그레이션:**
```typescript
// Before
export const editorStyles = `
  body {
    background: linear-gradient(135deg, #0A2260 0%, #1A3368 100%);
  }
`;

// After (CSS Variables 사용)
export const editorStyles = `
  :root {
    /* Design Tokens from Figma */
    --color-bg-gradient-start: #0A2260;
    --color-bg-gradient-end: #1A3368;
  }

  body {
    background: linear-gradient(135deg, 
      var(--color-bg-gradient-start), 
      var(--color-bg-gradient-end)
    );
  }
`;
```

---

## 📱 반응형 디자인 적용

### Breakpoints 정의

```css
/* src/styles/design-system/breakpoints.css */
:root {
  --breakpoint-mobile: 390px;
  --breakpoint-tablet: 768px;
  --breakpoint-desktop: 1440px;
  --breakpoint-wide: 1920px;
}

/* Media Query Helpers */
@custom-media --mobile (max-width: 767px);
@custom-media --tablet (min-width: 768px) and (max-width: 1023px);
@custom-media --desktop (min-width: 1024px);
```

### 반응형 적용 예시

```css
/* Mobile First Approach */
.container {
  padding: var(--spacing-2); /* 16px mobile */
  max-width: 100%;
}

/* Tablet */
@media (min-width: 768px) {
  .container {
    padding: var(--spacing-3); /* 24px tablet */
    max-width: 768px;
    margin: 0 auto;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .container {
    padding: var(--spacing-4); /* 32px desktop */
    max-width: 1200px;
  }
}
```

---

## 🖼️ 이미지 최적화

### 1. 자동 최적화 스크립트

```bash
# optimize-images.sh
#!/bin/bash

# PNG 최적화 (ImageMagick 필요)
for img in public/assets/images/*.png; do
  convert "$img" -quality 85 -strip "$img"
  echo "Optimized: $img"
done

# JPG 최적화
for img in public/assets/images/*.jpg; do
  convert "$img" -quality 85 -strip "$img"
  echo "Optimized: $img"
done

# WebP 변환 (권장)
for img in public/assets/images/*.{png,jpg}; do
  cwebp -q 85 "$img" -o "${img%.*}.webp"
  echo "Converted: $img → ${img%.*}.webp"
done
```

### 2. Picture Element 사용

```html
<!-- WebP 우선, PNG 폴백 -->
<picture>
  <source srcset="/assets/images/hero.webp" type="image/webp">
  <source srcset="/assets/images/hero@2x.png 2x" type="image/png">
  <img src="/assets/images/hero.png" alt="Hero" loading="lazy">
</picture>
```

---

## ✅ 적용 후 체크리스트

### 빌드 & 테스트
- [ ] `npm run build` 성공
- [ ] CSS 번들 크기 확인 (< 100KB 권장)
- [ ] 이미지 로딩 확인 (Network 탭)
- [ ] 폰트 로딩 확인 (FOUT/FOIT 방지)

### 반응형 테스트
- [ ] Mobile (390px): iPhone 14 Pro
- [ ] Tablet (768px): iPad
- [ ] Desktop (1440px): MacBook Pro

### 성능 테스트
- [ ] Lighthouse Score > 90 (Performance)
- [ ] LCP < 2.5초
- [ ] CLS < 0.1
- [ ] FID < 100ms

### 접근성 테스트
- [ ] 색상 대비율 > 4.5:1 (WCAG AA)
- [ ] 키보드 네비게이션 가능
- [ ] 스크린 리더 호환성
- [ ] Focus 스타일 명확

### 브라우저 호환성
- [ ] Chrome (최신)
- [ ] Safari (iOS 15+)
- [ ] Firefox (최신)
- [ ] Edge (최신)

---

## 🐛 트러블슈팅

### 문제 1: 폰트가 로드되지 않음
**원인**: CORS 에러 또는 경로 오류
**해결**:
```typescript
// wrangler.jsonc에 CORS 헤더 추가
{
  "routes": [
    {
      "pattern": "/fonts/*",
      "headers": {
        "Access-Control-Allow-Origin": "*"
      }
    }
  ]
}
```

### 문제 2: 이미지가 깨짐
**원인**: 잘못된 경로 또는 빌드 시 복사 누락
**해결**:
```typescript
// vite.config.ts
export default defineConfig({
  publicDir: 'public', // public 디렉토리 확인
  build: {
    assetsDir: 'assets' // 에셋 디렉토리 확인
  }
});
```

### 문제 3: CSS Variables가 적용 안 됨
**원인**: Import 순서 또는 Specificity 문제
**해결**:
```css
/* 1. :root에 변수 정의 확인 */
:root {
  --color-primary: #1A4A5E;
}

/* 2. 사용 시 fallback 제공 */
.button {
  background: var(--color-primary, #1A4A5E);
}
```

### 문제 4: 다크 모드가 동작 안 함
**원인**: data-theme 속성 누락
**해결**:
```typescript
// JavaScript로 테마 토글
function toggleTheme() {
  const html = document.documentElement;
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
}
```

---

## 📚 참고 자료

### CSS 방법론
- **BEM**: Block Element Modifier
- **ITCSS**: Inverted Triangle CSS
- **Utility-First**: TailwindCSS 방식

### 도구
- **Figma Plugin**: Figma Tokens, CSS Gen
- **이미지 최적화**: ImageMagick, cwebp, TinyPNG
- **성능 측정**: Lighthouse, WebPageTest

### 추가 문서
- `/docs/design/METI_DESIGN_GUIDE_ALL.md` (기존 디자인 가이드)
- `/docs/design/DESIGN_OUTSOURCING_BRIEF.md` (디자이너 요구사항)

---

**작성자**: METI 개발팀  
**최종 수정**: 2026-03-18  
**버전**: v1.0
