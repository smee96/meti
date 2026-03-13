// METI Landing Page - Multiple Design Versions
export const landingPageHTMLWithVersions = `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>METI - 디지털 명함의 새로운 기준</title>
    <meta name="description" content="종이 명함은 이제 그만. QR 코드로 간편하게 공유하고, 언제 어디서나 명함을 관리하세요.">
    
    <!-- Favicon -->
    <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>💼</text></svg>">
    
    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600;700&family=Cormorant+Garamond:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    
    <!-- Font Awesome -->
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    
    <style>
      :root {
        /* Version 1: White Elegance */
        --v1-bg: #FFFFFF;
        --v1-text: #0A2260;
        --v1-accent: #D4AF37;
        --v1-secondary: #64748B;
        --v1-border: #E2E8F0;
        
        /* Version 2: Soft Gradient */
        --v2-bg-start: #FFFFFF;
        --v2-bg-end: #EFF6FF;
        --v2-text: #1E3A8A;
        --v2-accent: #3B82F6;
        --v2-secondary: #64748B;
        
        /* Version 3: Dark Premium */
        --v3-bg: #0F0F0F;
        --v3-text: #60A5FA;
        --v3-accent: #E5E7EB;
        --v3-secondary: #9CA3AF;
        --v3-card-bg: #1A1A1A;
        
        /* Version 4: Refined Navy */
        --v4-bg: #0A2260;
        --v4-text: #FFFFFF;
        --v4-accent: #60A5FA;
        --v4-secondary: rgba(255,255,255,0.7);
      }
      
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      
      body {
        font-family: 'Inter', sans-serif;
        transition: all 0.5s ease;
        overflow-x: hidden;
      }
      
      /* Version 1: White Elegance */
      body.v1 {
        background: var(--v1-bg);
        color: var(--v1-text);
      }
      
      body.v1 .logo {
        font-family: 'Playfair Display', serif;
        font-weight: 600;
        color: var(--v1-text);
        letter-spacing: 6px;
      }
      
      body.v1 nav {
        background: rgba(255, 255, 255, 0.98);
        backdrop-filter: blur(10px);
        border-bottom: 1px solid var(--v1-border);
        box-shadow: 0 2px 10px rgba(0,0,0,0.03);
      }
      
      body.v1 .hero h1 {
        font-family: 'Playfair Display', serif;
        font-weight: 700;
        color: var(--v1-text);
        letter-spacing: 4px;
      }
      
      body.v1 .divider-line {
        background: var(--v1-border);
      }
      
      body.v1 .divider-dot {
        background: var(--v1-accent);
      }
      
      body.v1 .hero-subtitle {
        color: var(--v1-secondary);
      }
      
      body.v1 .btn-primary {
        background: var(--v1-text);
        color: #FFFFFF;
        box-shadow: 0 4px 20px rgba(10, 34, 96, 0.2);
      }
      
      body.v1 .btn-primary:hover {
        background: var(--v1-accent);
        color: var(--v1-text);
      }
      
      body.v1 .btn-secondary {
        border: 2px solid var(--v1-text);
        color: var(--v1-text);
      }
      
      body.v1 .preview-card {
        background: linear-gradient(135deg, #F8FAFC 0%, #FFFFFF 100%);
        border: 2px solid var(--v1-border);
        box-shadow: 0 10px 40px rgba(0,0,0,0.06);
      }
      
      body.v1 .feature-card {
        background: #FFFFFF;
        border: 1px solid var(--v1-border);
        box-shadow: 0 4px 20px rgba(0,0,0,0.04);
      }
      
      body.v1 .feature-icon {
        background: linear-gradient(135deg, var(--v1-text), var(--v1-accent));
        color: #FFFFFF;
      }
      
      body.v1 .stats {
        background: linear-gradient(135deg, #F8FAFC, #FFFFFF);
        border: 2px solid var(--v1-border);
      }
      
      body.v1 .stat-number {
        color: var(--v1-accent);
      }
      
      /* Version 2: Soft Gradient */
      body.v2 {
        background: linear-gradient(135deg, var(--v2-bg-start) 0%, var(--v2-bg-end) 100%);
        color: var(--v2-text);
      }
      
      body.v2 .logo {
        font-family: 'Cormorant Garamond', serif;
        font-weight: 600;
        color: var(--v2-text);
        letter-spacing: 8px;
      }
      
      body.v2 nav {
        background: rgba(255, 255, 255, 0.85);
        backdrop-filter: blur(20px);
        border-bottom: 1px solid rgba(30, 58, 138, 0.1);
      }
      
      body.v2 .hero h1 {
        font-family: 'Cormorant Garamond', serif;
        font-weight: 700;
        color: var(--v2-text);
        letter-spacing: 6px;
      }
      
      body.v2 .divider-line {
        background: linear-gradient(90deg, transparent, var(--v2-accent), transparent);
      }
      
      body.v2 .divider-dot {
        background: var(--v2-accent);
        box-shadow: 0 0 10px var(--v2-accent);
      }
      
      body.v2 .btn-primary {
        background: linear-gradient(135deg, var(--v2-text), var(--v2-accent));
        color: #FFFFFF;
        box-shadow: 0 8px 30px rgba(30, 58, 138, 0.3);
      }
      
      body.v2 .preview-card {
        background: rgba(255, 255, 255, 0.7);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(30, 58, 138, 0.15);
        box-shadow: 0 20px 60px rgba(30, 58, 138, 0.1);
      }
      
      body.v2 .feature-card {
        background: rgba(255, 255, 255, 0.6);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(30, 58, 138, 0.1);
      }
      
      body.v2 .feature-icon {
        background: linear-gradient(135deg, var(--v2-accent), var(--v2-text));
        color: #FFFFFF;
      }
      
      body.v2 .stats {
        background: rgba(255, 255, 255, 0.5);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(30, 58, 138, 0.15);
      }
      
      /* Version 3: Dark Premium */
      body.v3 {
        background: var(--v3-bg);
        color: var(--v3-accent);
      }
      
      body.v3 .logo {
        font-family: 'Inter', sans-serif;
        font-weight: 600;
        color: var(--v3-accent);
        letter-spacing: 12px;
        font-size: 28px;
      }
      
      body.v3 nav {
        background: rgba(15, 15, 15, 0.95);
        backdrop-filter: blur(10px);
        border-bottom: 1px solid rgba(96, 165, 250, 0.1);
      }
      
      body.v3 .nav-links a {
        color: var(--v3-secondary);
      }
      
      body.v3 .hero h1 {
        font-family: 'Inter', sans-serif;
        font-weight: 700;
        color: var(--v3-accent);
        letter-spacing: 16px;
      }
      
      body.v3 .divider-line {
        background: linear-gradient(90deg, transparent, var(--v3-text), transparent);
      }
      
      body.v3 .divider-dot {
        background: var(--v3-text);
        box-shadow: 0 0 15px var(--v3-text);
      }
      
      body.v3 .hero-subtitle {
        color: var(--v3-secondary);
      }
      
      body.v3 .btn-primary {
        background: var(--v3-text);
        color: var(--v3-bg);
        box-shadow: 0 8px 30px rgba(96, 165, 250, 0.4);
      }
      
      body.v3 .btn-secondary {
        border: 2px solid var(--v3-text);
        color: var(--v3-text);
        background: transparent;
      }
      
      body.v3 .preview-card {
        background: var(--v3-card-bg);
        border: 1px solid rgba(96, 165, 250, 0.2);
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
      }
      
      body.v3 .feature-card {
        background: var(--v3-card-bg);
        border: 1px solid rgba(96, 165, 250, 0.15);
      }
      
      body.v3 .feature-card:hover {
        background: rgba(26, 26, 26, 0.8);
        border-color: var(--v3-text);
      }
      
      body.v3 .feature-icon {
        background: linear-gradient(135deg, var(--v3-text), var(--v3-accent));
        color: var(--v3-bg);
      }
      
      body.v3 .feature-title {
        color: var(--v3-accent);
      }
      
      body.v3 .feature-desc {
        color: var(--v3-secondary);
      }
      
      body.v3 .stats {
        background: var(--v3-card-bg);
        border: 1px solid rgba(96, 165, 250, 0.2);
      }
      
      body.v3 .stat-number {
        color: var(--v3-text);
      }
      
      body.v3 .stat-label {
        color: var(--v3-secondary);
      }
      
      body.v3 .cta-section {
        background: rgba(26, 26, 26, 0.5);
        border-top: 1px solid rgba(96, 165, 250, 0.1);
        border-bottom: 1px solid rgba(96, 165, 250, 0.1);
      }
      
      body.v3 .cta-section h2 {
        color: var(--v3-accent);
      }
      
      body.v3 .cta-section p {
        color: var(--v3-secondary);
      }
      
      body.v3 footer {
        border-top: 1px solid rgba(96, 165, 250, 0.1);
      }
      
      body.v3 .footer-logo {
        color: var(--v3-text);
      }
      
      /* Version 4: Refined Navy */
      body.v4 {
        background: linear-gradient(135deg, #0A2260 0%, #0D2F7E 100%);
        color: var(--v4-text);
      }
      
      body.v4 .logo {
        font-family: 'Cormorant Garamond', serif;
        font-weight: 600;
        letter-spacing: 10px;
      }
      
      body.v4 .hero h1 {
        font-family: 'Cormorant Garamond', serif;
        font-weight: 600;
        letter-spacing: 14px;
      }
      
      body.v4 .divider-dot {
        box-shadow: 0 0 10px rgba(96, 165, 250, 0.6);
      }
      
      body.v4 .btn-primary {
        box-shadow: 0 8px 30px rgba(255, 255, 255, 0.25);
      }
      
      body.v4 .preview-card {
        background: rgba(255, 255, 255, 0.08);
        backdrop-filter: blur(30px);
        border: 1px solid rgba(255, 255, 255, 0.15);
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      }
      
      body.v4 .feature-card {
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
      }
      
      body.v4 .feature-icon {
        background: linear-gradient(135deg, var(--v4-accent), rgba(255,255,255,0.2));
      }
      
      /* Version Switcher */
      .version-switcher {
        position: fixed;
        bottom: 30px;
        right: 30px;
        z-index: 1000;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        border-radius: 16px;
        padding: 20px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.15);
        border: 1px solid rgba(0,0,0,0.1);
      }
      
      .version-switcher h3 {
        font-size: 14px;
        font-weight: 600;
        margin-bottom: 12px;
        color: #1F2937;
        text-align: center;
      }
      
      .version-buttons {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      
      .version-btn {
        padding: 10px 16px;
        border-radius: 10px;
        border: 2px solid #E5E7EB;
        background: #FFFFFF;
        color: #374151;
        font-size: 13px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s;
        text-align: left;
        display: flex;
        align-items: center;
        gap: 8px;
      }
      
      .version-btn:hover {
        border-color: #3B82F6;
        transform: translateX(4px);
      }
      
      .version-btn.active {
        background: #3B82F6;
        color: #FFFFFF;
        border-color: #3B82F6;
      }
      
      .version-indicator {
        width: 12px;
        height: 12px;
        border-radius: 3px;
        flex-shrink: 0;
      }
      
      .v1-indicator { background: linear-gradient(135deg, #0A2260, #D4AF37); }
      .v2-indicator { background: linear-gradient(135deg, #1E3A8A, #3B82F6); }
      .v3-indicator { background: linear-gradient(135deg, #0F0F0F, #60A5FA); }
      .v4-indicator { background: linear-gradient(135deg, #0A2260, #60A5FA); }
      
      /* Common Styles */
      nav {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 100;
      }
      
      .nav-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 20px 24px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      
      .logo {
        font-size: 28px;
        font-weight: 600;
      }
      
      .nav-links {
        display: flex;
        gap: 32px;
        align-items: center;
      }
      
      .nav-links a {
        text-decoration: none;
        font-size: 14px;
        font-weight: 500;
        transition: all 0.2s;
      }
      
      .btn-primary {
        padding: 12px 24px;
        border-radius: 12px;
        font-weight: 700;
        font-size: 14px;
        border: none;
        cursor: pointer;
        transition: all 0.3s;
        text-decoration: none;
        display: inline-block;
      }
      
      .btn-primary:hover {
        transform: translateY(-2px);
      }
      
      .hero {
        padding: 140px 24px 80px 24px;
        text-align: center;
        max-width: 800px;
        margin: 0 auto;
      }
      
      .hero h1 {
        font-size: 56px;
        margin-bottom: 32px;
        line-height: 1.3;
      }
      
      .divider {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 40px auto;
        max-width: 300px;
      }
      
      .divider-line {
        flex: 1;
        height: 1px;
      }
      
      .divider-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        margin: 0 12px;
      }
      
      .hero-subtitle {
        font-size: 18px;
        font-weight: 400;
        letter-spacing: 0.5px;
        line-height: 1.8;
        margin-bottom: 48px;
      }
      
      .cta-buttons {
        display: flex;
        gap: 16px;
        justify-content: center;
        flex-wrap: wrap;
      }
      
      .btn-large {
        padding: 18px 36px;
        font-size: 16px;
        border-radius: 16px;
      }
      
      .btn-secondary {
        padding: 18px 36px;
        border-radius: 16px;
        font-weight: 500;
        font-size: 16px;
        cursor: pointer;
        transition: all 0.2s;
        text-decoration: none;
        display: inline-block;
      }
      
      .preview-section {
        max-width: 400px;
        margin: 60px auto;
        position: relative;
      }
      
      .card-shadow {
        position: absolute;
        top: -8px;
        left: 12px;
        right: -12px;
        bottom: 8px;
        border-radius: 16px;
        z-index: 1;
        opacity: 0.3;
      }
      
      .preview-card {
        position: relative;
        z-index: 2;
        border-radius: 20px;
        padding: 32px;
        transition: all 0.3s;
      }
      
      .card-logo {
        font-size: 13px;
        letter-spacing: 4px;
        opacity: 0.6;
        margin-bottom: 24px;
        font-weight: 500;
      }
      
      .card-name {
        font-size: 24px;
        font-weight: 600;
        margin-bottom: 8px;
      }
      
      .card-title {
        font-size: 14px;
        font-weight: 400;
        opacity: 0.6;
        margin-bottom: 24px;
      }
      
      .theme-dots {
        display: flex;
        gap: 8px;
        justify-content: center;
        margin-top: 32px;
      }
      
      .theme-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        opacity: 0.3;
        cursor: pointer;
        transition: all 0.2s;
      }
      
      .theme-dot.active {
        width: 24px;
        border-radius: 4px;
        opacity: 1;
      }
      
      .features {
        padding: 80px 24px;
        max-width: 1200px;
        margin: 0 auto;
      }
      
      .section-title {
        text-align: center;
        font-size: 40px;
        font-weight: 700;
        margin-bottom: 16px;
      }
      
      .section-subtitle {
        text-align: center;
        font-size: 16px;
        font-weight: 400;
        opacity: 0.7;
        margin-bottom: 60px;
        max-width: 600px;
        margin-left: auto;
        margin-right: auto;
      }
      
      .features-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 32px;
        margin-bottom: 60px;
      }
      
      .feature-card {
        border-radius: 20px;
        padding: 32px;
        transition: all 0.3s;
      }
      
      .feature-card:hover {
        transform: translateY(-4px);
      }
      
      .feature-icon {
        width: 56px;
        height: 56px;
        border-radius: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 20px;
        font-size: 24px;
      }
      
      .feature-title {
        font-size: 18px;
        font-weight: 700;
        margin-bottom: 12px;
      }
      
      .feature-desc {
        font-size: 14px;
        font-weight: 400;
        opacity: 0.7;
        line-height: 1.7;
      }
      
      .stats {
        border-radius: 24px;
        padding: 60px 40px;
        text-align: center;
        max-width: 800px;
        margin: 0 auto 80px auto;
      }
      
      .stats-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 40px;
      }
      
      .stat-number {
        font-size: 48px;
        font-weight: 700;
        margin-bottom: 8px;
      }
      
      .stat-label {
        font-size: 14px;
        opacity: 0.6;
      }
      
      .cta-section {
        text-align: center;
        padding: 80px 24px;
      }
      
      .cta-section h2 {
        font-size: 40px;
        font-weight: 700;
        margin-bottom: 20px;
      }
      
      .cta-section p {
        font-size: 16px;
        opacity: 0.7;
        margin-bottom: 32px;
        max-width: 500px;
        margin-left: auto;
        margin-right: auto;
      }
      
      footer {
        padding: 60px 24px 40px 24px;
        text-align: center;
      }
      
      .footer-logo {
        font-size: 24px;
        letter-spacing: 10px;
        margin-bottom: 16px;
        font-weight: 600;
      }
      
      .footer-text {
        font-size: 14px;
        opacity: 0.5;
        margin-bottom: 32px;
      }
      
      .footer-links {
        display: flex;
        gap: 24px;
        justify-content: center;
        margin-bottom: 32px;
        flex-wrap: wrap;
      }
      
      .footer-links a {
        text-decoration: none;
        font-size: 13px;
        transition: opacity 0.2s;
        opacity: 0.6;
      }
      
      .footer-links a:hover {
        opacity: 1;
      }
      
      .copyright {
        font-size: 12px;
        opacity: 0.4;
      }
      
      .mobile-menu-btn {
        display: none;
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
      }
      
      @media (max-width: 768px) {
        .nav-links {
          display: none;
        }
        
        .mobile-menu-btn {
          display: block;
        }
        
        .hero h1 {
          font-size: 36px;
          letter-spacing: 6px;
        }
        
        .hero-subtitle {
          font-size: 16px;
        }
        
        .stats-grid {
          grid-template-columns: 1fr;
          gap: 32px;
        }
        
        .cta-buttons {
          flex-direction: column;
        }
        
        .btn-large, .btn-secondary {
          width: 100%;
        }
        
        .version-switcher {
          bottom: 20px;
          right: 20px;
          left: 20px;
        }
        
        .version-buttons {
          flex-direction: row;
          overflow-x: auto;
        }
        
        .version-btn {
          flex-shrink: 0;
        }
      }
    </style>
</head>
<body class="v1">
    <!-- Version Switcher -->
    <div class="version-switcher">
        <h3><i class="fas fa-palette"></i> 디자인 버전 선택</h3>
        <div class="version-buttons">
            <button class="version-btn active" onclick="switchVersion('v1')">
                <div class="version-indicator v1-indicator"></div>
                <span>White Elegance</span>
            </button>
            <button class="version-btn" onclick="switchVersion('v2')">
                <div class="version-indicator v2-indicator"></div>
                <span>Soft Gradient</span>
            </button>
            <button class="version-btn" onclick="switchVersion('v3')">
                <div class="version-indicator v3-indicator"></div>
                <span>Dark Premium</span>
            </button>
            <button class="version-btn" onclick="switchVersion('v4')">
                <div class="version-indicator v4-indicator"></div>
                <span>Refined Navy</span>
            </button>
        </div>
    </div>
    
    <!-- Navigation -->
    <nav>
        <div class="nav-container">
            <div class="logo">METI</div>
            <div class="nav-links">
                <a href="#features">기능</a>
                <a href="#about">소개</a>
                <a href="/api/auth/login" class="btn-primary">시작하기</a>
            </div>
            <button class="mobile-menu-btn">
                <i class="fas fa-bars"></i>
            </button>
        </div>
    </nav>
    
    <!-- Hero Section -->
    <section class="hero">
        <h1>METI</h1>
        
        <div class="divider">
            <div class="divider-line"></div>
            <div class="divider-dot"></div>
            <div class="divider-line"></div>
        </div>
        
        <p class="hero-subtitle">
            종이 명함은 이제 그만<br>
            QR 코드로 간편하게 공유하고<br>
            언제 어디서나 명함을 관리하세요
        </p>
        
        <div class="cta-buttons">
            <a href="/api/auth/register" class="btn-primary btn-large">
                <i class="fas fa-rocket" style="margin-right: 8px;"></i>
                무료로 시작하기
            </a>
            <a href="#features" class="btn-secondary">
                <i class="fas fa-play-circle" style="margin-right: 8px;"></i>
                더 알아보기
            </a>
        </div>
    </section>
    
    <!-- Card Preview -->
    <section class="preview-section">
        <div class="card-shadow"></div>
        <div class="preview-card">
            <div class="card-logo">METI</div>
            <div class="card-name">홍길동</div>
            <div class="card-title">Product Manager · METI</div>
            
            <div style="display: flex; gap: 16px; font-size: 16px; opacity: 0.6; margin-top: 20px;">
                <i class="fas fa-phone"></i>
                <i class="fas fa-envelope"></i>
                <i class="fas fa-link"></i>
            </div>
        </div>
        
        <div class="theme-dots">
            <div class="theme-dot active"></div>
            <div class="theme-dot"></div>
            <div class="theme-dot"></div>
            <div class="theme-dot"></div>
            <div class="theme-dot"></div>
            <div class="theme-dot"></div>
        </div>
    </section>
    
    <!-- Features Section -->
    <section class="features" id="features">
        <h2 class="section-title">스마트한 명함 관리</h2>
        <p class="section-subtitle">
            METI는 명함 교환부터 관리까지, 모든 과정을 간편하게 만듭니다
        </p>
        
        <div class="features-grid">
            <div class="feature-card">
                <div class="feature-icon">
                    <i class="fas fa-qrcode"></i>
                </div>
                <h3 class="feature-title">QR 코드 공유</h3>
                <p class="feature-desc">
                    QR 코드를 스캔하면 즉시 명함을 확인하고 저장할 수 있습니다. 
                    종이 명함의 불편함을 완전히 해결했습니다.
                </p>
            </div>
            
            <div class="feature-card">
                <div class="feature-icon">
                    <i class="fas fa-palette"></i>
                </div>
                <h3 class="feature-title">10가지 테마</h3>
                <p class="feature-desc">
                    나만의 개성을 담은 명함을 만드세요. 
                    10가지 프리미엄 컬러 테마로 브랜드 아이덴티티를 표현하세요.
                </p>
            </div>
            
            <div class="feature-card">
                <div class="feature-icon">
                    <i class="fas fa-mobile-alt"></i>
                </div>
                <h3 class="feature-title">모바일 최적화</h3>
                <p class="feature-desc">
                    언제 어디서나 스마트폰으로 명함을 공유하고 관리하세요. 
                    완벽한 모바일 경험을 제공합니다.
                </p>
            </div>
            
            <div class="feature-card">
                <div class="feature-icon">
                    <i class="fas fa-shield-alt"></i>
                </div>
                <h3 class="feature-title">프라이버시 보호</h3>
                <p class="feature-desc">
                    전화번호와 이메일 공개 여부를 자유롭게 설정하세요. 
                    내 정보는 내가 관리합니다.
                </p>
            </div>
            
            <div class="feature-card">
                <div class="feature-icon">
                    <i class="fas fa-chart-line"></i>
                </div>
                <h3 class="feature-title">실시간 분석</h3>
                <p class="feature-desc">
                    명함 조회수, 공유 횟수 등 실시간 통계로 
                    네트워킹 효과를 확인하세요.
                </p>
            </div>
            
            <div class="feature-card">
                <div class="feature-icon">
                    <i class="fas fa-user-plus"></i>
                </div>
                <h3 class="feature-title">연락처 저장</h3>
                <p class="feature-desc">
                    받은 명함을 한 번의 터치로 연락처에 저장하세요. 
                    vCard 다운로드를 지원합니다.
                </p>
            </div>
        </div>
        
        <!-- Stats -->
        <div class="stats">
            <div class="stats-grid">
                <div>
                    <div class="stat-number">3분</div>
                    <div class="stat-label">명함 생성 시간</div>
                </div>
                <div>
                    <div class="stat-number">10+</div>
                    <div class="stat-label">프리미엄 테마</div>
                </div>
                <div>
                    <div class="stat-number">100%</div>
                    <div class="stat-label">모바일 최적화</div>
                </div>
            </div>
        </div>
    </section>
    
    <!-- CTA Section -->
    <section class="cta-section" id="about">
        <h2>지금 바로 시작하세요</h2>
        <p>
            30초 만에 가입하고, 첫 번째 디지털 명함을 만들어보세요. 
            신용카드 정보는 필요 없습니다.
        </p>
        <a href="/api/auth/register" class="btn-primary btn-large">
            <i class="fas fa-rocket" style="margin-right: 8px;"></i>
            무료로 시작하기
        </a>
    </section>
    
    <!-- Footer -->
    <footer>
        <div class="footer-logo">METI</div>
        <div class="footer-text">디지털 명함의 새로운 기준</div>
        
        <div class="footer-links">
            <a href="#features">기능</a>
            <a href="#about">소개</a>
            <a href="#">이용약관</a>
            <a href="#">개인정보처리방침</a>
            <a href="#">고객지원</a>
        </div>
        
        <div class="copyright">
            © 2026 METI. All rights reserved.
        </div>
    </footer>
    
    <script>
      function switchVersion(version) {
        // Remove all version classes
        document.body.classList.remove('v1', 'v2', 'v3', 'v4');
        
        // Add selected version class
        document.body.classList.add(version);
        
        // Update active button
        document.querySelectorAll('.version-btn').forEach(btn => {
          btn.classList.remove('active');
        });
        event.target.closest('.version-btn').classList.add('active');
        
        // Save preference
        localStorage.setItem('metiDesignVersion', version);
      }
      
      // Load saved preference
      window.addEventListener('DOMContentLoaded', () => {
        const saved = localStorage.getItem('metiDesignVersion');
        if (saved && saved !== 'v1') {
          switchVersion(saved);
          document.querySelector(\`.version-btn[onclick="switchVersion('\${saved}')"]\`).classList.add('active');
          document.querySelector('.version-btn').classList.remove('active');
        }
      });
    </script>
</body>
</html>
`;
