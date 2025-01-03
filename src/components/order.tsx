"use client";

import { useSearchParams } from "next/navigation";
import { OrderInterface } from "../types";
import useProductStore from "@/store/products-store";
import { useEffect } from "react";
const Order = ({ order }: OrderInterface) => {
  const { removeAllProducts } = useProductStore();
  const serarchParams = useSearchParams();
  const orderId = serarchParams.get("orderId") || "";

  useEffect(() => {
    removeAllProducts();
  }, [orderId]);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="max-w-xl">
          <p className="text-base font-medium text-primary">Thank you!</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
            Your style is on its way!
          </h1>
          <p className="mt-2 text-base text-zinc-500">
            We&apos;ve received your order and are preparing your fabulous items.
          </p>

          <div className="mt-12 text-sm font-medium">
            <p className="text-zinc-900">Order number</p>
            <p className="mt-2 text-zinc-500">{orderId}</p>
          </div>
        </div>

        <div className="mt-10 border-t border-zinc-200">
          <div className="mt-10 flex flex-auto flex-col">
            <h4 className="font-semibold text-zinc-900">
              You&apos;ve chosen style and quality!
            </h4>
            <p className="mt-2 text-sm text-zinc-600">
              At FashionFusion, we believe that clothing should not only make
              you look good but feel good too. Our commitment to quality means
              your new items will be a staple in your wardrobe for years to
              come. We offer a 30-day satisfaction guarantee: If you&apos;re not
              completely happy with your purchase, we&apos;ll make it right.
            </p>
          </div>
        </div>

        <div>
          <div className="grid grid-cols-2 gap-x-6 py-10 text-sm">
            <div>
              <p className="font-medium text-gray-900">Shipping address</p>
              <div className="mt-2 text-zinc-700">
                <address className="not-italic">
                  <span className="block">{order?.shippingAddress?.name}</span>
                  <span className="block">
                    {order?.shippingAddress?.street}
                  </span>
                  <span className="block">
                    {order?.shippingAddress?.postalCode}{" "}
                    {order?.shippingAddress?.city}
                  </span>
                </address>
              </div>
            </div>
            <div>
              <p className="font-medium text-gray-900">Billing address</p>
              <div className="mt-2 text-zinc-700">
                <address className="not-italic">
                  <span className="block">{order?.billingAddress?.name}</span>
                  <span className="block">{order?.billingAddress?.street}</span>
                  <span className="block">
                    {order?.billingAddress?.postalCode}{" "}
                    {order?.billingAddress?.city}
                  </span>
                </address>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-6 border-t border-zinc-200 py-10 text-sm">
            <div>
              <p className="font-medium text-zinc-900">Payment status</p>
              <p className="mt-2 text-zinc-700">Paid</p>
            </div>

            <div>
              <p className="font-medium text-zinc-900">Shipping Method</p>
              <p className="mt-2 text-zinc-700">
                Express Delivery, 2-3 business days
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6 border-t border-zinc-200 pt-10 text-sm">
          <div className="flex justify-between">
            <p className="font-medium text-zinc-900">Subtotal</p>
            <p className="text-zinc-700">{order?.amount}$</p>
          </div>
          <div className="flex justify-between">
            <p className="font-medium text-zinc-900">Shipping</p>
            <p className="text-zinc-700">10$</p>
          </div>
          <div className="flex justify-between">
            <p className="font-medium text-zinc-900">Total</p>
            <p className="text-zinc-700">
              {order?.amount ? order?.amount + 10 : 10}$
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
