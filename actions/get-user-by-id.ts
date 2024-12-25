"use server";

import prisma from "../lib/prisma";

export async function GetUserById(id: string) {
  try {
    const existingUser = await prisma.user.findUnique({ where: { id } });
    return existingUser;
  } catch {
    return null;
  }
}
