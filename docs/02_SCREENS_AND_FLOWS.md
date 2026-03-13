# [METI] Screens & Flows v0.2

## 1) 화면 목록(초기)
- `/` Landing
- `/auth` Login
- `/app` Dashboard(최소)
- `/app/card` My Card Edit
- `/c/:id` Public Card

## 2) 플로우
### F1: 생성 플로우
Landing → Auth → My Card Edit → Save → Share(QR/Link)

### F2: 열람 플로우(상대)
`/c/:id` → 연락 버튼(전화/메일) → (선택) vCard 다운로드

### F3: 공개 범위
편집 화면 → phone/email 공개 토글 → 저장 → 퍼블릭 페이지 확인

## 3) 퍼블릭 카드 UI 요구사항
- 첫 화면에 이름/소개/핵심 링크/연락 버튼 노출
- 숨김 필드는 완전 미노출
- `?src=` 쿼리 파라미터 유지(집계용)
