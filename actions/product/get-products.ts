"use server";

import prisma from "../../lib/prisma";

export async function GetProducts({
  take,
  color,
  name,
  price,
  size,
}: {
  take?: number;
  color?: string;
  price?: number;
  name?: string;
  size?: string;
}) {
  try {
    console.log(take, "take");
    console.log(color, "color");
    console.log(price, "price");
    console.log(size, "size");
    console.log(name, "names");
    const products = await prisma.product.findMany({
      take: take ? take : 10,
      where: {
        title: {
          startsWith: name?.toUpperCase(),
        },
        color: color ? color : undefined,
        size: size ? size.toUpperCase() : undefined,
      },
    });
    console.log(products);
    if (products) return products;
    else throw new Error("Error in fetching");
  } catch {
    throw new Error("Some thing went wrong");
  }
}
