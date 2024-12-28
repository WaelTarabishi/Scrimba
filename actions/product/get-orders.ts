"use server";

import prisma from "../../lib/prisma";

export async function GetOrders() {
  try {
    const order = await prisma.order.findMany({
      include: {
        billingAddress: true,
        shippingAddress: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return order;
  } catch {
    return null;
  }
}
