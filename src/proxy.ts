import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const accessToken = request.cookies.get("access_token")?.value;
  const refreshToken = request.cookies.get("refresh_token")?.value;
  const isAuthenticated = !!accessToken || !!refreshToken;

  const { pathname } = request.nextUrl;

  // Root path: redirect based on auth
  if (pathname === "/") {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/feed", request.url));
    }
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // Auth pages: redirect to feed if already logged in
  if (pathname === "/sign-in" || pathname === "/register") {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/feed", request.url));
    }
    return NextResponse.next();
  }

  // Protected routes: redirect to sign-in if not authenticated
  const protectedPaths = [
    "/feed",
    "/bookmarks",
    "/messaging",
    "/my-network",
    "/notifications",
    "/profile",
    "/posts",
    "/jobs",
  ];

  const isProtected = protectedPaths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );

  if (isProtected && !isAuthenticated) {
    const signInUrl = new URL("/sign-in", request.url);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/sign-in",
    "/register",
    "/feed",
    "/bookmarks",
    "/messaging",
    "/my-network",
    "/notifications",
    "/profile/:path*",
    "/posts/:path*",
    "/jobs/:path*",
  ],
};
