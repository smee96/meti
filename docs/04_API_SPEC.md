# [METI] API Spec v0.2

Base: `/api`

## 공통
- 응답은 JSON
- 에러는 `{ error: { code, message } }` 형태 권장

## Health
### GET `/api/health`
- 200: `{ "ok": true }`

## Card
### POST `/api/cards`
- Auth: required
- Body:
  - displayName, headline, avatarUrl?, links[], contacts?, visibility, status
- 201: `{ "cardId": "..." }`

### GET `/api/cards/:id`
- Public: 가능(단, private은 접근 제한)
- 200: Card(visibility/status 반영)

### PUT `/api/cards/:id`
- Auth: required (owner only)
- 200: updated Card

## View tracking (minimal)
### POST `/api/cards/:id/view?src=...`
- Public: 가능
- 204: no content

## Public Page
### GET `/c/:id`
- HTML 렌더(모바일 최적화)
