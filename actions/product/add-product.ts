"use server";

import prisma from "../../lib/prisma";

export async function AddProductFn({
  price,
  description,
  image,
  category,
  color,
  size,
  title,
}: {
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
    await prisma.product.create({
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
    // console.log("helo");

    return { succees: "Product added succesfully" };
  } catch {
    throw new Error("Some thing went wrong");
  }
}
