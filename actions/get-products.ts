"use server";

import prisma from "../lib/prisma";

export async function GetProducts() {
  try {
    const products = await prisma.product.findMany();
    if (products) return products;
    else throw new Error("Error in fetching");
  } catch {
    throw new Error("Some thing went wrong");
  }
}
