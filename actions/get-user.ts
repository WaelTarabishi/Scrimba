"use server";

import { auth } from "@/auth";

export async function GetUserUser() {
  try {
    const session = await auth();
    return session?.user;
  } catch {
    return null;
  }
}
export async function GetUserUserRole() {
  try {
    const session = await auth();
    return session?.user.role;
  } catch {
    return null;
  }
}
