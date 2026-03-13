// METI Shared Types (v0.2)
// Based on docs/03_DATA_MODEL.md

/**
 * User
 */
export interface User {
  id: string;
  email?: string;
  provider?: 'email' | 'google' | 'apple';
  createdAt: string; // ISO 8601
  updatedAt: string; // ISO 8601
}

/**
 * Card - Digital Business Card
 */
export interface Card {
  id: string;
  ownerUserId: string;
  displayName: string;
  headline: string;
  avatarUrl?: string | null;
  links: CardLink[];
  contacts: CardContacts;
  visibility: CardVisibility;
  status: CardStatus;
  createdAt: string; // ISO 8601
  updatedAt: string; // ISO 8601
}

export interface CardLink {
  label: string;
  url: string;
}

export interface CardContacts {
  phone?: string | null;
  email?: string | null;
}

export interface CardVisibility {
  showPhone: boolean;
  showEmail: boolean;
}

export type CardStatus = 'public' | 'unlisted' | 'private';

/**
 * CardViewEvent - Minimal analytics
 */
export interface CardViewEvent {
  id: string;
  cardId: string;
  ts: number; // epoch milliseconds
  src?: string | null; // referral source (e.g., 'instagram', 'email')
}

/**
 * API Request/Response Types
 */

// Auth
export interface RegisterRequest {
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

// Card
export interface CreateCardRequest {
  displayName: string;
  headline: string;
  avatarUrl?: string | null;
  links?: CardLink[];
  contacts?: CardContacts;
  visibility?: CardVisibility;
  status?: CardStatus;
}

export interface UpdateCardRequest {
  displayName?: string;
  headline?: string;
  avatarUrl?: string | null;
  links?: CardLink[];
  contacts?: CardContacts;
  visibility?: CardVisibility;
  status?: CardStatus;
}

export interface CardResponse {
  card: Card;
}

export interface CardsListResponse {
  cards: Card[];
}

// View Event
export interface RecordViewRequest {
  src?: string;
}

/**
 * Error Response
 */
export interface ErrorResponse {
  error: {
    code: string;
    message: string;
  };
}
