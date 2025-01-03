"use client";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import MaxWidthWrapper from "@/lib/max-widht-wrapper";
import { cn } from "@/lib/utils";
import useProductStore from "@/store/products-store";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, ShoppingCart, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LogoutFn } from "../../actions/auth/logout";
import { GetUserRole } from "../../actions/user/get-user";
import EmptyCart from "../../public/empty-cart.png";
import DefaultImage from "../../public/t-shirt.jpg";
import { Button, buttonVariants } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [mounted, setMounted] = useState(false);
  const {
    products,
    removeProduct,
    increaseCount,
    decreaseCount,
    getTotalPrice,
  } = useProductStore();
  const router = useRouter();
  const handdlelgoout = () => {
    router.push("/");
    LogoutFn();
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const { data: userRole, isLoading } = useQuery({
    queryKey: ["user-role"],
    queryFn: () => GetUserRole(),
    enabled: mounted,
    refetchOnWindowFocus: false,
  });

  const isUser = !!userRole;
  const isAdmin = userRole === "ADMIN";

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted)
    return (
      <nav className="sticky z-[100] h-14  inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
        <MaxWidthWrapper>
          <div className="flex md:px-32 px-20 h-14 items-center justify-between border-b border-zinc-200 ">
            <Link href={"/"} className="flex z-40 font-semibold">
              <span className="text-yellow-500">Scrimba.</span>
            </Link>
            <div className="flex gap-x-5 items-center justify-center">
              <Link
                href={"/products"}
                className={cn(
                  buttonVariants({
                    size: "sm",
                    className:
                      "hidden sm:flex bg-yellow-500  hover:bg-yellow-600 text-white items-center gap-1",
                  })
                )}>
                Shop Now
                <ArrowRight className="ml-1.5 h-5 w-5" />
              </Link>
              <ShoppingCart className="w-5 h-5" />
            </div>
          </div>
        </MaxWidthWrapper>
      </nav>
    );
  return (
    <nav className="sticky z-[100] h-14  inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <div className="">
        <div className="flex md:px-32 px-10 h-14 items-center justify-between border-b border-zinc-200 ">
          <Link href={"/"} className="flex z-40 font-semibold">
            <span className="text-yellow-500">Scrimba.</span>
          </Link>
          <div className="h-full flex items-center space-x-4">
            {isLoading ? (
              <div className="flex space-x-4">
                <div className="w-20 h-8 bg-gray-200 animate-pulse rounded"></div>
                <div className="w-20 h-8 bg-gray-200 animate-pulse rounded"></div>
              </div>
            ) : mounted && isUser ? (
              <>
                <button
                  onClick={handdlelgoout}
                  className={cn(
                    buttonVariants({
                      size: "sm",
                      className: "",
                      variant: "ghost",
                    })
                  )}>
                  Sign out
                </button>
                {mounted && isAdmin ? (
                  <Link
                    href={"/admin"}
                    className={cn(
                      buttonVariants({ size: "sm", variant: "ghost" })
                    )}>
                    Dashboard 🌟
                  </Link>
                ) : null}
              </>
            ) : (
              <>
                <Link
                  href={"/register"}
                  className={cn(
                    buttonVariants({ size: "sm", variant: "ghost" })
                  )}>
                  Sign up
                </Link>
                <Link
                  href="/login"
                  className={cn(
                    buttonVariants({ size: "sm", variant: "ghost" })
                  )}>
                  Login
                </Link>
                <div className=" h-8 w-px bg-zinc-200 hidden sm:block" />
              </>
            )}
            <Link
              href={"/products"}
              className={cn(
                buttonVariants({
                  size: "sm",
                  className:
                    "hidden sm:flex bg-yellow-500  hover:bg-yellow-600 text-white items-center gap-1",
                })
              )}>
              Shop Now
              <ArrowRight className="ml-1.5 h-5 w-5" />
            </Link>
            <>
              <Sheet>
                <SheetTrigger>
                  <div className="relative">
                    <ShoppingCart className="w-5 h-5" />
                    {mounted && products.length > 0 && (
                      <span className="absolute -top-2 -right-2 bg-yellow-500 text-white text-sm sm:text-sm rounded-full w-[18px] h-[18px]  flex items-center justify-center">
                        {products.length}
                      </span>
                    )}
                  </div>
                </SheetTrigger>
                <SheetContent className="" side={"left"}>
                  {products.length === 0 ? (
                    <div className="flex h-full flex-col items-center justify-center space-y-1">
                      <Image
                        src={EmptyCart}
                        placeholder="blur"
                        className="object-cover inline-flex  h-32"
                        alt="empty shopping cart scrimba"
                      />

                      <div className="text-xl font-semibold">
                        Your Cart is Empty
                      </div>
                      <Link
                        href={`/products`}
                        className={buttonVariants({
                          variant: "link",
                          size: "sm",
                          className: "text-sm text-muted-foreground",
                        })}>
                        Add Products To your cart
                      </Link>
                    </div>
                  ) : (
                    <div className="flex flex-col h-full">
                      <div className="bg-gray-100 rounded-lg p-4 mb-2 mt-4">
                        <SheetTitle className="text-center text-2xl font-bold mb-2">
                          Your Cart
                        </SheetTitle>
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-medium">
                            {products.length}{" "}
                            {products.length === 1 ? "item" : "items"}
                          </span>
                          <div className="flex items-center">
                            <span className="font-semibold mr-2">Total:</span>
                            <span className=" font-semibold text-yellow-600">
                              {getTotalPrice().toFixed(2)} USD
                            </span>
                          </div>
                        </div>
                      </div>

                      <ScrollArea
                        className="flex-grow h-[calc(100vh-250px)]"
                        rounded-md>
                        {products.map((product) => (
                          <div className="space-y-3 py-2" key={product.id}>
                            <div className="flex flex-col items-start justify-between gap-4">
                              <div className="flex items-center space-x-4 mt-5">
                                <Link
                                  href={`/product/${product.id}`}
                                  className="relative aspect-square h-36 w-32 min-w-fit overflow-hidden rounded">
                                  <Image
                                    src={product.image?.startsWith('http')? product.image : DefaultImage}
                                    alt={
                                      product.title
                                        ? product.title
                                        : "cart product"
                                    }
                                    fill
                                    className="absolute object-cover"
                                  />
                                </Link>
                                <div className="flex flex-col self-start gap-y-2">
                                  <span className="line-clamp-1 text-lg font-medium mb-1">
                                    {product.title}
                                  </span>
                                  <div className="flex flex-col space-y-1 font-medium">
                                    <span className="line-clamp-1 text-sm">
                                      {new Intl.NumberFormat("de-DE", {
                                        style: "currency",
                                        currency: "SYP",
                                      }).format(
                                        product.price ? product.price : 0
                                      )}{" "}
                                    </span>
                                  </div>
                                  <span className="line-clamp-1 text-xs capitalize text-muted-foreground">
                                    Descriptoin
                                  </span>
                                  <div className="flex items-center justify-start rounded-lg">
                                    <Button
                                      onClick={() => decreaseCount(product.id)}
                                      className="w-2 h-2 flex items-center justify-center bg-primary text-white rounded-full hover:bg-primary2 transition-colors">
                                      -
                                    </Button>
                                    <span className="text-lg font-semibold w-8 text-center">
                                      {product.count}
                                    </span>
                                    <Button
                                      onClick={() => increaseCount(product.id)}
                                      className="w-2 h-2 flex items-center justify-center bg-primary text-white rounded-full hover:bg-primary2 transition-colors">
                                      +
                                    </Button>
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    <button
                                      className="flex items-center gap-0.5"
                                      onClick={() => removeProduct(product.id)}>
                                      <X className="w-3 h-4 text-red-500" />
                                      remove
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </ScrollArea>
                      <SheetFooter className="mt-auto">
                        <Link
                          href={`/check-out`}
                          className={buttonVariants({
                            className: "w-full mt-4 text-white",
                          })}>
                          Continue To Check Out
                        </Link>
                      </SheetFooter>
                    </div>
                  )}
                </SheetContent>
              </Sheet>
            </>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
