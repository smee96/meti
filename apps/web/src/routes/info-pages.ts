import { Hono } from 'hono';

const infoPages = new Hono();

// 공지사항
infoPages.get('/notices', (c) => {
  return c.html(`
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>공지사항 - METI</title>
    <link rel="preload" href="/static/fonts/Montserrat-Bold.woff2" as="font" type="font/woff2" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
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
            min-height: 100vh;
            color: white;
        }

        .header {
            background: rgba(255, 255, 255, 0.05);
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            padding: 20px 40px;
            min-height: 80px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            backdrop-filter: blur(10px);
        }

        .logo {
            font-family: 'Montserrat', sans-serif;
            font-size: 20px;
            letter-spacing: 4px;
            color: white;
            cursor: pointer;
            font-weight: 700;
        }

        .back-btn {
            background: rgba(255, 255, 255, 0.1);
            border: none;
            color: white;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
            transition: all 0.3s;
        }

        .back-btn:hover {
            background: rgba(255, 255, 255, 0.2);
        }

        .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 40px 20px 100px;
        }

        .page-title {
            font-size: 32px;
            font-weight: 700;
            margin-bottom: 12px;
        }

        .page-subtitle {
            font-size: 16px;
            opacity: 0.7;
            margin-bottom: 40px;
        }

        .notice-list {
            display: flex;
            flex-direction: column;
            gap: 16px;
        }

        .notice-item {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            padding: 24px;
            cursor: pointer;
            transition: all 0.3s;
        }

        .notice-item:hover {
            background: rgba(255, 255, 255, 0.1);
            border-color: rgba(255, 255, 255, 0.2);
        }

        .notice-badge {
            display: inline-block;
            background: #ffc107;
            color: #0A2260;
            padding: 4px 12px;
            border-radius: 12px;
            font-size: 12px;
            font-weight: 600;
            margin-bottom: 12px;
        }

        .notice-title {
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 8px;
        }

        .notice-date {
            font-size: 14px;
            opacity: 0.6;
        }

        .empty-state {
            text-align: center;
            padding: 80px 20px;
        }

        .empty-icon {
            font-size: 64px;
            opacity: 0.3;
            margin-bottom: 20px;
        }

        .empty-text {
            font-size: 16px;
            opacity: 0.6;
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="logo" onclick="window.location.href='/'">METI</div>
        <button class="back-btn" onclick="window.history.back()">
            <i class="fas fa-arrow-left"></i>
        </button>
    </div>

    <div class="container">
        <h1 class="page-title">📢 공지사항</h1>
        <p class="page-subtitle">METI의 새로운 소식을 확인하세요</p>

        <div class="notice-list">
            <div class="notice-item">
                <span class="notice-badge">NEW</span>
                <div class="notice-title">METI 정식 서비스 오픈</div>
                <div class="notice-date">2024.03.23</div>
            </div>
            
            <div class="notice-item">
                <div class="notice-title">명함 지갑 기능 추가</div>
                <div class="notice-date">2024.03.20</div>
            </div>
            
            <div class="notice-item">
                <div class="notice-title">HappyTree 게임 베타 오픈</div>
                <div class="notice-date">2024.03.15</div>
            </div>
        </div>
    </div>
</body>
</html>
  `);
});

// 이벤트
infoPages.get('/events', (c) => {
  return c.html(`
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>이벤트 - METI</title>
    <link rel="preload" href="/static/fonts/Montserrat-Bold.woff2" as="font" type="font/woff2" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <style>
        @font-face {
            font-family: 'Montserrat';
            src: url('/static/fonts/Montserrat-Bold.woff2') format('woff2');
            font-weight: 700;
            font-style: normal;
            font-display: block;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
            font-family: 'Noto Sans KR', sans-serif;
            background: linear-gradient(135deg, #0A2260 0%, #1A3368 100%);
            min-height: 100vh;
            color: white;
        }

        .header {
            background: rgba(255, 255, 255, 0.05);
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            padding: 20px 40px;
            min-height: 80px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            backdrop-filter: blur(10px);
        }

        .logo {
            font-family: 'Montserrat', sans-serif;
            font-size: 20px;
            letter-spacing: 4px;
            color: white;
            cursor: pointer;
            font-weight: 700;
        }

        .back-btn {
            background: rgba(255, 255, 255, 0.1);
            border: none;
            color: white;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
            transition: all 0.3s;
        }

        .back-btn:hover { background: rgba(255, 255, 255, 0.2); }

        .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 40px 20px 100px;
        }

        .page-title {
            font-size: 32px;
            font-weight: 700;
            margin-bottom: 12px;
        }

        .page-subtitle {
            font-size: 16px;
            opacity: 0.7;
            margin-bottom: 40px;
        }

        .empty-state {
            text-align: center;
            padding: 80px 20px;
        }

        .empty-icon {
            font-size: 64px;
            opacity: 0.3;
            margin-bottom: 20px;
        }

        .empty-text {
            font-size: 16px;
            opacity: 0.6;
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="logo" onclick="window.location.href='/'">METI</div>
        <button class="back-btn" onclick="window.history.back()">
            <i class="fas fa-arrow-left"></i>
        </button>
    </div>

    <div class="container">
        <h1 class="page-title">🎉 이벤트</h1>
        <p class="page-subtitle">진행 중인 이벤트를 확인하세요</p>

        <div class="empty-state">
            <div class="empty-icon">🎁</div>
            <div class="empty-text">현재 진행 중인 이벤트가 없습니다</div>
        </div>
    </div>
</body>
</html>
  `);
});

// 문의하기
infoPages.get('/contact', (c) => {
  return c.html(`
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>문의하기 - METI</title>
    <link rel="preload" href="/static/fonts/Montserrat-Bold.woff2" as="font" type="font/woff2" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <style>
        @font-face {
            font-family: 'Montserrat';
            src: url('/static/fonts/Montserrat-Bold.woff2') format('woff2');
            font-weight: 700;
            font-style: normal;
            font-display: block;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
            font-family: 'Noto Sans KR', sans-serif;
            background: linear-gradient(135deg, #0A2260 0%, #1A3368 100%);
            min-height: 100vh;
            color: white;
        }

        .header {
            background: rgba(255, 255, 255, 0.05);
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            padding: 20px 40px;
            min-height: 80px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            backdrop-filter: blur(10px);
        }

        .logo {
            font-family: 'Montserrat', sans-serif;
            font-size: 20px;
            letter-spacing: 4px;
            color: white;
            cursor: pointer;
            font-weight: 700;
        }

        .back-btn {
            background: rgba(255, 255, 255, 0.1);
            border: none;
            color: white;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
            transition: all 0.3s;
        }

        .back-btn:hover { background: rgba(255, 255, 255, 0.2); }

        .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 40px 20px 100px;
        }

        .page-title {
            font-size: 32px;
            font-weight: 700;
            margin-bottom: 12px;
        }

        .page-subtitle {
            font-size: 16px;
            opacity: 0.7;
            margin-bottom: 40px;
        }

        .contact-box {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            padding: 32px;
            margin-bottom: 24px;
        }

        .contact-item {
            display: flex;
            align-items: center;
            gap: 16px;
            padding: 16px 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .contact-item:last-child {
            border-bottom: none;
        }

        .contact-icon {
            width: 48px;
            height: 48px;
            background: rgba(255, 193, 7, 0.2);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            color: #ffc107;
        }

        .contact-text h3 {
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 4px;
        }

        .contact-text p {
            font-size: 14px;
            opacity: 0.7;
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="logo" onclick="window.location.href='/'">METI</div>
        <button class="back-btn" onclick="window.history.back()">
            <i class="fas fa-arrow-left"></i>
        </button>
    </div>

    <div class="container">
        <h1 class="page-title">📧 문의하기</h1>
        <p class="page-subtitle">궁금한 점이 있으신가요?</p>

        <div class="contact-box">
            <div class="contact-item">
                <div class="contact-icon">
                    <i class="fas fa-envelope"></i>
                </div>
                <div class="contact-text">
                    <h3>이메일 문의</h3>
                    <p>support@meti.app</p>
                </div>
            </div>

            <div class="contact-item">
                <div class="contact-icon">
                    <i class="fas fa-clock"></i>
                </div>
                <div class="contact-text">
                    <h3>운영 시간</h3>
                    <p>평일 10:00 - 18:00 (주말 및 공휴일 휴무)</p>
                </div>
            </div>

            <div class="contact-item">
                <div class="contact-icon">
                    <i class="fas fa-reply"></i>
                </div>
                <div class="contact-text">
                    <h3>답변 시간</h3>
                    <p>영업일 기준 1-2일 이내 답변</p>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
  `);
});

// 이용약관
infoPages.get('/terms', (c) => {
  return c.html(`
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>이용약관 - METI</title>
    <link rel="preload" href="/static/fonts/Montserrat-Bold.woff2" as="font" type="font/woff2" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <style>
        @font-face {
            font-family: 'Montserrat';
            src: url('/static/fonts/Montserrat-Bold.woff2') format('woff2');
            font-weight: 700;
            font-style: normal;
            font-display: block;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
            font-family: 'Noto Sans KR', sans-serif;
            background: linear-gradient(135deg, #0A2260 0%, #1A3368 100%);
            min-height: 100vh;
            color: white;
        }

        .header {
            background: rgba(255, 255, 255, 0.05);
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            padding: 20px 40px;
            min-height: 80px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            backdrop-filter: blur(10px);
        }

        .logo {
            font-family: 'Montserrat', sans-serif;
            font-size: 20px;
            letter-spacing: 4px;
            color: white;
            cursor: pointer;
            font-weight: 700;
        }

        .back-btn {
            background: rgba(255, 255, 255, 0.1);
            border: none;
            color: white;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
            transition: all 0.3s;
        }

        .back-btn:hover { background: rgba(255, 255, 255, 0.2); }

        .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 40px 20px 100px;
        }

        .page-title {
            font-size: 32px;
            font-weight: 700;
            margin-bottom: 12px;
        }

        .page-subtitle {
            font-size: 16px;
            opacity: 0.7;
            margin-bottom: 40px;
        }

        .terms-content {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            padding: 32px;
            line-height: 1.8;
        }

        .terms-content h2 {
            font-size: 20px;
            font-weight: 600;
            margin: 32px 0 16px;
        }

        .terms-content h2:first-child {
            margin-top: 0;
        }

        .terms-content p {
            font-size: 14px;
            opacity: 0.8;
            margin-bottom: 16px;
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="logo" onclick="window.location.href='/'">METI</div>
        <button class="back-btn" onclick="window.history.back()">
            <i class="fas fa-arrow-left"></i>
        </button>
    </div>

    <div class="container">
        <h1 class="page-title">📄 이용약관</h1>
        <p class="page-subtitle">METI 서비스 이용약관</p>

        <div class="terms-content">
            <h2>제1조 (목적)</h2>
            <p>본 약관은 METI(이하 "회사")가 제공하는 디지털 명함 서비스(이하 "서비스")의 이용과 관련하여 회사와 이용자 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.</p>

            <h2>제2조 (용어의 정의)</h2>
            <p>1. "서비스"란 회사가 제공하는 디지털 명함 생성, 관리, 공유 등 일체의 서비스를 의미합니다.</p>
            <p>2. "이용자"란 본 약관에 동의하고 서비스를 이용하는 자를 말합니다.</p>

            <h2>제3조 (서비스의 제공 및 변경)</h2>
            <p>1. 회사는 이용자에게 다음과 같은 서비스를 제공합니다:</p>
            <p>- 디지털 명함 생성 및 관리</p>
            <p>- 명함 QR 코드 생성 및 공유</p>
            <p>- 받은 명함 저장 및 관리</p>
            <p>- 기타 회사가 정하는 서비스</p>

            <h2>제4조 (이용자의 의무)</h2>
            <p>1. 이용자는 본 약관 및 관계 법령을 준수하여야 합니다.</p>
            <p>2. 이용자는 타인의 정보를 도용하거나 부정한 방법으로 서비스를 이용해서는 안됩니다.</p>

            <h2>제5조 (개인정보보호)</h2>
            <p>회사는 관련 법령이 정하는 바에 따라 이용자의 개인정보를 보호하기 위해 노력합니다. 개인정보의 보호 및 사용에 대해서는 별도의 개인정보처리방침을 적용합니다.</p>

            <p style="margin-top: 40px; opacity: 0.5;">시행일: 2024년 3월 23일</p>
        </div>
    </div>
</body>
</html>
  `);
});

// 개인정보처리방침
infoPages.get('/privacy', (c) => {
  return c.html(`
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>개인정보처리방침 - METI</title>
    <link rel="preload" href="/static/fonts/Montserrat-Bold.woff2" as="font" type="font/woff2" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <style>
        @font-face {
            font-family: 'Montserrat';
            src: url('/static/fonts/Montserrat-Bold.woff2') format('woff2');
            font-weight: 700;
            font-style: normal;
            font-display: block;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
            font-family: 'Noto Sans KR', sans-serif;
            background: linear-gradient(135deg, #0A2260 0%, #1A3368 100%);
            min-height: 100vh;
            color: white;
        }

        .header {
            background: rgba(255, 255, 255, 0.05);
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            padding: 20px 40px;
            min-height: 80px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            backdrop-filter: blur(10px);
        }

        .logo {
            font-family: 'Montserrat', sans-serif;
            font-size: 20px;
            letter-spacing: 4px;
            color: white;
            cursor: pointer;
            font-weight: 700;
        }

        .back-btn {
            background: rgba(255, 255, 255, 0.1);
            border: none;
            color: white;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
            transition: all 0.3s;
        }

        .back-btn:hover { background: rgba(255, 255, 255, 0.2); }

        .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 40px 20px 100px;
        }

        .page-title {
            font-size: 32px;
            font-weight: 700;
            margin-bottom: 12px;
        }

        .page-subtitle {
            font-size: 16px;
            opacity: 0.7;
            margin-bottom: 40px;
        }

        .privacy-content {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            padding: 32px;
            line-height: 1.8;
        }

        .privacy-content h2 {
            font-size: 20px;
            font-weight: 600;
            margin: 32px 0 16px;
        }

        .privacy-content h2:first-child {
            margin-top: 0;
        }

        .privacy-content p {
            font-size: 14px;
            opacity: 0.8;
            margin-bottom: 16px;
        }

        .privacy-content ul {
            margin: 16px 0 16px 24px;
        }

        .privacy-content li {
            font-size: 14px;
            opacity: 0.8;
            margin-bottom: 8px;
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="logo" onclick="window.location.href='/'">METI</div>
        <button class="back-btn" onclick="window.history.back()">
            <i class="fas fa-arrow-left"></i>
        </button>
    </div>

    <div class="container">
        <h1 class="page-title">🔒 개인정보처리방침</h1>
        <p class="page-subtitle">METI 개인정보처리방침</p>

        <div class="privacy-content">
            <h2>1. 수집하는 개인정보의 항목</h2>
            <p>METI는 서비스 제공을 위해 다음과 같은 개인정보를 수집합니다:</p>
            <ul>
                <li>필수항목: 이메일, 이름, 비밀번호</li>
                <li>선택항목: 회사명, 직함, 전화번호, 소셜 링크</li>
            </ul>

            <h2>2. 개인정보의 수집 및 이용목적</h2>
            <p>수집한 개인정보는 다음의 목적으로 이용됩니다:</p>
            <ul>
                <li>회원 가입 및 관리</li>
                <li>디지털 명함 생성 및 관리</li>
                <li>서비스 제공 및 개선</li>
                <li>고객 문의 응대</li>
            </ul>

            <h2>3. 개인정보의 보유 및 이용기간</h2>
            <p>이용자의 개인정보는 원칙적으로 개인정보의 수집 및 이용목적이 달성되면 지체 없이 파기합니다. 단, 관계 법령에 의해 보관이 필요한 경우 해당 기간 동안 보관합니다.</p>

            <h2>4. 개인정보의 제3자 제공</h2>
            <p>METI는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다. 다만, 다음의 경우는 예외로 합니다:</p>
            <ul>
                <li>이용자가 사전에 동의한 경우</li>
                <li>법령의 규정에 의하거나 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우</li>
            </ul>

            <h2>5. 이용자의 권리와 행사방법</h2>
            <p>이용자는 언제든지 자신의 개인정보를 조회하거나 수정할 수 있으며, 가입 해지를 요청할 수 있습니다.</p>

            <h2>6. 개인정보 보호책임자</h2>
            <p>개인정보 보호책임자: METI 운영팀</p>
            <p>이메일: privacy@meti.app</p>

            <p style="margin-top: 40px; opacity: 0.5;">시행일: 2024년 3월 23일</p>
        </div>
    </div>
</body>
</html>
  `);
});

export default infoPages;
