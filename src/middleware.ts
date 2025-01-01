import { NextResponse } from "next/server";
import { auth } from "./auth";
const protectedRoutes = [
  "/admin",
  "/admin/view-products",
  "/admin/orders",
  "/admin/add-products",
];
const authRoutes = ["/login", "/register"];

export default auth(async function middleware(req) {
  const { auth } = req;
  const isAuth = auth?.user;
  const userRole = auth?.user.role;
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
