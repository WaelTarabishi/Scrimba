"use server";

import { auth } from "@/auth";

export async function GetUser() {
  try {
    const session = await auth();
    return session?.user;
  } catch {
    return null;
  }
}
export async function GetUserRole() {
  try {
    const session = await auth();
    return session?.user.role;
  } catch {
    return null;
  }
}
