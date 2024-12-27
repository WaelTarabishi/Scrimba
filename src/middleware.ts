import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  });
  const isAuth = !!token;
  const isAuthPage =
    request.nextUrl.pathname.startsWith("/login") ||
    request.nextUrl.pathname.startsWith("/register");
  const isAdminPage = request.nextUrl.pathname.startsWith("/admin");
  if (isAuthPage) {
    if (isAuth) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return null;
  }
  console.log(token?.role, "hello");

  if (isAdminPage) {
    if (!isAuth) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    if (token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", request.url)); // Redirect non-admins to home
    }
    // If we're here, the user is authenticated and an admin, so we allow access
  }

  return null;
}

export const config = {
  matcher: [
    "/login",
    "/register",
    "/admin/:path*",
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
