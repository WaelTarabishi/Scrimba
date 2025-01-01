import { NextRequest, NextResponse } from "next/server";
import authConfig from "./auth.config";
import NextAuth from "next-auth";
import { auth } from "./auth";
import { UserRole } from "@prisma/client";
const protectedRoutes = [
  "/admin",
  "/account",
  "/dashboard/services",
  "/dashboard/users",
];
const authRoutes = ["/login", "/register"];

export default auth(async function middleware(req) {
  const { auth } = req;
  let isAuth = auth?.user;
  let userRole = auth?.user.role;
  const { pathname } = req.nextUrl;

  protectedRoutes.some((route) => console.log(route, "route"));
  if (userRole === "USER" && authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/account", req.url));
  }

  if (isAuth && authRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  if (
    (isAuth || !isAuth) &&
    userRole !== "ADMIN" &&
    protectedRoutes.some((route) => pathname.startsWith(route))
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }


});
