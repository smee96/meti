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
  // TODO: Fetch card data from DB
  return c.html(getEditorHTML('edit', cardId));
});

function getEditorHTML(mode: 'new' | 'edit', cardId: string | null) {
  return `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
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

        .header {
            background: rgba(255, 255, 255, 0.05);
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            padding: 20px 40px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .logo {
            font-family: 'Tenor Sans', serif;
            font-size: 28px;
            letter-spacing: 8px;
            color: white;
        }

        .container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 40px 20px;
        }

        .editor-layout {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 40px;
            margin-bottom: 40px;
        }

        .form-section, .preview-section {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            padding: 30px;
        }

        .section-title {
            font-size: 20px;
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

        .form-input {
            width: 100%;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 10px;
            padding: 12px 16px;
            color: white;
            font-size: 14px;
            font-family: 'Noto Sans KR', sans-serif;
            transition: all 0.3s;
        }

        .form-input:focus {
            outline: none;
            background: rgba(255, 255, 255, 0.15);
            border-color: rgba(255, 255, 255, 0.4);
        }

        .form-input::placeholder {
            color: rgba(255, 255, 255, 0.5);
        }

        textarea.form-input {
            min-height: 100px;
            resize: vertical;
        }

        .image-upload {
            display: flex;
            align-items: center;
            gap: 20px;
        }

        .image-preview {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.1);
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
        }

        .image-preview img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .image-preview i {
            font-size: 32px;
            opacity: 0.5;
        }

        .upload-btn {
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 10px;
            padding: 10px 20px;
            color: white;
            cursor: pointer;
            transition: all 0.3s;
            font-size: 14px;
        }

        .upload-btn:hover {
            background: rgba(255, 255, 255, 0.2);
        }

        .toggle-group {
            display: flex;
            gap: 20px;
        }

        .toggle-item {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .toggle-switch {
            position: relative;
            width: 48px;
            height: 24px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 12px;
            cursor: pointer;
            transition: all 0.3s;
        }

        .toggle-switch.active {
            background: #4F8EF7;
        }

        .toggle-switch::after {
            content: '';
            position: absolute;
            width: 20px;
            height: 20px;
            background: white;
            border-radius: 50%;
            top: 2px;
            left: 2px;
            transition: all 0.3s;
        }

        .toggle-switch.active::after {
            left: 26px;
        }

        .links-list {
            display: flex;
            flex-direction: column;
            gap: 12px;
        }

        .link-item {
            display: flex;
            gap: 10px;
        }

        .link-item input {
            flex: 1;
        }

        .link-remove {
            background: rgba(255, 0, 0, 0.2);
            border: 1px solid rgba(255, 0, 0, 0.3);
            border-radius: 8px;
            padding: 0 12px;
            color: #ff6b6b;
            cursor: pointer;
            transition: all 0.3s;
        }

        .link-remove:hover {
            background: rgba(255, 0, 0, 0.3);
        }

        .add-link-btn {
            background: rgba(255, 255, 255, 0.1);
            border: 1px dashed rgba(255, 255, 255, 0.3);
            border-radius: 10px;
            padding: 12px;
            color: white;
            cursor: pointer;
            text-align: center;
            transition: all 0.3s;
            font-size: 14px;
        }

        .add-link-btn:hover {
            background: rgba(255, 255, 255, 0.15);
            border-color: rgba(255, 255, 255, 0.5);
        }

        /* Preview Card Styles */
        .preview-card {
            background: rgba(255, 255, 255, 0.95);
            border-radius: 20px;
            padding: 40px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            color: #333;
            position: sticky;
            top: 20px;
        }

        .preview-header {
            text-align: center;
            margin-bottom: 30px;
        }

        .preview-avatar {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            background: #f0f0f0;
            margin: 0 auto 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
        }

        .preview-avatar img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .preview-avatar i {
            font-size: 48px;
            color: #ccc;
        }

        .preview-name {
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 8px;
        }

        .preview-title {
            font-size: 16px;
            opacity: 0.7;
            margin-bottom: 4px;
        }

        .preview-company {
            font-size: 14px;
            opacity: 0.6;
        }

        .preview-bio {
            font-size: 14px;
            line-height: 1.6;
            opacity: 0.8;
            margin-top: 20px;
            padding-top: 20px;
            border-top: 1px solid rgba(0, 0, 0, 0.1);
        }

        .preview-contact {
            margin-top: 30px;
        }

        .contact-item {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 12px;
            background: rgba(0, 0, 0, 0.03);
            border-radius: 10px;
            margin-bottom: 8px;
            font-size: 14px;
        }

        .contact-item i {
            width: 20px;
            text-align: center;
            opacity: 0.6;
        }

        .preview-links {
            margin-top: 20px;
            display: flex;
            flex-direction: column;
            gap: 8px;
        }

        .preview-link {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            padding: 12px;
            background: rgba(0, 0, 0, 0.05);
            border-radius: 10px;
            text-decoration: none;
            color: inherit;
            font-size: 14px;
            transition: all 0.3s;
        }

        .preview-link:hover {
            background: rgba(0, 0, 0, 0.1);
        }

        /* Theme Selector */
        .theme-selector {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            padding: 30px;
        }

        .theme-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
            gap: 16px;
        }

        .theme-item {
            cursor: pointer;
            border-radius: 12px;
            padding: 16px;
            text-align: center;
            transition: all 0.3s;
            border: 2px solid transparent;
        }

        .theme-item:hover {
            transform: translateY(-4px);
        }

        .theme-item.active {
            border-color: white;
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
        }

        .theme-color {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            margin: 0 auto 10px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .theme-name {
            font-size: 13px;
            font-weight: 500;
            margin-bottom: 4px;
        }

        .theme-desc {
            font-size: 11px;
            opacity: 0.7;
        }

        /* Action Buttons */
        .action-buttons {
            display: flex;
            gap: 16px;
        }

        .btn {
            padding: 12px 32px;
            border-radius: 10px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
            border: none;
            font-family: 'Noto Sans KR', sans-serif;
        }

        .btn-primary {
            background: white;
            color: #0A2260;
        }

        .btn-primary:hover {
            background: #f0f0f0;
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(255, 255, 255, 0.2);
        }

        .btn-secondary {
            background: rgba(255, 255, 255, 0.1);
            color: white;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .btn-secondary:hover {
            background: rgba(255, 255, 255, 0.2);
        }

        /* Responsive */
        @media (max-width: 968px) {
            .editor-layout {
                grid-template-columns: 1fr;
            }

            .preview-section {
                order: -1;
            }

            .preview-card {
                position: static;
            }
        }

        /* Loading State */
        .loading {
            text-align: center;
            padding: 40px;
            opacity: 0.7;
        }

        .hidden {
            display: none;
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="logo">METI</div>
        <div class="action-buttons">
            <button class="btn btn-secondary" onclick="goBack()">
                <i class="fas fa-arrow-left"></i> 취소
            </button>
            <button class="btn btn-primary" onclick="saveCard()">
                <i class="fas fa-save"></i> ${mode === 'new' ? '명함 만들기' : '저장'}
            </button>
        </div>
    </div>

    <div class="container">
        <div class="editor-layout">
            <!-- Left: Form -->
            <div class="form-section">
                <div class="section-title">
                    <i class="fas fa-edit"></i>
                    명함 정보 입력
                </div>

                <!-- Profile Image -->
                <div class="form-group">
                    <label class="form-label">프로필 사진</label>
                    <div class="image-upload">
                        <div class="image-preview" id="imagePreview">
                            <i class="fas fa-user"></i>
                        </div>
                        <input type="file" id="imageInput" accept="image/*" style="display: none" onchange="handleImageUpload(event)">
                        <button class="upload-btn" onclick="document.getElementById('imageInput').click()">
                            <i class="fas fa-upload"></i> 사진 업로드
                        </button>
                    </div>
                </div>

                <!-- Name -->
                <div class="form-group">
                    <label class="form-label">이름 *</label>
                    <input type="text" class="form-input" id="name" placeholder="홍길동" oninput="updatePreview()">
                </div>

                <!-- Title -->
                <div class="form-group">
                    <label class="form-label">직책</label>
                    <input type="text" class="form-input" id="title" placeholder="Product Manager" oninput="updatePreview()">
                </div>

                <!-- Company -->
                <div class="form-group">
                    <label class="form-label">회사명</label>
                    <input type="text" class="form-input" id="company" placeholder="METI Inc." oninput="updatePreview()">
                </div>

                <!-- Bio -->
                <div class="form-group">
                    <label class="form-label">소개</label>
                    <textarea class="form-input" id="bio" placeholder="간단한 자기소개를 작성해주세요" oninput="updatePreview()"></textarea>
                </div>

                <!-- Phone -->
                <div class="form-group">
                    <label class="form-label">전화번호</label>
                    <input type="tel" class="form-input" id="phone" placeholder="010-1234-5678" oninput="updatePreview()">
                </div>

                <!-- Email -->
                <div class="form-group">
                    <label class="form-label">이메일</label>
                    <input type="email" class="form-input" id="email" placeholder="hello@meti.com" oninput="updatePreview()">
                </div>

                <!-- Website -->
                <div class="form-group">
                    <label class="form-label">웹사이트</label>
                    <input type="url" class="form-input" id="website" placeholder="https://meti.com" oninput="updatePreview()">
                </div>

                <!-- Address -->
                <div class="form-group">
                    <label class="form-label">주소</label>
                    <input type="text" class="form-input" id="address" placeholder="서울시 강남구" oninput="updatePreview()">
                </div>

                <!-- Visibility Toggles -->
                <div class="form-group">
                    <label class="form-label">공개 설정</label>
                    <div class="toggle-group">
                        <div class="toggle-item">
                            <div class="toggle-switch active" id="showPhone" onclick="toggleSwitch('showPhone')"></div>
                            <span>전화번호 공개</span>
                        </div>
                        <div class="toggle-item">
                            <div class="toggle-switch active" id="showEmail" onclick="toggleSwitch('showEmail')"></div>
                            <span>이메일 공개</span>
                        </div>
                    </div>
                </div>

                <!-- Social Links -->
                <div class="form-group">
                    <label class="form-label">소셜 링크</label>
                    <div class="links-list" id="linksList">
                        <!-- Links will be added here -->
                    </div>
                    <button class="add-link-btn" onclick="addLink()">
                        <i class="fas fa-plus"></i> 링크 추가
                    </button>
                </div>
            </div>

            <!-- Right: Preview -->
            <div class="preview-section">
                <div class="section-title">
                    <i class="fas fa-eye"></i>
                    실시간 미리보기
                </div>
                
                <div class="preview-card" id="previewCard" style="background: #0A2260;">
                    <div class="preview-header">
                        <div class="preview-avatar" id="previewAvatar">
                            <i class="fas fa-user"></i>
                        </div>
                        <div class="preview-name" id="previewName" style="color: white;">이름을 입력하세요</div>
                        <div class="preview-title" id="previewTitle" style="color: rgba(255,255,255,0.8);"></div>
                        <div class="preview-company" id="previewCompany" style="color: rgba(255,255,255,0.7);"></div>
                        <div class="preview-bio" id="previewBio" style="color: rgba(255,255,255,0.8); border-color: rgba(255,255,255,0.2);"></div>
                    </div>

                    <div class="preview-contact" id="previewContact">
                        <!-- Contact items will be added here -->
                    </div>

                    <div class="preview-links" id="previewLinks">
                        <!-- Links will be added here -->
                    </div>
                </div>
            </div>
        </div>

        <!-- Theme Selector -->
        <div class="theme-selector">
            <div class="section-title">
                <i class="fas fa-palette"></i>
                컬러 테마 선택
            </div>
            <div class="theme-grid" id="themeGrid">
                ${THEMES.map((theme, index) => `
                    <div class="theme-item ${index === 0 ? 'active' : ''}" data-theme="${theme.id}" onclick="selectTheme('${theme.id}', '${theme.color}')">
                        <div class="theme-color" style="background: ${theme.color};"></div>
                        <div class="theme-name">${theme.name}</div>
                        <div class="theme-desc">${theme.description}</div>
                    </div>
                `).join('')}
            </div>
        </div>

        <!-- Bottom Save Button -->
        <div style="text-align: center; margin-top: 40px; padding-bottom: 40px;">
            <button class="btn btn-primary" onclick="saveCard()" style="padding: 16px 48px; font-size: 18px;">
                <i class="fas fa-save"></i> ${mode === 'new' ? '명함 만들기' : '명함 저장하기'}
            </button>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
    <script>
        // State
        let currentTheme = 'deep-navy';
        let currentThemeColor = '#0A2260';
        let uploadedImage = null;
        let links = [];

        // Initialize
        document.addEventListener('DOMContentLoaded', () => {
            ${mode === 'edit' && cardId ? `loadCard('${cardId}');` : ''}
            updatePreview();
        });

        // Load existing card data (for edit mode)
        async function loadCard(cardId) {
            try {
                const token = localStorage.getItem('meti_token');
                if (!token) {
                    alert('로그인이 필요합니다.');
                    window.location.href = '/login';
                    return;
                }

                const response = await axios.get(\`/api/cards/\${cardId}\`, {
                    headers: { 'Authorization': \`Bearer \${token}\` }
                });

                if (response.data.success) {
                    const card = response.data.data.card;
                    
                    // Fill form
                    document.getElementById('name').value = card.name || '';
                    document.getElementById('title').value = card.title || '';
                    document.getElementById('company').value = card.company || '';
                    document.getElementById('bio').value = card.bio || '';
                    document.getElementById('phone').value = card.phone || '';
                    document.getElementById('email').value = card.email || '';
                    document.getElementById('website').value = card.website || '';
                    document.getElementById('address').value = card.address || '';

                    // Set image
                    if (card.avatar_url) {
                        const preview = document.getElementById('imagePreview');
                        preview.innerHTML = \`<img src="\${card.avatar_url}" alt="Profile">\`;
                        const previewAvatar = document.getElementById('previewAvatar');
                        previewAvatar.innerHTML = \`<img src="\${card.avatar_url}" alt="Profile">\`;
                    }

                    // Set toggles
                    if (!card.show_phone) {
                        document.getElementById('showPhone').classList.remove('active');
                    }
                    if (!card.show_email) {
                        document.getElementById('showEmail').classList.remove('active');
                    }

                    // Set theme
                    if (card.theme) {
                        const themeData = ${JSON.stringify(THEMES)}.find(t => t.id === card.theme);
                        if (themeData) {
                            selectTheme(themeData.id, themeData.color);
                        }
                    }

                    // Set links
                    if (card.links) {
                        try {
                            links = typeof card.links === 'string' ? JSON.parse(card.links) : card.links;
                            links.forEach((link, index) => {
                                addLink(link.title, link.url);
                            });
                        } catch (e) {
                            console.error('Failed to parse links:', e);
                        }
                    }

                    updatePreview();
                }
            } catch (error) {
                console.error('Load card error:', error);
                alert('명함을 불러오는데 실패했습니다.');
            }
        }

        // Image upload
        function handleImageUpload(event) {
            const file = event.target.files[0];
            if (!file) return;

            if (!file.type.startsWith('image/')) {
                alert('이미지 파일만 업로드 가능합니다.');
                return;
            }

            if (file.size > 5 * 1024 * 1024) {
                alert('파일 크기는 5MB 이하여야 합니다.');
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                uploadedImage = e.target.result;
                
                // Update form preview
                const preview = document.getElementById('imagePreview');
                preview.innerHTML = \`<img src="\${uploadedImage}" alt="Profile">\`;
                
                // Update card preview
                const previewAvatar = document.getElementById('previewAvatar');
                previewAvatar.innerHTML = \`<img src="\${uploadedImage}" alt="Profile">\`;
            };
            reader.readAsDataURL(file);
        }

        // Toggle switch
        function toggleSwitch(id) {
            const toggle = document.getElementById(id);
            toggle.classList.toggle('active');
            updatePreview();
        }

        // Add link
        function addLink(title = '', url = '') {
            const index = links.length;
            links.push({ title, url });

            const linksList = document.getElementById('linksList');
            const linkItem = document.createElement('div');
            linkItem.className = 'link-item';
            linkItem.innerHTML = \`
                <input type="text" class="form-input" placeholder="링크 제목" value="\${title}" oninput="updateLink(\${index}, 'title', this.value)">
                <input type="url" class="form-input" placeholder="https://" value="\${url}" oninput="updateLink(\${index}, 'url', this.value)">
                <button class="link-remove" onclick="removeLink(\${index})">
                    <i class="fas fa-times"></i>
                </button>
            \`;
            linksList.appendChild(linkItem);
            
            updatePreview();
        }

        // Update link
        function updateLink(index, field, value) {
            if (links[index]) {
                links[index][field] = value;
                updatePreview();
            }
        }

        // Remove link
        function removeLink(index) {
            links.splice(index, 1);
            
            // Rebuild links list without adding to array again
            const linksList = document.getElementById('linksList');
            linksList.innerHTML = '';
            links.forEach((link, i) => {
                const linkItem = document.createElement('div');
                linkItem.className = 'link-item';
                linkItem.innerHTML = \`
                    <input type="text" class="form-input" placeholder="링크 제목" value="\${link.title}" oninput="updateLink(\${i}, 'title', this.value)">
                    <input type="url" class="form-input" placeholder="https://" value="\${link.url}" oninput="updateLink(\${i}, 'url', this.value)">
                    <button class="link-remove" onclick="removeLink(\${i})">
                        <i class="fas fa-times"></i>
                    </button>
                \`;
                linksList.appendChild(linkItem);
            });
            
            updatePreview();
        }

        // Select theme
        function selectTheme(themeId, color) {
            currentTheme = themeId;
            currentThemeColor = color;

            // Update active state
            document.querySelectorAll('.theme-item').forEach(item => {
                item.classList.remove('active');
            });
            document.querySelector(\`[data-theme="\${themeId}"]\`).classList.add('active');

            // Update preview
            const previewCard = document.getElementById('previewCard');
            previewCard.style.background = color;
            
            updatePreview();
        }

        // Update preview
        function updatePreview() {
            const name = document.getElementById('name').value || '이름을 입력하세요';
            const title = document.getElementById('title').value;
            const company = document.getElementById('company').value;
            const bio = document.getElementById('bio').value;
            const phone = document.getElementById('phone').value;
            const email = document.getElementById('email').value;
            const website = document.getElementById('website').value;
            const address = document.getElementById('address').value;

            const showPhone = document.getElementById('showPhone').classList.contains('active');
            const showEmail = document.getElementById('showEmail').classList.contains('active');

            // Update header
            document.getElementById('previewName').textContent = name;
            document.getElementById('previewTitle').textContent = title;
            document.getElementById('previewCompany').textContent = company;
            
            const previewBio = document.getElementById('previewBio');
            if (bio) {
                previewBio.textContent = bio;
                previewBio.style.display = 'block';
            } else {
                previewBio.style.display = 'none';
            }

            // Update contact
            const previewContact = document.getElementById('previewContact');
            let contactHTML = '';
            
            if (showPhone && phone) {
                contactHTML += \`
                    <div class="contact-item" style="background: rgba(255,255,255,0.1); color: white;">
                        <i class="fas fa-phone"></i>
                        <span>\${phone}</span>
                    </div>
                \`;
            }
            
            if (showEmail && email) {
                contactHTML += \`
                    <div class="contact-item" style="background: rgba(255,255,255,0.1); color: white;">
                        <i class="fas fa-envelope"></i>
                        <span>\${email}</span>
                    </div>
                \`;
            }
            
            if (website) {
                contactHTML += \`
                    <div class="contact-item" style="background: rgba(255,255,255,0.1); color: white;">
                        <i class="fas fa-globe"></i>
                        <span>\${website}</span>
                    </div>
                \`;
            }
            
            if (address) {
                contactHTML += \`
                    <div class="contact-item" style="background: rgba(255,255,255,0.1); color: white;">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>\${address}</span>
                    </div>
                \`;
            }
            
            previewContact.innerHTML = contactHTML;

            // Update links
            const previewLinks = document.getElementById('previewLinks');
            let linksHTML = '';
            
            links.filter(link => link.title && link.url).forEach(link => {
                linksHTML += \`
                    <a href="\${link.url}" class="preview-link" target="_blank" style="background: rgba(255,255,255,0.1); color: white;">
                        <i class="fas fa-link"></i>
                        <span>\${link.title}</span>
                    </a>
                \`;
            });
            
            previewLinks.innerHTML = linksHTML;
        }

        // Save card
        async function saveCard() {
            const name = document.getElementById('name').value.trim();
            if (!name) {
                alert('이름은 필수 입력 항목입니다.');
                return;
            }

            const token = localStorage.getItem('meti_token') || sessionStorage.getItem('meti_token');
            if (!token) {
                alert('로그인이 필요합니다.');
                window.location.href = '/auth/login';
                return;
            }

            const cardData = {
                name: name,
                title: document.getElementById('title').value.trim(),
                company: document.getElementById('company').value.trim(),
                bio: document.getElementById('bio').value.trim(),
                phone: document.getElementById('phone').value.trim(),
                email: document.getElementById('email').value.trim(),
                website: document.getElementById('website').value.trim(),
                address: document.getElementById('address').value.trim(),
                theme: currentTheme,
                links: JSON.stringify(links.filter(link => link.title && link.url)),
                show_phone: document.getElementById('showPhone').classList.contains('active'),
                show_email: document.getElementById('showEmail').classList.contains('active'),
                avatar_url: uploadedImage || null
            };

            try {
                const mode = '${mode}';
                const url = mode === 'new' ? '/api/cards' : \`/api/cards/${cardId}\`;
                const method = mode === 'new' ? 'post' : 'put';

                const response = await axios[method](url, cardData, {
                    headers: { 'Authorization': \`Bearer \${token}\` }
                });

                if (response.data.success) {
                    alert(mode === 'new' ? '명함이 생성되었습니다!' : '명함이 수정되었습니다!');
                    window.location.href = '/my/cards';
                } else {
                    alert('저장에 실패했습니다: ' + response.data.error);
                }
            } catch (error) {
                console.error('Save error:', error);
                alert('저장 중 오류가 발생했습니다.');
            }
        }

        // Go back
        function goBack() {
            if (confirm('작성 중인 내용이 사라집니다. 정말 나가시겠습니까?')) {
                window.history.back();
            }
        }
    </script>
</body>
</html>
  `;
}

export default cardEditor;
