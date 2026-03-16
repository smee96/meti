# METI 디지털 명함 서비스 개발 프로젝트 견적서

## 📋 프로젝트 개요

### 프로젝트명
**METI (Meet + Identity)** - 디지털 명함 서비스

### 사업 목표
QR 코드 기반의 명함 공유 및 관리 플랫폼 구축
- 명함 정보의 디지털화 및 간편한 공유
- 다양한 디자인 테마 제공 (10가지 컬러 테마)
- 웹/모바일 크로스 플랫폼 지원
- 리워드 기반 사용자 확보 및 활성화

### 사업 범위
1. **웹 애플리케이션** (Progressive Web App)
2. **모바일 애플리케이션** (iOS/Android)
3. **백엔드 API 서버** (Cloudflare Workers)
4. **데이터베이스** (Cloudflare D1 - SQLite)
5. **관리자 대시보드**

---

## 🏗️ 시스템 아키텍처

### 기술 스택

#### Frontend
- **웹**: Vite + React + TypeScript + Tailwind CSS
- **모바일**: Expo (React Native) + TypeScript
- **상태관리**: React Hooks + Context API
- **라우팅**: React Router (웹), Expo Router (모바일)

#### Backend
- **프레임워크**: Hono (Cloudflare Workers)
- **언어**: TypeScript
- **인증**: JWT + Session Token
- **배포**: Cloudflare Pages

#### Database & Storage
- **데이터베이스**: Cloudflare D1 (SQLite)
- **캐시**: Cloudflare KV
- **파일 스토리지**: Cloudflare R2 (이미지/QR 코드)

#### DevOps
- **버전 관리**: Git + GitHub
- **CI/CD**: GitHub Actions
- **모니터링**: Cloudflare Analytics
- **로그**: Cloudflare Logs

### 시스템 구성도

```
┌─────────────────────────────────────────────────────────────┐
│                        사용자 레이어                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  웹 브라우저  │  │  iOS 앱      │  │  Android 앱   │      │
│  │  (PWA)       │  │  (Expo)      │  │  (Expo)      │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            ↕ HTTPS
┌─────────────────────────────────────────────────────────────┐
│                   Cloudflare Edge Network                    │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              Cloudflare Pages (Web)                   │  │
│  │              Cloudflare Workers (API)                 │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│                      데이터 레이어                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ D1 Database  │  │  KV Storage  │  │  R2 Storage  │      │
│  │  (SQLite)    │  │   (Cache)    │  │   (Files)    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

---

## 📊 데이터베이스 설계

### ERD 구조

```sql
-- 사용자 테이블
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  last_login DATETIME,
  status TEXT DEFAULT 'active' CHECK(status IN ('active', 'inactive', 'suspended'))
);

-- 명함 테이블
CREATE TABLE cards (
  id TEXT PRIMARY KEY, -- 고유 ID (타임스탬프-랜덤)
  user_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  title TEXT, -- 직책
  company TEXT, -- 회사명
  phone TEXT,
  email TEXT,
  website TEXT,
  address TEXT,
  bio TEXT, -- 소개글
  avatar_url TEXT, -- 프로필 이미지
  qr_code_url TEXT, -- QR 코드 이미지
  theme TEXT DEFAULT 'deep-navy', -- 컬러 테마
  links TEXT, -- JSON: 소셜/링크 목록
  show_phone BOOLEAN DEFAULT 1,
  show_email BOOLEAN DEFAULT 1,
  status TEXT DEFAULT 'active' CHECK(status IN ('active', 'private', 'archived')),
  view_count INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 명함 지갑 (보관함)
CREATE TABLE card_wallet (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  owner_user_id INTEGER NOT NULL, -- 소유자
  saved_card_id TEXT NOT NULL, -- 저장된 명함
  group_id INTEGER, -- 그룹 분류
  saved_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (owner_user_id) REFERENCES users(id),
  FOREIGN KEY (saved_card_id) REFERENCES cards(id),
  FOREIGN KEY (group_id) REFERENCES wallet_groups(id)
);

-- 지갑 그룹 (분류)
CREATE TABLE wallet_groups (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  name TEXT NOT NULL, -- 예: "고객사", "파트너"
  color TEXT, -- 그룹 색상
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 게임 사용자 데이터
CREATE TABLE game_user_data (
  user_id INTEGER PRIMARY KEY,
  trees INTEGER DEFAULT 0, -- 보유 나무
  water INTEGER DEFAULT 10, -- 물 포인트
  last_water_refill DATETIME,
  total_planted INTEGER DEFAULT 0, -- 심은 나무 총 개수
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 게임 나무 현황
CREATE TABLE game_pots (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  stage INTEGER DEFAULT 1 CHECK(stage BETWEEN 1 AND 5), -- 성장 단계
  planted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  harvested_at DATETIME,
  status TEXT DEFAULT 'growing' CHECK(status IN ('growing', 'ready', 'harvested')),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 명함 리워드 이력
CREATE TABLE card_rewards (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  card_id TEXT NOT NULL,
  reward_type TEXT NOT NULL, -- 'create', 'view', 'share'
  amount INTEGER DEFAULT 1, -- 리워드 수량
  claimed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (card_id) REFERENCES cards(id)
);
```

### 주요 인덱스

```sql
CREATE INDEX idx_cards_user_id ON cards(user_id);
CREATE INDEX idx_cards_status ON cards(status);
CREATE INDEX idx_cards_created_at ON cards(created_at DESC);
CREATE INDEX idx_wallet_owner ON card_wallet(owner_user_id);
CREATE INDEX idx_wallet_card ON card_wallet(saved_card_id);
CREATE INDEX idx_rewards_user ON card_rewards(user_id);
```

---

## 🔧 주요 기능 명세

### Phase 1: 핵심 기능 (MVP)

#### 1.1 사용자 인증
- **회원가입**: 이메일 + 비밀번호
- **로그인**: JWT 토큰 기반
- **세션 관리**: 자동 로그인 유지
- **비밀번호 재설정**: 이메일 인증 링크

#### 1.2 명함 생성 및 관리
- **명함 작성**
  - 기본 정보 입력 (이름, 직책, 회사, 연락처)
  - 프로필 사진 업로드
  - 소셜 링크 추가 (최대 10개)
  - 공개 설정 (전체 공개 / 비공개)
- **디자인 커스터마이징**
  - 10가지 컬러 테마 선택
    1. Deep Navy (#0A2260) - 신뢰감 있는 클래식
    2. Midnight Teal (#0D3D4D) - 세련된 청록색
    3. Forest Deep (#1A3D2E) - 자연의 깊은 초록
    4. Royal Burgundy (#4A1E2E) - 고급스러운 버건디
    5. Charcoal Dark (#1C1C1E) - 모던한 차콜
    6. Slate Blue (#2C3E50) - 중후한 슬레이트 블루
    7. Deep Purple (#3D2857) - 창의적인 딥 퍼플
    8. Warm Brown (#3E2723) - 따뜻한 브라운
    9. Olive Night (#3D4A2C) - 차분한 올리브
    10. Sunset Orange (#8B4513) - 따뜻한 석양
  - 실시간 미리보기
- **QR 코드 자동 생성**
  - 명함 링크 QR 코드
  - 다운로드 및 공유 기능

#### 1.3 명함 공유
- **공유 방식**
  - QR 코드 스캔
  - 링크 복사 (`/c/:cardId`)
  - 연락처 저장 (vCard 다운로드)
  - 모바일 공유 시트 (Web Share API)
- **접근 제어**
  - 공개 명함: 누구나 조회 가능
  - 비공개 명함: 403 페이지 표시
  - 조회 수 추적

#### 1.4 명함 지갑 (보관함)
- **저장 기능**
  - 받은 명함 저장
  - 그룹별 분류 (고객사, 파트너 등)
  - 메모 추가
- **관리 기능**
  - 검색 및 필터
  - 정렬 (최신순, 이름순)
  - 삭제 및 복원

#### 1.5 행복나무 게임
- **게임 메커니즘**
  - 명함 생성/공유 시 물 포인트 획득
  - 물로 나무 심기 (5단계 성장)
  - 나무 수확 시 리워드
- **리워드 체계**
  - 명함 생성: 물 +3
  - 명함 조회: 물 +1
  - 명함 저장: 물 +2
  - 나무 수확: 나무 +1

### Phase 2: 확장 기능

#### 2.1 소셜 로그인
- Google OAuth
- Apple 로그인 (iOS)

#### 2.2 분석 대시보드
- 명함 조회 통계
- 시간대별 트래픽
- 유입 경로 분석
- 링크 클릭 추적

#### 2.3 프리미엄 기능
- 커스텀 도메인 (`yourname.meti.co`)
- 고급 테마 (애니메이션, 그라데이션)
- 명함 템플릿 라이브러리
- 명함 가져오기 (기존 명함 OCR)

#### 2.4 팀/조직 기능
- 조직 계정 생성
- 팀원 명함 일괄 관리
- 브랜딩 커스터마이징
- 통계 리포트

---

## 📱 화면 구성 및 UI/UX

### 웹 애플리케이션

#### 공개 페이지
1. **랜딩 페이지** (`/`)
   - 서비스 소개
   - 주요 기능 설명
   - 로그인/회원가입 버튼
   - 테마 갤러리 링크

2. **테마 갤러리** (`/themes`)
   - 10가지 컬러 테마 미리보기
   - 클릭 시 데모 명함 조회
   - 반응형 그리드 레이아웃

3. **공개 명함 페이지** (`/c/:cardId`)
   - 명함 정보 표시
   - 프로필 이미지
   - 연락처 정보 (공개 설정에 따라)
   - 소셜 링크 버튼
   - 연락처 저장 버튼
   - QR 코드 보기 모달
   - 공유 버튼 (Web Share API)

#### 인증 페이지
4. **로그인** (`/login`)
   - 이메일 + 비밀번호
   - "비밀번호 찾기" 링크
   - "회원가입" 링크

5. **회원가입** (`/register`)
   - 이메일, 이름, 비밀번호
   - 약관 동의 체크박스

#### 사용자 페이지 (인증 필요)
6. **내 명함 목록** (`/my/cards`)
   - 생성한 명함 목록
   - "새 명함 만들기" 버튼
   - 명함 수정/삭제 액션

7. **명함 생성/수정** (`/my/card/new` 또는 `/my/card/:cardId/edit`)
   - 좌측: 입력 폼
     - 기본 정보 (이름, 직책, 회사, 연락처)
     - 프로필 이미지 업로드
     - 소셜 링크 추가/삭제
     - 공개 설정 토글
   - 우측: 실시간 미리보기
     - 선택한 테마 적용
     - 입력 내용 즉시 반영
   - 하단: 테마 선택 캐러셀

8. **명함 지갑** (`/my/wallet`)
   - 저장한 명함 목록
   - 그룹별 필터
   - 검색 기능

9. **행복나무** (`/game`)
   - 나무 심기 UI
   - 현재 보유 물/나무 표시
   - 성장 단계 애니메이션
   - 수확 버튼

10. **프로필 설정** (`/my/profile`)
    - 계정 정보 수정
    - 비밀번호 변경
    - 로그아웃

#### 관리자 페이지
11. **관리자 대시보드** (`/admin`)
    - 전체 사용자 수
    - 생성된 명함 수
    - 일일 활성 사용자
    - 조회 수 통계

12. **사용자 관리** (`/admin/users`)
    - 사용자 목록
    - 검색 및 필터
    - 상태 변경 (활성/정지)

13. **명함 관리** (`/admin/cards`)
    - 전체 명함 목록
    - 신고된 명함 관리
    - 명함 상태 변경

### 모바일 애플리케이션 (Expo)

#### 탭 네비게이션
1. **홈** (Home)
   - 내 명함 빠른 접근
   - QR 코드 스캔 버튼
   - 최근 활동

2. **생성** (Create)
   - 명함 생성/수정 화면
   - 카메라 접근 (프로필 사진)
   - 테마 선택 스와이퍼

3. **지갑** (Wallet)
   - 저장한 명함 목록
   - 그룹 관리
   - 검색 기능

4. **게임** (Game)
   - 행복나무 UI
   - 애니메이션 효과

5. **프로필** (Profile)
   - 계정 정보
   - 설정
   - 로그아웃

#### 추가 화면
- **QR 스캔** (Modal)
  - 카메라 뷰
  - 스캔 가이드
  - 결과: 명함 페이지로 이동

- **명함 상세** (Stack)
  - 공개 명함 페이지와 동일
  - 네이티브 공유 시트
  - 연락처 저장 (Contacts API)

---

## 🔄 API 엔드포인트

### 인증 (Authentication)

```
POST   /api/auth/register      회원가입
POST   /api/auth/login         로그인
GET    /api/auth/me            현재 사용자 조회
POST   /api/auth/logout        로그아웃
POST   /api/auth/refresh       토큰 갱신
POST   /api/auth/reset-password 비밀번호 재설정 요청
POST   /api/auth/verify-reset  비밀번호 재설정 완료
```

### 명함 (Cards)

```
GET    /api/cards              내 명함 목록
POST   /api/cards              명함 생성
GET    /api/cards/:id          명함 상세 조회
PUT    /api/cards/:id          명함 수정
DELETE /api/cards/:id          명함 삭제
GET    /api/cards/:id/qr       QR 코드 이미지
POST   /api/cards/:id/share    공유 링크 생성
GET    /api/cards/:id/stats    조회 통계
```

### 명함 지갑 (Wallet)

```
GET    /api/wallet             내 지갑 명함 목록
POST   /api/wallet             명함 저장
DELETE /api/wallet/:id         명함 삭제
GET    /api/wallet/groups      그룹 목록
POST   /api/wallet/groups      그룹 생성
PUT    /api/wallet/groups/:id  그룹 수정
DELETE /api/wallet/groups/:id  그룹 삭제
```

### 게임 (Game)

```
GET    /api/game/status        게임 현황 조회
POST   /api/game/plant         나무 심기
POST   /api/game/harvest/:id   나무 수확
GET    /api/game/leaderboard   리더보드
```

### 관리자 (Admin)

```
GET    /api/admin/stats        전체 통계
GET    /api/admin/users        사용자 목록
PUT    /api/admin/users/:id    사용자 상태 변경
GET    /api/admin/cards        명함 목록
PUT    /api/admin/cards/:id    명함 상태 변경
```

---

## 💰 개발 공수 산정

### 인력 구성
- **프로젝트 매니저 (PM)**: 1명
- **UI/UX 디자이너**: 1명
- **프론트엔드 개발자**: 2명 (웹 1명 + 모바일 1명)
- **백엔드 개발자**: 1명
- **QA 엔지니어**: 1명

### 개발 단계별 공수 (MM: Man-Month, 1MM = 160시간)

#### Phase 0: 프로젝트 준비 (2주 = 0.5MM)
| 작업 항목 | 담당 | 공수 | 산출 근거 |
|---------|-----|------|----------|
| 요구사항 정의 및 기획 | PM | 40h | 요구사항 문서, 기능 명세서 작성 |
| 프로젝트 킥오프 미팅 | 전체 | 8h | 팀 빌딩, 역할 분담 |
| 개발 환경 구축 | Backend | 16h | Cloudflare 계정, Git 설정, CI/CD |
| 디자인 시스템 정의 | Designer | 40h | 컬러 팔레트, 타이포그래피, 컴포넌트 |
| 프로토타입 제작 | Designer | 56h | Figma 화면 설계 (13개 화면) |

**Phase 0 합계**: 160시간 (0.5 MM) × 6명 = **3.0 MM**

---

#### Phase 1: MVP 개발 (8주 = 2.0MM)

##### 1.1 백엔드 개발 (4주 = 1.0MM)
| 작업 항목 | 담당 | 공수 | 산출 근거 |
|---------|-----|------|----------|
| 데이터베이스 스키마 설계 | Backend | 16h | ERD 작성, 마이그레이션 스크립트 |
| 인증 API (회원가입/로그인) | Backend | 32h | JWT 발급, 세션 관리, 비밀번호 암호화 |
| 명함 CRUD API | Backend | 40h | 생성/조회/수정/삭제, QR 생성 |
| 지갑 API | Backend | 24h | 저장/삭제, 그룹 관리 |
| 게임 API | Backend | 32h | 나무 심기/수확, 리워드 로직 |
| API 문서화 (Swagger) | Backend | 16h | OpenAPI 스펙 작성 |

**백엔드 소계**: 160시간 (1.0 MM)

##### 1.2 웹 프론트엔드 개발 (6주 = 1.5MM)
| 작업 항목 | 담당 | 공수 | 산출 근거 |
|---------|-----|------|----------|
| 프로젝트 셋업 (Vite+React+TS) | Frontend(Web) | 8h | 보일러플레이트, 라이브러리 설치 |
| 공통 컴포넌트 개발 | Frontend(Web) | 40h | Button, Input, Card, Modal 등 |
| 랜딩 페이지 | Frontend(Web) | 16h | 반응형 레이아웃, 애니메이션 |
| 인증 페이지 (로그인/회원가입) | Frontend(Web) | 24h | 폼 검증, API 연동 |
| 명함 생성/수정 페이지 | Frontend(Web) | 48h | 입력 폼, 실시간 미리보기, 테마 선택 |
| 공개 명함 페이지 | Frontend(Web) | 32h | 정보 표시, QR 모달, 공유 기능 |
| 명함 지갑 페이지 | Frontend(Web) | 32h | 목록, 그룹 필터, 검색 |
| 게임 페이지 | Frontend(Web) | 40h | 나무 애니메이션, 심기/수확 UI |
| 프로필 설정 페이지 | Frontend(Web) | 16h | 정보 수정, 비밀번호 변경 |
| 관리자 대시보드 | Frontend(Web) | 40h | 통계 차트, 사용자/명함 관리 |
| 반응형 최적화 | Frontend(Web) | 24h | 모바일/태블릿 레이아웃 조정 |
| 접근성 개선 (ARIA) | Frontend(Web) | 16h | 키보드 네비게이션, 스크린 리더 |

**웹 프론트엔드 소계**: 336시간 (2.1 MM)

##### 1.3 모바일 앱 개발 (6주 = 1.5MM)
| 작업 항목 | 담당 | 공수 | 산출 근거 |
|---------|-----|------|----------|
| Expo 프로젝트 셋업 | Frontend(Mobile) | 8h | 프로젝트 생성, 네비게이션 구조 |
| 공통 컴포넌트 개발 | Frontend(Mobile) | 32h | 네이티브 스타일 컴포넌트 |
| 인증 화면 | Frontend(Mobile) | 24h | 로그인/회원가입, AsyncStorage |
| 홈 화면 | Frontend(Mobile) | 16h | 대시보드, 빠른 액션 |
| 명함 생성/수정 화면 | Frontend(Mobile) | 48h | 폼, 카메라, 테마 선택 |
| 명함 상세 화면 | Frontend(Mobile) | 24h | 정보 표시, 공유 시트 |
| QR 스캔 화면 | Frontend(Mobile) | 32h | 카메라 권한, 바코드 스캔 |
| 지갑 화면 | Frontend(Mobile) | 32h | 목록, 그룹, 검색 |
| 게임 화면 | Frontend(Mobile) | 40h | 네이티브 애니메이션 |
| 프로필 화면 | Frontend(Mobile) | 16h | 설정, 로그아웃 |
| 푸시 알림 연동 | Frontend(Mobile) | 24h | Expo Notifications |
| iOS/Android 빌드 테스트 | Frontend(Mobile) | 24h | 네이티브 빌드, 디바이스 테스트 |

**모바일 앱 소계**: 320시간 (2.0 MM)

##### 1.4 QA 및 테스트 (4주 = 1.0MM)
| 작업 항목 | 담당 | 공수 | 산출 근거 |
|---------|-----|------|----------|
| 테스트 케이스 작성 | QA | 32h | 기능별 시나리오 (50개 이상) |
| 단위 테스트 (Backend) | Backend | 24h | API 엔드포인트 테스트 |
| 단위 테스트 (Frontend) | Frontend(Web) | 16h | React 컴포넌트 테스트 |
| 통합 테스트 | QA | 40h | E2E 테스트 (Playwright) |
| 수동 테스트 (웹) | QA | 32h | 브라우저별 호환성 (Chrome, Safari, Firefox) |
| 수동 테스트 (모바일) | QA | 32h | iOS/Android 디바이스 테스트 |
| 성능 테스트 | Backend | 16h | 부하 테스트 (Cloudflare Workers) |
| 보안 테스트 | Backend | 16h | SQL Injection, XSS 점검 |
| 버그 수정 | 전체 | 80h | 발견된 이슈 수정 (예상 20개) |

**QA 및 테스트 소계**: 288시간 (1.8 MM)

**Phase 1 합계**: 1,104시간 (6.9 MM)

---

#### Phase 2: 확장 기능 개발 (4주 = 1.0MM)

##### 2.1 소셜 로그인
| 작업 항목 | 담당 | 공수 | 산출 근거 |
|---------|-----|------|----------|
| Google OAuth 연동 | Backend | 16h | OAuth 2.0 플로우, 토큰 검증 |
| Apple 로그인 연동 (iOS) | Frontend(Mobile) | 16h | Sign in with Apple |
| UI 통합 | Frontend(Web) | 8h | 소셜 로그인 버튼 |

**소셜 로그인 소계**: 40시간 (0.25 MM)

##### 2.2 분석 대시보드
| 작업 항목 | 담당 | 공수 | 산출 근거 |
|---------|-----|------|----------|
| Cloudflare Analytics 연동 | Backend | 16h | 로그 수집, 집계 |
| 차트 라이브러리 통합 | Frontend(Web) | 16h | Chart.js 또는 Recharts |
| 조회 통계 페이지 | Frontend(Web) | 24h | 일별/주별/월별 그래프 |
| 링크 클릭 추적 | Backend | 16h | 이벤트 로깅 |

**분석 대시보드 소계**: 72시간 (0.45 MM)

##### 2.3 프리미엄 기능
| 작업 항목 | 담당 | 공수 | 산출 근거 |
|---------|-----|------|----------|
| 커스텀 도메인 설정 | Backend | 24h | DNS 연동, SSL 인증서 |
| 고급 테마 개발 | Designer + Frontend(Web) | 40h | 애니메이션, 그라데이션 5종 |
| 템플릿 라이브러리 | Frontend(Web) | 32h | 템플릿 선택 UI, 적용 로직 |
| 명함 OCR (이미지 → 텍스트) | Backend | 32h | Cloudflare AI (Tesseract) |

**프리미엄 기능 소계**: 128시간 (0.8 MM)

**Phase 2 합계**: 240시간 (1.5 MM)

---

#### Phase 3: 배포 및 운영 준비 (2주 = 0.5MM)

| 작업 항목 | 담당 | 공수 | 산출 근거 |
|---------|-----|------|----------|
| 프로덕션 환경 구축 | Backend | 16h | Cloudflare 프로덕션 설정 |
| CI/CD 파이프라인 구축 | Backend | 16h | GitHub Actions (자동 배포) |
| 모니터링 설정 | Backend | 16h | Cloudflare Logs, Alerts |
| 사용자 가이드 작성 | PM | 16h | 온보딩, FAQ |
| 운영 매뉴얼 작성 | Backend | 16h | 장애 대응, 백업 절차 |
| 앱스토어 제출 (iOS) | Frontend(Mobile) | 24h | 메타데이터, 스크린샷, 심사 대응 |
| 플레이스토어 제출 (Android) | Frontend(Mobile) | 16h | 메타데이터, APK 업로드 |

**Phase 3 합계**: 120시간 (0.75 MM)

---

### 총 공수 요약

| 단계 | 기간 | 공수 (MM) | 비고 |
|-----|------|-----------|------|
| Phase 0: 프로젝트 준비 | 2주 | 3.0 MM | 요구사항 정의, 디자인 |
| Phase 1: MVP 개발 | 8주 | 6.9 MM | 백엔드, 웹, 모바일, QA |
| Phase 2: 확장 기능 개발 | 4주 | 1.5 MM | 소셜 로그인, 분석, 프리미엄 |
| Phase 3: 배포 및 운영 준비 | 2주 | 0.75 MM | 배포, 문서화, 앱스토어 제출 |
| **총계** | **16주 (4개월)** | **12.15 MM** | |

---

## 💵 비용 산정

### 인건비 계산

#### 기본 요율 (월 단가)
- **프로젝트 매니저**: ₩8,000,000/월
- **UI/UX 디자이너**: ₩6,000,000/월
- **프론트엔드 개발자 (Senior)**: ₩7,000,000/월
- **백엔드 개발자 (Senior)**: ₩8,000,000/월
- **QA 엔지니어**: ₩5,000,000/월

#### 투입 인력 및 기간

| 역할 | 인원 | 투입 기간 | 월 단가 | 총 인건비 |
|-----|------|-----------|---------|-----------|
| PM | 1명 | 4개월 (전 기간) | ₩8,000,000 | ₩32,000,000 |
| Designer | 1명 | 1개월 (Phase 0) | ₩6,000,000 | ₩6,000,000 |
| Frontend(Web) | 1명 | 3개월 (Phase 1~2) | ₩7,000,000 | ₩21,000,000 |
| Frontend(Mobile) | 1명 | 3개월 (Phase 1~2) | ₩7,000,000 | ₩21,000,000 |
| Backend | 1명 | 4개월 (전 기간) | ₩8,000,000 | ₩32,000,000 |
| QA | 1명 | 2개월 (Phase 1~3) | ₩5,000,000 | ₩10,000,000 |

**인건비 합계**: ₩122,000,000

---

### 인프라 비용 (연간)

#### Cloudflare 서비스
| 서비스 | 플랜 | 월 비용 | 연간 비용 | 비고 |
|--------|------|---------|-----------|------|
| Cloudflare Pages | Free | ₩0 | ₩0 | 무제한 요청, 500 빌드/월 |
| Cloudflare Workers | Paid | $5 | ₩78,000 | 1,000만 요청/월 |
| Cloudflare D1 | Paid | $5 | ₩78,000 | 500만 행 읽기/월 |
| Cloudflare R2 | Paid | $5 | ₩78,000 | 10GB 저장소 |

**Cloudflare 소계**: ₩234,000/년

#### 외부 서비스
| 서비스 | 용도 | 월 비용 | 연간 비용 |
|--------|------|---------|-----------|
| Google Cloud Vision API | OCR (옵션) | $10 | ₩156,000 |
| SendGrid / Mailgun | 이메일 발송 | $15 | ₩234,000 |
| Apple Developer | iOS 앱스토어 | $99/년 | ₩130,000 |
| Google Play Console | Android 플레이스토어 | $25 (1회) | ₩33,000 |

**외부 서비스 소계**: ₩553,000/년

**인프라 총계 (1년)**: ₩787,000

---

### 기타 비용

| 항목 | 금액 | 비고 |
|-----|------|------|
| 도메인 구입 | ₩20,000/년 | .com 도메인 |
| SSL 인증서 | ₩0 | Cloudflare 무료 제공 |
| 디자인 라이센스 | ₩200,000 | 폰트, 아이콘 (Tenor Sans, Font Awesome Pro) |
| 프로젝트 관리 도구 | ₩120,000 | Notion, Figma Pro (4개월) |
| 개발 도구 | ₩0 | VS Code, Git, GitHub (무료) |

**기타 비용 합계**: ₩340,000

---

### 총 프로젝트 비용

| 구분 | 금액 | 비율 |
|-----|------|------|
| 인건비 | ₩122,000,000 | 99.1% |
| 인프라 비용 (1년) | ₩787,000 | 0.6% |
| 기타 비용 | ₩340,000 | 0.3% |
| **소계** | ₩123,127,000 | 100% |
| **부가세 (10%)** | ₩12,312,700 | |
| **총액** | **₩135,439,700** | |

---

### 비용 절감 방안

#### 1. 인프라 비용 최적화
- **Cloudflare Free Tier 활용**
  - Pages, Workers, D1, R2 모두 Free Tier에서 시작
  - 초기 사용자 수 (< 1만 명)에서는 무료 범위 내 운영 가능
  - **예상 절감**: ₩234,000/년 → ₩0 (초기 6개월)

#### 2. 오픈소스 활용
- **SendGrid 무료 플랜**: 월 100통 이메일 무료
- **Google Vision API 대신 Tesseract.js**: 클라이언트 사이드 OCR
- **예상 절감**: ₩390,000/년

#### 3. 개발 인력 조정
- **풀타임 대신 파트타임**: 디자이너를 Phase 0에만 투입 (1개월 → 0.5개월)
- **프리랜서 활용**: QA 엔지니어를 계약직으로 전환
- **예상 절감**: ₩8,000,000

**총 절감 가능 금액**: ₩8,624,000 (약 6.5%)

---

## 📈 비용-효익 분석 (ROI)

### 예상 매출 (1년 차)

#### 수익 모델
1. **무료 사용자**: 기본 기능 무료 제공
2. **프리미엄 구독** (월 ₩9,900)
   - 커스텀 도메인
   - 고급 테마 (5종 추가)
   - 분석 대시보드
   - 템플릿 라이브러리
3. **기업 플랜** (월 ₩99,000)
   - 팀 계정 (최대 20명)
   - 브랜딩 커스터마이징
   - 우선 고객 지원

#### 사용자 획득 시나리오 (보수적 추정)

| 기간 | 무료 사용자 | 프리미엄 (5%) | 기업 (0.5%) | 월 매출 |
|-----|------------|--------------|------------|---------|
| 1~3개월 | 1,000명 | 50명 | 5팀 | ₩990,000 |
| 4~6개월 | 5,000명 | 250명 | 25팀 | ₩4,950,000 |
| 7~9개월 | 15,000명 | 750명 | 75팀 | ₩14,850,000 |
| 10~12개월 | 30,000명 | 1,500명 | 150팀 | ₩29,700,000 |

**1년 차 총 매출**: ₩152,460,000

#### 운영 비용 (1년 차)

| 항목 | 금액 |
|-----|------|
| 인프라 (Cloudflare Paid) | ₩2,808,000 |
| 외부 서비스 | ₩553,000 |
| 고객 지원 (파트타임 1명) | ₩18,000,000 |
| 마케팅 비용 | ₩30,000,000 |
| **합계** | **₩51,361,000** |

#### ROI 계산

```
총 수익 = ₩152,460,000 (매출)
총 비용 = ₩135,439,700 (개발) + ₩51,361,000 (운영) = ₩186,800,700

순이익 = ₩152,460,000 - ₩51,361,000 = ₩101,099,000 (운영 이익)
ROI = (₩101,099,000 - ₩135,439,700) / ₩135,439,700 × 100 = -25.4%

* 1년 차 손익분기점 미달 (2년 차 흑자 전환 예상)
```

#### 2년 차 예상 (성장 시나리오)

| 지표 | 1년 차 | 2년 차 | 성장률 |
|-----|--------|--------|--------|
| 무료 사용자 | 30,000명 | 100,000명 | 233% |
| 프리미엄 사용자 | 1,500명 | 6,000명 | 300% |
| 기업 플랜 | 150팀 | 600팀 | 300% |
| 월 매출 (12개월 평균) | ₩12,705,000 | ₩50,820,000 | 300% |
| 연 매출 | ₩152,460,000 | ₩609,840,000 | 300% |
| 순이익 | -₩34,340,700 | ₩489,717,300 | 흑자 전환 |

**누적 ROI (2년)**: +138.7%

---

## 🎯 성공 지표 (KPI)

### 비즈니스 지표
| 지표 | 1개월 | 3개월 | 6개월 | 12개월 |
|-----|-------|-------|-------|--------|
| 총 사용자 수 | 500 | 2,000 | 8,000 | 30,000 |
| 일일 활성 사용자 (DAU) | 50 | 300 | 1,200 | 5,000 |
| 월간 활성 사용자 (MAU) | 300 | 1,500 | 6,000 | 25,000 |
| 생성된 명함 수 | 800 | 4,000 | 16,000 | 60,000 |
| 명함 조회 수 | 2,000 | 15,000 | 80,000 | 400,000 |
| 전환율 (무료→프리미엄) | 2% | 3% | 4% | 5% |

### 기술 지표
| 지표 | 목표값 | 측정 방법 |
|-----|--------|-----------|
| 페이지 로드 시간 | < 1.5초 | Lighthouse |
| API 응답 시간 | < 200ms | Cloudflare Analytics |
| 가용성 (Uptime) | > 99.9% | Cloudflare Monitoring |
| 에러율 | < 0.1% | Sentry |
| 모바일 앱 크래시율 | < 1% | Expo Insights |

### 사용자 경험 지표
| 지표 | 목표값 | 측정 방법 |
|-----|--------|-----------|
| 온보딩 완료율 | > 80% | 분석 대시보드 |
| 명함 생성 완료율 | > 70% | Funnel 분석 |
| 사용자 만족도 (NPS) | > 50 | 인앱 설문 |
| 앱스토어 평점 | > 4.5 | App Store / Play Store |

---

## ⚠️ 리스크 관리

### 기술적 리스크

| 리스크 | 확률 | 영향 | 대응 방안 |
|--------|------|------|-----------|
| Cloudflare D1 성능 이슈 | 중 | 고 | 인덱스 최적화, 캐싱 (KV) 도입 |
| 모바일 앱 심사 거부 | 중 | 중 | 앱스토어 가이드라인 사전 검토 |
| QR 코드 스캔 오류 (저조도) | 중 | 저 | 카메라 권한 가이드, 플래시 옵션 |
| 대용량 이미지 업로드 속도 | 중 | 중 | 이미지 리사이징 (클라이언트), R2 멀티파트 업로드 |

### 비즈니스 리스크

| 리스크 | 확률 | 영향 | 대응 방안 |
|--------|------|------|-----------|
| 사용자 획득 지연 | 고 | 고 | SNS 마케팅 강화, 초기 무료 크레딧 제공 |
| 경쟁 서비스 출시 | 중 | 중 | 차별화 요소 강조 (행복나무 게임, 무료 플랜) |
| 프리미엄 전환율 저조 | 중 | 고 | 14일 무료 체험, 추천인 할인 |
| 법적 이슈 (개인정보) | 저 | 고 | 개인정보처리방침 명시, 데이터 암호화 |

### 일정 리스크

| 리스크 | 확률 | 영향 | 대응 방안 |
|--------|------|------|-----------|
| 개발 일정 지연 (2주 이상) | 중 | 중 | 주간 스프린트 점검, 백로그 우선순위 조정 |
| 핵심 인력 이탈 | 저 | 고 | 문서화 철저, 코드 리뷰 의무화 |
| 디자인 수정 요청 과다 | 중 | 중 | Phase 0에서 디자인 확정, 변경 범위 제한 |

---

## 📅 프로젝트 일정 (간트 차트)

```
Week  1   2   3   4   5   6   7   8   9  10  11  12  13  14  15  16
─────────────────────────────────────────────────────────────────
Phase 0 (프로젝트 준비)
├─ 요구사항 정의      ██
├─ 디자인 시스템      ██
└─ 프로토타입         ████

Phase 1 (MVP 개발)
├─ 백엔드 API             ████████
├─ 웹 프론트엔드          ██████████████
├─ 모바일 앱              ██████████████
└─ QA 테스트                      ████████

Phase 2 (확장 기능)
├─ 소셜 로그인                                ████
├─ 분석 대시보드                              ████
└─ 프리미엄 기능                              ████████

Phase 3 (배포 및 운영)
├─ 프로덕션 배포                                      ████
└─ 앱스토어 제출                                      ████

마일스톤
▼ Week 2: 디자인 확정
▼ Week 8: 백엔드 API 완료
▼ Week 10: 웹 MVP 완료
▼ Week 12: 모바일 MVP 완료
▼ Week 14: QA 완료
▼ Week 16: 정식 출시
```

---

## 🚀 배포 전략

### 단계별 출시 계획

#### 1단계: 클로즈드 베타 (Week 14~15)
- **대상**: 내부 팀 + 지인 30명
- **목적**: 치명적 버그 검출, UX 피드백
- **기간**: 1주일
- **배포**: Cloudflare Preview 환경

#### 2단계: 오픈 베타 (Week 15~16)
- **대상**: 커뮤니티 공개 모집 (최대 500명)
- **목적**: 실제 사용 패턴 분석, 성능 테스트
- **기간**: 1주일
- **배포**: 프로덕션 환경 (제한된 접근)
- **특전**: 베타 테스터 전용 테마, 평생 프리미엄 할인 20%

#### 3단계: 정식 출시 (Week 16)
- **대상**: 전체 공개
- **배포**: 프로덕션 환경
- **앱스토어**: iOS App Store, Google Play Store
- **마케팅**: SNS 캠페인, 프레스 릴리스

---

## 📞 지원 및 유지보수

### 출시 후 유지보수 계획

#### 1개월 차: 안정화 기간
- **인력**: Backend 1명, Frontend 1명 (풀타임)
- **작업**:
  - 긴급 버그 수정 (24시간 내 대응)
  - 성능 모니터링 및 최적화
  - 사용자 피드백 수집 및 분석
- **비용**: ₩15,000,000

#### 2~6개월 차: 기능 개선
- **인력**: Backend 1명, Frontend 1명 (파트타임 50%)
- **작업**:
  - 마이너 버전 업데이트 (월 1회)
  - 사용자 요청 기능 개발
  - 보안 패치
- **비용**: ₩7,500,000/월 × 5개월 = ₩37,500,000

#### 7~12개월 차: 운영 단계
- **인력**: 고객 지원 1명 (파트타임)
- **작업**:
  - 버그 수정 (주 1회 배포)
  - 고객 문의 응대
  - 분기별 메이저 업데이트
- **비용**: ₩3,000,000/월 × 6개월 = ₩18,000,000

**1년 유지보수 총 비용**: ₩70,500,000

---

## 📋 인도물 목록

### 1. 소스 코드
- **웹 애플리케이션**: `/apps/web`
  - Vite + React + TypeScript
  - 공개 페이지, 사용자 페이지, 관리자 페이지
- **모바일 애플리케이션**: `/apps/mobile`
  - Expo + React Native
  - iOS/Android 빌드 설정
- **백엔드 API**: `/apps/web/src/index.tsx`
  - Hono + Cloudflare Workers
  - 21개 API 엔드포인트
- **공통 라이브러리**: `/packages/shared`
  - TypeScript 타입 정의
  - 유틸리티 함수
  - 검증 스키마

### 2. 데이터베이스
- **마이그레이션 스크립트**: `/apps/web/migrations`
- **시드 데이터**: `seed.sql`
- **ERD 문서**: `docs/data-model.md`

### 3. 문서
- **프로젝트 문서**: `/docs`
  - Project Charter (프로젝트 헌장)
  - PRD (제품 요구사항 정의서)
  - Screens & Flows (화면 설계)
  - Data Model (데이터 모델)
  - API Specification (API 명세서)
  - Architecture (아키텍처 설계)
  - Backlog (개발 백로그)
  - QA Plan (QA 계획)
  - Security (보안 가이드)
  - Analytics (분석 지표)
- **디자인 가이드**: `docs/design-guide.md`
- **운영 매뉴얼**: `docs/operations.md`
- **API 문서**: Swagger UI

### 4. 설정 파일
- `wrangler.jsonc`: Cloudflare 설정
- `package.json`: 의존성 목록
- `tsconfig.json`: TypeScript 설정
- `vite.config.ts`: 빌드 설정
- `ecosystem.config.cjs`: PM2 설정
- `.gitignore`: Git 제외 파일

### 5. 빌드 산출물
- **웹 빌드**: `dist/` (Cloudflare Pages 배포용)
- **iOS 빌드**: `.ipa` (App Store 제출용)
- **Android 빌드**: `.apk` / `.aab` (Play Store 제출용)

### 6. 테스트
- **단위 테스트**: Jest + React Testing Library
- **통합 테스트**: Playwright
- **테스트 커버리지 리포트**: `coverage/`

### 7. 디자인 에셋
- **Figma 프로토타입**: 전체 화면 (13개)
- **브랜드 에셋**: 로고, 아이콘, 컬러 팔레트
- **이미지 에셋**: 랜딩 페이지, 튜토리얼

---

## 🎓 교육 및 이관

### 교육 계획 (Week 16)

#### 1. 개발팀 교육 (4시간)
- **대상**: 인수 개발팀
- **내용**:
  - 프로젝트 구조 설명
  - 코드베이스 둘러보기
  - 로컬 개발 환경 셋업
  - 배포 프로세스 실습
  - 트러블슈팅 가이드

#### 2. 운영팀 교육 (2시간)
- **대상**: 고객 지원, 마케팅 팀
- **내용**:
  - 서비스 기능 소개
  - 관리자 대시보드 사용법
  - 자주 묻는 질문 (FAQ)
  - 고객 문의 대응 가이드

#### 3. Q&A 세션 (2시간)
- **대상**: 전체 참석자
- **내용**:
  - 실시간 질의응답
  - 추가 요청사항 논의
  - 유지보수 계약 안내

---

## ✅ 검수 기준

### 기능 검수 체크리스트

#### 인증
- [ ] 회원가입 (이메일 중복 검사)
- [ ] 로그인 (JWT 토큰 발급)
- [ ] 자동 로그인 (토큰 갱신)
- [ ] 로그아웃

#### 명함 관리
- [ ] 명함 생성 (모든 필드 입력)
- [ ] 명함 조회 (공개/비공개 상태 확인)
- [ ] 명함 수정 (실시간 미리보기)
- [ ] 명함 삭제
- [ ] QR 코드 생성
- [ ] 10가지 테마 적용

#### 명함 공유
- [ ] 공개 링크 생성 (`/c/:cardId`)
- [ ] QR 코드 다운로드
- [ ] 연락처 저장 (vCard)
- [ ] Web Share API (모바일)
- [ ] 조회 수 카운트

#### 명함 지갑
- [ ] 명함 저장
- [ ] 그룹 생성/수정/삭제
- [ ] 검색 기능
- [ ] 정렬 (최신순, 이름순)

#### 게임
- [ ] 나무 심기 (물 포인트 차감)
- [ ] 나무 성장 (5단계)
- [ ] 나무 수확 (리워드 지급)
- [ ] 리더보드

#### 관리자
- [ ] 전체 통계 조회
- [ ] 사용자 목록 (검색, 필터)
- [ ] 사용자 상태 변경
- [ ] 명함 목록 (검색, 필터)
- [ ] 명함 상태 변경

### 성능 검수 기준

| 항목 | 기준 | 측정 도구 |
|-----|------|-----------|
| 랜딩 페이지 로드 시간 | < 1.5초 | Lighthouse |
| 명함 페이지 로드 시간 | < 1.0초 | Lighthouse |
| API 응답 시간 (95 percentile) | < 200ms | Cloudflare Analytics |
| 모바일 앱 초기 로드 | < 3초 | Expo Insights |
| 이미지 업로드 (5MB) | < 5초 | 수동 테스트 |

### 호환성 검수

#### 웹 브라우저
- [ ] Chrome (최신 버전)
- [ ] Safari (최신 버전)
- [ ] Firefox (최신 버전)
- [ ] Edge (최신 버전)

#### 모바일 디바이스
- [ ] iPhone (iOS 15 이상)
- [ ] iPad (iOS 15 이상)
- [ ] Android (Android 11 이상)
- [ ] 다양한 화면 크기 (320px ~ 1920px)

### 보안 검수
- [ ] SQL Injection 방어
- [ ] XSS (Cross-Site Scripting) 방어
- [ ] CSRF (Cross-Site Request Forgery) 방어
- [ ] 비밀번호 암호화 (bcrypt)
- [ ] HTTPS 강제 (Cloudflare)
- [ ] 민감 정보 로그 제외

---

## 📞 연락처

### 프로젝트 담당자
- **이름**: [담당자 이름]
- **이메일**: [이메일 주소]
- **전화**: [전화번호]
- **GitHub**: https://github.com/[username]/meti

### 기술 지원
- **Cloudflare 공식 문서**: https://developers.cloudflare.com
- **Hono 프레임워크**: https://hono.dev
- **Expo 문서**: https://docs.expo.dev

---

## 📝 변경 이력

| 버전 | 날짜 | 작성자 | 변경 내용 |
|-----|------|--------|-----------|
| 1.0 | 2026-03-13 | [작성자] | 초안 작성 |
| 1.1 | 2026-03-14 | [작성자] | 비용 산정 추가 |
| 1.2 | 2026-03-15 | [작성자] | ROI 분석 추가 |

---

## 🔐 첨부 문서

1. **METI_PROJECT_CHARTER.md** - 프로젝트 헌장
2. **METI_PRD.md** - 제품 요구사항 정의서
3. **METI_DATA_MODEL.md** - 데이터 모델 설계
4. **METI_API_SPEC.md** - API 명세서
5. **METI_DESIGN_GUIDE.md** - 디자인 가이드

---

**이 문서는 METI 디지털 명함 서비스 개발 프로젝트의 공식 견적서입니다.**

**문의사항이 있으시면 언제든지 연락 주시기 바랍니다.**

---

*최종 업데이트: 2026년 3월 13일*
*문서 버전: 1.2*
*작성자: [작성자 이름]*
