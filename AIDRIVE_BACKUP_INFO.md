# AI Drive 백업 정보

**백업 날짜**: 2026-03-18 06:01  
**위치**: `/mnt/aidrive/`

---

## 📦 백업 파일 목록

### 1. 디자인 문서 백업
**파일명**: `meti-design-docs-20260318.tar.gz`  
**크기**: 40KB  
**포함 내용**:
```
✅ docs/design/
   ├── CARD_THEMES_V5.md
   ├── DESIGN_INTEGRATION_GUIDE.md ⭐
   ├── DESIGN_OUTSOURCING_BRIEF.md ⭐
   ├── DESIGN_REVIEW_CHECKLIST.md ⭐
   ├── METI_DESIGN_GUIDE_5.md
   └── METI_DESIGN_GUIDE_ALL.md

✅ scripts/
   ├── integrate-design-assets.sh ⭐
   └── tokens-to-css.js ⭐

✅ 루트 문서
   ├── DESIGN_OUTSOURCING_GUIDE.md ⭐
   ├── MODULARIZATION_REPORT.md ⭐
   └── README.md
```

**용도**: 디자인 외주 시 디자이너에게 전달할 문서 및 개발자 가이드

### 2. 전체 프로젝트 백업
**파일명**: `meti-project-full-20260318-0601.tar.gz`  
**크기**: 165KB  
**포함 내용**: 
- 전체 소스 코드
- 문서 (docs/)
- 스크립트 (scripts/)
- 설정 파일 (package.json, wrangler.jsonc 등)

**제외 항목** (용량 최적화):
- node_modules (의존성 패키지)
- .git (Git 저장소)
- dist (빌드 결과물)
- .wrangler (로컬 DB)

---

## 📊 AI Drive 현황

**총 사용 용량**: 212KB  
**파일 수**: 2개

---

## 🔄 복구 방법

### 디자인 문서만 복구
```bash
# AI Drive → 로컬
cp /mnt/aidrive/meti-design-docs-20260318.tar.gz ~/

# 압축 해제
cd ~/
tar -xzf meti-design-docs-20260318.tar.gz

# 결과
# docs/design/ → 디자인 문서
# scripts/ → 자동화 스크립트
# *.md → 루트 문서
```

### 전체 프로젝트 복구
```bash
# AI Drive → 로컬
cp /mnt/aidrive/meti-project-full-20260318-0601.tar.gz ~/

# 압축 해제
cd ~/
tar -xzf meti-project-full-20260318-0601.tar.gz

# 결과
# meti/ → 전체 프로젝트

# 의존성 설치 필요
cd meti/apps/web
npm install

# 데이터베이스 마이그레이션
npm run db:migrate:local

# 빌드 및 실행
npm run build
pm2 start ecosystem.config.cjs
```

---

## ⚠️ 주의사항

### AI Drive 특성
- **매우 느린 I/O**: 원격 스토리지로 읽기/쓰기 속도가 느림
- **단일 파일 권장**: 많은 작은 파일보다 압축된 단일 파일 사용
- **용량 제한**: 무제한이 아니므로 정기적으로 정리 필요

### 백업 권장사항
1. **정기 백업**: 주요 변경사항 발생 시마다
2. **버전 관리**: 날짜 포함 파일명 (YYYYMMDD-HHMM)
3. **압축 필수**: tar.gz 형식으로 압축하여 용량 절감
4. **불필요한 파일 제외**: node_modules, dist, .git 등

---

## 📝 백업 이력

| 날짜 | 파일명 | 크기 | 내용 |
|------|--------|------|------|
| 2026-03-18 06:01 | meti-design-docs-20260318.tar.gz | 40KB | 디자인 문서 + 스크립트 |
| 2026-03-18 06:01 | meti-project-full-20260318-0601.tar.gz | 165KB | 전체 프로젝트 |

---

## 🔗 추가 백업 위치

### Git 저장소
- **GitHub**: https://github.com/smee96/meti (권장)
- **브랜치**: agent/bootstrap-web-mobile
- **최신 커밋**: 5ffb739 (2026-03-18)

### 로컬 백업
- `/home/user/meti/` (현재 작업 디렉토리)
- Git 히스토리 (`.git/`)

---

## 💾 다음 백업 시점

**권장**:
- 주요 기능 완성 시
- 디자인 에셋 통합 후
- 배포 전
- 매주 금요일 (정기 백업)

**명령어**:
```bash
# 디자인 문서만
cd /home/user/meti
tar -czf meti-design-docs-$(date +%Y%m%d).tar.gz \
  docs/design/*.md scripts/*.sh scripts/*.js \
  DESIGN_OUTSOURCING_GUIDE.md MODULARIZATION_REPORT.md README.md
sudo cp meti-design-docs-*.tar.gz /mnt/aidrive/

# 전체 프로젝트
cd /home/user
tar -czf meti-project-full-$(date +%Y%m%d-%H%M).tar.gz \
  --exclude='meti/node_modules' \
  --exclude='meti/.git' \
  --exclude='meti/apps/web/node_modules' \
  --exclude='meti/apps/web/dist' \
  --exclude='meti/apps/web/.wrangler' \
  meti/
sudo cp meti-project-full-*.tar.gz /mnt/aidrive/
```

---

**작성자**: AI Development Agent  
**최종 수정**: 2026-03-18 06:01  
**버전**: v1.0
