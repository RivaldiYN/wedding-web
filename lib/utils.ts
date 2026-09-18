import { sanitizeSlug, sanitizeText } from "./sanitize";

/**
 * Converts a guest name to a URL-safe slug.
 * e.g. "Budi Saputra" → "budi-saputra"
 */
export function nameToSlug(name: string): string {
  const safeName = sanitizeText(name, 100);
  return sanitizeSlug(safeName, 60);
}

/**
 * Converts a slug back to a display name safely.
 * e.g. "budi-saputra" → "Budi Saputra"
 */
export function slugToName(slug: string): string {
  const safeSlug = sanitizeSlug(slug, 60);
  if (!safeSlug) return "Honored Guest";

  return safeSlug
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Formats a date to Indonesian locale string.
 */
export function formatDateID(date: Date | string): string {
  return new Date(date).toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Formats time to HH.MM WIB
 */
export function formatTimeWIB(date: Date | string): string {
  return new Date(date).toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Jakarta",
  }) + " WIB";
}

/**
 * Copies text to clipboard and returns success boolean.
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

/**
 * Calculates time remaining until a target date.
 */
export function getTimeRemaining(targetDate: string) {
  const total = Date.parse(targetDate) - Date.now();
  if (total <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
  return {
    total,
    days: Math.floor(total / (1000 * 60 * 60 * 24)),
    hours: Math.floor((total / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((total / 1000 / 60) % 60),
    seconds: Math.floor((total / 1000) % 60),
  };
}
