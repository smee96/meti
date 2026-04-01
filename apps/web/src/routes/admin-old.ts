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
            max-width: 1600px;
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

        .tabs {
            display: flex;
            gap: 12px;
            margin-bottom: 24px;
            border-bottom: 2px solid rgba(255, 255, 255, 0.2);
        }

        .tab-btn {
            padding: 12px 24px;
            background: transparent;
            border: none;
            color: rgba(255, 255, 255, 0.6);
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            border-bottom: 3px solid transparent;
            transition: all 0.3s;
        }

        .tab-btn.active {
            color: white;
            border-bottom-color: #ffc107;
        }

        .tab-content {
            display: none;
        }

        .tab-content.active {
            display: block;
        }

        .config-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 16px;
            margin-bottom: 24px;
        }

        .config-item {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }

        .config-label {
            font-size: 14px;
            font-weight: 600;
            opacity: 0.9;
        }

        .config-input {
            padding: 10px 12px;
            background: rgba(255, 255, 255, 0.9);
            border: 1px solid rgba(255, 255, 255, 0.3);
            border-radius: 8px;
            font-size: 14px;
            color: #333;
        }

        .farm-table {
            width: 100%;
            border-collapse: collapse;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 12px;
            overflow: hidden;
            margin-bottom: 20px;
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

        .results-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 16px;
            margin-top: 24px;
            padding: 20px;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 12px;
        }

        .result-item {
            display: flex;
            flex-direction: column;
            gap: 4px;
        }

        .result-label {
            font-size: 13px;
            opacity: 0.7;
        }

        .result-value {
            font-size: 20px;
            font-weight: 700;
            color: #ffc107;
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

        .toggle-btn {
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            color: white;
            padding: 8px 16px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 13px;
            margin-bottom: 12px;
        }

        .toggle-btn:hover {
            background: rgba(255, 255, 255, 0.2);
        }

        .collapsible {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease;
        }

        .collapsible.open {
            max-height: 2000px;
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
                HappyTree 농장 시뮬레이터 & 설정
            </div>

            <div class="success-message" id="successMessage">
                <i class="fas fa-check-circle"></i>
                저장되었습니다!
            </div>

            <!-- Tabs -->
            <div class="tabs">
                ${[1, 2, 3, 4].map(farmId => 
                  `<button class="tab-btn ${farmId === 1 ? 'active' : ''}" onclick="switchTab(${farmId})">
                    농장 ${farmId}
                  </button>`
                ).join('')}
            </div>

            <!-- Tab Contents -->
            ${[1, 2, 3, 4].map(farmId => {
              const levels = farmLevels.results?.filter((l: any) => l.farm_id === farmId) || [];
              
              return `
                <div class="tab-content ${farmId === 1 ? 'active' : ''}" id="tab${farmId}">
                  <h3 style="margin-bottom: 16px;">⚙️ 기본 설정</h3>
                  <div class="config-grid">
                    <div class="config-item">
                      <label class="config-label">입장 인원</label>
                      <input type="number" class="config-input" id="f${farmId}_users" value="100" min="1">
                    </div>
                    <div class="config-item">
                      <label class="config-label">화분 개수</label>
                      <input type="number" class="config-input" id="f${farmId}_pots" value="3" min="1">
                    </div>
                    <div class="config-item">
                      <label class="config-label">별 가격 ($)</label>
                      <input type="number" class="config-input" id="f${farmId}_star_price" value="2" min="0" step="0.01">
                    </div>
                    <div class="config-item">
                      <label class="config-label">초기 하트</label>
                      <input type="number" class="config-input" id="f${farmId}_initial_hearts" value="300000" min="0">
                    </div>
                  </div>

                  <button class="toggle-btn" onclick="toggleLevelConfig(${farmId})">
                    <i class="fas fa-cog"></i> 레벨 설정 펼치기/접기
                  </button>

                  <div class="collapsible" id="levelConfig${farmId}">
                    <form id="farmForm${farmId}">
                      <table class="farm-table">
                        <thead>
                          <tr>
                            <th>레벨</th>
                            <th>필요 하트허용치</th>
                            <th>필요 별</th>
                            <th>보상 코인</th>
                            <th>보상 하트</th>
                          </tr>
                        </thead>
                        <tbody>
                          ${Array.from({ length: 8 }, (_, i) => i + 1).map(level => {
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
                          <tr style="background: rgba(255, 193, 7, 0.2); font-weight: 600;">
                            <td>합계</td>
                            <td id="f${farmId}_total_hearts">-</td>
                            <td id="f${farmId}_total_stars">-</td>
                            <td id="f${farmId}_total_coins">-</td>
                            <td id="f${farmId}_total_reward">-</td>
                          </tr>
                        </tbody>
                      </table>
                    </form>
                  </div>

                  <div class="actions">
                    <button class="btn btn-primary" onclick="calculate(${farmId})">
                      <i class="fas fa-calculator"></i>
                      계산하기
                    </button>
                    <button class="btn btn-primary" onclick="saveFarmLevels(${farmId})">
                      <i class="fas fa-save"></i>
                      레벨 설정 저장
                    </button>
                    <button class="btn btn-secondary" onclick="location.reload()">
                      <i class="fas fa-undo"></i>
                      초기화
                    </button>
                  </div>

                  <!-- Results -->
                  <div id="results${farmId}" style="display: none;">
                    <h3 style="margin-top: 32px; margin-bottom: 16px;">💰 플랫폼 수익</h3>
                    <div class="results-grid">
                      <div class="result-item">
                        <div class="result-label">별 판매</div>
                        <div class="result-value" id="f${farmId}_stars_sold">-</div>
                      </div>
                      <div class="result-item">
                        <div class="result-label">별 수익</div>
                        <div class="result-value" id="f${farmId}_star_revenue">-</div>
                      </div>
                      <div class="result-item">
                        <div class="result-label">코인 지출</div>
                        <div class="result-value" id="f${farmId}_coin_expense">-</div>
                      </div>
                      <div class="result-item">
                        <div class="result-label">순수익</div>
                        <div class="result-value" id="f${farmId}_net_profit">-</div>
                      </div>
                      <div class="result-item">
                        <div class="result-label">수익률</div>
                        <div class="result-value" id="f${farmId}_profit_rate">-</div>
                      </div>
                    </div>

                    <h3 style="margin-top: 32px; margin-bottom: 16px;">👤 1번 사용자 수익</h3>
                    <div class="results-grid">
                      <div class="result-item">
                        <div class="result-label">화분 수</div>
                        <div class="result-value" id="f${farmId}_user1_pots">-</div>
                      </div>
                      <div class="result-item">
                        <div class="result-label">최고 레벨</div>
                        <div class="result-value" id="f${farmId}_user1_level">-</div>
                      </div>
                      <div class="result-item">
                        <div class="result-label">투자금</div>
                        <div class="result-value" id="f${farmId}_user1_investment">-</div>
                      </div>
                      <div class="result-item">
                        <div class="result-label">수익금</div>
                        <div class="result-value" id="f${farmId}_user1_revenue">-</div>
                      </div>
                      <div class="result-item">
                        <div class="result-label">ROI</div>
                        <div class="result-value" id="f${farmId}_user1_roi">-</div>
                      </div>
                    </div>
                  </div>
                </div>
              `;
            }).join('')}
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
    <script>
        // Tab switching
        function switchTab(farmId) {
            document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
            
            event.target.classList.add('active');
            document.getElementById(\`tab\${farmId}\`).classList.add('active');
        }

        // Toggle level config
        function toggleLevelConfig(farmId) {
            const config = document.getElementById(\`levelConfig\${farmId}\`);
            config.classList.toggle('open');
        }

        // Calculate simulation
        function calculate(farmId) {
            const users = parseInt(document.getElementById(\`f\${farmId}_users\`).value);
            const pots = parseInt(document.getElementById(\`f\${farmId}_pots\`).value);
            const starPrice = parseFloat(document.getElementById(\`f\${farmId}_star_price\`).value);
            const initialHearts = parseInt(document.getElementById(\`f\${farmId}_initial_hearts\`).value);
            
            // Get level data
            const levels = [];
            let totalHearts = 0, totalStars = 0, totalCoins = 0, totalReward = 0;
            
            for (let level = 1; level <= 8; level++) {
                const hearts = parseInt(document.querySelector(\`[name="f\${farmId}_l\${level}_hearts"]\`).value) || 0;
                const stars = parseInt(document.querySelector(\`[name="f\${farmId}_l\${level}_stars"]\`).value) || 0;
                const coins = parseInt(document.querySelector(\`[name="f\${farmId}_l\${level}_coins"]\`).value) || 0;
                const reward = parseInt(document.querySelector(\`[name="f\${farmId}_l\${level}_reward"]\`).value) || 0;
                
                levels.push({ hearts, stars, coins, reward });
                totalHearts += hearts;
                totalStars += stars;
                totalCoins += coins;
                totalReward += reward;
            }
            
            // Update totals
            document.getElementById(\`f\${farmId}_total_hearts\`).textContent = totalHearts.toLocaleString();
            document.getElementById(\`f\${farmId}_total_stars\`).textContent = totalStars.toLocaleString();
            document.getElementById(\`f\${farmId}_total_coins\`).textContent = totalCoins.toLocaleString();
            document.getElementById(\`f\${farmId}_total_reward\`).textContent = totalReward.toLocaleString();
            
            // Calculate platform revenue
            const totalStarsSold = users * totalStars;
            const starRevenue = totalStarsSold * starPrice;
            const coinExpense = users * totalCoins;
            const netProfit = starRevenue - coinExpense;
            const profitRate = ((netProfit / starRevenue) * 100).toFixed(1);
            
            document.getElementById(\`f\${farmId}_stars_sold\`).textContent = totalStarsSold.toLocaleString();
            document.getElementById(\`f\${farmId}_star_revenue\`).textContent = \`$\${starRevenue.toLocaleString()}\`;
            document.getElementById(\`f\${farmId}_coin_expense\`).textContent = \`$\${coinExpense.toLocaleString()}\`;
            document.getElementById(\`f\${farmId}_net_profit\`).textContent = \`$\${netProfit.toLocaleString()}\`;
            document.getElementById(\`f\${farmId}_profit_rate\`).textContent = \`\${profitRate}%\`;
            
            // Calculate user 1 revenue
            const user1Investment = totalStars * starPrice;
            const user1Revenue = totalCoins;
            const user1ROI = (((user1Revenue - user1Investment) / user1Investment) * 100).toFixed(1);
            
            document.getElementById(\`f\${farmId}_user1_pots\`).textContent = pots;
            document.getElementById(\`f\${farmId}_user1_level\`).textContent = \`Lv. 8\`;
            document.getElementById(\`f\${farmId}_user1_investment\`).textContent = \`$\${user1Investment.toFixed(2)}\`;
            document.getElementById(\`f\${farmId}_user1_revenue\`).textContent = \`$\${user1Revenue.toLocaleString()}\`;
            document.getElementById(\`f\${farmId}_user1_roi\`).textContent = \`\${user1ROI}%\`;
            
            // Show results
            document.getElementById(\`results\${farmId}\`).style.display = 'block';
        }

        // Save farm levels
        async function saveFarmLevels(farmId) {
            const levels = [];
            
            for (let level = 1; level <= 8; level++) {
                levels.push({
                    farm_id: farmId,
                    level: level,
                    hearts_required: parseInt(document.querySelector(\`[name="f\${farmId}_l\${level}_hearts"]\`).value) || 0,
                    stars: parseInt(document.querySelector(\`[name="f\${farmId}_l\${level}_stars"]\`).value) || 0,
                    coins: parseInt(document.querySelector(\`[name="f\${farmId}_l\${level}_coins"]\`).value) || 0,
                    hearts_reward: parseInt(document.querySelector(\`[name="f\${farmId}_l\${level}_reward"]\`).value) || 0
                });
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
        }

        // Initialize: calculate totals on load
        for (let farmId = 1; farmId <= 4; farmId++) {
            const form = document.getElementById(\`farmForm\${farmId}\`);
            if (form) {
                form.addEventListener('input', () => {
                    let totalHearts = 0, totalStars = 0, totalCoins = 0, totalReward = 0;
                    
                    for (let level = 1; level <= 8; level++) {
                        totalHearts += parseInt(document.querySelector(\`[name="f\${farmId}_l\${level}_hearts"]\`).value) || 0;
                        totalStars += parseInt(document.querySelector(\`[name="f\${farmId}_l\${level}_stars"]\`).value) || 0;
                        totalCoins += parseInt(document.querySelector(\`[name="f\${farmId}_l\${level}_coins"]\`).value) || 0;
                        totalReward += parseInt(document.querySelector(\`[name="f\${farmId}_l\${level}_reward"]\`).value) || 0;
                    }
                    
                    document.getElementById(\`f\${farmId}_total_hearts\`).textContent = totalHearts.toLocaleString();
                    document.getElementById(\`f\${farmId}_total_stars\`).textContent = totalStars.toLocaleString();
                    document.getElementById(\`f\${farmId}_total_coins\`).textContent = totalCoins.toLocaleString();
                    document.getElementById(\`f\${farmId}_total_reward\`).textContent = totalReward.toLocaleString();
                });
            }
        }
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
