# [METI] Architecture & Repo Layout v0.2

## 1) 모노레포 구조(고정)
- `apps/web` : 웹(대시보드 + 퍼블릭 카드)
- `apps/mobile` : Expo 앱
- `packages/shared` : 공용 타입/유틸/검증
- `docs` : 요구사항/스펙

## 2) 런타임/호스팅(기본)
- Web/API: Cloudflare Pages + Functions(Workers)
- API Framework: Hono
- Build: Vite

## 3) 템플릿 참고(검증된 구성)
HappyTree 프로젝트에서 Vite/Hono/Wrangler 조합이 이미 동작하는 구성이므로, METI도 유사 구조로 부트스트랩할 수 있습니다.
- `package.json` (vite/wrangler/hono) [Source](https://raw.githubusercontent.com/smee96/happytree_2026/main/package.json)
- `vite.config.ts` (Cloudflare Pages용 Hono Vite 플러그인) [Source](https://raw.githubusercontent.com/smee96/happytree_2026/main/vite.config.ts)
- `wrangler.jsonc` (Pages output, nodejs_compat) [Source](https://raw.githubusercontent.com/smee96/happytree_2026/main/wrangler.jsonc)
- `src/index.tsx` (Hono 라우팅/CORS 패턴) [Source](https://raw.githubusercontent.com/smee96/happytree_2026/main/src/index.tsx)

## 4) 환경변수(확정)
- `DATA_BACKEND=d1` (Cloudflare D1 사용)
- `PUBLIC_BASE_URL=https://...`
- `AUTH_PROVIDER=email` (MVP-0: 이메일 기반, 추후 확장)

## 5) 로컬 실행(초안)
- Web/API 개발 서버: `npm run dev`
- 배포 빌드: `npm run build`
