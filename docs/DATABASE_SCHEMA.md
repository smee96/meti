# METI 데이터베이스 스키마

## 데이터베이스 정보
- **이름**: meti-production
- **ID**: 162afde5-6400-4acb-bc6b-fdb334ea1357
- **타입**: Cloudflare D1 (SQLite)
- **작성일**: 2026-04-17

## 테이블 목록

### 1. users (사용자)
사용자 기본 정보 및 설정을 저장합니다.

| 컬럼명 | 타입 | 제약조건 | 기본값 | 설명 |
|--------|------|----------|--------|------|
| id | TEXT | PRIMARY KEY | - | 사용자 ID |
| email | TEXT | UNIQUE NOT NULL | - | 이메일 주소 |
| name | TEXT | NOT NULL | - | 사용자 이름 |
| profile_image | TEXT | - | - | 프로필 이미지 URL |
| created_at | DATETIME | - | CURRENT_TIMESTAMP | 계정 생성일 |
| last_active_at | DATETIME | - | CURRENT_TIMESTAMP | 마지막 활동일 |
| settings | TEXT | - | JSON 객체 | 설정 (언어, 테마, 알림) |
| cards_sent | INTEGER | - | 0 | 보낸 명함 수 |
| cards_received | INTEGER | - | 0 | 받은 명함 수 |
| total_views | INTEGER | - | 0 | 총 조회수 |
| password | TEXT | - | - | 비밀번호 (해시) |

**인덱스**:
- PRIMARY KEY: id
- UNIQUE: email

---

### 2. cards (명함)
디지털 명함 정보를 저장합니다.

| 컬럼명 | 타입 | 제약조건 | 기본값 | 설명 |
|--------|------|----------|--------|------|
| id | TEXT | PRIMARY KEY | - | 명함 ID |
| user_id | TEXT | FOREIGN KEY | - | 소유자 ID (users.id) |
| name | TEXT | NOT NULL | - | 이름 |
| title | TEXT | - | - | 직함 |
| company | TEXT | - | - | 회사명 |
| company_logo | TEXT | - | - | 회사 로고 URL |
| bio | TEXT | - | - | 소개 |
| contacts | TEXT | - | '[]' | 연락처 JSON 배열 |
| social_links | TEXT | - | '[]' | 소셜 링크 JSON 배열 |
| design | TEXT | - | JSON 객체 | 디자인 설정 |
| is_default | INTEGER | - | 0 | 기본 명함 여부 |
| is_public | INTEGER | - | 1 | 공개 여부 |
| share_url | TEXT | NOT NULL | - | 공유 URL |
| qr_code | TEXT | - | - | QR 코드 |
| created_at | DATETIME | - | CURRENT_TIMESTAMP | 생성일 |
| updated_at | DATETIME | - | CURRENT_TIMESTAMP | 수정일 |
| views | INTEGER | - | 0 | 조회수 |
| shares | INTEGER | - | 0 | 공유수 |
| saves | INTEGER | - | 0 | 저장수 |
| last_viewed_at | DATETIME | - | - | 마지막 조회일 |
| theme | TEXT | - | 'deep-navy' | 테마 |
| short_id | TEXT | - | - | 짧은 ID |
| headline | TEXT | - | - | 헤드라인 |
| phone | TEXT | - | - | 전화번호 |
| email | TEXT | - | - | 이메일 |
| show_phone | INTEGER | - | 0 | 전화번호 표시 여부 |
| show_email | INTEGER | - | 0 | 이메일 표시 여부 |
| status | TEXT | - | 'public' | 상태 |
| links | TEXT | - | '[]' | 링크 JSON 배열 |
| avatar | TEXT | - | - | 아바타 URL |

**외래키**:
- user_id → users(id) ON DELETE CASCADE

---

### 3. card_wallet (명함 지갑)
사용자가 저장한 명함을 관리합니다.

| 컬럼명 | 타입 | 제약조건 | 기본값 | 설명 |
|--------|------|----------|--------|------|
| id | TEXT | PRIMARY KEY | - | 지갑 항목 ID |
| owner_id | TEXT | FOREIGN KEY | - | 소유자 ID (users.id) |
| card_id | TEXT | FOREIGN KEY | - | 명함 ID (cards.id) |
| saved_at | DATETIME | - | CURRENT_TIMESTAMP | 저장일 |
| memo | TEXT | - | - | 메모 |
| tags | TEXT | - | '[]' | 태그 JSON 배열 |
| group_id | TEXT | - | - | 그룹 ID |
| is_favorite | INTEGER | - | 0 | 즐겨찾기 여부 |

**외래키**:
- owner_id → users(id) ON DELETE CASCADE
- card_id → cards(id) ON DELETE CASCADE

**제약조건**:
- UNIQUE(owner_id, card_id)

---

### 4. wallet_groups (지갑 그룹)
명함 지갑의 그룹을 관리합니다.

| 컬럼명 | 타입 | 제약조건 | 기본값 | 설명 |
|--------|------|----------|--------|------|
| id | TEXT | PRIMARY KEY | - | 그룹 ID |
| owner_id | TEXT | FOREIGN KEY | - | 소유자 ID (users.id) |
| name | TEXT | NOT NULL | - | 그룹명 |
| color | TEXT | - | '#1A73E8' | 그룹 색상 |
| order_index | INTEGER | - | 0 | 정렬 순서 |
| created_at | DATETIME | - | CURRENT_TIMESTAMP | 생성일 |

**외래키**:
- owner_id → users(id) ON DELETE CASCADE

---

### 5. card_view_events (명함 조회 이벤트)
명함 조회 이력을 기록합니다.

| 컬럼명 | 타입 | 제약조건 | 기본값 | 설명 |
|--------|------|----------|--------|------|
| id | TEXT | PRIMARY KEY | lower(hex(randomblob(16))) | 이벤트 ID |
| card_id | TEXT | FOREIGN KEY | - | 명함 ID (cards.id) |
| viewed_at | DATETIME | - | CURRENT_TIMESTAMP | 조회 시각 |
| source | TEXT | - | - | 유입 경로 |

**외래키**:
- card_id → cards(id) ON DELETE CASCADE

---

### 6. card_rewards (명함 보상)
명함 교환 시 보상을 기록합니다.

| 컬럼명 | 타입 | 제약조건 | 기본값 | 설명 |
|--------|------|----------|--------|------|
| id | INTEGER | PRIMARY KEY AUTOINCREMENT | - | 보상 ID |
| user_id | TEXT | FOREIGN KEY | - | 사용자 ID (users.id) |
| event_type | TEXT | NOT NULL | - | 이벤트 타입 |
| reward_type | TEXT | NOT NULL | - | 보상 타입 |
| amount | INTEGER | NOT NULL | - | 보상 수량 |
| card_id | TEXT | FOREIGN KEY | - | 관련 명함 ID (cards.id) |
| created_at | DATETIME | - | CURRENT_TIMESTAMP | 생성일 |

**외래키**:
- user_id → users(id) ON DELETE CASCADE
- card_id → cards(id) ON DELETE SET NULL

---

### 7. game_user_data (게임 사용자 데이터)
HappyTree 게임의 사용자별 데이터를 저장합니다.

| 컬럼명 | 타입 | 제약조건 | 기본값 | 설명 |
|--------|------|----------|--------|------|
| user_id | TEXT | PRIMARY KEY | - | 사용자 ID (users.id) |
| hearts_balance | INTEGER | - | 300000 | 하트 잔액 |
| heart_allowance | INTEGER | - | 1 | 하트 허용치 |
| stars_purchased | INTEGER | - | 0 | 구매한 별 수 |
| coins_earned | INTEGER | - | 0 | 획득 코인 |
| coins_withdrawn | INTEGER | - | 0 | 출금 코인 |
| farm_unlocked | TEXT | - | JSON 객체 | 농장 잠금해제 상태 |
| test_mode | INTEGER | - | 0 | 테스트 모드 여부 |
| created_at | DATETIME | - | CURRENT_TIMESTAMP | 생성일 |
| updated_at | DATETIME | - | CURRENT_TIMESTAMP | 수정일 |

**외래키**:
- user_id → users(id) ON DELETE CASCADE

---

### 8. game_pots (게임 화분)
HappyTree 게임의 화분 정보를 저장합니다.

| 컬럼명 | 타입 | 제약조건 | 기본값 | 설명 |
|--------|------|----------|--------|------|
| id | INTEGER | PRIMARY KEY AUTOINCREMENT | - | 화분 ID |
| user_id | TEXT | FOREIGN KEY | - | 소유자 ID (users.id) |
| farm_id | INTEGER | NOT NULL | - | 농장 번호 (1-4) |
| level | INTEGER | - | 0 | 현재 레벨 (0-8) |
| is_in_warehouse | INTEGER | - | 0 | 창고 보관 여부 |
| created_at | DATETIME | - | CURRENT_TIMESTAMP | 생성일 |

**외래키**:
- user_id → users(id) ON DELETE CASCADE

---

### 9. game_farm_levels (게임 농장 레벨)
HappyTree 게임의 농장별 레벨 설정을 저장합니다.

| 컬럼명 | 타입 | 제약조건 | 기본값 | 설명 |
|--------|------|----------|--------|------|
| farm_id | INTEGER | PRIMARY KEY | - | 농장 번호 (1-4) |
| level | INTEGER | PRIMARY KEY | - | 레벨 (1-8) |
| hearts_required | INTEGER | - | 0 | 필요 하트 수 |
| stars | INTEGER | - | 0 | 필요 별 수 |
| coins | INTEGER | - | 0 | 보상 코인 |
| hearts_reward | INTEGER | - | 0 | 보상 하트 |

**복합 PRIMARY KEY**: (farm_id, level)

---

### 10. d1_migrations (마이그레이션 기록)
Cloudflare D1 마이그레이션 이력을 관리합니다 (시스템 테이블).

---

### 11. sqlite_sequence (SQLite 시퀀스)
AUTOINCREMENT를 위한 SQLite 시스템 테이블.

---

### 12. _cf_KV (Cloudflare KV)
Cloudflare 내부 KV 저장소 (시스템 테이블).

---

## 테이블 관계도

```
users (사용자)
  ├── cards (1:N) - 사용자가 생성한 명함
  ├── card_wallet (1:N) - 사용자가 저장한 명함
  ├── wallet_groups (1:N) - 사용자의 명함 그룹
  ├── card_rewards (1:N) - 사용자가 받은 보상
  ├── game_user_data (1:1) - 게임 데이터
  └── game_pots (1:N) - 사용자가 보유한 화분

cards (명함)
  ├── card_wallet (1:N) - 명함을 저장한 사용자들
  ├── card_view_events (1:N) - 명함 조회 이벤트
  └── card_rewards (1:N) - 명함 관련 보상

game_farm_levels (농장 레벨)
  └── (독립 테이블, 레벨별 설정 저장)
```

## 주요 특징

### 1. 명함 시스템
- **cards**: 디지털 명함 생성 및 관리
- **card_wallet**: 명함 저장 및 그룹 관리
- **card_view_events**: 조회 이력 추적
- **card_rewards**: 명함 교환 보상

### 2. HappyTree 게임 시스템
- **game_user_data**: 사용자별 게임 진행 상황 (하트, 별, 코인)
- **game_pots**: 사용자별 화분 관리 (농장, 레벨)
- **game_farm_levels**: 농장별 레벨 설정 (난이도, 보상)

### 3. 데이터 타입
- **TEXT**: 문자열 (ID, 이름, URL 등)
- **INTEGER**: 정수 (카운터, 플래그, 금액 등)
- **DATETIME**: 날짜/시간 (타임스탬프)
- **JSON (TEXT)**: JSON 형식 저장 (설정, 배열 등)

### 4. 보안 및 무결성
- **FOREIGN KEY**: 참조 무결성 유지
- **ON DELETE CASCADE**: 사용자 삭제 시 관련 데이터 자동 삭제
- **UNIQUE**: 중복 방지 (이메일, 명함-지갑 조합)
- **DEFAULT**: 기본값 설정

---

**문서 작성일**: 2026-04-17  
**데이터베이스**: meti-production (Cloudflare D1)  
**총 테이블 수**: 12개 (시스템 테이블 3개 포함)
