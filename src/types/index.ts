// METI - Type Definitions
// Based on METI_PLANNING.md specifications

export interface User {
  id: string;
  email: string;
  name: string;
  profileImage?: string;
  createdAt: Date;
  lastActiveAt: Date;
  settings: UserSettings;
  stats: UserStats;
}

export interface UserSettings {
  language: 'ko' | 'en' | 'ja';
  theme: 'light' | 'dark' | 'auto';
  notifications: {
    card_viewed: boolean;
    card_saved: boolean;
    game_reward: boolean;
  };
}

export interface UserStats {
  cardsSent: number;
  cardsReceived: number;
  totalViews: number;
}

export interface Card {
  id: string;
  userId: string;
  name: string;
  title?: string;
  company?: string;
  companyLogo?: string;
  bio?: string;
  contacts: CardContact[];
  socialLinks: SocialLink[];
  design: CardDesign;
  isDefault: boolean;
  isPublic: boolean;
  shareUrl: string;
  qrCode?: string;
  createdAt: Date;
  updatedAt: Date;
  analytics: CardAnalytics;
}

export interface CardContact {
  type: 'phone' | 'email' | 'website' | 'address';
  label?: string;
  value: string;
  isPrimary: boolean;
}

export interface SocialLink {
  platform: 'instagram' | 'linkedin' | 'twitter' | 'youtube' | 'github' | 'custom';
  url: string;
  label?: string;
}

export interface CardDesign {
  theme: string;
  backgroundColor?: string;
  textColor?: string;
  profileImage?: string;
}

export interface CardAnalytics {
  views: number;
  shares: number;
  saves: number;
  lastViewedAt?: Date;
}

export interface CardWalletItem {
  id: string;
  ownerId: string;
  cardId: string;
  savedAt: Date;
  memo?: string;
  tags: string[];
  groupId?: string;
  isFavorite: boolean;
}

export interface WalletGroup {
  id: string;
  ownerId: string;
  name: string;
  color: string;
  orderIndex: number;
  createdAt: Date;
}

// HappyTree Game Types
export interface GameUserData {
  userId: string;
  heartsBalance: number;
  heartAllowance: number;
  starsPurchased: number;
  coinsEarned: number;
  coinsWithdrawn: number;
  farmUnlocked: {
    1: boolean;
    2: boolean;
    3: boolean;
    4: boolean;
  };
  testMode: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface GamePot {
  id: number;
  userId: string;
  farmId: number;
  level: number;
  isInWarehouse: boolean;
  createdAt: Date;
}

export interface FarmLevel {
  farmId: number;
  level: number;
  heartsRequired: number;
  stars: number;
  coins: number;
  heartsReward: number;
}

export interface CardReward {
  id: number;
  userId: string;
  eventType: 'card_viewed' | 'card_saved' | 'card_sent' | 'new_user_joined';
  rewardType: 'heart' | 'star' | 'coin';
  amount: number;
  cardId?: string;
  createdAt: Date;
}

// API Request/Response Types
export interface CreateCardRequest {
  name: string;
  title?: string;
  company?: string;
  bio?: string;
  contacts?: CardContact[];
  socialLinks?: SocialLink[];
  design?: Partial<CardDesign>;
  isDefault?: boolean;
}

export interface UpdateCardRequest extends Partial<CreateCardRequest> {
  id: string;
}

export interface ShareCardResponse {
  shareUrl: string;
  qrCode: string;
}

export interface SaveCardToWalletRequest {
  cardId: string;
  memo?: string;
  tags?: string[];
  groupId?: string;
}

export interface LevelUpPotRequest {
  potId: number;
}

export interface LevelUpPotResponse {
  success: boolean;
  pot: GamePot;
  rewards: {
    hearts?: number;
    coins?: number;
  };
  newHeartsBalance: number;
  newCoinsEarned: number;
}

// Cloudflare Bindings
export interface Env {
  DB: D1Database;
  // Future additions:
  // KV: KVNamespace;
  // R2: R2Bucket;
}

// API Response Wrapper
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
