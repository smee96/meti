import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { serveStatic } from 'hono/cloudflare-workers';
import type { Env } from './types';

// Import routes
import auth from './routes/auth';
import cards from './routes/cards';
import game from './routes/game';
import wallet from './routes/wallet';

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

// Health check
app.get('/api/health', (c) => {
  return c.json({
    success: true,
    message: 'METI API is running',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

// Home page
app.get('/', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="ko">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>METI - 디지털 명함 앱</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <style>
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .fade-in {
            animation: fadeIn 0.6s ease-out;
          }
        </style>
    </head>
    <body class="bg-gradient-to-br from-blue-50 to-green-50 min-h-screen">
        <div class="container mx-auto px-4 py-16">
            <!-- Header -->
            <div class="text-center mb-16 fade-in">
                <h1 class="text-6xl font-bold text-gray-800 mb-4">
                    <i class="fas fa-id-card text-blue-600"></i>
                    METI
                </h1>
                <p class="text-2xl text-gray-600 mb-2">
                    명함 한 장이 새로운 세계를 열다
                </p>
                <p class="text-lg text-gray-500">
                    Meet + Interact
                </p>
            </div>

            <!-- Features -->
            <div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
                <!-- Feature 1 -->
                <div class="bg-white rounded-2xl shadow-lg p-8 text-center fade-in" style="animation-delay: 0.1s">
                    <div class="text-5xl mb-4">
                        <i class="fas fa-qrcode text-blue-600"></i>
                    </div>
                    <h3 class="text-xl font-bold text-gray-800 mb-2">디지털 명함</h3>
                    <p class="text-gray-600">
                        QR 코드와 링크로 어디서든 간편하게 명함을 교환하세요
                    </p>
                </div>

                <!-- Feature 2 -->
                <div class="bg-white rounded-2xl shadow-lg p-8 text-center fade-in" style="animation-delay: 0.2s">
                    <div class="text-5xl mb-4">
                        <i class="fas fa-seedling text-green-600"></i>
                    </div>
                    <h3 class="text-xl font-bold text-gray-800 mb-2">HappyTree 게임</h3>
                    <p class="text-gray-600">
                        명함 교환할수록 게임 보상을 받고 나무를 키우세요
                    </p>
                </div>

                <!-- Feature 3 -->
                <div class="bg-white rounded-2xl shadow-lg p-8 text-center fade-in" style="animation-delay: 0.3s">
                    <div class="text-5xl mb-4">
                        <i class="fas fa-coins text-yellow-600"></i>
                    </div>
                    <h3 class="text-xl font-bold text-gray-800 mb-2">코인 보상</h3>
                    <p class="text-gray-600">
                        게임에서 얻은 코인을 현금으로 환급받으세요
                    </p>
                </div>
            </div>

            <!-- API Status -->
            <div class="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 fade-in" style="animation-delay: 0.4s">
                <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">
                    <i class="fas fa-server text-gray-600 mr-2"></i>
                    API Status
                </h2>
                <div class="grid md:grid-cols-2 gap-4">
                    <div class="bg-gray-50 rounded-lg p-4">
                        <div class="flex items-center justify-between">
                            <span class="text-gray-700 font-medium">Health Check</span>
                            <span class="text-green-600" id="health-status">
                                <i class="fas fa-spinner fa-spin"></i>
                            </span>
                        </div>
                    </div>
                    <div class="bg-gray-50 rounded-lg p-4">
                        <div class="flex items-center justify-between">
                            <span class="text-gray-700 font-medium">Database</span>
                            <span class="text-green-600" id="db-status">
                                <i class="fas fa-spinner fa-spin"></i>
                            </span>
                        </div>
                    </div>
                </div>
                
                <!-- API Endpoints -->
                <div class="mt-6 pt-6 border-t border-gray-200">
                    <h3 class="text-lg font-semibold text-gray-800 mb-3">Available Endpoints</h3>
                    <div class="space-y-2 text-sm">
                        <div class="flex items-center text-gray-600">
                            <span class="bg-blue-100 text-blue-700 px-2 py-1 rounded font-mono text-xs mr-2">POST</span>
                            <code>/api/auth/register</code>
                        </div>
                        <div class="flex items-center text-gray-600">
                            <span class="bg-blue-100 text-blue-700 px-2 py-1 rounded font-mono text-xs mr-2">POST</span>
                            <code>/api/auth/login</code>
                        </div>
                        <div class="flex items-center text-gray-600">
                            <span class="bg-green-100 text-green-700 px-2 py-1 rounded font-mono text-xs mr-2">GET</span>
                            <code>/api/cards</code>
                        </div>
                        <div class="flex items-center text-gray-600">
                            <span class="bg-blue-100 text-blue-700 px-2 py-1 rounded font-mono text-xs mr-2">POST</span>
                            <code>/api/cards</code>
                        </div>
                        <div class="flex items-center text-gray-600">
                            <span class="bg-green-100 text-green-700 px-2 py-1 rounded font-mono text-xs mr-2">GET</span>
                            <code>/api/game/status</code>
                        </div>
                        <div class="flex items-center text-gray-600">
                            <span class="bg-green-100 text-green-700 px-2 py-1 rounded font-mono text-xs mr-2">GET</span>
                            <code>/api/wallet</code>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Footer -->
            <div class="text-center mt-16 text-gray-500">
                <p>METI v1.0 - Phase 1 MVP</p>
                <p class="text-sm mt-2">Powered by Cloudflare Pages + Hono + D1</p>
            </div>
        </div>

        <script>
            // Check API health
            fetch('/api/health')
                .then(res => res.json())
                .then(data => {
                    document.getElementById('health-status').innerHTML = '<i class="fas fa-check-circle"></i> Online';
                    document.getElementById('db-status').innerHTML = '<i class="fas fa-check-circle"></i> Connected';
                })
                .catch(err => {
                    document.getElementById('health-status').innerHTML = '<i class="fas fa-times-circle text-red-600"></i> Offline';
                    document.getElementById('db-status').innerHTML = '<i class="fas fa-times-circle text-red-600"></i> Error';
                });
        </script>
    </body>
    </html>
  `);
});

export default app;
