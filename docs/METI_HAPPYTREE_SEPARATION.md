# METI 에이전트 작업 지시서
> 해피트리 분리 및 외부 제휴 전환 (OAuth 기반 인앱 웹뷰)

**작성일**: 2026-04-16  
**우선순위**: HIGH - 이 문서는 기존 코드베이스와 충돌 시 우선 적용  
**담당**: METI 개발 에이전트  
**관련 문서**: `HAPPYTREE_INTEGRATION_SPEC.md` (해피트리 에이전트용)

---

## 📋 목차

1. [배경 및 목적](#배경-및-목적)
2. [현재 상태 분석](#현재-상태-분석)
3. [목표 아키텍처](#목표-아키텍처)
4. [METI 작업 내역](#meti-작업-내역)
5. [API 스펙](#api-스펙)
6. [테스트 계획](#테스트-계획)
7. [완료 조건](#완료-조건)

---

## 배경 및 목적

### 법인 분리
- **METI**: 디지털 명함 플랫폼 (메인 비즈니스)
- **HappyTree**: 소셜 농장 게임 (별도 법인)

### 전환 이유
1. 법인 분리에 따른 책임 명확화
2. 각 서비스의 독립적 운영/확장
3. 개인정보 처리 주체 분리
4. 향후 다른 제휴 서비스 추가 대비

### 목표
METI는 **혜택 탭**에서 HappyTree를 포함한 여러 제휴 서비스의 **진입점(gateway)만 제공**하고, 비즈니스 로직은 각 서비스가 독립적으로 관리

---

## 현재 상태 분석

### AS-IS (통합 구조)

```
METI 앱
├── 명함 기능 ✅
├── 지갑 기능 ✅
└── 게임 기능 (HappyTree) ❌
    ├── game_user_data 테이블
    ├── game_pots 테이블
    ├── game_farm_levels 테이블
    └── /api/game/* 엔드포인트
```

**문제점**:
- METI DB에 게임 데이터 혼재
- METI 코드에 게임 로직 포함
- 법인 분리 시 데이터 소유권 불명확
- 확장성 제한 (다른 게임 추가 어려움)

### TO-BE (분리 구조)

```
METI 앱                          HappyTree 서비스
├── 명함 기능 ✅                  ├── 독립 DB
├── 지갑 기능 ✅                  ├── 게임 로직
└── 혜택 탭 ✅                    └── /api/game/*
    ├── HappyTree (OAuth)  ───→
    ├── 걸어서 포인트
    └── 기타 캐주얼 게임
```

**장점**:
- 명확한 책임 분리
- 각 서비스 독립 운영
- METI는 진입점만 관리
- 다른 제휴 추가 용이

---

## 목표 아키텍처

### OAuth 2.0 기반 SSO (Single Sign-On)

```
┌─────────────────────────────────────────────────────────────┐
│                        사용자 플로우                          │
└─────────────────────────────────────────────────────────────┘

1. 사용자 "혜택" 탭 접근
   └─> "HappyTree 농장 게임" 카드 표시

2. 카드 탭
   └─> METI: POST /api/auth/generate-game-token
       └─> 토큰 발급 (유효기간 5분)

3. 인앱 웹뷰 오픈
   └─> https://happytree.com/entry?token=xxx&ref=meti

4. HappyTree 서버
   └─> METI: GET /api/auth/verify-game-token?token=xxx
       └─> 사용자 정보 반환 (user_id, email)
   └─> HappyTree DB에 게임 데이터 저장
   └─> 게임 화면 렌더링

5. 게임 플레이
   └─> 모든 데이터는 HappyTree 서버에 저장

6. 웹뷰 닫기
   └─> METI "혜택" 탭으로 복귀
```

### 데이터 흐름

```
[METI DB]                    [HappyTree DB]
users                        game_users
├─ id                        ├─ id (자체 생성)
├─ email                     ├─ meti_user_id (외래키)
└─ name                      ├─ email (중복 저장)
                             ├─ game_data
                             └─ created_at

                             game_pots
                             game_farm_levels
                             ...
```

---

## METI 작업 내역

### Phase 1: 백업 및 준비 (우선)

#### 1.1 백업 브랜치 생성
```bash
cd /home/user/meti
git checkout -b backup/happytree-embedded
git add -A
git commit -m "backup: HappyTree embedded implementation before separation"
git push origin backup/happytree-embedded
```

#### 1.2 현재 게임 테이블 백업
```bash
# D1 데이터 덤프
npx wrangler d1 export meti-production \
  --output happytree_backup_2026-04-16.sql \
  --tables game_user_data,game_pots,game_farm_levels
```

### Phase 2: OAuth API 구현

#### 2.1 새 라우트 파일 생성
**파일**: `/home/user/meti/apps/web/src/routes/oauth.ts`

```typescript
import { Hono } from 'hono';
import { sign, verify } from 'hono/jwt';
import type { Env } from '../types';

const oauth = new Hono<{ Bindings: Env }>();

// 공유 시크릿 (환경변수 또는 .dev.vars)
const GAME_TOKEN_SECRET = 'your-shared-secret-with-happytree';

// 게임 토큰 발급 (5분 유효)
oauth.post('/generate-game-token', async (c) => {
  // 세션에서 사용자 정보 가져오기 (기존 인증 확인)
  const sessionToken = c.req.header('Authorization')?.replace('Bearer ', '');
  if (!sessionToken) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  // 사용자 인증 확인 (기존 METI 세션 검증)
  const user = await c.env.DB.prepare(
    'SELECT id, email, name FROM users WHERE session_token = ?'
  ).bind(sessionToken).first();

  if (!user) {
    return c.json({ error: 'Invalid session' }, 401);
  }

  // JWT 토큰 생성 (5분 유효)
  const payload = {
    user_id: user.id,
    email: user.email,
    name: user.name,
    exp: Math.floor(Date.now() / 1000) + (5 * 60), // 5분 후 만료
    iat: Math.floor(Date.now() / 1000),
    iss: 'meti',
    aud: 'happytree'
  };

  const token = await sign(payload, GAME_TOKEN_SECRET);

  return c.json({ 
    token,
    expires_in: 300 // 5분 (초)
  });
});

// 게임 토큰 검증 (HappyTree가 호출)
oauth.get('/verify-game-token', async (c) => {
  const token = c.req.query('token');
  
  if (!token) {
    return c.json({ error: 'Token required' }, 400);
  }

  try {
    const payload = await verify(token, GAME_TOKEN_SECRET);
    
    // 만료 확인
    if (payload.exp < Math.floor(Date.now() / 1000)) {
      return c.json({ error: 'Token expired' }, 401);
    }

    // 발급자/수신자 확인
    if (payload.iss !== 'meti' || payload.aud !== 'happytree') {
      return c.json({ error: 'Invalid token' }, 401);
    }

    // 사용자 정보 반환 (HappyTree가 사용)
    return c.json({
      user_id: payload.user_id,
      email: payload.email,
      name: payload.name,
      verified: true
    });
  } catch (error) {
    return c.json({ error: 'Invalid token' }, 401);
  }
});

export default oauth;
```

#### 2.2 메인 앱에 라우트 추가
**파일**: `/home/user/meti/apps/web/src/index.tsx`

```typescript
import oauth from './routes/oauth';

// 기존 라우트들...
app.route('/api/oauth', oauth);
```

### Phase 3: 게임 관련 코드 제거

#### 3.1 라우트 제거
```bash
# 백업 확인 후 삭제
rm /home/user/meti/apps/web/src/routes/game.ts
```

#### 3.2 index.tsx에서 게임 라우트 제거
```typescript
// 삭제: import game from './routes/game';
// 삭제: app.route('/api/game', game);
```

#### 3.3 어드민 페이지 수정
**파일**: `/home/user/meti/apps/web/src/routes/admin.ts`

**옵션 1**: 어드민 시뮬레이터 유지 (읽기 전용)
```typescript
// 기존 유지하되, 실제 DB 접근은 제거
// 시뮬레이션만 가능하도록 수정
```

**옵션 2**: 완전 제거
```typescript
// HappyTree 시뮬레이터 섹션 전체 제거
// 또는 "HappyTree 관리는 별도 어드민에서"라는 안내 표시
```

### Phase 4: 혜택 탭 구현

#### 4.1 새 라우트 생성
**파일**: `/home/user/meti/apps/web/src/routes/benefits.ts`

```typescript
import { Hono } from 'hono';
import type { Env } from '../types';

const benefits = new Hono<{ Bindings: Env }>();

benefits.get('/', async (c) => {
  return c.html(`
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>혜택 - METI</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
</head>
<body class="bg-gray-50">
    <div class="max-w-4xl mx-auto p-4">
        <h1 class="text-2xl font-bold mb-6">🎁 혜택</h1>
        
        <!-- HappyTree 카드 -->
        <div class="bg-white rounded-lg shadow p-6 mb-4 cursor-pointer hover:shadow-lg transition"
             onclick="openHappyTree()">
            <div class="flex items-center mb-3">
                <span class="text-3xl mr-3">🌳</span>
                <div>
                    <h2 class="text-lg font-bold">HappyTree 농장 게임</h2>
                    <p class="text-sm text-gray-600">나만의 농장을 키우고 보상을 받아보세요</p>
                </div>
            </div>
            <div class="flex items-center text-blue-600 text-sm">
                <span>게임 시작하기</span>
                <i class="fas fa-arrow-right ml-2"></i>
            </div>
        </div>

        <!-- 기타 제휴 서비스 카드들 (예정) -->
        <div class="bg-gray-100 rounded-lg p-6 mb-4">
            <div class="flex items-center mb-2">
                <span class="text-2xl mr-3">🚶</span>
                <h2 class="text-lg font-bold text-gray-400">걸어서 포인트 (준비중)</h2>
            </div>
        </div>

        <div class="bg-gray-100 rounded-lg p-6">
            <div class="flex items-center mb-2">
                <span class="text-2xl mr-3">🎮</span>
                <h2 class="text-lg font-bold text-gray-400">캐주얼 게임 (준비중)</h2>
            </div>
        </div>
    </div>

    <script>
    async function openHappyTree() {
        try {
            // 로딩 표시
            showLoading();

            // 토큰 발급
            const response = await fetch('/api/oauth/generate-game-token', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + getSessionToken()
                }
            });

            if (!response.ok) {
                throw new Error('로그인이 필요합니다');
            }

            const data = await response.json();
            const token = data.token;

            // HappyTree URL 생성
            const happyTreeUrl = \`https://happytree.com/entry?token=\${token}&ref=meti\`;

            // 웹뷰 오픈 (모바일 앱) 또는 새 창 (웹)
            if (isMobileApp()) {
                // 모바일 앱: 인앱 웹뷰
                window.location.href = \`meti://webview?url=\${encodeURIComponent(happyTreeUrl)}&title=HappyTree\`;
            } else {
                // 웹 브라우저: 새 탭
                window.open(happyTreeUrl, '_blank');
            }

            hideLoading();
        } catch (error) {
            hideLoading();
            alert(error.message || '오류가 발생했습니다');
        }
    }

    function getSessionToken() {
        // 쿠키 또는 localStorage에서 세션 토큰 가져오기
        return localStorage.getItem('meti_session_token') || '';
    }

    function isMobileApp() {
        return /MetiApp/i.test(navigator.userAgent);
    }

    function showLoading() {
        // 로딩 스피너 표시
    }

    function hideLoading() {
        // 로딩 스피너 숨김
    }
    </script>
</body>
</html>
  `);
});

export default benefits;
```

#### 4.2 라우트 등록
**파일**: `/home/user/meti/apps/web/src/index.tsx`

```typescript
import benefits from './routes/benefits';

app.route('/benefits', benefits);
```

### Phase 5: 환경변수 설정

#### 5.1 로컬 개발 (.dev.vars)
```bash
# /home/user/meti/apps/web/.dev.vars
GAME_TOKEN_SECRET=your-shared-secret-with-happytree-dev
HAPPYTREE_URL=http://localhost:3001
```

#### 5.2 프로덕션 (Cloudflare Pages)
```bash
npx wrangler pages secret put GAME_TOKEN_SECRET --project-name meti
# 입력: your-shared-secret-with-happytree-prod

npx wrangler pages secret put HAPPYTREE_URL --project-name meti
# 입력: https://happytree.com
```

### Phase 6: 데이터베이스 정리 (선택)

#### 옵션 1: 테이블 유지 (읽기 전용)
- 기존 게임 데이터 보존
- 어드민 시뮬레이터에서 참조 가능
- 새로운 게임 데이터는 HappyTree DB에만 저장

#### 옵션 2: 테이블 삭제
```sql
-- 마이그레이션 파일 생성
-- /home/user/meti/apps/web/migrations/0004_remove_game_tables.sql

DROP TABLE IF EXISTS game_user_data;
DROP TABLE IF EXISTS game_pots;
DROP TABLE IF EXISTS game_farm_levels;
DROP TABLE IF EXISTS card_rewards;
```

---

## API 스펙

### 1. 토큰 발급 API

**Endpoint**: `POST /api/oauth/generate-game-token`

**Request Headers**:
```
Authorization: Bearer {meti_session_token}
```

**Response** (200 OK):
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expires_in": 300
}
```

**Response** (401 Unauthorized):
```json
{
  "error": "Unauthorized"
}
```

### 2. 토큰 검증 API

**Endpoint**: `GET /api/oauth/verify-game-token?token={jwt_token}`

**Request Parameters**:
- `token` (required): JWT 토큰

**Response** (200 OK):
```json
{
  "user_id": "1774582479157-8ixulhyc7",
  "email": "user@example.com",
  "name": "홍길동",
  "verified": true
}
```

**Response** (401 Unauthorized):
```json
{
  "error": "Token expired"
}
```

### JWT Payload 구조

```json
{
  "user_id": "string",
  "email": "string",
  "name": "string",
  "exp": 1234567890,
  "iat": 1234567590,
  "iss": "meti",
  "aud": "happytree"
}
```

---

## 테스트 계획

### 로컬 테스트

#### 1. OAuth API 테스트
```bash
# 1. 로그인하여 세션 토큰 획득
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"password"}'

# 응답에서 session_token 복사

# 2. 게임 토큰 발급
curl -X POST http://localhost:3000/api/oauth/generate-game-token \
  -H "Authorization: Bearer {session_token}"

# 응답에서 token 복사

# 3. 토큰 검증
curl "http://localhost:3000/api/oauth/verify-game-token?token={jwt_token}"

# 사용자 정보가 반환되는지 확인
```

#### 2. 혜택 탭 테스트
```bash
# 브라우저에서 접근
open http://localhost:3000/benefits

# HappyTree 카드 클릭
# → 콘솔에서 토큰 발급 확인
# → URL 생성 확인
```

### 통합 테스트 (HappyTree와 함께)

**전제조건**: HappyTree 서버가 토큰 검증 API를 호출할 수 있어야 함

1. METI에서 토큰 발급
2. HappyTree URL에 토큰 포함하여 웹뷰 오픈
3. HappyTree가 METI에 토큰 검증 요청
4. 사용자 정보 받아서 게임 초기화
5. 게임 플레이 후 웹뷰 닫기
6. METI 혜택 탭으로 복귀 확인

---

## 완료 조건

### 필수 조건

- [ ] **백업 완료**: `backup/happytree-embedded` 브랜치 생성
- [ ] **OAuth API 구현**: `/api/oauth/generate-game-token`, `/api/oauth/verify-game-token`
- [ ] **게임 라우트 제거**: `/api/game/*` 엔드포인트 삭제
- [ ] **혜택 탭 구현**: `/benefits` 페이지 생성
- [ ] **HappyTree 카드**: 클릭 시 토큰 포함 URL로 웹뷰 오픈
- [ ] **환경변수 설정**: `GAME_TOKEN_SECRET`, `HAPPYTREE_URL`
- [ ] **로컬 테스트**: OAuth 플로우 정상 작동 확인

### 선택 조건

- [ ] **어드민 수정**: 게임 시뮬레이터 제거 또는 읽기 전용 전환
- [ ] **DB 정리**: 게임 테이블 제거 (또는 유지)
- [ ] **메타데이터 정리**: `card_rewards` 테이블 처리 방침 결정

### 배포 전 확인

- [ ] **HappyTree 에이전트 확인**: 
  - 토큰 검증 API 호출 가능
  - JWT 서명 검증 성공
  - 사용자 정보 파싱 정상
- [ ] **시크릿 공유**: 프로덕션 `GAME_TOKEN_SECRET` 안전하게 전달
- [ ] **URL 확정**: HappyTree 프로덕션 URL 확인
- [ ] **통합 테스트**: End-to-end 플로우 검증

---

## 롤백 계획

### 긴급 롤백 시

```bash
# 1. 백업 브랜치로 복구
git checkout backup/happytree-embedded
git checkout -b rollback/restore-happytree

# 2. 필요한 파일만 복구
git checkout backup/happytree-embedded -- apps/web/src/routes/game.ts

# 3. 빌드 및 배포
npm run build
npm run deploy:prod
```

### 부분 롤백 (OAuth만 제거)

```bash
# OAuth 라우트만 비활성화
# index.tsx에서 주석 처리
// app.route('/api/oauth', oauth);
```

---

## 관련 문서

- [HappyTree 통합 스펙](./HAPPYTREE_INTEGRATION_SPEC.md) - HappyTree 에이전트용
- [METI API 문서](./04_API_SPEC.md)
- [데이터 모델](./03_DATA_MODEL.md)

---

**작성자**: METI Development Team  
**최종 수정**: 2026-04-16  
**버전**: 1.0
