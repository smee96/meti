-- Add password column to users table
-- Created: 2026-03-23

ALTER TABLE users ADD COLUMN password TEXT;

-- Note: This is for MVP only. 
-- In production, passwords should be hashed before storing.
-- Currently storing plain text for development purposes.
