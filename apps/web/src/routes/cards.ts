// Card Management Routes
import { Hono } from 'hono';
import type { Env, CreateCardRequest } from '../types';
import { Database } from '../lib/db';

const cards = new Hono<{ Bindings: Env }>();

// Helper to extract user ID from token
function getUserIdFromToken(authHeader: string | undefined): string | null {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  const token = authHeader.substring(7);
  return token.replace('mock-token-', '');
}

// Create a new card
cards.post('/', async (c) => {
  try {
    const userId = getUserIdFromToken(c.req.header('Authorization'));
    if (!userId) {
      return c.json({ success: false, error: 'Unauthorized' }, 401);
    }

    const cardData: CreateCardRequest = await c.req.json();

    if (!cardData.name) {
      return c.json({ success: false, error: 'Name is required' }, 400);
    }

    const db = new Database(c.env.DB);
    const card = await db.createCard(userId, cardData);

    // Record card creation reward
    await db.recordCardReward(userId, 'card_sent', 'heart', 50);

    return c.json({
      success: true,
      data: { card },
    });
  } catch (error) {
    console.error('Create card error:', error);
    return c.json({ success: false, error: 'Internal server error' }, 500);
  }
});

// Get all cards for current user
cards.get('/', async (c) => {
  try {
    const userId = getUserIdFromToken(c.req.header('Authorization'));
    if (!userId) {
      return c.json({ success: false, error: 'Unauthorized' }, 401);
    }

    const db = new Database(c.env.DB);
    const userCards = await db.getCardsByUserId(userId);

    return c.json({
      success: true,
      data: { cards: userCards },
    });
  } catch (error) {
    console.error('Get cards error:', error);
    return c.json({ success: false, error: 'Internal server error' }, 500);
  }
});

// Get a specific card by ID
cards.get('/:id', async (c) => {
  try {
    const cardId = c.req.param('id');
    const db = new Database(c.env.DB);
    const card = await db.getCardById(cardId);

    if (!card) {
      return c.json({ success: false, error: 'Card not found' }, 404);
    }

    // Record card view
    await c.env.DB
      .prepare(`
        UPDATE cards 
        SET views = views + 1, last_viewed_at = ? 
        WHERE id = ?
      `)
      .bind(new Date().toISOString(), cardId)
      .run();

    // Give reward to card owner
    await db.recordCardReward(card.userId, 'card_viewed', 'heart', 10, cardId);

    return c.json({
      success: true,
      data: { card },
    });
  } catch (error) {
    console.error('Get card error:', error);
    return c.json({ success: false, error: 'Internal server error' }, 500);
  }
});

// Get card by share URL (public access)
cards.get('/share/:userId/:shortId', async (c) => {
  try {
    const { userId, shortId } = c.req.param();
    const shareUrl = `/card/${userId}/${shortId}`;
    
    const db = new Database(c.env.DB);
    const result = await c.env.DB
      .prepare('SELECT * FROM cards WHERE share_url = ? AND is_public = 1')
      .bind(shareUrl)
      .first();

    if (!result) {
      return c.json({ success: false, error: 'Card not found' }, 404);
    }

    const card = await db.getCardById(result.id as string);

    // Record view
    await c.env.DB
      .prepare(`
        UPDATE cards 
        SET views = views + 1, last_viewed_at = ? 
        WHERE id = ?
      `)
      .bind(new Date().toISOString(), result.id)
      .run();

    // Give reward to card owner
    if (card) {
      await db.recordCardReward(card.userId, 'card_viewed', 'heart', 10, card.id);
    }

    return c.json({
      success: true,
      data: { card },
    });
  } catch (error) {
    console.error('Get card by share URL error:', error);
    return c.json({ success: false, error: 'Internal server error' }, 500);
  }
});

// Update a card
cards.put('/:id', async (c) => {
  try {
    const userId = getUserIdFromToken(c.req.header('Authorization'));
    if (!userId) {
      return c.json({ success: false, error: 'Unauthorized' }, 401);
    }

    const cardId = c.req.param('id');
    const updates = await c.req.json();

    const db = new Database(c.env.DB);
    const card = await db.getCardById(cardId);

    if (!card) {
      return c.json({ success: false, error: 'Card not found' }, 404);
    }

    if (card.userId !== userId) {
      return c.json({ success: false, error: 'Forbidden' }, 403);
    }

    // Build update query
    const fields: string[] = [];
    const values: any[] = [];

    if (updates.name !== undefined) {
      fields.push('name = ?');
      values.push(updates.name);
    }
    if (updates.title !== undefined) {
      fields.push('title = ?');
      values.push(updates.title);
    }
    if (updates.company !== undefined) {
      fields.push('company = ?');
      values.push(updates.company);
    }
    if (updates.bio !== undefined) {
      fields.push('bio = ?');
      values.push(updates.bio);
    }
    if (updates.contacts !== undefined) {
      fields.push('contacts = ?');
      values.push(JSON.stringify(updates.contacts));
    }
    if (updates.socialLinks !== undefined) {
      fields.push('social_links = ?');
      values.push(JSON.stringify(updates.socialLinks));
    }
    if (updates.design !== undefined) {
      fields.push('design = ?');
      values.push(JSON.stringify(updates.design));
    }

    fields.push('updated_at = ?');
    values.push(new Date().toISOString());
    values.push(cardId);

    if (fields.length > 1) {
      await c.env.DB
        .prepare(`UPDATE cards SET ${fields.join(', ')} WHERE id = ?`)
        .bind(...values)
        .run();
    }

    const updatedCard = await db.getCardById(cardId);

    return c.json({
      success: true,
      data: { card: updatedCard },
    });
  } catch (error) {
    console.error('Update card error:', error);
    return c.json({ success: false, error: 'Internal server error' }, 500);
  }
});

// Delete a card
cards.delete('/:id', async (c) => {
  try {
    const userId = getUserIdFromToken(c.req.header('Authorization'));
    if (!userId) {
      return c.json({ success: false, error: 'Unauthorized' }, 401);
    }

    const cardId = c.req.param('id');
    const db = new Database(c.env.DB);
    const card = await db.getCardById(cardId);

    if (!card) {
      return c.json({ success: false, error: 'Card not found' }, 404);
    }

    if (card.userId !== userId) {
      return c.json({ success: false, error: 'Forbidden' }, 403);
    }

    await c.env.DB
      .prepare('DELETE FROM cards WHERE id = ?')
      .bind(cardId)
      .run();

    return c.json({
      success: true,
      message: 'Card deleted successfully',
    });
  } catch (error) {
    console.error('Delete card error:', error);
    return c.json({ success: false, error: 'Internal server error' }, 500);
  }
});

export default cards;
