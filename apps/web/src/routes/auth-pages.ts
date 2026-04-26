import { Hono } from 'hono';
import type { Env } from '../types';

const authPages = new Hono<{ Bindings: Env }>();

// Login page
authPages.get('/login', (c) => {
  return c.html(getLoginHTML());
});

// Register page
authPages.get('/register', (c) => {
  return c.html(getRegisterHTML());
});

function getLoginHTML() {
  return `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>로그인 - METI</title>
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
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }

        .auth-container {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 24px;
            padding: 48px;
            max-width: 440px;
            width: 100%;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            position: relative;
        }
        
        .back-button-auth {
            position: absolute;
            top: 20px;
            left: 20px;
            width: 36px;
            height: 36px;
            border: none;
            background: rgba(10, 34, 96, 0.1);
            color: #0A2260;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s;
            font-size: 16px;
        }
        
        .back-button-auth:hover {
            background: rgba(10, 34, 96, 0.15);
            transform: translateX(-2px);
        }
        
        .back-button-auth:active {
            transform: scale(0.95);
        }

        .logo {
            font-family: 'Montserrat', sans-serif;
            font-size: 36px;
            letter-spacing: 8px;
            color: #0A2260;
            text-align: center;
            margin-bottom: 12px;
        }

        .subtitle {
            text-align: center;
            color: #666;
            font-size: 15px;
            margin-bottom: 40px;
        }

        .form-group {
            margin-bottom: 24px;
        }

        .form-label {
            display: block;
            font-size: 14px;
            font-weight: 600;
            color: #333;
            margin-bottom: 8px;
        }

        .form-input {
            width: 100%;
            padding: 14px 16px;
            border: 2px solid #e0e0e0;
            border-radius: 12px;
            font-size: 15px;
            font-family: 'Noto Sans KR', sans-serif;
            transition: all 0.3s;
            background: white;
        }

        .form-input:focus {
            outline: none;
            border-color: #0A2260;
            box-shadow: 0 0 0 3px rgba(10, 34, 96, 0.1);
        }
        
        .form-input.valid {
            border-color: #4CAF50;
        }
        
        .form-input.invalid {
            border-color: #f44336;
        }

        .form-input::placeholder {
            color: #aaa;
        }

        .password-wrapper {
            position: relative;
        }

        .password-toggle {
            position: absolute;
            right: 16px;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            color: #666;
            cursor: pointer;
            font-size: 18px;
            padding: 4px;
        }

        .password-toggle:hover {
            color: #0A2260;
        }

        .form-options {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 24px;
        }

        .checkbox-wrapper {
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .checkbox-wrapper input[type="checkbox"] {
            width: 18px;
            height: 18px;
            cursor: pointer;
        }

        .checkbox-wrapper label {
            font-size: 14px;
            color: #666;
            cursor: pointer;
        }

        .forgot-password {
            font-size: 14px;
            color: #0A2260;
            text-decoration: none;
            font-weight: 500;
        }

        .forgot-password:hover {
            text-decoration: underline;
        }

        .btn-primary {
            width: 100%;
            padding: 16px;
            background: #0A2260;
            color: white;
            border: none;
            border-radius: 12px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
            font-family: 'Noto Sans KR', sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
        }

        .btn-primary:hover {
            background: #1A3368;
            transform: translateY(-2px);
            box-shadow: 0 8px 16px rgba(10, 34, 96, 0.5);
        }

        .btn-primary:disabled {
            background: #ccc;
            cursor: not-allowed;
            transform: none;
        }

        .divider {
            display: flex;
            align-items: center;
            margin: 32px 0;
            color: #999;
            font-size: 14px;
        }

        .divider::before,
        .divider::after {
            content: '';
            flex: 1;
            height: 1px;
            background: #e0e0e0;
        }

        .divider span {
            padding: 0 16px;
        }

        .social-login {
            display: flex;
            flex-direction: column;
            gap: 12px;
        }

        .btn-social {
            width: 100%;
            padding: 14px;
            border: 2px solid #e0e0e0;
            border-radius: 12px;
            background: white;
            font-size: 15px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            color: #333;
            font-family: 'Noto Sans KR', sans-serif;
        }

        .btn-social:hover {
            background: #f9f9f9;
            border-color: #ccc;
        }

        .btn-social i {
            font-size: 20px;
        }

        .btn-google {
            color: #4285F4;
        }

        .auth-footer {
            text-align: center;
            margin-top: 32px;
            font-size: 14px;
            color: #666;
        }

        .auth-footer a {
            color: #0A2260;
            text-decoration: none;
            font-weight: 600;
        }

        .auth-footer a:hover {
            text-decoration: underline;
        }

        .error-message {
            background: #fee;
            color: #c33;
            padding: 12px 16px;
            border-radius: 8px;
            margin-bottom: 20px;
            font-size: 14px;
            display: none;
        }

        .error-message.show {
            display: block;
        }

        .loading-spinner {
            display: inline-block;
            width: 16px;
            height: 16px;
            border: 2px solid rgba(255,255,255,0.3);
            border-top-color: white;
            border-radius: 50%;
            animation: spin 0.6s linear infinite;
        }

        @keyframes spin {
            to { transform: rotate(360deg); }
        }

        @media (max-width: 480px) {
            .auth-container {
                padding: 32px 24px;
            }

            .logo {
                font-size: 32px;
            }
        }
    </style>
</head>
<body>
    <div class="auth-container">
        <button class="back-button-auth" onclick="window.location.href='/'" aria-label="뒤로가기">
            <i class="fas fa-arrow-left"></i>
        </button>
        <div class="logo">METI</div>
        <div class="subtitle">디지털 명함의 새로운 기준</div>

        <div class="error-message" id="errorMessage"></div>

        <form id="loginForm" onsubmit="handleLogin(event)">
            <div class="form-group">
                <label class="form-label">이메일</label>
                <input 
                    type="email" 
                    class="form-input" 
                    id="email" 
                    placeholder="hello@meti.com"
                    required
                    autocomplete="email"
                >
            </div>

            <div class="form-group">
                <label class="form-label">비밀번호</label>
                <div class="password-wrapper">
                    <input 
                        type="password" 
                        class="form-input" 
                        id="password" 
                        placeholder="비밀번호를 입력하세요"
                        required
                        autocomplete="current-password"
                    >
                    <button type="button" class="password-toggle" onclick="togglePassword()">
                        <i class="fas fa-eye" id="passwordIcon"></i>
                    </button>
                </div>
            </div>

            <div class="form-options">
                <div class="checkbox-wrapper">
                    <input type="checkbox" id="remember" name="remember">
                    <label for="remember">로그인 상태 유지</label>
                </div>
                <a href="/auth/forgot-password" class="forgot-password">비밀번호 찾기</a>
            </div>

            <button type="submit" class="btn-primary" id="loginBtn">
                <span id="loginBtnText">로그인</span>
            </button>
        </form>

        <div class="auth-footer" style="margin-top: 32px;">
            아직 계정이 없으신가요?
            <a href="/auth/register">회원가입</a>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
    <script>
        function togglePassword() {
            const passwordInput = document.getElementById('password');
            const passwordIcon = document.getElementById('passwordIcon');
            
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                passwordIcon.className = 'fas fa-eye-slash';
            } else {
                passwordInput.type = 'password';
                passwordIcon.className = 'fas fa-eye';
            }
        }

        function showError(message) {
            const errorDiv = document.getElementById('errorMessage');
            errorDiv.textContent = message;
            errorDiv.classList.add('show');
        }

        function hideError() {
            const errorDiv = document.getElementById('errorMessage');
            errorDiv.classList.remove('show');
        }

        async function handleLogin(event) {
            event.preventDefault();
            hideError();

            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const remember = document.getElementById('remember').checked;

            if (!email || !password) {
                showError('이메일과 비밀번호를 입력해주세요.');
                return;
            }

            const loginBtn = document.getElementById('loginBtn');
            const loginBtnText = document.getElementById('loginBtnText');
            
            loginBtn.disabled = true;
            loginBtnText.innerHTML = '<span class="loading-spinner"></span> 로그인 중...';

            try {
                const response = await axios.post('/api/auth/login', {
                    email: email,
                    password: password
                });

                if (response.data.success) {
                    const token = response.data.data.token;
                    const user = response.data.data.user;

                    // Store token
                    if (remember) {
                        localStorage.setItem('meti_token', token);
                    } else {
                        sessionStorage.setItem('meti_token', token);
                    }
                    
                    // Store user info
                    localStorage.setItem('meti_user', JSON.stringify(user));

                    // Redirect to my cards
                    window.location.href = '/my/cards';
                } else {
                    showError(response.data.error || '로그인에 실패했습니다.');
                    loginBtn.disabled = false;
                    loginBtnText.textContent = '로그인';
                }
            } catch (error) {
                console.error('Login error:', error);
                
                if (error.response && error.response.data) {
                    // If user not found (404), redirect to register with email prefilled
                    if (error.response.status === 404) {
                        const email = document.getElementById('email').value.trim();
                        window.location.href = '/auth/register?email=' + encodeURIComponent(email);
                        return;
                    }
                    showError(error.response.data.error || '로그인에 실패했습니다.');
                } else {
                    showError('서버 연결에 실패했습니다. 잠시 후 다시 시도해주세요.');
                }
                
                loginBtn.disabled = false;
                loginBtnText.textContent = '로그인';
            }
        }

        // Check if already logged in
        document.addEventListener('DOMContentLoaded', () => {
            const token = localStorage.getItem('meti_token') || sessionStorage.getItem('meti_token');
            if (token) {
                // Verify token and redirect if valid
                axios.get('/api/auth/me', {
                    headers: { 'Authorization': 'Bearer ' + token }
                }).then(response => {
                    if (response.data.success) {
                        window.location.href = '/my/cards';
                    }
                }).catch(() => {
                    // Token invalid, clear it
                    localStorage.removeItem('meti_token');
                    sessionStorage.removeItem('meti_token');
                });
            }
        });
    </script>
</body>
</html>
  `;
}

function getRegisterHTML() {
  return `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>회원가입 - METI</title>
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
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }

        .auth-container {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 24px;
            padding: 48px;
            max-width: 440px;
            width: 100%;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            position: relative;
        }
        
        .back-button-auth {
            position: absolute;
            top: 20px;
            left: 20px;
            width: 36px;
            height: 36px;
            border: none;
            background: rgba(10, 34, 96, 0.1);
            color: #0A2260;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s;
            font-size: 16px;
        }
        
        .back-button-auth:hover {
            background: rgba(10, 34, 96, 0.15);
            transform: translateX(-2px);
        }
        
        .back-button-auth:active {
            transform: scale(0.95);
        }

        .logo {
            font-family: 'Montserrat', sans-serif;
            font-size: 36px;
            letter-spacing: 8px;
            color: #0A2260;
            text-align: center;
            margin-bottom: 12px;
        }

        .subtitle {
            text-align: center;
            color: #666;
            font-size: 15px;
            margin-bottom: 40px;
        }

        .form-group {
            margin-bottom: 24px;
        }

        .form-label {
            display: block;
            font-size: 14px;
            font-weight: 600;
            color: #333;
            margin-bottom: 8px;
        }

        .form-label .required {
            color: #e74c3c;
        }

        .form-input {
            width: 100%;
            padding: 14px 16px;
            border: 2px solid #e0e0e0;
            border-radius: 12px;
            font-size: 15px;
            font-family: 'Noto Sans KR', sans-serif;
            transition: all 0.3s;
            background: white;
        }

        .form-input:focus {
            outline: none;
            border-color: #0A2260;
            box-shadow: 0 0 0 3px rgba(10, 34, 96, 0.1);
        }
        
        .form-input.valid {
            border-color: #4CAF50;
        }
        
        .form-input.invalid {
            border-color: #f44336;
        }

        .form-input::placeholder {
            color: #aaa;
        }

        .password-wrapper {
            position: relative;
        }

        .password-toggle {
            position: absolute;
            right: 16px;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            color: #666;
            cursor: pointer;
            font-size: 18px;
            padding: 4px;
        }

        .password-toggle:hover {
            color: #0A2260;
        }

        .password-strength {
            margin-top: 8px;
            font-size: 12px;
        }

        .strength-bar {
            height: 4px;
            background: #e0e0e0;
            border-radius: 2px;
            overflow: hidden;
            margin-top: 8px;
        }

        .strength-bar-fill {
            height: 100%;
            transition: all 0.3s;
            width: 0%;
        }

        .strength-bar-fill.weak {
            width: 33%;
            background: #e74c3c;
        }

        .strength-bar-fill.medium {
            width: 66%;
            background: #f39c12;
        }

        .strength-bar-fill.strong {
            width: 100%;
            background: #27ae60;
        }

        .password-hint {
            font-size: 12px;
            color: #999;
            margin-top: 4px;
        }

        .terms-wrapper {
            margin-bottom: 24px;
        }

        .checkbox-wrapper {
            display: flex;
            align-items: flex-start;
            gap: 8px;
            margin-bottom: 12px;
        }

        .checkbox-wrapper input[type="checkbox"] {
            width: 18px;
            height: 18px;
            margin-top: 2px;
            cursor: pointer;
        }

        .checkbox-wrapper label {
            font-size: 14px;
            color: #666;
            cursor: pointer;
            line-height: 1.5;
        }

        .checkbox-wrapper label a {
            color: #0A2260;
            text-decoration: underline;
        }

        .btn-primary {
            width: 100%;
            padding: 16px;
            background: #0A2260;
            color: white;
            border: none;
            border-radius: 12px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
            font-family: 'Noto Sans KR', sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
        }

        .btn-primary:hover {
            background: #1A3368;
            transform: translateY(-2px);
            box-shadow: 0 8px 16px rgba(10, 34, 96, 0.5);
        }

        .btn-primary:disabled {
            background: #ccc;
            cursor: not-allowed;
            transform: none;
        }

        .divider {
            display: flex;
            align-items: center;
            margin: 32px 0;
            color: #999;
            font-size: 14px;
        }

        .divider::before,
        .divider::after {
            content: '';
            flex: 1;
            height: 1px;
            background: #e0e0e0;
        }

        .divider span {
            padding: 0 16px;
        }

        .social-login {
            display: flex;
            flex-direction: column;
            gap: 12px;
        }

        .btn-social {
            width: 100%;
            padding: 14px;
            border: 2px solid #e0e0e0;
            border-radius: 12px;
            background: white;
            font-size: 15px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            color: #333;
            font-family: 'Noto Sans KR', sans-serif;
        }

        .btn-social:hover {
            background: #f9f9f9;
            border-color: #ccc;
        }

        .btn-social i {
            font-size: 20px;
        }

        .btn-google {
            color: #4285F4;
        }

        .auth-footer {
            text-align: center;
            margin-top: 32px;
            font-size: 14px;
            color: #666;
        }

        .auth-footer a {
            color: #0A2260;
            text-decoration: none;
            font-weight: 600;
        }

        .auth-footer a:hover {
            text-decoration: underline;
        }

        .error-message {
            background: #fee;
            color: #c33;
            padding: 12px 16px;
            border-radius: 8px;
            margin-bottom: 20px;
            font-size: 14px;
            display: none;
        }

        .error-message.show {
            display: block;
        }

        .success-message {
            background: #efe;
            color: #3c3;
            padding: 12px 16px;
            border-radius: 8px;
            margin-bottom: 20px;
            font-size: 14px;
            display: none;
        }

        .success-message.show {
            display: block;
        }

        .loading-spinner {
            display: inline-block;
            width: 16px;
            height: 16px;
            border: 2px solid rgba(255,255,255,0.3);
            border-top-color: white;
            border-radius: 50%;
            animation: spin 0.6s linear infinite;
        }

        @keyframes spin {
            to { transform: rotate(360deg); }
        }

        @media (max-width: 480px) {
            .auth-container {
                padding: 32px 24px;
            }

            .logo {
                font-size: 32px;
            }
        }
    </style>
</head>
<body>
    <div class="auth-container">
        <button class="back-button-auth" onclick="window.location.href='/'" aria-label="뒤로가기">
            <i class="fas fa-arrow-left"></i>
        </button>
        <div class="logo">METI</div>
        <div class="subtitle">지금 바로 시작하세요</div>

        <div class="error-message" id="errorMessage"></div>
        <div class="success-message" id="successMessage"></div>

        <form id="registerForm" onsubmit="handleRegister(event)">
            <div class="form-group">
                <label class="form-label">
                    이름 <span class="required">*</span>
                </label>
                <input 
                    type="text" 
                    class="form-input" 
                    id="name" 
                    placeholder="홍길동"
                    required
                    autocomplete="name"
                >
            </div>

            <div class="form-group">
                <label class="form-label">
                    이메일 <span class="required">*</span>
                </label>
                <input 
                    type="email" 
                    class="form-input" 
                    id="email" 
                    placeholder="hello@meti.com"
                    required
                    autocomplete="email"
                >
            </div>

            <div class="form-group">
                <label class="form-label">
                    비밀번호 <span class="required">*</span>
                </label>
                <div class="password-wrapper">
                    <input 
                        type="password" 
                        class="form-input" 
                        id="password" 
                        placeholder="8자 이상 입력하세요"
                        required
                        autocomplete="new-password"
                        oninput="checkPasswordStrength()"
                    >
                    <button type="button" class="password-toggle" onclick="togglePassword('password', 'passwordIcon')">
                        <i class="fas fa-eye" id="passwordIcon"></i>
                    </button>
                </div>
                <div class="password-hint">영문, 숫자 조합 8자 이상</div>
                <div class="strength-bar">
                    <div class="strength-bar-fill" id="strengthBar"></div>
                </div>
            </div>

            <div class="form-group">
                <label class="form-label">
                    비밀번호 확인 <span class="required">*</span>
                </label>
                <div class="password-wrapper">
                    <input 
                        type="password" 
                        class="form-input" 
                        id="passwordConfirm" 
                        placeholder="비밀번호를 다시 입력하세요"
                        required
                        autocomplete="new-password"
                        oninput="validatePasswordMatch()"
                    >
                    <button type="button" class="password-toggle" onclick="togglePassword('passwordConfirm', 'passwordConfirmIcon')">
                        <i class="fas fa-eye" id="passwordConfirmIcon"></i>
                    </button>
                </div>
                <div id="passwordMatchMessage" style="font-size: 13px; margin-top: 6px;"></div>
            </div>

            <div class="terms-wrapper">
                <div class="checkbox-wrapper">
                    <input type="checkbox" id="agreeAll" onchange="toggleAllAgreements(this)">
                    <label for="agreeAll">전체 동의</label>
                </div>
                <div class="checkbox-wrapper">
                    <input type="checkbox" id="agreeTerms" class="agree-item" required>
                    <label for="agreeTerms">
                        <a href="/terms" target="_blank">이용약관</a>에 동의합니다 (필수)
                    </label>
                </div>
                <div class="checkbox-wrapper">
                    <input type="checkbox" id="agreePrivacy" class="agree-item" required>
                    <label for="agreePrivacy">
                        <a href="/privacy" target="_blank">개인정보처리방침</a>에 동의합니다 (필수)
                    </label>
                </div>
                <div class="checkbox-wrapper">
                    <input type="checkbox" id="agreeMarketing" class="agree-item">
                    <label for="agreeMarketing">
                        마케팅 정보 수신에 동의합니다 (선택)
                    </label>
                </div>
            </div>

            <button type="submit" class="btn-primary" id="registerBtn">
                <span id="registerBtnText">회원가입</span>
            </button>
        </form>

        <div class="auth-footer" style="margin-top: 32px;">
            이미 계정이 있으신가요?
            <a href="/auth/login">로그인</a>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
    <script>
        function togglePassword(inputId, iconId) {
            const passwordInput = document.getElementById(inputId);
            const passwordIcon = document.getElementById(iconId);
            
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                passwordIcon.className = 'fas fa-eye-slash';
            } else {
                passwordInput.type = 'password';
                passwordIcon.className = 'fas fa-eye';
            }
        }

        function checkPasswordStrength() {
            const password = document.getElementById('password').value;
            const strengthBar = document.getElementById('strengthBar');

            let strength = 0;
            if (password.length >= 8) strength++;
            if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
            if (/[0-9]/.test(password)) strength++;
            if (/[^a-zA-Z0-9]/.test(password)) strength++;

            strengthBar.className = 'strength-bar-fill';
            if (strength === 1 || strength === 2) {
                strengthBar.classList.add('weak');
            } else if (strength === 3) {
                strengthBar.classList.add('medium');
            } else if (strength >= 4) {
                strengthBar.classList.add('strong');
            }
        }

        function validatePasswordMatch() {
            const password = document.getElementById('password').value;
            const passwordConfirm = document.getElementById('passwordConfirm').value;
            const passwordConfirmInput = document.getElementById('passwordConfirm');
            const messageDiv = document.getElementById('passwordMatchMessage');
            
            if (passwordConfirm.length === 0) {
                passwordConfirmInput.classList.remove('valid', 'invalid');
                messageDiv.textContent = '';
                return;
            }
            
            if (password === passwordConfirm) {
                passwordConfirmInput.classList.remove('invalid');
                passwordConfirmInput.classList.add('valid');
                messageDiv.textContent = '✓ 비밀번호가 일치합니다';
                messageDiv.style.color = '#4CAF50';
            } else {
                passwordConfirmInput.classList.remove('valid');
                passwordConfirmInput.classList.add('invalid');
                messageDiv.textContent = '✗ 비밀번호가 일치하지 않습니다';
                messageDiv.style.color = '#f44336';
            }
        }

        function toggleAllAgreements(checkbox) {
            const agreeItems = document.querySelectorAll('.agree-item');
            agreeItems.forEach(item => {
                item.checked = checkbox.checked;
            });
        }

        function showError(message) {
            const errorDiv = document.getElementById('errorMessage');
            errorDiv.textContent = message;
            errorDiv.classList.add('show');
            
            const successDiv = document.getElementById('successMessage');
            successDiv.classList.remove('show');
        }

        function hideError() {
            const errorDiv = document.getElementById('errorMessage');
            errorDiv.classList.remove('show');
        }

        function showSuccess(message) {
            const successDiv = document.getElementById('successMessage');
            successDiv.textContent = message;
            successDiv.classList.add('show');
            
            const errorDiv = document.getElementById('errorMessage');
            errorDiv.classList.remove('show');
        }

        async function handleRegister(event) {
            event.preventDefault();
            hideError();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const passwordConfirm = document.getElementById('passwordConfirm').value;
            const agreeTerms = document.getElementById('agreeTerms').checked;
            const agreePrivacy = document.getElementById('agreePrivacy').checked;

            // Validation
            if (!name || !email || !password) {
                showError('모든 필수 항목을 입력해주세요.');
                return;
            }

            if (password.length < 8) {
                showError('비밀번호는 8자 이상이어야 합니다.');
                return;
            }

            if (password !== passwordConfirm) {
                showError('비밀번호가 일치하지 않습니다.');
                return;
            }

            if (!agreeTerms || !agreePrivacy) {
                showError('필수 약관에 동의해주세요.');
                return;
            }

            const registerBtn = document.getElementById('registerBtn');
            const registerBtnText = document.getElementById('registerBtnText');
            
            registerBtn.disabled = true;
            registerBtnText.innerHTML = '<span class="loading-spinner"></span> 가입 중...';

            try {
                const response = await axios.post('/api/auth/register', {
                    name: name,
                    email: email,
                    password: password
                });

                if (response.data.success) {
                    showSuccess('회원가입이 완료되었습니다! 로그인 페이지로 이동합니다...');
                    
                    setTimeout(() => {
                        window.location.href = '/auth/login';
                    }, 1500);
                } else {
                    showError(response.data.error || '회원가입에 실패했습니다.');
                    registerBtn.disabled = false;
                    registerBtnText.textContent = '회원가입';
                }
            } catch (error) {
                console.error('Register error:', error);
                
                if (error.response && error.response.data) {
                    showError(error.response.data.error || '회원가입에 실패했습니다.');
                } else {
                    showError('서버 연결에 실패했습니다. 잠시 후 다시 시도해주세요.');
                }
                
                registerBtn.disabled = false;
                registerBtnText.textContent = '회원가입';
            }
        }

        // Update "agree all" checkbox based on individual checkboxes
        document.querySelectorAll('.agree-item').forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                const agreeAll = document.getElementById('agreeAll');
                const allChecked = Array.from(document.querySelectorAll('.agree-item'))
                    .every(item => item.checked);
                agreeAll.checked = allChecked;
            });
        });

        // Prefill email from URL query parameter
        document.addEventListener('DOMContentLoaded', () => {
            const urlParams = new URLSearchParams(window.location.search);
            const emailParam = urlParams.get('email');
            if (emailParam) {
                const emailInput = document.getElementById('email');
                if (emailInput) {
                    emailInput.value = decodeURIComponent(emailParam);
                }
            }
        });
    </script>
</body>
</html>
  `;
}

export default authPages;
