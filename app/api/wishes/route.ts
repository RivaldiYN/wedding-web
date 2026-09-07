import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { checkRateLimit } from "@/lib/rate-limit";
import { sanitizeText } from "@/lib/sanitize";
import { isAdminAuthenticated } from "@/lib/auth";

// GET Wishes — Public (Approved only) or Admin (All)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const all = searchParams.get("all") === "true";

    if (all) {
      const isAuth = await isAdminAuthenticated();
      if (!isAuth) {
        return NextResponse.json({ error: "Unauthorized. Admin access required." }, { status: 401 });
      }
    }

    const wishes = await db.wish.findMany({
      where: all ? undefined : { approved: true },
      orderBy: { createdAt: "desc" },
      take: all ? 150 : 60,
    });

    return NextResponse.json(wishes);
  } catch (error) {
    console.error("Failed to fetch wishes:", error);
    return NextResponse.json({ error: "Failed to load wishes & blessings." }, { status: 500 });
  }
}

// POST Wish — Public with Rate Limiter & Sanitization
export async function POST(req: NextRequest) {
  try {
    // Rate Limit: 5 wishes per 5 minutes per IP
    const rateLimit = checkRateLimit(req, {
      prefix: "wishes_post",
      limit: 5,
      windowMs: 5 * 60 * 1000,
    });

    if (!rateLimit.success) {
      const retryAfterSec = Math.ceil((rateLimit.resetTime - Date.now()) / 1000);
      return NextResponse.json(
        { error: `Too many submissions. Please wait ${retryAfterSec} seconds before sending another wish.` },
        { status: 429, headers: { "Retry-After": String(retryAfterSec) } }
      );
    }

    const body = await req.json().catch(() => ({}));
    const name = sanitizeText(body.name, 80);
    const message = sanitizeText(body.message, 800);

    if (!name || name.length < 2) {
      return NextResponse.json({ error: "Please enter your name (at least 2 characters)." }, { status: 400 });
    }

    if (!message || message.length < 3) {
      return NextResponse.json({ error: "Please enter your warm blessing (at least 3 characters)." }, { status: 400 });
    }

    // Check for collision / double submission
    const existingWish = await db.wish.findFirst({
      where: {
        name,
        message,
      },
    });

    if (existingWish) {
      return NextResponse.json(existingWish, { status: 200 });
    }

    const wish = await db.wish.create({
      data: {
        name,
        message,
        approved: false, // Default to pending moderation for security
      },
    });

    return NextResponse.json(wish, { status: 201 });
  } catch (error) {
    console.error("Failed to create wish:", error);
    return NextResponse.json({ error: "Failed to send your blessing. Please try again." }, { status: 500 });
  }
}
