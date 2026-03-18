# METI - 디지털 명함 앱 (Monorepo v0.2)

> **MVP 개발 중** - 웹 + 모바일 디지털 명함 서비스

![METI Logo](https://img.shields.io/badge/METI-v0.2-blue) ![Status](https://img.shields.io/badge/status-development-yellow)

## 📋 프로젝트 개요

**METI(메티)**는 링크/QR로 공유 가능한 디지털 명함을 만들고, 상대는 앱 설치 없이 웹에서 열람/저장할 수 있는 서비스입니다.

```
METI = Meet + Interact (만남과 상호작용)
"명함 한 장이 새로운 세계를 열다"
```

## 🏗️ 모노레포 구조 (v0.2 - 모듈화)

```
meti/
├── apps/
│   ├── web/              # 웹 앱 (Hono + Vite + React)
│   │   ├── src/
│   │   │   ├── routes/       # API 라우트 핸들러 (MVC-Controller)
│   │   │   ├── templates/    # HTML 템플릿 (MVC-View)
│   │   │   │   └── card/     # 명함 관련 템플릿
│   │   │   ├── utils/        # 유틸리티 함수
│   │   │   │   └── card/     # 명함 관련 유틸 (테마 등)
│   │   │   ├── lib/          # 외부 라이브러리 래퍼 (DB 등)
│   │   │   └── types/        # TypeScript 타입 정의
│   │   ├── public/       # 프론트엔드 정적 파일
│   │   ├── migrations/   # DB 마이그레이션
│   │   └── package.json
│   └── mobile/           # 모바일 앱 (Expo - 예정)
├── packages/
│   └── shared/           # 공용 타입/유틸
│       ├── types/        # TypeScript 타입 정의
│       ├── utils/        # 공용 유틸리티 함수
│       └── validation/   # 입력 검증 스키마
├── docs/                 # 요구사항/스펙 (SSOT)
│   ├── 00_PROJECT_CHARTER.md
│   ├── 01_PRD.md
│   ├── 02_SCREENS_AND_FLOWS.md
│   ├── 03_DATA_MODEL.md
│   ├── 04_API_SPEC.md
│   ├── 05_ARCHITECTURE.md
│   ├── 06_BACKLOG.md
│   ├── 07_QA_RELEASE.md
│   ├── 08_SECURITY_PRIVACY.md
│   └── 09_ANALYTICS.md
└── AGENT_MASTER_PROMPT.md
```

## 🎯 핵심 기능 (MVP)

### 우선순위 1: 퍼블릭 카드 페이지
- ✅ 백엔드 API 완료
- ✅ `/c/:id` 퍼블릭 카드 UI 완료
- ✅ 모바일 최적화 완료
- ✅ 링크/QR 공유 완료

### 우선순위 2: 관리자 화면
- ✅ `/my/card/new` 명함 생성 완료
- ✅ `/my/card/:id/edit` 명함 수정 완료
- ✅ 프로필 사진 업로드 완료
- ✅ 실시간 미리보기 완료
- ✅ 테마 선택 (10가지 색상) 완료
- ✅ 소셜 링크 관리 (최대 5개) 완료
- ⏳ QR 코드 생성/다운로드 (예정)
- ⏳ 공개 범위 설정 (전화/이메일 토글) (예정)

### 우선순위 3: 모바일 앱
- ⏳ Expo 프로젝트 생성
- ⏳ 카드 편집/공유 기능

## 🏗️ 기술 스택

### Web (apps/web)
- **Frontend**: React + TailwindCSS (CDN)
- **Backend**: Hono Framework
- **Database**: Cloudflare D1 (SQLite)
- **Build**: Vite
- **Hosting**: Cloudflare Pages

### Mobile (apps/mobile)
- **Framework**: Expo (React Native)
- **Language**: TypeScript

### Shared (packages/shared)
- **Types**: TypeScript 타입 정의
- **Utils**: 공용 유틸리티 함수
- **Validation**: 입력 검증 스키마

## 🚀 빠른 시작

### 1. 웹 앱 개발 (apps/web)

```bash
# 웹 앱 디렉토리로 이동
cd apps/web

# 의존성 설치
npm install

# 데이터베이스 마이그레이션 (로컬)
npm run db:migrate:local

# 프로젝트 빌드
npm run build

# 개발 서버 시작
pm2 start ecosystem.config.cjs

# 또는 직접 실행
npm run dev:sandbox

# 서비스 확인
curl http://localhost:3000/api/health
```

### 2. 모바일 앱 개발 (apps/mobile)

```bash
# 모바일 앱 디렉토리로 이동
cd apps/mobile

# (예정) Expo 프로젝트 초기화
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

자세한 API 문서는 [docs/04_API_SPEC.md](./docs/04_API_SPEC.md) 참조

## 📊 데이터베이스 스키마

### 주요 테이블
- `users` - 사용자 정보
- `cards` - 디지털 명함
- `card_wallet` - 저장된 명함 (명함 지갑)
- `wallet_groups` - 명함 그룹
- `game_user_data` - 게임 사용자 데이터 (HappyTree 통합)
- `game_pots` - 화분 정보
- `card_rewards` - 명함 교환 보상 기록

자세한 데이터 모델은 [docs/03_DATA_MODEL.md](./docs/03_DATA_MODEL.md) 참조

## 🔧 개발 스크립트 (apps/web)

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

```bash
cd apps/web

# 1. 데이터베이스 생성
npx wrangler d1 create meti-production

# 2. database_id를 wrangler.jsonc에 추가

# 3. 프로덕션 마이그레이션
npm run db:migrate:prod

# 4. 배포
npm run deploy:prod
```

## 🔗 관련 문서

### 프로젝트 문서 (SSOT)
- [00. 프로젝트 헌장](./docs/00_PROJECT_CHARTER.md)
- [01. PRD (제품 요구사항)](./docs/01_PRD.md) ⭐
- [02. 화면 및 플로우](./docs/02_SCREENS_AND_FLOWS.md)
- [03. 데이터 모델](./docs/03_DATA_MODEL.md)
- [04. API 스펙](./docs/04_API_SPEC.md)
- [05. 아키텍처](./docs/05_ARCHITECTURE.md)
- [06. 백로그](./docs/06_BACKLOG.md)
- [07. QA & 릴리즈](./docs/07_QA_RELEASE.md)
- [08. 보안 & 프라이버시](./docs/08_SECURITY_PRIVACY.md)
- [09. 분석](./docs/09_ANALYTICS.md)

### 디자인
- [디자인 가이드 통합본](./docs/design/METI_DESIGN_GUIDE_ALL.md)

### 개발 가이드
- [개발 에이전트 마스터 프롬프트](./AGENT_MASTER_PROMPT.md)

## 📈 개발 진행 상황

### ✅ 완료 (Phase 1 백엔드)
- [x] 모노레포 구조 생성
- [x] 데이터베이스 스키마 설계 (D1)
- [x] 인증 API (이메일 기반)
- [x] 명함 CRUD API (21개 엔드포인트)
- [x] 명함 지갑 API
- [x] HappyTree 게임 API
- [x] 명함 교환 보상 시스템
- [x] 공용 타입 정의 (packages/shared)

### 🔄 진행 중 (Phase 1 프론트엔드)
- [ ] 퍼블릭 카드 페이지 `/c/:id` UI
- [ ] 관리자 화면 `/app/card` UI
- [ ] 명함 공유 (QR 코드, 링크)

### ⏳ 예정 (Phase 2)
- [ ] Expo 모바일 앱 생성
- [ ] Google OAuth 연동
- [ ] 이메일 매직링크 인증
- [ ] PWA 설정
- [ ] 성능 최적화
- [ ] 프로덕션 배포

## 🔒 브랜치 정책

- `main`: 프로덕션 브랜치 (직접 수정 금지)
- `agent/bootstrap-web-mobile`: 현재 작업 브랜치
- `backup/pre-agent-2026-03-13`: 롤백용 백업 태그

## 🤝 기여

MVP 단일 개발 진행 중. Phase 2부터 팀 확장 예정.

## 📄 라이선스

Private Project - All Rights Reserved

---

**작성**: METI 프로젝트팀  
**최종 수정**: 2026-03-13  
**버전**: v0.2 (모노레포 재구조화)
