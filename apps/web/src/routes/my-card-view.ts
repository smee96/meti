import { Hono } from 'hono';
import type { Env } from '../types';
import { getShareModalHTML, getShareModalStyles, getShareModalScript } from '../utils/share-modal';

const myCardView = new Hono<{ Bindings: Env }>();

// My card view page /my/card/:id (owner's view with share/edit/QR)
myCardView.get('/:id', async (c) => {
  const cardId = c.req.param('id');
  const { DB } = c.env;
  
  try {
    // Fetch card data
    const card = await DB.prepare(`
      SELECT * FROM cards WHERE id = ? OR short_id = ?
    `).bind(cardId, cardId).first();
    
    if (!card) {
      return c.html(`
        <!DOCTYPE html>
        <html lang="ko">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>METI - 명함을 찾을 수 없습니다</title>
            <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body class="bg-gray-100 flex items-center justify-center min-h-screen p-4">
            <div class="text-center">
                <h1 class="text-2xl font-bold text-gray-800 mb-2">명함을 찾을 수 없습니다</h1>
                <p class="text-gray-600 mb-6">요청하신 명함이 존재하지 않습니다.</p>
                <a href="/my/cards" class="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">
                    내 명함으로 돌아가기
                </a>
            </div>
        </body>
        </html>
      `, 404);
    }
    
    // Parse JSON fields
    const links = card.links ? JSON.parse(card.links) : [];
    const theme = card.theme || 'deep-navy';
    
    // Theme colors mapping
    const themeColors = {
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
    
    const bgColor = themeColors[theme] || themeColors['deep-navy'];
    
    // Build card URL for sharing
    const cardUrl = `${c.req.url.split('/my/card')[0]}/c/${card.short_id || card.id}`;
    
    return c.html(`
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>내 명함 - ${card.name} - METI</title>
    
    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap" rel="stylesheet">
    
    <!-- Font Awesome -->
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    
    <!-- Favicon -->
    <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>💼</text></svg>">
    
    <style>
      /* Local Font - Montserrat Bold */
      @font-face {
        font-family: 'Montserrat';
        src: url('/static/fonts/Montserrat-Bold.woff2') format('woff2');
        font-weight: 700;
        font-style: normal;
        font-display: swap;
      }

      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      
      body {
        font-family: 'Noto Sans KR', sans-serif;
        background: ${bgColor};
        color: #fff;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 20px;
        overflow-x: hidden;
      }
      
      .header-top {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        margin-bottom: 20px;
      }
      
      .back-button {
        position: absolute;
        left: 0;
        width: 40px;
        height: 40px;
        border: none;
        background: rgba(255, 255, 255, 0.1);
        color: white;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s;
        font-size: 18px;
      }
      
      .back-button:hover {
        background: rgba(255, 255, 255, 0.2);
        transform: translateX(-2px);
      }
      
      .back-button:active {
        transform: scale(0.95);
      }
      
      .logo {
        font-family: 'Montserrat', sans-serif;
        font-size: 32px;
        letter-spacing: 12px;
        padding-left: 12px;
        text-align: center;
        opacity: 0.9;
      }
      
      .divider {
        display: flex;
        align-items: center;
        gap: 8px;
        margin: 24px 0;
        opacity: 0.5;
      }
      
      .divider-line {
        flex: 1;
        height: 1px;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
      }
      
      .divider-dot {
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background: rgba(255,255,255,0.5);
      }
      
      .card-container {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px 0;
        position: relative;
      }
      
      .card-shadow {
        position: absolute;
        width: 90%;
        max-width: 380px;
        height: 100%;
        background: radial-gradient(ellipse at center, rgba(0,0,0,0.2), transparent 70%);
        filter: blur(20px);
        opacity: 0.5;
      }
      
      .card {
        background: linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05));
        border: 1px solid rgba(255,255,255,0.2);
        border-radius: 24px;
        padding: 32px 28px;
        max-width: 360px;
        width: 100%;
        box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        backdrop-filter: blur(20px);
        position: relative;
        z-index: 10;
      }
      
      .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 32px;
        opacity: 0.8;
      }
      
      .card-logo {
        font-family: 'Montserrat', sans-serif;
        font-size: 18px;
        letter-spacing: 6px;
      }
      
      .qr-icon {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 2px;
        width: 24px;
        height: 24px;
      }
      
      .qr-icon span {
        width: 100%;
        height: 100%;
        background: rgba(255,255,255,0.6);
        border-radius: 1px;
      }
      
      .profile {
        text-align: center;
        margin-bottom: 32px;
      }
      
      .avatar {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        object-fit: cover;
        border: 3px solid rgba(255,255,255,0.3);
        margin-bottom: 16px;
      }
      
      .name {
        font-size: 28px;
        font-weight: 700;
        margin-bottom: 8px;
        letter-spacing: -0.5px;
      }
      
      .headline {
        font-size: 14px;
        opacity: 0.7;
        font-weight: 400;
        line-height: 1.5;
      }
      
      .contacts {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-bottom: 24px;
      }
      
      .contact-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 16px;
        background: rgba(255,255,255,0.1);
        border-radius: 12px;
        font-size: 14px;
        transition: all 0.3s;
      }
      
      .contact-item i {
        opacity: 0.7;
        width: 16px;
        text-align: center;
      }
      
      .contact-item a {
        color: inherit;
        text-decoration: none;
        flex: 1;
      }
      
      .links {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-bottom: 24px;
      }
      
      .link-item {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px 14px;
        background: rgba(255,255,255,0.1);
        border-radius: 10px;
        text-decoration: none;
        color: inherit;
        font-size: 13px;
        transition: all 0.3s;
      }
      
      .link-item:hover {
        background: rgba(255,255,255,0.15);
        transform: translateX(4px);
      }
      
      .link-item i {
        opacity: 0.6;
        font-size: 12px;
      }
      
      .actions {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-top: 24px;
      }
      
      .btn {
        padding: 16px 24px;
        border: none;
        border-radius: 14px;
        font-size: 15px;
        font-weight: 600;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        transition: all 0.3s;
        font-family: 'Noto Sans KR', sans-serif;
        width: 100%;
      }
      
      .btn-primary {
        background: white;
        color: ${bgColor};
      }
      
      .btn-primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(255,255,255,0.3);
      }
      
      .btn-secondary {
        background: rgba(255,255,255,0.15);
        color: white;
        border: 1px solid rgba(255,255,255,0.25);
      }
      
      .btn-secondary:hover {
        background: rgba(255,255,255,0.2);
        transform: translateY(-2px);
      }
      
      .btn-tertiary {
        background: rgba(255,255,255,0.1);
        color: white;
        border: 1px solid rgba(255,255,255,0.2);
      }
      
      .btn-tertiary:hover {
        background: rgba(255,255,255,0.15);
      }
      
      .footer {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        padding: 20px 0 0;
        opacity: 0.5;
      }
      
      .footer-text {
        font-size: 11px;
        letter-spacing: 1px;
      }
      
      .footer-logo {
        font-family: 'Montserrat', sans-serif;
        font-size: 16px;
        letter-spacing: 6px;
      }
      
      .home-indicator {
        width: 120px;
        height: 5px;
        background: rgba(255,255,255,0.3);
        border-radius: 3px;
        margin-top: 8px;
      }
      
      @media (max-width: 480px) {
        .logo {
          font-size: 24px;
          letter-spacing: 8px;
        }
        
        .card {
          padding: 28px 24px;
        }
        
        .name {
          font-size: 24px;
        }
      }
      
      ${getShareModalStyles()}
    </style>
</head>
<body>
    <div>
        <div class="header-top">
            <button class="back-button" onclick="window.location.href='/my/cards'" aria-label="뒤로가기">
                <i class="fas fa-arrow-left"></i>
            </button>
            <div class="logo">METI</div>
        </div>
        
        <div class="divider">
            <div class="divider-line"></div>
            <div class="divider-dot"></div>
            <div class="divider-line"></div>
        </div>
        
        <div class="card-container">
            <div class="card-shadow"></div>
            <div class="card">
                <div class="card-header">
                    <div class="card-logo">METI</div>
                    <div class="qr-icon">
                        ${Array(25).fill('<span></span>').join('')}
                    </div>
                </div>
                
                <div class="profile">
                    ${card.avatar ? `<img src="${card.avatar}" alt="${card.name}" class="avatar">` : ''}
                    <div class="name">${card.name}</div>
                    ${card.headline ? `<div class="headline">${card.headline}</div>` : ''}
                </div>
                
                ${card.phone || card.email ? `
                <div class="contacts">
                    ${card.phone ? `
                    <div class="contact-item">
                        <i class="fas fa-phone"></i>
                        <a href="tel:${card.phone}">${card.phone}</a>
                    </div>
                    ` : ''}
                    ${card.email ? `
                    <div class="contact-item">
                        <i class="fas fa-envelope"></i>
                        <a href="mailto:${card.email}">${card.email}</a>
                    </div>
                    ` : ''}
                </div>
                ` : ''}
                
                ${links.length > 0 ? `
                <div class="links">
                    ${links.map(link => `
                        <a href="${link.url}" target="_blank" rel="noopener" class="link-item">
                            <i class="fas fa-link"></i>
                            ${link.label}
                        </a>
                    `).join('')}
                </div>
                ` : ''}
            </div>
        </div>
        
        <div class="actions">
            <button class="btn btn-primary" onclick="openShareModal()">
                <i class="fas fa-share-alt"></i>
                공유하기
            </button>
            <button class="btn btn-secondary" onclick="window.location.href='/my/card/${card.id}/edit'">
                <i class="fas fa-edit"></i>
                명함 수정
            </button>
        </div>
    </div>
    
    <div class="footer">
        <div class="footer-text">Powered by</div>
        <div class="footer-logo">METI</div>
        <div class="home-indicator"></div>
    </div>
    
    ${getShareModalHTML()}
    
    <script>
      // Verify owner on page load
      async function verifyOwner() {
        const token = localStorage.getItem('meti_token') || sessionStorage.getItem('meti_token');
        
        if (!token) {
          alert('로그인이 필요합니다.');
          window.location.href = '/auth/login';
          return;
        }
        
        try {
          const response = await fetch('/api/auth/me', {
            headers: { 'Authorization': 'Bearer ' + token }
          });
          
          if (!response.ok) {
            alert('로그인이 만료되었습니다.');
            localStorage.removeItem('meti_token');
            sessionStorage.removeItem('meti_token');
            window.location.href = '/auth/login';
            return;
          }
          
          const result = await response.json();
          
          // Check response structure
          if (!result.success || !result.data || !result.data.user) {
            console.error('Invalid response structure:', result);
            alert('인증 정보를 확인할 수 없습니다.');
            window.location.href = '/my/cards';
            return;
          }
          
          const userId = result.data.user.id;
          const cardOwnerId = "${card.user_id}";
          
          console.log('User ID:', userId, 'Card Owner:', cardOwnerId);
          
          if (userId !== cardOwnerId) {
            alert('본인의 명함만 볼 수 있습니다.');
            window.location.href = '/my/cards';
          }
        } catch (error) {
          console.error('Auth error:', error);
          alert('인증 오류가 발생했습니다: ' + error.message);
          window.location.href = '/my/cards';
        }
      }
      
      // Run on page load
      verifyOwner();
    </script>
    
    ${getShareModalScript({
      cardUrl,
      cardName: card.name,
      cardHeadline: card.headline || ''
    })}
</body>
</html>
    `);
    
  } catch (error) {
    console.error('Error fetching card:', error);
    return c.html(`
      <!DOCTYPE html>
      <html lang="ko">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>오류 - METI</title>
          <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body class="bg-gray-100 flex items-center justify-center min-h-screen p-4">
          <div class="text-center">
              <h1 class="text-2xl font-bold text-gray-800 mb-2">오류가 발생했습니다</h1>
              <p class="text-gray-600 mb-6">명함을 불러오는 중 문제가 발생했습니다.</p>
              <a href="/my/cards" class="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">
                  내 명함으로 돌아가기
              </a>
          </div>
      </body>
      </html>
    `, 500);
  }
});

export default myCardView;
