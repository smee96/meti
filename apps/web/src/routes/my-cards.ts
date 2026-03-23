import { Hono } from 'hono';
import type { Env } from '../types';
import { getShareModalHTML, getShareModalStyles, getShareModalScript } from '../utils/share-modal';

const myCards = new Hono<{ Bindings: Env }>();

// My cards list page
myCards.get('/', (c) => {
  return c.html(getMyCardsHTML());
});

function getMyCardsHTML() {
  return `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>내 명함 - METI</title>
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
            font-weight: 700;
            font-size: 28px;
            letter-spacing: 8px;
            color: white;
            cursor: pointer;
        }

        .nav-links {
            display: flex;
            gap: 24px;
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
            gap: 16px;
        }

        .user-info {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 8px 16px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            cursor: pointer;
            transition: all 0.3s;
        }

        .user-info:hover {
            background: rgba(255, 255, 255, 0.15);
        }

        .user-avatar {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.2);
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .user-name {
            font-size: 14px;
            font-weight: 500;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 40px 20px;
        }

        .page-header {
            margin-bottom: 40px;
        }

        .page-title {
            font-size: 32px;
            font-weight: 700;
            margin-bottom: 12px;
        }

        .page-subtitle {
            font-size: 16px;
            opacity: 0.8;
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .card-count {
            background: rgba(255, 255, 255, 0.2);
            padding: 4px 12px;
            border-radius: 12px;
            font-size: 14px;
        }

        .limit-notice {
            background: rgba(255, 193, 7, 0.15);
            border: 1px solid rgba(255, 193, 7, 0.3);
            border-radius: 12px;
            padding: 16px 20px;
            margin-bottom: 32px;
            display: flex;
            align-items: center;
            gap: 12px;
            color: #ffc107;
        }

        .limit-notice i {
            font-size: 20px;
        }

        .limit-notice-text {
            flex: 1;
        }

        .limit-notice-title {
            font-weight: 600;
            margin-bottom: 4px;
        }

        .limit-notice-desc {
            font-size: 14px;
            opacity: 0.9;
        }

        .actions-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 32px;
            gap: 16px;
        }

        .search-box {
            flex: 1;
            max-width: 400px;
            position: relative;
        }

        .search-box input {
            width: 100%;
            padding: 12px 16px 12px 44px;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 12px;
            color: white;
            font-size: 14px;
            transition: all 0.3s;
        }

        .search-box input:focus {
            outline: none;
            background: rgba(255, 255, 255, 0.15);
            border-color: rgba(255, 255, 255, 0.4);
        }

        .search-box input::placeholder {
            color: rgba(255, 255, 255, 0.5);
        }

        .search-box i {
            position: absolute;
            left: 16px;
            top: 50%;
            transform: translateY(-50%);
            opacity: 0.5;
        }

        .btn {
            padding: 12px 24px;
            border-radius: 12px;
            font-size: 15px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
            border: none;
            font-family: 'Noto Sans KR', sans-serif;
            display: flex;
            align-items: center;
            gap: 8px;
            text-decoration: none;
        }

        .btn-primary {
            background: white;
            color: #0A2260;
        }

        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 16px rgba(255, 255, 255, 0.3);
        }

        .btn-secondary {
            background: rgba(255, 255, 255, 0.1);
            color: white;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .btn-secondary:hover {
            background: rgba(255, 255, 255, 0.2);
        }

        .cards-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
            gap: 24px;
            margin-bottom: 40px;
        }

        .card-item {
            background: rgba(255, 255, 255, 0.95);
            border-radius: 20px;
            padding: 24px;
            color: #333;
            transition: all 0.3s;
            position: relative;
            overflow: hidden;
        }

        .card-item:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
        }

        .card-theme-bar {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
        }

        .card-header {
            display: flex;
            gap: 16px;
            margin-bottom: 20px;
        }

        .card-avatar {
            width: 64px;
            height: 64px;
            border-radius: 50%;
            background: #f0f0f0;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
        }

        .card-avatar img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .card-avatar i {
            font-size: 28px;
            color: #ccc;
        }

        .card-info {
            flex: 1;
        }

        .card-name {
            font-size: 20px;
            font-weight: 700;
            margin-bottom: 4px;
        }

        .card-title {
            font-size: 14px;
            color: #666;
            margin-bottom: 2px;
        }

        .card-company {
            font-size: 13px;
            color: #999;
        }

        .card-meta {
            display: flex;
            gap: 16px;
            margin-bottom: 20px;
            font-size: 13px;
            color: #666;
        }

        .card-meta-item {
            display: flex;
            align-items: center;
            gap: 6px;
        }

        .card-actions {
            display: flex;
            gap: 8px;
        }

        .card-btn {
            flex: 1;
            padding: 10px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s;
            border: none;
            background: #f0f0f0;
            color: #333;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
        }

        .card-btn:hover {
            background: #e0e0e0;
        }

        .card-btn.primary {
            background: #0A2260;
            color: white;
        }

        .card-btn.primary:hover {
            background: #1A3368;
        }

        .card-btn.danger {
            background: #fee;
            color: #c33;
        }

        .card-btn.danger:hover {
            background: #fdd;
        }

        .empty-state {
            text-align: center;
            padding: 80px 20px;
            opacity: 0.8;
        }

        .empty-icon {
            font-size: 80px;
            margin-bottom: 24px;
            opacity: 0.5;
        }

        .empty-title {
            font-size: 24px;
            font-weight: 600;
            margin-bottom: 12px;
        }

        .empty-desc {
            font-size: 16px;
            opacity: 0.7;
            margin-bottom: 32px;
        }

        .loading {
            text-align: center;
            padding: 60px 20px;
        }

        .loading-spinner {
            display: inline-block;
            width: 48px;
            height: 48px;
            border: 4px solid rgba(255, 255, 255, 0.2);
            border-top-color: white;
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
            to { transform: rotate(360deg); }
        }

        .hidden {
            display: none;
        }

        /* Responsive - Mobile Optimized */
        @media (max-width: 768px) {
            body {
                padding-bottom: 80px; /* Space for bottom nav */
            }

            .header {
                padding: 12px 16px;
                flex-wrap: wrap;
            }

            .header-left {
                gap: 16px;
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
                padding: 24px 16px 24px 16px;
            }

            .page-header {
                margin-bottom: 24px;
            }

            .page-title {
                font-size: 22px;
            }

            .page-subtitle {
                font-size: 14px;
                flex-wrap: wrap;
            }

            .limit-notice {
                padding: 12px 16px;
                font-size: 14px;
            }

            .limit-notice i {
                font-size: 18px;
            }

            .limit-notice-title {
                font-size: 15px;
            }

            .limit-notice-desc {
                font-size: 13px;
            }

            .cards-grid {
                grid-template-columns: 1fr;
                gap: 16px;
            }

            .actions-bar {
                flex-direction: column;
                align-items: stretch;
                gap: 12px;
            }

            .search-box {
                max-width: 100%;
            }

            .btn {
                font-size: 14px;
                padding: 10px 20px;
            }

            .card-item {
                padding: 20px;
            }

            .card-header {
                gap: 12px;
            }

            .card-avatar {
                width: 56px;
                height: 56px;
            }

            .card-avatar i {
                font-size: 24px;
            }

            .card-name {
                font-size: 18px;
            }

            .card-title {
                font-size: 13px;
            }

            .card-company {
                font-size: 12px;
            }

            .card-meta {
                font-size: 12px;
                gap: 12px;
            }

            .card-actions {
                flex-wrap: wrap;
            }

            .card-btn {
                font-size: 13px;
                padding: 8px;
            }

            .user-info {
                padding: 6px 12px;
            }

            .user-avatar {
                width: 28px;
                height: 28px;
            }

            .user-name {
                font-size: 13px;
            }

            .empty-icon {
                font-size: 64px;
            }

            .empty-title {
                font-size: 20px;
            }

            .empty-desc {
                font-size: 14px;
            }
        }

        /* Modal */
        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.7);
            z-index: 1000;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }

        .modal.show {
            display: flex;
        }

        .modal-content {
            background: white;
            border-radius: 20px;
            padding: 32px;
            max-width: 400px;
            width: 100%;
            color: #333;
        }

        .modal-title {
            font-size: 20px;
            font-weight: 700;
            margin-bottom: 16px;
        }

        .modal-text {
            font-size: 15px;
            line-height: 1.6;
            margin-bottom: 24px;
            color: #666;
        }

        .modal-actions {
            display: flex;
            gap: 12px;
        }

        .modal-btn {
            flex: 1;
            padding: 12px;
            border-radius: 10px;
            font-size: 15px;
            font-weight: 600;
            cursor: pointer;
            border: none;
            transition: all 0.3s;
        }

        .modal-btn.cancel {
            background: #f0f0f0;
            color: #666;
        }

        .modal-btn.cancel:hover {
            background: #e0e0e0;
        }

        .modal-btn.confirm {
            background: #e74c3c;
            color: white;
        }

        .modal-btn.confirm:hover {
            background: #c0392b;
        }
        
        ${getShareModalStyles()}
    </style>
</head>
<body>
    <!-- Header -->
    <div class="header">
        <div class="header-left">
            <div class="logo" onclick="window.location.href='/'">METI</div>
            <nav class="nav-links">
                <a href="/my/cards" class="nav-link active">내 명함</a>
                <a href="/my/wallet" class="nav-link">명함 지갑</a>
                <a href="/game" class="nav-link">HappyTree</a>
            </nav>
        </div>
    </div>

    <div class="container">
        <!-- Page Header -->
        <div class="page-header">
            <h1 class="page-title">내 명함</h1>
            <div class="page-subtitle">
                <span id="cardCountText">명함을 불러오는 중...</span>
            </div>
        </div>

        <!-- Limit Notice (shown when approaching limit) -->
        <div class="limit-notice hidden" id="limitNotice">
            <i class="fas fa-exclamation-triangle"></i>
            <div class="limit-notice-text">
                <div class="limit-notice-title">명함 개수 제한 안내</div>
                <div class="limit-notice-desc">최대 5개까지 명함을 생성할 수 있습니다. 추가 명함이 필요하신가요? <a href="/pricing" style="color: #ffc107; text-decoration: underline;">프리미엄 플랜</a>을 확인해보세요.</div>
            </div>
        </div>

        <!-- Actions Bar -->
        <div class="actions-bar">
            <div class="search-box">
                <i class="fas fa-search"></i>
                <input type="text" placeholder="명함 검색..." id="searchInput" oninput="filterCards()">
            </div>
            <a href="/my/card/new" class="btn btn-primary" id="createBtn">
                <i class="fas fa-plus"></i>
                새 명함 만들기
            </a>
        </div>

        <!-- Loading State -->
        <div class="loading" id="loadingState">
            <div class="loading-spinner"></div>
        </div>

        <!-- Empty State -->
        <div class="empty-state hidden" id="emptyState">
            <div class="empty-icon">💼</div>
            <div class="empty-title">아직 명함이 없습니다</div>
            <div class="empty-desc">첫 번째 디지털 명함을 만들어보세요!</div>
            <a href="/my/card/new" class="btn btn-primary">
                <i class="fas fa-plus"></i>
                명함 만들기
            </a>
        </div>

        <!-- Cards Grid -->
        <div class="cards-grid hidden" id="cardsGrid">
            <!-- Cards will be inserted here -->
        </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div class="modal" id="deleteModal">
        <div class="modal-content">
            <div class="modal-title">명함 삭제</div>
            <div class="modal-text">
                이 명함을 삭제하시겠습니까?<br>
                삭제된 명함은 복구할 수 없습니다.
            </div>
            <div class="modal-actions">
                <button class="modal-btn cancel" onclick="closeDeleteModal()">취소</button>
                <button class="modal-btn confirm" onclick="confirmDelete()">삭제</button>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
    <script>
        let allCards = [];
        let currentDeleteCardId = null;
        const DISPLAY_LIMIT = 5; // Frontend display limit

        // Theme colors
        const THEME_COLORS = {
            'deep-navy': '#0A2260',
            'midnight-teal': '#0D3D4D',
            'forest-deep': '#1A3D2E',
            'royal-burgundy': '#4A1E2E',
            'charcoal-dark': '#1C1C1E',
            'slate-blue': '#2C3E50',
            'deep-purple': '#3D2857',
            'warm-brown': '#3E2723',
            'olive-night': '#3D4A2C',
            'sunset-orange': '#8B4513'
        };

        // Initialize
        document.addEventListener('DOMContentLoaded', async () => {
            await loadCards();
        });

        // Check authentication
        function checkAuth() {
            const token = localStorage.getItem('meti_token') || sessionStorage.getItem('meti_token');
            if (!token) {
                console.log('No token found, redirecting to login...');
                alert('로그인이 필요합니다.');
                window.location.href = '/auth/login';
                return null;
            }
            return token;
        }

        // Load cards
        async function loadCards() {
            try {
                const token = checkAuth();
                if (!token) return;

                const response = await axios.get('/api/cards', {
                    headers: { 'Authorization': \`Bearer \${token}\` }
                });

                if (response.data.success) {
                    const data = response.data.data;
                    allCards = data.cards || [];
                    
                    // Update card count
                    updateCardCount(data);
                    
                    // Show limit notice if approaching limit
                    if (data.total >= DISPLAY_LIMIT - 1) {
                        document.getElementById('limitNotice').classList.remove('hidden');
                    }
                    
                    // Disable create button if at limit
                    if (data.total >= DISPLAY_LIMIT) {
                        const createBtn = document.getElementById('createBtn');
                        createBtn.style.opacity = '0.5';
                        createBtn.style.cursor = 'not-allowed';
                        createBtn.onclick = (e) => {
                            e.preventDefault();
                            alert(\`명함은 최대 \${DISPLAY_LIMIT}개까지 생성할 수 있습니다.\`);
                        };
                    }
                    
                    // Hide loading
                    document.getElementById('loadingState').classList.add('hidden');
                    
                    // Show cards or empty state
                    if (allCards.length === 0) {
                        document.getElementById('emptyState').classList.remove('hidden');
                    } else {
                        document.getElementById('cardsGrid').classList.remove('hidden');
                        renderCards(allCards);
                    }
                } else {
                    throw new Error(response.data.error || 'Failed to load cards');
                }
            } catch (error) {
                console.error('Load cards error:', error);
                document.getElementById('loadingState').classList.add('hidden');
                
                // Check if authentication error
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    localStorage.removeItem('meti_token');
                    sessionStorage.removeItem('meti_token');
                    localStorage.removeItem('meti_user');
                    alert('로그인이 만료되었습니다. 다시 로그인해주세요.');
                    window.location.href = '/auth/login';
                } else {
                    alert('명함을 불러오는데 실패했습니다.');
                }
            }
        }

        // Update card count display
        function updateCardCount(data) {
            const countText = document.getElementById('cardCountText');
            countText.innerHTML = \`
                총 <span class="card-count">\${data.total}개</span>의 명함
                <span style="opacity: 0.6; font-size: 14px;">(\${DISPLAY_LIMIT}개까지 생성 가능)</span>
            \`;
        }

        // Render cards
        function renderCards(cards) {
            const grid = document.getElementById('cardsGrid');
            grid.innerHTML = '';

            cards.forEach(card => {
                const cardEl = createCardElement(card);
                grid.appendChild(cardEl);
            });
        }

        // Create card element
        function createCardElement(card) {
            const div = document.createElement('div');
            div.className = 'card-item';
            div.dataset.cardId = card.id;
            
            const themeColor = THEME_COLORS[card.theme] || '#0A2260';
            
            div.innerHTML = \`
                <div class="card-theme-bar" style="background: \${themeColor};"></div>
                
                <div class="card-header">
                    <div class="card-avatar">
                        \${card.avatar_url 
                            ? \`<img src="\${card.avatar_url}" alt="\${card.name}">\` 
                            : '<i class="fas fa-user"></i>'}
                    </div>
                    <div class="card-info">
                        <div class="card-name">\${card.name}</div>
                        \${card.title ? \`<div class="card-title">\${card.title}</div>\` : ''}
                        \${card.company ? \`<div class="card-company">\${card.company}</div>\` : ''}
                    </div>
                </div>

                <div class="card-actions">
                    <button class="card-btn" onclick="viewCard('\${card.id}')">
                        <i class="fas fa-eye"></i>
                        보기
                    </button>
                    <button class="card-btn" onclick="shareCard('\${card.id}', '\${card.name}', '\${card.headline || ''}')">
                        <i class="fas fa-share-alt"></i>
                        공유
                    </button>
                    <button class="card-btn primary" onclick="editCard('\${card.id}')">
                        <i class="fas fa-edit"></i>
                        수정
                    </button>
                    <button class="card-btn danger" onclick="showDeleteModal('\${card.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            \`;
            
            return div;
        }

        // Format date
        function formatDate(dateStr) {
            const date = new Date(dateStr);
            const now = new Date();
            const diff = now - date;
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            
            if (days === 0) return '오늘';
            if (days === 1) return '어제';
            if (days < 7) return \`\${days}일 전\`;
            if (days < 30) return \`\${Math.floor(days / 7)}주 전\`;
            if (days < 365) return \`\${Math.floor(days / 30)}개월 전\`;
            return \`\${Math.floor(days / 365)}년 전\`;
        }

        // Filter cards
        function filterCards() {
            const query = document.getElementById('searchInput').value.toLowerCase();
            const filtered = allCards.filter(card => 
                card.name.toLowerCase().includes(query) ||
                (card.title && card.title.toLowerCase().includes(query)) ||
                (card.company && card.company.toLowerCase().includes(query))
            );
            renderCards(filtered);
        }

        // View card
        function viewCard(cardId) {
            window.location.href = '/my/card/' + cardId;
        }

        // Share card
        // Share card - use Remember-style modal
        let currentShareCardId = null;
        let currentShareCardName = '';
        let currentShareCardHeadline = '';
        
        function shareCard(cardId, cardName, cardHeadline) {
            currentShareCardId = cardId;
            currentShareCardName = cardName || '명함';
            currentShareCardHeadline = cardHeadline || '';
            
            // Open share modal
            openShareModal();
        }

        // Copy to clipboard
        function copyToClipboard(text) {
            navigator.clipboard.writeText(text).then(() => {
                alert('링크가 복사되었습니다!');
            }).catch(() => {
                prompt('이 링크를 복사하세요:', text);
            });
        }

        // Edit card
        function editCard(cardId) {
            // Verify token before redirect
            const token = checkAuth();
            if (!token) return;
            window.location.href = \`/my/card/\${cardId}/edit\`;
        }

        // Show delete modal
        function showDeleteModal(cardId) {
            currentDeleteCardId = cardId;
            document.getElementById('deleteModal').classList.add('show');
        }

        // Close delete modal
        function closeDeleteModal() {
            currentDeleteCardId = null;
            document.getElementById('deleteModal').classList.remove('show');
        }

        // Confirm delete
        async function confirmDelete() {
            if (!currentDeleteCardId) return;

            try {
                const token = checkAuth();
                if (!token) return;

                const response = await axios.delete(\`/api/cards/\${currentDeleteCardId}\`, {
                    headers: { 'Authorization': \`Bearer \${token}\` }
                });

                if (response.data.success) {
                    closeDeleteModal();
                    await loadCards(); // Reload cards
                    alert('명함이 삭제되었습니다.');
                } else {
                    throw new Error(response.data.error || 'Failed to delete card');
                }
            } catch (error) {
                console.error('Delete error:', error);
                alert('명함 삭제에 실패했습니다.');
            }
        }
    </script>
    
    ${getShareModalHTML()}
    
    <script src="https://cdn.jsdelivr.net/npm/qrcodejs@1.0.0/qrcode.min.js"></script>
    <script>
        // Share modal functions for my-cards page
        let qrCodeInstance = null;

        function openShareModal() {
            document.getElementById('shareModalOverlay').classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeShareModal() {
            document.getElementById('shareModalOverlay').classList.remove('active');
            document.body.style.overflow = '';
        }

        // Close on overlay click
        document.getElementById('shareModalOverlay')?.addEventListener('click', function(e) {
            if (e.target === this) {
                closeShareModal();
            }
        });

        // Get current card URL
        function getCurrentCardUrl() {
            return window.location.origin + '/c/' + currentShareCardId;
        }

        // Share via SMS
        function shareViaSMS() {
            const text = currentShareCardName + '님의 METI 디지털 명함입니다: ' + getCurrentCardUrl();
            window.location.href = 'sms:?body=' + encodeURIComponent(text);
            closeShareModal();
        }

        // Share via KakaoTalk
        function shareViaKakao() {
            alert('카카오톡 공유 기능은 준비 중입니다.');
            closeShareModal();
        }

        // Share via Copy Link
        async function shareViaCopyLink() {
            try {
                await navigator.clipboard.writeText(getCurrentCardUrl());
                alert('✅ 링크가 복사되었습니다!');
                closeShareModal();
            } catch (error) {
                const textarea = document.createElement('textarea');
                textarea.value = getCurrentCardUrl();
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
                alert('✅ 링크가 복사되었습니다!');
                closeShareModal();
            }
        }

        // Share via QR Code
        function shareViaQR() {
            closeShareModal();
            
            const qrModal = document.getElementById('qrModal');
            const qrCanvas = document.getElementById('qrcodeCanvas');
            
            // Clear previous QR code
            qrCanvas.innerHTML = '';
            
            // Generate new QR code
            qrCodeInstance = new QRCode(qrCanvas, {
                text: getCurrentCardUrl(),
                width: 200,
                height: 200,
                colorDark: '#000000',
                colorLight: '#ffffff',
                correctLevel: QRCode.CorrectLevel.H
            });
            
            qrModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        // Close QR modal
        function closeQRModal() {
            document.getElementById('qrModal').classList.remove('active');
            document.body.style.overflow = '';
        }

        // Share via More (Web Share API)
        async function shareViaMore() {
            if (navigator.share) {
                try {
                    await navigator.share({
                        title: currentShareCardName + ' - METI',
                        text: currentShareCardHeadline || '디지털 명함',
                        url: getCurrentCardUrl()
                    });
                    closeShareModal();
                } catch (error) {
                    if (error.name !== 'AbortError') {
                        console.error('Share failed:', error);
                    }
                }
            } else {
                alert('이 브라우저는 공유 기능을 지원하지 않습니다.');
            }
            closeShareModal();
        }
    </script>

    <!-- Bottom Navigation Bar (Mobile Only) -->
    <div class="bottom-nav">
        <div class="bottom-nav-container">
            <a href="/my/cards" class="bottom-nav-item active">
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
            <a href="/my/profile" class="bottom-nav-item">
                <div class="bottom-nav-icon">
                    <i class="fas fa-user"></i>
                </div>
                <div class="bottom-nav-label">마이</div>
            </a>
        </div>
    </div>
</body>
</html>
  `;
}

export default myCards;
