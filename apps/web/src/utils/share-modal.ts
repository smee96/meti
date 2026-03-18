/**
 * Share Modal Utility (Remember App Style)
 * 리멤버 스타일의 공유 모달 컴포넌트
 */

export interface ShareModalOptions {
  cardUrl: string;
  cardName: string;
  cardHeadline?: string;
}

/**
 * Get share modal styles
 */
export function getShareModalStyles(): string {
  return `
    .share-modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.6);
      display: none;
      align-items: flex-end;
      justify-content: center;
      z-index: 9999;
      animation: fadeIn 0.2s ease-out;
    }

    .share-modal-overlay.active {
      display: flex;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    @keyframes slideUp {
      from {
        transform: translateY(100%);
      }
      to {
        transform: translateY(0);
      }
    }

    .share-modal {
      background: white;
      border-radius: 24px 24px 0 0;
      width: 100%;
      max-width: 600px;
      padding: 32px 24px;
      animation: slideUp 0.3s ease-out;
      max-height: 80vh;
      overflow-y: auto;
    }

    .share-modal-header {
      text-align: center;
      margin-bottom: 32px;
    }

    .share-modal-title {
      font-size: 18px;
      font-weight: 600;
      color: #000;
      margin-bottom: 4px;
    }

    .share-modal-subtitle {
      font-size: 14px;
      color: #666;
    }

    .share-options {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 16px;
      margin-bottom: 24px;
    }

    .share-option {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      transition: transform 0.2s;
    }

    .share-option:active {
      transform: scale(0.95);
    }

    .share-option-icon {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 28px;
      transition: all 0.3s;
      border: 2px solid transparent;
    }

    .share-option:hover .share-option-icon {
      transform: scale(1.05);
    }

    /* Individual button colors */
    .share-option-icon.sms {
      background: #FF6B35;
      color: white;
    }

    .share-option-icon.kakao {
      background: #FEE500;
      color: #3C1E1E;
    }

    .share-option-icon.link {
      background: #1E88E5;
      color: white;
    }

    .share-option-icon.qr {
      background: #000000;
      color: white;
    }

    .share-option-icon.more {
      background: white;
      color: #666;
      border-color: #e0e0e0;
    }

    .share-option-label {
      font-size: 13px;
      color: #333;
      font-weight: 500;
      text-align: center;
    }

    .share-modal-cancel {
      width: 100%;
      padding: 16px;
      background: #f5f5f5;
      border: none;
      border-radius: 12px;
      font-size: 15px;
      font-weight: 600;
      color: #666;
      cursor: pointer;
      transition: background 0.2s;
    }

    .share-modal-cancel:hover {
      background: #e0e0e0;
    }

    .share-modal-cancel:active {
      transform: scale(0.98);
    }

    /* QR Code Modal */
    .qr-modal {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.8);
      z-index: 10000;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }

    .qr-modal.active {
      display: flex;
    }

    .qr-modal-content {
      background: white;
      border-radius: 20px;
      padding: 32px;
      max-width: 400px;
      width: 100%;
      text-align: center;
    }

    .qr-modal-title {
      font-size: 20px;
      font-weight: 600;
      color: #000;
      margin-bottom: 8px;
    }

    .qr-modal-desc {
      font-size: 14px;
      color: #666;
      margin-bottom: 24px;
    }

    .qr-code-container {
      background: white;
      padding: 20px;
      border-radius: 12px;
      display: inline-block;
      margin-bottom: 24px;
    }

    .qr-modal-close {
      width: 100%;
      padding: 14px;
      background: #1E88E5;
      color: white;
      border: none;
      border-radius: 12px;
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s;
    }

    .qr-modal-close:hover {
      background: #1976D2;
    }

    /* Mobile responsive */
    @media (max-width: 480px) {
      .share-options {
        grid-template-columns: repeat(5, 1fr);
        gap: 12px;
      }

      .share-option-icon {
        width: 52px;
        height: 52px;
        font-size: 24px;
      }

      .share-option-label {
        font-size: 11px;
      }

      .share-modal {
        padding: 24px 16px;
      }
    }
  `;
}

/**
 * Get share modal HTML
 */
export function getShareModalHTML(): string {
  return `
    <!-- Share Modal -->
    <div class="share-modal-overlay" id="shareModalOverlay">
      <div class="share-modal">
        <div class="share-modal-header">
          <div class="share-modal-title">명함 전달 방법을 선택해주세요</div>
        </div>

        <div class="share-options">
          <!-- SMS -->
          <div class="share-option" onclick="shareViaSMS()">
            <div class="share-option-icon sms">
              <i class="fas fa-comment-dots"></i>
            </div>
            <div class="share-option-label">문자</div>
          </div>

          <!-- KakaoTalk -->
          <div class="share-option" onclick="shareViaKakao()">
            <div class="share-option-icon kakao">
              <i class="fas fa-comment"></i>
            </div>
            <div class="share-option-label">카카오톡</div>
          </div>

          <!-- Copy Link -->
          <div class="share-option" onclick="shareViaCopyLink()">
            <div class="share-option-icon link">
              <i class="fas fa-link"></i>
            </div>
            <div class="share-option-label">링크복사</div>
          </div>

          <!-- QR Code -->
          <div class="share-option" onclick="shareViaQR()">
            <div class="share-option-icon qr">
              <i class="fas fa-qrcode"></i>
            </div>
            <div class="share-option-label">QR코드</div>
          </div>

          <!-- More (Web Share API) -->
          <div class="share-option" onclick="shareViaMore()">
            <div class="share-option-icon more">
              <i class="fas fa-ellipsis-h"></i>
            </div>
            <div class="share-option-label">더 보기</div>
          </div>
        </div>

        <button class="share-modal-cancel" onclick="closeShareModal()">
          취소
        </button>
      </div>
    </div>

    <!-- QR Code Modal -->
    <div class="qr-modal" id="qrModal">
      <div class="qr-modal-content">
        <div class="qr-modal-title">QR 코드</div>
        <div class="qr-modal-desc">QR 코드를 스캔하여 명함을 확인하세요</div>
        <div class="qr-code-container">
          <div id="qrcodeCanvas"></div>
        </div>
        <button class="qr-modal-close" onclick="closeQRModal()">닫기</button>
      </div>
    </div>
  `;
}

/**
 * Get share modal script
 */
export function getShareModalScript(options: ShareModalOptions): string {
  const { cardUrl, cardName, cardHeadline = '' } = options;
  
  return `
    <script src="https://cdn.jsdelivr.net/npm/qrcodejs@1.0.0/qrcode.min.js"></script>
    <script>
      let qrCodeInstance = null;

      // Open share modal
      function openShareModal() {
        document.getElementById('shareModalOverlay').classList.add('active');
        document.body.style.overflow = 'hidden';
      }

      // Close share modal
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

      // Share via SMS
      function shareViaSMS() {
        const text = '${cardName}님의 METI 디지털 명함입니다: ${cardUrl}';
        window.location.href = 'sms:?body=' + encodeURIComponent(text);
        closeShareModal();
      }

      // Share via KakaoTalk (placeholder - requires Kakao SDK)
      function shareViaKakao() {
        alert('카카오톡 공유 기능은 준비 중입니다.');
        closeShareModal();
      }

      // Share via Copy Link
      async function shareViaCopyLink() {
        try {
          await navigator.clipboard.writeText('${cardUrl}');
          alert('✅ 링크가 복사되었습니다!');
          closeShareModal();
        } catch (error) {
          const textarea = document.createElement('textarea');
          textarea.value = '${cardUrl}';
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
          text: '${cardUrl}',
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
              title: '${cardName} - METI',
              text: '${cardHeadline || '디지털 명함'}',
              url: '${cardUrl}'
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
  `;
}
