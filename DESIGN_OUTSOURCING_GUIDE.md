# 디자인 외주 준비 완료 보고서

**작성일**: 2026-03-18  
**버전**: v1.0

---

## 📋 개요

디자인을 외부 디자이너에게 외주를 줄 수 있도록 완벽한 협업 체계를 구축했습니다.

---

## 📦 생성된 문서 및 스크립트

### 1. 디자이너에게 전달할 문서

#### `/docs/design/DESIGN_OUTSOURCING_BRIEF.md` (9.5KB)
**목적**: 디자이너가 작업할 때 필요한 모든 정보 제공

**포함 내용**:
- ✅ **프로젝트 개요**: 서비스 컨셉, 타겟 유저, 톤앤매너
- ✅ **현재 디자인 시스템**: 컬러, 타이포그래피, 간격, 테마
- ✅ **디자인 범위**: 8개 핵심 화면 + 컴포넌트 상세 스펙
- ✅ **작업물 제출 형식**: Figma + 에셋 ZIP 구조
- ✅ **에셋 Export 규격**: SVG, PNG, 폰트 등
- ✅ **CSS Variable 추출 가이드**: 자동화 대응
- ✅ **프로토타입 요구사항** (선택)
- ✅ **검수 기준**: 품질, 기술, 문서화
- ✅ **커뮤니케이션 방식**: 킥오프, 피드백, 최종 검수

**디자이너가 알아야 할 것**:
```
1. 10가지 명함 테마 (Deep Navy, Midnight Teal 등)
2. 명함 카드 크기 (340x200px, 20px radius)
3. Mobile-first 디자인 (390px, 768px, 1440px)
4. Figma Auto Layout 필수
5. Component/Variant/State 명명 규칙
6. 8px Grid System
```

### 2. 개발자가 사용할 문서

#### `/docs/design/DESIGN_INTEGRATION_GUIDE.md` (13KB)
**목적**: 받은 디자인 에셋을 프로젝트에 통합하는 단계별 가이드

**포함 내용**:
- ✅ **에셋 받기 전 체크리스트**: Figma, ZIP, 문서 확인
- ✅ **에셋 정리 및 배치**: 디렉토리 구조, 파일 배치
- ✅ **디자인 시스템 통합**: CSS Variables 추출, 컴포넌트 작성
- ✅ **기존 코드 마이그레이션**: Inline → CSS Classes
- ✅ **반응형 디자인 적용**: Breakpoints, Media Query
- ✅ **이미지 최적화**: WebP 변환, Picture Element
- ✅ **적용 후 체크리스트**: 빌드, 테스트, 성능, 접근성
- ✅ **트러블슈팅**: 폰트, 이미지, CSS Variables, 다크모드

**개발자가 할 일**:
```bash
1. ZIP 파일 압축 해제
2. ./scripts/integrate-design-assets.sh 실행
3. CSS Variables 확인 및 수정
4. 컴포넌트 스타일 작성
5. 빌드 및 테스트
6. Git 커밋
```

### 3. 자동화 스크립트

#### `/scripts/integrate-design-assets.sh` (5KB)
**목적**: 디자인 에셋을 자동으로 프로젝트에 통합

**기능**:
```bash
#!/bin/bash
# 사용법: ./integrate-design-assets.sh meti-design-assets.zip

✓ ZIP 파일 압축 해제
✓ 디렉토리 구조 확인
✓ 아이콘 SVG 복사 (public/assets/icons/)
✓ 이미지 복사 및 WebP 변환 (public/assets/images/)
✓ 로고 복사 (public/assets/logos/)
✓ 폰트 복사 (public/fonts/)
✓ 디자인 토큰 CSS 생성 (tokens.json → CSS)
✓ 변경 사항 요약 및 다음 단계 안내
```

**실행 예시**:
```bash
cd /home/user/meti
./scripts/integrate-design-assets.sh ~/Downloads/meti-design-assets.zip

# 출력:
🎨 METI Design Assets Integration
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ ZIP 파일 확인됨
✓ 압축 해제 완료
✓ 아이콘 24개 복사 완료
✓ 이미지 12개 복사 완료
✓ WebP 변환 완료
✓ 로고 3개 복사 완료
✅ 디자인 에셋 통합 완료!
```

#### `/scripts/tokens-to-css.js` (3.6KB)
**목적**: Figma Design Tokens (JSON) → CSS Variables 자동 변환

**기능**:
```javascript
// tokens.json (Figma 플러그인 Export)
{
  "colors": {
    "Primary Teal Base": "#1A4A5E",
    "Accent Mint Base": "#2EC4A0"
  },
  "typography": {
    "fontSizes": {
      "H1": "32px",
      "Body": "15px"
    }
  }
}

// 자동 생성 → tokens.css
:root {
  /* Colors */
  --color-primary-teal-base: #1A4A5E;
  --color-accent-mint-base: #2EC4A0;

  /* Typography */
  --font-size-h1: 32px;
  --font-size-body: 15px;
}
```

**사용법**:
```bash
node scripts/tokens-to-css.js \
  ~/Downloads/tokens.json \
  src/styles/design-system/tokens.css
```

### 4. 검수 체크리스트

#### `/docs/design/DESIGN_REVIEW_CHECKLIST.md` (9.6KB)
**목적**: 받은 디자인의 품질을 체계적으로 검수

**검수 항목 (총 10개 카테고리, 200점 만점)**:

| 번호 | 카테고리 | 배점 | 주요 체크 항목 |
|------|----------|------|---------------|
| 1 | 파일 제출 확인 | 30점 | Figma (10) + 에셋 ZIP (10) + 문서 (10) |
| 2 | 디자인 시스템 | 30점 | 컬러 (10) + 타이포 (10) + 간격 (10) |
| 3 | 화면별 검수 | 60점 | 랜딩/공개명함/편집/목록/인증 (각 10점) |
| 4 | 컴포넌트 | 30점 | 버튼/입력/카드 (각 10점) |
| 5 | 반응형 디자인 | 10점 | Mobile/Tablet/Desktop 대응 |
| 6 | 접근성 | 10점 | 색상 대비, 터치 영역, 키보드 |
| 7 | 성능 고려사항 | 10점 | 이미지 압축, 폰트 최적화, SVG |
| 8 | 브랜드 일관성 | 10점 | 로고, 색상, 톤앤매너 |
| 9 | 프로토타입 | 5점 | 인터랙션, Transition (선택) |
| 10 | 기술 검수 | 5점 | Figma 정리, Export, 문서 |

**등급 기준**:
- **A (180-200)**: 우수 - 즉시 적용 가능
- **B (160-179)**: 양호 - 소폭 수정 후 적용
- **C (140-159)**: 보통 - 일부 수정 필요
- **D (120-139)**: 미흡 - 재작업 요청
- **F (< 120)**: 불합격 - 전면 재작업

---

## 🎯 디자이너에게 전달할 패키지

### 전달 문서 목록

```
📦 METI 디자인 의뢰 패키지
├── 📄 DESIGN_OUTSOURCING_BRIEF.md (필독!)
├── 📄 METI_DESIGN_GUIDE_ALL.md (현재 디자인 시스템)
├── 📄 01_PRD.md (프로젝트 요구사항)
├── 📄 02_SCREENS_AND_FLOWS.md (화면 플로우)
├── 🔗 현재 웹사이트 URL
└── 📋 체크리스트 (제출 전 자가 검수용)
```

### 전달 방법

**이메일 템플릿**:
```
제목: [METI] 디지털 명함 서비스 디자인 의뢰

안녕하세요, [디자이너님]

METI 디지털 명함 서비스의 디자인 작업을 의뢰드립니다.

📦 첨부 파일:
1. DESIGN_OUTSOURCING_BRIEF.md - 디자인 요구사항 (필독)
2. METI_DESIGN_GUIDE_ALL.md - 현재 디자인 시스템
3. 프로젝트 관련 문서 (PRD, 화면 플로우)

🔗 현재 웹사이트:
https://3000-i48p46uqxkn3ketf65idi-0e616f0a.sandbox.novita.ai

📅 일정:
- 킥오프 미팅: [날짜/시간]
- 1차 시안 (주요 화면 3개): [날짜]
- 2차 시안 (전체 화면): [날짜]
- 최종 제출: [날짜]

💰 예산: [금액]

궁금하신 점이 있으시면 언제든지 연락 주세요.

감사합니다.
[담당자명]
```

---

## 🔄 작업 프로세스

### 1단계: 의뢰 (Day 1)
```
1. 디자이너 선정
2. 계약서 작성 (NDA, 저작권 등)
3. 디자인 패키지 전달
4. 킥오프 미팅 (1시간)
   - 프로젝트 설명
   - 질의응답
   - 일정 확인
```

### 2단계: 1차 시안 (Week 1)
```
1. 디자이너 작업 (주요 화면 3개)
   - 랜딩 페이지
   - 공개 명함 페이지
   - 명함 편집 페이지

2. 시안 제출 (Figma 링크)

3. 내부 검토 (2일)
   - DESIGN_REVIEW_CHECKLIST.md 사용
   - 피드백 정리

4. 피드백 미팅 (30분)
   - 수정 요청 사항 전달
   - 방향 조정
```

### 3단계: 2차 시안 (Week 2)
```
1. 디자이너 작업 (전체 화면)
   - 1차 피드백 반영
   - 나머지 화면 완성
   - 컴포넌트 라이브러리

2. 시안 제출 (Figma + 프로토타입)

3. 내부 검토 (3일)
   - 전체 화면 검수
   - 컴포넌트 검수
   - 반응형 확인

4. 피드백 미팅 (30분)
   - 최종 수정 요청
```

### 4단계: 최종 제출 (Week 3)
```
1. 디자이너 작업
   - 2차 피드백 반영
   - 에셋 Export
   - 문서 정리

2. 최종 제출
   - Figma 파일 (공유 링크)
   - meti-design-assets.zip
   - 디자인 가이드 PDF/Markdown
   - 변경 사항 로그

3. 최종 검수 (2일)
   - DESIGN_REVIEW_CHECKLIST.md 전체 항목
   - 에셋 확인
   - 문서 확인

4. 승인 또는 재작업 요청
```

### 5단계: 통합 (Week 4)
```
1. 개발팀 통합 작업
   cd /home/user/meti
   ./scripts/integrate-design-assets.sh ~/Downloads/meti-design-assets.zip

2. CSS Variables 작성
   - src/styles/design-system/ 디렉토리
   - colors.css, typography.css, spacing.css 등

3. 컴포넌트 스타일 작성
   - src/styles/components/ 디렉토리
   - button.css, input.css, card.css 등

4. 템플릿 파일 업데이트
   - templates/card/editor-styles.ts
   - Inline CSS → CSS Classes

5. 빌드 및 테스트
   npm run build
   npm run test

6. Git 커밋
   git add public/assets src/styles
   git commit -m "feat: Integrate design from [디자이너명]"

7. 디자이너 피드백
   - 적용 결과 공유
   - 수정 사항 요청 (필요 시)
```

---

## ✅ 준비 완료 체크리스트

### 문서
- ✅ **DESIGN_OUTSOURCING_BRIEF.md** - 디자이너 요구사항
- ✅ **DESIGN_INTEGRATION_GUIDE.md** - 개발자 적용 가이드
- ✅ **DESIGN_REVIEW_CHECKLIST.md** - 검수 체크리스트

### 스크립트
- ✅ **integrate-design-assets.sh** - 에셋 자동 통합
- ✅ **tokens-to-css.js** - 디자인 토큰 변환

### 현재 자료
- ✅ **METI_DESIGN_GUIDE_ALL.md** - 기존 디자인 시스템
- ✅ **PRD** - 프로젝트 요구사항
- ✅ **화면 플로우** - 사용자 시나리오
- ✅ **현재 웹사이트** - 테스트 URL

### 디렉토리 구조
- ✅ **/docs/design/** - 디자인 문서 모음
- ✅ **/scripts/** - 자동화 스크립트
- ✅ **/apps/web/public/assets/** - 에셋 배치 위치
- ✅ **/apps/web/src/styles/** - CSS 파일 위치

---

## 💡 주요 장점

### 1. 명확한 커뮤니케이션
- ✅ 디자이너가 알아야 할 모든 정보 제공
- ✅ 현재 디자인 시스템 명확히 문서화
- ✅ 화면별 요구사항 상세 명시
- ✅ 제출 형식 정확히 정의

### 2. 자동화된 워크플로우
- ✅ 에셋 통합 스크립트 (한 번의 명령으로 완료)
- ✅ CSS Variables 자동 생성
- ✅ WebP 변환 자동화
- ✅ 디렉토리 구조 자동 생성

### 3. 품질 보증
- ✅ 200점 만점 체크리스트
- ✅ 10개 카테고리 체계적 검수
- ✅ A~F 등급 기준 명확
- ✅ 피드백 프로세스 정립

### 4. 개발 효율성
- ✅ 단계별 적용 가이드
- ✅ 트러블슈팅 문서
- ✅ 반응형 적용 예시
- ✅ 성능 최적화 가이드

---

## 📞 다음 단계

### 즉시 실행 가능
1. ✅ 디자이너 컨택
2. ✅ 예산 협의
3. ✅ 계약서 작성
4. ✅ 디자인 패키지 전달
5. ✅ 킥오프 미팅 일정 잡기

### 추가 준비 사항 (선택)
- [ ] 경쟁사 벤치마크 자료 준비
- [ ] 사용자 페르소나 문서
- [ ] 브랜드 무드보드
- [ ] 레퍼런스 이미지 모음

---

## 🎉 결론

디자인 외주를 위한 완벽한 협업 체계가 구축되었습니다!

**생성된 문서**: 5개
**자동화 스크립트**: 2개
**검수 체크리스트**: 200점 만점
**예상 작업 기간**: 3-4주

디자이너에게 `DESIGN_OUTSOURCING_BRIEF.md`만 전달하면 작업을 시작할 수 있으며,
받은 에셋은 `integrate-design-assets.sh` 스크립트로 자동 통합 가능합니다.

---

**작성자**: AI Development Agent  
**최종 수정**: 2026-03-18  
**버전**: v1.0
