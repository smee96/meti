import { Hono } from 'hono';
import type { Env } from '../types';

const themeGallery = new Hono<{ Bindings: Env }>();

// Theme configurations with dual color scheme
const themes = [
  {
    id: 'midnight-cream',
    name: 'Midnight Cream',
    primary: '#01112B',
    secondary: '#F3EDE0',
    description: '고급스러운 미드나잇 블루와 크림의 조화'
  },
  {
    id: 'neon-dark',
    name: 'Neon Dark',
    primary: '#222222',
    secondary: '#89E900',
    description: '강렬한 네온 그린과 다크의 대비'
  },
  {
    id: 'sky-blue',
    name: 'Sky Blue',
    primary: '#EDF1F5',
    secondary: '#0145F2',
    description: '맑은 하늘과 딥 블루의 조화'
  },
  {
    id: 'red-passion',
    name: 'Red Passion',
    primary: '#000F08',
    secondary: '#FB3640',
    description: '정열적인 레드와 다크 그린의 만남'
  },
  {
    id: 'lavender-forest',
    name: 'Lavender Forest',
    primary: '#BBBFEC',
    secondary: '#06530B',
    description: '라벤더와 깊은 숲의 조화'
  },
  {
    id: 'lime-forest',
    name: 'Lime Forest',
    primary: '#CCDA47',
    secondary: '#0A3625',
    description: '라임 그린과 포레스트의 자연스러움'
  },
  {
    id: 'sunset-navy',
    name: 'Sunset Navy',
    primary: '#FD802E',
    secondary: '#233D4C',
    description: '석양 오렌지와 네이비의 세련됨'
  },
  {
    id: 'copper-charcoal',
    name: 'Copper Charcoal',
    primary: '#2B2B2B',
    secondary: '#C66B3D',
    description: '차콜과 구리빛의 모던함'
  },
  {
    id: 'golden-cream',
    name: 'Golden Cream',
    primary: '#574C00',
    secondary: '#FEF9DB',
    description: '골드와 크림의 우아함'
  },
  {
    id: 'ruby-beige',
    name: 'Ruby Beige',
    primary: '#B40023',
    secondary: '#FCF0D6',
    description: '루비 레드와 베이지의 고급스러움'
  },
  {
    id: 'royal-grey',
    name: 'Royal Grey',
    primary: '#EBEBEB',
    secondary: '#10367D',
    description: '로얄 블루와 라이트 그레이의 조화'
  },
  {
    id: 'coral-cream',
    name: 'Coral Cream',
    primary: '#EA2E00',
    secondary: '#F0E7D6',
    description: '코랄 레드와 크림의 따뜻함'
  },
  {
    id: 'sage-ivory',
    name: 'Sage Ivory',
    primary: '#A8B89F',
    secondary: '#F4EFE6',
    description: '세이지 그린과 아이보리의 자연스러움'
  },
  {
    id: 'olive-gold',
    name: 'Olive Gold',
    primary: '#887114',
    secondary: '#06530B',
    description: '올리브 골드와 딥 그린의 클래식함'
  },
  {
    id: 'purple-pink',
    name: 'Purple Pink',
    primary: '#2A234F',
    secondary: '#FFB3C3',
    description: '퍼플과 핑크의 부드러움'
  }
];

themeGallery.get('/', (c) => {
  return c.html(`
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>METI - 테마 갤러리</title>
    <link rel="preload" href="/static/fonts/Montserrat-Bold.woff2" as="font" type="font/woff2" crossorigin>
    <meta name="description" content="METI 디지털 명함의 15가지 컬러 조합을 둘러보세요">
    
    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap" rel="stylesheet">
    
    <!-- Font Awesome -->
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    
    <!-- Favicon -->
    <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>💼</text></svg>">
    
    <style>
      /* Local Font - Montserrat Bold */
      @font-face {
        font-family: 'Montserrat';
        src: url('/static/fonts/Montserrat-Bold.woff2') format('woff2');
        font-weight: 700;
        font-style: normal;
        font-display: block;
      }

      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      
      body {
        font-family: 'Noto Sans KR', sans-serif;
        background: #FAFAF9;
        color: #111827;
        min-height: 100vh;
        padding: 40px 20px;
      }
      
      .nav {
        max-width: 1200px;
        margin: 0 auto 40px auto;
        display: flex;
        gap: 12px;
        flex-wrap: wrap;
      }
      
      .nav-btn {
        background: white;
        border: 2px solid #1e3a8a;
        color: #1e3a8a;
        padding: 12px 20px;
        border-radius: 12px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s;
        text-decoration: none;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      }
      
      .nav-btn:hover {
        background: #1e3a8a;
        color: white;
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(30, 58, 138, 0.2);
      }
      
      .container {
        max-width: 1200px;
        margin: 0 auto;
      }
      
      .header {
        text-align: center;
        margin-bottom: 60px;
      }
      
      .logo {
        font-family: 'Montserrat', sans-serif;
        font-size: 56px;
        letter-spacing: 20px;
        padding-left: 20px;
        margin-bottom: 20px;
        color: #1e3a8a;
      }
      
      .subtitle {
        font-size: 24px;
        font-weight: 600;
        margin-bottom: 16px;
        color: #111827;
      }
      
      .description {
        font-size: 16px;
        color: #6B7280;
        line-height: 1.7;
      }
      
      .section-title {
        font-size: 28px;
        font-weight: 600;
        margin-bottom: 24px;
        text-align: center;
        color: #111827;
      }
      
      .section-subtitle {
        text-align: center;
        color: #6B7280;
        margin-bottom: 40px;
        font-size: 15px;
      }
      
      .theme-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 32px;
        margin-bottom: 60px;
      }
      
      .theme-card {
        background: white;
        border-radius: 20px;
        overflow: hidden;
        transition: all 0.3s;
        cursor: pointer;
        text-decoration: none;
        display: block;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      }
      
      .theme-card:hover {
        transform: translateY(-8px);
        box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
      }
      
      .theme-preview {
        height: 280px;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
        background: #FEFEFE;
      }
      
      .card-content-preview {
        width: 100%;
        height: 100%;
        padding: 28px;
        border-radius: 16px;
        position: relative;
        overflow: hidden;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      
      /* 사선 배경 디바이더 */
      .diagonal-divider {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
      }
      
      .diagonal-divider::before {
        content: '';
        position: absolute;
        bottom: 0;
        right: 0;
        width: 60%;
        height: 60%;
        clip-path: polygon(100% 0, 100% 100%, 0 100%);
      }
      
      .content-wrapper {
        position: relative;
        z-index: 1;
      }
      
      .preview-name {
        font-size: 22px;
        font-weight: 700;
        margin-bottom: 6px;
        line-height: 1.2;
      }
      
      .preview-title {
        font-size: 15px;
        margin-bottom: 4px;
        opacity: 0.75;
        font-weight: 500;
      }
      
      .preview-company {
        font-size: 13px;
        margin-bottom: 20px;
        opacity: 0.6;
      }
      
      .preview-divider {
        height: 2px;
        width: 40px;
        margin: 16px 0;
        opacity: 0.3;
      }
      
      .preview-contact {
        font-size: 13px;
        line-height: 1.9;
        opacity: 0.7;
      }
      
      .preview-contact-item {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 6px;
      }
      
      .preview-icon {
        width: 18px;
        text-align: center;
        font-size: 13px;
        opacity: 0.8;
      }
      
      .theme-info {
        padding: 20px;
      }
      
      .theme-name {
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 8px;
        color: #111827;
      }
      
      .theme-description {
        font-size: 14px;
        color: #6B7280;
        margin-bottom: 12px;
        line-height: 1.5;
      }
      
      .color-codes {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
      }
      
      .color-code {
        font-size: 11px;
        font-family: 'Courier New', monospace;
        padding: 4px 8px;
        background: #F3F4F6;
        border-radius: 6px;
        color: #4B5563;
        font-weight: 500;
      }
      
      .cta-section {
        text-align: center;
        margin-top: 60px;
        padding: 40px 20px;
        background: white;
        border-radius: 24px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
      }
      
      .cta-title {
        font-size: 28px;
        font-weight: 700;
        margin-bottom: 16px;
        color: #111827;
      }
      
      .cta-text {
        font-size: 16px;
        color: #6B7280;
        margin-bottom: 32px;
      }
      
      .cta-button {
        display: inline-block;
        padding: 16px 48px;
        background: #1e3a8a;
        color: white;
        border-radius: 12px;
        font-size: 16px;
        font-weight: 600;
        text-decoration: none;
        transition: all 0.3s;
        box-shadow: 0 4px 12px rgba(30, 58, 138, 0.3);
      }
      
      .cta-button:hover {
        background: #1e40af;
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgba(30, 58, 138, 0.4);
      }
      
      @media (max-width: 768px) {
        .logo {
          font-size: 36px;
          letter-spacing: 12px;
        }
        
        .subtitle {
          font-size: 20px;
        }
        
        .theme-grid {
          grid-template-columns: 1fr;
          gap: 24px;
        }
      }
    </style>
</head>
<body>
    <div class="nav">
        <a href="/" class="nav-btn">
            <i class="fas fa-home"></i> 홈으로
        </a>
        <a href="/auth/login" class="nav-btn">
            <i class="fas fa-sign-in-alt"></i> 로그인
        </a>
    </div>

    <div class="container">
        <div class="header">
            <h1 class="logo">METI</h1>
            <h2 class="subtitle">테마 갤러리</h2>
            <p class="description">
                15가지 컬러 조합으로 나만의 명함을 만들어보세요<br>
                각 테마는 두 가지 컬러의 조화로 디자인되었습니다
            </p>
        </div>
        
        <div class="section-title">컬러 조합 테마</div>
        <div class="section-subtitle">클릭하여 각 테마를 미리보기 할 수 있습니다</div>
        
        <div class="theme-grid">
            ${themes.map(theme => {
                // 밝기 계산 (0-255 기준)
                const getBrightness = (hex) => {
                    const r = parseInt(hex.slice(1, 3), 16);
                    const g = parseInt(hex.slice(3, 5), 16);
                    const b = parseInt(hex.slice(5, 7), 16);
                    return (r * 299 + g * 587 + b * 114) / 1000;
                };
                
                const primaryBrightness = getBrightness(theme.primary);
                const secondaryBrightness = getBrightness(theme.secondary);
                
                // 더 밝은 색을 배경으로, 더 어두운 색을 텍스트로
                const isLightPrimary = primaryBrightness > 128;
                const isLightSecondary = secondaryBrightness > 128;
                
                let cardBg, textColor, accentColor, diagonalColor;
                
                if (isLightPrimary && isLightSecondary) {
                    // 둘 다 밝으면: 더 밝은 것을 배경, 어두운 텍스트 사용
                    cardBg = primaryBrightness > secondaryBrightness ? theme.primary : theme.secondary;
                    textColor = '#2D3748';
                    accentColor = primaryBrightness > secondaryBrightness ? theme.secondary : theme.primary;
                    diagonalColor = accentColor;
                } else if (!isLightPrimary && !isLightSecondary) {
                    // 둘 다 어두우면: 화이트 배경, 더 어두운 것을 텍스트로
                    cardBg = '#FFFFFF';
                    textColor = theme.primary;
                    accentColor = theme.secondary;
                    diagonalColor = accentColor;
                } else {
                    // 하나만 밝으면: 밝은 것을 배경, 어두운 것을 텍스트로
                    cardBg = isLightPrimary ? theme.primary : theme.secondary;
                    textColor = isLightPrimary ? theme.secondary : theme.primary;
                    accentColor = textColor;
                    diagonalColor = isLightPrimary ? theme.secondary : theme.primary;
                }
                
                return `
                <div class="theme-card" onclick="selectTheme('${theme.id}')">
                    <div class="theme-preview">
                        <div class="card-content-preview" style="background: ${cardBg};">
                            <div class="diagonal-divider">
                                <div style="background: ${diagonalColor}; opacity: 0.15; position: absolute; bottom: 0; right: 0; width: 60%; height: 60%; clip-path: polygon(100% 0, 100% 100%, 0 100%);"></div>
                            </div>
                            <div class="content-wrapper">
                                <div>
                                    <div class="preview-name" style="color: ${textColor};">홍길동</div>
                                    <div class="preview-title" style="color: ${textColor};">대표이사 · CEO</div>
                                    <div class="preview-company" style="color: ${textColor};">METI Inc.</div>
                                </div>
                                <div>
                                    <div class="preview-divider" style="background: ${accentColor};"></div>
                                    <div class="preview-contact" style="color: ${textColor};">
                                        <div class="preview-contact-item">
                                            <span class="preview-icon" style="color: ${accentColor};">📞</span>
                                            <span>010-1234-5678</span>
                                        </div>
                                        <div class="preview-contact-item">
                                            <span class="preview-icon" style="color: ${accentColor};">✉️</span>
                                            <span>hello@meti.app</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="theme-info">
                        <div class="theme-name">${theme.name}</div>
                        <div class="theme-description">${theme.description}</div>
                        <div class="color-codes">
                            <span class="color-code">${theme.primary}</span>
                            <span class="color-code">${theme.secondary}</span>
                        </div>
                    </div>
                </div>
                `;
            }).join('')}
        </div>
        
        <div class="cta-section">
            <h3 class="cta-title">마음에 드는 테마를 찾으셨나요?</h3>
            <p class="cta-text">지금 바로 METI에 가입하고 나만의 디지털 명함을 만들어보세요</p>
            <a href="/auth/register" class="cta-button">
                <i class="fas fa-rocket"></i> 무료로 시작하기
            </a>
        </div>
    </div>
    
    <script>
        function selectTheme(themeId) {
            // 테마 선택 시 로컬스토리지에 저장
            localStorage.setItem('selectedTheme', themeId);
            alert('테마가 선택되었습니다! 회원가입 후 적용할 수 있습니다.');
        }
    </script>
</body>
</html>
  `);
});

export default themeGallery;
