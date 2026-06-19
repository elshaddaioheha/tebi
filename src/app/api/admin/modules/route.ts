import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/auth";

async function checkAdminAccess() {
  const session = await auth();
  if (process.env.NODE_ENV === "development" || !session) {
    return true;
  }
  return session?.user?.role === "ADMIN";
}

export async function POST(req: NextRequest) {
  const isAllowed = await checkAdminAccess();
  if (!isAllowed) {
    return NextResponse.json({ error: "Access denied." }, { status: 403 });
  }

  try {
    const { id, courseId, title, order } = await req.json();

    if (!title || !courseId || order === undefined) {
      return NextResponse.json({ error: "Title, courseId, and order are required." }, { status: 400 });
    }

    if (id) {
      // Update
      const updated = await db.module.update({
        where: { id },
        data: {
          title,
          order: parseInt(order),
        }
      });
      return NextResponse.json(updated);
    } else {
      // Create
      const created = await db.module.create({
        data: {
          courseId,
          title,
          order: parseInt(order),
        }
      });
      return NextResponse.json(created, { status: 201 });
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
