# HappyTree 통합 스펙
> METI 외부 제휴 연동 가이드 (OAuth 2.0 기반)

**작성일**: 2026-04-16  
**대상**: HappyTree 개발 에이전트  
**관련 문서**: `METI_HAPPYTREE_SEPARATION.md` (METI 에이전트용)

---

## 📋 목차

1. [개요](#개요)
2. [아키텍처](#아키텍처)
3. [HappyTree 구현 요구사항](#happytree-구현-요구사항)
4. [METI OAuth API 스펙](#meti-oauth-api-스펙)
5. [통합 시나리오](#통합-시나리오)
6. [보안 고려사항](#보안-고려사항)
7. [테스트 가이드](#테스트-가이드)

---

## 개요

### 배경
- METI와 HappyTree는 **별도 법인**으로 분리
- METI는 HappyTree의 **진입점(Gateway)** 역할만 수행
- HappyTree는 **독립 서비스**로 운영 (자체 DB, 로직, 인프라)

### 연동 방식
- **OAuth 2.0 기반 SSO (Single Sign-On)**
- METI가 단기 토큰 발급 → HappyTree가 검증
- 이후 게임 세션은 HappyTree 자체 관리

### HappyTree의 역할
1. METI로부터 받은 토큰 검증
2. 사용자 정보 확인 후 게임 세션 생성
3. 모든 게임 데이터는 HappyTree DB에 저장
4. 게임 UI/UX 제공 (웹뷰)

---

## 아키텍처

### 전체 플로우

```
┌──────────────────────────────────────────────────────────────┐
│                    사용자 여정                                │
└──────────────────────────────────────────────────────────────┘

1. [사용자] METI 앱 로그인 (이미 로그인 상태)
   └─> METI 세션 유지 중

2. [사용자] "혜택" 탭 → "HappyTree" 카드 탭
   
3. [METI 클라이언트]
   └─> POST /api/oauth/generate-game-token
       Headers: Authorization: Bearer {meti_session}
   
4. [METI 서버]
   └─> 사용자 인증 확인
   └─> JWT 토큰 생성 (유효기간 5분)
       Payload: { user_id, email, name, exp, iss, aud }
   └─> 반환: { token: "eyJ...", expires_in: 300 }

5. [METI 클라이언트]
   └─> 웹뷰 오픈
       URL: https://happytree.com/entry?token={jwt}&ref=meti

6. [HappyTree 서버] ← 토큰 검증 요청
   └─> GET https://meti.com/api/oauth/verify-game-token?token={jwt}
   
7. [METI 서버]
   └─> JWT 서명 검증
   └─> 만료 시간 확인
   └─> 사용자 정보 반환
       {
         "user_id": "123",
         "email": "user@example.com",
         "name": "홍길동",
         "verified": true
       }

8. [HappyTree 서버]
   └─> 사용자 정보로 DB 조회 (meti_user_id 기준)
   └─> 신규 사용자: 계정 생성
   └─> 기존 사용자: 기존 데이터 로드
   └─> HappyTree 세션 생성 (자체 JWT/쿠키)

9. [HappyTree 클라이언트]
   └─> 게임 화면 렌더링
   └─> 이후 모든 게임 API는 HappyTree 서버와 통신

10. [사용자] 게임 플레이
    └─> 모든 데이터 HappyTree DB에 저장

11. [사용자] 웹뷰 닫기
    └─> METI "혜택" 탭으로 복귀
```

### 데이터베이스 구조

```
[METI DB]                         [HappyTree DB]
─────────────────────            ──────────────────────────
users                             game_users
├─ id (PK)                        ├─ id (PK, 자체 생성)
├─ email                          ├─ meti_user_id (FK, Indexed)
├─ name                           ├─ email (중복 저장)
├─ created_at                     ├─ name (중복 저장)
└─ ...                            ├─ created_at
                                  └─ last_login_at
                                  
                                  game_farms
                                  ├─ id (PK)
                                  ├─ user_id (FK)
                                  ├─ farm_level
                                  ├─ hearts_balance
                                  └─ ...
                                  
                                  game_pots
                                  ├─ id (PK)
                                  ├─ user_id (FK)
                                  ├─ pot_level
                                  └─ ...
                                  
                                  game_sessions
                                  ├─ id (PK)
                                  ├─ user_id (FK)
                                  ├─ session_token
                                  ├─ expires_at
                                  └─ created_at
```

**중요**: 
- `meti_user_id`는 불변 (METI의 user.id)
- `email`은 참조용으로 중복 저장 (변경 시 동기화 필요 없음)
- 게임 데이터는 100% HappyTree 소유

---

## HappyTree 구현 요구사항

### 1. 진입점 엔드포인트

**URL**: `GET /entry`

**Query Parameters**:
- `token` (required): METI에서 발급한 JWT
- `ref` (optional): 유입 경로 (`meti`)

**처리 로직**:
```typescript
app.get('/entry', async (req, res) => {
  const { token, ref } = req.query;

  if (!token) {
    return res.status(400).send('Token required');
  }

  try {
    // 1. METI에 토큰 검증 요청
    const metiResponse = await fetch(
      `https://meti-3gk.pages.dev/api/oauth/verify-game-token?token=${token}`
    );

    if (!metiResponse.ok) {
      throw new Error('Invalid token');
    }

    const userData = await metiResponse.json();
    // { user_id, email, name, verified }

    // 2. HappyTree DB에서 사용자 조회 (meti_user_id 기준)
    let gameUser = await db.query(
      'SELECT * FROM game_users WHERE meti_user_id = ?',
      [userData.user_id]
    );

    // 3. 신규 사용자: 계정 생성
    if (!gameUser) {
      gameUser = await db.query(
        `INSERT INTO game_users 
         (meti_user_id, email, name, created_at) 
         VALUES (?, ?, ?, NOW())`,
        [userData.user_id, userData.email, userData.name]
      );

      // 초기 농장 데이터 생성
      await initializeUserFarm(gameUser.id);
    }

    // 4. HappyTree 세션 생성
    const gameSession = await createGameSession(gameUser.id);

    // 5. 세션 쿠키 설정
    res.cookie('happytree_session', gameSession.token, {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000 // 24시간
    });

    // 6. 게임 메인 페이지로 리다이렉트
    res.redirect('/game/main');
  } catch (error) {
    console.error('Entry error:', error);
    res.status(401).send('Authentication failed');
  }
});
```

### 2. 토큰 검증 함수

```typescript
async function verifyMetiToken(token: string): Promise<UserInfo> {
  const METI_VERIFY_URL = process.env.METI_VERIFY_URL || 
    'https://meti-3gk.pages.dev/api/oauth/verify-game-token';

  const response = await fetch(`${METI_VERIFY_URL}?token=${token}`, {
    headers: {
      'Accept': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error(`METI token verification failed: ${response.status}`);
  }

  const data = await response.json();

  if (!data.verified) {
    throw new Error('Token not verified');
  }

  return {
    metiUserId: data.user_id,
    email: data.email,
    name: data.name
  };
}
```

### 3. 사용자 초기화

```typescript
async function initializeUserFarm(userId: number): Promise<void> {
  // 기본 농장 생성
  await db.query(
    `INSERT INTO game_farms 
     (user_id, farm_level, hearts_balance, created_at) 
     VALUES (?, 1, 300000, NOW())`,
    [userId]
  );

  // 기본 화분 3개 생성
  for (let i = 0; i < 3; i++) {
    await db.query(
      `INSERT INTO game_pots 
       (user_id, pot_level, position, created_at) 
       VALUES (?, 1, ?, NOW())`,
      [userId, i]
    );
  }
}
```

### 4. 세션 관리

```typescript
async function createGameSession(userId: number): Promise<GameSession> {
  // HappyTree 자체 세션 토큰 생성
  const sessionToken = generateSecureToken();
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24시간

  const session = await db.query(
    `INSERT INTO game_sessions 
     (user_id, session_token, expires_at, created_at) 
     VALUES (?, ?, ?, NOW())`,
    [userId, sessionToken, expiresAt]
  );

  return {
    id: session.insertId,
    token: sessionToken,
    expiresAt
  };
}

function generateSecureToken(): string {
  return crypto.randomBytes(32).toString('hex');
}
```

### 5. 인증 미들웨어

```typescript
async function authMiddleware(req, res, next) {
  const sessionToken = req.cookies.happytree_session;

  if (!sessionToken) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const session = await db.query(
    `SELECT s.*, u.* 
     FROM game_sessions s 
     JOIN game_users u ON s.user_id = u.id 
     WHERE s.session_token = ? AND s.expires_at > NOW()`,
    [sessionToken]
  );

  if (!session) {
    return res.status(401).json({ error: 'Session expired' });
  }

  req.user = session;
  next();
}

// 사용 예시
app.get('/api/game/farm', authMiddleware, async (req, res) => {
  const farm = await getFarmData(req.user.id);
  res.json(farm);
});
```

---

## METI OAuth API 스펙

### 1. 토큰 발급 API

**Endpoint**: `POST https://meti-3gk.pages.dev/api/oauth/generate-game-token`

**Request Headers**:
```
Authorization: Bearer {meti_session_token}
```

**Response** (200 OK):
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMTc3NDU4MjQ3OTE1Ny04aXh1bGh5YzciLCJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20iLCJuYW1lIjoi7ZmN6ri464+ZIiwiZXhwIjoxNzEzMjQxMjAwLCJpYXQiOjE3MTMyNDA5MDAsImlzcyI6Im1ldGkiLCJhdWQiOiJoYXBweXRyZWUifQ.abc123",
  "expires_in": 300
}
```

### 2. 토큰 검증 API

**Endpoint**: `GET https://meti-3gk.pages.dev/api/oauth/verify-game-token?token={jwt}`

**Query Parameters**:
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

또는

```json
{
  "error": "Invalid token"
}
```

### JWT Payload 구조

```json
{
  "user_id": "1774582479157-8ixulhyc7",
  "email": "user@example.com",
  "name": "홍길동",
  "exp": 1713241200,
  "iat": 1713240900,
  "iss": "meti",
  "aud": "happytree"
}
```

**필드 설명**:
- `user_id`: METI 사용자 고유 ID (영구 불변)
- `email`: 사용자 이메일
- `name`: 사용자 이름
- `exp`: 만료 시간 (Unix timestamp)
- `iat`: 발급 시간 (Unix timestamp)
- `iss`: 발급자 (항상 "meti")
- `aud`: 수신자 (항상 "happytree")

---

## 통합 시나리오

### 시나리오 1: 신규 사용자 첫 접속

```
1. METI 사용자 "Alice" (user_id: "alice-123")가 HappyTree 카드 탭
2. METI: 토큰 발급 (exp: 5분)
3. 웹뷰 오픈: https://happytree.com/entry?token=xxx
4. HappyTree: METI에 토큰 검증 요청
5. METI: 사용자 정보 반환
   {
     "user_id": "alice-123",
     "email": "alice@example.com",
     "name": "Alice"
   }
6. HappyTree DB 조회: meti_user_id = "alice-123" → 없음
7. 신규 계정 생성:
   - game_users 테이블에 삽입
   - 기본 농장 생성 (farm_level: 1, hearts: 300000)
   - 기본 화분 3개 생성
8. HappyTree 세션 생성 (24시간 유효)
9. 게임 메인 화면 표시
```

### 시나리오 2: 기존 사용자 재접속

```
1. METI 사용자 "Bob" (user_id: "bob-456", 이전에 플레이한 적 있음)이 HappyTree 탭
2. METI: 토큰 발급
3. 웹뷰 오픈: https://happytree.com/entry?token=xxx
4. HappyTree: 토큰 검증
5. METI: 사용자 정보 반환
   {
     "user_id": "bob-456",
     "email": "bob@example.com",
     "name": "Bob"
   }
6. HappyTree DB 조회: meti_user_id = "bob-456" → 존재!
7. 기존 데이터 로드:
   - 농장 레벨: 5
   - 하트 잔액: 1,250,000
   - 화분 10개
8. HappyTree 세션 생성
9. 게임 메인 화면 표시 (기존 진행상황 그대로)
```

### 시나리오 3: 토큰 만료

```
1. 사용자가 HappyTree 카드 탭
2. METI: 토큰 발급 (exp: 2026-04-16T10:05:00Z)
3. 웹뷰 오픈 시도
4. 네트워크 지연으로 6분 경과
5. HappyTree: 토큰 검증 요청
6. METI: { "error": "Token expired" } 반환
7. HappyTree: 에러 페이지 표시
   "인증이 만료되었습니다. METI 앱에서 다시 시도해주세요."
8. 사용자: 웹뷰 닫고 다시 카드 탭
9. METI: 새 토큰 발급 → 성공
```

---

## 보안 고려사항

### 1. JWT 검증 필수

**HappyTree는 절대 JWT를 직접 디코딩하지 말 것!**

```typescript
// ❌ 잘못된 방법
const decoded = jwt.decode(token); // 서명 검증 없이 디코딩
const userId = decoded.user_id;   // 위조 가능!

// ✅ 올바른 방법
const userData = await verifyMetiToken(token); // METI API 호출
const userId = userData.user_id;               // METI가 검증함
```

**이유**: 
- JWT 서명 검증은 METI만 가능 (공유 시크릿 보유)
- HappyTree가 직접 검증 시 시크릿 노출 위험
- METI API를 통한 검증이 표준 OAuth 방식

### 2. HTTPS 필수

```typescript
// 프로덕션 환경
const METI_VERIFY_URL = 'https://meti-3gk.pages.dev/api/oauth/verify-game-token';

// 로컬 개발만 HTTP 허용
if (process.env.NODE_ENV === 'development') {
  METI_VERIFY_URL = 'http://localhost:3000/api/oauth/verify-game-token';
}
```

### 3. CORS 설정

```typescript
// HappyTree 서버
app.use(cors({
  origin: ['https://meti-3gk.pages.dev'],
  credentials: true
}));
```

### 4. Rate Limiting

```typescript
// METI 토큰 검증 API에 대한 Rate Limit
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1분
  max: 100, // 최대 100회
  message: 'Too many requests'
});

app.get('/entry', limiter, async (req, res) => {
  // ...
});
```

### 5. 사용자 ID 불변성

```typescript
// meti_user_id는 절대 변경하지 말 것
// email/name은 변경 가능하지만, meti_user_id는 영구 불변

// ✅ 올바른 사용
const user = await db.query(
  'SELECT * FROM game_users WHERE meti_user_id = ?',
  [userData.user_id]
);

// ❌ 잘못된 사용 (email로 조회)
const user = await db.query(
  'SELECT * FROM game_users WHERE email = ?',
  [userData.email] // email은 변경될 수 있음!
);
```

---

## 테스트 가이드

### 로컬 개발 환경 설정

#### 1. METI 로컬 서버 실행
```bash
# METI 에이전트가 실행
cd /home/user/meti/apps/web
npm run dev:sandbox
# → http://localhost:3000
```

#### 2. HappyTree 로컬 서버 실행
```bash
# HappyTree 프로젝트
cd /path/to/happytree
npm run dev
# → http://localhost:3001
```

#### 3. 환경변수 설정
```bash
# HappyTree .env
METI_VERIFY_URL=http://localhost:3000/api/oauth/verify-game-token
NODE_ENV=development
```

### 통합 테스트 시나리오

#### 테스트 1: 토큰 발급 및 검증

```bash
# 1. METI에 로그인하여 세션 토큰 획득
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"password"}'
# → { "token": "meti_session_xxx" }

# 2. 게임 토큰 발급
curl -X POST http://localhost:3000/api/oauth/generate-game-token \
  -H "Authorization: Bearer meti_session_xxx"
# → { "token": "eyJ...", "expires_in": 300 }

# 3. HappyTree에서 토큰 검증
curl "http://localhost:3000/api/oauth/verify-game-token?token=eyJ..."
# → { "user_id": "123", "email": "test@test.com", "name": "테스터", "verified": true }
```

#### 테스트 2: 진입점 플로우

```bash
# 웹 브라우저에서
# 1. http://localhost:3000/benefits 접속
# 2. HappyTree 카드 클릭
# 3. 개발자 도구 네트워크 탭에서 확인:
#    - POST /api/oauth/generate-game-token
#    - 웹뷰 오픈 (또는 새 탭): http://localhost:3001/entry?token=xxx
# 4. HappyTree 서버 로그 확인:
#    - GET http://localhost:3000/api/oauth/verify-game-token
#    - 사용자 정보 수신
#    - DB 조회/생성
#    - 세션 생성
```

#### 테스트 3: 신규 vs 기존 사용자

```sql
-- HappyTree DB에서 테스트 사용자 삭제 (신규 사용자 테스트)
DELETE FROM game_users WHERE meti_user_id = 'test-user-123';

-- 다시 진입 → 신규 계정 생성 확인

-- 두 번째 진입 → 기존 데이터 로드 확인
SELECT * FROM game_users WHERE meti_user_id = 'test-user-123';
SELECT * FROM game_farms WHERE user_id = ?;
```

#### 테스트 4: 토큰 만료

```typescript
// METI에서 토큰 유효시간을 5초로 변경 (테스트용)
exp: Math.floor(Date.now() / 1000) + 5 // 5초

// 토큰 발급 후 10초 대기
setTimeout(() => {
  // 검증 시도 → 401 에러 예상
}, 10000);
```

### 프로덕션 테스트

```bash
# 1. 스테이징 환경 배포
METI: https://staging-meti.pages.dev
HappyTree: https://staging-happytree.com

# 2. End-to-end 테스트
# - METI 프로덕션 계정으로 로그인
# - HappyTree 진입
# - 게임 플레이
# - 데이터 저장 확인
# - 웹뷰 닫기 및 재진입

# 3. 모니터링
# - METI: OAuth API 호출 수
# - HappyTree: 진입 성공률
# - 에러 로그 확인
```

---

## FAQ

### Q1. METI 사용자 정보가 변경되면?

**A**: HappyTree는 `meti_user_id`만 불변 키로 사용합니다.
- `email`/`name` 변경: HappyTree DB에 반영 불필요
- 필요 시 다음 로그인 때 업데이트 가능

```typescript
// 선택적: 사용자 정보 동기화
if (gameUser.email !== userData.email || gameUser.name !== userData.name) {
  await db.query(
    'UPDATE game_users SET email = ?, name = ?, updated_at = NOW() WHERE id = ?',
    [userData.email, userData.name, gameUser.id]
  );
}
```

### Q2. 네트워크 타임아웃 처리는?

**A**: METI API 호출 시 타임아웃 설정

```typescript
const controller = new AbortController();
const timeout = setTimeout(() => controller.abort(), 5000); // 5초

try {
  const response = await fetch(metiVerifyUrl, {
    signal: controller.signal
  });
  clearTimeout(timeout);
} catch (error) {
  if (error.name === 'AbortError') {
    throw new Error('METI 인증 서버 응답 시간 초과');
  }
  throw error;
}
```

### Q3. METI가 다운되면?

**A**: HappyTree 기존 사용자는 계속 플레이 가능

```typescript
// HappyTree 세션이 유효하면 게임 가능
if (req.cookies.happytree_session) {
  // METI 없이도 작동
}

// 신규 진입만 METI 필요
// → 에러 페이지: "현재 서비스 점검 중입니다"
```

### Q4. 개발/스테이징/프로덕션 환경 분리는?

**A**: 환경변수로 관리

```typescript
// HappyTree .env
// Development
METI_VERIFY_URL=http://localhost:3000/api/oauth/verify-game-token

// Staging
METI_VERIFY_URL=https://staging-meti.pages.dev/api/oauth/verify-game-token

// Production
METI_VERIFY_URL=https://meti-3gk.pages.dev/api/oauth/verify-game-token
```

---

## 체크리스트

### HappyTree 개발 완료 조건

- [ ] **진입점 구현**: `/entry?token=xxx` 엔드포인트
- [ ] **토큰 검증**: METI API 호출 및 에러 처리
- [ ] **사용자 관리**: 
  - [ ] 신규 사용자 계정 생성
  - [ ] 기존 사용자 데이터 로드
  - [ ] `meti_user_id` 인덱싱
- [ ] **세션 관리**: HappyTree 자체 세션 (쿠키/JWT)
- [ ] **게임 로직**: 완전 독립 실행
- [ ] **DB 스키마**: `game_users`, `game_farms`, `game_pots` 등
- [ ] **에러 처리**: 토큰 만료, 네트워크 오류 등
- [ ] **보안**: HTTPS, CORS, Rate Limiting

### 배포 전 확인

- [ ] **환경변수**: `METI_VERIFY_URL` 프로덕션 URL 설정
- [ ] **DB 마이그레이션**: 프로덕션 DB 스키마 적용
- [ ] **통합 테스트**: METI와 end-to-end 검증
- [ ] **모니터링**: 로그, 메트릭 설정
- [ ] **롤백 계획**: 긴급 상황 대응

---

## 연락처 및 지원

### METI 팀 문의
- **기술 이슈**: METI 에이전트 세션
- **OAuth API 문제**: `METI_HAPPYTREE_SEPARATION.md` 참조

### HappyTree 개발 참고
- **프로젝트 위치**: (별도 저장소)
- **문서**: 이 파일 (`HAPPYTREE_INTEGRATION_SPEC.md`)

---

**작성자**: METI Integration Team  
**최종 수정**: 2026-04-16  
**버전**: 1.0  
**대상 독자**: HappyTree 개발 에이전트
