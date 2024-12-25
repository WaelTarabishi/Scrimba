"use server";

import { signOut } from "@/auth";

export async function LogoutFn() {
  await signOut();
}
