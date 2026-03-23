import { Hono } from 'hono';
import type { Env } from '../types';

const themeGallery = new Hono<{ Bindings: Env }>();

// Theme configurations
const themes = [
  {
    id: 'deep-navy',
    name: 'Deep Navy',
    color: '#0A2260',
    description: '신뢰감 있는 클래식 네이비'
  },
  {
    id: 'midnight-teal',
    name: 'Midnight Teal',
    color: '#0D3D4D',
    description: '세련된 청록색'
  },
  {
    id: 'forest-deep',
    name: 'Forest Deep',
    color: '#1A3D2E',
    description: '자연의 깊은 초록'
  },
  {
    id: 'royal-burgundy',
    name: 'Royal Burgundy',
    color: '#4A1E2E',
    description: '고급스러운 버건디'
  },
  {
    id: 'charcoal-dark',
    name: 'Charcoal Dark',
    color: '#1C1C1E',
    description: '모던한 차콜'
  },
  {
    id: 'slate-blue',
    name: 'Slate Blue',
    color: '#2C3E50',
    description: '중후한 슬레이트 블루'
  },
  {
    id: 'deep-purple',
    name: 'Deep Purple',
    color: '#3D2857',
    description: '창의적인 딥 퍼플'
  },
  {
    id: 'warm-brown',
    name: 'Warm Brown',
    color: '#3E2723',
    description: '따뜻한 브라운'
  },
  {
    id: 'olive-night',
    name: 'Olive Night',
    color: '#3D4A2C',
    description: '차분한 올리브'
  },
  {
    id: 'sunset-orange',
    name: 'Sunset Orange',
    color: '#8B4513',
    description: '따뜻한 석양'
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
    <meta name="description" content="METI 디지털 명함의 10가지 컬러 테마를 둘러보세요">
    
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
        background: linear-gradient(135deg, #0A2260 0%, #0D1B3E 100%);
        color: #fff;
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
        background: rgba(255,255,255,0.1);
        border: 1px solid rgba(255,255,255,0.2);
        color: #fff;
        padding: 12px 20px;
        border-radius: 12px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s;
        text-decoration: none;
        backdrop-filter: blur(10px);
      }
      
      .nav-btn:hover {
        background: rgba(255,255,255,0.2);
        transform: translateY(-2px);
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
      }
      
      .subtitle {
        font-size: 24px;
        font-weight: 300;
        margin-bottom: 16px;
      }
      
      .description {
        font-size: 16px;
        opacity: 0.8;
        line-height: 1.7;
      }
      
      .section-title {
        font-size: 28px;
        font-weight: 600;
        margin-bottom: 24px;
        text-align: center;
      }
      
      .section-subtitle {
        text-align: center;
        opacity: 0.7;
        margin-bottom: 40px;
        font-size: 15px;
      }
      
      .theme-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
        gap: 24px;
      }
      
      .theme-card {
        background: rgba(255,255,255,0.06);
        border: 1px solid rgba(255,255,255,0.12);
        border-radius: 16px;
        overflow: hidden;
        transition: all 0.3s;
        cursor: pointer;
        text-decoration: none;
        color: #fff;
        display: block;
      }
      
      .theme-card:hover {
        transform: translateY(-6px);
        box-shadow: 0 12px 32px rgba(0,0,0,0.3);
      }
      
      .theme-preview {
        width: 100%;
        height: 160px;
        position: relative;
        overflow: hidden;
      }
      
      .theme-bg {
        width: 100%;
        height: 100%;
        transition: transform 0.3s;
      }
      
      .theme-card:hover .theme-bg {
        transform: scale(1.05);
      }
      
      .mini-card {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 160px;
        height: 95px;
        background: rgba(255,255,255,0.12);
        border: 1px solid rgba(255,255,255,0.2);
        border-radius: 10px;
        backdrop-filter: blur(10px);
        padding: 12px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      
      .mini-card-top {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
      }
      
      .mini-logo {
        font-family: 'Montserrat', sans-serif;
        font-size: 8px;
        letter-spacing: 3px;
        padding-left: 3px;
        color: #fff;
        opacity: 0.7;
      }
      
      .mini-qr {
        width: 16px;
        height: 16px;
        opacity: 0.2;
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 1px;
      }
      
      .mini-qr span {
        background: #fff;
        aspect-ratio: 1;
      }
      
      .mini-name {
        font-size: 13px;
        font-weight: 500;
        color: #fff;
        margin-bottom: 4px;
      }
      
      .mini-title {
        font-size: 8px;
        color: rgba(255,255,255,0.6);
      }
      
      .theme-info {
        padding: 20px;
      }
      
      .theme-name {
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 8px;
      }
      
      .theme-description {
        font-size: 13px;
        opacity: 0.7;
        line-height: 1.5;
      }
      
      .cta-section {
        text-align: center;
        background: rgba(255,255,255,0.08);
        border: 1px solid rgba(255,255,255,0.15);
        border-radius: 24px;
        padding: 60px 40px;
        margin-top: 80px;
      }
      
      .cta-title {
        font-size: 32px;
        font-weight: 600;
        margin-bottom: 16px;
      }
      
      .cta-text {
        font-size: 16px;
        opacity: 0.8;
        margin-bottom: 32px;
      }
      
      .btn-primary {
        background: #D4AF37;
        color: #0A2260;
        padding: 18px 40px;
        border-radius: 16px;
        font-size: 17px;
        font-weight: 700;
        cursor: pointer;
        border: none;
        transition: all 0.2s;
        text-decoration: none;
        display: inline-block;
      }
      
      .btn-primary:hover {
        transform: scale(1.05);
        box-shadow: 0 12px 32px rgba(212,175,55,0.4);
      }
      
      @media (max-width: 768px) {
        body {
          padding: 24px 16px;
        }
        
        .logo {
          font-size: 40px;
          letter-spacing: 14px;
        }
        
        .subtitle {
          font-size: 20px;
        }
        
        .theme-grid {
          grid-template-columns: 1fr;
        }
      }
    </style>
</head>
<body>
    <nav class="nav">
        <a href="/" class="nav-btn"><i class="fas fa-home"></i> 메인</a>
    </nav>
    
    <div class="container">
        <div class="header">
            <div class="logo">METI</div>
            <div class="subtitle">테마 갤러리</div>
            <p class="description">
                10가지 컬러 테마를 자유롭게 선택하여<br>
                나만의 개성을 담은 디지털 명함을 만들어보세요
            </p>
        </div>
        
        <div class="theme-colors">
            <h2 class="section-title">컬러 테마</h2>
            <p class="section-subtitle">10가지 컬러 스킴으로 명함을 개성있게 꾸미세요</p>
            
            <div class="theme-grid">
                ${themes.map(theme => `
                <a href="/c/demo?theme=${theme.id}" class="theme-card">
                    <div class="theme-preview">
                        <div class="theme-bg" style="background: ${theme.color}"></div>
                        <div class="mini-card">
                            <div class="mini-card-top">
                                <div class="mini-logo">METI</div>
                                <div class="mini-qr">
                                    ${Array(25).fill('<span></span>').join('')}
                                </div>
                            </div>
                            <div>
                                <div class="mini-name">홍길동</div>
                                <div class="mini-title">Product Manager</div>
                            </div>
                        </div>
                    </div>
                    <div class="theme-info">
                        <div class="theme-name">${theme.name}</div>
                        <div class="theme-description">${theme.description}</div>
                    </div>
                </a>
                `).join('')}
            </div>
        </div>
        
        <div class="cta-section">
            <div class="cta-title">마음에 드는 테마를 찾으셨나요?</div>
            <p class="cta-text">
                지금 바로 무료로 나만의 디지털 명함을 만들어보세요
            </p>
            <a href="/api/auth/register" class="btn-primary">
                <i class="fas fa-rocket"></i> 무료로 시작하기
            </a>
        </div>
    </div>
</body>
</html>
  `);
});

export default themeGallery;
