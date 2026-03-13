# METI — 명함 테마 컬러 스킴 (V5 베이스)
> 10개 컬러 변형 · V5 디자인 적용  
> 기준: docs/design/METI_DESIGN_GUIDE_5.md

---

## 컬러 스킴 구조

모든 테마는 V5의 **글래스모피즘 카드** 스타일을 유지하되, **앱 배경색**만 변경합니다.

### 카드 공통 스펙 (V5)
```css
width         : 100%
height        : 150px
border-radius : 16px
background    : rgba(255,255,255,0.10)
border        : 1px solid rgba(255,255,255,0.18)
backdrop-filter: blur(20px)
box-shadow    : inset 0 1px 0 rgba(255,255,255,0.2)
padding       : 20px 24px

/* 우상단 glow */
::before {
  background: radial-gradient(ellipse 65% 55% at 80% 10%, 
              rgba(255,255,255,0.08), transparent);
}

/* 하단 라인 */
::after {
  background: linear-gradient(90deg, 
              transparent, rgba(255,255,255,0.2), transparent);
  height: 1px;
}
```

---

## 테마 1: Deep Navy (기본 V5)
**컨셉**: 신뢰감 있는 클래식 네이비

| 요소 | 값 |
|------|-----|
| 앱 배경 | `#0A2260` |
| 카드 배경 | `rgba(255,255,255,0.10)` |
| 카드 테두리 | `rgba(255,255,255,0.18)` |
| 텍스트 메인 | `#FFFFFF` |
| 텍스트 서브 | `rgba(255,255,255,0.5)` |
| 버튼 Primary | `#FFFFFF` (bg) + `#0D2B6E` (text) |

---

## 테마 2: Midnight Teal
**컨셉**: 세련된 청록색

| 요소 | 값 |
|------|-----|
| 앱 배경 | `#0D3D4D` |
| 카드 배경 | `rgba(255,255,255,0.10)` |
| 카드 테두리 | `rgba(255,255,255,0.18)` |
| 텍스트 메인 | `#FFFFFF` |
| 텍스트 서브 | `rgba(255,255,255,0.5)` |
| 버튼 Primary | `#FFFFFF` (bg) + `#0D3D4D` (text) |

---

## 테마 3: Forest Deep
**컨셉**: 자연의 깊은 초록

| 요소 | 값 |
|------|-----|
| 앱 배경 | `#1A3D2E` |
| 카드 배경 | `rgba(255,255,255,0.10)` |
| 카드 테두리 | `rgba(255,255,255,0.18)` |
| 텍스트 메인 | `#FFFFFF` |
| 텍스트 서브 | `rgba(255,255,255,0.5)` |
| 버튼 Primary | `#FFFFFF` (bg) + `#1A3D2E` (text) |

---

## 테마 4: Royal Burgundy
**컨셉**: 고급스러운 버건디

| 요소 | 값 |
|------|-----|
| 앱 배경 | `#4A1E2E` |
| 카드 배경 | `rgba(255,255,255,0.10)` |
| 카드 테두리 | `rgba(255,255,255,0.18)` |
| 텍스트 메인 | `#FFFFFF` |
| 텍스트 서브 | `rgba(255,255,255,0.5)` |
| 버튼 Primary | `#FFFFFF` (bg) + `#4A1E2E` (text) |

---

## 테마 5: Charcoal Dark
**컨셉**: 모던한 차콜

| 요소 | 값 |
|------|-----|
| 앱 배경 | `#1C1C1E` |
| 카드 배경 | `rgba(255,255,255,0.10)` |
| 카드 테두리 | `rgba(255,255,255,0.18)` |
| 텍스트 메인 | `#FFFFFF` |
| 텍스트 서브 | `rgba(255,255,255,0.5)` |
| 버튼 Primary | `#FFFFFF` (bg) + `#1C1C1E` (text) |

---

## 테마 6: Slate Blue
**컨셉**: 중후한 슬레이트 블루

| 요소 | 값 |
|------|-----|
| 앱 배경 | `#2C3E50` |
| 카드 배경 | `rgba(255,255,255,0.10)` |
| 카드 테두리 | `rgba(255,255,255,0.18)` |
| 텍스트 메인 | `#FFFFFF` |
| 텍스트 서브 | `rgba(255,255,255,0.5)` |
| 버튼 Primary | `#FFFFFF` (bg) + `#2C3E50` (text) |

---

## 테마 7: Deep Purple
**컨셉**: 창의적인 딥 퍼플

| 요소 | 값 |
|------|-----|
| 앱 배경 | `#3D2857` |
| 카드 배경 | `rgba(255,255,255,0.10)` |
| 카드 테두리 | `rgba(255,255,255,0.18)` |
| 텍스트 메인 | `#FFFFFF` |
| 텍스트 서브 | `rgba(255,255,255,0.5)` |
| 버튼 Primary | `#FFFFFF` (bg) + `#3D2857` (text) |

---

## 테마 8: Warm Brown
**컨셉**: 따뜻한 브라운

| 요소 | 값 |
|------|-----|
| 앱 배경 | `#3E2723` |
| 카드 배경 | `rgba(255,255,255,0.10)` |
| 카드 테두리 | `rgba(255,255,255,0.18)` |
| 텍스트 메인 | `#FFFFFF` |
| 텍스트 서브 | `rgba(255,255,255,0.5)` |
| 버튼 Primary | `#FFFFFF` (bg) + `#3E2723` (text) |

---

## 테마 9: Olive Night
**컨셉**: 차분한 올리브

| 요소 | 값 |
|------|-----|
| 앱 배경 | `#3D4A2C` |
| 카드 배경 | `rgba(255,255,255,0.10)` |
| 카드 테두리 | `rgba(255,255,255,0.18)` |
| 텍스트 메인 | `#FFFFFF` |
| 텍스트 서브 | `rgba(255,255,255,0.5)` |
| 버튼 Primary | `#FFFFFF` (bg) + `#3D4A2C` (text) |

---

## 테마 10: Sunset Orange
**컨셉**: 따뜻한 석양

| 요소 | 값 |
|------|-----|
| 앱 배경 | `#8B4513` |
| 카드 배경 | `rgba(255,255,255,0.10)` |
| 카드 테두리 | `rgba(255,255,255,0.18)` |
| 텍스트 메인 | `#FFFFFF` |
| 텍스트 서브 | `rgba(255,255,255,0.5)` |
| 버튼 Primary | `#FFFFFF` (bg) + `#8B4513` (text) |

---

## TypeScript 타입 정의

```typescript
export type CardTheme = 
  | 'deep-navy'
  | 'midnight-teal'
  | 'forest-deep'
  | 'royal-burgundy'
  | 'charcoal-dark'
  | 'slate-blue'
  | 'deep-purple'
  | 'warm-brown'
  | 'olive-night'
  | 'sunset-orange';

export interface ThemeColors {
  id: CardTheme;
  name: string;
  background: string;
  cardBg: string;
  cardBorder: string;
  textMain: string;
  textSub: string;
  buttonBg: string;
  buttonText: string;
}

export const CARD_THEMES: Record<CardTheme, ThemeColors> = {
  'deep-navy': {
    id: 'deep-navy',
    name: 'Deep Navy',
    background: '#0A2260',
    cardBg: 'rgba(255,255,255,0.10)',
    cardBorder: 'rgba(255,255,255,0.18)',
    textMain: '#FFFFFF',
    textSub: 'rgba(255,255,255,0.5)',
    buttonBg: '#FFFFFF',
    buttonText: '#0D2B6E'
  },
  'midnight-teal': {
    id: 'midnight-teal',
    name: 'Midnight Teal',
    background: '#0D3D4D',
    cardBg: 'rgba(255,255,255,0.10)',
    cardBorder: 'rgba(255,255,255,0.18)',
    textMain: '#FFFFFF',
    textSub: 'rgba(255,255,255,0.5)',
    buttonBg: '#FFFFFF',
    buttonText: '#0D3D4D'
  },
  'forest-deep': {
    id: 'forest-deep',
    name: 'Forest Deep',
    background: '#1A3D2E',
    cardBg: 'rgba(255,255,255,0.10)',
    cardBorder: 'rgba(255,255,255,0.18)',
    textMain: '#FFFFFF',
    textSub: 'rgba(255,255,255,0.5)',
    buttonBg: '#FFFFFF',
    buttonText: '#1A3D2E'
  },
  'royal-burgundy': {
    id: 'royal-burgundy',
    name: 'Royal Burgundy',
    background: '#4A1E2E',
    cardBg: 'rgba(255,255,255,0.10)',
    cardBorder: 'rgba(255,255,255,0.18)',
    textMain: '#FFFFFF',
    textSub: 'rgba(255,255,255,0.5)',
    buttonBg: '#FFFFFF',
    buttonText: '#4A1E2E'
  },
  'charcoal-dark': {
    id: 'charcoal-dark',
    name: 'Charcoal Dark',
    background: '#1C1C1E',
    cardBg: 'rgba(255,255,255,0.10)',
    cardBorder: 'rgba(255,255,255,0.18)',
    textMain: '#FFFFFF',
    textSub: 'rgba(255,255,255,0.5)',
    buttonBg: '#FFFFFF',
    buttonText: '#1C1C1E'
  },
  'slate-blue': {
    id: 'slate-blue',
    name: 'Slate Blue',
    background: '#2C3E50',
    cardBg: 'rgba(255,255,255,0.10)',
    cardBorder: 'rgba(255,255,255,0.18)',
    textMain: '#FFFFFF',
    textSub: 'rgba(255,255,255,0.5)',
    buttonBg: '#FFFFFF',
    buttonText: '#2C3E50'
  },
  'deep-purple': {
    id: 'deep-purple',
    name: 'Deep Purple',
    background: '#3D2857',
    cardBg: 'rgba(255,255,255,0.10)',
    cardBorder: 'rgba(255,255,255,0.18)',
    textMain: '#FFFFFF',
    textSub: 'rgba(255,255,255,0.5)',
    buttonBg: '#FFFFFF',
    buttonText: '#3D2857'
  },
  'warm-brown': {
    id: 'warm-brown',
    name: 'Warm Brown',
    background: '#3E2723',
    cardBg: 'rgba(255,255,255,0.10)',
    cardBorder: 'rgba(255,255,255,0.18)',
    textMain: '#FFFFFF',
    textSub: 'rgba(255,255,255,0.5)',
    buttonBg: '#FFFFFF',
    buttonText: '#3E2723'
  },
  'olive-night': {
    id: 'olive-night',
    name: 'Olive Night',
    background: '#3D4A2C',
    cardBg: 'rgba(255,255,255,0.10)',
    cardBorder: 'rgba(255,255,255,0.18)',
    textMain: '#FFFFFF',
    textSub: 'rgba(255,255,255,0.5)',
    buttonBg: '#FFFFFF',
    buttonText: '#3D4A2C'
  },
  'sunset-orange': {
    id: 'sunset-orange',
    name: 'Sunset Orange',
    background: '#8B4513',
    cardBg: 'rgba(255,255,255,0.10)',
    cardBorder: 'rgba(255,255,255,0.18)',
    textMain: '#FFFFFF',
    textSub: 'rgba(255,255,255,0.5)',
    buttonBg: '#FFFFFF',
    buttonText: '#8B4513'
  }
};
```

---

## 데이터베이스 스키마 추가

```sql
-- cards 테이블에 theme 컬럼 추가
ALTER TABLE cards ADD COLUMN theme TEXT DEFAULT 'deep-navy';
```

---

*METI Card Themes · V5 · 2026*
