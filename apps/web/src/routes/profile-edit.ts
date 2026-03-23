import { Hono } from 'hono';
import type { Env } from '../types';
import { getModalHTML } from '../utils/modal';

const profileEdit = new Hono<{ Bindings: Env }>();

// Edit Name Page
profileEdit.get('/name', (c) => {
  return c.html(`
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>이름 수정 - METI</title>
    <link rel="preload" href="/static/fonts/Montserrat-Bold.woff2" as="font" type="font/woff2" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    ${getModalHTML()}
    <style>
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
            align-items: center;
            backdrop-filter: blur(10px);
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
            transform: scale(1.05);
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 40px 20px 100px;
        }

        .page-title {
            font-size: 28px;
            font-weight: 700;
            margin-bottom: 32px;
        }

        .form-group {
            margin-bottom: 24px;
        }

        .form-label {
            display: block;
            font-size: 14px;
            font-weight: 600;
            margin-bottom: 8px;
            opacity: 0.9;
        }

        .form-input {
            width: 100%;
            padding: 16px;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 12px;
            color: white;
            font-size: 16px;
            font-family: 'Noto Sans KR', sans-serif;
            transition: all 0.3s;
        }

        .form-input:focus {
            outline: none;
            background: rgba(255, 255, 255, 0.15);
            border-color: rgba(255, 193, 7, 0.5);
        }

        .form-input::placeholder {
            color: rgba(255, 255, 255, 0.5);
        }

        .form-input:disabled {
            opacity: 0.6;
            cursor: not-allowed;
        }

        .save-footer {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: linear-gradient(to top, rgba(10, 34, 96, 1) 0%, rgba(10, 34, 96, 0.98) 100%);
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            padding: 20px;
            display: flex;
            justify-content: center;
            backdrop-filter: blur(10px);
            box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.3);
        }

        .btn-save {
            width: 100%;
            max-width: 400px;
            padding: 16px 40px;
            background: linear-gradient(135deg, #ffc107 0%, #ffcd38 100%);
            color: #0A2260;
            border: none;
            border-radius: 12px;
            font-size: 18px;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.3s;
            box-shadow: 0 4px 16px rgba(255, 193, 7, 0.4);
        }

        .btn-save:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(255, 193, 7, 0.6);
        }

        .btn-save:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            transform: none;
        }

        @media (max-width: 767px) {
            .header {
                padding: 12px 16px;
            }
        }
    </style>
</head>
<body>
    <div class="header">
        <button class="back-btn" onclick="window.history.back()">
            <i class="fas fa-arrow-left"></i>
        </button>
    </div>

    <div class="container">
        <h1 class="page-title">이름 수정</h1>

        <div class="form-group">
            <label class="form-label">이메일 (변경 불가)</label>
            <input type="email" class="form-input" id="emailInput" disabled>
        </div>

        <div class="form-group">
            <label class="form-label">이름</label>
            <input type="text" class="form-input" id="nameInput" placeholder="이름을 입력하세요" maxlength="50">
        </div>
    </div>

    <div class="save-footer">
        <button class="btn-save" id="saveBtn" onclick="saveName()">
            <i class="fas fa-save"></i>
            <span id="saveBtnText">저장</span>
        </button>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
    <script>
        // Load current user data
        document.addEventListener('DOMContentLoaded', () => {
            const userStr = localStorage.getItem('meti_user');
            if (userStr) {
                try {
                    const user = JSON.parse(userStr);
                    document.getElementById('emailInput').value = user.email || '';
                    document.getElementById('nameInput').value = user.name || '';
                } catch (error) {
                    console.error('Failed to load user data:', error);
                }
            }
        });

        async function saveName() {
            const nameInput = document.getElementById('nameInput');
            const saveBtn = document.getElementById('saveBtn');
            const saveBtnText = document.getElementById('saveBtnText');
            
            const newName = nameInput.value.trim();
            
            if (!newName) {
                await window.modal.show({
                    message: '이름을 입력해주세요.',
                    type: 'warning'
                });
                return;
            }
            
            saveBtn.disabled = true;
            saveBtnText.textContent = '저장 중...';
            
            try {
                const token = localStorage.getItem('meti_token') || sessionStorage.getItem('meti_token');
                
                const response = await axios.put('/api/auth/profile', {
                    name: newName
                }, {
                    headers: {
                        'Authorization': \`Bearer \${token}\`
                    }
                });
                
                if (response.data.success) {
                    // Update local storage
                    const userStr = localStorage.getItem('meti_user');
                    if (userStr) {
                        const user = JSON.parse(userStr);
                        user.name = newName;
                        localStorage.setItem('meti_user', JSON.stringify(user));
                    }
                    
                    await window.modal.show({
                        message: '이름이 변경되었습니다!',
                        type: 'success'
                    });
                    window.location.href = '/my/profile';
                } else {
                    throw new Error(response.data.error || '이름 변경에 실패했습니다.');
                }
            } catch (error) {
                console.error('Name update error:', error);
                
                if (error.response && error.response.status === 401) {
                    await window.modal.show({
                        message: '로그인이 만료되었습니다. 다시 로그인해주세요.',
                        type: 'warning'
                    });
                    window.location.href = '/auth/login';
                } else {
                    const errorMsg = error.response?.data?.error || error.message || '이름 변경에 실패했습니다.';
                    await window.modal.show({
                        message: '오류: ' + errorMsg,
                        type: 'error'
                    });
                }
            } finally {
                saveBtn.disabled = false;
                saveBtnText.textContent = '저장';
            }
        }
    </script>
</body>
</html>
  `);
});

// Change Password Page
profileEdit.get('/password', (c) => {
  return c.html(`
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>비밀번호 변경 - METI</title>
    <link rel="preload" href="/static/fonts/Montserrat-Bold.woff2" as="font" type="font/woff2" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    ${getModalHTML()}
    <style>
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
            align-items: center;
            backdrop-filter: blur(10px);
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
            transform: scale(1.05);
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 40px 20px 100px;
        }

        .page-title {
            font-size: 28px;
            font-weight: 700;
            margin-bottom: 12px;
        }

        .page-subtitle {
            font-size: 14px;
            opacity: 0.7;
            margin-bottom: 32px;
        }

        .form-group {
            margin-bottom: 24px;
        }

        .form-label {
            display: block;
            font-size: 14px;
            font-weight: 600;
            margin-bottom: 8px;
            opacity: 0.9;
        }

        .input-wrapper {
            position: relative;
        }

        .form-input {
            width: 100%;
            padding: 16px;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 12px;
            color: white;
            font-size: 16px;
            font-family: 'Noto Sans KR', sans-serif;
            transition: all 0.3s;
        }

        .form-input:focus {
            outline: none;
            background: rgba(255, 255, 255, 0.15);
            border-color: rgba(255, 193, 7, 0.5);
        }

        .form-input::placeholder {
            color: rgba(255, 255, 255, 0.5);
        }

        .form-input.valid {
            border-color: rgba(76, 175, 80, 0.8);
        }

        .form-input.invalid {
            border-color: rgba(244, 67, 54, 0.8);
        }

        .validation-icon {
            position: absolute;
            right: 16px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 20px;
            display: none;
        }

        .validation-icon.valid {
            color: #4CAF50;
            display: block;
        }

        .validation-icon.invalid {
            color: #f44336;
            display: block;
        }

        .password-requirements {
            font-size: 13px;
            margin-top: 8px;
            padding: 12px;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 8px;
            line-height: 1.6;
        }

        .requirement-item {
            opacity: 0.7;
            margin-bottom: 4px;
        }

        .requirement-item.met {
            opacity: 1;
            color: #4CAF50;
        }

        .save-footer {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: linear-gradient(to top, rgba(10, 34, 96, 1) 0%, rgba(10, 34, 96, 0.98) 100%);
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            padding: 20px;
            display: flex;
            justify-content: center;
            backdrop-filter: blur(10px);
            box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.3);
        }

        .btn-save {
            width: 100%;
            max-width: 400px;
            padding: 16px 40px;
            background: linear-gradient(135deg, #ffc107 0%, #ffcd38 100%);
            color: #0A2260;
            border: none;
            border-radius: 12px;
            font-size: 18px;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.3s;
            box-shadow: 0 4px 16px rgba(255, 193, 7, 0.4);
        }

        .btn-save:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(255, 193, 7, 0.6);
        }

        .btn-save:disabled {
            opacity: 0.5;
            cursor: not-allowed;
            transform: none;
        }

        @media (max-width: 767px) {
            .header {
                padding: 12px 16px;
            }
        }
    </style>
</head>
<body>
    <div class="header">
        <button class="back-btn" onclick="window.history.back()">
            <i class="fas fa-arrow-left"></i>
        </button>
    </div>

    <div class="container">
        <h1 class="page-title">비밀번호 변경</h1>
        <p class="page-subtitle">안전한 비밀번호를 설정해주세요</p>

        <div class="form-group">
            <label class="form-label">현재 비밀번호</label>
            <input type="password" class="form-input" id="currentPassword" placeholder="현재 비밀번호를 입력하세요">
        </div>

        <div class="form-group">
            <label class="form-label">새 비밀번호</label>
            <div class="input-wrapper">
                <input type="password" class="form-input" id="newPassword" placeholder="새 비밀번호를 입력하세요" oninput="validatePasswords()">
                <i class="fas fa-check-circle validation-icon" id="newPasswordIcon"></i>
            </div>
            <div class="password-requirements">
                <div class="requirement-item" id="req-length">
                    <i class="fas fa-circle"></i> 8자 이상
                </div>
                <div class="requirement-item" id="req-letter">
                    <i class="fas fa-circle"></i> 영문 포함
                </div>
                <div class="requirement-item" id="req-number">
                    <i class="fas fa-circle"></i> 숫자 포함
                </div>
            </div>
        </div>

        <div class="form-group">
            <label class="form-label">새 비밀번호 확인</label>
            <div class="input-wrapper">
                <input type="password" class="form-input" id="confirmPassword" placeholder="새 비밀번호를 다시 입력하세요" oninput="validatePasswords()">
                <i class="fas fa-check-circle validation-icon" id="confirmPasswordIcon"></i>
            </div>
        </div>
    </div>

    <div class="save-footer">
        <button class="btn-save" id="saveBtn" onclick="savePassword()" disabled>
            <i class="fas fa-save"></i>
            <span id="saveBtnText">변경하기</span>
        </button>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
    <script>
        function validatePasswords() {
            const newPassword = document.getElementById('newPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const newPasswordInput = document.getElementById('newPassword');
            const confirmPasswordInput = document.getElementById('confirmPassword');
            const newPasswordIcon = document.getElementById('newPasswordIcon');
            const confirmPasswordIcon = document.getElementById('confirmPasswordIcon');
            const saveBtn = document.getElementById('saveBtn');
            
            // Password requirements
            const hasLength = newPassword.length >= 8;
            const hasLetter = /[a-zA-Z]/.test(newPassword);
            const hasNumber = /[0-9]/.test(newPassword);
            
            // Update requirement indicators
            document.getElementById('req-length').classList.toggle('met', hasLength);
            document.getElementById('req-letter').classList.toggle('met', hasLetter);
            document.getElementById('req-number').classList.toggle('met', hasNumber);
            
            const isNewPasswordValid = hasLength && hasLetter && hasNumber;
            
            // Validate new password
            if (newPassword.length > 0) {
                if (isNewPasswordValid) {
                    newPasswordInput.classList.remove('invalid');
                    newPasswordInput.classList.add('valid');
                    newPasswordIcon.classList.remove('invalid');
                    newPasswordIcon.classList.add('valid');
                } else {
                    newPasswordInput.classList.remove('valid');
                    newPasswordInput.classList.add('invalid');
                    newPasswordIcon.classList.remove('valid');
                    newPasswordIcon.classList.add('invalid');
                }
            } else {
                newPasswordInput.classList.remove('valid', 'invalid');
                newPasswordIcon.classList.remove('valid', 'invalid');
            }
            
            // Validate confirm password
            if (confirmPassword.length > 0) {
                // Only show green when:
                // 1. New password is fully valid
                // 2. Confirm password matches completely
                // 3. Both passwords have same length (fully typed)
                if (confirmPassword === newPassword && 
                    isNewPasswordValid && 
                    confirmPassword.length === newPassword.length &&
                    newPassword.length >= 8) {
                    confirmPasswordInput.classList.remove('invalid');
                    confirmPasswordInput.classList.add('valid');
                    confirmPasswordIcon.classList.remove('invalid');
                    confirmPasswordIcon.classList.add('valid');
                } else {
                    confirmPasswordInput.classList.remove('valid');
                    confirmPasswordInput.classList.add('invalid');
                    confirmPasswordIcon.classList.remove('valid');
                    confirmPasswordIcon.classList.add('invalid');
                }
            } else {
                confirmPasswordInput.classList.remove('valid', 'invalid');
                confirmPasswordIcon.classList.remove('valid', 'invalid');
            }
            
            // Enable/disable save button
            const currentPassword = document.getElementById('currentPassword').value;
            const allValid = currentPassword.length > 0 && 
                           isNewPasswordValid && 
                           confirmPassword === newPassword && 
                           confirmPassword.length > 0;
            
            saveBtn.disabled = !allValid;
        }
        
        async function savePassword() {
            const currentPassword = document.getElementById('currentPassword').value;
            const newPassword = document.getElementById('newPassword').value;
            const saveBtn = document.getElementById('saveBtn');
            const saveBtnText = document.getElementById('saveBtnText');
            
            saveBtn.disabled = true;
            saveBtnText.textContent = '변경 중...';
            
            try {
                const token = localStorage.getItem('meti_token') || sessionStorage.getItem('meti_token');
                
                const response = await axios.put('/api/auth/password', {
                    currentPassword,
                    newPassword
                }, {
                    headers: {
                        'Authorization': \`Bearer \${token}\`
                    }
                });
                
                if (response.data.success) {
                    await window.modal.show({
                        message: '비밀번호가 변경되었습니다!',
                        type: 'success'
                    });
                    window.location.href = '/my/profile';
                } else {
                    throw new Error(response.data.error || '비밀번호 변경에 실패했습니다.');
                }
            } catch (error) {
                console.error('Password change error:', error);
                
                if (error.response && error.response.status === 401) {
                    await window.modal.show({
                        message: '현재 비밀번호가 일치하지 않습니다.',
                        type: 'error'
                    });
                } else if (error.response && error.response.status === 403) {
                    await window.modal.show({
                        message: '로그인이 만료되었습니다. 다시 로그인해주세요.',
                        type: 'warning'
                    });
                    window.location.href = '/auth/login';
                } else {
                    const errorMsg = error.response?.data?.error || error.message || '비밀번호 변경에 실패했습니다.';
                    await window.modal.show({
                        message: '오류: ' + errorMsg,
                        type: 'error'
                    });
                }
            } finally {
                saveBtn.disabled = false;
                saveBtnText.textContent = '변경하기';
            }
        }
        
        // Validate on current password input
        document.getElementById('currentPassword').addEventListener('input', validatePasswords);
    </script>
</body>
</html>
  `);
});

export default profileEdit;
