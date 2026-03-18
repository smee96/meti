import { THEMES } from '../../utils/card/themes';
import { editorStyles } from './editor-styles';
import { getModalHTML } from '../../utils/modal';

export function getEditorHTML(mode: 'new' | 'edit', cardId: string | null): string {
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
    <style>${editorStyles}</style>
    ${getModalHTML()}
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

                <!-- 프로필 사진 업로드 -->
                <div class="form-group">
                    <label class="form-label">
                        <i class="fas fa-camera"></i>
                        프로필 사진
                    </label>
                    <div class="image-upload-wrapper">
                        <div class="avatar-preview" id="avatarPreview">
                            <i class="fas fa-user"></i>
                        </div>
                        <div class="file-input-wrapper">
                            <input type="file" id="avatarInput" accept="image/*" onchange="handleImageUpload(event)" />
                            <label for="avatarInput" class="file-input-label">
                                <i class="fas fa-upload"></i>
                                사진 선택
                            </label>
                        </div>
                        <div style="font-size: 12px; opacity: 0.7; text-align: center;">
                            JPG, PNG 파일 (최대 2MB)
                        </div>
                    </div>
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
                        <div class="preview-avatar" id="previewAvatarWrapper">
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
        ${getEditorScript(mode, cardId)}
    </script>
</body>
</html>
  `;
}

function getEditorScript(mode: 'new' | 'edit', cardId: string | null): string {
  return `
        const MODE = '${mode}';
        const CARD_ID = ${cardId ? `'${cardId}'` : 'null'};
        const MAX_LINKS = 5;
        let currentTheme = 'deep-navy';
        let links = [];
        let avatarFile = null;
        let currentAvatarUrl = null;

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
                await window.modal.show({
                    message: '로그인이 필요합니다.',
                    type: 'warning'
                });
                window.location.href = '/auth/login';
                return;
            }

            // Load card data if editing
            if (MODE === 'edit' && CARD_ID) {
                await loadCardData();
            }

            updatePreview();
        });

        // Handle image upload with auto-resize
        function handleImageUpload(event) {
            const file = event.target.files[0];
            if (!file) return;

            // Validate file type
            if (!file.type.startsWith('image/')) {
                window.modal.show({
                    message: '이미지 파일만 업로드 가능합니다.',
                    type: 'error'
                });
                return;
            }

            // Validate file size (2MB before resize)
            if (file.size > 2 * 1024 * 1024) {
                window.modal.show({
                    message: '파일 크기는 2MB 이하여야 합니다.',
                    type: 'error'
                });
                return;
            }

            // Load and resize image
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    // Resize image to 400x400
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    
                    const size = 400; // Target size
                    canvas.width = size;
                    canvas.height = size;
                    
                    // Calculate dimensions to maintain aspect ratio and cover the square
                    let sourceWidth = img.width;
                    let sourceHeight = img.height;
                    let sourceX = 0;
                    let sourceY = 0;
                    
                    if (img.width > img.height) {
                        // Landscape: crop width
                        sourceWidth = img.height;
                        sourceX = (img.width - img.height) / 2;
                    } else if (img.height > img.width) {
                        // Portrait: crop height
                        sourceHeight = img.width;
                        sourceY = (img.height - img.width) / 2;
                    }
                    
                    // Draw image centered and cropped
                    ctx.drawImage(
                        img,
                        sourceX, sourceY, sourceWidth, sourceHeight,
                        0, 0, size, size
                    );
                    
                    // Convert to data URL
                    const resizedDataUrl = canvas.toDataURL('image/jpeg', 0.9);
                    
                    // Update preview
                    const preview = document.getElementById('avatarPreview');
                    preview.innerHTML = \`<img src="\${resizedDataUrl}" alt="Avatar">\`;
                    
                    // Update preview card
                    const previewAvatar = document.getElementById('previewAvatarWrapper');
                    previewAvatar.innerHTML = \`<img src="\${resizedDataUrl}" alt="Avatar">\`;
                    
                    // Store resized image data
                    currentAvatarUrl = resizedDataUrl;
                    avatarFile = null; // Clear file since we're using data URL now
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }

        // Load card data for editing
        async function loadCardData() {
            try {
                const token = localStorage.getItem('meti_token') || sessionStorage.getItem('meti_token');
                const response = await axios.get(\`/api/cards/\${CARD_ID}\`, {
                    headers: { 'Authorization': \`Bearer \${token}\` }
                });

                if (response.data.success) {
                    const card = response.data.data.card || response.data.data;
                    
                    console.log('Loaded card data:', card);
                    
                    // Fill form
                    document.getElementById('name').value = card.name || '';
                    document.getElementById('phone').value = card.phone || '';
                    document.getElementById('email').value = card.email || '';
                    document.getElementById('title').value = card.title || '';
                    document.getElementById('company').value = card.company || '';
                    document.getElementById('headline').value = card.headline || '';
                    
                    // Load avatar
                    if (card.avatar_url) {
                        currentAvatarUrl = card.avatar_url;
                        const preview = document.getElementById('avatarPreview');
                        preview.innerHTML = \`<img src="\${card.avatar_url}" alt="Avatar">\`;
                        
                        const previewAvatar = document.getElementById('previewAvatarWrapper');
                        previewAvatar.innerHTML = \`<img src="\${card.avatar_url}" alt="Avatar">\`;
                    }
                    
                    // Load theme
                    if (card.theme) {
                        selectTheme(card.theme);
                    }
                    
                    // Load links
                    if (card.links && Array.isArray(card.links)) {
                        card.links.forEach((link) => {
                            if (link.label && link.url) {
                                addLink(link.label, link.url);
                            }
                        });
                    }
                    
                    updatePreview();
                } else {
                    throw new Error(response.data.error || '명함 데이터를 불러올 수 없습니다.');
                }
            } catch (error) {
                console.error('Failed to load card:', error);
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    await window.modal.show({
                        message: '로그인이 만료되었습니다. 다시 로그인해주세요.',
                        type: 'warning'
                    });
                    window.location.href = '/auth/login';
                } else {
                    await window.modal.show({
                        message: '명함을 불러오는데 실패했습니다: ' + (error.response?.data?.error || error.message),
                        type: 'error'
                    });
                    window.location.href = '/my/cards';
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
            const themeEl = document.querySelector(\`[data-theme="\${themeId}"]\`);
            if (themeEl) {
                themeEl.classList.add('active');
            }
            
            // Update preview card color
            const color = THEME_COLORS[themeId];
            document.getElementById('previewCard').style.background = color;
        }

        // Add link
        function addLink(label = '', url = '') {
            if (links.length >= MAX_LINKS) {
                window.modal.show({
                    message: \`최대 \${MAX_LINKS}개까지 링크를 추가할 수 있습니다.\`,
                    type: 'warning'
                });
                return;
            }

            const linkId = Date.now() + Math.random();
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
                window.modal.show({
                    message: '이름을 입력해주세요.',
                    type: 'warning'
                });
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

            // Add avatar_url if exists (either existing or newly uploaded)
            if (currentAvatarUrl) {
                cardData.avatar_url = currentAvatarUrl;
            }

            // Disable buttons
            const saveBtn = document.getElementById('saveBtn');
            const saveFooterBtn = document.getElementById('saveFooterBtn');
            const saveBtnText = document.getElementById('saveBtnText');
            const saveFooterBtnText = document.getElementById('saveFooterBtnText');
            
            saveBtn.disabled = true;
            saveFooterBtn.disabled = true;
            saveBtnText.innerHTML = '<span class="loading-spinner"></span>';
            saveFooterBtnText.innerHTML = '<span class="loading-spinner"></span>';

            try {
                const token = localStorage.getItem('meti_token') || sessionStorage.getItem('meti_token');
                
                let response;
                if (MODE === 'new') {
                    response = await axios.post('/api/cards', cardData, {
                        headers: { 'Authorization': \`Bearer \${token}\` }
                    });
                } else {
                    response = await axios.put(\`/api/cards/\${CARD_ID}\`, cardData, {
                        headers: { 'Authorization': \`Bearer \${token}\` }
                    });
                }

                if (response.data.success) {
                    await window.modal.show({
                        message: MODE === 'new' ? '명함이 생성되었습니다!' : '명함이 수정되었습니다!',
                        type: 'success'
                    });
                    window.location.href = '/my/cards';
                } else {
                    throw new Error(response.data.error || '저장에 실패했습니다.');
                }
            } catch (error) {
                console.error('Save error:', error);
                
                // Re-enable buttons
                saveBtn.disabled = false;
                saveFooterBtn.disabled = false;
                saveBtnText.textContent = MODE === 'new' ? '명함 만들기' : '저장';
                saveFooterBtnText.textContent = MODE === 'new' ? '명함 만들기' : '저장';
                
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    await window.modal.show({
                        message: '로그인이 만료되었습니다. 다시 로그인해주세요.',
                        type: 'warning'
                    });
                    window.location.href = '/auth/login';
                } else {
                    const errorMsg = error.response?.data?.error || error.message || '저장에 실패했습니다.';
                    await window.modal.show({
                        message: '오류: ' + errorMsg,
                        type: 'error'
                    });
                }
            }
        }

        // Go back
        async function goBack() {
            const confirmed = await window.modal.show({
                message: '작성 중인 내용이 저장되지 않습니다. 계속하시겠습니까?',
                type: 'confirm',
                confirmText: '나가기',
                cancelText: '취소'
            });
            
            if (confirmed) {
                window.location.href = '/my/cards';
            }
        }
  `;
}
