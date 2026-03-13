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

// Health check
app.get('/api/health', (c) => {
  return c.json({
    success: true,
    message: 'METI API is running',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

// Premium Landing Page
app.get('/', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="ko">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>METI - 당신의 비즈니스 네트워크를 성장시키세요</title>
        <meta name="description" content="METI는 디지털 명함과 게임을 결합한 혁신적인 비즈니스 네트워킹 플랫폼입니다. 명함을 교환하고 보상을 받으세요.">
        
        <!-- Favicon -->
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>💼</text></svg>">
        
        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Noto+Sans+KR:wght@300;400;500;700;900&display=swap" rel="stylesheet">
        
        <!-- TailwindCSS -->
        <script src="https://cdn.tailwindcss.com"></script>
        
        <!-- Font Awesome -->
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        
        <!-- AOS Animation -->
        <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
        
        <script>
          tailwind.config = {
            theme: {
              extend: {
                fontFamily: {
                  sans: ['Noto Sans KR', 'Poppins', 'sans-serif'],
                  en: ['Poppins', 'sans-serif']
                },
                colors: {
                  primary: {
                    50: '#E3F2FD',
                    100: '#BBDEFB',
                    200: '#90CAF9',
                    300: '#64B5F6',
                    400: '#42A5F5',
                    500: '#1A73E8',
                    600: '#1565C0',
                    700: '#0D47A1',
                    800: '#0A3D8F',
                    900: '#062E6F'
                  },
                  accent: {
                    50: '#E8F5E9',
                    100: '#C8E6C9',
                    200: '#A5D6A7',
                    300: '#81C784',
                    400: '#66BB6A',
                    500: '#34A853',
                    600: '#2E7D32',
                    700: '#1B5E20',
                    800: '#155017',
                    900: '#0D3A0F'
                  },
                  gold: {
                    500: '#FBBC04',
                    600: '#F9AB00',
                    700: '#F29900'
                  }
                }
              }
            }
          }
        </script>
        
        <style>
          * {
            scroll-behavior: smooth;
          }
          
          body {
            font-family: 'Noto Sans KR', 'Poppins', sans-serif;
          }
          
          .font-en {
            font-family: 'Poppins', sans-serif;
          }
          
          /* Gradient Text */
          .gradient-text {
            background: linear-gradient(135deg, #1A73E8 0%, #34A853 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          
          /* Glass Morphism */
          .glass {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
          }
          
          /* Floating Animation */
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          
          .float {
            animation: float 6s ease-in-out infinite;
          }
          
          /* Gradient Background */
          .gradient-bg {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          }
          
          .gradient-bg-light {
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          }
          
          /* Card Hover Effect */
          .card-hover {
            transition: all 0.3s ease;
          }
          
          .card-hover:hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
          }
          
          /* Button Glow */
          .btn-glow {
            box-shadow: 0 4px 20px rgba(26, 115, 232, 0.4);
            transition: all 0.3s ease;
          }
          
          .btn-glow:hover {
            box-shadow: 0 6px 30px rgba(26, 115, 232, 0.6);
            transform: translateY(-2px);
          }
          
          /* Stats Counter */
          .stat-number {
            font-feature-settings: 'tnum';
            font-variant-numeric: tabular-nums;
          }
          
          /* Navbar Shadow on Scroll */
          .navbar-shadow {
            transition: all 0.3s ease;
          }
          
          .navbar-shadow.scrolled {
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(10px);
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          }
        </style>
    </head>
    <body class="bg-white text-gray-900">
        
        <!-- Navigation -->
        <nav class="navbar-shadow fixed w-full top-0 z-50 bg-white">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center h-20">
                    <!-- Logo -->
                    <div class="flex items-center space-x-3">
                        <div class="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center shadow-lg">
                            <i class="fas fa-id-card text-white text-xl"></i>
                        </div>
                        <span class="text-2xl font-bold gradient-text font-en">METI</span>
                    </div>
                    
                    <!-- Desktop Menu -->
                    <div class="hidden md:flex items-center space-x-8">
                        <a href="#features" class="text-gray-600 hover:text-primary-500 font-medium transition">기능</a>
                        <a href="#benefits" class="text-gray-600 hover:text-primary-500 font-medium transition">장점</a>
                        <a href="#game" class="text-gray-600 hover:text-primary-500 font-medium transition">게임</a>
                        <a href="#pricing" class="text-gray-600 hover:text-primary-500 font-medium transition">요금제</a>
                        <button onclick="showAuthModal('login')" class="text-gray-600 hover:text-primary-500 font-medium transition">
                            로그인
                        </button>
                        <button onclick="showAuthModal('register')" class="bg-primary-500 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-primary-600 transition btn-glow">
                            시작하기
                        </button>
                    </div>
                    
                    <!-- Mobile Menu Button -->
                    <button class="md:hidden text-gray-600" onclick="toggleMobileMenu()">
                        <i class="fas fa-bars text-2xl"></i>
                    </button>
                </div>
            </div>
            
            <!-- Mobile Menu -->
            <div id="mobileMenu" class="hidden md:hidden bg-white border-t">
                <div class="px-4 py-4 space-y-3">
                    <a href="#features" class="block py-2 text-gray-600 hover:text-primary-500 font-medium">기능</a>
                    <a href="#benefits" class="block py-2 text-gray-600 hover:text-primary-500 font-medium">장점</a>
                    <a href="#game" class="block py-2 text-gray-600 hover:text-primary-500 font-medium">게임</a>
                    <a href="#pricing" class="block py-2 text-gray-600 hover:text-primary-500 font-medium">요금제</a>
                    <button onclick="showAuthModal('login')" class="w-full text-left py-2 text-gray-600 hover:text-primary-500 font-medium">
                        로그인
                    </button>
                    <button onclick="showAuthModal('register')" class="w-full bg-primary-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-600 transition">
                        시작하기
                    </button>
                </div>
            </div>
        </nav>
        
        <!-- Hero Section -->
        <section class="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-green-50">
            <div class="max-w-7xl mx-auto">
                <div class="grid lg:grid-cols-2 gap-12 items-center">
                    <!-- Left Content -->
                    <div data-aos="fade-right">
                        <div class="inline-block mb-6">
                            <span class="bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold">
                                <i class="fas fa-sparkles mr-2"></i>AI 기반 명함 관리
                            </span>
                        </div>
                        
                        <h1 class="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                            명함 한 장이<br/>
                            <span class="gradient-text">새로운 세계</span>를<br/>
                            열다
                        </h1>
                        
                        <p class="text-xl text-gray-600 mb-8 leading-relaxed">
                            METI는 디지털 명함과 게임을 결합한 혁신적인 비즈니스 네트워킹 플랫폼입니다. 
                            명함을 교환할수록 보상을 받고, 네트워크를 성장시키세요.
                        </p>
                        
                        <div class="flex flex-col sm:flex-row gap-4 mb-8">
                            <button onclick="showAuthModal('register')" class="bg-primary-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary-600 transition btn-glow flex items-center justify-center">
                                <i class="fas fa-rocket mr-2"></i>
                                무료로 시작하기
                            </button>
                            <button onclick="scrollToDemo()" class="bg-white text-primary-500 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition border-2 border-primary-500 flex items-center justify-center">
                                <i class="fas fa-play-circle mr-2"></i>
                                데모 보기
                            </button>
                        </div>
                        
                        <!-- Stats -->
                        <div class="grid grid-cols-3 gap-6">
                            <div>
                                <div class="text-3xl font-bold text-primary-500 stat-number">10K+</div>
                                <div class="text-sm text-gray-600">활성 사용자</div>
                            </div>
                            <div>
                                <div class="text-3xl font-bold text-accent-500 stat-number">50K+</div>
                                <div class="text-sm text-gray-600">교환된 명함</div>
                            </div>
                            <div>
                                <div class="text-3xl font-bold text-gold-500 stat-number">99.9%</div>
                                <div class="text-sm text-gray-600">만족도</div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Right Content - 3D Card Mockup -->
                    <div class="relative" data-aos="fade-left">
                        <div class="float">
                            <!-- Digital Card Preview -->
                            <div class="glass rounded-3xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition duration-500">
                                <div class="bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl p-8 text-white shadow-xl">
                                    <div class="mb-6">
                                        <div class="w-16 h-16 bg-white/20 rounded-full mb-4"></div>
                                        <h3 class="text-2xl font-bold mb-1">홍길동</h3>
                                        <p class="text-white/90">CEO & Founder</p>
                                        <p class="text-white/80 text-sm">METI Inc.</p>
                                    </div>
                                    <div class="space-y-2 text-sm">
                                        <div class="flex items-center">
                                            <i class="fas fa-envelope w-5"></i>
                                            <span class="ml-2">hong@meti.app</span>
                                        </div>
                                        <div class="flex items-center">
                                            <i class="fas fa-phone w-5"></i>
                                            <span class="ml-2">010-1234-5678</span>
                                        </div>
                                    </div>
                                    <div class="mt-6 pt-6 border-t border-white/20 flex items-center justify-between">
                                        <div class="flex space-x-3">
                                            <i class="fab fa-linkedin text-xl"></i>
                                            <i class="fab fa-twitter text-xl"></i>
                                            <i class="fab fa-github text-xl"></i>
                                        </div>
                                        <i class="fas fa-qrcode text-3xl"></i>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Floating Elements -->
                            <div class="absolute -top-6 -right-6 bg-white rounded-2xl shadow-xl p-4 glass" style="animation-delay: 0.5s;">
                                <i class="fas fa-chart-line text-accent-500 text-2xl"></i>
                            </div>
                            <div class="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 glass" style="animation-delay: 1s;">
                                <i class="fas fa-users text-primary-500 text-2xl"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
        <!-- Features Section -->
        <section id="features" class="py-20 px-4 sm:px-6 lg:px-8 bg-white">
            <div class="max-w-7xl mx-auto">
                <div class="text-center mb-16" data-aos="fade-up">
                    <h2 class="text-4xl font-bold mb-4">
                        왜 <span class="gradient-text">METI</span>인가요?
                    </h2>
                    <p class="text-xl text-gray-600 max-w-3xl mx-auto">
                        전통적인 명함의 한계를 넘어, 디지털 시대에 맞는 스마트한 네트워킹 경험을 제공합니다
                    </p>
                </div>
                
                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <!-- Feature 1 -->
                    <div class="card-hover bg-white rounded-2xl p-8 shadow-lg border border-gray-100" data-aos="fade-up" data-aos-delay="0">
                        <div class="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mb-6">
                            <i class="fas fa-qrcode text-primary-500 text-2xl"></i>
                        </div>
                        <h3 class="text-xl font-bold mb-3">즉시 공유</h3>
                        <p class="text-gray-600 leading-relaxed">
                            QR 코드, 링크, NFC로 언제 어디서나 명함을 즉시 공유하세요. 
                            종이 명함은 이제 그만!
                        </p>
                    </div>
                    
                    <!-- Feature 2 -->
                    <div class="card-hover bg-white rounded-2xl p-8 shadow-lg border border-gray-100" data-aos="fade-up" data-aos-delay="100">
                        <div class="w-16 h-16 bg-accent-100 rounded-2xl flex items-center justify-center mb-6">
                            <i class="fas fa-seedling text-accent-500 text-2xl"></i>
                        </div>
                        <h3 class="text-xl font-bold mb-3">게임 보상</h3>
                        <p class="text-gray-600 leading-relaxed">
                            명함을 교환할수록 HappyTree 게임에서 보상을 획득하고, 
                            코인으로 환급받으세요.
                        </p>
                    </div>
                    
                    <!-- Feature 3 -->
                    <div class="card-hover bg-white rounded-2xl p-8 shadow-lg border border-gray-100" data-aos="fade-up" data-aos-delay="200">
                        <div class="w-16 h-16 bg-gold-100 rounded-2xl flex items-center justify-center mb-6">
                            <i class="fas fa-chart-line text-gold-500 text-2xl"></i>
                        </div>
                        <h3 class="text-xl font-bold mb-3">실시간 분석</h3>
                        <p class="text-gray-600 leading-relaxed">
                            명함 조회수, 공유 횟수, 저장 횟수 등 
                            실시간 통계로 네트워킹 효과를 확인하세요.
                        </p>
                    </div>
                    
                    <!-- Feature 4 -->
                    <div class="card-hover bg-white rounded-2xl p-8 shadow-lg border border-gray-100" data-aos="fade-up" data-aos-delay="300">
                        <div class="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
                            <i class="fas fa-palette text-purple-500 text-2xl"></i>
                        </div>
                        <h3 class="text-xl font-bold mb-3">맞춤 디자인</h3>
                        <p class="text-gray-600 leading-relaxed">
                            5가지 프리미엄 테마와 커스텀 디자인으로 
                            나만의 명함을 만드세요.
                        </p>
                    </div>
                    
                    <!-- Feature 5 -->
                    <div class="card-hover bg-white rounded-2xl p-8 shadow-lg border border-gray-100" data-aos="fade-up" data-aos-delay="400">
                        <div class="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mb-6">
                            <i class="fas fa-users text-red-500 text-2xl"></i>
                        </div>
                        <h3 class="text-xl font-bold mb-3">스마트 지갑</h3>
                        <p class="text-gray-600 leading-relaxed">
                            받은 명함을 그룹별로 관리하고, 
                            메모와 태그로 체계적으로 정리하세요.
                        </p>
                    </div>
                    
                    <!-- Feature 6 -->
                    <div class="card-hover bg-white rounded-2xl p-8 shadow-lg border border-gray-100" data-aos="fade-up" data-aos-delay="500">
                        <div class="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                            <i class="fas fa-shield-alt text-blue-500 text-2xl"></i>
                        </div>
                        <h3 class="text-xl font-bold mb-3">안전한 보안</h3>
                        <p class="text-gray-600 leading-relaxed">
                            엔터프라이즈급 보안으로 
                            소중한 비즈니스 정보를 안전하게 보호합니다.
                        </p>
                    </div>
                </div>
            </div>
        </section>
        
        <!-- CTA Section -->
        <section class="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-500 to-accent-500">
            <div class="max-w-4xl mx-auto text-center" data-aos="zoom-in">
                <h2 class="text-4xl lg:text-5xl font-bold text-white mb-6">
                    지금 바로 시작하세요
                </h2>
                <p class="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                    30초 만에 가입하고, 첫 번째 디지털 명함을 만들어보세요. 
                    신용카드 정보는 필요 없습니다.
                </p>
                <button onclick="showAuthModal('register')" class="bg-white text-primary-500 px-10 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition shadow-xl">
                    <i class="fas fa-rocket mr-2"></i>
                    무료로 시작하기
                </button>
                <p class="text-white/80 mt-4 text-sm">
                    ✓ 신용카드 불필요 &nbsp; ✓ 30초 가입 &nbsp; ✓ 언제든 취소 가능
                </p>
            </div>
        </section>
        
        <!-- Footer -->
        <footer class="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
            <div class="max-w-7xl mx-auto">
                <div class="grid md:grid-cols-4 gap-8 mb-8">
                    <!-- Company -->
                    <div>
                        <div class="flex items-center space-x-2 mb-4">
                            <div class="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
                                <i class="fas fa-id-card text-white"></i>
                            </div>
                            <span class="text-xl font-bold">METI</span>
                        </div>
                        <p class="text-gray-400 text-sm">
                            명함 한 장이 새로운 세계를 열다
                        </p>
                    </div>
                    
                    <!-- Product -->
                    <div>
                        <h4 class="font-bold mb-4">제품</h4>
                        <ul class="space-y-2 text-gray-400 text-sm">
                            <li><a href="#features" class="hover:text-white transition">기능</a></li>
                            <li><a href="#pricing" class="hover:text-white transition">요금제</a></li>
                            <li><a href="#" class="hover:text-white transition">기업용</a></li>
                        </ul>
                    </div>
                    
                    <!-- Company -->
                    <div>
                        <h4 class="font-bold mb-4">회사</h4>
                        <ul class="space-y-2 text-gray-400 text-sm">
                            <li><a href="#" class="hover:text-white transition">소개</a></li>
                            <li><a href="#" class="hover:text-white transition">블로그</a></li>
                            <li><a href="#" class="hover:text-white transition">채용</a></li>
                        </ul>
                    </div>
                    
                    <!-- Support -->
                    <div>
                        <h4 class="font-bold mb-4">지원</h4>
                        <ul class="space-y-2 text-gray-400 text-sm">
                            <li><a href="#" class="hover:text-white transition">도움말</a></li>
                            <li><a href="#" class="hover:text-white transition">API 문서</a></li>
                            <li><a href="#" class="hover:text-white transition">문의하기</a></li>
                        </ul>
                    </div>
                </div>
                
                <!-- Bottom -->
                <div class="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p class="text-gray-400 text-sm mb-4 md:mb-0">
                        © 2026 METI. All rights reserved.
                    </p>
                    <div class="flex space-x-6">
                        <a href="#" class="text-gray-400 hover:text-white transition">
                            <i class="fab fa-twitter text-xl"></i>
                        </a>
                        <a href="#" class="text-gray-400 hover:text-white transition">
                            <i class="fab fa-linkedin text-xl"></i>
                        </a>
                        <a href="#" class="text-gray-400 hover:text-white transition">
                            <i class="fab fa-facebook text-xl"></i>
                        </a>
                        <a href="#" class="text-gray-400 hover:text-white transition">
                            <i class="fab fa-instagram text-xl"></i>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
        
        <!-- Auth Modal (Placeholder) -->
        <div id="authModal" class="hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div class="bg-white rounded-2xl max-w-md w-full p-8 relative" onclick="event.stopPropagation()">
                <button onclick="closeAuthModal()" class="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                    <i class="fas fa-times text-xl"></i>
                </button>
                <div id="authContent"></div>
            </div>
        </div>
        
        <!-- Scripts -->
        <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
        <script>
          AOS.init({
            duration: 800,
            once: true,
            offset: 100
          });
          
          // Navbar scroll effect
          window.addEventListener('scroll', function() {
            const navbar = document.querySelector('nav');
            if (window.scrollY > 50) {
              navbar.classList.add('scrolled');
            } else {
              navbar.classList.remove('scrolled');
            }
          });
          
          // Mobile menu toggle
          function toggleMobileMenu() {
            const menu = document.getElementById('mobileMenu');
            menu.classList.toggle('hidden');
          }
          
          // Auth modal
          function showAuthModal(type) {
            const modal = document.getElementById('authModal');
            const content = document.getElementById('authContent');
            
            if (type === 'register') {
              content.innerHTML = \`
                <h2 class="text-2xl font-bold mb-6">회원가입</h2>
                <form onsubmit="handleRegister(event)" class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">이메일</label>
                    <input type="email" name="email" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent" placeholder="your@email.com">
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">이름</label>
                    <input type="text" name="name" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent" placeholder="홍길동">
                  </div>
                  <button type="submit" class="w-full bg-primary-500 text-white py-3 rounded-lg font-semibold hover:bg-primary-600 transition">
                    시작하기
                  </button>
                </form>
                <p class="text-center text-sm text-gray-600 mt-4">
                  이미 계정이 있으신가요? <button onclick="showAuthModal('login')" class="text-primary-500 font-semibold">로그인</button>
                </p>
              \`;
            } else {
              content.innerHTML = \`
                <h2 class="text-2xl font-bold mb-6">로그인</h2>
                <form onsubmit="handleLogin(event)" class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">이메일</label>
                    <input type="email" name="email" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent" placeholder="your@email.com">
                  </div>
                  <button type="submit" class="w-full bg-primary-500 text-white py-3 rounded-lg font-semibold hover:bg-primary-600 transition">
                    로그인
                  </button>
                </form>
                <p class="text-center text-sm text-gray-600 mt-4">
                  계정이 없으신가요? <button onclick="showAuthModal('register')" class="text-primary-500 font-semibold">회원가입</button>
                </p>
              \`;
            }
            
            modal.classList.remove('hidden');
            modal.onclick = closeAuthModal;
          }
          
          function closeAuthModal() {
            document.getElementById('authModal').classList.add('hidden');
          }
          
          function scrollToDemo() {
            document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
          }
          
          async function handleRegister(e) {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = {
              email: formData.get('email'),
              name: formData.get('name')
            };
            
            try {
              const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
              });
              
              const result = await response.json();
              
              if (result.success) {
                localStorage.setItem('meti_token', result.data.token);
                alert('회원가입 성공! 잠시 후 대시보드로 이동합니다.');
                closeAuthModal();
                // TODO: Redirect to dashboard
              } else {
                alert('오류: ' + result.error);
              }
            } catch (error) {
              alert('회원가입 중 오류가 발생했습니다.');
            }
          }
          
          async function handleLogin(e) {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = {
              email: formData.get('email')
            };
            
            try {
              const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
              });
              
              const result = await response.json();
              
              if (result.success) {
                localStorage.setItem('meti_token', result.data.token);
                alert('로그인 성공! 잠시 후 대시보드로 이동합니다.');
                closeAuthModal();
                // TODO: Redirect to dashboard
              } else {
                alert('오류: ' + result.error);
              }
            } catch (error) {
              alert('로그인 중 오류가 발생했습니다.');
            }
          }
        </script>
    </body>
    </html>
  `);
});

export default app;
