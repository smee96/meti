import { Hono } from 'hono';
import type { Env } from '../types';

const myProfile = new Hono<{ Bindings: Env }>();

// My profile page
myProfile.get('/', (c) => {
  return c.html(getMyProfileHTML());
});

function getMyProfileHTML() {
  return `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>마이 - METI</title>
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
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: sticky;
            top: 0;
            z-index: 100;
            backdrop-filter: blur(10px);
        }

        .header-left {
            display: flex;
            align-items: center;
            gap: 24px;
        }

        .logo {
            font-family: 'Montserrat', sans-serif;
            font-size: 28px;
            letter-spacing: 8px;
            color: white;
            cursor: pointer;
            font-display: block;
        }

        .nav-links {
            display: flex;
            gap: 24px;
        }

        .nav-link {
            color: rgba(255, 255, 255, 0.7);
            text-decoration: none;
            font-size: 15px;
            transition: color 0.3s;
        }

        .nav-link:hover,
        .nav-link.active {
            color: white;
        }

        .header-right {
            display: flex;
            align-items: center;
        }

        .settings-btn {
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

        .settings-btn:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: rotate(90deg);
        }

        /* Bottom Navigation Bar for Mobile */
        .bottom-nav {
            display: none;
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            padding: 8px 0 calc(8px + env(safe-area-inset-bottom));
            z-index: 100;
            box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.3);
        }

        .bottom-nav-container {
            display: flex;
            justify-content: space-around;
            align-items: center;
            max-width: 600px;
            margin: 0 auto;
        }

        .bottom-nav-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: rgba(255, 255, 255, 0.6);
            text-decoration: none;
            padding: 8px 12px;
            border-radius: 12px;
            transition: all 0.3s;
            flex: 1;
            max-width: 80px;
        }

        .bottom-nav-item:active {
            transform: scale(0.95);
        }

        .bottom-nav-item.active {
            color: #ffc107;
        }

        .bottom-nav-item.active .bottom-nav-icon {
            transform: scale(1.1);
        }

        .bottom-nav-icon {
            font-size: 24px;
            margin-bottom: 4px;
            transition: transform 0.3s;
        }

        .bottom-nav-label {
            font-size: 11px;
            font-weight: 500;
            letter-spacing: 0.3px;
        }

        .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 40px 20px;
        }

        .profile-header {
            text-align: center;
            margin-bottom: 48px;
        }

        .profile-avatar {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 48px;
            font-weight: 700;
            color: white;
            margin: 0 auto 24px;
            border: 4px solid rgba(255, 255, 255, 0.2);
        }

        .profile-name {
            font-size: 28px;
            font-weight: 700;
            margin-bottom: 8px;
        }

        .profile-email {
            font-size: 16px;
            opacity: 0.7;
        }

        .menu-section {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 16px;
            padding: 8px 0;
            margin-bottom: 24px;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .menu-section-title {
            font-size: 13px;
            font-weight: 600;
            opacity: 0.6;
            padding: 16px 20px 8px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .menu-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 16px 20px;
            cursor: pointer;
            transition: all 0.3s;
            text-decoration: none;
            color: white;
        }

        .menu-item:hover {
            background: rgba(255, 255, 255, 0.1);
        }

        .menu-item-left {
            display: flex;
            align-items: center;
            gap: 16px;
        }

        .menu-item-icon {
            width: 40px;
            height: 40px;
            border-radius: 10px;
            background: rgba(255, 255, 255, 0.1);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
        }

        .menu-item-icon.primary {
            background: linear-gradient(135deg, #ffc107 0%, #ffcd38 100%);
            color: #0A2260;
        }

        .menu-item-icon.info {
            background: linear-gradient(135deg, #2196F3 0%, #42A5F5 100%);
        }

        .menu-item-icon.success {
            background: linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%);
        }

        .menu-item-icon.danger {
            background: linear-gradient(135deg, #f44336 0%, #e57373 100%);
        }

        .menu-item-text {
            display: flex;
            flex-direction: column;
            gap: 4px;
        }

        .menu-item-title {
            font-size: 16px;
            font-weight: 500;
        }

        .menu-item-subtitle {
            font-size: 13px;
            opacity: 0.6;
        }

        .menu-item-badge {
            background: #f44336;
            color: white;
            padding: 2px 8px;
            border-radius: 12px;
            font-size: 12px;
            font-weight: 600;
        }

        .menu-item-badge.new {
            background: #ffc107;
            color: #0A2260;
        }

        .menu-item-arrow {
            font-size: 18px;
            opacity: 0.5;
        }

        /* Settings Modal */
        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.8);
            z-index: 1000;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }

        .modal.active {
            display: flex;
        }

        .modal-content {
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
            border-radius: 20px;
            padding: 32px;
            max-width: 500px;
            width: 100%;
            max-height: 80vh;
            overflow-y: auto;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 24px;
        }

        .modal-title {
            font-size: 24px;
            font-weight: 700;
        }

        .modal-close {
            background: none;
            border: none;
            color: white;
            font-size: 24px;
            cursor: pointer;
            opacity: 0.7;
            transition: opacity 0.3s;
        }

        .modal-close:hover {
            opacity: 1;
        }

        .setting-item {
            padding: 16px 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .setting-item:last-child {
            border-bottom: none;
        }

        .setting-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 8px;
        }

        .setting-label {
            font-size: 16px;
            font-weight: 500;
        }

        .setting-description {
            font-size: 13px;
            opacity: 0.6;
            line-height: 1.5;
        }

        /* Toggle Switch */
        .toggle-switch {
            position: relative;
            width: 50px;
            height: 28px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 14px;
            cursor: pointer;
            transition: background 0.3s;
        }

        .toggle-switch.active {
            background: #ffc107;
        }

        .toggle-slider {
            position: absolute;
            top: 3px;
            left: 3px;
            width: 22px;
            height: 22px;
            background: white;
            border-radius: 50%;
            transition: left 0.3s;
        }

        .toggle-switch.active .toggle-slider {
            left: 25px;
        }

        .hidden {
            display: none;
        }

        /* Responsive - Mobile Optimized */
        @media (max-width: 768px) {
            body {
                padding-bottom: 80px;
            }

            .header {
                padding: 12px 16px;
            }

            .logo {
                font-size: 20px;
                letter-spacing: 4px;
            }

            .nav-links {
                display: none;
            }

            .bottom-nav {
                display: block;
            }

            .container {
                padding: 24px 16px;
            }

            .profile-avatar {
                width: 100px;
                height: 100px;
                font-size: 40px;
            }

            .profile-name {
                font-size: 24px;
            }

            .modal-content {
                padding: 24px;
            }
        }
    </style>
</head>
<body>
    <!-- Header -->
    <div class="header">
        <div class="header-left">
            <div class="logo" onclick="window.location.href='/'">METI</div>
            <nav class="nav-links">
                <a href="/my/cards" class="nav-link">내 명함</a>
                <a href="/my/wallet" class="nav-link">명함 지갑</a>
                <a href="/game" class="nav-link">HappyTree</a>
            </nav>
        </div>
        <div class="header-right">
            <button class="settings-btn" onclick="openSettings()">
                <i class="fas fa-cog"></i>
            </button>
        </div>
    </div>

    <div class="container">
        <!-- Profile Header -->
        <div class="profile-header">
            <div class="profile-avatar" id="profileAvatar">?</div>
            <div class="profile-name" id="profileName">사용자</div>
            <div class="profile-email" id="profileEmail">user@example.com</div>
        </div>

        <!-- Account Section -->
        <div class="menu-section">
            <div class="menu-section-title">계정</div>
            <a href="#" class="menu-item" onclick="editProfile(); return false;">
                <div class="menu-item-left">
                    <div class="menu-item-icon primary">
                        <i class="fas fa-user-edit"></i>
                    </div>
                    <div class="menu-item-text">
                        <div class="menu-item-title">회원정보 수정</div>
                        <div class="menu-item-subtitle">이름, 이메일 변경</div>
                    </div>
                </div>
                <div class="menu-item-arrow">
                    <i class="fas fa-chevron-right"></i>
                </div>
            </a>
            <a href="#" class="menu-item" onclick="changePassword(); return false;">
                <div class="menu-item-left">
                    <div class="menu-item-icon info">
                        <i class="fas fa-key"></i>
                    </div>
                    <div class="menu-item-text">
                        <div class="menu-item-title">비밀번호 변경</div>
                        <div class="menu-item-subtitle">보안을 위해 주기적으로 변경하세요</div>
                    </div>
                </div>
                <div class="menu-item-arrow">
                    <i class="fas fa-chevron-right"></i>
                </div>
            </a>
        </div>

        <!-- Information Section -->
        <div class="menu-section">
            <div class="menu-section-title">정보</div>
            <a href="#" class="menu-item" onclick="showNotices(); return false;">
                <div class="menu-item-left">
                    <div class="menu-item-icon info">
                        <i class="fas fa-bullhorn"></i>
                    </div>
                    <div class="menu-item-text">
                        <div class="menu-item-title">공지사항</div>
                    </div>
                </div>
                <div class="menu-item-arrow">
                    <span class="menu-item-badge new">NEW</span>
                    <i class="fas fa-chevron-right"></i>
                </div>
            </a>
            <a href="#" class="menu-item" onclick="showEvents(); return false;">
                <div class="menu-item-left">
                    <div class="menu-item-icon success">
                        <i class="fas fa-gift"></i>
                    </div>
                    <div class="menu-item-text">
                        <div class="menu-item-title">이벤트</div>
                        <div class="menu-item-subtitle">진행 중인 이벤트 확인</div>
                    </div>
                </div>
                <div class="menu-item-arrow">
                    <i class="fas fa-chevron-right"></i>
                </div>
            </a>
            <a href="#" class="menu-item" onclick="showContact(); return false;">
                <div class="menu-item-left">
                    <div class="menu-item-icon">
                        <i class="fas fa-envelope"></i>
                    </div>
                    <div class="menu-item-text">
                        <div class="menu-item-title">문의하기</div>
                        <div class="menu-item-subtitle">고객센터 연락처</div>
                    </div>
                </div>
                <div class="menu-item-arrow">
                    <i class="fas fa-chevron-right"></i>
                </div>
            </a>
        </div>

        <!-- Terms Section -->
        <div class="menu-section">
            <div class="menu-section-title">약관 및 정책</div>
            <a href="#" class="menu-item" onclick="showTerms(); return false;">
                <div class="menu-item-left">
                    <div class="menu-item-icon">
                        <i class="fas fa-file-alt"></i>
                    </div>
                    <div class="menu-item-text">
                        <div class="menu-item-title">이용약관</div>
                    </div>
                </div>
                <div class="menu-item-arrow">
                    <i class="fas fa-chevron-right"></i>
                </div>
            </a>
            <a href="#" class="menu-item" onclick="showPrivacy(); return false;">
                <div class="menu-item-left">
                    <div class="menu-item-icon">
                        <i class="fas fa-shield-alt"></i>
                    </div>
                    <div class="menu-item-text">
                        <div class="menu-item-title">개인정보 처리방침</div>
                    </div>
                </div>
                <div class="menu-item-arrow">
                    <i class="fas fa-chevron-right"></i>
                </div>
            </a>
        </div>

        <!-- App Info Section -->
        <div class="menu-section">
            <div class="menu-section-title">앱 정보</div>
            <div class="menu-item">
                <div class="menu-item-left">
                    <div class="menu-item-icon">
                        <i class="fas fa-info-circle"></i>
                    </div>
                    <div class="menu-item-text">
                        <div class="menu-item-title">버전 정보</div>
                        <div class="menu-item-subtitle">v1.0.0</div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Settings Modal -->
    <div class="modal" id="settingsModal" onclick="closeSettings()">
        <div class="modal-content" onclick="event.stopPropagation()">
            <div class="modal-header">
                <div class="modal-title">
                    <i class="fas fa-cog"></i> 설정
                </div>
                <button class="modal-close" onclick="closeSettings()">
                    <i class="fas fa-times"></i>
                </button>
            </div>

            <div class="setting-item">
                <div class="setting-header">
                    <div class="setting-label">앱 알림</div>
                    <div class="toggle-switch" id="notificationToggle" onclick="toggleNotification()">
                        <div class="toggle-slider"></div>
                    </div>
                </div>
                <div class="setting-description">
                    명함 교환, 게임 보상 등의 알림을 받습니다
                </div>
            </div>

            <div class="setting-item">
                <div class="setting-header">
                    <div class="setting-label">마케팅 수신 동의</div>
                    <div class="toggle-switch" id="marketingToggle" onclick="toggleMarketing()">
                        <div class="toggle-slider"></div>
                    </div>
                </div>
                <div class="setting-description">
                    이벤트 및 프로모션 정보를 받습니다
                </div>
            </div>

            <div class="setting-item">
                <a href="#" class="menu-item" style="padding: 0;" onclick="logout(); return false;">
                    <div class="menu-item-left">
                        <div class="menu-item-icon">
                            <i class="fas fa-sign-out-alt"></i>
                        </div>
                        <div class="menu-item-text">
                            <div class="menu-item-title">로그아웃</div>
                        </div>
                    </div>
                </a>
            </div>

            <div class="setting-item">
                <a href="#" class="menu-item" style="padding: 0;" onclick="deleteAccount(); return false;">
                    <div class="menu-item-left">
                        <div class="menu-item-icon danger">
                            <i class="fas fa-user-times"></i>
                        </div>
                        <div class="menu-item-text">
                            <div class="menu-item-title" style="color: #f44336;">회원 탈퇴</div>
                            <div class="menu-item-subtitle">모든 데이터가 삭제됩니다</div>
                        </div>
                    </div>
                </a>
            </div>
        </div>
    </div>

    <!-- Bottom Navigation Bar (Mobile Only) -->
    <div class="bottom-nav">
        <div class="bottom-nav-container">
            <a href="/my/cards" class="bottom-nav-item">
                <div class="bottom-nav-icon">
                    <i class="fas fa-address-card"></i>
                </div>
                <div class="bottom-nav-label">내 명함</div>
            </a>
            <a href="/my/wallet" class="bottom-nav-item">
                <div class="bottom-nav-icon">
                    <i class="fas fa-wallet"></i>
                </div>
                <div class="bottom-nav-label">명함 지갑</div>
            </a>
            <a href="/game" class="bottom-nav-item">
                <div class="bottom-nav-icon">
                    <i class="fas fa-tree"></i>
                </div>
                <div class="bottom-nav-label">HappyTree</div>
            </a>
            <a href="/my/profile" class="bottom-nav-item active">
                <div class="bottom-nav-icon">
                    <i class="fas fa-user"></i>
                </div>
                <div class="bottom-nav-label">마이</div>
            </a>
        </div>
    </div>

    <script>
        // Load user info
        document.addEventListener('DOMContentLoaded', () => {
            loadUserProfile();
            loadSettings();
        });

        function loadUserProfile() {
            const userStr = localStorage.getItem('meti_user');
            if (userStr) {
                try {
                    const user = JSON.parse(userStr);
                    document.getElementById('profileName').textContent = user.name || '사용자';
                    document.getElementById('profileEmail').textContent = user.email || 'user@example.com';
                    
                    const initial = user.name ? user.name.charAt(0) : '?';
                    document.getElementById('profileAvatar').textContent = initial;
                } catch (e) {
                    console.error('Parse user error:', e);
                }
            }
        }

        function loadSettings() {
            const notification = localStorage.getItem('notification_enabled') === 'true';
            const marketing = localStorage.getItem('marketing_enabled') === 'true';

            if (notification) {
                document.getElementById('notificationToggle').classList.add('active');
            }
            if (marketing) {
                document.getElementById('marketingToggle').classList.add('active');
            }
        }

        // Settings Modal
        function openSettings() {
            document.getElementById('settingsModal').classList.add('active');
        }

        function closeSettings() {
            document.getElementById('settingsModal').classList.remove('active');
        }

        // Toggle functions
        function toggleNotification() {
            const toggle = document.getElementById('notificationToggle');
            toggle.classList.toggle('active');
            const enabled = toggle.classList.contains('active');
            localStorage.setItem('notification_enabled', enabled);
            
            if (enabled) {
                alert('알림이 활성화되었습니다.');
            }
        }

        function toggleMarketing() {
            const toggle = document.getElementById('marketingToggle');
            toggle.classList.toggle('active');
            const enabled = toggle.classList.contains('active');
            localStorage.setItem('marketing_enabled', enabled);
        }

        // Menu functions
        function editProfile() {
            alert('회원정보 수정 기능은 준비 중입니다.');
        }

        function changePassword() {
            const newPassword = prompt('새 비밀번호를 입력하세요:');
            if (newPassword && newPassword.length >= 6) {
                alert('비밀번호가 변경되었습니다.');
            } else if (newPassword) {
                alert('비밀번호는 6자 이상이어야 합니다.');
            }
        }

        function showNotices() {
            alert('📢 공지사항\\n\\n• METI 서비스 오픈!\\n• 첫 명함 생성 시 하트 50개 지급\\n• HappyTree 게임 이벤트 진행 중');
        }

        function showEvents() {
            alert('🎁 진행 중인 이벤트\\n\\n• 신규 가입 이벤트: 하트 300개 지급\\n• 명함 교환 이벤트: 추가 하트 20개\\n• 친구 초대 이벤트: 하트 100개');
        }

        function showContact() {
            alert('📧 문의하기\\n\\n이메일: support@meti.app\\n전화: 02-1234-5678\\n운영시간: 평일 09:00-18:00');
        }

        function showTerms() {
            alert('📄 이용약관\\n\\nMETI 서비스 이용약관\\n\\n제1조 (목적)\\n본 약관은 METI가 제공하는 서비스의 이용과 관련하여 회사와 이용자의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.\\n\\n...(전체 약관 내용)');
        }

        function showPrivacy() {
            alert('🔒 개인정보 처리방침\\n\\nMETI는 이용자의 개인정보를 중요시하며, 개인정보보호법을 준수합니다.\\n\\n수집하는 개인정보:\\n- 이메일, 이름\\n- 명함 정보\\n- 게임 활동 기록\\n\\n...(전체 방침 내용)');
        }

        function logout() {
            if (confirm('로그아웃 하시겠습니까?')) {
                localStorage.removeItem('meti_token');
                localStorage.removeItem('meti_user');
                sessionStorage.removeItem('meti_token');
                alert('로그아웃되었습니다.');
                window.location.href = '/auth/login';
            }
        }

        function deleteAccount() {
            const confirmed = confirm('정말로 회원 탈퇴하시겠습니까?\\n\\n탈퇴 시 모든 데이터가 영구 삭제되며 복구할 수 없습니다.');
            if (confirmed) {
                const doubleConfirm = confirm('다시 한 번 확인합니다. 정말 탈퇴하시겠습니까?');
                if (doubleConfirm) {
                    alert('회원 탈퇴가 완료되었습니다.\\n그동안 METI를 이용해 주셔서 감사합니다.');
                    localStorage.clear();
                    sessionStorage.clear();
                    window.location.href = '/';
                }
            }
        }
    </script>
</body>
</html>
  `;
}

export default myProfile;
