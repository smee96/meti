// HappyTree Game Routes
import { Hono } from 'hono';
import type { Env } from '../types';
import { Database } from '../lib/db';

const game = new Hono<{ Bindings: Env }>();

// Helper to extract user ID from token
function getUserIdFromToken(authHeader: string | undefined): string | null {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  const token = authHeader.substring(7);
  return token.replace('mock-token-', '');
}

// Get game status for current user
game.get('/status', async (c) => {
  try {
    const userId = getUserIdFromToken(c.req.header('Authorization'));
    if (!userId) {
      return c.json({ success: false, error: 'Unauthorized' }, 401);
    }

    const db = new Database(c.env.DB);
    const gameData = await db.getGameUserData(userId);
    const pots = await db.getUserPots(userId);

    if (!gameData) {
      return c.json({ success: false, error: 'Game data not found' }, 404);
    }

    // Group pots by farm
    const farmPots: { [key: number]: any[] } = { 1: [], 2: [], 3: [], 4: [] };
    const warehouse: any[] = [];

    pots.forEach((pot) => {
      if (pot.isInWarehouse) {
        warehouse.push(pot);
      } else {
        farmPots[pot.farmId].push(pot);
      }
    });

    return c.json({
      success: true,
      data: {
        gameData,
        farmPots,
        warehouse,
        totalPots: pots.length,
      },
    });
  } catch (error) {
    console.error('Get game status error:', error);
    return c.json({ success: false, error: 'Internal server error' }, 500);
  }
});

// Get farm levels (for display and calculation)
game.get('/levels/:farmId', async (c) => {
  try {
    const farmId = parseInt(c.req.param('farmId'));

    if (![1, 2, 3, 4].includes(farmId)) {
      return c.json({ success: false, error: 'Invalid farm ID' }, 400);
    }

    const results = await c.env.DB
      .prepare('SELECT * FROM game_farm_levels WHERE farm_id = ? ORDER BY level')
      .bind(farmId)
      .all();

    return c.json({
      success: true,
      data: { levels: results.results },
    });
  } catch (error) {
    console.error('Get farm levels error:', error);
    return c.json({ success: false, error: 'Internal server error' }, 500);
  }
});

// Create a new pot
game.post('/pots', async (c) => {
  try {
    const userId = getUserIdFromToken(c.req.header('Authorization'));
    if (!userId) {
      return c.json({ success: false, error: 'Unauthorized' }, 401);
    }

    const { farmId } = await c.req.json();

    if (![1, 2, 3, 4].includes(farmId)) {
      return c.json({ success: false, error: 'Invalid farm ID' }, 400);
    }

    const db = new Database(c.env.DB);
    const gameData = await db.getGameUserData(userId);

    if (!gameData) {
      return c.json({ success: false, error: 'Game data not found' }, 404);
    }

    // Check if farm is unlocked
    if (!gameData.farmUnlocked[farmId as 1 | 2 | 3 | 4]) {
      return c.json({ success: false, error: 'Farm is locked' }, 403);
    }

    // Create new pot
    const now = new Date().toISOString();
    await c.env.DB
      .prepare(`
        INSERT INTO game_pots (user_id, farm_id, level, created_at)
        VALUES (?, ?, 0, ?)
      `)
      .bind(userId, farmId, now)
      .run();

    // Update heart allowance
    await db.updateGameUserData(userId, {
      heartAllowance: gameData.heartAllowance + 1,
    });

    const updatedPots = await db.getUserPots(userId);

    return c.json({
      success: true,
      data: { pots: updatedPots },
      message: 'New pot created successfully',
    });
  } catch (error) {
    console.error('Create pot error:', error);
    return c.json({ success: false, error: 'Internal server error' }, 500);
  }
});

// Level up a pot
game.post('/pots/:potId/levelup', async (c) => {
  try {
    const userId = getUserIdFromToken(c.req.header('Authorization'));
    if (!userId) {
      return c.json({ success: false, error: 'Unauthorized' }, 401);
    }

    const potId = parseInt(c.req.param('potId'));
    const db = new Database(c.env.DB);

    // Get pot
    const potResult = await c.env.DB
      .prepare('SELECT * FROM game_pots WHERE id = ? AND user_id = ?')
      .bind(potId, userId)
      .first();

    if (!potResult) {
      return c.json({ success: false, error: 'Pot not found' }, 404);
    }

    const currentLevel = potResult.level as number;
    const farmId = potResult.farm_id as number;

    if (currentLevel >= 8) {
      return c.json({ success: false, error: 'Pot is already at max level' }, 400);
    }

    // Get next level requirements
    const nextLevel = currentLevel + 1;
    const levelData = await c.env.DB
      .prepare('SELECT * FROM game_farm_levels WHERE farm_id = ? AND level = ?')
      .bind(farmId, nextLevel)
      .first();

    if (!levelData) {
      return c.json({ success: false, error: 'Level data not found' }, 404);
    }

    const gameData = await db.getGameUserData(userId);
    if (!gameData) {
      return c.json({ success: false, error: 'Game data not found' }, 404);
    }

    // Check requirements
    const requiredHearts = levelData.hearts_required as number;
    const requiredStars = levelData.stars as number;
    const rewardCoins = levelData.coins as number;
    const rewardHearts = levelData.hearts_reward as number;

    // For levels 4+, check allowance instead of hearts_required
    const pots = await db.getUserPots(userId);
    const allowanceRequirements: { [key: number]: number } = {
      4: 15,
      5: 23,
      6: 39,
      7: 71,
      8: 135,
    };

    if (nextLevel >= 4) {
      const requiredAllowance = allowanceRequirements[nextLevel];
      if (gameData.heartAllowance < requiredAllowance) {
        return c.json(
          {
            success: false,
            error: `Insufficient allowance. Required: ${requiredAllowance}, Current: ${gameData.heartAllowance}`,
          },
          400
        );
      }
    }

    // Check hearts (if required)
    if (requiredHearts > 0 && gameData.heartsBalance < requiredHearts) {
      return c.json(
        {
          success: false,
          error: `Insufficient hearts. Required: ${requiredHearts}, Current: ${gameData.heartsBalance}`,
        },
        400
      );
    }

    // Check stars
    if (gameData.starsPurchased < requiredStars) {
      return c.json(
        {
          success: false,
          error: `Insufficient stars. Required: ${requiredStars}, Current: ${gameData.starsPurchased}`,
        },
        400
      );
    }

    // Perform level up
    await c.env.DB
      .prepare('UPDATE game_pots SET level = ? WHERE id = ?')
      .bind(nextLevel, potId)
      .run();

    // Deduct hearts if required
    let newHeartsBalance = gameData.heartsBalance;
    if (requiredHearts > 0) {
      newHeartsBalance -= requiredHearts;
    }

    // Add rewards
    newHeartsBalance += rewardHearts;
    const newCoinsEarned = gameData.coinsEarned + rewardCoins;

    await db.updateGameUserData(userId, {
      heartsBalance: newHeartsBalance,
      coinsEarned: newCoinsEarned,
    });

    // If level 8, move to warehouse
    if (nextLevel === 8) {
      await c.env.DB
        .prepare('UPDATE game_pots SET is_in_warehouse = 1 WHERE id = ?')
        .bind(potId)
        .run();
    }

    const updatedPot = await c.env.DB
      .prepare('SELECT * FROM game_pots WHERE id = ?')
      .bind(potId)
      .first();

    return c.json({
      success: true,
      data: {
        pot: updatedPot,
        rewards: {
          hearts: rewardHearts,
          coins: rewardCoins,
        },
        newHeartsBalance,
        newCoinsEarned,
      },
      message: `Pot leveled up to ${nextLevel}!`,
    });
  } catch (error) {
    console.error('Level up pot error:', error);
    return c.json({ success: false, error: 'Internal server error' }, 500);
  }
});

// Purchase stars (mock implementation)
game.post('/stars/purchase', async (c) => {
  try {
    const userId = getUserIdFromToken(c.req.header('Authorization'));
    if (!userId) {
      return c.json({ success: false, error: 'Unauthorized' }, 401);
    }

    const { amount } = await c.req.json();

    if (!amount || amount < 1) {
      return c.json({ success: false, error: 'Invalid amount' }, 400);
    }

    const db = new Database(c.env.DB);
    const gameData = await db.getGameUserData(userId);

    if (!gameData) {
      return c.json({ success: false, error: 'Game data not found' }, 404);
    }

    // Mock purchase (in production, integrate with payment system)
    const newStarsPurchased = gameData.starsPurchased + amount;
    await db.updateGameUserData(userId, {
      starsPurchased: newStarsPurchased,
    });

    return c.json({
      success: true,
      data: {
        starsPurchased: newStarsPurchased,
        cost: amount * 2, // $2 per star
      },
      message: `Successfully purchased ${amount} star(s)`,
    });
  } catch (error) {
    console.error('Purchase stars error:', error);
    return c.json({ success: false, error: 'Internal server error' }, 500);
  }
});

export default game;
