// Authentication Routes
import { Hono } from 'hono';
import type { Env } from '../types';
import { Database } from '../lib/db';

const auth = new Hono<{ Bindings: Env }>();

// Mock authentication for MVP (will be replaced with Google OAuth later)
auth.post('/register', async (c) => {
  try {
    const { email, name } = await c.req.json();

    if (!email || !name) {
      return c.json({ success: false, error: 'Email and name are required' }, 400);
    }

    const db = new Database(c.env.DB);

    // Check if user already exists
    const existingUser = await db.getUserByEmail(email);
    if (existingUser) {
      return c.json({ success: false, error: 'User already exists' }, 409);
    }

    // Create new user
    const user = await db.createUser(email, name);

    return c.json({
      success: true,
      data: {
        user,
        token: `mock-token-${user.id}`, // TODO: Replace with real JWT
      },
    });
  } catch (error) {
    console.error('Register error:', error);
    return c.json({ success: false, error: 'Internal server error' }, 500);
  }
});

auth.post('/login', async (c) => {
  try {
    const { email } = await c.req.json();

    if (!email) {
      return c.json({ success: false, error: 'Email is required' }, 400);
    }

    const db = new Database(c.env.DB);
    const user = await db.getUserByEmail(email);

    if (!user) {
      return c.json({ success: false, error: 'User not found' }, 404);
    }

    return c.json({
      success: true,
      data: {
        user,
        token: `mock-token-${user.id}`, // TODO: Replace with real JWT
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return c.json({ success: false, error: 'Internal server error' }, 500);
  }
});

// Get current user (requires auth token)
auth.get('/me', async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({ success: false, error: 'Unauthorized' }, 401);
    }

    // Extract user ID from mock token
    const token = authHeader.substring(7);
    const userId = token.replace('mock-token-', '');

    const db = new Database(c.env.DB);
    const user = await db.getUserById(userId);

    if (!user) {
      return c.json({ success: false, error: 'User not found' }, 404);
    }

    return c.json({
      success: true,
      data: { user },
    });
  } catch (error) {
    console.error('Get user error:', error);
    return c.json({ success: false, error: 'Internal server error' }, 500);
  }
});

export default auth;
