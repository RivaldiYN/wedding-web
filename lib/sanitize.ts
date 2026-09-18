/**
 * Comprehensive Defense-in-Depth Sanitization and Validation
 * Defends against XSS, HTML Injection, Prototype Pollution, Control Characters, and URL Hijacking.
 */

/**
 * Strips HTML tags, script payloads, dangerous protocols, and control characters.
 */
export function sanitizeText(input: unknown, maxLength = 500): string {
  if (typeof input !== "string") return "";

  // 1. Remove null bytes and invisible control characters (except standard whitespace)
  let clean = input.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F\uFFFD\u202E\u202D]/g, "");

  // 2. Strip HTML tags, attributes, event handlers and dangerous protocol schemes
  clean = clean
    .replace(/<[^>]*>?/gm, "")
    .replace(/javascript\s*:/gi, "")
    .replace(/vbscript\s*:/gi, "")
    .replace(/data\s*:\s*text\/html/gi, "")
    .replace(/on\w+\s*=/gi, "")
    .replace(/&#[0-9]+;/g, "")
    .replace(/&#x[0-9a-fA-F]+;/g, "")
    .trim();

  // 3. Prevent prototype pollution strings
  clean = clean.replace(/__proto__|constructor|prototype/gi, "");

  // 4. Truncate to maximum allowed length
  return clean.slice(0, maxLength);
}

/**
 * Strict slug sanitizer allowing ONLY lowercase a-z, 0-9, and hyphen.
 * Prevents directory traversal (../), path hijacking, and URL injection.
 */
export function sanitizeSlug(input: unknown, maxLength = 60): string {
  if (typeof input !== "string") return "";

  return input
    .toLowerCase()
    .trim()
    .replace(/[\x00-\x1F\x7F]/g, "")
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, maxLength);
}

/**
 * Sanitizes and bounds integer numbers safely.
 */
export function sanitizeNumber(input: unknown, min = 1, max = 20, fallback = 1): number {
  const num = Number(input);
  if (isNaN(num) || !isFinite(num)) return fallback;
  return Math.min(Math.max(Math.floor(num), min), max);
}

/**
 * Validates and sanitizes database record IDs (UUID / CUID / Alphanumeric).
 */
export function sanitizeId(input: unknown, maxLength = 64): string {
  if (typeof input !== "string") return "";
  return input.trim().replace(/[^a-zA-Z0-9_-]/g, "").slice(0, maxLength);
}

/**
 * Validates that an external URL is safe and belongs only to allowed protocols.
 */
export function isSafeUrl(url: string, allowedHosts: string[] = []): boolean {
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
      return false;
    }
    if (allowedHosts.length > 0) {
      return allowedHosts.some(
        (host) => parsed.hostname === host || parsed.hostname.endsWith(`.${host}`)
      );
    }
    return true;
  } catch {
    return false;
  }
}
