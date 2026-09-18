import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { checkRateLimit } from "@/lib/rate-limit";
import { sanitizeText, sanitizeSlug, sanitizeNumber } from "@/lib/sanitize";
import { isAdminAuthenticated } from "@/lib/auth";

// GET RSVPs: Admin Only
export async function GET() {
  try {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) {
      return NextResponse.json({ error: "Unauthorized. Admin login required." }, { status: 401 });
    }

    const rsvpList = await db.rsvp.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(rsvpList);
  } catch (error) {
    console.error("Failed to fetch RSVPs:", error);
    return NextResponse.json({ error: "Failed to fetch RSVP records." }, { status: 500 });
  }
}

// POST RSVP: Public with Rate Limiting and Input Sanitization
export async function POST(req: NextRequest) {
  try {
    // Rate Limit: 10 RSVP submissions per 5 minutes per IP
    const rateLimit = checkRateLimit(req, {
      prefix: "rsvp_post",
      limit: 10,
      windowMs: 5 * 60 * 1000,
    });

    if (!rateLimit.success) {
      const retryAfterSec = Math.ceil((rateLimit.resetTime - Date.now()) / 1000);
      return NextResponse.json(
        { error: `Too many RSVP attempts. Please wait ${retryAfterSec} seconds.` },
        { status: 429, headers: { "Retry-After": String(retryAfterSec) } }
      );
    }

    const body = await req.json().catch(() => ({}));
    const guestName = sanitizeText(body.guestName, 100);
    const slug = sanitizeSlug(body.slug || "honored-guest", 60);
    const attending = Boolean(body.attending);
    const rawSession = sanitizeText(body.session, 40);
    const validSessions = [
      "matrimony",
      "adat_reception",
      "holy_matrimony",
      "reception",
      "heritage_blessing",
      "both",
      "all",
      "resepsi",
      "pemberkatan",
    ];
    const session = validSessions.includes(rawSession.toLowerCase()) ? rawSession : "all";
    const guestCount = sanitizeNumber(body.guestCount, 1, 20, 1);
    const message = sanitizeText(body.message, 800);

    if (!guestName || guestName.length < 2) {
      return NextResponse.json({ error: "Please provide a valid guest name (at least 2 characters)." }, { status: 400 });
    }

    // Link invitation ID if available
    let invitationId: string | undefined;
    if (slug) {
      const inv = await db.invitation.findUnique({ where: { slug } });
      if (inv) invitationId = inv.id;
    }

    // Check for collision/duplicate submission by same guest and slug within last 24h
    const existingRsvp = await db.rsvp.findFirst({
      where: {
        slug,
        guestName,
      },
    });

    let rsvp;
    if (existingRsvp) {
      // Update existing record rather than creating conflicting duplicates
      rsvp = await db.rsvp.update({
        where: { id: existingRsvp.id },
        data: {
          attending,
          session,
          guestCount,
          message: message || existingRsvp.message,
          invitationId: invitationId || existingRsvp.invitationId,
        },
      });
    } else {
      rsvp = await db.rsvp.create({
        data: {
          guestName,
          slug,
          attending,
          session,
          guestCount,
          message: message || null,
          invitationId,
        },
      });
    }

    // Auto-create a pending blessing in wishes if message was submitted
    if (message && message.length > 0) {
      // Check if duplicate wish already submitted recently
      const existingWish = await db.wish.findFirst({
        where: {
          name: guestName,
          message,
        },
      });

      if (!existingWish) {
        await db.wish.create({
          data: {
            name: guestName,
            message,
            approved: false,
          },
        });
      }
    }

    return NextResponse.json(rsvp, { status: 201 });
  } catch (error) {
    console.error("Failed to save RSVP:", error);
    return NextResponse.json({ error: "Failed to submit RSVP confirmation. Please try again." }, { status: 500 });
  }
}
