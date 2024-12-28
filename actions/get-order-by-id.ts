"use server";

import prisma from "../lib/prisma";

export async function GetOrderById(id: string) {
  try {
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        billingAddress: true,
        shippingAddress: true,
      },
    });
    return order;
  } catch {
    return null;
  }
}
