/**
 * Shared Application Constants
 */

export const APP_CONFIG = {
  appName: "Jacob & Ghina Wedding Invitation",
  tagline: "The Holy Matrimony & Traditional Feast of Manullang & Simanjuntak",
  defaultGuestName: "Honored Guest",
  defaultSlug: "honored-guest",
  contactEmail: "admin@example.com",
} as const;

export const SESSION_TYPES = {
  ALL: "all",
  MATRIMONY: "matrimony",
  ADAT_RECEPTION: "adat_reception",
} as const;

export const RATE_LIMIT_CONFIG = {
  AUTH_LOGIN: { limit: 5, windowMs: 15 * 60 * 1000 },
  RSVP_POST: { limit: 10, windowMs: 5 * 60 * 1000 },
  WISHES_POST: { limit: 5, windowMs: 5 * 60 * 1000 },
} as const;
