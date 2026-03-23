// Database utility functions for METI
import type { D1Database } from '@cloudflare/workers-types';
import type { User, Card, GameUserData, GamePot } from '../types';

/**
 * Generate a simple UUID (for local development)
 * In production, consider using crypto.randomUUID()
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Generate a unique share URL for a card
 */
export function generateShareUrl(userId: string, cardId: string): string {
  const shortId = cardId.split('-')[1] || cardId.substr(0, 8);
  return `/card/${userId}/${shortId}`;
}

/**
 * Database helper class
 */
export class Database {
  constructor(private db: D1Database) {}

  // ============================================
  // User Operations
  // ============================================

  async createUser(email: string, name: string, profileImage?: string): Promise<User> {
    const id = generateId();
    const now = new Date().toISOString();
    
    await this.db
      .prepare(`
        INSERT INTO users (id, email, name, profile_image, created_at, last_active_at)
        VALUES (?, ?, ?, ?, ?, ?)
      `)
      .bind(id, email, name, profileImage || null, now, now)
      .run();

    // Initialize game data for new user
    await this.initializeGameData(id);

    return this.getUserById(id) as Promise<User>;
  }

  async getUserById(id: string): Promise<User | null> {
    const result = await this.db
      .prepare('SELECT * FROM users WHERE id = ?')
      .bind(id)
      .first();

    if (!result) return null;

    return {
      id: result.id as string,
      email: result.email as string,
      name: result.name as string,
      profileImage: result.profile_image as string | undefined,
      createdAt: new Date(result.created_at as string),
      lastActiveAt: new Date(result.last_active_at as string),
      settings: JSON.parse(result.settings as string),
      stats: {
        cardsSent: result.cards_sent as number,
        cardsReceived: result.cards_received as number,
        totalViews: result.total_views as number,
      },
    };
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const result = await this.db
      .prepare('SELECT * FROM users WHERE email = ?')
      .bind(email)
      .first();

    if (!result) return null;
    return this.getUserById(result.id as string);
  }

  async updateUserName(userId: string, name: string): Promise<void> {
    await this.db
      .prepare('UPDATE users SET name = ? WHERE id = ?')
      .bind(name, userId)
      .run();
  }

  async updateUserPassword(userId: string, password: string): Promise<void> {
    // Note: In production, password should be hashed before storing
    // For now, storing as plain text (MVP only)
    await this.db
      .prepare('UPDATE users SET password = ? WHERE id = ?')
      .bind(password, userId)
      .run();
  }

  // ============================================
  // Card Operations
  // ============================================

  async createCard(userId: string, cardData: any): Promise<Card> {
    const id = generateId();
    const shareUrl = generateShareUrl(userId, id);
    const shortId = id.split('-')[1] || id.substr(0, 8);
    const now = new Date().toISOString();

    await this.db
      .prepare(`
        INSERT INTO cards (
          id, user_id, name, title, company, company_logo, bio,
          headline, phone, email, avatar, theme, status, links,
          contacts, social_links, design, is_default, is_public,
          share_url, short_id, created_at, updated_at
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `)
      .bind(
        id,
        userId,
        cardData.name,
        cardData.title || null,
        cardData.company || null,
        cardData.companyLogo || null,
        cardData.bio || null,
        cardData.headline || null,
        cardData.phone || null,
        cardData.email || null,
        cardData.avatar_url || null,
        cardData.theme || 'deep-navy',
        cardData.status || 'public',
        JSON.stringify(cardData.links || []),
        JSON.stringify(cardData.contacts || []),
        JSON.stringify(cardData.socialLinks || []),
        JSON.stringify(cardData.design || { theme: cardData.theme || 'deep-navy' }),
        cardData.isDefault ? 1 : 0,
        cardData.isPublic !== false ? 1 : 0,
        shareUrl,
        shortId,
        now,
        now
      )
      .run();

    return this.getCardById(id) as Promise<Card>;
  }

  async getCardById(id: string): Promise<Card | null> {
    const result = await this.db
      .prepare('SELECT * FROM cards WHERE id = ?')
      .bind(id)
      .first();

    if (!result) return null;

    // Parse links safely
    let links = [];
    try {
      links = result.links ? JSON.parse(result.links as string) : [];
    } catch (e) {
      console.error('Failed to parse links:', e);
    }

    return {
      id: result.id as string,
      userId: result.user_id as string,
      name: result.name as string,
      title: result.title as string | undefined,
      company: result.company as string | undefined,
      companyLogo: result.company_logo as string | undefined,
      bio: result.bio as string | undefined,
      headline: result.headline as string | undefined,
      phone: result.phone as string | undefined,
      email: result.email as string | undefined,
      avatar_url: result.avatar as string | undefined,
      theme: result.theme as string | undefined,
      status: result.status as string | undefined,
      links: links,
      contacts: JSON.parse(result.contacts as string),
      socialLinks: JSON.parse(result.social_links as string),
      design: JSON.parse(result.design as string),
      isDefault: Boolean(result.is_default),
      isPublic: Boolean(result.is_public),
      shareUrl: result.share_url as string,
      qrCode: result.qr_code as string | undefined,
      createdAt: new Date(result.created_at as string),
      updatedAt: new Date(result.updated_at as string),
      analytics: {
        views: result.views as number,
        shares: result.shares as number,
        saves: result.saves as number,
        lastViewedAt: result.last_viewed_at ? new Date(result.last_viewed_at as string) : undefined,
      },
    };
  }

  async getCardsByUserId(userId: string): Promise<Card[]> {
    const results = await this.db
      .prepare('SELECT * FROM cards WHERE user_id = ? ORDER BY is_default DESC, created_at DESC')
      .bind(userId)
      .all();

    return Promise.all(
      results.results.map((r) => this.getCardById(r.id as string) as Promise<Card>)
    );
  }

  // ============================================
  // Game Operations
  // ============================================

  async initializeGameData(userId: string): Promise<void> {
    const now = new Date().toISOString();
    
    // Create game user data with initial gift
    await this.db
      .prepare(`
        INSERT INTO game_user_data (user_id, hearts_balance, heart_allowance, created_at, updated_at)
        VALUES (?, 300000, 1, ?, ?)
      `)
      .bind(userId, now, now)
      .run();

    // Create initial pot (Farm 1)
    await this.db
      .prepare(`
        INSERT INTO game_pots (user_id, farm_id, level, created_at)
        VALUES (?, 1, 0, ?)
      `)
      .bind(userId, now)
      .run();
  }

  async getGameUserData(userId: string): Promise<GameUserData | null> {
    const result = await this.db
      .prepare('SELECT * FROM game_user_data WHERE user_id = ?')
      .bind(userId)
      .first();

    if (!result) return null;

    return {
      userId: result.user_id as string,
      heartsBalance: result.hearts_balance as number,
      heartAllowance: result.heart_allowance as number,
      starsPurchased: result.stars_purchased as number,
      coinsEarned: result.coins_earned as number,
      coinsWithdrawn: result.coins_withdrawn as number,
      farmUnlocked: JSON.parse(result.farm_unlocked as string),
      testMode: Boolean(result.test_mode),
      createdAt: new Date(result.created_at as string),
      updatedAt: new Date(result.updated_at as string),
    };
  }

  async getUserPots(userId: string): Promise<GamePot[]> {
    const results = await this.db
      .prepare('SELECT * FROM game_pots WHERE user_id = ? ORDER BY farm_id, id')
      .bind(userId)
      .all();

    return results.results.map((r) => ({
      id: r.id as number,
      userId: r.user_id as string,
      farmId: r.farm_id as number,
      level: r.level as number,
      isInWarehouse: Boolean(r.is_in_warehouse),
      createdAt: new Date(r.created_at as string),
    }));
  }

  async updateGameUserData(userId: string, updates: Partial<GameUserData>): Promise<void> {
    const fields: string[] = [];
    const values: any[] = [];

    if (updates.heartsBalance !== undefined) {
      fields.push('hearts_balance = ?');
      values.push(updates.heartsBalance);
    }
    if (updates.heartAllowance !== undefined) {
      fields.push('heart_allowance = ?');
      values.push(updates.heartAllowance);
    }
    if (updates.coinsEarned !== undefined) {
      fields.push('coins_earned = ?');
      values.push(updates.coinsEarned);
    }
    if (updates.starsPurchased !== undefined) {
      fields.push('stars_purchased = ?');
      values.push(updates.starsPurchased);
    }

    fields.push('updated_at = ?');
    values.push(new Date().toISOString());
    values.push(userId);

    await this.db
      .prepare(`UPDATE game_user_data SET ${fields.join(', ')} WHERE user_id = ?`)
      .bind(...values)
      .run();
  }

  // ============================================
  // Card Reward Tracking
  // ============================================

  async recordCardReward(
    userId: string,
    eventType: 'card_viewed' | 'card_saved' | 'card_sent' | 'new_user_joined',
    rewardType: 'heart' | 'star' | 'coin',
    amount: number,
    cardId?: string
  ): Promise<void> {
    const now = new Date().toISOString();

    await this.db
      .prepare(`
        INSERT INTO card_rewards (user_id, event_type, reward_type, amount, card_id, created_at)
        VALUES (?, ?, ?, ?, ?, ?)
      `)
      .bind(userId, eventType, rewardType, amount, cardId || null, now)
      .run();

    // Update game user data
    if (rewardType === 'heart') {
      const gameData = await this.getGameUserData(userId);
      if (gameData) {
        await this.updateGameUserData(userId, {
          heartsBalance: gameData.heartsBalance + amount,
        });
      }
    }
  }
}
