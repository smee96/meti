# [METI] Data Model v0.2

> 웹/앱 공용 타입은 `packages/shared`에 정의하고, API/DB 스키마와 동기화합니다.

## User (초안)
- id: string
- email?: string
- provider?: "email" | "google" | "apple"
- createdAt: string(ISO)
- updatedAt: string(ISO)

## Card
- id: string
- ownerUserId: string
- displayName: string
- headline: string
- avatarUrl?: string | null
- links: Array<{ label: string; url: string }>
- contacts:
  - phone?: string | null
  - email?: string | null
- visibility:
  - showPhone: boolean
  - showEmail: boolean
- status: "public" | "unlisted" | "private"
- createdAt: string(ISO)
- updatedAt: string(ISO)

## CardViewEvent (최소)
- id: string
- cardId: string
- ts: number (epoch ms)
- src?: string | null

### 개인정보 원칙
- IP/UA는 원문 저장 금지. 필요하면 집계/해시만 고려(문서 승인 필요).
