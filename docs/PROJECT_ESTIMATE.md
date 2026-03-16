# METI 프로젝트 SI 견적 자료

> **프로젝트명**: METI - 디지털 명함 웹/모바일 앱  
> **작성일**: 2026-03-13  
> **버전**: v1.0

---

## 📋 1. 프로젝트 개요

### 1.1 사업 목적
- 종이 명함을 대체하는 디지털 명함 서비스 개발
- 링크/QR 코드로 간편하게 명함 공유
- 앱 설치 없이도 웹에서 명함 열람 가능
- 명함 생성부터 공유까지 3분 이내 완료

### 1.2 타겟 사용자
- **1차**: 30-40대 직장인, B2B 영업/마케팅 담당자
- **2차**: 20-30대 프리랜서, 크리에이터
- **3차**: 전문직, 임원급 (고급 디자인 선호)

### 1.3 핵심 가치 제안
- **빠른 생성**: 3분 안에 명함 완성
- **쉬운 공유**: 링크 복사 또는 QR 코드 스캔
- **앱 불필요**: 받는 사람은 웹에서 바로 열람
- **프라이버시**: 전화/이메일 선택적 공개
- **다양한 디자인**: 10가지 컬러 테마 제공

---

## 🎯 2. 개발 범위 (Scope)

### 2.1 플랫폼
- ✅ **웹 앱** (데스크톱 + 모바일 웹)
- ✅ **iOS 모바일 앱** (App Store)
- ✅ **Android 모바일 앱** (Google Play Store)

### 2.2 주요 기능

#### Phase 1: MVP (필수 기능)

**2.2.1 사용자 인증**
- 이메일 기반 회원가입/로그인
- 매직링크 인증 (비밀번호 불필요)
- Google OAuth 소셜 로그인
- 세션 관리

**2.2.2 명함 관리**
- 명함 생성/수정/삭제
- 프로필 정보 입력
  - 이름 (필수)
  - 직책/회사 (선택)
  - 한 줄 소개 (선택)
  - 프로필 사진 업로드 (선택)
  - 전화번호 (선택)
  - 이메일 (선택)
  - SNS 링크 (최대 5개)
- 10가지 컬러 테마 선택
- 공개 범위 설정
  - Public (검색 노출)
  - Unlisted (링크만 공유)
  - Private (본인만)
- 전화/이메일 표시 토글

**2.2.3 명함 공유**
- 고유 URL 생성 (`/c/[id]`)
- 짧은 URL 지원
- QR 코드 생성
- QR 코드 이미지 다운로드
- 링크 복사 (클립보드)
- 모바일 공유 시트 (iOS/Android)
- vCard (.vcf) 다운로드 (연락처 저장)

**2.2.4 명함 열람 (퍼블릭 뷰)**
- 모바일 최적화 명함 페이지
- 반응형 디자인 (390px 기준)
- 글래스모피즘 UI
- 애니메이션 효과
- 전화/이메일 클릭 시 다이렉트 액션
- SNS 링크 클릭
- 조회 수 카운팅
- Source 추적 (utm 파라미터)

**2.2.5 관리자 대시보드**
- 플랫폼 통계
  - 총 가입자 수
  - 총 명함 수
  - 일일 활성 사용자 (DAU)
  - 총 명함 조회수
  - 가입 추이 (7일/30일)
- 사용자 관리
  - 최근 가입자 목록
  - 이메일/이름 검색
  - 계정 상태 관리
- 명함 관리
  - 전체 명함 목록 (페이지네이션)
  - 신고 명함 처리
  - 공개/비공개/삭제 상태 통계

#### Phase 2: 확장 기능 (선택)

**2.2.6 명함 지갑 (Card Wallet)**
- 받은 명함 저장
- 명함 그룹화 (폴더)
- 즐겨찾기
- 메모 추가
- 검색/필터

**2.2.7 게임 연동 (HappyTree)**
- 명함 교환 시 포인트 적립
- 화분 획득
- 레벨 시스템
- 보상 알림

**2.2.8 고급 분석**
- 명함별 조회 통계
- 유입 경로 분석 (source)
- 시간대별 조회 패턴
- 지역별 통계

---

## 🏗️ 3. 기술 스택

### 3.1 웹 앱 (Frontend + Backend)

#### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: TailwindCSS (CDN)
- **Language**: TypeScript
- **UI Library**: Font Awesome Icons
- **Fonts**: Tenor Sans, Noto Sans KR

#### Backend
- **Framework**: Hono (경량 웹 프레임워크)
- **Runtime**: Cloudflare Workers
- **Language**: TypeScript
- **API Style**: RESTful JSON

#### Database
- **Primary DB**: Cloudflare D1 (SQLite)
- **Key-Value Store**: Cloudflare KV (캐싱, 세션)
- **File Storage**: Cloudflare R2 (프로필 사진)

#### Hosting & Deployment
- **Platform**: Cloudflare Pages
- **CDN**: Cloudflare Global Network
- **Domain**: 커스텀 도메인 지원
- **SSL**: 자동 HTTPS

### 3.2 모바일 앱

#### Framework
- **Technology**: Expo (React Native)
- **Language**: TypeScript
- **Navigation**: Expo Router (파일 기반)
- **UI Components**: React Native Paper / NativeBase

#### Native Features
- **Camera**: QR 코드 스캔 (expo-camera)
- **Share**: 네이티브 공유 시트 (expo-sharing)
- **Clipboard**: 링크 복사 (expo-clipboard)
- **Image Picker**: 프로필 사진 선택 (expo-image-picker)
- **Notifications**: 푸시 알림 (expo-notifications)

#### Build & Distribution
- **Build Service**: Expo EAS Build
- **OTA Updates**: Expo Updates (즉시 배포)
- **Analytics**: Expo Analytics

### 3.3 공통 (Shared)

#### Monorepo Structure
- **Tool**: npm workspaces
- **Structure**: apps/web, apps/mobile, packages/shared
- **Shared Types**: TypeScript 타입 정의
- **Shared Utils**: 유틸리티 함수
- **Shared Validation**: Zod 스키마

### 3.4 DevOps & Tools

#### Version Control
- **Git**: GitHub 저장소
- **Branching**: main, develop, feature/*

#### CI/CD
- **Web**: Cloudflare Pages 자동 배포
- **Mobile**: EAS Build + App Store Connect/Google Play Console

#### Monitoring
- **Error Tracking**: Sentry (선택)
- **Analytics**: Cloudflare Analytics
- **Uptime**: Cloudflare Workers Analytics

---

## 📊 4. 데이터베이스 설계

### 4.1 주요 테이블

#### users (사용자)
```sql
CREATE TABLE users (
  id TEXT PRIMARY KEY,                    -- UUID
  email TEXT UNIQUE NOT NULL,             -- 이메일 (로그인)
  name TEXT NOT NULL,                     -- 이름
  profile_image TEXT,                     -- 프로필 사진 URL
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  last_active_at DATETIME,
  settings TEXT DEFAULT '{"language":"ko","theme":"light"}',
  cards_sent INTEGER DEFAULT 0,          -- 보낸 명함 수
  cards_received INTEGER DEFAULT 0,      -- 받은 명함 수
  total_views INTEGER DEFAULT 0          -- 총 조회수
);
```

#### cards (명함)
```sql
CREATE TABLE cards (
  id TEXT PRIMARY KEY,                    -- UUID
  user_id TEXT NOT NULL,                  -- 소유자 ID
  short_id TEXT UNIQUE,                   -- 짧은 ID (공유용)
  
  -- 기본 정보
  name TEXT NOT NULL,                     -- 이름
  headline TEXT,                          -- 헤드라인/직책
  title TEXT,                             -- 직책
  company TEXT,                           -- 회사명
  company_logo TEXT,                      -- 회사 로고 URL
  bio TEXT,                               -- 자기소개
  avatar TEXT,                            -- 프로필 사진 URL
  
  -- 연락처
  phone TEXT,                             -- 전화번호
  email TEXT,                             -- 이메일
  show_phone INTEGER DEFAULT 1,          -- 전화 표시 여부
  show_email INTEGER DEFAULT 1,          -- 이메일 표시 여부
  
  -- 링크
  links TEXT DEFAULT '[]',               -- JSON array [{label, url}]
  
  -- 디자인
  theme TEXT DEFAULT 'deep-navy',        -- 테마 ID
  
  -- 공개 설정
  status TEXT DEFAULT 'public',          -- public/unlisted/private
  is_default INTEGER DEFAULT 0,          -- 기본 명함 여부
  
  -- 공유 정보
  share_url TEXT,                        -- 공유 URL
  qr_code TEXT,                          -- QR 코드 URL
  
  -- 통계
  views INTEGER DEFAULT 0,               -- 조회수
  shares INTEGER DEFAULT 0,              -- 공유수
  saves INTEGER DEFAULT 0,               -- 저장수
  last_viewed_at DATETIME,               -- 마지막 조회 시간
  
  -- 타임스탬프
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

#### card_view_events (조회 이벤트)
```sql
CREATE TABLE card_view_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  card_id TEXT NOT NULL,
  viewed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  source TEXT,                           -- utm_source
  user_agent TEXT,
  ip_hash TEXT,                          -- 익명화된 IP
  
  FOREIGN KEY (card_id) REFERENCES cards(id)
);
```

#### card_wallet (명함 지갑) - Phase 2
```sql
CREATE TABLE card_wallet (
  id TEXT PRIMARY KEY,
  owner_id TEXT NOT NULL,                -- 저장한 사람
  card_id TEXT NOT NULL,                 -- 저장된 명함
  saved_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  memo TEXT,                             -- 메모
  tags TEXT DEFAULT '[]',                -- JSON array
  group_id TEXT,                         -- 그룹 ID
  is_favorite INTEGER DEFAULT 0,         -- 즐겨찾기
  
  UNIQUE(owner_id, card_id),
  FOREIGN KEY (owner_id) REFERENCES users(id),
  FOREIGN KEY (card_id) REFERENCES cards(id)
);
```

### 4.2 인덱스
- `cards.user_id` - 사용자별 명함 조회
- `cards.short_id` - 공유 URL 조회
- `cards.status` - 공개 상태별 필터
- `card_view_events.card_id` - 명함별 조회 통계

### 4.3 예상 데이터 볼륨 (1년차)
- 사용자: 10,000명
- 명함: 15,000개 (1인당 1.5개)
- 조회 이벤트: 500,000건

---

## 🎨 5. 디자인 시스템

### 5.1 컬러 테마 (10종)
1. Deep Navy (#0A2260) - 기본
2. Midnight Teal (#0D3D4D)
3. Forest Deep (#1A3D2E)
4. Royal Burgundy (#4A1E2E)
5. Charcoal Dark (#1C1C1E)
6. Slate Blue (#2C3E50)
7. Deep Purple (#3D2857)
8. Warm Brown (#3E2723)
9. Olive Night (#3D4A2C)
10. Sunset Orange (#8B4513)

### 5.2 타이포그래피
- **Display**: Tenor Sans (영문 로고/헤드라인)
- **Body**: Noto Sans KR (한글 본문)
- **Size Scale**: 11px ~ 72px

### 5.3 UI 컴포넌트
- 글래스모피즘 카드 (backdrop-filter: blur)
- 부드러운 애니메이션 (0.3s ease)
- 반응형 그리드 레이아웃
- 모바일 우선 디자인 (390px 기준)

---

## 📱 6. 화면 구성

### 6.1 웹 앱 (19개 화면)

#### 공개 페이지 (인증 불필요)
1. **메인 랜딩 페이지** (`/`)
   - 히어로 섹션
   - 주요 기능 소개
   - 10가지 테마 미리보기
   - CTA 버튼

2. **테마 갤러리** (`/themes`)
   - 10가지 컬러 테마 카드
   - 실시간 미리보기
   - 테마별 설명

3. **퍼블릭 명함 페이지** (`/c/:id`)
   - 명함 정보 표시
   - 연락처 액션 (전화/이메일)
   - SNS 링크
   - QR 코드 모달
   - vCard 다운로드
   - 공유 버튼

#### 인증 페이지
4. **회원가입** (`/auth/register`)
5. **로그인** (`/auth/login`)
6. **매직링크 확인** (`/auth/verify`)

#### 사용자 페이지 (인증 필요)
7. **대시보드** (`/my`)
   - 내 명함 목록
   - 빠른 통계
   - 최근 활동

8. **명함 생성** (`/my/card/new`)
   - 정보 입력 폼
   - 프로필 사진 업로드
   - 테마 선택
   - 실시간 미리보기

9. **명함 수정** (`/my/card/:id/edit`)
   - 기존 정보 수정
   - 테마 변경
   - 공개 설정

10. **명함 미리보기** (`/my/card/:id/preview`)
    - 실제 뷰 확인
    - 공유 링크 복사
    - QR 코드 다운로드

11. **명함 통계** (`/my/card/:id/stats`)
    - 조회수 그래프
    - 유입 경로
    - 시간대별 통계

12. **내 프로필** (`/my/profile`)
    - 계정 정보
    - 이메일 변경
    - 비밀번호 변경
    - 탈퇴

13. **설정** (`/my/settings`)
    - 알림 설정
    - 언어 설정
    - 테마 설정

#### 명함 지갑 (Phase 2)
14. **지갑 목록** (`/wallet`)
15. **지갑 그룹** (`/wallet/groups`)
16. **명함 상세** (`/wallet/:id`)

#### 관리자 페이지 (관리자 권한)
17. **관리자 대시보드** (`/admin`)
    - 플랫폼 통계
    - 최근 가입자
    - 최근 생성 명함

18. **사용자 관리** (`/admin/users`)
    - 사용자 목록
    - 검색/필터
    - 상태 관리

19. **명함 관리** (`/admin/cards`)
    - 명함 목록
    - 신고 처리
    - 강제 삭제

### 6.2 모바일 앱 (8개 화면)

#### 메인 탭
1. **홈 (명함 목록)** (`/`)
2. **명함 생성/편집** (`/create`)
3. **프로필** (`/profile`)

#### 상세 화면
4. **명함 상세** (`/card/:id`)
5. **테마 선택** (`/themes`)
6. **공유 시트** (네이티브)
7. **설정** (`/settings`)
8. **로그인/회원가입** (`/auth`)

---

## 🔌 7. API 엔드포인트 (21개)

### 7.1 인증 API (3개)
```
POST   /api/auth/register      # 회원가입
POST   /api/auth/login         # 로그인
GET    /api/auth/me            # 현재 사용자 조회
```

### 7.2 명함 API (8개)
```
GET    /api/cards              # 내 명함 목록
POST   /api/cards              # 명함 생성
GET    /api/cards/:id          # 명함 상세 조회
PUT    /api/cards/:id          # 명함 수정
DELETE /api/cards/:id          # 명함 삭제
GET    /api/cards/share/:userId/:shortId  # 공유 명함 조회
POST   /api/cards/:id/qr       # QR 코드 생성
GET    /api/cards/:id/stats    # 명함 통계
```

### 7.3 명함 지갑 API (4개) - Phase 2
```
GET    /api/wallet             # 저장된 명함 목록
POST   /api/wallet/:cardId     # 명함 저장
DELETE /api/wallet/:id         # 명함 삭제
GET    /api/wallet/groups      # 그룹 목록
```

### 7.4 게임 API (6개) - Phase 2
```
GET    /api/game/status        # 게임 상태
GET    /api/game/farm          # 내 농장 (화분 목록)
POST   /api/game/farm/water    # 물주기
POST   /api/game/farm/harvest  # 수확
GET    /api/game/rewards       # 보상 내역
POST   /api/game/exchange      # 명함 교환 보상
```

### 7.5 헬스 체크 (1개)
```
GET    /api/health             # 서버 상태 확인
```

---

## 📅 8. 개발 일정 (추정)

### Phase 1: MVP 개발 (8-10주)

#### Week 1-2: 백엔드 기반 구축
- [x] 프로젝트 셋업 (모노레포)
- [x] 데이터베이스 스키마 설계
- [x] 인증 API 개발
- [x] 명함 CRUD API 개발
- **산출물**: API 21개 엔드포인트

#### Week 3-4: 웹 프론트엔드 (공개 페이지)
- [x] 메인 랜딩 페이지
- [x] 퍼블릭 명함 페이지 (`/c/:id`)
- [x] 테마 갤러리
- [x] 반응형 디자인
- **산출물**: 공개 페이지 3개

#### Week 5-6: 웹 프론트엔드 (사용자 페이지)
- [ ] 회원가입/로그인 UI
- [ ] 명함 생성/편집 폼
- [ ] 테마 선택 UI
- [ ] 프로필 사진 업로드
- [ ] 실시간 미리보기
- **산출물**: 인증 + CRUD 페이지 5개

#### Week 7-8: 모바일 앱 개발
- [ ] Expo 프로젝트 생성
- [ ] 메인 탭 구조 (홈/생성/프로필)
- [ ] 명함 생성/편집 화면
- [ ] 테마 선택 화면
- [ ] 네이티브 공유 기능
- **산출물**: iOS/Android 앱

#### Week 9: 통합 테스트 & 버그 수정
- [ ] 웹-모바일 API 통합 테스트
- [ ] 크로스 브라우저 테스트
- [ ] iOS/Android 디바이스 테스트
- [ ] 성능 최적화
- **산출물**: 테스트 리포트

#### Week 10: 배포 & 런칭
- [ ] Cloudflare Pages 배포
- [ ] App Store 제출
- [ ] Google Play Store 제출
- [ ] 도메인 연결 & SSL
- [ ] 모니터링 설정
- **산출물**: 프로덕션 서비스

### Phase 2: 확장 기능 (4-6주) - 선택사항

#### Week 11-12: 명함 지갑
- [ ] 명함 저장/그룹 관리
- [ ] 검색/필터 기능
- [ ] 메모/태그 기능

#### Week 13-14: 게임 연동
- [ ] HappyTree 게임 API 연동
- [ ] 포인트/보상 시스템
- [ ] 알림 시스템

#### Week 15-16: 고급 기능
- [ ] 고급 분석 대시보드
- [ ] 푸시 알림 (모바일)
- [ ] 소셜 공유 최적화

---

## 💰 9. 비용 구조 (월별 운영비)

### 9.1 인프라 비용

#### Cloudflare (웹 호스팅)
- **Cloudflare Pages**: 무료 (500 빌드/월)
- **Cloudflare Workers**: $5/월 (10M 요청)
- **D1 Database**: $5/월 (100M 읽기)
- **R2 Storage**: $0.015/GB (1,000GB 무료)
- **도메인**: $10/년

**예상 월비용**: $10-20 (초기), $50-100 (성장기)

#### 모바일 앱
- **Apple Developer**: $99/년 ($8.25/월)
- **Google Play Console**: $25 (일회성)
- **Expo EAS Build**: $29/월 (Pro Plan)

**예상 월비용**: $37 (초기)

#### 기타
- **Error Tracking (Sentry)**: $26/월 (선택)
- **Push Notifications**: $0-50/월 (볼륨 기반)

**총 예상 월 운영비**: $50-100 (초기), $100-200 (성장기)

### 9.2 개발 비용 (일회성)

#### 인건비 (Phase 1 MVP)
- **풀스택 개발자**: 8-10주 × 주급
- **UI/UX 디자이너**: 2-3주 × 주급 (선택)
- **QA 엔지니어**: 1-2주 × 주급 (선택)

#### 외부 서비스 (선택)
- **디자인 리소스**: $0-500
- **폰트 라이선스**: $0 (Google Fonts 사용)
- **아이콘/이미지**: $0-200

---

## 📊 10. 성능 지표 (KPI)

### 10.1 기술 지표
- **웹 LCP (Largest Contentful Paint)**: < 2.5초
- **모바일 앱 시작 시간**: < 3초
- **API 응답 시간**: < 200ms (p95)
- **에러율**: < 0.1%
- **가동률 (Uptime)**: > 99.9%

### 10.2 비즈니스 지표
- **가입자 수**: 1,000명 (3개월), 10,000명 (1년)
- **명함 생성 수**: 1,500개 (3개월), 15,000개 (1년)
- **DAU/MAU 비율**: > 20%
- **명함 조회수**: 평균 50회/명함
- **공유율**: 명함당 평균 10회 공유

---

## 🔒 11. 보안 & 개인정보 보호

### 11.1 보안 조치
- **HTTPS**: 모든 통신 암호화 (TLS 1.3)
- **CORS**: API 접근 제한
- **Rate Limiting**: API 호출 제한 (100 req/min)
- **SQL Injection 방어**: Prepared Statements 사용
- **XSS 방어**: Content Security Policy (CSP)
- **CSRF 방어**: Token 기반 인증

### 11.2 개인정보 처리
- **수집 최소화**: 이름, 이메일만 필수 수집
- **선택적 입력**: 전화번호, 회사 정보는 선택
- **익명화**: IP 주소 해싱 저장
- **암호화**: 비밀번호 bcrypt 해싱
- **로그 보관**: 조회 로그 90일 보관 후 삭제

### 11.3 규정 준수
- **개인정보처리방침**: 작성 및 게시
- **이용약관**: 작성 및 게시
- **쿠키 정책**: 동의 배너 표시
- **GDPR 준수**: 데이터 이동권, 삭제권 보장

---

## 📈 12. 확장성 고려사항

### 12.1 트래픽 성장 대응
- **CDN**: Cloudflare 글로벌 네트워크 활용
- **캐싱**: 정적 자산 + API 응답 캐싱
- **로드 밸런싱**: Cloudflare Workers 자동 분산
- **DB 샤딩**: 사용자별 데이터 분산 (필요시)

### 12.2 기능 확장 계획
- **명함 템플릿**: 다양한 레이아웃 추가
- **커스텀 도메인**: 기업용 화이트라벨
- **팀 계정**: 조직 단위 관리
- **결제 시스템**: 프리미엄 기능 유료화
- **API 개방**: 외부 서비스 연동

---

## 📞 13. 프로젝트 관리

### 13.1 개발 방법론
- **애자일 스크럼**: 2주 스프린트
- **일일 스탠드업**: 15분 진행 상황 공유
- **스프린트 리뷰**: 2주마다 데모
- **회고**: 개선점 도출

### 13.2 커뮤니케이션
- **GitHub**: 코드 리뷰, 이슈 트래킹
- **Notion/Confluence**: 문서화
- **Slack**: 실시간 소통
- **주간 보고**: 진행 상황 리포트

### 13.3 품질 관리
- **코드 리뷰**: 모든 PR 리뷰 필수
- **단위 테스트**: 주요 로직 커버리지 80%+
- **E2E 테스트**: 핵심 플로우 자동화
- **성능 모니터링**: Lighthouse CI

---

## 📄 14. 산출물 (Deliverables)

### 14.1 코드 저장소
- GitHub 프라이빗 레포지토리
- 완전한 소스 코드
- README 및 설정 문서
- 배포 스크립트

### 14.2 문서
- ✅ 프로젝트 헌장
- ✅ PRD (제품 요구사항 정의서)
- ✅ 화면 설계서
- ✅ 데이터 모델링
- ✅ API 명세서
- ✅ 아키텍처 설계서
- ✅ 보안 및 개인정보 보호 정책
- [ ] 사용자 매뉴얼
- [ ] 관리자 매뉴얼
- [ ] 운영 가이드

### 14.3 디자인 자산
- ✅ 디자인 가이드
- ✅ 컬러 시스템
- ✅ 타이포그래피 정의
- [ ] Figma/Sketch 파일 (선택)
- [ ] 아이콘 세트
- [ ] 로고 파일 (SVG, PNG)

### 14.4 배포 환경
- Cloudflare Pages 프로덕션 사이트
- App Store 출시 앱 (iOS)
- Google Play Store 출시 앱 (Android)
- 관리자 대시보드 접근 권한

---

## 🎯 15. 성공 기준

### 15.1 기술적 성공
- ✅ 모든 핵심 기능 구현 완료
- ✅ 웹 + 모바일 앱 출시
- ✅ 성능 지표 목표 달성
- ✅ 보안 테스트 통과
- ✅ 앱스토어 심사 통과

### 15.2 비즈니스 성공
- 런칭 후 1개월 내 100명 가입
- 런칭 후 3개월 내 1,000명 가입
- 사용자 평점 4.0+ (5.0 만점)
- 명함 생성율 80%+ (가입자 대비)
- 재방문율 40%+ (월간)

---

## 📝 16. 리스크 관리

### 16.1 기술적 리스크
| 리스크 | 영향도 | 대응 방안 |
|--------|--------|----------|
| Cloudflare 장애 | 높음 | 백업 호스팅 준비 |
| 앱스토어 심사 거부 | 중간 | 가이드라인 철저 준수 |
| 데이터베이스 성능 저하 | 중간 | 인덱스 최적화, 캐싱 |
| 보안 취약점 발견 | 높음 | 정기 보안 감사 |

### 16.2 일정 리스크
| 리스크 | 영향도 | 대응 방안 |
|--------|--------|----------|
| 요구사항 변경 | 중간 | 변경 관리 프로세스 |
| 개발자 리소스 부족 | 높음 | 우선순위 조정 |
| 예상보다 긴 테스트 기간 | 중간 | 버퍼 기간 확보 |

---

## 🏁 17. 결론

### 17.1 프로젝트 요약
METI는 **3분 안에 명함을 만들고 QR/링크로 공유**하는 디지털 명함 서비스입니다.
- **플랫폼**: 웹 + iOS + Android
- **기간**: 8-10주 (MVP)
- **기술**: Hono + Cloudflare + Expo
- **특징**: 앱 설치 불필요, 10가지 테마, 프라이버시 제어

### 17.2 핵심 차별점
1. **빠른 생성**: 3분 이내 완료
2. **앱 불필요**: 받는 사람은 웹에서 바로 열람
3. **쉬운 공유**: QR/링크 한 번에
4. **디자인 선택**: 10가지 컬러 테마
5. **프라이버시**: 정보 선택적 공개

### 17.3 투자 가치
- **낮은 운영비**: 월 $50-100 (초기)
- **빠른 출시**: 8-10주 개발
- **확장 가능**: 글로벌 CDN 활용
- **수익화 가능**: 프리미엄 기능, 기업 계정

---

## 📎 부록

### A. 참고 문서
- [프로젝트 헌장](./00_PROJECT_CHARTER.md)
- [PRD](./01_PRD.md)
- [API 명세서](./04_API_SPEC.md)
- [아키텍처](./05_ARCHITECTURE.md)

### B. 외부 링크
- GitHub 저장소: https://github.com/smee96/meti
- 현재 브랜치: `agent/bootstrap-web-mobile`
- 샌드박스 데모: https://3000-i48p46uqxkn3ketf65idi-0e616f0a.sandbox.novita.ai

### C. 연락처
- 프로젝트 담당자: [담당자 이름]
- 이메일: [이메일]
- 전화: [전화번호]

---

**문서 버전**: v1.0  
**최종 수정**: 2026-03-13  
**작성자**: METI 프로젝트팀
