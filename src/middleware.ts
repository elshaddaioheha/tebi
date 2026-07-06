import { NextResponse } from "next/server";
import NextAuth from "next-auth";
import authConfig from "@/auth.config";

// Use the Edge-compatible config (no Prisma) for middleware
const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const url = req.nextUrl;
  const hostname = req.headers.get("host") || "";
  let targetPathname = url.pathname;
  let shouldRewrite = false;

  const isLeapSubdomain = hostname.startsWith("leap.");
  const isTebiSubdomain = hostname.startsWith("tebi.");

  // 1. Resolve target path for Leap subdomain
  if (isLeapSubdomain) {
    if (url.pathname === "/") {
      targetPathname = "/foundation/leap";
      shouldRewrite = true;
    }
  }

  // 2. Resolve target path for Tebi subdomain
  if (isTebiSubdomain) {
    // Avoid rewriting authentication, API routes, internal Next.js assets, or static files
    const bypassRoutes = ["/login", "/register", "/api", "/_next", "/favicon.ico"];
    const shouldBypass = bypassRoutes.some((route) => url.pathname.startsWith(route)) || url.pathname.includes(".");

    if (!shouldBypass && !url.pathname.startsWith("/academy")) {
      targetPathname = url.pathname === "/" ? "/academy" : `/academy${url.pathname}`;
      shouldRewrite = true;
    }
  }

  // 3. Auth protection for specific dashboard/course routes
  const protectedRoutes = ["/academy/dashboard", "/academy/courses"];
  const isProtectedRoute = protectedRoutes.some((route) =>
    targetPathname.startsWith(route)
  );

  if (isProtectedRoute && process.env.NODE_ENV !== "development") {
    if (!req.auth) {
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("callbackUrl", url.pathname); // Redirect to the original requested subdomain route
      return Response.redirect(loginUrl);
    }
  }

  // 4. Execute the rewrite if required
  if (shouldRewrite) {
    return NextResponse.rewrite(new URL(targetPathname, req.url));
  }

  return NextResponse.next();
});

export const config = {
  // Run middleware on all paths except for api, static assets, images, etc.
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
