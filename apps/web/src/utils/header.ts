/**
 * Common Header Component Utility
 * Provides consistent header with back button across all pages
 */

interface HeaderOptions {
  title?: string;
  showBackButton?: boolean;
  backUrl?: string;
  showUserInfo?: boolean;
  showNavigation?: boolean;
  currentPage?: 'cards' | 'wallet' | 'game' | null;
}

/**
 * Generate common header styles
 */
export function getHeaderStyles(): string {
  return `
    .meti-header {
      background: rgba(255, 255, 255, 0.05);
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      padding: 16px 20px;
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
      gap: 16px;
      flex: 1;
    }

    .header-center {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;
    }

    .header-right {
      display: flex;
      align-items: center;
      gap: 16px;
      justify-content: flex-end;
      flex: 1;
    }

    .back-button {
      width: 36px;
      height: 36px;
      border: none;
      background: rgba(255, 255, 255, 0.1);
      color: white;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s;
      font-size: 18px;
    }

    .back-button:hover {
      background: rgba(255, 255, 255, 0.2);
    }

    .back-button:active {
      transform: scale(0.95);
    }

    .header-title {
      font-size: 18px;
      font-weight: 600;
      color: white;
    }

    .logo {
      font-family: 'Tenor Sans', serif;
      font-size: 24px;
      letter-spacing: 6px;
      color: white;
      cursor: pointer;
      text-decoration: none;
    }

    .nav-links {
      display: flex;
      gap: 20px;
    }

    .nav-link {
      color: rgba(255, 255, 255, 0.7);
      text-decoration: none;
      font-size: 14px;
      transition: color 0.3s;
      white-space: nowrap;
    }

    .nav-link:hover,
    .nav-link.active {
      color: white;
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 6px 12px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 20px;
      cursor: pointer;
      transition: all 0.3s;
    }

    .user-info:hover {
      background: rgba(255, 255, 255, 0.15);
    }

    .user-avatar {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
    }

    .user-name {
      font-size: 13px;
      font-weight: 500;
    }

    /* Mobile responsive */
    @media (max-width: 768px) {
      .meti-header {
        padding: 12px 16px;
      }

      .nav-links {
        display: none;
      }

      .header-title {
        font-size: 16px;
      }

      .logo {
        font-size: 20px;
        letter-spacing: 4px;
      }

      .user-name {
        display: none;
      }

      .user-info {
        padding: 6px;
        border-radius: 50%;
      }
    }
  `;
}

/**
 * Generate common header HTML
 */
export function getHeaderHTML(options: HeaderOptions = {}): string {
  const {
    title = '',
    showBackButton = false,
    backUrl = '',
    showUserInfo = true,
    showNavigation = true,
    currentPage = null
  } = options;

  let leftContent = '';
  
  // Back button (if enabled)
  if (showBackButton) {
    const backAction = backUrl 
      ? `onclick="window.location.href='${backUrl}'"`
      : `onclick="window.history.back()"`;
    
    leftContent = `
      <button class="back-button" ${backAction} aria-label="뒤로가기">
        <i class="fas fa-arrow-left"></i>
      </button>
    `;
  }
  
  // Logo or title
  if (title) {
    leftContent += `<div class="header-title">${title}</div>`;
  } else if (!showBackButton) {
    leftContent += `<a href="/" class="logo">METI</a>`;
  }

  // Navigation links
  let centerContent = '';
  if (showNavigation) {
    centerContent = `
      <nav class="nav-links">
        <a href="/my/cards" class="nav-link ${currentPage === 'cards' ? 'active' : ''}">내 명함</a>
        <a href="/my/wallet" class="nav-link ${currentPage === 'wallet' ? 'active' : ''}">명함 지갑</a>
        <a href="/game" class="nav-link ${currentPage === 'game' ? 'active' : ''}">행복나무</a>
      </nav>
    `;
  }

  // User info
  let rightContent = '';
  if (showUserInfo) {
    rightContent = `
      <div class="user-info" onclick="window.location.href='/my/profile'">
        <div class="user-avatar">
          <i class="fas fa-user"></i>
        </div>
        <div class="user-name" id="userName">사용자</div>
      </div>
    `;
  }

  return `
    <div class="meti-header">
      <div class="header-left">
        ${leftContent}
      </div>
      ${centerContent ? `<div class="header-center">${centerContent}</div>` : ''}
      <div class="header-right">
        ${rightContent}
      </div>
    </div>
  `;
}

/**
 * Generate header script for user info loading
 */
export function getHeaderScript(): string {
  return `
    <script>
      // Load user info
      async function loadUserInfo() {
        try {
          const token = localStorage.getItem('meti_token') || sessionStorage.getItem('meti_token');
          if (!token) return;

          const response = await fetch('/api/auth/me', {
            headers: { 'Authorization': 'Bearer ' + token }
          });

          if (response.ok) {
            const data = await response.json();
            const userName = document.getElementById('userName');
            if (userName && data.user && data.user.name) {
              userName.textContent = data.user.name;
            }
          }
        } catch (error) {
          console.error('Failed to load user info:', error);
        }
      }

      // Load on page ready
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadUserInfo);
      } else {
        loadUserInfo();
      }
    </script>
  `;
}
