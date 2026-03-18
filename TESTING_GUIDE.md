# METI 명함 에디터 테스트 가이드

## 테스트 URL
https://3000-i48p46uqxkn3ketf65idi-0e616f0a.sandbox.novita.ai

## 수정 사항 요약

### 1. 데이터 로딩 문제 해결 ✅
- **문제**: 명함 수정 시 기존 정보가 표시되지 않음
- **원인**: API 응답 구조 불일치 (`response.data.data.card` vs `response.data.data`)
- **해결**: 
  - DB 헬퍼에서 v0.2 필드 반환 추가 (headline, phone, email, links, theme, avatar_url)
  - API 응답 구조 수정
  - 에디터에서 올바른 경로로 데이터 접근

### 2. 이미지 자동 리사이즈 ✅
- **기능**: 업로드된 이미지를 자동으로 400x400px 정사각형으로 변환
- **방식**: Canvas API 사용 (클라이언트 사이드)
- **특징**:
  - 가로/세로 긴 쪽 자동 크롭
  - JPEG 품질 90% 압축
  - Data URL로 저장
  - 즉시 미리보기 반영

### 3. TypeScript 구문 에러 수정 ✅
- **문제**: `as string` 타입 캐스팅이 브라우저에서 JavaScript 에러 발생
- **해결**: 템플릿 리터럴에서 타입 캐스팅 제거

## 테스트 시나리오

### 시나리오 1: 새 명함 만들기
```
1. https://3000-i48p46uqxkn3ketf65idi-0e616f0a.sandbox.novita.ai 접속
2. 회원가입 또는 로그인
   - 이메일: test@example.com
   - 비밀번호: password123
3. "새 명함 만들기" 클릭
4. 폼 작성:
   - 이름: 홍길동 (필수)
   - 전화번호: 010-1234-5678
   - 이메일: hong@test.com
   - 직책: 대표이사
   - 회사명: ABC 주식회사
   - 한 줄 소개: 열정적인 개발자
5. 프로필 사진 업로드
   - 이미지 파일 선택 (JPG/PNG, 2MB 이하)
   - 자동으로 400x400px로 리사이즈됨
   - 미리보기에 즉시 반영됨 ✅
6. 테마 선택
   - 10가지 테마 중 선택 (예: Deep Navy)
   - 미리보기 배경색 변경 확인 ✅
7. 소셜 링크 추가 (선택, 최대 5개)
   - "링크 추가" 클릭
   - 레이블: Instagram
   - URL: https://instagram.com/test
8. "명함 만들기" 버튼 클릭
9. ✅ 성공 메시지 확인
10. ✅ /my/cards로 리다이렉트
```

**예상 결과**:
- ✅ 모든 입력 정보가 정상 저장
- ✅ 프로필 사진이 400x400px로 리사이즈되어 저장
- ✅ 선택한 테마 적용
- ✅ 링크 목록 저장

### 시나리오 2: 기존 명함 수정
```
1. /my/cards 페이지 접속
2. 기존 명함 카드에서 "수정" 버튼 클릭
3. ✅ 기존 정보가 모두 로드되어 있는지 확인:
   - 이름 ✅
   - 전화번호 ✅
   - 이메일 ✅
   - 직책 ✅
   - 회사명 ✅
   - 한 줄 소개 ✅
   - 프로필 사진 (있는 경우) ✅
   - 테마 선택 상태 ✅
   - 소셜 링크 목록 ✅
4. 정보 수정:
   - 이름: 홍길동 → 홍길동 (수정됨)
   - 전화번호: 010-9999-8888
   - 새 프로필 사진 업로드
5. 테마 변경: Deep Navy → Midnight Teal
6. 링크 추가/수정
7. "저장" 버튼 클릭
8. ✅ 성공 메시지 확인
9. ✅ /my/cards로 리다이렉트
10. ✅ 수정된 정보 확인
```

**예상 결과**:
- ✅ 기존 정보가 폼에 정확히 로드됨
- ✅ 수정 사항이 정상 저장됨
- ✅ 프로필 사진이 새 이미지로 교체됨 (리사이즈 적용)

### 시나리오 3: 이미지 리사이즈 테스트
```
1. 명함 에디터 접속 (/my/card/new)
2. 다양한 크기/비율의 이미지 업로드:
   - 가로형 이미지 (1920x1080)
   - 세로형 이미지 (1080x1920)
   - 정사각형 이미지 (2000x2000)
   - 작은 이미지 (200x200)
3. 각 경우마다:
   - ✅ 미리보기에 정사각형 400x400px 이미지 표시
   - ✅ 이미지가 잘리지 않고 중앙 정렬됨
   - ✅ 비율이 유지되며 크롭됨
```

## API 테스트 (개발자용)

### 명함 생성
```bash
curl -X POST http://localhost:3000/api/cards \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "name": "홍길동",
    "title": "대표이사",
    "company": "테스트 회사",
    "phone": "010-1234-5678",
    "email": "hong@test.com",
    "headline": "열정적인 개발자",
    "theme": "deep-navy",
    "status": "public",
    "links": [{"label": "Instagram", "url": "https://instagram.com/test"}]
  }'
```

### 명함 조회
```bash
curl http://localhost:3000/api/cards/CARD_ID \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 명함 수정
```bash
curl -X PUT http://localhost:3000/api/cards/CARD_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "name": "홍길동 (수정됨)",
    "phone": "010-9999-8888",
    "theme": "midnight-teal"
  }'
```

## 알려진 문제 및 제한사항

1. **이미지 저장**: 현재 Data URL로 저장되므로 대용량 이미지 시 DB 크기 증가 가능
   - 향후 R2 스토리지 연동 권장
2. **테마 미리보기**: design.theme 필드와 theme 필드가 동시 존재하여 혼란 가능
   - 향후 스키마 정리 필요
3. **favicon 404**: 아직 favicon 파일이 없음 (경고만 발생, 기능에 영향 없음)

## 수정된 파일 목록

1. `/src/lib/db.ts`
   - `getCardById()`: v0.2 필드 반환 추가
   - `createCard()`: v0.2 필드 저장 지원

2. `/src/routes/cards.ts`
   - PUT 엔드포인트: 새 필드 업데이트 지원

3. `/src/templates/card/editor-template.ts`
   - 이미지 자동 리사이즈 (Canvas API)
   - API 응답 구조 수정
   - TypeScript 구문 제거

## Git 커밋 이력

```
0bdacdd - fix: Remove TypeScript 'as string' cast from template literal
9582faf - fix: Fix card data loading in editor
0e644f4 - fix: Fix card editor data loading and add image auto-resize
```

## 다음 단계

1. 명함 지갑 기능 구현 (`/my/wallet`)
2. HappyTree 게임 UI (`/game`)
3. 공개 명함 페이지 디자인 개선 (`/c/:id`)
4. R2 스토리지 연동 (이미지 최적화)
