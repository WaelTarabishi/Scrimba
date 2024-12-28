"use server";

import { Order } from "@prisma/client";
import prisma from "../lib/prisma";
import { GetUser } from "./user/get-user";
import { stripe } from "../lib/stripe";
export const createCheckoutSession = async (cartItems: any) => {
  const user = await GetUser();

  if (!user) {
    throw new Error("You need to be logged in");
  }

  const totalPrice = await calculateTotalPrice(cartItems);

  let order: Order | undefined = undefined;
  console.log(user.id);

  order = await prisma.order.create({
    //@ts-ignore
    data: {
      amount: totalPrice,
      userId: user?.id,
    },
  });
  console.log(order, "hello order");
  //@ts-ignore
  const line_items = cartItems.map((item) => ({
    price_data: {
      currency: "USD",
      product_data: {
        name: "product",
        images: [`${process.env.NEXT_PUBLIC_SERVER_URL}/empty-cart.png`],
      },
      unit_amount: item.price * 100,
    },
    quantity: item.count,
  }));

  //@ts-ignore
  const stripeSession = await stripe.checkout.sessions.create({
    success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?orderId=${order.id}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?orderId=${order.id}`,
    payment_method_types: ["card"],
    mode: "payment",
    shipping_address_collection: { allowed_countries: ["DE", "US"] },
    metadata: {
      userId: user.id,
      orderId: order.id,
    },
    line_items: line_items,
  });

  return { url: stripeSession.url };
};

//! function that calculate product price's
async function calculateTotalPrice(cartItems: { id: string; count: number }[]) {
  const productIds = cartItems.map((item) => item.id);

  const products = await prisma.product.findMany({
    where: {
      id: { in: productIds },
    },
    select: {
      id: true,
      price: true,
    },
  });

  const totalPrice = cartItems.reduce((total, cartItem) => {
    const product = products.find((p) => p.id === cartItem.id);
    if (product) {
      return total + product.price * cartItem.count;
    }
    return total;
  }, 0);

  return totalPrice;
}
