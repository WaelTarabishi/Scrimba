import NextAuth from "next-auth";
import {
  DEFUALT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "./route";
import { auth } from "./auth";
import { currentUserRole } from "../lib/auth";

export default auth(async (req) => {
  const { nextUrl, auth } = req;

  const isLoggedIn = !!req?.auth;
  console.log(isLoggedIn, "hello");
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  if (isApiAuthRoute) {
    return;
  }
  // console.log(role, "role");
  console.log(auth?.user.role, "hello auth");
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};
