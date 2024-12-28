"use server";

import prisma from "../../lib/prisma";

export async function AdminBalance() {
  try {
    const orders = await prisma.order.findMany();
    return orders.reduce((a, order) => a + order.amount, 0);
  } catch {
    return null;
  }
}
