/**
 * Sanitize and validate inputs against XSS, injection, and oversized payloads.
 */

export function sanitizeText(input: unknown, maxLength = 500): string {
  if (typeof input !== "string") return "";
  
  // Remove HTML tags and malicious scripts
  const stripped = input
    .replace(/<[^>]*>?/gm, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+\s*=/gi, "")
    .trim();

  // Truncate to maximum allowed length
  return stripped.slice(0, maxLength);
}

export function sanitizeSlug(input: unknown, maxLength = 60): string {
  if (typeof input !== "string") return "";
  
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, maxLength);
}

export function sanitizeNumber(input: unknown, min = 1, max = 20, fallback = 1): number {
  const num = Number(input);
  if (isNaN(num)) return fallback;
  return Math.min(Math.max(Math.floor(num), min), max);
}
