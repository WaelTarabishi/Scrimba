import { headers } from "next/headers";
import { stripe } from "../../../../lib/stripe";
import prisma from "../../../../lib/prisma";
import Stripe from "stripe";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = headers().get("stripe-signature");
    if (!signature) {
      return new Response("Invalid signature", { status: 400 });
    }
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
    if (event.type === "checkout.session.completed") {
      if (!event.data.object.customer_details?.email) {
        throw new Error("Missing user email");
      }
      const session = event.data.object as Stripe.Checkout.Session;

      const { userId, orderId } = session.metadata || {
        userId: null,
        orderId: null,
      };
      if (!userId || !orderId) {
        throw new Error("Invalid request metadata");
      }
      const billingAddress = session.customer_details!.address;
      const shippingAddress = session.shipping_details!.address;

      await prisma.order.update({
        where: {
          id: orderId,
          userId: userId,
        },
        data: {
          isPaid: true,
        shippingAddress: {
            create: {
              name: session.customer_details!.name!,
              city: shippingAddress?.city!,
              country: shippingAddress?.country!,
              postalCode: shippingAddress?.postal_code!,
              street: shippingAddress?.line1!,
              state: shippingAddress?.state!,
            },
          },
          billingAddress: {
            create: {
              name: session.customer_details!.name!,
              city: billingAddress?.city!,
              country: billingAddress?.country!,
              postalCode: billingAddress?.postal_code!,
              street: billingAddress?.line1!,
              state: billingAddress?.state!,
            },
          },
        },
      });
    }
    return NextResponse.json({ resul: event, ok: true });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "SomeThing went wrong", ok: false },
      { status: 500 }
    );
  }
}
