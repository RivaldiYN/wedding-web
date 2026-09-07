import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isAdminAuthenticated } from "@/lib/auth";
import { sanitizeText, sanitizeSlug } from "@/lib/sanitize";

// GET Invitations — Admin Only
export async function GET() {
  try {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) {
      return NextResponse.json({ error: "Unauthorized. Admin access required." }, { status: 401 });
    }

    const invitations = await db.invitation.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(invitations);
  } catch (error) {
    console.error("Failed to fetch invitations:", error);
    return NextResponse.json({ error: "Failed to fetch invitation links." }, { status: 500 });
  }
}

// POST Invitation Link — Admin Only with Sanitization & Collision Resilience
export async function POST(req: NextRequest) {
  try {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) {
      return NextResponse.json({ error: "Unauthorized. Admin access required." }, { status: 401 });
    }

    const body = await req.json().catch(() => ({}));
    const guestName = sanitizeText(body.guestName, 100);
    let slug = sanitizeSlug(body.slug, 60);

    if (!guestName || guestName.length < 2) {
      return NextResponse.json({ error: "Please provide a valid guest name (at least 2 characters)." }, { status: 400 });
    }

    if (!slug) {
      // Auto-generate safe slug from guest name
      slug = sanitizeSlug(guestName, 60);
    }

    // Upsert invitation by slug
    const invitation = await db.invitation.upsert({
      where: { slug },
      update: { guestName },
      create: {
        guestName,
        slug,
      },
    });

    return NextResponse.json(invitation, { status: 201 });
  } catch (error) {
    console.error("Failed to create invitation:", error);
    return NextResponse.json({ error: "Failed to create invitation link." }, { status: 500 });
  }
}
