# METI API Documentation

> **Version**: 1.0.0  
> **Base URL**: `https://meti.pages.dev/api` (production)  
> **Local Dev**: `http://localhost:3000/api`

---

## 🔐 Authentication

All protected endpoints require an `Authorization` header:

```
Authorization: Bearer {token}
```

Current implementation uses mock tokens (format: `mock-token-{userId}`). Google OAuth will be integrated in Phase 2.

---

## 📋 API Endpoints

### Health Check

#### `GET /api/health`
Check API status

**Response**:
```json
{
  "success": true,
  "message": "METI API is running",
  "version": "1.0.0",
  "timestamp": "2026-03-09T07:55:27.570Z"
}
```

---

## 👤 Authentication

### Register

#### `POST /api/auth/register`
Create a new user account

**Request Body**:
```json
{
  "email": "user@example.com",
  "name": "John Doe"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "1773042946125-0rxljl8fi",
      "email": "user@example.com",
      "name": "John Doe",
      "settings": {
        "language": "ko",
        "theme": "light",
        "notifications": {
          "card_viewed": true,
          "card_saved": true,
          "game_reward": true
        }
      },
      "stats": {
        "cardsSent": 0,
        "cardsReceived": 0,
        "totalViews": 0
      }
    },
    "token": "mock-token-1773042946125-0rxljl8fi"
  }
}
```

**Note**: New users automatically receive:
- 1 starter pot in Farm 1
- 300,000 hearts (initial gift)

---

### Login

#### `POST /api/auth/login`
Login with existing account

**Request Body**:
```json
{
  "email": "user@example.com"
}
```

**Response**: Same as register

---

### Get Current User

#### `GET /api/auth/me`
Get current user information

**Headers**: `Authorization: Bearer {token}`

**Response**:
```json
{
  "success": true,
  "data": {
    "user": { /* user object */ }
  }
}
```

---

## 💳 Cards (Digital Business Cards)

### Get All Cards

#### `GET /api/cards`
Get all cards for current user

**Headers**: `Authorization: Bearer {token}`

**Response**:
```json
{
  "success": true,
  "data": {
    "cards": [
      {
        "id": "card-id",
        "userId": "user-id",
        "name": "홍길동",
        "title": "CEO",
        "company": "METI Inc.",
        "bio": "디지털 명함으로 세상을 바꾸다",
        "contacts": [
          {
            "type": "email",
            "value": "hong@meti.com",
            "isPrimary": true
          }
        ],
        "socialLinks": [],
        "design": {
          "theme": "clean-white"
        },
        "isDefault": true,
        "isPublic": true,
        "shareUrl": "/card/user-id/short-id",
        "analytics": {
          "views": 12,
          "shares": 3,
          "saves": 5
        }
      }
    ]
  }
}
```

---

### Create Card

#### `POST /api/cards`
Create a new digital business card

**Headers**: `Authorization: Bearer {token}`

**Request Body**:
```json
{
  "name": "홍길동",
  "title": "CEO",
  "company": "METI Inc.",
  "bio": "디지털 명함으로 세상을 바꾸다",
  "contacts": [
    {
      "type": "email",
      "label": "회사",
      "value": "hong@meti.com",
      "isPrimary": true
    }
  ],
  "socialLinks": [
    {
      "platform": "linkedin",
      "url": "https://linkedin.com/in/honggildong"
    }
  ],
  "design": {
    "theme": "clean-white",
    "backgroundColor": "#ffffff",
    "textColor": "#000000"
  },
  "isDefault": true
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "card": { /* full card object */ }
  }
}
```

**Reward**: +50 hearts for creating a card

---

### Get Card by ID

#### `GET /api/cards/:id`
Get a specific card by ID

**Headers**: `Authorization: Bearer {token}` (optional)

**Response**: Card object

**Side Effect**: 
- Increments view count
- Gives card owner +10 hearts

---

### Get Card by Share URL

#### `GET /api/cards/share/:userId/:shortId`
Public endpoint to view shared card

**No auth required**

**Response**: Card object

**Side Effect**: Same as Get Card by ID

---

### Update Card

#### `PUT /api/cards/:id`
Update an existing card

**Headers**: `Authorization: Bearer {token}`

**Request Body**: Partial card object

**Response**:
```json
{
  "success": true,
  "data": {
    "card": { /* updated card object */ }
  }
}
```

---

### Delete Card

#### `DELETE /api/cards/:id`
Delete a card

**Headers**: `Authorization: Bearer {token}`

**Response**:
```json
{
  "success": true,
  "message": "Card deleted successfully"
}
```

---

## 👜 Wallet (Saved Cards)

### Get Saved Cards

#### `GET /api/wallet`
Get all saved cards in wallet

**Headers**: `Authorization: Bearer {token}`

**Response**:
```json
{
  "success": true,
  "data": {
    "savedCards": [
      {
        "id": "wallet-item-id",
        "cardId": "card-id",
        "savedAt": "2026-03-09T...",
        "memo": "Met at conference",
        "tags": ["networking", "potential-client"],
        "groupId": null,
        "isFavorite": false,
        "card": {
          "name": "김철수",
          "title": "Designer",
          "company": "ABC Corp"
        }
      }
    ]
  }
}
```

---

### Save Card to Wallet

#### `POST /api/wallet/save`
Save a card to wallet

**Headers**: `Authorization: Bearer {token}`

**Request Body**:
```json
{
  "cardId": "card-id",
  "memo": "Met at conference",
  "tags": ["networking"],
  "groupId": null
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "id": "wallet-item-id"
  },
  "message": "Card saved to wallet"
}
```

**Reward**: Card owner receives +100 hearts

---

### Update Wallet Item

#### `PUT /api/wallet/:id`
Update memo, tags, or group for saved card

**Headers**: `Authorization: Bearer {token}`

**Request Body**:
```json
{
  "memo": "Updated memo",
  "tags": ["important", "follow-up"],
  "isFavorite": true
}
```

---

### Remove from Wallet

#### `DELETE /api/wallet/:id`
Remove a card from wallet

**Headers**: `Authorization: Bearer {token}`

---

### Get Wallet Groups

#### `GET /api/wallet/groups`
Get all wallet groups

**Headers**: `Authorization: Bearer {token}`

---

### Create Wallet Group

#### `POST /api/wallet/groups`
Create a new group for organizing cards

**Headers**: `Authorization: Bearer {token}`

**Request Body**:
```json
{
  "name": "Clients",
  "color": "#1A73E8"
}
```

---

## 🌳 HappyTree Game

### Get Game Status

#### `GET /api/game/status`
Get complete game status for user

**Headers**: `Authorization: Bearer {token}`

**Response**:
```json
{
  "success": true,
  "data": {
    "gameData": {
      "userId": "user-id",
      "heartsBalance": 300050,
      "heartAllowance": 1,
      "starsPurchased": 0,
      "coinsEarned": 0,
      "coinsWithdrawn": 0,
      "farmUnlocked": {
        "1": true,
        "2": false,
        "3": false,
        "4": false
      },
      "testMode": false
    },
    "farmPots": {
      "1": [
        {
          "id": 1,
          "farmId": 1,
          "level": 0,
          "isInWarehouse": false
        }
      ],
      "2": [],
      "3": [],
      "4": []
    },
    "warehouse": [],
    "totalPots": 1
  }
}
```

---

### Get Farm Levels

#### `GET /api/game/levels/:farmId`
Get level requirements for a specific farm

**Parameters**:
- `farmId`: 1-4

**Response**:
```json
{
  "success": true,
  "data": {
    "levels": [
      {
        "farmId": 1,
        "level": 0,
        "heartsRequired": 0,
        "stars": 0,
        "coins": 0,
        "heartsReward": 0
      },
      {
        "farmId": 1,
        "level": 1,
        "heartsRequired": 0,
        "stars": 0,
        "coins": 0,
        "heartsReward": 1
      }
      // ... more levels
    ]
  }
}
```

---

### Create New Pot

#### `POST /api/game/pots`
Create a new pot in a farm

**Headers**: `Authorization: Bearer {token}`

**Request Body**:
```json
{
  "farmId": 1
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "pots": [ /* updated pot list */ ]
  },
  "message": "New pot created successfully"
}
```

---

### Level Up Pot

#### `POST /api/game/pots/:potId/levelup`
Level up a pot to the next level

**Headers**: `Authorization: Bearer {token}`

**Response**:
```json
{
  "success": true,
  "data": {
    "pot": { /* updated pot */ },
    "rewards": {
      "hearts": 14,
      "coins": 0
    },
    "newHeartsBalance": 300064,
    "newCoinsEarned": 0
  },
  "message": "Pot leveled up to 3!"
}
```

**Requirements**:
- Sufficient hearts (if required)
- Sufficient stars
- Sufficient allowance (for levels 4+)

**Level 4+ Allowance Requirements**:
- Level 4: 15 pots
- Level 5: 23 pots
- Level 6: 39 pots
- Level 7: 71 pots
- Level 8: 135 pots

---

### Purchase Stars

#### `POST /api/game/stars/purchase`
Purchase stars for game progression

**Headers**: `Authorization: Bearer {token}`

**Request Body**:
```json
{
  "amount": 5
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "starsPurchased": 5,
    "cost": 10
  },
  "message": "Successfully purchased 5 star(s)"
}
```

**Note**: Mock implementation. Real payment integration in Phase 2.

---

## 🎁 Card Exchange Rewards

Rewards are automatically given when certain events occur:

| Event | Reward |
|-------|--------|
| Card viewed | +10 hearts (to card owner) |
| Card saved to wallet | +100 hearts (to card owner) |
| Card created/sent | +50 hearts (to sender) |
| New user via referral link | +500 hearts, +1 star (to referrer) |

---

## ❌ Error Responses

All errors follow this format:

```json
{
  "success": false,
  "error": "Error message description"
}
```

**Common Status Codes**:
- `400` - Bad Request (missing/invalid parameters)
- `401` - Unauthorized (missing/invalid token)
- `403` - Forbidden (no permission)
- `404` - Not Found (resource doesn't exist)
- `409` - Conflict (duplicate resource)
- `500` - Internal Server Error

---

## 📝 Notes for Flutter Developers (Phase 2)

### Authentication Flow
1. Call `/api/auth/register` or `/api/auth/login`
2. Store returned token securely
3. Include token in all subsequent requests

### Card Sharing Flow
1. User creates card → Get `shareUrl`
2. Generate QR code from full URL: `{BASE_URL}{shareUrl}`
3. When scanned → Call `/api/cards/share/:userId/:shortId`
4. Save card → Call `/api/wallet/save`

### Game Integration
1. Poll `/api/game/status` when opening game tab
2. Display pots by farm
3. Allow level up via `/api/game/pots/:id/levelup`
4. Show rewards and update UI

### Reward System
Rewards are handled automatically by the backend. No client-side logic needed.

---

**Last Updated**: 2026-03-09  
**Maintained by**: METI Project Team
