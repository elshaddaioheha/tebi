import NextAuth from "next-auth";
import authConfig from "@/auth.config";

// Use the Edge-compatible config (no Prisma) for middleware
const { auth } = NextAuth(authConfig);

export default auth((req) => {
  if (!req.auth) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return Response.redirect(loginUrl);
  }
});

export const config = {
  matcher: ["/academy/dashboard/:path*", "/academy/courses/:path*"],
};
