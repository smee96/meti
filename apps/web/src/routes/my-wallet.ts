import { Hono } from 'hono';
import type { Env } from '../types';

const myWallet = new Hono<{ Bindings: Env }>();

// My wallet page
myWallet.get('/', (c) => {
  return c.html(getMyWalletHTML());
});

function getMyWalletHTML() {
  return `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>명함 지갑 - METI</title>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <style>
        /* Local Font - Tenor Sans */
        @font-face {
            font-family: 'Tenor Sans';
            src: url('/static/fonts/TenorSans-Regular.woff2') format('woff2');
            font-weight: normal;
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
            font-family: 'Tenor Sans', serif;
            font-size: 28px;
            letter-spacing: 8px;
            color: white;
            cursor: pointer;
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
            max-width: 1200px;
            margin: 0 auto;
            padding: 40px 20px;
        }

        .page-header {
            margin-bottom: 32px;
        }

        .page-title {
            font-size: 32px;
            font-weight: 700;
            margin-bottom: 8px;
        }

        .page-subtitle {
            font-size: 16px;
            opacity: 0.8;
            display: flex;
            align-items: center;
            gap: 16px;
        }

        .search-box {
            display: flex;
            align-items: center;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            padding: 12px 16px;
            gap: 12px;
            margin-bottom: 24px;
        }

        .search-box i {
            color: rgba(255, 255, 255, 0.5);
        }

        .search-box input {
            flex: 1;
            background: none;
            border: none;
            color: white;
            font-size: 15px;
            outline: none;
        }

        .search-box input::placeholder {
            color: rgba(255, 255, 255, 0.5);
        }

        .filter-tabs {
            display: flex;
            gap: 12px;
            margin-bottom: 24px;
            flex-wrap: wrap;
        }

        .filter-tab {
            padding: 10px 20px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            border: none;
            color: rgba(255, 255, 255, 0.7);
            cursor: pointer;
            transition: all 0.3s;
            font-size: 14px;
        }

        .filter-tab.active {
            background: #ffc107;
            color: #0A2260;
            font-weight: 600;
        }

        .filter-tab:hover:not(.active) {
            background: rgba(255, 255, 255, 0.15);
            color: white;
        }

        .cards-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
            gap: 24px;
        }

        .wallet-card {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 16px;
            padding: 24px;
            transition: all 0.3s;
            border: 1px solid rgba(255, 255, 255, 0.1);
            position: relative;
        }

        .wallet-card:hover {
            background: rgba(255, 255, 255, 0.15);
            transform: translateY(-4px);
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
        }

        .favorite-btn {
            position: absolute;
            top: 16px;
            right: 16px;
            background: none;
            border: none;
            color: rgba(255, 255, 255, 0.5);
            font-size: 20px;
            cursor: pointer;
            transition: all 0.3s;
        }

        .favorite-btn.active {
            color: #ffc107;
        }

        .favorite-btn:hover {
            transform: scale(1.2);
        }

        .card-header {
            display: flex;
            align-items: flex-start;
            gap: 16px;
            margin-bottom: 16px;
        }

        .card-avatar {
            width: 64px;
            height: 64px;
            border-radius: 12px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 28px;
            font-weight: 700;
            color: white;
            flex-shrink: 0;
        }

        .card-info {
            flex: 1;
        }

        .card-name {
            font-size: 20px;
            font-weight: 600;
            margin-bottom: 4px;
        }

        .card-title {
            font-size: 14px;
            opacity: 0.7;
            margin-bottom: 2px;
        }

        .card-company {
            font-size: 13px;
            opacity: 0.6;
        }

        .card-memo {
            background: rgba(0, 0, 0, 0.2);
            padding: 12px;
            border-radius: 8px;
            font-size: 13px;
            margin-bottom: 12px;
            line-height: 1.5;
        }

        .card-tags {
            display: flex;
            gap: 8px;
            flex-wrap: wrap;
            margin-bottom: 16px;
        }

        .tag {
            padding: 4px 12px;
            background: rgba(255, 193, 7, 0.2);
            border-radius: 12px;
            font-size: 12px;
            color: #ffc107;
        }

        .card-actions {
            display: flex;
            gap: 8px;
        }

        .card-btn {
            flex: 1;
            padding: 10px;
            border-radius: 8px;
            border: none;
            cursor: pointer;
            font-size: 14px;
            transition: all 0.3s;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
        }

        .card-btn.primary {
            background: #ffc107;
            color: #0A2260;
            font-weight: 600;
        }

        .card-btn.primary:hover {
            background: #ffcd38;
        }

        .card-btn.secondary {
            background: rgba(255, 255, 255, 0.1);
            color: white;
        }

        .card-btn.secondary:hover {
            background: rgba(255, 255, 255, 0.2);
        }

        .card-btn.danger {
            background: rgba(244, 67, 54, 0.2);
            color: #ff5252;
        }

        .card-btn.danger:hover {
            background: rgba(244, 67, 54, 0.3);
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

            .page-title {
                font-size: 24px;
            }

            .cards-grid {
                grid-template-columns: 1fr;
                gap: 16px;
            }

            .user-avatar {
                width: 28px;
                height: 28px;
            }

            .user-name {
                font-size: 13px;
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
                <a href="/my/wallet" class="nav-link active">명함 지갑</a>
                <a href="/game" class="nav-link">HappyTree</a>
            </nav>
        </div>
    </div>

    <div class="container">
        <!-- Page Header -->
        <div class="page-header">
            <h1 class="page-title">명함 지갑</h1>
            <div class="page-subtitle">
                <span id="cardCountText">저장된 명함을 불러오는 중...</span>
            </div>
        </div>

        <!-- Search Box -->
        <div class="search-box">
            <i class="fas fa-search"></i>
            <input type="text" placeholder="이름, 회사, 메모로 검색..." id="searchInput" oninput="filterCards()">
        </div>

        <!-- Filter Tabs -->
        <div class="filter-tabs">
            <button class="filter-tab active" data-filter="all" onclick="filterByTab('all')">
                전체 <span id="allCount">0</span>
            </button>
            <button class="filter-tab" data-filter="favorite" onclick="filterByTab('favorite')">
                <i class="fas fa-star"></i> 즐겨찾기 <span id="favoriteCount">0</span>
            </button>
        </div>

        <!-- Loading State -->
        <div class="loading" id="loadingState">
            <div class="loading-spinner"></div>
        </div>

        <!-- Empty State -->
        <div class="empty-state hidden" id="emptyState">
            <div class="empty-icon">
                <i class="fas fa-wallet"></i>
            </div>
            <div class="empty-title">저장된 명함이 없습니다</div>
            <div class="empty-desc">
                명함을 받으면 여기에 저장됩니다.<br>
                다른 사람의 명함 페이지에서 "명함 저장" 버튼을 눌러보세요!
            </div>
        </div>

        <!-- Cards Grid -->
        <div class="cards-grid hidden" id="cardsGrid">
            <!-- Cards will be inserted here -->
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
            <a href="/my/wallet" class="bottom-nav-item active">
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

    <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
    <script>
        let allCards = [];
        let currentFilter = 'all';

        // Initialize
        document.addEventListener('DOMContentLoaded', async () => {
            await loadSavedCards();
        });

        // Check authentication
        function checkAuth() {
            const token = localStorage.getItem('meti_token') || sessionStorage.getItem('meti_token');
            if (!token) {
                alert('로그인이 필요합니다.');
                window.location.href = '/auth/login';
                return null;
            }
            return token;
        }

        // Load saved cards from wallet
        async function loadSavedCards() {
            const token = checkAuth();
            if (!token) return;

            try {
                const response = await axios.get('/api/wallet', {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                });

                if (response.data.success) {
                    allCards = response.data.data.savedCards || [];
                    updateUI();
                } else {
                    throw new Error(response.data.error || 'Failed to load cards');
                }
            } catch (error) {
                console.error('Load cards error:', error);
                document.getElementById('loadingState').classList.add('hidden');
                document.getElementById('emptyState').classList.remove('hidden');
            }
        }

        // Update UI
        function updateUI() {
            const totalCount = allCards.length;
            const favoriteCount = allCards.filter(c => c.isFavorite).length;

            document.getElementById('cardCountText').textContent = 
                totalCount === 0 ? '저장된 명함이 없습니다' : '총 ' + totalCount + '개의 명함';
            document.getElementById('allCount').textContent = totalCount;
            document.getElementById('favoriteCount').textContent = favoriteCount;

            document.getElementById('loadingState').classList.add('hidden');

            if (totalCount === 0) {
                document.getElementById('emptyState').classList.remove('hidden');
                document.getElementById('cardsGrid').classList.add('hidden');
            } else {
                document.getElementById('emptyState').classList.add('hidden');
                document.getElementById('cardsGrid').classList.remove('hidden');
                renderCards(allCards);
            }
        }

        // Render cards
        function renderCards(cards) {
            const grid = document.getElementById('cardsGrid');
            
            if (cards.length === 0) {
                grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 40px; opacity: 0.6;">검색 결과가 없습니다.</div>';
                return;
            }

            grid.innerHTML = cards.map(item => {
                const card = item.card;
                const initial = card.name ? card.name.charAt(0) : '?';
                const savedDate = new Date(item.savedAt).toLocaleDateString('ko-KR');

                return \`
                    <div class="wallet-card">
                        <button class="favorite-btn \${item.isFavorite ? 'active' : ''}" onclick="toggleFavorite('\${item.id}', \${item.isFavorite})">
                            <i class="fas fa-star"></i>
                        </button>

                        <div class="card-header">
                            <div class="card-avatar">\${initial}</div>
                            <div class="card-info">
                                <div class="card-name">\${card.name || '이름 없음'}</div>
                                \${card.title ? \`<div class="card-title">\${card.title}</div>\` : ''}
                                \${card.company ? \`<div class="card-company">\${card.company}</div>\` : ''}
                            </div>
                        </div>

                        \${item.memo ? \`<div class="card-memo">\${item.memo}</div>\` : ''}

                        \${item.tags.length > 0 ? \`
                            <div class="card-tags">
                                \${item.tags.map(tag => \`<span class="tag">\${tag}</span>\`).join('')}
                            </div>
                        \` : ''}

                        <div style="font-size: 12px; opacity: 0.5; margin-bottom: 16px;">
                            <i class="far fa-calendar"></i> \${savedDate}
                        </div>

                        <div class="card-actions">
                            <button class="card-btn primary" onclick="viewCard('\${item.cardId}')">
                                <i class="fas fa-eye"></i>
                                보기
                            </button>
                            <button class="card-btn secondary" onclick="editMemo('\${item.id}', '\${(item.memo || '').replace(/'/g, "\\\\'")}')">
                                <i class="fas fa-edit"></i>
                                메모
                            </button>
                            <button class="card-btn danger" onclick="removeCard('\${item.id}')">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                \`;
            }).join('');
        }

        // Filter by tab
        function filterByTab(filter) {
            currentFilter = filter;
            
            // Update active tab
            document.querySelectorAll('.filter-tab').forEach(tab => {
                tab.classList.remove('active');
            });
            event.target.closest('.filter-tab').classList.add('active');

            // Filter cards
            filterCards();
        }

        // Filter cards
        function filterCards() {
            const searchTerm = document.getElementById('searchInput').value.toLowerCase();
            
            let filtered = allCards;

            // Filter by tab
            if (currentFilter === 'favorite') {
                filtered = filtered.filter(item => item.isFavorite);
            }

            // Filter by search
            if (searchTerm) {
                filtered = filtered.filter(item => {
                    const card = item.card;
                    return (
                        (card.name && card.name.toLowerCase().includes(searchTerm)) ||
                        (card.company && card.company.toLowerCase().includes(searchTerm)) ||
                        (item.memo && item.memo.toLowerCase().includes(searchTerm))
                    );
                });
            }

            renderCards(filtered);
        }

        // Toggle favorite
        async function toggleFavorite(walletItemId, currentState) {
            const token = checkAuth();
            if (!token) return;

            try {
                await axios.put('/api/wallet/' + walletItemId, 
                    { isFavorite: !currentState },
                    {
                        headers: {
                            'Authorization': 'Bearer ' + token
                        }
                    }
                );

                // Update local state
                const item = allCards.find(c => c.id === walletItemId);
                if (item) {
                    item.isFavorite = !currentState;
                    updateUI();
                }
            } catch (error) {
                console.error('Toggle favorite error:', error);
                alert('즐겨찾기 변경에 실패했습니다.');
            }
        }

        // View card
        function viewCard(cardId) {
            window.location.href = '/c/' + cardId;
        }

        // Edit memo
        function editMemo(walletItemId, currentMemo) {
            const newMemo = prompt('메모를 입력하세요:', currentMemo);
            if (newMemo === null) return; // Cancelled

            updateMemo(walletItemId, newMemo);
        }

        // Update memo
        async function updateMemo(walletItemId, memo) {
            const token = checkAuth();
            if (!token) return;

            try {
                await axios.put('/api/wallet/' + walletItemId, 
                    { memo },
                    {
                        headers: {
                            'Authorization': 'Bearer ' + token
                        }
                    }
                );

                // Update local state
                const item = allCards.find(c => c.id === walletItemId);
                if (item) {
                    item.memo = memo;
                    updateUI();
                }

                alert('메모가 저장되었습니다.');
            } catch (error) {
                console.error('Update memo error:', error);
                alert('메모 저장에 실패했습니다.');
            }
        }

        // Remove card from wallet
        async function removeCard(walletItemId) {
            if (!confirm('이 명함을 지갑에서 제거하시겠습니까?')) return;

            const token = checkAuth();
            if (!token) return;

            try {
                await axios.delete('/api/wallet/' + walletItemId, {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                });

                // Remove from local state
                allCards = allCards.filter(c => c.id !== walletItemId);
                updateUI();

                alert('명함이 제거되었습니다.');
            } catch (error) {
                console.error('Remove card error:', error);
                alert('명함 제거에 실패했습니다.');
            }
        }
    </script>
</body>
</html>
  `;
}

export default myWallet;
