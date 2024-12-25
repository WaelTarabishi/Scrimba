import authConfig from "@/auth.config";
import NextAuth, { DefaultSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "../lib/prisma";
import { GetUserById } from "../actions/get-user-by-id";

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user)
        [(session.user.role = token.role as "ADMIN" | "USER")];
      return session;
    },

    async jwt({ token }) {
      if (!token.sub) return token;
      const user = await GetUserById(token.sub);
      if (!user) return token;
      token.role = user.role;
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
  ...authConfig,
});
