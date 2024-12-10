import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const authRoutes = ["/profile", "/products"] as const;

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const isAuthRoute = authRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (isAuthRoute && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: authRoutes.map((route) => `${route}/:path*`),
};
