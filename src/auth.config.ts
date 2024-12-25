import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getUserByEmail } from "../actions/auth/login";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        //@ts-ignore
        const user = await getUserByEmail(credentials.email);
        //!!user.password this when user sigin using github or google
        if (!user || !user?.password) return null;
        const passwordMatch = bcrypt.compare(
          //@ts-ignore
          credentials.password,
          user?.password?.toString()
        );
        console.log(passwordMatch, "matched passowd");
        if (passwordMatch) return user;

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
