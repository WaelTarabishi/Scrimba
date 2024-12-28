"use server";

import prisma from "../../lib/prisma";

export async function GetProductById(id: string) {
  try {
    const products = await prisma.product.findUnique({
      where: {
        id,
      },
    });
    if (products) return products;
    else throw new Error("Error in fetching");
  } catch {
    throw new Error("Some thing went wrong");
  }
}
