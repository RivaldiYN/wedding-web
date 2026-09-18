import { cookies } from "next/headers";
import crypto from "crypto";

const SECRET_KEY =
  process.env.ADMIN_SESSION_SECRET ||
  process.env.ADMIN_PASSWORD ||
  "wedding-batak-secure-secret-key-2026-manullang-simanjuntak";

/**
 * Generate a cryptographically signed HMAC token for admin session.
 */
export function createAdminSessionToken(): string {
  const timestamp = Date.now().toString();
  const signature = crypto
    .createHmac("sha256", SECRET_KEY)
    .update(`admin:${timestamp}`)
    .digest("hex");
  return `${timestamp}.${signature}`;
}

/**
 * Verify HMAC token signature and expiration (max 7 days).
 */
export function verifyAdminSessionToken(token: string | undefined): boolean {
  if (!token || typeof token !== "string") return false;

  const parts = token.split(".");
  if (parts.length !== 2) return false;

  const [timestampStr, providedSignature] = parts;
  const timestamp = Number(timestampStr);

  if (isNaN(timestamp)) return false;

  // Max age: 7 days
  const MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;
  if (Date.now() - timestamp > MAX_AGE_MS || Date.now() < timestamp - 60000) {
    return false;
  }

  const expectedSignature = crypto
    .createHmac("sha256", SECRET_KEY)
    .update(`admin:${timestampStr}`)
    .digest("hex");

  try {
    const a = Buffer.from(providedSignature, "hex");
    const b = Buffer.from(expectedSignature, "hex");
    if (a.length !== b.length) return false;
    return crypto.timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

/**
 * Verify admin session from cookies in server contexts.
 */
export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  return verifyAdminSessionToken(session?.value);
}
