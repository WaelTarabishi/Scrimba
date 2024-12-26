"use client";
import MaxWidthWrapper from "@/lib/max-widht-wrapper";
import { cn } from "@/lib/utils";
import { ArrowRight, ShoppingCart, X } from "lucide-react";
import Link from "next/link";
import { LogoutFn } from "../../actions/auth/logout";
import { useCurrentUserRole } from "../../hooks/use-current-user-role";
import { Button, buttonVariants } from "./ui/button";
import useProductStore from "@/store/products-store";
import { useMediaQuery } from "react-responsive";
import { useEffect, useState } from "react";
import DefaultImage from "../../public/t-shirt.jpg";
import EmptyCart from "../../public/empty-cart.png";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { ScrollArea } from "./ui/scroll-area";
import { useQuery } from "@tanstack/react-query";
import { GetUserUserRole } from "../../actions/get-user-role";
const Navbar = () => {
  const [mounted, setMounted] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const {
    products,
    removeProduct,
    increaseCount,
    decreaseCount,
    getTotalPrice,
  } = useProductStore();

  const handdlelgoout = () => {
    LogoutFn();
  };

  const { data: userRole, isLoading } = useQuery({
    queryKey: ["user-role"],
    queryFn: () => GetUserUserRole(),
    enabled: mounted,
  });

  const isUser = !!userRole;
  const isAdmin = userRole === "ADMIN";

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="sticky z-[100] h-14  inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex md:px-32 px-20 h-14 items-center justify-between border-b border-zinc-200 ">
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
                <Link
                  href={"/login"}
                  className={cn(
                    buttonVariants({
                      size: "sm",
                      className: "",
                      variant: "ghost",
                    })
                  )}>
                  Sign out
                </Link>
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
              href={"/configure/upload"}
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
                      <div
                        className="relative mb-4  w-full h-52    text-muted-foreground"
                        aria-hidden="true">
                        <Image
                          src={EmptyCart}
                          fill
                          placeholder="blur"
                          className="object-cover"
                          alt="empty shopping cart scrimba"
                        />
                      </div>
                      <div className="text-xl font-semibold">
                        Your Cart is Empty
                      </div>
                      <Link
                        href={`//search`}
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
                      <SheetTitle>Cart ({products.length})</SheetTitle>
                      <div className="w-full text-center flex flex-row-reverse items-center justify-center mt-5 text-sm font-medium">
                        <span className="font-semibold">Total Price</span>{" "}
                        :&nbsp;
                        <span>{getTotalPrice().toFixed(2)} </span>
                        <span className={``}>&nbsp; SYP &nbsp;</span>
                      </div>
                      <ScrollArea
                        className="flex-grow h-[calc(100vh-250px)]"
                        rounded-md>
                        {products.map((product) => (
                          <div className="space-y-3 py-2" key={product.id}>
                            <div className="flex flex-col items-start justify-between gap-4">
                              <div className="flex items-center space-x-4 mt-5">
                                <Link
                                  href={`/$product/${product.id}`}
                                  className="relative aspect-square h-36 w-32 min-w-fit overflow-hidden rounded">
                                  <Image
                                    src={DefaultImage}
                                    alt={
                                      product.title
                                        ? product.title
                                        : "cart product"
                                    }
                                    fill
                                    placeholder="blur"
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
                          href={`/$/check-out`}
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
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
