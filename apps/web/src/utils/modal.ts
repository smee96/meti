/**
 * Modal Utility for METI
 * Replaces native alert() and confirm() with custom modals
 */

export interface ModalOptions {
  title?: string;
  message: string;
  type?: 'info' | 'success' | 'error' | 'warning' | 'confirm';
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export const ModalStyles = `
/* Modal Overlay */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    animation: fadeIn 0.2s ease;
    padding: 20px;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

/* Modal Container */
.modal-container {
    background: white;
    border-radius: 16px;
    max-width: 400px;
    width: 100%;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    animation: slideUp 0.3s ease;
    overflow: hidden;
}

@keyframes slideUp {
    from {
        transform: translateY(30px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}

/* Modal Header */
.modal-header {
    padding: 24px 24px 16px;
    border-bottom: 1px solid #eee;
}

.modal-title {
    font-size: 20px;
    font-weight: 700;
    color: #1a1a1a;
    margin: 0;
    display: flex;
    align-items: center;
    gap: 10px;
}

.modal-icon {
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 16px;
}

.modal-icon.info {
    background: #E3F2FD;
    color: #1976D2;
}

.modal-icon.success {
    background: #E8F5E9;
    color: #388E3C;
}

.modal-icon.error {
    background: #FFEBEE;
    color: #D32F2F;
}

.modal-icon.warning {
    background: #FFF3E0;
    color: #F57C00;
}

.modal-icon.confirm {
    background: #FFF3E0;
    color: #F57C00;
}

/* Modal Body */
.modal-body {
    padding: 24px;
    font-size: 15px;
    line-height: 1.6;
    color: #555;
}

/* Modal Footer */
.modal-footer {
    padding: 16px 24px;
    display: flex;
    gap: 10px;
    justify-content: flex-end;
    background: #fafafa;
}

.modal-btn {
    padding: 10px 24px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    border: none;
    cursor: pointer;
    transition: all 0.2s;
    font-family: 'Noto Sans KR', sans-serif;
}

.modal-btn-cancel {
    background: white;
    color: #666;
    border: 1px solid #ddd;
}

.modal-btn-cancel:hover {
    background: #f5f5f5;
}

.modal-btn-confirm {
    background: #0A2260;
    color: white;
}

.modal-btn-confirm:hover {
    background: #081a4d;
    transform: translateY(-1px);
}

.modal-btn-confirm.error {
    background: #D32F2F;
}

.modal-btn-confirm.error:hover {
    background: #B71C1C;
}

.modal-btn-confirm.success {
    background: #388E3C;
}

.modal-btn-confirm.success:hover {
    background: #2E7D32;
}

/* Mobile Responsive */
@media (max-width: 480px) {
    .modal-container {
        margin: 0 16px;
        max-width: calc(100% - 32px);
    }
    
    .modal-header {
        padding: 20px 20px 12px;
    }
    
    .modal-title {
        font-size: 18px;
    }
    
    .modal-body {
        padding: 20px;
        font-size: 14px;
    }
    
    .modal-footer {
        padding: 12px 20px;
        flex-direction: column-reverse;
    }
    
    .modal-btn {
        width: 100%;
        padding: 12px 20px;
    }
}
`;

export const ModalScript = `
class Modal {
    constructor() {
        this.currentModal = null;
    }

    show(options) {
        // Remove existing modal
        this.close();

        const {
            title = null,
            message,
            type = 'info',
            confirmText = '확인',
            cancelText = '취소',
            onConfirm = null,
            onCancel = null
        } = options;

        const isConfirm = type === 'confirm';
        
        // Get icon based on type
        const icons = {
            info: '<i class="fas fa-info-circle"></i>',
            success: '<i class="fas fa-check-circle"></i>',
            error: '<i class="fas fa-times-circle"></i>',
            warning: '<i class="fas fa-exclamation-triangle"></i>',
            confirm: '<i class="fas fa-question-circle"></i>'
        };

        // Create modal HTML
        const modalHTML = \`
            <div class="modal-overlay" id="customModal" onclick="if(event.target === this) window.modal.close()">
                <div class="modal-container">
                    \${title || type !== 'info' ? \`
                    <div class="modal-header">
                        <h3 class="modal-title">
                            <span class="modal-icon \${type}">
                                \${icons[type]}
                            </span>
                            \${title || this.getDefaultTitle(type)}
                        </h3>
                    </div>
                    \` : ''}
                    <div class="modal-body">
                        \${message}
                    </div>
                    <div class="modal-footer">
                        \${isConfirm ? \`<button class="modal-btn modal-btn-cancel" onclick="window.modal.handleCancel()">\${cancelText}</button>\` : ''}
                        <button class="modal-btn modal-btn-confirm \${type}" onclick="window.modal.handleConfirm()">\${confirmText}</button>
                    </div>
                </div>
            </div>
        \`;

        // Insert modal
        const modalElement = document.createElement('div');
        modalElement.innerHTML = modalHTML;
        document.body.appendChild(modalElement.firstElementChild);
        this.currentModal = document.getElementById('customModal');

        // Store callbacks
        this.onConfirm = onConfirm;
        this.onCancel = onCancel;

        // Prevent body scroll
        document.body.style.overflow = 'hidden';

        // Return promise for async/await support
        return new Promise((resolve) => {
            this.resolve = resolve;
        });
    }

    getDefaultTitle(type) {
        const titles = {
            info: '알림',
            success: '성공',
            error: '오류',
            warning: '경고',
            confirm: '확인'
        };
        return titles[type] || '알림';
    }

    handleConfirm() {
        if (this.onConfirm) {
            this.onConfirm();
        }
        if (this.resolve) {
            this.resolve(true);
        }
        this.close();
    }

    handleCancel() {
        if (this.onCancel) {
            this.onCancel();
        }
        if (this.resolve) {
            this.resolve(false);
        }
        this.close();
    }

    close() {
        if (this.currentModal) {
            this.currentModal.remove();
            this.currentModal = null;
            document.body.style.overflow = '';
        }
        this.onConfirm = null;
        this.onCancel = null;
        this.resolve = null;
    }
}

// Create global modal instance
if (typeof window !== 'undefined') {
    window.modal = new Modal();
}

// Helper functions for backward compatibility
window.showModal = (message, type = 'info') => {
    return window.modal.show({ message, type });
};

window.showConfirm = (message, onConfirm, onCancel) => {
    return window.modal.show({
        message,
        type: 'confirm',
        onConfirm,
        onCancel
    });
};
`;

export function getModalHTML(): string {
  return `
    <style>${ModalStyles}</style>
    <script>${ModalScript}</script>
  `;
}
