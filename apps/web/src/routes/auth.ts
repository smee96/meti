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

// Update user profile (name)
auth.put('/profile', async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({ success: false, error: 'Unauthorized' }, 401);
    }

    // Extract user ID from mock token
    const token = authHeader.substring(7);
    const userId = token.replace('mock-token-', '');

    const { name } = await c.req.json();
    
    if (!name || !name.trim()) {
      return c.json({ success: false, error: 'Name is required' }, 400);
    }

    const db = new Database(c.env.DB);
    const user = await db.getUserById(userId);

    if (!user) {
      return c.json({ success: false, error: 'User not found' }, 404);
    }

    // Update user name
    await db.updateUserName(userId, name.trim());
    
    // Get updated user
    const updatedUser = await db.getUserById(userId);

    return c.json({
      success: true,
      data: { user: updatedUser },
    });
  } catch (error) {
    console.error('Update profile error:', error);
    return c.json({ success: false, error: 'Internal server error' }, 500);
  }
});

// Change password
auth.put('/password', async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({ success: false, error: 'Unauthorized' }, 401);
    }

    // Extract user ID from mock token
    const token = authHeader.substring(7);
    const userId = token.replace('mock-token-', '');

    const { currentPassword, newPassword } = await c.req.json();
    
    if (!currentPassword || !newPassword) {
      return c.json({ success: false, error: 'Both passwords are required' }, 400);
    }
    
    // Validate new password
    if (newPassword.length < 8) {
      return c.json({ success: false, error: 'Password must be at least 8 characters' }, 400);
    }
    
    if (!/[a-zA-Z]/.test(newPassword)) {
      return c.json({ success: false, error: 'Password must contain letters' }, 400);
    }
    
    if (!/[0-9]/.test(newPassword)) {
      return c.json({ success: false, error: 'Password must contain numbers' }, 400);
    }

    const db = new Database(c.env.DB);
    const user = await db.getUserById(userId);

    if (!user) {
      return c.json({ success: false, error: 'User not found' }, 404);
    }

    // TODO: Verify current password when password authentication is implemented
    // For now, we'll just update the password
    // In real implementation: const isValid = await verifyPassword(user, currentPassword);
    // if (!isValid) return c.json({ success: false, error: 'Current password is incorrect' }, 401);

    // Update password
    await db.updateUserPassword(userId, newPassword);

    return c.json({
      success: true,
      message: 'Password updated successfully',
    });
  } catch (error) {
    console.error('Change password error:', error);
    return c.json({ success: false, error: 'Internal server error' }, 500);
  }
});

export default auth;
