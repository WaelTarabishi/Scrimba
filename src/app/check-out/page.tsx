"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, Minus, Plus, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import useProductStore from "@/store/products-store";
import DefualtImage from "../../../public/t-shirt.jpg";
import { useMutation } from "@tanstack/react-query";
import { createCheckoutSession } from "../../../actions/check-out";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "../../../hooks/use-current-user";
import CkeckoutPageSkeleton from "@/components/check-out-skeleton";
const CartPage = () => {
  const {
    products,
    removeProduct,
    increaseCount,
    decreaseCount,
    removeAllProducts,
    getTotalPrice,
  } = useProductStore();
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  const router = useRouter();
  const user = useCurrentUser();

  const { mutate, isPending } = useMutation({
    mutationKey: ["payment-mutation"],
    mutationFn: () => createCheckoutSession(products),
    onSuccess: ({ url }) => {
      if (url) {
        router.push(url);
      } else throw new Error("Unable to retrieve payment URL.");
    },
    onError: () => {
      console.log("Payment error");
    },
  });
  const handleCheckout = () => {
    mutate();
    console.log("handleCheckout");
  };

  if (!isMounted) return <CkeckoutPageSkeleton />;

  return (
    <div className={`bg-white `}>
      <div
        className={`mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8 `}>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Shopping Cart
        </h1>

        <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <div
            className={cn("lg:col-span-7", {
              "rounded-lg border-2 border-dashed border-zinc-200 p-12":
                isMounted && products.length === 0,
            })}>
            <h2 className="sr-only">Items in your shopping cart</h2>

            {isMounted && products.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center space-y-1">
                <div
                  aria-hidden="true"
                  className="relative mb-4 h-16 w-40 text-muted-foreground">
                  <Image
                    src="/qutranji_logo.png"
                    fill
                    loading="eager"
                    alt="empty shopping cart hippo"
                  />
                </div>
                <h3 className="font-semibold text-2xl">Your Cart is Empty</h3>
                <p className="text-muted-foreground text-center">
                  Nothing to show
                </p>
              </div>
            ) : null}

            <ul
              className={cn({
                "divide-y divide-gray-200 border-b border-t border-gray-200":
                  isMounted && products.length > 0,
              })}>
              {isMounted &&
                products.map((product) => {
                  return (
                    <li key={product.id} className={`flex py-6 sm:py-10 `}>
                      <div className="flex-shrink-0">
                        <Link href={`product/${product.id}`}>
                          <div
                            className={cn(
                              "relative aspect-square h-36 w-32 min-w-fit mr-2 overflow-hidden rounded"
                            )}>
                            <Image
                              src={DefualtImage}
                              alt="Cart Item"
                              fill
                              className="absolute object-cover "
                            />
                          </div>
                        </Link>
                      </div>

                      <div
                        className={`ml-4 flex flex-1 flex-col justify-between sm:ml-6`}>
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                          <div className="flex-1">
                            <h3 className="text-lg font-medium line-clamp-2 mb-2">
                              {product.title}
                            </h3>
                            <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
                              <span className="font-medium">
                                {new Intl.NumberFormat("en-US", {
                                  style: "currency",
                                  currency: "USD",
                                }).format(product.price || 0)}
                              </span>
                              <span className="text-gray-500">
                                Size: {product.size || "N/A"}
                              </span>
                              <span className="text-gray-500">
                                Color: {product.color || "N/A"}
                              </span>
                            </div>
                          </div>

                          <div className="flex flex-col items-end gap-2">
                            <div className="flex items-center gap-2">
                              <button
                                className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center"
                                onClick={() => decreaseCount(product.id)}>
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="text-lg font-semibold w-8 text-center">
                                {product.count}
                              </span>
                              <button
                                className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center"
                                onClick={() => increaseCount(product.id)}>
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>

                            <button
                              className="text-sm text-red-500 flex items-center mr-4 gap-1"
                              onClick={() => removeProduct(product.id)}>
                              <X className="w-4 h-4" />
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>

          <section className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8 sticky top-20">
            <h2 className="text-lg font-medium text-gray-900">Order Total</h2>

            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <div className="text-base font-medium justify-between items-center text-gray-900 flex flex-row w-full">
                  <span>Order Total</span>
                  <span className="font-semibold">
                    {isMounted ? ` ${getTotalPrice().toFixed(2)} USD` : null}
                  </span>
                </div>
              </div>
            </div>
            {isMounted && user?.id ? (
              <div className="mt-6">
                {isMounted && (
                  <Button
                    disabled={isPending}
                    onClick={handleCheckout}
                    className="w-full  bg-[#635BFF] hover:bg-[#4B45C6] text-white font-medium py-3 px-4 rounded-md transition duration-200 ease-in-out flex items-center justify-center">
                    {isPending ? (
                      <>
                        <span>Loading</span>
                        <span className="ml-1.5 flex items-center gap-1">
                          <span className="animate-flashing w-1 h-1 bg-white rounded-full inline-block" />
                          <span className="animate-flashing w-1 h-1 bg-white rounded-full inline-block delay-100" />
                          <span className="animate-flashing w-1 h-1 bg-white rounded-full inline-block delay-200 " />
                        </span>
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-6 h-6 mr-2"
                          viewBox="0 0 24 24"
                          fill="currentColor">
                          <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.594-7.305h.003z" />
                        </svg>{" "}
                        Pay with Stripe
                      </>
                    )}
                  </Button>
                )}
              </div>
            ) : (
              <div className="mt-6">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button className="w-full text-white">
                      Proceed to Checkout
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Login Required</AlertDialogTitle>
                      <AlertDialogDescription>
                        Please login or sign up to continue with your checkout.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        className="text-white"
                        onClick={() => {
                          router.push("/login?origin=check-out");
                        }}>
                        Login
                      </AlertDialogAction>
                      <AlertDialogAction
                        className="text-white"
                        onClick={() => {
                          router.push("/register?origin=check-out");
                        }}>
                        Sign Up
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
