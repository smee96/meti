import { Hono } from 'hono';
import type { Env } from '../types';

const cardEditor = new Hono<{ Bindings: Env }>();

// Theme definitions
const THEMES = [
  { id: 'deep-navy', name: 'Deep Navy', color: '#0A2260', description: '신뢰감 있는 클래식 네이비' },
  { id: 'midnight-teal', name: 'Midnight Teal', color: '#0D3D4D', description: '세련된 청록색' },
  { id: 'forest-deep', name: 'Forest Deep', color: '#1A3D2E', description: '자연의 깊은 초록' },
  { id: 'royal-burgundy', name: 'Royal Burgundy', color: '#4A1E2E', description: '고급스러운 버건디' },
  { id: 'charcoal-dark', name: 'Charcoal Dark', color: '#1C1C1E', description: '모던한 차콜' },
  { id: 'slate-blue', name: 'Slate Blue', color: '#2C3E50', description: '중후한 슬레이트 블루' },
  { id: 'deep-purple', name: 'Deep Purple', color: '#3D2857', description: '창의적인 딥 퍼플' },
  { id: 'warm-brown', name: 'Warm Brown', color: '#3E2723', description: '따뜻한 브라운' },
  { id: 'olive-night', name: 'Olive Night', color: '#3D4A2C', description: '차분한 올리브' },
  { id: 'sunset-orange', name: 'Sunset Orange', color: '#8B4513', description: '따뜻한 석양' },
];

// Card editor page (new card)
cardEditor.get('/new', (c) => {
  return c.html(getEditorHTML('new', null));
});

// Card editor page (edit existing)
cardEditor.get('/:id/edit', async (c) => {
  const cardId = c.req.param('id');
  return c.html(getEditorHTML('edit', cardId));
});

function getEditorHTML(mode: 'new' | 'edit', cardId: string | null) {
  return `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>${mode === 'new' ? '명함 만들기' : '명함 수정'} - METI</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Tenor+Sans&family=Noto+Sans+KR:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
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

        /* Header */
        .header {
            background: rgba(255, 255, 255, 0.05);
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            padding: 16px 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 12px;
        }

        .logo {
            font-family: 'Tenor Sans', serif;
            font-size: 24px;
            letter-spacing: 6px;
            color: white;
        }

        .header-actions {
            display: flex;
            gap: 8px;
            flex-direction: row;
        }

        .btn {
            padding: 10px 20px;
            border-radius: 10px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
            border: none;
            font-family: 'Noto Sans KR', sans-serif;
            display: flex;
            align-items: center;
            gap: 6px;
            white-space: nowrap;
        }

        .btn-secondary {
            background: rgba(255, 255, 255, 0.1);
            color: white;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .btn-secondary:hover {
            background: rgba(255, 255, 255, 0.2);
        }

        .btn-primary {
            background: white;
            color: #0A2260;
        }

        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 16px rgba(255, 255, 255, 0.3);
        }

        .btn-primary:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }

        .container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 20px;
        }

        /* Mobile-first layout */
        .editor-layout {
            display: flex;
            flex-direction: column;
            gap: 20px;
        }

        .form-section {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            padding: 24px;
        }

        .preview-section {
            position: sticky;
            top: 80px;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            padding: 20px;
            max-height: 500px;
        }

        .section-title {
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .form-group {
            margin-bottom: 20px;
        }

        .form-label {
            display: block;
            font-size: 14px;
            font-weight: 500;
            margin-bottom: 8px;
            opacity: 0.9;
        }

        .form-label .required {
            color: #ff6b6b;
        }

        .form-input, .form-textarea {
            width: 100%;
            padding: 12px 16px;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 10px;
            color: white;
            font-size: 14px;
            font-family: 'Noto Sans KR', sans-serif;
            transition: all 0.3s;
        }

        .form-input:focus, .form-textarea:focus {
            outline: none;
            background: rgba(255, 255, 255, 0.15);
            border-color: rgba(255, 255, 255, 0.4);
        }

        .form-input::placeholder, .form-textarea::placeholder {
            color: rgba(255, 255, 255, 0.5);
        }

        .form-textarea {
            resize: vertical;
            min-height: 80px;
        }

        /* Theme selector */
        .theme-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
            gap: 12px;
            margin-bottom: 20px;
        }

        .theme-item {
            padding: 12px;
            border: 2px solid transparent;
            border-radius: 10px;
            cursor: pointer;
            transition: all 0.3s;
            text-align: center;
            background: rgba(255, 255, 255, 0.05);
        }

        .theme-item:hover {
            background: rgba(255, 255, 255, 0.1);
        }

        .theme-item.active {
            border-color: white;
            background: rgba(255, 255, 255, 0.15);
        }

        .theme-color {
            width: 60px;
            height: 60px;
            border-radius: 8px;
            margin: 0 auto 8px;
        }

        .theme-name {
            font-size: 12px;
            font-weight: 500;
        }

        /* Links section */
        .links-section {
            margin-top: 20px;
        }

        .link-item {
            display: flex;
            gap: 8px;
            margin-bottom: 12px;
            align-items: center;
        }

        .link-item input {
            flex: 1;
        }

        .btn-icon {
            padding: 10px;
            min-width: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .btn-danger {
            background: rgba(255, 107, 107, 0.2);
            color: #ff6b6b;
            border: 1px solid rgba(255, 107, 107, 0.3);
        }

        .btn-danger:hover {
            background: rgba(255, 107, 107, 0.3);
        }

        .btn-add {
            background: rgba(255, 255, 255, 0.1);
            color: white;
            border: 1px dashed rgba(255, 255, 255, 0.3);
        }

        .btn-add:hover {
            background: rgba(255, 255, 255, 0.15);
            border-color: rgba(255, 255, 255, 0.5);
        }

        /* Preview card */
        .preview-card {
            background: #0A2260;
            border-radius: 16px;
            padding: 24px;
            color: white;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            max-width: 400px;
            margin: 0 auto;
        }

        .preview-header {
            display: flex;
            gap: 16px;
            margin-bottom: 20px;
        }

        .preview-avatar {
            width: 64px;
            height: 64px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.2);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
        }

        .preview-info {
            flex: 1;
        }

        .preview-name {
            font-size: 20px;
            font-weight: 700;
            margin-bottom: 4px;
        }

        .preview-title {
            font-size: 14px;
            opacity: 0.8;
            margin-bottom: 2px;
        }

        .preview-company {
            font-size: 13px;
            opacity: 0.7;
        }

        .preview-contacts {
            margin-bottom: 20px;
        }

        .preview-contact-item {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 8px;
            font-size: 13px;
            opacity: 0.9;
        }

        .preview-links {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
        }

        .preview-link {
            padding: 8px 16px;
            background: rgba(255, 255, 255, 0.15);
            border-radius: 20px;
            font-size: 12px;
            display: flex;
            align-items: center;
            gap: 6px;
        }

        .save-footer {
            position: sticky;
            bottom: 0;
            background: rgba(10, 34, 96, 0.95);
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            padding: 16px 20px;
            display: flex;
            justify-content: center;
            backdrop-filter: blur(10px);
        }

        .save-footer .btn-primary {
            min-width: 200px;
            justify-content: center;
            font-size: 16px;
            padding: 14px 32px;
        }

        .loading-spinner {
            display: inline-block;
            width: 16px;
            height: 16px;
            border: 2px solid rgba(10, 34, 96, 0.3);
            border-top-color: #0A2260;
            border-radius: 50%;
            animation: spin 0.6s linear infinite;
        }

        @keyframes spin {
            to { transform: rotate(360deg); }
        }

        /* Desktop layout */
        @media (min-width: 1024px) {
            .editor-layout {
                flex-direction: row;
                gap: 40px;
            }

            .form-section {
                flex: 1;
            }

            .preview-section {
                width: 450px;
                flex-shrink: 0;
            }

            .theme-grid {
                grid-template-columns: repeat(5, 1fr);
            }

            .save-footer {
                padding: 0;
                background: transparent;
                border: none;
                position: static;
                margin-top: 20px;
            }

            .save-footer .btn-primary {
                width: 100%;
            }

            .header-actions {
                display: flex;
            }
        }

        /* Tablet */
        @media (min-width: 768px) and (max-width: 1023px) {
            .theme-grid {
                grid-template-columns: repeat(4, 1fr);
            }

            .preview-card {
                max-width: 100%;
            }
        }

        /* Mobile */
        @media (max-width: 767px) {
            .header {
                padding: 12px 16px;
                flex-wrap: nowrap;
            }

            .logo {
                font-size: 18px;
                letter-spacing: 3px;
            }

            .header-actions {
                display: flex;
                flex-direction: row;
                gap: 6px;
            }

            .header-actions .btn {
                font-size: 12px;
                padding: 8px 12px;
            }

            .header-actions .btn span {
                display: none;
            }

            .header-actions .btn i {
                margin: 0;
            }

            .container {
                padding: 16px;
            }

            .form-section, .preview-section {
                padding: 20px 16px;
            }

            .section-title {
                font-size: 16px;
            }

            .theme-grid {
                grid-template-columns: repeat(3, 1fr);
                gap: 8px;
            }

            .theme-color {
                width: 50px;
                height: 50px;
            }

            .theme-name {
                font-size: 11px;
            }

            .preview-section {
                position: relative;
                top: 0;
                max-height: none;
                padding: 12px;
            }

            .preview-card {
                padding: 16px;
                max-width: 100%;
                transform: scale(0.85);
                transform-origin: top center;
                margin: -10px auto 0;
            }

            .preview-avatar {
                width: 48px;
                height: 48px;
                font-size: 18px;
            }

            .preview-name {
                font-size: 16px;
            }

            .preview-title {
                font-size: 13px;
            }

            .preview-company {
                font-size: 12px;
            }

            .preview-contact-item {
                font-size: 12px;
            }

            .preview-link {
                font-size: 11px;
                padding: 6px 12px;
            }

            .btn {
                font-size: 13px;
                padding: 8px 16px;
            }

            .form-input, .form-textarea {
                font-size: 16px; /* Prevent zoom on iOS */
            }
        }
    </style>
</head>
<body>
    <!-- Header -->
    <div class="header">
        <div class="logo">METI</div>
        <div class="header-actions">
            <button class="btn btn-secondary" onclick="goBack()">
                <i class="fas fa-arrow-left"></i>
                <span>취소</span>
            </button>
            <button class="btn btn-primary" id="saveBtn" onclick="saveCard()">
                <i class="fas fa-save"></i>
                <span id="saveBtnText">${mode === 'new' ? '명함 만들기' : '저장'}</span>
            </button>
        </div>
    </div>

    <div class="container">
        <div class="editor-layout">
            <!-- Form Section -->
            <div class="form-section">
                <div class="section-title">
                    <i class="fas fa-edit"></i>
                    명함 정보 입력
                </div>

                <!-- 기본 정보 (우선순위 높음) -->
                <div class="form-group">
                    <label class="form-label">
                        이름 <span class="required">*</span>
                    </label>
                    <input type="text" class="form-input" id="name" placeholder="홍길동" oninput="updatePreview()">
                </div>

                <div class="form-group">
                    <label class="form-label">전화번호</label>
                    <input type="tel" class="form-input" id="phone" placeholder="010-1234-5678" oninput="updatePreview()">
                </div>

                <div class="form-group">
                    <label class="form-label">이메일</label>
                    <input type="email" class="form-input" id="email" placeholder="hello@example.com" oninput="updatePreview()">
                </div>

                <!-- 부가 정보 (선택) -->
                <div class="form-group">
                    <label class="form-label">직책</label>
                    <input type="text" class="form-input" id="title" placeholder="예: 대표이사, 프리랜서 디자이너" oninput="updatePreview()">
                </div>

                <div class="form-group">
                    <label class="form-label">회사명</label>
                    <input type="text" class="form-input" id="company" placeholder="회사명 (선택)" oninput="updatePreview()">
                </div>

                <div class="form-group">
                    <label class="form-label">한 줄 소개</label>
                    <textarea class="form-textarea" id="headline" placeholder="자신을 표현하는 한 줄 소개" oninput="updatePreview()"></textarea>
                </div>

                <!-- Links Section -->
                <div class="links-section">
                    <label class="form-label">
                        소셜 링크
                        <span style="opacity: 0.7; font-weight: 400; font-size: 12px;">(최대 5개)</span>
                    </label>
                    <div id="linksContainer">
                        <!-- Links will be added here -->
                    </div>
                    <button class="btn btn-add" onclick="addLink()" id="addLinkBtn" style="width: 100%; margin-top: 8px;">
                        <i class="fas fa-plus"></i>
                        링크 추가
                    </button>
                </div>

                <!-- Theme Selection -->
                <div style="margin-top: 32px;">
                    <label class="form-label">
                        <i class="fas fa-palette"></i>
                        테마 선택
                    </label>
                    <div class="theme-grid" id="themeGrid">
                        ${THEMES.map(theme => `
                            <div class="theme-item ${theme.id === 'deep-navy' ? 'active' : ''}" 
                                 data-theme="${theme.id}" 
                                 onclick="selectTheme('${theme.id}')">
                                <div class="theme-color" style="background: ${theme.color};"></div>
                                <div class="theme-name">${theme.name}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>

            <!-- Preview Section -->
            <div class="preview-section">
                <div class="section-title">
                    <i class="fas fa-eye"></i>
                    실시간 미리보기
                </div>

                <div class="preview-card" id="previewCard">
                    <div class="preview-header">
                        <div class="preview-avatar">
                            <i class="fas fa-user"></i>
                        </div>
                        <div class="preview-info">
                            <div class="preview-name" id="previewName">이름을 입력하세요</div>
                            <div class="preview-title" id="previewTitle"></div>
                            <div class="preview-company" id="previewCompany"></div>
                        </div>
                    </div>

                    <div class="preview-contacts" id="previewContacts">
                        <!-- Contacts will be shown here -->
                    </div>

                    <div class="preview-links" id="previewLinks">
                        <!-- Links will be shown here -->
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Save Footer (Mobile) -->
    <div class="save-footer">
        <button class="btn btn-primary" id="saveFooterBtn" onclick="saveCard()">
            <i class="fas fa-save"></i>
            <span id="saveFooterBtnText">${mode === 'new' ? '명함 만들기' : '저장'}</span>
        </button>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
    <script>
        const MODE = '${mode}';
        const CARD_ID = ${cardId ? `'${cardId}'` : 'null'};
        const MAX_LINKS = 5;
        let currentTheme = 'deep-navy';
        let links = [];

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
            // Check auth
            const token = localStorage.getItem('meti_token') || sessionStorage.getItem('meti_token');
            if (!token) {
                alert('로그인이 필요합니다.');
                window.location.href = '/auth/login';
                return;
            }

            // Load card data if editing
            if (MODE === 'edit' && CARD_ID) {
                await loadCardData();
            }

            updatePreview();
        });

        // Load card data for editing
        async function loadCardData() {
            try {
                const token = localStorage.getItem('meti_token') || sessionStorage.getItem('meti_token');
                const response = await axios.get(\`/api/cards/\${CARD_ID}\`, {
                    headers: { 'Authorization': \`Bearer \${token}\` }
                });

                if (response.data.success) {
                    const card = response.data.data;
                    
                    // Fill form
                    document.getElementById('name').value = card.name || '';
                    document.getElementById('phone').value = card.phone || '';
                    document.getElementById('email').value = card.email || '';
                    document.getElementById('title').value = card.title || '';
                    document.getElementById('company').value = card.company || '';
                    document.getElementById('headline').value = card.headline || '';
                    
                    // Load theme
                    if (card.theme) {
                        selectTheme(card.theme);
                    }
                    
                    // Load links
                    if (card.links) {
                        try {
                            links = typeof card.links === 'string' ? JSON.parse(card.links) : card.links;
                            links.forEach(link => {
                                addLink(link.label, link.url);
                            });
                        } catch (e) {
                            console.error('Failed to parse links:', e);
                        }
                    }
                    
                    updatePreview();
                }
            } catch (error) {
                console.error('Failed to load card:', error);
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    alert('로그인이 만료되었습니다.');
                    window.location.href = '/auth/login';
                } else {
                    alert('명함을 불러오는데 실패했습니다.');
                }
            }
        }

        // Select theme
        function selectTheme(themeId) {
            currentTheme = themeId;
            
            // Update active state
            document.querySelectorAll('.theme-item').forEach(item => {
                item.classList.remove('active');
            });
            document.querySelector(\`[data-theme="\${themeId}"]\`).classList.add('active');
            
            // Update preview card color
            const color = THEME_COLORS[themeId];
            document.getElementById('previewCard').style.background = color;
        }

        // Add link
        function addLink(label = '', url = '') {
            if (links.length >= MAX_LINKS) {
                alert(\`최대 \${MAX_LINKS}개까지 링크를 추가할 수 있습니다.\`);
                return;
            }

            const linkId = Date.now();
            links.push({ id: linkId, label, url });

            const container = document.getElementById('linksContainer');
            const linkDiv = document.createElement('div');
            linkDiv.className = 'link-item';
            linkDiv.dataset.linkId = linkId;
            linkDiv.innerHTML = \`
                <input type="text" class="form-input" placeholder="레이블 (예: Instagram)" 
                       value="\${label}" oninput="updateLinkLabel(\${linkId}, this.value)">
                <input type="url" class="form-input" placeholder="URL" 
                       value="\${url}" oninput="updateLinkUrl(\${linkId}, this.value)">
                <button class="btn btn-icon btn-danger" onclick="removeLink(\${linkId})">
                    <i class="fas fa-trash"></i>
                </button>
            \`;
            container.appendChild(linkDiv);

            // Update add button state
            if (links.length >= MAX_LINKS) {
                document.getElementById('addLinkBtn').disabled = true;
                document.getElementById('addLinkBtn').style.opacity = '0.5';
            }

            updatePreview();
        }

        // Update link label
        function updateLinkLabel(linkId, label) {
            const link = links.find(l => l.id === linkId);
            if (link) {
                link.label = label;
                updatePreview();
            }
        }

        // Update link URL
        function updateLinkUrl(linkId, url) {
            const link = links.find(l => l.id === linkId);
            if (link) {
                link.url = url;
                updatePreview();
            }
        }

        // Remove link
        function removeLink(linkId) {
            links = links.filter(l => l.id !== linkId);
            document.querySelector(\`[data-link-id="\${linkId}"]\`).remove();
            
            // Update add button state
            document.getElementById('addLinkBtn').disabled = false;
            document.getElementById('addLinkBtn').style.opacity = '1';
            
            updatePreview();
        }

        // Update preview
        function updatePreview() {
            const name = document.getElementById('name').value || '이름을 입력하세요';
            const title = document.getElementById('title').value;
            const company = document.getElementById('company').value;
            const phone = document.getElementById('phone').value;
            const email = document.getElementById('email').value;

            // Update name
            document.getElementById('previewName').textContent = name;

            // Update title
            const titleEl = document.getElementById('previewTitle');
            if (title) {
                titleEl.textContent = title;
                titleEl.style.display = 'block';
            } else {
                titleEl.style.display = 'none';
            }

            // Update company
            const companyEl = document.getElementById('previewCompany');
            if (company) {
                companyEl.textContent = company;
                companyEl.style.display = 'block';
            } else {
                companyEl.style.display = 'none';
            }

            // Update contacts
            const contactsHtml = [];
            if (phone) {
                contactsHtml.push(\`
                    <div class="preview-contact-item">
                        <i class="fas fa-phone"></i>
                        <span>\${phone}</span>
                    </div>
                \`);
            }
            if (email) {
                contactsHtml.push(\`
                    <div class="preview-contact-item">
                        <i class="fas fa-envelope"></i>
                        <span>\${email}</span>
                    </div>
                \`);
            }
            document.getElementById('previewContacts').innerHTML = contactsHtml.join('');

            // Update links
            const linksHtml = links
                .filter(link => link.label && link.url)
                .map(link => \`
                    <div class="preview-link">
                        <i class="fas fa-link"></i>
                        <span>\${link.label}</span>
                    </div>
                \`).join('');
            document.getElementById('previewLinks').innerHTML = linksHtml;
        }

        // Save card
        async function saveCard() {
            const name = document.getElementById('name').value.trim();
            
            if (!name) {
                alert('이름을 입력해주세요.');
                document.getElementById('name').focus();
                return;
            }

            // Prepare data
            const cardData = {
                name: name,
                phone: document.getElementById('phone').value.trim() || null,
                email: document.getElementById('email').value.trim() || null,
                title: document.getElementById('title').value.trim() || null,
                company: document.getElementById('company').value.trim() || null,
                headline: document.getElementById('headline').value.trim() || null,
                theme: currentTheme,
                links: links.filter(link => link.label && link.url).map(link => ({
                    label: link.label,
                    url: link.url
                })),
                status: 'public'
            };

            // Disable buttons
            const saveBtn = document.getElementById('saveBtn');
            const saveFooterBtn = document.getElementById('saveFooterBtn');
            const saveBtnText = document.getElementById('saveBtnText');
            const saveFooterBtnText = document.getElementById('saveFooterBtnText');
            
            saveBtn.disabled = true;
            saveFooterBtn.disabled = true;
            saveBtnText.innerHTML = '<span class="loading-spinner"></span> 저장 중...';
            saveFooterBtnText.innerHTML = '<span class="loading-spinner"></span> 저장 중...';

            try {
                const token = localStorage.getItem('meti_token') || sessionStorage.getItem('meti_token');
                
                let response;
                if (MODE === 'edit' && CARD_ID) {
                    response = await axios.put(\`/api/cards/\${CARD_ID}\`, cardData, {
                        headers: { 'Authorization': \`Bearer \${token}\` }
                    });
                } else {
                    response = await axios.post('/api/cards', cardData, {
                        headers: { 'Authorization': \`Bearer \${token}\` }
                    });
                }

                if (response.data.success) {
                    alert(MODE === 'new' ? '명함이 생성되었습니다!' : '명함이 수정되었습니다!');
                    window.location.href = '/my/cards';
                } else {
                    throw new Error(response.data.error || 'Failed to save card');
                }
            } catch (error) {
                console.error('Save error:', error);
                
                if (error.response && error.response.data) {
                    alert(error.response.data.error || '저장에 실패했습니다.');
                } else {
                    alert('저장에 실패했습니다. 다시 시도해주세요.');
                }
                
                saveBtn.disabled = false;
                saveFooterBtn.disabled = false;
                saveBtnText.textContent = MODE === 'new' ? '명함 만들기' : '저장';
                saveFooterBtnText.textContent = MODE === 'new' ? '명함 만들기' : '저장';
            }
        }

        // Go back
        function goBack() {
            if (confirm('작성 중인 내용이 저장되지 않습니다. 나가시겠습니까?')) {
                window.location.href = '/my/cards';
            }
        }
    </script>
</body>
</html>
  `;
}

export default cardEditor;
