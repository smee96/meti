# METI - 디지털 명함 앱

> **배포 완료** - 웹 기반 디지털 명함 서비스 + HappyTree 농장 시뮬레이터

![METI Logo](https://img.shields.io/badge/METI-v1.0-blue) ![Status](https://img.shields.io/badge/status-production-green)

## 📋 프로젝트 개요

**METI(메티)**는 링크/QR로 공유 가능한 디지털 명함을 만들고, 상대는 앱 설치 없이 웹에서 열람/저장할 수 있는 서비스입니다.

```
METI = Meet + Interact (만남과 상호작용)
"명함 한 장이 새로운 세계를 열다"
```

## 🌐 배포 URL

### 프로덕션 사이트
- **메인 도메인**: https://meti-3gk.pages.dev
- **명함 예시**: https://meti-3gk.pages.dev/c/1774582479157-8ixulhyc7
- **어드민 대시보드**: https://meti-3gk.pages.dev/admin
- **HappyTree 시뮬레이터**: https://meti-3gk.pages.dev/admin

### GitHub 저장소
- **Repository**: (Private - 팀 액세스만 가능)

## 🎯 핵심 기능 (완료)

### ✅ 퍼블릭 카드 페이지
- `/c/:id` 명함 공유 페이지
- 모바일 최적화 반응형 디자인
- 10가지 테마 색상 지원
- 소셜 링크 아이콘 (최대 5개)
- 연락처 정보 표시/숨김
- 명함 저장 (vCard 다운로드)
- OG 이미지 지원 (SNS 공유 시 미리보기)

### ✅ 명함 관리 시스템
- 명함 생성/수정/삭제
- 프로필 사진 업로드 (Base64)
- 실시간 미리보기
- 테마 선택기
- 소셜 링크 관리
- 공개/비공개 설정

### ✅ 어드민 대시보드
- 사용자 통계 (총 가입자, 명함 수, 오늘 가입)
- HappyTree 농장 시뮬레이터
- 4개 농장별 독립 설정
- 레벨별 보상 구성
- 플랫폼 수익 분석
- 사용자 ROI 계산

### ✅ HappyTree 시뮬레이터 기능
- **농장 설정**: 입장 인원, 화분 개수, 별 가격, 초기 하트
- **레벨 구성**: 8단계 레벨 설정 (필요 하트, 별, 코인, 보상)
- **시뮬레이션**: 완전 2진 트리 기반 하트 허용치 계산
- **통계 분석**:
  - 플랫폼 수익 (별 판매, 코인 지출, 순수익, 수익률)
  - 레벨별 달성 현황 (달성자, 화분, 별/코인 사용량)
  - 1명당 투자/수익/순익/ROI (색상 코딩: 빨강=손실, 파랑=수익)
- **데이터 관리**: 레벨 설정 저장 (DB), 초기화, 실시간 합계

## 🏗️ 기술 스택

### Frontend
- **UI Framework**: TailwindCSS (CDN)
- **Icons**: Font Awesome 6.4.0
- **Fonts**: Noto Sans KR, Montserrat

### Backend
- **Framework**: Hono (Edge Runtime)
- **Language**: TypeScript
- **Build Tool**: Vite

### Database & Storage
- **Database**: Cloudflare D1 (SQLite)
- **Storage**: Cloudflare Pages
- **CDN**: Cloudflare Global Network

### DevOps
- **Hosting**: Cloudflare Pages
- **CI/CD**: Wrangler CLI
- **Process Manager**: PM2 (Local Dev)

## 📊 데이터베이스 스키마

### 주요 테이블
```sql
users                  -- 사용자 정보
cards                  -- 디지털 명함
card_wallet            -- 저장된 명함
wallet_groups          -- 명함 그룹
card_view_events       -- 명함 조회 이벤트
game_user_data         -- HappyTree 사용자 데이터
game_pots              -- 화분 정보
game_farm_levels       -- 농장 레벨 설정
card_rewards           -- 명함 교환 보상
```

## 🚀 빠른 시작

### 로컬 개발

```bash
# 1. 프로젝트 디렉토리로 이동
cd /home/user/meti/apps/web

# 2. 의존성 설치
npm install

# 3. 데이터베이스 마이그레이션
npm run db:migrate:local

# 4. 프로젝트 빌드
npm run build

# 5. 개발 서버 시작 (PM2)
pm2 start ecosystem.config.cjs

# 6. 서비스 확인
curl http://localhost:3000
```

### 개발 스크립트

```bash
# 개발
npm run dev                 # Vite 개발 서버
npm run dev:sandbox         # Wrangler 로컬 서버
npm run build               # 프로덕션 빌드

# 데이터베이스
npm run db:migrate:local    # 로컬 마이그레이션
npm run db:migrate:prod     # 프로덕션 마이그레이션
npm run db:seed             # 테스트 데이터 삽입
npm run db:reset            # DB 초기화 + 마이그레이션 + Seed
npm run db:console:local    # 로컬 DB 콘솔
npm run db:console:prod     # 프로덕션 DB 콘솔

# 배포
npm run deploy              # 빌드 + 배포
npm run deploy:prod         # 프로덕션 배포

# 유틸리티
npm run clean-port          # 포트 3000 정리
npm run test                # 헬스 체크

# Git
npm run git:init            # Git 초기화
npm run git:commit          # 변경사항 커밋
npm run git:status          # Git 상태 확인
npm run git:log             # 커밋 로그
```

## 📡 주요 API 엔드포인트

### 인증
- `POST /api/auth/register` - 회원가입
- `POST /api/auth/login` - 로그인
- `GET /api/auth/me` - 현재 사용자

### 명함
- `GET /api/cards` - 내 명함 목록
- `POST /api/cards` - 명함 생성
- `GET /api/cards/:id` - 명함 조회
- `PUT /api/cards/:id` - 명함 수정
- `DELETE /api/cards/:id` - 명함 삭제

### 공용 명함
- `GET /c/:id` - 공유 명함 페이지

### 어드민
- `GET /admin` - 어드민 대시보드
- `POST /api/admin/farm-levels` - 농장 레벨 저장

## 🎨 테마 색상

```typescript
'deep-navy'       // #0A2260 (기본)
'midnight-teal'   // #0D3D4D
'forest-deep'     // #1A3D2E
'royal-burgundy'  // #4A1E2E
'charcoal-dark'   // #1C1C1E
'slate-blue'      // #2C3E50
'deep-purple'     // #3D2857
'warm-brown'      // #3E2723
'olive-night'     // #3D4A2C
'sunset-orange'   // #8B4513
```

## 🚀 Cloudflare Pages 배포

### 초기 설정

```bash
# 1. Cloudflare 인증
setup_cloudflare_api_key  # Tool 호출

# 2. D1 데이터베이스 생성
npx wrangler d1 create meti-production

# 3. wrangler.jsonc에 database_id 추가

# 4. 프로덕션 마이그레이션
npm run db:migrate:prod

# 5. Cloudflare Pages 프로젝트 생성
npx wrangler pages project create meti --production-branch main

# 6. 배포
npm run deploy:prod
```

### 재배포

```bash
# 빌드 + 배포
cd /home/user/meti/apps/web
npm run build
npx wrangler pages deploy dist --project-name meti --branch main
```

## 📝 프로젝트 구조

```
meti/
├── apps/
│   └── web/                    # 웹 앱
│       ├── src/
│       │   ├── index.tsx       # 메인 엔트리
│       │   ├── types/          # TypeScript 타입
│       │   ├── lib/            # 라이브러리 (DB)
│       │   └── routes/         # API 라우트
│       │       ├── admin.ts            # 어드민 대시보드
│       │       ├── public-card.ts      # 공유 명함 페이지
│       │       ├── cards.ts            # 명함 API
│       │       ├── auth.ts             # 인증 API
│       │       ├── game.ts             # HappyTree API
│       │       └── ...
│       ├── public/             # 정적 파일
│       │   ├── og-image.png    # OG 이미지
│       │   └── static/         # CSS, JS, Fonts
│       ├── migrations/         # DB 마이그레이션
│       ├── dist/               # 빌드 결과
│       ├── wrangler.jsonc      # Cloudflare 설정
│       ├── vite.config.ts      # Vite 설정
│       ├── ecosystem.config.cjs # PM2 설정
│       └── package.json
├── .git/                       # Git 저장소
├── .gitignore                  # Git 무시 파일
└── README.md                   # 프로젝트 문서
```

## 🔧 설정 파일

### wrangler.jsonc
```jsonc
{
  "name": "meti",
  "main": "src/index.tsx",
  "compatibility_date": "2024-01-01",
  "compatibility_flags": ["nodejs_compat"],
  "pages_build_output_dir": "./dist",
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "meti-production",
      "database_id": "your-database-id"
    }
  ]
}
```

### ecosystem.config.cjs (PM2)
```javascript
module.exports = {
  apps: [{
    name: 'meti',
    script: 'npx',
    args: 'wrangler pages dev dist --ip 0.0.0.0 --port 3000',
    env: {
      NODE_ENV: 'development',
      PORT: 3000
    }
  }]
}
```

## 📈 HappyTree 시뮬레이터 알고리즘

### 완전 2진 트리 구조
```
사용자 순서: 1, 2, 3, 4, 5, 6, 7, ...
트리 구조:
       1
      / \
     2   3
    / \ / \
   4  5 6  7
```

### 하트 허용치 계산
```javascript
heartAllowance = myPots.length + descendantsPots.length
```

### 레벨업 조건
```javascript
if (heartAllowance >= heartsRequired && 
    heartsBalance >= heartsRequired) {
  // 레벨업 성공
  heartsBalance -= heartsRequired
  heartsBalance += heartsReward
  level++
}
```

### 코인 환율
- **1 코인 = $0.1 (10센트)**
- 예: 100 코인 = $10.00

## 🎯 완료된 기능 체크리스트

### 명함 시스템
- [x] 명함 CRUD API
- [x] 공유 명함 페이지 (`/c/:id`)
- [x] 10가지 테마 색상
- [x] 프로필 사진 업로드
- [x] 소셜 링크 관리 (최대 5개)
- [x] vCard 다운로드
- [x] 명함 조회 이벤트 트래킹
- [x] OG 이미지 (SNS 공유)

### 어드민 시스템
- [x] 사용자 통계 대시보드
- [x] HappyTree 농장 시뮬레이터
- [x] 4개 농장 독립 설정
- [x] 8단계 레벨 구성
- [x] 완전 2진 트리 알고리즘
- [x] 플랫폼 수익 분석
- [x] 레벨별 달성 현황
- [x] 1명당 투자/수익/ROI 통계
- [x] 천단위 콤마 포맷팅
- [x] 색상 코딩 (손실=빨강, 수익=파랑)

### 인프라
- [x] Cloudflare Pages 배포
- [x] D1 데이터베이스 (로컬 + 프로덕션)
- [x] 정적 파일 서빙
- [x] OG 이미지 라우팅
- [x] Git 버전 관리
- [x] PM2 프로세스 관리

## 🔒 환경 변수

### 로컬 개발 (.dev.vars)
```bash
# Cloudflare D1은 별도 환경변수 불필요
# wrangler가 자동으로 로컬 SQLite 생성
```

### 프로덕션
```bash
# Cloudflare Pages 환경변수
# wrangler.jsonc에서 d1_databases 바인딩으로 관리
```

## 📊 최근 업데이트 (2026-04-01)

### HappyTree 시뮬레이터 개선
- ✅ 완전 2진 트리 알고리즘 구현
- ✅ 코인 환율 수정 ($1 → $0.1/코인)
- ✅ 레벨별 1명당 통계 추가
- ✅ 천단위 콤마 포맷팅
- ✅ 손실/수익 색상 코딩

### OG 이미지 지원
- ✅ 어드민 페이지 OG 이미지
- ✅ 명함 공유 OG 이미지 (아바타 또는 METI 로고)
- ✅ 이미지 파일 라우팅 수정

### 배포 최적화
- ✅ `_routes.json` 이미지 제외 규칙
- ✅ 정적 파일 직접 서빙
- ✅ Cloudflare CDN 캐싱

## 🐛 알려진 이슈

- 없음 (현재 모든 기능 정상 작동)

## 🔮 향후 계획 (Phase 2)

### 모바일 앱
- [ ] Expo 프로젝트 생성
- [ ] React Native UI 구현
- [ ] 앱 스토어 배포

### 기능 개선
- [ ] QR 코드 생성/다운로드
- [ ] Google OAuth 연동
- [ ] 이메일 매직링크 인증
- [ ] PWA 설정
- [ ] 명함 분석 대시보드

### 성능 최적화
- [ ] 이미지 최적화 (WebP)
- [ ] 코드 스플리팅
- [ ] 서버사이드 렌더링
- [ ] 캐시 전략 개선

## 🤝 기여

Private 프로젝트 - 팀 멤버만 액세스 가능

## 📄 라이선스

Private Project - All Rights Reserved

---

**작성**: METI 프로젝트팀  
**최종 수정**: 2026-04-01  
**버전**: v1.0 (프로덕션 배포)  
**배포 URL**: https://meti-3gk.pages.dev
