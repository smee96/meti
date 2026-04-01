import { Hono } from 'hono';
import type { Env } from '../types';

const admin = new Hono<{ Bindings: Env }>();

// Admin dashboard
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
    <title>METI Admin</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <style>
        body { font-family: sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh; padding: 20px; }
        .container { max-width: 1400px; margin: 0 auto; }
        .card { background: white; border-radius: 12px; padding: 24px; margin-bottom: 24px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .tabs button { padding: 12px 24px; margin-right: 8px; border: none; background: #e2e8f0; cursor: pointer; border-radius: 8px 8px 0 0; }
        .tabs button.active { background: white; font-weight: 600; }
        .tab-content { display: none; }
        .tab-content.active { display: block; }
        table { width: 100%; border-collapse: collapse; margin: 16px 0; }
        th, td { padding: 12px; text-align: left; border-bottom: 1px solid #e2e8f0; }
        th { background: #f7fafc; font-weight: 600; }
        input[type="number"] { padding: 8px; border: 1px solid #cbd5e0; border-radius: 6px; width: 80px; }
        .btn { padding: 10px 20px; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; }
        .btn-primary { background: #667eea; color: white; }
        .btn-primary:hover { background: #5568d3; }
        .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 24px; }
        .stat-card { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 12px; }
        .result-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin: 16px 0; }
        .result-item { padding: 16px; background: #f7fafc; border-radius: 8px; }
        .result-label { font-size: 14px; color: #64748b; margin-bottom: 4px; }
        .result-value { font-size: 24px; font-weight: 700; color: #1e293b; }
    </style>
</head>
<body>
    <div class="container">
        <div class="card">
            <h1 style="font-size: 28px; font-weight: 700; margin-bottom: 24px; color: #1e293b;">
                <i class="fas fa-seedling" style="color: #667eea;"></i> METI Admin - HappyTree Simulator
            </h1>
            
            <div class="stats">
                <div class="stat-card">
                    <div style="font-size: 14px; opacity: 0.9;">총 가입자</div>
                    <div style="font-size: 32px; font-weight: 700;">${totalUsers}</div>
                </div>
                <div class="stat-card">
                    <div style="font-size: 14px; opacity: 0.9;">총 명함</div>
                    <div style="font-size: 32px; font-weight: 700;">${totalCards}</div>
                </div>
                <div class="stat-card">
                    <div style="font-size: 14px; opacity: 0.9;">오늘 가입</div>
                    <div style="font-size: 32px; font-weight: 700;">${todayUsers}</div>
                </div>
            </div>
        </div>

        <div class="card">
            <div class="tabs">
                ${[1, 2, 3, 4].map(farmId => 
                  `<button class="tab-btn ${farmId === 1 ? 'active' : ''}" onclick="switchTab(${farmId})">농장 ${farmId}</button>`
                ).join('')}
            </div>

            ${[1, 2, 3, 4].map(farmId => {
              const levels = farmLevels.results?.filter((l: any) => l.farm_id === farmId) || [];
              
              return `
                <div class="tab-content ${farmId === 1 ? 'active' : ''}" id="tab${farmId}">
                  <h3 style="margin: 20px 0 12px 0; font-weight: 600;">⚙️ 기본 설정</h3>
                  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 20px;">
                    <div>
                      <label style="display: block; margin-bottom: 4px; font-size: 14px; font-weight: 500;">입장 인원</label>
                      <input type="number" id="f${farmId}_users" value="100" min="1" style="width: 100%;">
                    </div>
                    <div>
                      <label style="display: block; margin-bottom: 4px; font-size: 14px; font-weight: 500;">화분 개수</label>
                      <input type="number" id="f${farmId}_pots" value="3" min="1" style="width: 100%;">
                    </div>
                    <div>
                      <label style="display: block; margin-bottom: 4px; font-size: 14px; font-weight: 500;">별 가격 ($)</label>
                      <input type="number" id="f${farmId}_star_price" value="2" min="0" step="0.01" style="width: 100%;">
                    </div>
                    <div>
                      <label style="display: block; margin-bottom: 4px; font-size: 14px; font-weight: 500;">초기 하트</label>
                      <input type="number" id="f${farmId}_initial_hearts" value="300000" min="0" style="width: 100%;">
                    </div>
                  </div>

                  <details style="margin: 20px 0;">
                    <summary style="cursor: pointer; font-weight: 600; padding: 12px; background: #f7fafc; border-radius: 8px;">📊 레벨 설정</summary>
                    <table style="margin-top: 16px;">
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
                              <td><input type="number" name="f${farmId}_l${level}_hearts" value="${levelData?.hearts_required || 0}" min="0"></td>
                              <td><input type="number" name="f${farmId}_l${level}_stars" value="${levelData?.stars || 0}" min="0"></td>
                              <td><input type="number" name="f${farmId}_l${level}_coins" value="${levelData?.coins || 0}" min="0"></td>
                              <td><input type="number" name="f${farmId}_l${level}_reward" value="${levelData?.hearts_reward || 0}" min="0"></td>
                            </tr>
                          `;
                        }).join('')}
                      </tbody>
                    </table>
                  </details>

                  <div style="display: flex; gap: 12px; margin: 20px 0;">
                    <button class="btn btn-primary" onclick="calculate(${farmId})">
                      <i class="fas fa-calculator"></i> 계산하기
                    </button>
                    <button class="btn btn-primary" onclick="saveFarmLevels(${farmId})">
                      <i class="fas fa-save"></i> 레벨 설정 저장
                    </button>
                  </div>

                  <div id="results${farmId}" style="display: none;"></div>
                </div>
              `;
            }).join('')}
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
    <script>
function switchTab(farmId) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    event.target.classList.add('active');
    document.getElementById(\`tab\${farmId}\`).classList.add('active');
}

function getDescendants(nodeIndex, totalNodes) {
    const descendants = [];
    const queue = [nodeIndex];
    while (queue.length > 0) {
        const current = queue.shift();
        const leftChild = 2 * current;
        const rightChild = 2 * current + 1;
        if (leftChild <= totalNodes) {
            descendants.push(leftChild);
            queue.push(leftChild);
        }
        if (rightChild <= totalNodes) {
            descendants.push(rightChild);
            queue.push(rightChild);
        }
    }
    return descendants;
}

function calculate(farmId) {
    const users = parseInt(document.getElementById(\`f\${farmId}_users\`).value);
    const pots = parseInt(document.getElementById(\`f\${farmId}_pots\`).value);
    const starPrice = parseFloat(document.getElementById(\`f\${farmId}_star_price\`).value);
    const initialHearts = parseInt(document.getElementById(\`f\${farmId}_initial_hearts\`).value);
    
    const levels = [];
    for (let level = 1; level <= 8; level++) {
        const hearts = parseInt(document.querySelector(\`[name="f\${farmId}_l\${level}_hearts"]\`).value) || 0;
        const stars = parseInt(document.querySelector(\`[name="f\${farmId}_l\${level}_stars"]\`).value) || 0;
        const coins = parseInt(document.querySelector(\`[name="f\${farmId}_l\${level}_coins"]\`).value) || 0;
        const reward = parseInt(document.querySelector(\`[name="f\${farmId}_l\${level}_reward"]\`).value) || 0;
        levels.push({ hearts, stars, coins, reward });
    }
    
    const userStates = new Map();
    for (let i = 1; i <= users; i++) {
        userStates.set(i, {
            entryOrder: i,
            heartsBalance: initialHearts,
            heartAllowance: 0,
            pots: Array.from({ length: pots }, (_, idx) => ({ potNumber: idx + 1, currentLevel: 0 })),
            starsPurchased: 0,
            coinsEarned: 0,
            heartsEarned: initialHearts,
            heartsSpent: 0
        });
    }
    
    userStates.forEach((user) => {
        let allowance = user.pots.length;
        const descendants = getDescendants(user.entryOrder, users);
        descendants.forEach(descendantOrder => {
            const descendant = userStates.get(descendantOrder);
            if (descendant) allowance += descendant.pots.length;
        });
        user.heartAllowance = allowance;
    });
    
    userStates.forEach(user => {
        user.pots.forEach(pot => {
            while (pot.currentLevel < 8) {
                const nextLevel = levels[pot.currentLevel];
                if (user.heartAllowance < nextLevel.hearts || user.heartsBalance < nextLevel.hearts) break;
                
                if (nextLevel.stars > 0) user.starsPurchased += nextLevel.stars;
                user.heartsBalance -= nextLevel.hearts;
                user.heartsSpent += nextLevel.hearts;
                user.heartAllowance -= nextLevel.hearts;
                user.heartsBalance += nextLevel.reward;
                user.heartsEarned += nextLevel.reward;
                user.coinsEarned += nextLevel.coins;
                pot.currentLevel++;
            }
        });
    });
    
    let totalStarsSold = 0, totalCoinsPaid = 0;
    userStates.forEach(user => {
        totalStarsSold += user.starsPurchased;
        totalCoinsPaid += user.coinsEarned;
    });
    
    const starRevenue = totalStarsSold * starPrice;
    const coinExpense = totalCoinsPaid * 0.1; // CRITICAL: $0.1 per coin
    const netProfit = starRevenue - coinExpense;
    const profitRate = starRevenue > 0 ? ((netProfit / starRevenue) * 100).toFixed(2) : '0.00';
    
    const user1 = userStates.get(1);
    const user1Investment = user1.starsPurchased * starPrice;
    const user1Revenue = user1.coinsEarned * 0.1; // CRITICAL: $0.1 per coin
    const user1NetProfit = user1Revenue - user1Investment;
    const user1ROI = user1Investment > 0 ? ((user1NetProfit / user1Investment) * 100).toFixed(2) : '0.00';
    const user1MaxLevel = Math.max(...user1.pots.map(p => p.currentLevel));
    
    let levelStatsHTML = '<h3 style="margin-top: 20px; font-weight: 600;">📊 레벨별 달성 현황</h3><table><thead><tr><th>레벨</th><th>달성자 수</th><th>도달 화분 수</th><th>필요 별</th><th>필요 하트허용치</th><th>보상 코인</th><th>보상 하트</th><th>1명당 투자</th><th>1명당 수익</th><th>1명당 순익</th><th>1명당 ROI</th></tr></thead><tbody>';
    
    for (let level = 1; level <= 8; level++) {
        const achievers = new Set();
        let potsAtLevel = 0;
        
        // Calculate cumulative stats for users who stopped at this level
        let totalInvestment = 0;
        let totalReturn = 0;
        let usersStoppedHere = 0;
        
        userStates.forEach(user => {
            const potsReachedLevel = user.pots.filter(pot => pot.currentLevel >= level);
            if (potsReachedLevel.length > 0) {
                achievers.add(user.entryOrder);
                potsAtLevel += potsReachedLevel.length;
            }
            
            // Find users whose highest level is exactly this level
            const highestLevel = Math.max(0, ...user.pots.map(p => p.currentLevel));
            if (highestLevel === level) {
                usersStoppedHere++;
                totalInvestment += user.starsPurchased * starPrice;
                totalReturn += user.coinsEarned * 0.1;
            }
        });
        
        const levelData = levels[level - 1];
        
        // Calculate per-user stats
        const avgInvestment = usersStoppedHere > 0 ? totalInvestment / usersStoppedHere : 0;
        const avgReturn = usersStoppedHere > 0 ? totalReturn / usersStoppedHere : 0;
        const avgNetProfit = avgReturn - avgInvestment;
        const avgROI = avgInvestment > 0 ? (avgNetProfit / avgInvestment * 100) : 0;
        
        // Color coding for profit/loss
        const investColor = '#ff6b6b';
        const returnColor = avgReturn > 0 ? '#4dabf7' : '#adb5bd';
        const profitColor = avgNetProfit >= 0 ? '#4dabf7' : '#ff6b6b';
        const roiColor = avgROI >= 0 ? '#4dabf7' : '#ff6b6b';
        
        levelStatsHTML += \`<tr>
            <td>Lv. \${level}</td>
            <td>\${achievers.size.toLocaleString()}</td>
            <td>\${potsAtLevel.toLocaleString()}</td>
            <td>\${levelData.stars.toLocaleString()}</td>
            <td>\${levelData.hearts.toLocaleString()}</td>
            <td>\${levelData.coins.toLocaleString()}</td>
            <td>\${levelData.reward.toLocaleString()}</td>
            <td style="color: \${investColor};">$\${avgInvestment.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
            <td style="color: \${returnColor};">$\${avgReturn.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
            <td style="color: \${profitColor}; font-weight: 600;">$\${avgNetProfit.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
            <td style="color: \${roiColor}; font-weight: 600;">\${avgROI.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}%</td>
        </tr>\`;
    }
    levelStatsHTML += '</tbody></table>';
    
    const resultsHTML = \`
        <h3 style="margin-top: 20px; font-weight: 600;">💰 플랫폼 수익</h3>
        <div class="result-grid">
            <div class="result-item"><div class="result-label">별 판매</div><div class="result-value">\${totalStarsSold.toLocaleString()}</div></div>
            <div class="result-item"><div class="result-label">별 수익</div><div class="result-value">$\${starRevenue.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div></div>
            <div class="result-item"><div class="result-label">코인 지출</div><div class="result-value">$\${coinExpense.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div></div>
            <div class="result-item"><div class="result-label">순수익</div><div class="result-value">$\${netProfit.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div></div>
            <div class="result-item"><div class="result-label">수익률</div><div class="result-value">\${profitRate}%</div></div>
        </div>
        <h3 style="margin-top: 20px; font-weight: 600;">👤 1번 사용자</h3>
        <div class="result-grid">
            <div class="result-item"><div class="result-label">화분 수</div><div class="result-value">\${pots}</div></div>
            <div class="result-item"><div class="result-label">최고 레벨</div><div class="result-value">Lv. \${user1MaxLevel}</div></div>
            <div class="result-item"><div class="result-label">투자금</div><div class="result-value">$\${user1Investment.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div></div>
            <div class="result-item"><div class="result-label">수익금</div><div class="result-value">$\${user1Revenue.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div></div>
            <div class="result-item"><div class="result-label">ROI</div><div class="result-value">\${user1ROI}%</div></div>
        </div>
        \${levelStatsHTML}
    \`;
    
    const resultsDiv = document.getElementById(\`results\${farmId}\`);
    resultsDiv.innerHTML = resultsHTML;
    resultsDiv.style.display = 'block';
}

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
        if (response.data.success) alert('저장되었습니다!');
    } catch (error) {
        alert('저장 중 오류: ' + error.message);
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
