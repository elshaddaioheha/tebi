import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import slugify from "slugify";

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
    const { id, moduleId, title, body, videoId, duration, order } = await req.json();

    if (!title || !moduleId || order === undefined) {
      return NextResponse.json({ error: "Title, moduleId, and order are required." }, { status: 400 });
    }

    const slug = slugify(title, { lower: true, strict: true });

    if (id) {
      // Update
      const updated = await db.lesson.update({
        where: { id },
        data: {
          title,
          slug,
          body: body ?? "",
          videoId: videoId || null,
          duration: duration ? parseInt(duration) : null,
          order: parseInt(order),
        }
      });
      return NextResponse.json(updated);
    } else {
      // Create
      const created = await db.lesson.create({
        data: {
          moduleId,
          title,
          slug,
          body: body ?? "",
          videoId: videoId || null,
          duration: duration ? parseInt(duration) : null,
          order: parseInt(order),
        }
      });
      return NextResponse.json(created, { status: 201 });
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
