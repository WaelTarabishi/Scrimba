import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getUserByEmail } from "../actions/auth/login";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        console.log(credentials);

        if (!credentials || !credentials.email) {
          throw new Error("Invalid credentials");
        }

        const user = await getUserByEmail(credentials.email as string);

        console.log(user, "returned user");

        if (!user || !user?.password) return null;

        const passwordMatch = await bcrypt.compare(
          credentials?.password as string,
          user.password.toString()
        );

        if (passwordMatch) return user;

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
