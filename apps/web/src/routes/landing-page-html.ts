// METI Landing Page - Minimal Design
export const landingPageHTML = `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>METI - 디지털 명함의 새로운 기준</title>
    <link rel="preload" href="/static/fonts/Montserrat-Bold.woff2" as="font" type="font/woff2" crossorigin>
    <meta name="description" content="종이 명함은 이제 그만. QR 코드로 간편하게 공유하고, 언제 어디서나 명함을 관리하세요.">
    
    <!-- Favicon -->
    <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>💼</text></svg>">
    
    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap" rel="stylesheet">
    
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
        background: linear-gradient(135deg, #0A2260 0%, #1A3368 100%);
        color: #fff;
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
      }
      
      /* Main Container */
      .container {
        text-align: center;
        padding: 40px 20px;
        max-width: 600px;
        width: 100%;
      }
      
      /* METI Logo */
      .logo {
        font-family: 'Montserrat', sans-serif;
        font-size: 120px;
        font-weight: 700;
        letter-spacing: 20px;
        margin-bottom: 120px;
        color: white;
        text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        animation: fadeInUp 0.8s ease;
      }
      
      /* Tagline */
      .tagline {
        font-size: 18px;
        font-weight: 300;
        opacity: 0.9;
        margin-bottom: 80px;
        line-height: 1.6;
        animation: fadeInUp 1s ease 0.2s both;
      }
      
      /* Buttons */
      .buttons {
        display: flex;
        flex-direction: column;
        gap: 16px;
        max-width: 400px;
        margin: 0 auto;
        animation: fadeInUp 1.2s ease 0.4s both;
      }
      
      .btn {
        padding: 18px 40px;
        border-radius: 16px;
        font-size: 16px;
        font-weight: 600;
        border: none;
        cursor: pointer;
        transition: all 0.3s;
        text-decoration: none;
        display: inline-block;
        font-family: 'Noto Sans KR', sans-serif;
      }
      
      .btn-primary {
        background: linear-gradient(135deg, #ffc107 0%, #ffcd38 100%);
        color: #0A2260;
        box-shadow: 0 4px 16px rgba(255, 193, 7, 0.4);
      }
      
      .btn-primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(255, 193, 7, 0.6);
      }
      
      .btn-secondary {
        background: rgba(255, 255, 255, 0.1);
        color: white;
        border: 1px solid rgba(255, 255, 255, 0.2);
      }
      
      .btn-secondary:hover {
        background: rgba(255, 255, 255, 0.15);
        border-color: rgba(255, 255, 255, 0.3);
      }
      
      /* Animations */
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      /* Mobile Responsive */
      @media (max-width: 768px) {
        .logo {
          font-size: 80px;
          letter-spacing: 12px;
          margin-bottom: 80px;
        }
        
        .tagline {
          font-size: 16px;
          margin-bottom: 60px;
        }
        
        .btn {
          font-size: 15px;
          padding: 16px 32px;
        }
      }
      
      @media (max-width: 480px) {
        .logo {
          font-size: 60px;
          letter-spacing: 8px;
          margin-bottom: 60px;
        }
        
        .tagline {
          font-size: 14px;
          margin-bottom: 50px;
        }
      }
      
      /* Background Animation */
      body::before {
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: radial-gradient(circle, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
        background-size: 50px 50px;
        animation: moveBackground 20s linear infinite;
        pointer-events: none;
      }
      
      @keyframes moveBackground {
        0% {
          transform: translate(0, 0);
        }
        100% {
          transform: translate(50px, 50px);
        }
      }
    </style>
</head>
<body>
    <div class="container">
        <h1 class="logo">METI</h1>
        
        <p class="tagline">
            종이 명함은 이제 그만<br>
            QR 코드로 간편하게 공유하고<br>
            언제 어디서나 명함을 관리하세요
        </p>
        
        <div class="buttons">
            <a href="/auth/login" class="btn btn-primary">
                🚀 무료로 시작하기
            </a>
            <a href="/themes" class="btn btn-secondary">
                👁️ 더 알아보기
            </a>
        </div>
    </div>
</body>
</html>
`;
