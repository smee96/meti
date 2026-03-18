#!/bin/bash
# METI Design Assets Integration Script
# 디자인 에셋을 자동으로 프로젝트에 통합하는 스크립트

set -e  # 에러 발생 시 중단

# 색상 출력
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 프로젝트 루트 디렉토리
PROJECT_ROOT="/home/user/meti"
WEB_ROOT="$PROJECT_ROOT/apps/web"
ASSETS_ZIP="$1"  # 첫 번째 인자: ZIP 파일 경로

echo -e "${GREEN}🎨 METI Design Assets Integration${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# 1. 인자 확인
if [ -z "$ASSETS_ZIP" ]; then
  echo -e "${RED}❌ Error: ZIP 파일 경로를 지정해주세요${NC}"
  echo "사용법: ./integrate-design-assets.sh <path-to-meti-design-assets.zip>"
  exit 1
fi

if [ ! -f "$ASSETS_ZIP" ]; then
  echo -e "${RED}❌ Error: ZIP 파일을 찾을 수 없습니다: $ASSETS_ZIP${NC}"
  exit 1
fi

echo -e "${GREEN}✓ ZIP 파일 확인됨: $ASSETS_ZIP${NC}"

# 2. 임시 디렉토리 생성
TEMP_DIR=$(mktemp -d)
echo -e "${GREEN}✓ 임시 디렉토리 생성: $TEMP_DIR${NC}"

# 3. ZIP 압축 해제
echo -e "${YELLOW}📦 ZIP 파일 압축 해제 중...${NC}"
unzip -q "$ASSETS_ZIP" -d "$TEMP_DIR"
echo -e "${GREEN}✓ 압축 해제 완료${NC}"

# 4. 디렉토리 구조 확인
echo -e "${YELLOW}🔍 디렉토리 구조 확인 중...${NC}"

REQUIRED_DIRS=("icons" "images" "logos")
for dir in "${REQUIRED_DIRS[@]}"; do
  if [ ! -d "$TEMP_DIR/$dir" ]; then
    echo -e "${YELLOW}⚠️  Warning: $dir 디렉토리가 없습니다${NC}"
  else
    echo -e "${GREEN}✓ $dir 디렉토리 확인됨${NC}"
  fi
done

# 5. 프로젝트 디렉토리 생성
echo -e "${YELLOW}📁 프로젝트 디렉토리 생성 중...${NC}"

cd "$WEB_ROOT"
mkdir -p public/assets/icons
mkdir -p public/assets/images
mkdir -p public/assets/logos
mkdir -p public/fonts
mkdir -p src/styles/design-system
mkdir -p src/styles/components

echo -e "${GREEN}✓ 디렉토리 생성 완료${NC}"

# 6. 아이콘 복사
if [ -d "$TEMP_DIR/icons" ]; then
  echo -e "${YELLOW}🎯 아이콘 복사 중...${NC}"
  
  # SVG 아이콘만 복사
  if [ -d "$TEMP_DIR/icons/svg" ]; then
    cp -r "$TEMP_DIR/icons/svg/"*.svg "$WEB_ROOT/public/assets/icons/" 2>/dev/null || true
    ICON_COUNT=$(ls "$WEB_ROOT/public/assets/icons/"*.svg 2>/dev/null | wc -l)
    echo -e "${GREEN}✓ 아이콘 $ICON_COUNT개 복사 완료${NC}"
  else
    echo -e "${YELLOW}⚠️  icons/svg 디렉토리가 없습니다${NC}"
  fi
fi

# 7. 이미지 복사 및 최적화
if [ -d "$TEMP_DIR/images" ]; then
  echo -e "${YELLOW}🖼️  이미지 복사 중...${NC}"
  
  cp -r "$TEMP_DIR/images/"* "$WEB_ROOT/public/assets/images/" 2>/dev/null || true
  IMAGE_COUNT=$(ls "$WEB_ROOT/public/assets/images/" 2>/dev/null | wc -l)
  echo -e "${GREEN}✓ 이미지 $IMAGE_COUNT개 복사 완료${NC}"
  
  # WebP 변환 (cwebp 설치되어 있는 경우)
  if command -v cwebp &> /dev/null; then
    echo -e "${YELLOW}🔄 WebP 변환 중...${NC}"
    for img in "$WEB_ROOT/public/assets/images/"*.{png,jpg,jpeg} 2>/dev/null; do
      if [ -f "$img" ]; then
        cwebp -q 85 "$img" -o "${img%.*}.webp" 2>/dev/null && echo "  ✓ $(basename ${img%.*}).webp" || true
      fi
    done
    echo -e "${GREEN}✓ WebP 변환 완료${NC}"
  else
    echo -e "${YELLOW}⚠️  cwebp가 설치되지 않아 WebP 변환을 건너뜁니다${NC}"
  fi
fi

# 8. 로고 복사
if [ -d "$TEMP_DIR/logos" ]; then
  echo -e "${YELLOW}🏷️  로고 복사 중...${NC}"
  
  cp -r "$TEMP_DIR/logos/"* "$WEB_ROOT/public/assets/logos/" 2>/dev/null || true
  LOGO_COUNT=$(ls "$WEB_ROOT/public/assets/logos/" 2>/dev/null | wc -l)
  echo -e "${GREEN}✓ 로고 $LOGO_COUNT개 복사 완료${NC}"
fi

# 9. 폰트 복사 (있는 경우)
if [ -d "$TEMP_DIR/fonts" ]; then
  echo -e "${YELLOW}🔤 폰트 복사 중...${NC}"
  
  cp -r "$TEMP_DIR/fonts/"*.{woff2,woff,ttf} "$WEB_ROOT/public/fonts/" 2>/dev/null || true
  FONT_COUNT=$(ls "$WEB_ROOT/public/fonts/" 2>/dev/null | wc -l)
  echo -e "${GREEN}✓ 폰트 $FONT_COUNT개 복사 완료${NC}"
fi

# 10. 디자인 토큰 생성 (tokens.json 파일이 있는 경우)
if [ -f "$TEMP_DIR/tokens.json" ]; then
  echo -e "${YELLOW}🎨 디자인 토큰 CSS 생성 중...${NC}"
  
  # Node.js 스크립트로 변환 (tokens-to-css.js 필요)
  if [ -f "$PROJECT_ROOT/scripts/tokens-to-css.js" ]; then
    node "$PROJECT_ROOT/scripts/tokens-to-css.js" "$TEMP_DIR/tokens.json" "$WEB_ROOT/src/styles/design-system/tokens.css"
    echo -e "${GREEN}✓ 디자인 토큰 CSS 생성 완료${NC}"
  else
    echo -e "${YELLOW}⚠️  tokens-to-css.js 스크립트가 없습니다${NC}"
    echo -e "${YELLOW}   tokens.json을 수동으로 CSS Variables로 변환해주세요${NC}"
  fi
fi

# 11. 변경 사항 요약
echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✅ 디자인 에셋 통합 완료!${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo "📊 통합 요약:"
echo "  • 아이콘: $ICON_COUNT개"
echo "  • 이미지: $IMAGE_COUNT개"
echo "  • 로고: $LOGO_COUNT개"
echo "  • 폰트: $FONT_COUNT개"
echo ""

# 12. 다음 단계 안내
echo -e "${YELLOW}📝 다음 단계:${NC}"
echo ""
echo "1. CSS Variables 확인:"
echo "   src/styles/design-system/ 디렉토리에 CSS 파일 생성 필요"
echo ""
echo "2. 컴포넌트 스타일 업데이트:"
echo "   src/styles/components/ 디렉토리에 컴포넌트별 CSS 작성"
echo ""
echo "3. Import 순서 확인:"
echo "   src/index.tsx에서 CSS 파일 import 순서 확인"
echo ""
echo "4. 빌드 및 테스트:"
echo "   cd $WEB_ROOT"
echo "   npm run build"
echo "   npm run test"
echo ""
echo "5. Git 커밋:"
echo "   git add public/assets src/styles"
echo "   git commit -m \"feat: Integrate design assets from [디자이너명]\""
echo ""

# 13. 임시 디렉토리 정리
rm -rf "$TEMP_DIR"
echo -e "${GREEN}✓ 임시 디렉토리 정리 완료${NC}"

echo ""
echo -e "${GREEN}🎉 모든 작업이 완료되었습니다!${NC}"
echo -e "${YELLOW}📖 자세한 가이드는 docs/design/DESIGN_INTEGRATION_GUIDE.md를 참고하세요${NC}"
