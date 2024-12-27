"use server";

import prisma from "../lib/prisma";

export async function GetOrderById(id: string) {
  try {
    const existingUser = await prisma.order.findUnique({ where: { id } });
    return existingUser;
  } catch {
    return null;
  }
}
