# 명함 스캔 기능 설계 문서

## 개요
카메라로 명함을 촬영하여 자동으로 연락처 정보를 추출하고 저장하는 기능

## 기술 스택

### 1. 클라이언트 사이드 (권장)
**장점**: 빠르고 무료, 프라이버시 보호
- **Tesseract.js** - 브라우저 기반 OCR
- **Camera API** - 모바일 카메라 접근
- **Canvas API** - 이미지 전처리 (회전, 크롭, 대비)

### 2. 서버 사이드 (대안)
**장점**: 정확도 높음
- **Google Vision API** - 유료, 정확도 높음
- **Cloudflare AI** - 새로운 옵션, Workers AI

## UI/UX 플로우

```
/my/wallet (명함 지갑)
  ↓
[+ 명함 스캔] 버튼
  ↓
카메라 화면
  ├─ 가이드라인 오버레이
  ├─ 촬영 버튼
  └─ 취소 버튼
  ↓
촬영 완료
  ├─ 미리보기
  ├─ 재촬영 버튼
  └─ 다음 버튼
  ↓
정보 추출 중 (로딩)
  ↓
정보 확인 및 수정
  ├─ 이름 (자동 추출)
  ├─ 전화번호 (자동 추출)
  ├─ 이메일 (자동 추출)
  ├─ 회사명 (선택)
  ├─ 직책 (선택)
  └─ 저장 버튼
  ↓
지갑에 추가 완료
```

## 구현 단계

### Phase 1: 기본 UI (1-2일)
- [ ] 명함 지갑 페이지 (`/my/wallet`)
- [ ] 명함 스캔 버튼
- [ ] 카메라 접근 권한 요청
- [ ] 촬영 UI (가이드라인, 버튼)

### Phase 2: OCR 통합 (2-3일)
- [ ] Tesseract.js 설치 및 설정
- [ ] 이미지 전처리 (그레이스케일, 대비 증가)
- [ ] 텍스트 추출
- [ ] 한국어 인식 개선 (언어팩)

### Phase 3: 데이터 파싱 (2-3일)
- [ ] 정규식으로 전화번호 추출 (010-xxxx-xxxx, 02-xxx-xxxx)
- [ ] 이메일 추출 (xxx@xxx.com)
- [ ] 이름 추출 (휴리스틱)
- [ ] 회사명/직책 추출 (선택적)

### Phase 4: 저장 및 관리 (1-2일)
- [ ] 추출된 정보 확인/수정 폼
- [ ] DB 저장 (card_wallet 테이블)
- [ ] 지갑 목록 표시

## 데이터베이스 스키마 (기존 활용)

```sql
-- 기존 card_wallet 테이블 활용
CREATE TABLE IF NOT EXISTS card_wallet (
  id TEXT PRIMARY KEY,
  owner_id TEXT NOT NULL, -- 저장한 사용자
  card_id TEXT NOT NULL,  -- 스캔한 명함 (자동 생성된 card)
  saved_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  memo TEXT,              -- 메모 (예: "2024-01-15 네트워킹 행사")
  tags TEXT DEFAULT '[]', -- 태그
  group_id TEXT,
  is_favorite INTEGER DEFAULT 0,
  FOREIGN KEY (owner_id) REFERENCES users(id)
);
```

**플로우**:
1. 명함 스캔 → 정보 추출
2. 임시 card 생성 (status='scanned', is_public=0)
3. card_wallet에 저장 (owner_id = 현재 사용자)

## 코드 예시

### 1. 카메라 접근 및 촬영
```html
<input type="file" accept="image/*" capture="environment" id="cameraInput">

<script>
async function startScan() {
  const input = document.getElementById('cameraInput');
  input.click();
  
  input.onchange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Show loading
    showLoading('명함을 분석하는 중...');
    
    // Process image
    const text = await extractText(file);
    const info = parseCardInfo(text);
    
    // Show form for confirmation
    showConfirmationForm(info);
  };
}
</script>
```

### 2. OCR with Tesseract.js
```javascript
import Tesseract from 'tesseract.js';

async function extractText(imageFile) {
  const { data: { text } } = await Tesseract.recognize(
    imageFile,
    'kor+eng', // 한국어 + 영어
    {
      logger: m => console.log(m) // Progress
    }
  );
  return text;
}
```

### 3. 정보 파싱
```javascript
function parseCardInfo(text) {
  const info = {
    name: null,
    phone: null,
    email: null,
    company: null,
    title: null
  };
  
  // Phone number (한국 전화번호 패턴)
  const phoneRegex = /(01[0-9][-\s]?[0-9]{4}[-\s]?[0-9]{4}|0[2-6]{1}[0-9][-\s]?[0-9]{3,4}[-\s]?[0-9]{4})/;
  const phoneMatch = text.match(phoneRegex);
  if (phoneMatch) {
    info.phone = phoneMatch[0].replace(/\s/g, '');
  }
  
  // Email
  const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/;
  const emailMatch = text.match(emailRegex);
  if (emailMatch) {
    info.email = emailMatch[0];
  }
  
  // Name (첫 번째 한글 2-4자)
  const nameRegex = /[가-힣]{2,4}/;
  const nameMatch = text.match(nameRegex);
  if (nameMatch) {
    info.name = nameMatch[0];
  }
  
  return info;
}
```

### 4. API 엔드포인트
```typescript
// POST /api/wallet/scan
cards.post('/wallet/scan', async (c) => {
  const userId = getUserIdFromToken(c.req.header('Authorization'));
  if (!userId) {
    return c.json({ success: false, error: 'Unauthorized' }, 401);
  }

  const { name, phone, email, company, title, memo } = await c.req.json();
  
  // Create temporary card
  const cardData = {
    name: name,
    phone: phone,
    email: email,
    company: company,
    title: title,
    status: 'scanned',
    isPublic: false
  };
  
  const db = new Database(c.env.DB);
  const card = await db.createCard(userId, cardData);
  
  // Add to wallet
  const walletId = generateId();
  await c.env.DB
    .prepare(`
      INSERT INTO card_wallet (id, owner_id, card_id, memo, saved_at)
      VALUES (?, ?, ?, ?, ?)
    `)
    .bind(walletId, userId, card.id, memo || null, new Date().toISOString())
    .run();
  
  return c.json({
    success: true,
    data: { card, walletId }
  });
});
```

## 예상 구현 시간
- **Phase 1 (UI)**: 1-2일
- **Phase 2 (OCR)**: 2-3일
- **Phase 3 (파싱)**: 2-3일
- **Phase 4 (저장)**: 1-2일
- **테스트 & 개선**: 2-3일

**총 예상**: 8-13일

## 우선순위
1. ✅ **명함 지갑 기본 페이지** (`/my/wallet`) - 먼저 구현
2. ⏳ **수동 입력 기능** - 스캔 없이 직접 입력
3. ⏳ **카메라 스캔 기능** - OCR 통합
4. ⏳ **정확도 개선** - 이미지 전처리, 파싱 로직

## 제한사항
- **정확도**: OCR이 100% 정확하지 않음 → 반드시 확인/수정 단계 필요
- **한국어**: Tesseract.js 한국어 인식률 70-80% (영어는 90%+)
- **명함 디자인**: 복잡한 디자인, 손글씨는 인식 어려움
- **조명**: 어두운 환경에서 촬영 시 인식률 하락

## 대안
- **수동 입력**: 스캔 실패 시 직접 입력
- **QR 코드**: 상대방이 METI 사용자라면 QR로 간편 교환
- **연락처 가져오기**: 기기 연락처에서 불러오기 (웹 API 제한적)

## 다음 단계
1. 명함 지갑 페이지 기본 UI 구현
2. 수동 입력 기능 추가
3. Tesseract.js 통합 테스트
4. 실제 명함으로 정확도 테스트
