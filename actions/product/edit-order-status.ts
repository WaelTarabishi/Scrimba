"use server";

import { revalidatePath } from "next/cache";
import prisma from "../../lib/prisma";

export async function EditOrderFn({
  id,
  status,
}: {
  id: string;
  status: "awaiting_shipment" | "shipped" | "fullfilled";
}) {
  // console.log(price, description, category, color, description, size);

  try {
    await prisma.order.update({
      where: { id },
      data: { status },
    });

    revalidatePath("/admin/orders");
    return { success: "Order updated successfully" };
  } catch (error) {
    throw new Error("Something went wrong while updating the product");
  }
}
