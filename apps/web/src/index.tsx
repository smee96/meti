import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { serveStatic } from 'hono/cloudflare-workers';
import type { Env } from './types';

// Import routes
import auth from './routes/auth';
import authPages from './routes/auth-pages';
import cards from './routes/cards';
import game from './routes/game';
import wallet from './routes/wallet';
import publicCard from './routes/public-card';
import landing from './routes/landing';
import themeGallery from './routes/theme-gallery';
import cardEditor from './routes/card-editor';
import myCards from './routes/my-cards';
import myCardView from './routes/my-card-view';
import myWallet from './routes/my-wallet';

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

// Auth pages (login/register)
app.route('/auth', authPages);

// Public card page
app.route('/c', publicCard);

// Theme gallery
app.route('/themes', themeGallery);

// Card editor (must come before my-card-view to match /edit route first)
app.route('/my/card', cardEditor);

// My card view (owner's view with share/edit/QR)
app.route('/my/card', myCardView);

// My cards list
app.route('/my/cards', myCards);

// My wallet page
app.route('/my/wallet', myWallet);

// Landing page (catch all root)
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
