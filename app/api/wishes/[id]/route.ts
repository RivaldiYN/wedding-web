import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isAdminAuthenticated } from "@/lib/auth";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) {
      return NextResponse.json({ error: "Unauthorized. Admin access required." }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json().catch(() => ({}));

    const wish = await db.wish.update({
      where: { id },
      data: {
        approved: body.approved ?? true,
      },
    });

    return NextResponse.json(wish);
  } catch (error) {
    console.error("Failed to update wish:", error);
    return NextResponse.json({ error: "Failed to update wish status." }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) {
      return NextResponse.json({ error: "Unauthorized. Admin access required." }, { status: 401 });
    }

    const { id } = await params;
    await db.wish.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete wish:", error);
    return NextResponse.json({ error: "Failed to delete wish." }, { status: 500 });
  }
}
