"use server";

import { revalidatePath } from "next/cache";
import prisma from "../../lib/prisma";

export async function DeleteProductFn(id: string) {
  try {
    await prisma.product.delete({
      where: { id },
    });

    revalidatePath("/admin/view-products");
    return { success: "Product updated successfully" };
  } catch (error) {
    throw new Error("Something went wrong while updating the product");
  }
}
