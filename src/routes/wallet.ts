// Card Wallet Routes
import { Hono } from 'hono';
import type { Env } from '../types';
import { Database, generateId } from '../lib/db';

const wallet = new Hono<{ Bindings: Env }>();

// Helper to extract user ID from token
function getUserIdFromToken(authHeader: string | undefined): string | null {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  const token = authHeader.substring(7);
  return token.replace('mock-token-', '');
}

// Get all saved cards in wallet
wallet.get('/', async (c) => {
  try {
    const userId = getUserIdFromToken(c.req.header('Authorization'));
    if (!userId) {
      return c.json({ success: false, error: 'Unauthorized' }, 401);
    }

    const results = await c.env.DB
      .prepare(`
        SELECT cw.*, c.name, c.title, c.company, c.design
        FROM card_wallet cw
        JOIN cards c ON cw.card_id = c.id
        WHERE cw.owner_id = ?
        ORDER BY cw.is_favorite DESC, cw.saved_at DESC
      `)
      .bind(userId)
      .all();

    const savedCards = results.results.map((row) => ({
      id: row.id,
      ownerId: row.owner_id,
      cardId: row.card_id,
      savedAt: row.saved_at,
      memo: row.memo,
      tags: JSON.parse((row.tags as string) || '[]'),
      groupId: row.group_id,
      isFavorite: Boolean(row.is_favorite),
      card: {
        name: row.name,
        title: row.title,
        company: row.company,
        design: JSON.parse(row.design as string),
      },
    }));

    return c.json({
      success: true,
      data: { savedCards },
    });
  } catch (error) {
    console.error('Get wallet error:', error);
    return c.json({ success: false, error: 'Internal server error' }, 500);
  }
});

// Save a card to wallet
wallet.post('/save', async (c) => {
  try {
    const userId = getUserIdFromToken(c.req.header('Authorization'));
    if (!userId) {
      return c.json({ success: false, error: 'Unauthorized' }, 401);
    }

    const { cardId, memo, tags, groupId } = await c.req.json();

    if (!cardId) {
      return c.json({ success: false, error: 'Card ID is required' }, 400);
    }

    const db = new Database(c.env.DB);

    // Check if card exists
    const card = await db.getCardById(cardId);
    if (!card) {
      return c.json({ success: false, error: 'Card not found' }, 404);
    }

    // Check if already saved
    const existing = await c.env.DB
      .prepare('SELECT * FROM card_wallet WHERE owner_id = ? AND card_id = ?')
      .bind(userId, cardId)
      .first();

    if (existing) {
      return c.json({ success: false, error: 'Card already saved' }, 409);
    }

    // Save card
    const id = generateId();
    const now = new Date().toISOString();

    await c.env.DB
      .prepare(`
        INSERT INTO card_wallet (id, owner_id, card_id, saved_at, memo, tags, group_id)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `)
      .bind(
        id,
        userId,
        cardId,
        now,
        memo || null,
        JSON.stringify(tags || []),
        groupId || null
      )
      .run();

    // Update card analytics
    await c.env.DB
      .prepare('UPDATE cards SET saves = saves + 1 WHERE id = ?')
      .bind(cardId)
      .run();

    // Give reward to card owner
    await db.recordCardReward(card.userId, 'card_saved', 'heart', 100, cardId);

    return c.json({
      success: true,
      data: { id },
      message: 'Card saved to wallet',
    });
  } catch (error) {
    console.error('Save card error:', error);
    return c.json({ success: false, error: 'Internal server error' }, 500);
  }
});

// Update wallet item (memo, tags, group)
wallet.put('/:id', async (c) => {
  try {
    const userId = getUserIdFromToken(c.req.header('Authorization'));
    if (!userId) {
      return c.json({ success: false, error: 'Unauthorized' }, 401);
    }

    const walletItemId = c.req.param('id');
    const updates = await c.req.json();

    // Verify ownership
    const item = await c.env.DB
      .prepare('SELECT * FROM card_wallet WHERE id = ? AND owner_id = ?')
      .bind(walletItemId, userId)
      .first();

    if (!item) {
      return c.json({ success: false, error: 'Wallet item not found' }, 404);
    }

    // Build update query
    const fields: string[] = [];
    const values: any[] = [];

    if (updates.memo !== undefined) {
      fields.push('memo = ?');
      values.push(updates.memo);
    }
    if (updates.tags !== undefined) {
      fields.push('tags = ?');
      values.push(JSON.stringify(updates.tags));
    }
    if (updates.groupId !== undefined) {
      fields.push('group_id = ?');
      values.push(updates.groupId);
    }
    if (updates.isFavorite !== undefined) {
      fields.push('is_favorite = ?');
      values.push(updates.isFavorite ? 1 : 0);
    }

    if (fields.length > 0) {
      values.push(walletItemId);
      await c.env.DB
        .prepare(`UPDATE card_wallet SET ${fields.join(', ')} WHERE id = ?`)
        .bind(...values)
        .run();
    }

    return c.json({
      success: true,
      message: 'Wallet item updated',
    });
  } catch (error) {
    console.error('Update wallet item error:', error);
    return c.json({ success: false, error: 'Internal server error' }, 500);
  }
});

// Remove card from wallet
wallet.delete('/:id', async (c) => {
  try {
    const userId = getUserIdFromToken(c.req.header('Authorization'));
    if (!userId) {
      return c.json({ success: false, error: 'Unauthorized' }, 401);
    }

    const walletItemId = c.req.param('id');

    // Verify ownership
    const item = await c.env.DB
      .prepare('SELECT * FROM card_wallet WHERE id = ? AND owner_id = ?')
      .bind(walletItemId, userId)
      .first();

    if (!item) {
      return c.json({ success: false, error: 'Wallet item not found' }, 404);
    }

    await c.env.DB
      .prepare('DELETE FROM card_wallet WHERE id = ?')
      .bind(walletItemId)
      .run();

    return c.json({
      success: true,
      message: 'Card removed from wallet',
    });
  } catch (error) {
    console.error('Delete wallet item error:', error);
    return c.json({ success: false, error: 'Internal server error' }, 500);
  }
});

// Get wallet groups
wallet.get('/groups', async (c) => {
  try {
    const userId = getUserIdFromToken(c.req.header('Authorization'));
    if (!userId) {
      return c.json({ success: false, error: 'Unauthorized' }, 401);
    }

    const results = await c.env.DB
      .prepare('SELECT * FROM wallet_groups WHERE owner_id = ? ORDER BY order_index')
      .bind(userId)
      .all();

    return c.json({
      success: true,
      data: { groups: results.results },
    });
  } catch (error) {
    console.error('Get groups error:', error);
    return c.json({ success: false, error: 'Internal server error' }, 500);
  }
});

// Create wallet group
wallet.post('/groups', async (c) => {
  try {
    const userId = getUserIdFromToken(c.req.header('Authorization'));
    if (!userId) {
      return c.json({ success: false, error: 'Unauthorized' }, 401);
    }

    const { name, color } = await c.req.json();

    if (!name) {
      return c.json({ success: false, error: 'Group name is required' }, 400);
    }

    const id = generateId();
    const now = new Date().toISOString();

    await c.env.DB
      .prepare(`
        INSERT INTO wallet_groups (id, owner_id, name, color, order_index, created_at)
        VALUES (?, ?, ?, ?, 0, ?)
      `)
      .bind(id, userId, name, color || '#1A73E8', now)
      .run();

    return c.json({
      success: true,
      data: { id, name, color },
      message: 'Group created',
    });
  } catch (error) {
    console.error('Create group error:', error);
    return c.json({ success: false, error: 'Internal server error' }, 500);
  }
});

export default wallet;
