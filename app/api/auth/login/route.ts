import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { checkRateLimit } from "@/lib/rate-limit";
import { sanitizeText } from "@/lib/sanitize";

export async function POST(req: NextRequest) {
  try {
    // Rate limit: 5 attempts per 15 minutes per IP
    const rateLimit = checkRateLimit(req, {
      prefix: "auth_login",
      limit: 5,
      windowMs: 15 * 60 * 1000,
    });

    if (!rateLimit.success) {
      const retryAfterSec = Math.ceil((rateLimit.resetTime - Date.now()) / 1000);
      return NextResponse.json(
        {
          error: `Too many login attempts. Please wait ${retryAfterSec} seconds before trying again.`,
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(retryAfterSec),
          },
        }
      );
    }

    const body = await req.json().catch(() => ({}));
    const email = sanitizeText(body.email, 100);
    const password = typeof body.password === "string" ? body.password : "";

    const adminEmail = process.env.ADMIN_EMAIL || "admin@example.com";
    const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

    if (email === adminEmail && password === adminPassword) {
      const cookieStore = await cookies();
      cookieStore.set("admin_session", "authenticated_session_token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      return NextResponse.json({ success: true, message: "Logged in successfully" });
    }

    return NextResponse.json(
      { error: "Invalid email or password", remainingAttempts: rateLimit.remaining },
      { status: 401 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
