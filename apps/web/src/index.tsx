import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { serveStatic } from 'hono/cloudflare-workers';
import type { Env } from './types';

// Import routes
import auth from './routes/auth';
import cards from './routes/cards';
import game from './routes/game';
import wallet from './routes/wallet';
import publicCard from './routes/public-card';
import landing from './routes/landing';

const app = new Hono<{ Bindings: Env }>();

// Enable CORS for API routes
app.use('/api/*', cors());

// Serve static files from public directory
app.use('/static/*', serveStatic({ root: './public' }));

// API Routes
app.route('/api/auth', auth);
app.route('/api/cards', cards);
app.route('/api/game', game);
app.route('/api/wallet', wallet);

// Public card page
app.route('/c', publicCard);

// Landing page
app.route('/', landing);

// Health check
app.get('/api/health', (c) => {
  return c.json({
    success: true,
    message: 'METI API is running',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

export default app;
