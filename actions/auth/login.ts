"use server";
import { DEFUALT_LOGIN_REDIRECT } from "@/route";
import { AuthError } from "next-auth";
import prisma from "../../lib/prisma";
import { signIn } from "@/auth";
import { GetUserByEmail } from "../get-user-by-id";
import bcrypt from "bcrypt";

export async function LoginFn({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const user = await GetUserByEmail(email);
    if (!user) throw new Error("Invalid credentials");

    const isPasswordValid = await bcrypt.compare(password, user.password!);
    if (!isPasswordValid) throw new Error("Invalid credentials");

    const result = await signIn("credentials", {
      email,
      password,
      // callbackUrl: DEFUALT_LOGIN_REDIRECT,
    });

    return result;
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          throw new Error("Invalid Credentials");
        default:
          throw new Error("Something went wrong");
      }
    }
    throw error;
  }
}
export async function getUserByEmail(email: string) {
  console.log(`Searching for user with email: ${email}`);
  const existingUser = await prisma.user.findUnique({
    where: {
      email: email.toLowerCase(),
    },
  });
  if (!existingUser) {
    console.log(`No user found with email: ${email}`);
    throw new Error("User does not exist!");
  }
  console.log(`User found: ${existingUser.id}`);
  return existingUser;
}