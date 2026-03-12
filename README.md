# METI - 디지털 명함 앱

> **Phase 1 MVP** - 웹 기반 디지털 명함 + HappyTree 게임 통합

![METI Logo](https://img.shields.io/badge/METI-v1.0-blue) ![Status](https://img.shields.io/badge/status-development-yellow)

## 📋 프로젝트 개요

**METI(메티)**는 명함 교환을 중심으로 한 소셜 네트워킹 + 게임 + 제휴 혜택을 통합한 올인원 비즈니스 커뮤니케이션 플랫폼입니다.

```
METI = Meet + Interact (만남과 상호작용)
"명함 한 장이 새로운 세계를 열다"
```

## 🎯 핵심 기능

### Phase 1 (현재)
- ✅ 회원가입/로그인 (이메일 기반, Google OAuth 예정)
- ✅ 디지털 명함 생성/편집
- ✅ 명함 공유 (QR 코드, 링크)
- ✅ 명함 지갑 (저장/관리)
- ✅ HappyTree 게임 통합
- ✅ 명함 교환 → 게임 보상 시스템
- ✅ Cloudflare D1 Database

### Phase 2 (예정)
- ⏳ Google OAuth 인증
- ⏳ 복수 명함 관리
- ⏳ 명함 분석 (조회수, 공유수)
- ⏳ 태그/메모/그룹 관리
- ⏳ 프리미엄 구독

### Phase 3 (예정)
- ⏳ React Native 앱 (iOS/Android)
- ⏳ NFC 명함 교환
- ⏳ 제휴 혜택 모듈
- ⏳ AI 명함 디자인

## 🏗️ 기술 스택

### Frontend
- React (웹앱/PWA)
- TailwindCSS
- Font Awesome Icons

### Backend
- Hono Framework
- Cloudflare Workers
- Cloudflare D1 (SQLite)
- TypeScript

### 배포
- Cloudflare Pages

## 📂 프로젝트 구조

```
meti/
├── src/
│   ├── index.tsx           # Main API entry point
│   ├── routes/
│   │   ├── auth.ts         # Authentication routes
│   │   ├── cards.ts        # Card management routes
│   │   ├── game.ts         # HappyTree game routes
│   │   └── wallet.ts       # Wallet management routes
│   ├── lib/
│   │   └── db.ts           # Database utility functions
│   └── types/
│       └── index.ts        # TypeScript type definitions
├── migrations/
│   └── 0001_initial_schema.sql  # Database schema
├── public/
│   └── static/             # Static assets (future)
├── ecosystem.config.cjs    # PM2 configuration
├── wrangler.jsonc          # Cloudflare configuration
├── package.json
└── README.md
```

## 🚀 개발 환경 설정

### 1. 의존성 설치
```bash
npm install
```

### 2. 데이터베이스 마이그레이션 (로컬)
```bash
npm run db:migrate:local
```

### 3. 프로젝트 빌드
```bash
npm run build
```

### 4. 개발 서버 시작
```bash
# PM2로 시작 (권장)
pm2 start ecosystem.config.cjs

# 또는 직접 실행
npm run dev:sandbox
```

### 5. 서비스 확인
```bash
curl http://localhost:3000/api/health
```

## 📡 API 엔드포인트

### 인증
- `POST /api/auth/register` - 회원가입
- `POST /api/auth/login` - 로그인
- `GET /api/auth/me` - 현재 사용자 정보

### 명함
- `GET /api/cards` - 내 명함 목록
- `POST /api/cards` - 새 명함 생성
- `GET /api/cards/:id` - 명함 상세 조회
- `PUT /api/cards/:id` - 명함 수정
- `DELETE /api/cards/:id` - 명함 삭제
- `GET /api/cards/share/:userId/:shortId` - 공유 명함 조회

### 명함 지갑
- `GET /api/wallet` - 저장한 명함 목록
- `POST /api/wallet/save` - 명함 저장
- `PUT /api/wallet/:id` - 메모/태그 수정
- `DELETE /api/wallet/:id` - 명함 삭제
- `GET /api/wallet/groups` - 그룹 목록
- `POST /api/wallet/groups` - 그룹 생성

### HappyTree 게임
- `GET /api/game/status` - 게임 상태 조회
- `GET /api/game/levels/:farmId` - 농장 레벨 정보
- `POST /api/game/pots` - 새 화분 생성
- `POST /api/game/pots/:potId/levelup` - 화분 레벨업
- `POST /api/game/stars/purchase` - 별 구매

## 🎮 HappyTree 게임 시스템

### 보상 정책
| 이벤트 | 보상 |
|--------|------|
| 앱 설치 + 첫 명함 생성 | 화분 1개 + 하트 300,000 |
| 내 명함 조회됨 | 하트 +10 |
| 내 명함 저장됨 | 하트 +100 |
| 명함 교환 완료 | 하트 +50 |
| 신규 가입 (내 링크) | 하트 +500, 별 +1 |

### 농장 시스템
- 4개 농장 (Farm 1-4)
- 각 농장은 독립적으로 화분 관리
- 화분 레벨: 0-8
- 레벨 8 달성 시 창고 보관 → 다음 농장 해제

## 📊 데이터베이스 스키마

### 주요 테이블
- `users` - 사용자 정보
- `cards` - 디지털 명함
- `card_wallet` - 저장된 명함
- `wallet_groups` - 명함 그룹
- `game_user_data` - 게임 사용자 데이터
- `game_pots` - 화분 정보
- `game_farm_levels` - 농장 레벨 설정
- `card_rewards` - 명함 교환 보상 기록

## 🔧 개발 스크립트

```bash
# 개발
npm run dev                 # Vite 개발 서버
npm run dev:sandbox         # Wrangler + D1 로컬
npm run build               # 프로젝트 빌드

# 데이터베이스
npm run db:migrate:local    # 로컬 마이그레이션
npm run db:migrate:prod     # 프로덕션 마이그레이션
npm run db:console:local    # 로컬 DB 콘솔
npm run db:console:prod     # 프로덕션 DB 콘솔

# 배포
npm run deploy              # 빌드 + 배포
npm run deploy:prod         # 프로덕션 배포

# 유틸리티
npm run clean-port          # 포트 3000 정리
npm run test                # 헬스 체크
```

## 🚀 배포

### Cloudflare Pages 배포

1. **데이터베이스 생성**
```bash
npx wrangler d1 create meti-production
```

2. **database_id를 wrangler.jsonc에 추가**

3. **프로덕션 마이그레이션**
```bash
npm run db:migrate:prod
```

4. **배포**
```bash
npm run deploy:prod
```

## 📝 환경 변수

로컬 개발용 `.dev.vars` 파일 생성:
```env
# API Keys (future)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
JWT_SECRET=

# App URLs
APP_URL=http://localhost:3000
```

## 🔗 관련 문서

- [API 상세 스펙](./API_SPEC.md) ✅
- [Phase 1 완료 보고서](./PHASE1_COMPLETE.md) ✅
- [디자인 가이드 통합본](./docs/design/METI_DESIGN_GUIDE_ALL.md) ⭐
  - v1: Warm Professional (신뢰 · 안정)
  - v2: Vibrant (에너지 · 개성)
  - v3: Aurum (럭셔리 · 프리미엄)
  - v4: Indigo Script (깊이 · 우아함)
- [METI 기획문서](./METI_PLANNING.md) (외부 문서)
- [HappyTree 게임 규칙](./HAPPYTREE_GUIDELINES.md) (외부 문서)

## 📈 진행 상황

### ✅ 완료
- [x] 프로젝트 초기화
- [x] 데이터베이스 스키마 설계
- [x] 인증 API (기본)
- [x] 명함 CRUD API
- [x] 명함 지갑 API
- [x] HappyTree 게임 API
- [x] 명함 교환 보상 시스템

### 🔄 진행 중
- [ ] 프론트엔드 UI 개발
- [ ] Google OAuth 연동
- [ ] QR 코드 생성/스캔

### ⏳ 예정
- [ ] PWA 설정
- [ ] 성능 최적화
- [ ] 프로덕션 배포
- [ ] 사용자 테스트

## 🤝 기여

Phase 1 MVP는 단일 개발자가 진행 중입니다.
Phase 2부터 팀 확장 예정.

## 📄 라이선스

Private Project - All Rights Reserved

---

**작성**: METI 프로젝트팀  
**최종 수정**: 2026-03-09  
**버전**: 1.0.0
