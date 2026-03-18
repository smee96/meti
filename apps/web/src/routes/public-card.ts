import { Hono } from 'hono';
import type { Env } from '../types';

const publicCard = new Hono<{ Bindings: Env }>();

// Public card view page /c/:id
publicCard.get('/:id', async (c) => {
  const cardId = c.req.param('id');
  const { DB } = c.env;
  
  try {
    // Fetch card data
    const card = await DB.prepare(`
      SELECT 
        c.*,
        u.email as ownerEmail
      FROM cards c
      LEFT JOIN users u ON c.user_id = u.id
      WHERE c.id = ? OR c.short_id = ?
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
                <p class="text-gray-600 mb-6">요청하신 명함이 존재하지 않거나 삭제되었습니다.</p>
                <a href="/" class="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">
                    홈으로 돌아가기
                </a>
            </div>
        </body>
        </html>
      `, 404);
    }
    
    // Check visibility/status
    if (card.status === 'private') {
      return c.html(`
        <!DOCTYPE html>
        <html lang="ko">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>METI - 비공개 명함</title>
            <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body class="bg-gray-100 flex items-center justify-center min-h-screen p-4">
            <div class="text-center">
                <h1 class="text-2xl font-bold text-gray-800 mb-2">비공개 명함입니다</h1>
                <p class="text-gray-600 mb-6">이 명함은 소유자만 볼 수 있습니다.</p>
                <a href="/" class="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">
                    홈으로 돌아가기
                </a>
            </div>
        </body>
        </html>
      `, 403);
    }
    
    // Parse JSON fields
    const links = card.links ? JSON.parse(card.links) : [];
    const theme = card.theme || 'deep-navy';
    
    // Record view event (async, don't wait)
    const src = c.req.query('src') || null;
    DB.prepare(`
      INSERT INTO card_view_events (card_id, viewed_at, source)
      VALUES (?, datetime('now'), ?)
    `).bind(card.id, src).run().catch(() => {});
    
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
    const buttonTextColor = bgColor;
    
    // Show contact info based on visibility settings
    const showPhone = card.show_phone === 1;
    const showEmail = card.show_email === 1;
    
    return c.html(`
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>${card.name} - METI 디지털 명함</title>
    <meta name="description" content="${card.headline || card.name + '의 디지털 명함'}">
    
    <!-- Open Graph / SNS 공유 -->
    <meta property="og:title" content="${card.name} - METI">
    <meta property="og:description" content="${card.headline || '디지털 명함'}">
    <meta property="og:type" content="profile">
    <meta property="og:url" content="${c.req.url}">
    ${card.avatar ? `<meta property="og:image" content="${card.avatar}">` : ''}
    
    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Tenor+Sans&family=Noto+Sans+KR:wght@300;400;500;700&display=swap" rel="stylesheet">
    
    <!-- Font Awesome -->
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    
    <!-- Favicon -->
    <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>💼</text></svg>">
    
    <style>
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
      
      .logo {
        font-family: 'Tenor Sans', serif;
        font-size: 32px;
        letter-spacing: 12px;
        padding-left: 12px;
        text-align: center;
        margin: 40px 0 20px 0;
        opacity: 0;
        animation: fadeInDown 0.9s cubic-bezier(.16,1,.3,1) 0.2s forwards;
      }
      
      .divider {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 28px auto 26px auto;
        max-width: 200px;
        opacity: 0;
        animation: fadeIn 0.5s ease 0.7s forwards;
      }
      
      .divider-line {
        flex: 1;
        height: 1px;
        background: rgba(255,255,255,0.15);
      }
      
      .divider-dot {
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background: rgba(255,255,255,0.3);
        margin: 0 8px;
      }
      
      .card-container {
        max-width: 400px;
        margin: 0 auto;
        position: relative;
        opacity: 0;
        animation: fadeInUp 0.9s cubic-bezier(.16,1,.3,1) 0.85s forwards;
      }
      
      .card-shadow {
        position: absolute;
        top: -8px;
        left: 12px;
        right: -12px;
        bottom: 8px;
        background: rgba(255,255,255,0.06);
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 16px;
        z-index: 1;
      }
      
      .card {
        position: relative;
        z-index: 2;
        background: rgba(255,255,255,0.10);
        border: 1px solid rgba(255,255,255,0.18);
        border-radius: 16px;
        backdrop-filter: blur(20px);
        padding: 24px;
        box-shadow: inset 0 1px 0 rgba(255,255,255,0.2);
      }
      
      .card::before {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        width: 65%;
        height: 55%;
        background: radial-gradient(ellipse at 80% 10%, rgba(255,255,255,0.08), transparent);
        pointer-events: none;
      }
      
      .card::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 20%;
        right: 20%;
        height: 1px;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
      }
      
      .card-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 20px;
      }
      
      .card-logo {
        font-family: 'Tenor Sans', serif;
        font-size: 14px;
        letter-spacing: 6px;
        padding-left: 6px;
        opacity: 0.7;
      }
      
      .qr-icon {
        width: 32px;
        height: 32px;
        opacity: 0.2;
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 2px;
      }
      
      .qr-icon span {
        background: #fff;
        aspect-ratio: 1;
      }
      
      .profile {
        margin-bottom: 24px;
      }
      
      .avatar {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        object-fit: cover;
        border: 3px solid rgba(255,255,255,0.3);
        margin-bottom: 16px;
      }
      
      .name {
        font-size: 24px;
        font-weight: 500;
        letter-spacing: 0.3px;
        margin-bottom: 8px;
      }
      
      .headline {
        font-size: 13px;
        font-weight: 300;
        letter-spacing: 0.5px;
        opacity: 0.5;
        line-height: 1.6;
      }
      
      .contacts {
        margin: 24px 0;
        padding: 16px 0;
        border-top: 1px solid rgba(255,255,255,0.15);
        border-bottom: 1px solid rgba(255,255,255,0.15);
      }
      
      .contact-item {
        display: flex;
        align-items: center;
        margin: 12px 0;
        font-size: 14px;
        opacity: 0.8;
      }
      
      .contact-item i {
        width: 24px;
        margin-right: 12px;
        opacity: 0.7;
      }
      
      .contact-item a {
        color: #fff;
        text-decoration: none;
        transition: opacity 0.2s;
      }
      
      .contact-item a:hover {
        opacity: 1;
      }
      
      .links {
        margin: 20px 0;
      }
      
      .link-item {
        display: block;
        background: rgba(255,255,255,0.08);
        border: 1px solid rgba(255,255,255,0.15);
        border-radius: 12px;
        padding: 14px 18px;
        margin: 10px 0;
        color: #fff;
        text-decoration: none;
        font-size: 14px;
        transition: all 0.2s;
      }
      
      .link-item:hover {
        background: rgba(255,255,255,0.15);
        transform: translateX(4px);
      }
      
      .link-item i {
        margin-right: 10px;
        opacity: 0.7;
        width: 16px;
        text-align: center;
      }
      
      .actions {
        margin-top: 32px;
        display: flex;
        flex-direction: column;
        gap: 12px;
        opacity: 0;
        animation: fadeInUp 0.7s ease 1.2s forwards;
      }
      
      .btn {
        width: 100%;
        padding: 16px;
        border-radius: 16px;
        font-size: 15px;
        font-weight: 700;
        text-align: center;
        cursor: pointer;
        transition: all 0.2s;
        text-decoration: none;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
      }
      
      .btn-primary {
        background: #fff;
        color: ${buttonTextColor};
        box-shadow: 0 8px 24px rgba(5,15,50,0.25);
      }
      
      .btn-primary:active {
        transform: scale(0.98);
      }
      
      .btn-secondary {
        background: transparent;
        border: 1.5px solid rgba(255,255,255,0.25);
        color: rgba(255,255,255,0.8);
      }
      
      .btn-secondary:active {
        background: rgba(255,255,255,0.07);
      }
      
      .footer {
        text-align: center;
        margin-top: 40px;
        opacity: 0;
        animation: fadeIn 0.5s ease 1.4s forwards;
      }
      
      .footer-text {
        font-size: 13px;
        opacity: 0.5;
        margin-bottom: 8px;
      }
      
      .footer-logo {
        font-family: 'Tenor Sans', serif;
        font-size: 18px;
        letter-spacing: 8px;
        padding-left: 8px;
        opacity: 0.4;
      }
      
      .home-indicator {
        width: 134px;
        height: 5px;
        background: rgba(255,255,255,0.25);
        border-radius: 3px;
        margin: 20px auto 10px auto;
      }
      
      @keyframes fadeInDown {
        from {
          opacity: 0;
          transform: translateY(-12px) scale(0.97);
        }
        to {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }
      
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(18px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      
      /* Modal styles */
      .modal {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.8);
        backdrop-filter: blur(10px);
        z-index: 1000;
        align-items: center;
        justify-content: center;
        padding: 20px;
      }
      
      .modal.active {
        display: flex;
      }
      
      .modal-content {
        background: ${bgColor};
        border: 1px solid rgba(255,255,255,0.2);
        border-radius: 20px;
        padding: 32px;
        max-width: 400px;
        width: 100%;
        text-align: center;
      }
      
      .modal-qr {
        background: #fff;
        padding: 20px;
        border-radius: 12px;
        display: inline-block;
        margin: 20px 0;
      }
      
      .modal-close {
        margin-top: 20px;
        padding: 14px 28px;
        background: rgba(255,255,255,0.15);
        border: 1px solid rgba(255,255,255,0.25);
        border-radius: 12px;
        color: #fff;
        cursor: pointer;
        font-size: 14px;
      }
    </style>
</head>
<body>
    <div>
        <div class="logo">METI</div>
        
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
                
                ${(showPhone && card.phone) || (showEmail && card.email) ? `
                <div class="contacts">
                    ${showPhone && card.phone ? `
                    <div class="contact-item">
                        <i class="fas fa-phone"></i>
                        <a href="tel:${card.phone}">${card.phone}</a>
                    </div>
                    ` : ''}
                    ${showEmail && card.email ? `
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
            <button class="btn btn-primary" onclick="saveContact()">
                <i class="fas fa-user-plus"></i>
                연락처 저장
            </button>
            <button class="btn btn-secondary" onclick="showQR()">
                <i class="fas fa-qrcode"></i>
                QR 공유
            </button>
        </div>
    </div>
    
    <div class="footer">
        <div class="footer-text">Powered by</div>
        <div class="footer-logo">METI</div>
        <div class="home-indicator"></div>
    </div>
    
    <!-- QR Modal -->
    <div id="qrModal" class="modal" onclick="closeModal()">
        <div class="modal-content" onclick="event.stopPropagation()">
            <h2 style="font-size: 20px; margin-bottom: 10px;">QR 코드</h2>
            <p style="font-size: 14px; opacity: 0.7; margin-bottom: 20px;">이 QR 코드를 스캔하여 명함을 공유하세요</p>
            <div class="modal-qr" id="qrcode"></div>
            <button class="modal-close" onclick="closeModal()">닫기</button>
        </div>
    </div>
    
    <!-- QR Code Library -->
    <script src="https://cdn.jsdelivr.net/npm/qrcodejs@1.0.0/qrcode.min.js"></script>
    
    <script>
      async function saveContact() {
        const cardData = {
          name: "${card.name}",
          email: "${showEmail && card.email ? card.email : ''}",
          phone: "${showPhone && card.phone ? card.phone : ''}",
          company: "${card.company || ''}",
          title: "${card.title || ''}",
          headline: "${card.headline || ''}",
          url: window.location.href
        };
        
        // Try native contact API first (mobile)
        if ('contacts' in navigator && 'ContactsManager' in window) {
          try {
            const contact = {
              name: [cardData.name],
              email: cardData.email ? [cardData.email] : [],
              tel: cardData.phone ? [cardData.phone] : [],
              url: [cardData.url]
            };
            await navigator.contacts.select(['name', 'email', 'tel'], { multiple: false });
            alert('연락처가 저장되었습니다!');
            return;
          } catch (err) {
            // Fall back to vCard download
          }
        }
        
        // Create vCard for download
        const vCardLines = [
          'BEGIN:VCARD',
          'VERSION:3.0',
          \`FN:\${cardData.name}\`
        ];
        
        if (cardData.email) vCardLines.push(\`EMAIL:\${cardData.email}\`);
        if (cardData.phone) vCardLines.push(\`TEL:\${cardData.phone}\`);
        if (cardData.company) vCardLines.push(\`ORG:\${cardData.company}\`);
        if (cardData.title) vCardLines.push(\`TITLE:\${cardData.title}\`);
        if (cardData.headline) vCardLines.push(\`NOTE:\${cardData.headline}\`);
        vCardLines.push(\`URL:\${cardData.url}\`);
        vCardLines.push('END:VCARD');
        
        const vCard = vCardLines.join('\\n');
        
        const blob = new Blob([vCard], { type: 'text/vcard;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = \`\${cardData.name}_명함.vcf\`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        // Track save event
        fetch('/api/cards/${card.id}/save', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        }).catch(() => {});
      }
      
      function showQR() {
        const modal = document.getElementById('qrModal');
        const qrContainer = document.getElementById('qrcode');
        
        // Clear previous QR
        qrContainer.innerHTML = '';
        
        // Generate new QR
        new QRCode(qrContainer, {
          text: window.location.href,
          width: 200,
          height: 200,
          colorDark: "${bgColor}",
          colorLight: "#ffffff",
          correctLevel: QRCode.CorrectLevel.M
        });
        
        modal.classList.add('active');
      }
      
      function closeModal() {
        document.getElementById('qrModal').classList.remove('active');
      }
      
      // Share button (if Web Share API is supported)
      if (navigator.share) {
        const shareBtn = document.createElement('button');
        shareBtn.className = 'btn btn-secondary';
        shareBtn.innerHTML = '<i class="fas fa-share-alt"></i> 공유하기';
        shareBtn.onclick = async () => {
          try {
            await navigator.share({
              title: "${card.name} - METI",
              text: "${card.headline || '디지털 명함'}",
              url: window.location.href
            });
          } catch (err) {
            console.log('Share cancelled');
          }
        };
        document.querySelector('.actions').appendChild(shareBtn);
      }
    </script>
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
          <title>METI - 오류</title>
          <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body class="bg-gray-100 flex items-center justify-center min-h-screen p-4">
          <div class="text-center">
              <h1 class="text-2xl font-bold text-gray-800 mb-2">오류가 발생했습니다</h1>
              <p class="text-gray-600 mb-6">명함을 불러오는 중 문제가 발생했습니다.</p>
              <a href="/" class="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">
                  홈으로 돌아가기
              </a>
          </div>
      </body>
      </html>
    `, 500);
  }
});

export default publicCard;
