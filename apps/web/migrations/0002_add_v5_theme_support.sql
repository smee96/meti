-- METI Database Migration v0.2
-- Add V5 theme support and align schema with v0.2 spec

-- Add theme column to cards table
ALTER TABLE cards ADD COLUMN theme TEXT DEFAULT 'deep-navy';

-- Add short_id column for URL sharing (/c/:shortId)
ALTER TABLE cards ADD COLUMN short_id TEXT UNIQUE;

-- Add headline column (one-line intro from v0.2 spec)
ALTER TABLE cards ADD COLUMN headline TEXT;

-- Add phone and email columns (from v0.2 spec contacts)
ALTER TABLE cards ADD COLUMN phone TEXT;
ALTER TABLE cards ADD COLUMN email TEXT;

-- Add visibility flags (from v0.2 spec)
ALTER TABLE cards ADD COLUMN show_phone INTEGER DEFAULT 0;
ALTER TABLE cards ADD COLUMN show_email INTEGER DEFAULT 0;

-- Add status column (public/unlisted/private from v0.2 spec)
ALTER TABLE cards ADD COLUMN status TEXT DEFAULT 'public';

-- Add links column (JSON array from v0.2 spec)
ALTER TABLE cards ADD COLUMN links TEXT DEFAULT '[]';

-- Add avatar column (from v0.2 spec)
ALTER TABLE cards ADD COLUMN avatar TEXT;

-- Create card_view_events table (minimal analytics from v0.2 spec)
CREATE TABLE IF NOT EXISTS card_view_events (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  card_id TEXT NOT NULL,
  viewed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  source TEXT, -- src query parameter (e.g., 'instagram', 'email')
  FOREIGN KEY (card_id) REFERENCES cards(id) ON DELETE CASCADE
);

-- Create index for faster view queries
CREATE INDEX IF NOT EXISTS idx_card_view_events_card_id ON card_view_events(card_id);
CREATE INDEX IF NOT EXISTS idx_card_view_events_viewed_at ON card_view_events(viewed_at);

-- Update existing cards with short_id if they don't have one
UPDATE cards SET short_id = substr(id, 1, 8) WHERE short_id IS NULL;
