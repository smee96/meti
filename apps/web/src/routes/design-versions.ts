import { Hono } from 'hono';
import type { Env } from '../types';

const designVersions = new Hono<{ Bindings: Env }>();

// Design version base template
const createDesignPage = (version: string, config: {
  title: string;
  bgColor: string;
  primaryColor: string;
  accentColor: string;
  cardBg: string;
  cardBorder: string;
  textColor: string;
  secondaryTextColor: string;
  fontFamily: string;
  fontImport: string;
  description: string;
}) => {
  return `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>METI - ${config.title}</title>
    <meta name="description" content="METI 디지털 명함 - ${config.description}">
    
    <!-- Fonts -->
    ${config.fontImport}
    
    <!-- Font Awesome -->
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    
    <!-- Favicon -->
    <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>💼</text></svg>">
    
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      
      body {
        font-family: ${config.fontFamily};
        background: ${config.bgColor};
        color: ${config.textColor};
        min-height: 100vh;
        overflow-x: hidden;
      }
      
      .version-badge {
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${config.accentColor};
        color: ${config.textColor};
        padding: 8px 16px;
        border-radius: 20px;
        font-size: 12px;
        font-weight: 600;
        z-index: 100;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      }
      
      .nav {
        position: fixed;
        top: 20px;
        left: 20px;
        display: flex;
        gap: 12px;
        z-index: 100;
        flex-wrap: wrap;
        max-width: 300px;
      }
      
      .nav-btn {
        background: ${config.cardBg};
        border: 1px solid ${config.cardBorder};
        color: ${config.textColor};
        padding: 10px 18px;
        border-radius: 12px;
        font-size: 13px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s;
        text-decoration: none;
        backdrop-filter: blur(10px);
      }
      
      .nav-btn:hover {
        background: ${config.accentColor};
        transform: translateY(-2px);
      }
      
      .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 120px 40px 80px 40px;
      }
      
      .hero {
        text-align: center;
        margin-bottom: 80px;
      }
      
      .logo {
        font-family: 'Tenor Sans', serif;
        font-size: 64px;
        letter-spacing: 24px;
        padding-left: 24px;
        margin-bottom: 24px;
        color: ${config.primaryColor};
      }
      
      .tagline {
        font-size: 20px;
        color: ${config.secondaryTextColor};
        margin-bottom: 16px;
      }
      
      .description {
        font-size: 16px;
        color: ${config.secondaryTextColor};
        line-height: 1.8;
        max-width: 600px;
        margin: 0 auto;
      }
      
      .features {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 32px;
        margin-bottom: 80px;
      }
      
      .feature-card {
        background: ${config.cardBg};
        border: 1px solid ${config.cardBorder};
        border-radius: 20px;
        padding: 32px;
        transition: all 0.3s;
        backdrop-filter: blur(10px);
      }
      
      .feature-card:hover {
        transform: translateY(-8px);
        box-shadow: 0 12px 32px rgba(0,0,0,0.15);
      }
      
      .feature-icon {
        font-size: 40px;
        margin-bottom: 20px;
      }
      
      .feature-title {
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 12px;
        color: ${config.primaryColor};
      }
      
      .feature-text {
        font-size: 15px;
        line-height: 1.7;
        color: ${config.secondaryTextColor};
      }
      
      .cta-section {
        text-align: center;
        background: ${config.cardBg};
        border: 1px solid ${config.cardBorder};
        border-radius: 24px;
        padding: 60px 40px;
        backdrop-filter: blur(10px);
      }
      
      .cta-title {
        font-size: 32px;
        font-weight: 600;
        margin-bottom: 16px;
        color: ${config.primaryColor};
      }
      
      .cta-text {
        font-size: 16px;
        color: ${config.secondaryTextColor};
        margin-bottom: 32px;
      }
      
      .cta-buttons {
        display: flex;
        gap: 16px;
        justify-content: center;
        flex-wrap: wrap;
      }
      
      .btn {
        padding: 16px 32px;
        border-radius: 16px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s;
        text-decoration: none;
        display: inline-block;
      }
      
      .btn-primary {
        background: ${config.accentColor};
        color: ${config.bgColor};
        border: none;
      }
      
      .btn-primary:hover {
        transform: scale(1.05);
        box-shadow: 0 8px 24px rgba(0,0,0,0.2);
      }
      
      .btn-secondary {
        background: transparent;
        border: 2px solid ${config.cardBorder};
        color: ${config.textColor};
      }
      
      .btn-secondary:hover {
        background: ${config.cardBg};
        transform: translateY(-2px);
      }
      
      .footer {
        text-align: center;
        margin-top: 80px;
        padding: 40px;
        color: ${config.secondaryTextColor};
      }
      
      .footer-logo {
        font-family: 'Tenor Sans', serif;
        font-size: 24px;
        letter-spacing: 12px;
        padding-left: 12px;
        margin-bottom: 16px;
        color: ${config.primaryColor};
      }
      
      @media (max-width: 768px) {
        .container {
          padding: 100px 24px 60px 24px;
        }
        
        .logo {
          font-size: 48px;
          letter-spacing: 18px;
        }
        
        .features {
          grid-template-columns: 1fr;
        }
        
        .cta-buttons {
          flex-direction: column;
        }
        
        .btn {
          width: 100%;
        }
      }
    </style>
</head>
<body>
    <div class="version-badge">${config.title}</div>
    
    <nav class="nav">
        <a href="/" class="nav-btn"><i class="fas fa-home"></i> 메인</a>
        <a href="/themes" class="nav-btn"><i class="fas fa-palette"></i> 테마</a>
        <a href="/v1" class="nav-btn">V1</a>
        <a href="/v2" class="nav-btn">V2</a>
        <a href="/v3" class="nav-btn">V3</a>
        <a href="/v4" class="nav-btn">V4</a>
    </nav>
    
    <div class="container">
        <div class="hero">
            <div class="logo">METI</div>
            <div class="tagline">디지털 명함의 새로운 기준</div>
            <p class="description">
                ${config.description}
            </p>
        </div>
        
        <div class="features">
            <div class="feature-card">
                <div class="feature-icon">⚡</div>
                <div class="feature-title">3분 안에 완성</div>
                <div class="feature-text">
                    간단한 정보 입력만으로 세련된 디지털 명함을 즉시 생성하세요.
                </div>
            </div>
            
            <div class="feature-card">
                <div class="feature-icon">🎨</div>
                <div class="feature-title">10가지 테마</div>
                <div class="feature-text">
                    취향과 상황에 맞는 다양한 컬러 테마를 선택할 수 있습니다.
                </div>
            </div>
            
            <div class="feature-card">
                <div class="feature-icon">📱</div>
                <div class="feature-title">모바일 최적화</div>
                <div class="feature-text">
                    앱 설치 없이도 웹에서 완벽하게 작동하는 명함을 만드세요.
                </div>
            </div>
            
            <div class="feature-card">
                <div class="feature-icon">🔒</div>
                <div class="feature-title">프라이버시 제어</div>
                <div class="feature-text">
                    전화번호, 이메일 등 민감한 정보의 공개 범위를 자유롭게 설정하세요.
                </div>
            </div>
            
            <div class="feature-card">
                <div class="feature-icon">📊</div>
                <div class="feature-title">간편한 공유</div>
                <div class="feature-text">
                    링크, QR 코드, vCard로 명함을 손쉽게 공유할 수 있습니다.
                </div>
            </div>
            
            <div class="feature-card">
                <div class="feature-icon">✨</div>
                <div class="feature-title">실시간 수정</div>
                <div class="feature-text">
                    언제든지 명함 정보를 업데이트하고 즉시 반영할 수 있습니다.
                </div>
            </div>
        </div>
        
        <div class="cta-section">
            <div class="cta-title">지금 시작하세요</div>
            <p class="cta-text">
                무료로 나만의 디지털 명함을 만들고 공유해보세요
            </p>
            <div class="cta-buttons">
                <a href="/api/auth/register" class="btn btn-primary">
                    <i class="fas fa-rocket"></i> 무료로 시작하기
                </a>
                <a href="/themes" class="btn btn-secondary">
                    <i class="fas fa-palette"></i> 테마 둘러보기
                </a>
            </div>
        </div>
        
        <div class="footer">
            <div class="footer-logo">METI</div>
            <p style="font-size: 14px; margin-top: 8px;">
                © 2026 METI. All rights reserved.
            </p>
        </div>
    </div>
</body>
</html>
  `;
};

// All design versions handler
designVersions.get('/', (c) => {
  const version = c.req.path.split('/')[1];
  
  // V1: Warm Professional (Teal & Mint)
  if (version === 'v1') {
    return c.html(createDesignPage('v1', {
      title: 'V1: Warm Professional',
      bgColor: 'linear-gradient(135deg, #0E1C22 0%, #1A3A4A 100%)',
      primaryColor: '#2EC4A0',
      accentColor: '#2EC4A0',
      cardBg: 'rgba(46, 196, 160, 0.08)',
      cardBorder: 'rgba(46, 196, 160, 0.2)',
      textColor: '#F5F7F8',
      secondaryTextColor: 'rgba(245, 247, 248, 0.7)',
      fontFamily: "'Pretendard', 'Noto Sans KR', sans-serif",
      fontImport: '<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Noto+Sans+KR:wght@300;400;500;700&family=Tenor+Sans&display=swap" rel="stylesheet"><link href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css" rel="stylesheet">',
      description: '신뢰감 있는 틸 컬러와 민트 액센트가 전문성과 따뜻함을 동시에 전달합니다. 30-40대 B2B 전문가를 위한 디자인입니다.'
    }));
  }
  
  // V2: Vibrant (Colorful Gradient)
  if (version === 'v2') {
    return c.html(createDesignPage('v2', {
      title: 'V2: Vibrant',
      bgColor: 'linear-gradient(135deg, #1E1B2E 0%, #2D2840 100%)',
      primaryColor: '#FF6B6B',
      accentColor: '#FF6B6B',
      cardBg: 'rgba(255, 107, 107, 0.08)',
      cardBorder: 'rgba(255, 107, 107, 0.2)',
      textColor: '#FFF9F5',
      secondaryTextColor: 'rgba(255, 249, 245, 0.7)',
      fontFamily: "'Plus Jakarta Sans', 'Noto Sans KR', sans-serif",
      fontImport: '<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Noto+Sans+KR:wght@300;400;500;700&family=Tenor+Sans&display=swap" rel="stylesheet">',
      description: '화사한 그라데이션과 생동감 있는 컬러로 개성과 에너지를 표현합니다. 20-30대 스타트업, 프리랜서, 크리에이터를 위한 디자인입니다.'
    }));
  }
  
  // V3: Aurum (Gold/Ivory)
  if (version === 'v3') {
    return c.html(createDesignPage('v3', {
      title: 'V3: Aurum',
      bgColor: 'linear-gradient(135deg, #12100E 0%, #1C1812 100%)',
      primaryColor: '#C4A45A',
      accentColor: '#E2C47A',
      cardBg: 'rgba(196, 164, 90, 0.08)',
      cardBorder: 'rgba(196, 164, 90, 0.2)',
      textColor: '#FAF6EE',
      secondaryTextColor: 'rgba(250, 246, 238, 0.7)',
      fontFamily: "'Cormorant Garamond', 'Noto Serif KR', serif",
      fontImport: '<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Noto+Serif+KR:wght@300;400;500;700&family=Tenor+Sans&display=swap" rel="stylesheet">',
      description: '골드와 아이보리의 조화로 럭셔리하고 격조 있는 프리미엄을 표현합니다. 전문직, 임원, 고급 프리랜서를 위한 디자인입니다.'
    }));
  }
  
  // V4: Indigo Script (Deep Navy)
  if (version === 'v4') {
    return c.html(createDesignPage('v4', {
      title: 'V4: Indigo Script',
      bgColor: 'linear-gradient(135deg, #050C1A 0%, #091428 100%)',
      primaryColor: '#4F8EF7',
      accentColor: '#1455C8',
      cardBg: 'rgba(79, 142, 247, 0.08)',
      cardBorder: 'rgba(79, 142, 247, 0.2)',
      textColor: '#EBF1FD',
      secondaryTextColor: 'rgba(235, 241, 253, 0.7)',
      fontFamily: "'Noto Serif KR', serif",
      fontImport: '<link href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@300;400;500;700&family=Tenor+Sans&display=swap" rel="stylesheet">',
      description: '깊은 네이비와 우아한 세리프 폰트로 신뢰감과 품격을 동시에 표현합니다. 전 연령, 품격 있는 이미지를 원하는 전문직을 위한 디자인입니다.'
    }));
  }
  
  return c.notFound();
});

export default designVersions;
