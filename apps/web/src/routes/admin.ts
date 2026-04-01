import { Hono } from 'hono';
import type { Env } from '../types';
import { Database } from '../lib/db';

const admin = new Hono<{ Bindings: Env }>();

// Admin dashboard
admin.get('/', async (c) => {
  const { DB } = c.env;
  const db = new Database(DB);
  
  try {
    // Get statistics
    const usersResult = await DB.prepare('SELECT COUNT(*) as count FROM users').first();
    const cardsResult = await DB.prepare('SELECT COUNT(*) as count FROM cards').first();
    const todayUsersResult = await DB.prepare(
      `SELECT COUNT(*) as count FROM users 
       WHERE DATE(created_at) = DATE('now')`
    ).first();
    
    const totalUsers = usersResult?.count || 0;
    const totalCards = cardsResult?.count || 0;
    const todayUsers = todayUsersResult?.count || 0;
    
    // Get farm levels
    const farmLevels = await DB.prepare(
      'SELECT * FROM game_farm_levels ORDER BY farm_id, level'
    ).all();

    return c.html(`
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>METI Admin - 관리자 페이지</title>
    <link rel="preload" href="/static/fonts/Montserrat-Bold.woff2" as="font" type="font/woff2" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <style>
        @font-face {
            font-family: 'Montserrat';
            src: url('/static/fonts/Montserrat-Bold.woff2') format('woff2');
            font-weight: 700;
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
            padding: 20px;
            color: white;
        }

        .container {
            max-width: 1400px;
            margin: 0 auto;
        }

        .header {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            padding: 24px 32px;
            border-radius: 16px;
            margin-bottom: 32px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .logo {
            font-family: 'Montserrat', sans-serif;
            font-size: 28px;
            letter-spacing: 6px;
            font-weight: 700;
        }

        .title {
            font-size: 18px;
            opacity: 0.9;
        }

        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-bottom: 32px;
        }

        .stat-card {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            padding: 24px;
            border-radius: 16px;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .stat-icon {
            font-size: 32px;
            margin-bottom: 12px;
            opacity: 0.8;
        }

        .stat-value {
            font-size: 36px;
            font-weight: 700;
            margin-bottom: 8px;
        }

        .stat-label {
            font-size: 14px;
            opacity: 0.7;
        }

        .section {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            padding: 32px;
            border-radius: 16px;
            margin-bottom: 32px;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .section-title {
            font-size: 20px;
            font-weight: 600;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .farm-table {
            width: 100%;
            border-collapse: collapse;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 12px;
            overflow: hidden;
        }

        .farm-table th,
        .farm-table td {
            padding: 12px 16px;
            text-align: left;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .farm-table th {
            background: rgba(255, 255, 255, 0.1);
            font-weight: 600;
            font-size: 14px;
        }

        .farm-table td {
            font-size: 14px;
        }

        .farm-table tr:hover {
            background: rgba(255, 255, 255, 0.05);
        }

        .farm-table input {
            width: 80px;
            padding: 6px 8px;
            background: rgba(255, 255, 255, 0.9);
            border: 1px solid rgba(255, 255, 255, 0.3);
            border-radius: 6px;
            font-size: 14px;
            color: #333;
        }

        .farm-header {
            font-size: 18px;
            font-weight: 600;
            padding: 16px;
            background: rgba(255, 255, 255, 0.15);
            margin-top: 20px;
        }

        .btn {
            padding: 10px 24px;
            border: none;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
            display: inline-flex;
            align-items: center;
            gap: 8px;
        }

        .btn-primary {
            background: linear-gradient(135deg, #ffc107 0%, #ffcd38 100%);
            color: #0A2260;
        }

        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(255, 193, 7, 0.4);
        }

        .btn-secondary {
            background: rgba(255, 255, 255, 0.2);
            color: white;
        }

        .btn-secondary:hover {
            background: rgba(255, 255, 255, 0.3);
        }

        .actions {
            display: flex;
            gap: 12px;
            margin-top: 20px;
        }

        .success-message {
            background: rgba(76, 175, 80, 0.2);
            border: 1px solid rgba(76, 175, 80, 0.5);
            color: #a5d6a7;
            padding: 12px 16px;
            border-radius: 8px;
            margin-bottom: 20px;
            display: none;
        }

        .success-message.show {
            display: block;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div>
                <div class="logo">METI</div>
                <div class="title">관리자 대시보드</div>
            </div>
            <button class="btn btn-secondary" onclick="window.location.href='/'">
                <i class="fas fa-home"></i>
                메인으로
            </button>
        </div>

        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-icon">
                    <i class="fas fa-users"></i>
                </div>
                <div class="stat-value">${totalUsers}</div>
                <div class="stat-label">총 가입자 수</div>
            </div>

            <div class="stat-card">
                <div class="stat-icon">
                    <i class="fas fa-id-card"></i>
                </div>
                <div class="stat-value">${totalCards}</div>
                <div class="stat-label">총 명함 수</div>
            </div>

            <div class="stat-card">
                <div class="stat-icon">
                    <i class="fas fa-user-plus"></i>
                </div>
                <div class="stat-value">${todayUsers}</div>
                <div class="stat-label">오늘 가입자</div>
            </div>

            <div class="stat-card">
                <div class="stat-icon">
                    <i class="fas fa-chart-line"></i>
                </div>
                <div class="stat-value">${totalCards > 0 ? (totalCards / totalUsers).toFixed(1) : 0}</div>
                <div class="stat-label">평균 명함 수</div>
            </div>
        </div>

        <div class="section">
            <div class="section-title">
                <i class="fas fa-seedling"></i>
                HappyTree 농장 레벨 보상 설정
            </div>

            <div class="success-message" id="successMessage">
                <i class="fas fa-check-circle"></i>
                저장되었습니다!
            </div>

            <form id="farmLevelsForm">
                ${[1, 2, 3, 4].map(farmId => {
                  const levels = farmLevels.results?.filter((l: any) => l.farm_id === farmId) || [];
                  return `
                    <div class="farm-header">농장 ${farmId}</div>
                    <table class="farm-table">
                        <thead>
                            <tr>
                                <th>레벨</th>
                                <th>필요 하트</th>
                                <th>별 보상</th>
                                <th>코인 보상</th>
                                <th>하트 보상</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${Array.from({ length: 9 }, (_, i) => i).map(level => {
                              const levelData = levels.find((l: any) => l.level === level);
                              return `
                                <tr>
                                    <td>Lv. ${level}</td>
                                    <td>
                                        <input type="number" 
                                               name="f${farmId}_l${level}_hearts" 
                                               value="${levelData?.hearts_required || 0}" 
                                               min="0">
                                    </td>
                                    <td>
                                        <input type="number" 
                                               name="f${farmId}_l${level}_stars" 
                                               value="${levelData?.stars || 0}" 
                                               min="0">
                                    </td>
                                    <td>
                                        <input type="number" 
                                               name="f${farmId}_l${level}_coins" 
                                               value="${levelData?.coins || 0}" 
                                               min="0">
                                    </td>
                                    <td>
                                        <input type="number" 
                                               name="f${farmId}_l${level}_reward" 
                                               value="${levelData?.hearts_reward || 0}" 
                                               min="0">
                                    </td>
                                </tr>
                              `;
                            }).join('')}
                        </tbody>
                    </table>
                  `;
                }).join('')}

                <div class="actions">
                    <button type="submit" class="btn btn-primary">
                        <i class="fas fa-save"></i>
                        저장하기
                    </button>
                    <button type="button" class="btn btn-secondary" onclick="location.reload()">
                        <i class="fas fa-undo"></i>
                        초기화
                    </button>
                </div>
            </form>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
    <script>
        document.getElementById('farmLevelsForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(e.target);
            const levels = [];
            
            for (let farmId = 1; farmId <= 4; farmId++) {
                for (let level = 0; level <= 8; level++) {
                    levels.push({
                        farm_id: farmId,
                        level: level,
                        hearts_required: parseInt(formData.get(\`f\${farmId}_l\${level}_hearts\`) || '0'),
                        stars: parseInt(formData.get(\`f\${farmId}_l\${level}_stars\`) || '0'),
                        coins: parseInt(formData.get(\`f\${farmId}_l\${level}_coins\`) || '0'),
                        hearts_reward: parseInt(formData.get(\`f\${farmId}_l\${level}_reward\`) || '0')
                    });
                }
            }
            
            try {
                const response = await axios.post('/api/admin/farm-levels', { levels });
                
                if (response.data.success) {
                    const successMsg = document.getElementById('successMessage');
                    successMsg.classList.add('show');
                    setTimeout(() => {
                        successMsg.classList.remove('show');
                    }, 3000);
                }
            } catch (error) {
                alert('저장 중 오류가 발생했습니다: ' + error.message);
            }
        });
    </script>
</body>
</html>
    `);
  } catch (error) {
    console.error('Admin page error:', error);
    return c.html('<h1>Error loading admin page</h1>');
  }
});

// API endpoint to update farm levels
admin.post('/farm-levels', async (c) => {
  const { DB } = c.env;
  
  try {
    const { levels } = await c.req.json();
    
    // Update each level
    for (const level of levels) {
      await DB.prepare(`
        INSERT OR REPLACE INTO game_farm_levels 
        (farm_id, level, hearts_required, stars, coins, hearts_reward)
        VALUES (?, ?, ?, ?, ?, ?)
      `).bind(
        level.farm_id,
        level.level,
        level.hearts_required,
        level.stars,
        level.coins,
        level.hearts_reward
      ).run();
    }
    
    return c.json({ success: true, message: 'Farm levels updated' });
  } catch (error) {
    console.error('Update farm levels error:', error);
    return c.json({ success: false, error: 'Failed to update' }, 500);
  }
});

export default admin;
