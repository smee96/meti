#!/bin/bash
# 디자이너에게 전달할 패키지 생성 스크립트

echo "🎨 디자이너 전달 패키지 생성 중..."

# 날짜
DATE=$(date +%Y%m%d)

# 패키지 디렉토리 생성
PACKAGE_DIR="/home/user/meti-designer-package-${DATE}"
mkdir -p "$PACKAGE_DIR"

echo "📁 디렉토리 생성: $PACKAGE_DIR"

# 1. 필수 문서 복사
echo "📄 문서 복사 중..."

cp /home/user/meti/docs/design/DESIGN_OUTSOURCING_BRIEF.md "$PACKAGE_DIR/00_필독_디자인요구사항.md"
cp /home/user/meti/docs/design/METI_DESIGN_GUIDE_ALL.md "$PACKAGE_DIR/01_현재_디자인시스템.md"
cp /home/user/meti/docs/01_PRD.md "$PACKAGE_DIR/02_프로젝트_요구사항.md"
cp /home/user/meti/docs/02_SCREENS_AND_FLOWS.md "$PACKAGE_DIR/03_화면_플로우.md"

# 2. 체크리스트 복사 (자가 검수용)
cp /home/user/meti/docs/design/DESIGN_REVIEW_CHECKLIST.md "$PACKAGE_DIR/99_제출전_체크리스트.md"

# 3. README 생성
cat > "$PACKAGE_DIR/README.md" << 'EOF'
# METI 디자인 외주 패키지

**프로젝트**: METI 디지털 명함 서비스  
**납품 기한**: [날짜 입력]  
**담당자**: [이름 입력]

---

## 📋 문서 읽는 순서

### 1단계: 필독 (⭐⭐⭐)
**`00_필독_디자인요구사항.md`**
- 디자인 범위, 화면별 스펙, 제출 형식
- **꼭 처음부터 끝까지 읽어주세요!**

### 2단계: 참고 (⭐⭐)
**`01_현재_디자인시스템.md`**
- 컬러 팔레트, 타이포그래피, 컴포넌트
- 디자인 시 계속 참고

**`02_프로젝트_요구사항.md`**
- 서비스 목표, 핵심 기능, 타겟 유저
- 디자인 방향 이해에 필요

**`03_화면_플로우.md`**
- 사용자 시나리오, 화면 흐름
- UX 디자인 시 참고

### 3단계: 제출 전 (⭐)
**`99_제출전_체크리스트.md`**
- 제출 전 자가 검수용
- 200점 만점 체크리스트

---

## 🔗 현재 웹사이트

**테스트 URL**: https://3000-i48p46uqxkn3ketf65idi-0e616f0a.sandbox.novita.ai

- 회원가입/로그인 가능
- 명함 생성/수정 테스트 가능
- 모바일 반응형 확인 가능

**테스트 계정** (선택):
- 이메일: test@meti.com
- 비밀번호: test1234

---

## 📦 제출 형식

### 1. Figma 파일
- **공유 링크** (View & Comment 권한)
- 페이지 구성:
  - Design System
  - Mobile Screens (390px)
  - Desktop Screens (1440px)
  - Components Library

### 2. 에셋 ZIP 파일
```
meti-design-assets.zip
├── icons/
│   └── svg/ (SVG 아이콘)
├── images/
│   ├── hero@2x.png
│   └── ...
├── logos/
│   ├── logo-full.svg
│   └── logo-icon-64.svg
└── fonts/ (선택)
```

### 3. 문서
- 디자인 가이드 (PDF 또는 Markdown)
- 변경 사항 로그
- 컴포넌트 스펙 시트

---

## 📅 일정

| 단계 | 내용 | 기한 |
|------|------|------|
| Week 1 | 1차 시안 (주요 화면 3개) | [날짜] |
| Week 2 | 2차 시안 (전체 화면) | [날짜] |
| Week 3 | 최종 제출 | [날짜] |

---

## 💰 예산

**총 금액**: [금액]  
**지급 조건**: 
- 50% 착수금 (계약 시)
- 50% 잔금 (최종 납품 및 검수 완료 시)

---

## 📞 연락처

**담당자**: [이름]  
**이메일**: [이메일]  
**Slack/Discord**: [링크]

**질문 응답 시간**: 영업일 기준 24시간 이내

---

## ⚠️ 중요 사항

### 브랜드 가이드
- ✅ "METI" 로고 변경 금지
- ✅ Teal + Mint 색상 조합 유지
- ✅ Warm Professional 톤앤매너

### 기술 제약
- ✅ Mobile-first (모바일 우선)
- ✅ 8px Grid System
- ✅ 접근성 (WCAG AA 기준)

### 납품 기준
- ✅ Figma Auto Layout 적용
- ✅ Component/Variant/State 명명 규칙
- ✅ 이미지 압축 (< 2MB per file)
- ✅ SVG 최적화

---

## ✅ 체크리스트

제출 전 확인:
- [ ] `00_필독_디자인요구사항.md` 정독
- [ ] Figma 파일 공유 링크 확인
- [ ] 에셋 ZIP 파일 압축
- [ ] 디자인 가이드 문서 작성
- [ ] `99_제출전_체크리스트.md` 자가 검수

---

**생성일**: 2026-03-18  
**버전**: v1.0
EOF

# 4. 압축
echo "📦 압축 중..."
cd /home/user
tar -czf "meti-designer-package-${DATE}.tar.gz" "meti-designer-package-${DATE}/"

# 5. 결과
echo ""
echo "✅ 디자이너 전달 패키지 생성 완료!"
echo ""
echo "📦 패키지 위치:"
echo "   디렉토리: $PACKAGE_DIR"
echo "   압축 파일: /home/user/meti-designer-package-${DATE}.tar.gz"
echo ""
echo "📋 포함된 파일:"
ls -lh "$PACKAGE_DIR"
echo ""
echo "📊 압축 파일 크기:"
ls -lh "/home/user/meti-designer-package-${DATE}.tar.gz"
echo ""
echo "📧 전달 방법:"
echo "   1. 이메일: meti-designer-package-${DATE}.tar.gz 첨부"
echo "   2. 클라우드: Google Drive, Dropbox 등 업로드 후 링크 공유"
echo "   3. 압축 해제: tar -xzf meti-designer-package-${DATE}.tar.gz"
