import { Hono } from 'hono';
import type { Env } from '../types';

const admin = new Hono<{ Bindings: Env }>();

// Admin dashboard - simple statistics only
admin.get('/', async (c) => {
  const { DB } = c.env;
  
  try {
    // Get statistics
    const usersResult = await DB.prepare('SELECT COUNT(*) as count FROM users').first();
    const cardsResult = await DB.prepare('SELECT COUNT(*) as count FROM cards').first();
    const todayUsersResult = await DB.prepare(
      `SELECT COUNT(*) as count FROM users WHERE DATE(created_at) = DATE('now')`
    ).first();
    
    const totalUsers = usersResult?.count || 0;
    const totalCards = cardsResult?.count || 0;
    const todayUsers = todayUsersResult?.count || 0;

    return c.html(`
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>METI Admin</title>
    
    <!-- Open Graph Meta Tags -->
    <meta property="og:title" content="METI Admin Dashboard">
    <meta property="og:description" content="METI 관리자 대시보드 - 명함 서비스 통계">
    <meta property="og:image" content="https://meti-3gk.pages.dev/og-image.png">
    <meta property="og:url" content="https://meti-3gk.pages.dev/admin">
    <meta property="og:type" content="website">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="METI Admin Dashboard">
    <meta name="twitter:description" content="METI 관리자 대시보드 - 명함 서비스 통계">
    <meta name="twitter:image" content="https://meti-3gk.pages.dev/og-image.png">
    
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <style>
        body { font-family: sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh; padding: 20px; }
        .container { max-width: 1200px; margin: 0 auto; }
        .card { background: white; border-radius: 12px; padding: 24px; margin-bottom: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 20px; }
        .stat-card { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 12px; }
        .stat-label { font-size: 14px; opacity: 0.9; margin-bottom: 8px; }
        .stat-value { font-size: 32px; font-weight: 700; }
    </style>
</head>
<body>
    <div class="container">
        <div class="card">
            <h1 style="font-size: 28px; font-weight: 700; margin-bottom: 8px; color: #1e293b;">
                <i class="fas fa-chart-line" style="color: #667eea;"></i> METI Admin Dashboard
            </h1>
            <p style="color: #64748b; margin-bottom: 20px;">명함 서비스 통계</p>
            
            <div class="stats">
                <div class="stat-card">
                    <div class="stat-label">총 가입자</div>
                    <div class="stat-value">${totalUsers.toLocaleString()}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">총 명함</div>
                    <div class="stat-value">${totalCards.toLocaleString()}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">오늘 가입</div>
                    <div class="stat-value">${todayUsers.toLocaleString()}</div>
                </div>
            </div>
        </div>

        <div class="card">
            <h2 style="font-size: 20px; font-weight: 600; margin-bottom: 12px; color: #1e293b;">
                <i class="fas fa-info-circle" style="color: #667eea;"></i> 안내
            </h2>
            <p style="color: #64748b; line-height: 1.6;">
                METI는 디지털 명함 서비스입니다.<br>
                게임 서비스는 별도 플랫폼으로 분리되었습니다.
            </p>
        </div>
    </div>
</body>
</html>
    `);
  } catch (error) {
    console.error('Admin page error:', error);
    return c.html('<h1>Error loading admin page</h1>');
  }
});

export default admin;
