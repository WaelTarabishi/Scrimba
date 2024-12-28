"use server";

import { revalidatePath } from "next/cache";
import prisma from "../../lib/prisma";

export async function EditProductFn({
  id,
  price,
  description,
  image,
  category,
  color,
  size,
  title,
}: {
    id: string;
  title: string;
  price: number;
  size: string;
  image: string;
  description: string;
  category: string;
  color: string;
}) {
  // console.log(price, description, category, color, description, size);

  try {
    await prisma.product.update({
      where: { id },
      data: {
        price,
        title,
        category,
        color,
        image,
        size,
        description,
      },
    });

    revalidatePath("/admin/view-products");
    return { success: "Product updated successfully" };
  } catch (error) {
    throw new Error("Something went wrong while updating the product");
  }
}
