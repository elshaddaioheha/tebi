import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/auth";

export async function POST(req: NextRequest) {
  // Only allow in development or for localhost connections to keep it secure
  const isLocal = req.headers.get("host")?.includes("localhost") || req.headers.get("host")?.includes("127.0.0.1");
  if (!isLocal && process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Unauthorized endpoint." }, { status: 403 });
  }

  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Please sign in first." }, { status: 401 });
  }

  const user = await db.user.update({
    where: { email: session.user.email },
    data: { role: "ADMIN" },
  });

  return NextResponse.json({
    success: true,
    message: `User ${user.email} successfully elevated to ADMIN role! Please sign out and sign back in to refresh your session.`,
    user: { email: user.email, role: user.role }
  });
}
