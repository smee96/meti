// METI Landing Page - V5 Design (Pure Digital Business Card App)
export const landingPageHTML = `
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
    <link href="https://fonts.googleapis.com/css2?family=Tenor+Sans&family=Noto+Sans+KR:wght@300;400;500;700&display=swap" rel="stylesheet">
    
    <!-- Font Awesome -->
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      
      body {
        font-family: 'Noto Sans KR', sans-serif;
        background: #0A2260;
        color: #fff;
        overflow-x: hidden;
      }
      
      /* Navigation */
      nav {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 100;
        background: rgba(10, 34, 96, 0.95);
        backdrop-filter: blur(10px);
        border-bottom: 1px solid rgba(255,255,255,0.1);
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
        font-family: 'Tenor Sans', serif;
        font-size: 28px;
        letter-spacing: 10px;
        padding-left: 10px;
      }
      
      .nav-links {
        display: flex;
        gap: 32px;
        align-items: center;
      }
      
      .nav-links a {
        color: rgba(255,255,255,0.8);
        text-decoration: none;
        font-size: 14px;
        font-weight: 400;
        transition: color 0.2s;
      }
      
      .nav-links a:hover {
        color: #fff;
      }
      
      .btn-primary {
        background: #fff;
        color: #0D2B6E;
        padding: 12px 24px;
        border-radius: 12px;
        font-weight: 700;
        font-size: 14px;
        border: none;
        cursor: pointer;
        transition: all 0.2s;
        text-decoration: none;
        display: inline-block;
      }
      
      .btn-primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 24px rgba(255,255,255,0.2);
      }
      
      /* Hero Section */
      .hero {
        padding: 140px 24px 80px 24px;
        text-align: center;
        max-width: 800px;
        margin: 0 auto;
      }
      
      .hero h1 {
        font-family: 'Tenor Sans', serif;
        font-size: 56px;
        letter-spacing: 16px;
        padding-left: 16px;
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
        background: rgba(255,255,255,0.15);
      }
      
      .divider-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: rgba(255,255,255,0.3);
        margin: 0 12px;
      }
      
      .hero-subtitle {
        font-size: 20px;
        font-weight: 300;
        letter-spacing: 1px;
        opacity: 0.7;
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
        background: transparent;
        border: 1.5px solid rgba(255,255,255,0.25);
        color: rgba(255,255,255,0.8);
        padding: 18px 36px;
        border-radius: 16px;
        font-weight: 400;
        font-size: 16px;
        cursor: pointer;
        transition: all 0.2s;
        text-decoration: none;
        display: inline-block;
      }
      
      .btn-secondary:hover {
        background: rgba(255,255,255,0.07);
      }
      
      /* Card Preview */
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
        background: rgba(255,255,255,0.06);
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 16px;
        z-index: 1;
      }
      
      .preview-card {
        position: relative;
        z-index: 2;
        background: rgba(255,255,255,0.10);
        border: 1px solid rgba(255,255,255,0.18);
        border-radius: 16px;
        backdrop-filter: blur(20px);
        padding: 24px;
        box-shadow: inset 0 1px 0 rgba(255,255,255,0.2);
      }
      
      .preview-card::before {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        width: 65%;
        height: 55%;
        background: radial-gradient(ellipse at 80% 10%, rgba(255,255,255,0.08), transparent);
        pointer-events: none;
      }
      
      .card-logo {
        font-family: 'Tenor Sans', serif;
        font-size: 14px;
        letter-spacing: 6px;
        padding-left: 6px;
        opacity: 0.7;
        margin-bottom: 20px;
      }
      
      .card-name {
        font-size: 20px;
        font-weight: 500;
        margin-bottom: 6px;
      }
      
      .card-title {
        font-size: 12px;
        font-weight: 300;
        opacity: 0.5;
        margin-bottom: 20px;
      }
      
      .theme-dots {
        display: flex;
        gap: 7px;
        justify-content: center;
        margin-top: 24px;
      }
      
      .theme-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: rgba(255,255,255,0.2);
        cursor: pointer;
        transition: all 0.2s;
      }
      
      .theme-dot.active {
        width: 20px;
        border-radius: 3px;
        background: #fff;
      }
      
      /* Features Section */
      .features {
        padding: 80px 24px;
        max-width: 1200px;
        margin: 0 auto;
      }
      
      .section-title {
        text-align: center;
        font-size: 36px;
        font-weight: 700;
        margin-bottom: 16px;
      }
      
      .section-subtitle {
        text-align: center;
        font-size: 16px;
        font-weight: 300;
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
        background: rgba(255,255,255,0.05);
        border: 1px solid rgba(255,255,255,0.1);
        border-radius: 20px;
        padding: 32px;
        transition: all 0.3s;
      }
      
      .feature-card:hover {
        background: rgba(255,255,255,0.08);
        transform: translateY(-4px);
      }
      
      .feature-icon {
        width: 56px;
        height: 56px;
        background: rgba(255,255,255,0.1);
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
        font-weight: 300;
        opacity: 0.7;
        line-height: 1.7;
      }
      
      /* Stats Section */
      .stats {
        background: rgba(255,255,255,0.05);
        border: 1px solid rgba(255,255,255,0.1);
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
        font-size: 42px;
        font-weight: 700;
        margin-bottom: 8px;
      }
      
      .stat-label {
        font-size: 14px;
        opacity: 0.6;
      }
      
      /* CTA Section */
      .cta-section {
        text-align: center;
        padding: 80px 24px;
        background: rgba(255,255,255,0.03);
        border-top: 1px solid rgba(255,255,255,0.1);
        border-bottom: 1px solid rgba(255,255,255,0.1);
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
      
      /* Footer */
      footer {
        padding: 60px 24px 40px 24px;
        text-align: center;
      }
      
      .footer-logo {
        font-family: 'Tenor Sans', serif;
        font-size: 24px;
        letter-spacing: 10px;
        padding-left: 10px;
        margin-bottom: 16px;
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
        color: rgba(255,255,255,0.6);
        text-decoration: none;
        font-size: 13px;
        transition: color 0.2s;
      }
      
      .footer-links a:hover {
        color: #fff;
      }
      
      .footer-social {
        display: flex;
        gap: 16px;
        justify-content: center;
        margin-bottom: 32px;
      }
      
      .social-icon {
        width: 40px;
        height: 40px;
        background: rgba(255,255,255,0.08);
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: rgba(255,255,255,0.6);
        transition: all 0.2s;
        text-decoration: none;
      }
      
      .social-icon:hover {
        background: rgba(255,255,255,0.15);
        color: #fff;
      }
      
      .copyright {
        font-size: 12px;
        opacity: 0.4;
      }
      
      /* Mobile Menu */
      .mobile-menu-btn {
        display: none;
        background: none;
        border: none;
        color: #fff;
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
          letter-spacing: 10px;
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
      }
    </style>
</head>
<body>
    <!-- Navigation -->
    <nav>
        <div class="nav-container">
            <div class="logo">METI</div>
            <div class="nav-links">
                <a href="#features">기능</a>
                <a href="#about">소개</a>
                <a href="/auth/login" class="btn-primary" style="background: white; color: #0A2260;">시작하기</a>
            </div>
            <button class="mobile-menu-btn" onclick="alert('모바일 메뉴 준비 중')">
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
            <a href="/auth/login" class="btn-primary btn-large">
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
            
            <div style="display: flex; gap: 12px; font-size: 14px; opacity: 0.7; margin-top: 16px;">
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
        <a href="/auth/login" class="btn-primary btn-large">
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
        
        <div class="footer-social">
            <a href="#" class="social-icon">
                <i class="fab fa-twitter"></i>
            </a>
            <a href="#" class="social-icon">
                <i class="fab fa-instagram"></i>
            </a>
            <a href="#" class="social-icon">
                <i class="fab fa-linkedin"></i>
            </a>
        </div>
        
        <div class="copyright">
            © 2026 METI. All rights reserved.
        </div>
    </footer>
</body>
</html>
`;
