-- METI Database Schema v1.0
-- Created: 2026-03-09

-- ============================================
-- Users Table
-- ============================================
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY, -- UUID
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  profile_image TEXT, -- URL to profile image
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  last_active_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  -- Settings (stored as JSON)
  settings TEXT DEFAULT '{"language":"ko","theme":"light","notifications":{"card_viewed":true,"card_saved":true,"game_reward":true}}',
  
  -- Statistics
  cards_sent INTEGER DEFAULT 0,
  cards_received INTEGER DEFAULT 0,
  total_views INTEGER DEFAULT 0
);

-- ============================================
-- Cards Table (Digital Business Cards)
-- ============================================
CREATE TABLE IF NOT EXISTS cards (
  id TEXT PRIMARY KEY, -- UUID
  user_id TEXT NOT NULL,
  
  -- Basic Info
  name TEXT NOT NULL,
  title TEXT, -- Job title
  company TEXT,
  company_logo TEXT, -- URL
  bio TEXT, -- One-line introduction
  
  -- Contacts (stored as JSON array)
  contacts TEXT DEFAULT '[]', -- [{type, label, value, isPrimary}]
  
  -- Social Links (stored as JSON array)
  social_links TEXT DEFAULT '[]', -- [{platform, url, label}]
  
  -- Design (stored as JSON)
  design TEXT DEFAULT '{"theme":"clean-white","backgroundColor":"#ffffff","textColor":"#000000","profileImage":null}',
  
  -- Meta
  is_default INTEGER DEFAULT 0, -- Boolean: 0=false, 1=true
  is_public INTEGER DEFAULT 1,
  share_url TEXT NOT NULL, -- Unique share URL
  qr_code TEXT, -- QR code data or URL
  
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  -- Analytics
  views INTEGER DEFAULT 0,
  shares INTEGER DEFAULT 0,
  saves INTEGER DEFAULT 0,
  last_viewed_at DATETIME,
  
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ============================================
-- Card Wallet (Saved Cards)
-- ============================================
CREATE TABLE IF NOT EXISTS card_wallet (
  id TEXT PRIMARY KEY, -- UUID
  owner_id TEXT NOT NULL, -- User who saved this card
  card_id TEXT NOT NULL, -- Saved card ID
  
  saved_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  memo TEXT,
  tags TEXT DEFAULT '[]', -- JSON array of tags
  group_id TEXT, -- Reference to wallet_groups
  is_favorite INTEGER DEFAULT 0,
  
  FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (card_id) REFERENCES cards(id) ON DELETE CASCADE,
  UNIQUE(owner_id, card_id) -- Prevent duplicate saves
);

-- ============================================
-- Wallet Groups
-- ============================================
CREATE TABLE IF NOT EXISTS wallet_groups (
  id TEXT PRIMARY KEY, -- UUID
  owner_id TEXT NOT NULL,
  name TEXT NOT NULL,
  color TEXT DEFAULT '#1A73E8',
  order_index INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ============================================
-- HappyTree Game Data
-- ============================================
CREATE TABLE IF NOT EXISTS game_user_data (
  user_id TEXT PRIMARY KEY,
  
  -- Shared Resources (across all farms)
  hearts_balance INTEGER DEFAULT 300000, -- Initial gift: 300,000 hearts
  heart_allowance INTEGER DEFAULT 1, -- Total pot count
  stars_purchased INTEGER DEFAULT 0,
  coins_earned INTEGER DEFAULT 0,
  coins_withdrawn INTEGER DEFAULT 0,
  
  -- Farm Unlock Status (stored as JSON)
  farm_unlocked TEXT DEFAULT '{"1":true,"2":false,"3":false,"4":false}',
  
  -- Test Mode
  test_mode INTEGER DEFAULT 0,
  
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ============================================
-- HappyTree Pots
-- ============================================
CREATE TABLE IF NOT EXISTS game_pots (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT NOT NULL,
  farm_id INTEGER NOT NULL, -- 1, 2, 3, or 4
  level INTEGER DEFAULT 0, -- 0-8
  is_in_warehouse INTEGER DEFAULT 0, -- 0=active, 1=in warehouse
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ============================================
-- HappyTree Farm Levels (Editable)
-- ============================================
CREATE TABLE IF NOT EXISTS game_farm_levels (
  farm_id INTEGER NOT NULL,
  level INTEGER NOT NULL,
  hearts_required INTEGER DEFAULT 0,
  stars INTEGER DEFAULT 0,
  coins INTEGER DEFAULT 0,
  hearts_reward INTEGER DEFAULT 0,
  
  PRIMARY KEY (farm_id, level)
);

-- ============================================
-- Card Exchange Rewards (Event Log)
-- ============================================
CREATE TABLE IF NOT EXISTS card_rewards (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT NOT NULL,
  event_type TEXT NOT NULL, -- 'card_viewed', 'card_saved', 'card_sent', 'new_user_joined'
  reward_type TEXT NOT NULL, -- 'heart', 'star', 'coin'
  amount INTEGER NOT NULL,
  card_id TEXT, -- Related card ID (if applicable)
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (card_id) REFERENCES cards(id) ON DELETE SET NULL
);

-- ============================================
-- Indexes for Performance
-- ============================================
CREATE INDEX IF NOT EXISTS idx_cards_user_id ON cards(user_id);
CREATE INDEX IF NOT EXISTS idx_cards_share_url ON cards(share_url);
CREATE INDEX IF NOT EXISTS idx_card_wallet_owner ON card_wallet(owner_id);
CREATE INDEX IF NOT EXISTS idx_card_wallet_card ON card_wallet(card_id);
CREATE INDEX IF NOT EXISTS idx_wallet_groups_owner ON wallet_groups(owner_id);
CREATE INDEX IF NOT EXISTS idx_game_pots_user ON game_pots(user_id);
CREATE INDEX IF NOT EXISTS idx_game_pots_farm ON game_pots(farm_id);
CREATE INDEX IF NOT EXISTS idx_card_rewards_user ON card_rewards(user_id);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- ============================================
-- Initial Data: Farm 1 Levels (From METI Planning)
-- ============================================
INSERT OR IGNORE INTO game_farm_levels (farm_id, level, hearts_required, stars, coins, hearts_reward) VALUES
  (1, 0, 0, 0, 0, 0), -- Starting level
  (1, 1, 0, 0, 0, 1),
  (1, 2, 0, 0, 0, 3),
  (1, 3, 0, 1, 0, 14),
  (1, 4, 0, 1, 6, 69), -- hearts_required=0 means check allowance (15 for Lv4)
  (1, 5, 0, 1, 12, 344), -- allowance=23
  (1, 6, 0, 1, 24, 1719), -- allowance=39
  (1, 7, 0, 1, 48, 8594), -- allowance=71
  (1, 8, 0, 1, 96, 0); -- allowance=135, max level

-- Note: Farm 2, 3, 4 levels will be added in future migrations
-- Allowance requirements are checked in application logic
