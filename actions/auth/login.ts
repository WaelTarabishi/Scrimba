"use server";
import { DEFUALT_LOGIN_REDIRECT } from "@/route";
import { AuthError } from "next-auth";
import prisma from "../../lib/prisma";
import { signIn } from "@/auth";

export async function LoginFn({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFUALT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          throw new Error("Invalid Credentials");
        default:
          throw new Error("Some thing went wrong");
      }
    }
    throw error;
  }
  return { success: "User Created!" };
}

export async function getUserByEmail({ email }: { email: string }) {
  const existingUser = await prisma.user.findFirst({
    where: {
      email,
    },
  });
  if (!existingUser) throw new Error("User do not exist!");
  return existingUser;
}
