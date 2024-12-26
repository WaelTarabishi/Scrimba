import Products from "@/components/products/products-server";
import { Button, buttonVariants } from "@/components/ui/button";
import MaxWidthWrapper from "@/lib/max-widht-wrapper";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default async function Home() {
  return (
    <>
      <MaxWidthWrapper>
        <div className="py-20  md:px-0 px-5 mx-auto text-center flex flex-col items-center max-w-3xl relative">
          <h1 className="text-4xl tracking-tight font-bold text-gray-900 sm:text-6xl">
            Your marketplace for stylish{" "}
            <span className="text-yellow-500">clothes and accessories</span>
          </h1>
          <p className="mt-6 text-lg max-w-prose text-muted-foreground">
            Welcome to Scrimba Market. Discover a curated collection of trendy
            clothes and unique items, all verified for quality and style.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Link
              href="/products"
              className={buttonVariants({
                className: "bg-yellow-500 text-white hover:bg-yellow-600",
              })}>
              Shop Now
            </Link>
            <Button variant={"secondary"}>
              <div className="flex items-center justify-center gap-2">
                <span>Our Style Guide</span>
                <ChevronRight className="h-5 w-5 mt-[4px]" />
              </div>
            </Button>
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-20 right-0 -z-10 transform-gpu overflow-hidden blur-[60px] sm:-top-80">
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-yellow-300 to-yellow-500 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            />
          </div>
        </div>
      </MaxWidthWrapper>
      <MaxWidthWrapper className="md:px-10  max-w-screen-xl">
        <div className="mt-10 flex flex-col text-center  w-full">
          <h1 className="text-4xl tracking-tight font-bold text-gray-900 ">
            Products
          </h1>
          <Suspense
            fallback={
              <div className="container mx-auto px-4 p-5 mt-5 w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                  {[...Array(3)].map((_, index) => (
                    <div
                      key={index}
                      className="relative group p-2 cursor-pointer">
                      <div className="h-65 flex flex-col bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
                        <div className="absolute top-4 right-4 z-10">
                          <div className="bg-gray-300 p-2 rounded-full w-10 h-10 animate-pulse"></div>
                        </div>
                        <div className="w-full h-48 md:h-64 bg-gray-300 rounded-t-lg animate-pulse"></div>
                        <div className="flex flex-col p-4">
                          <div className="h-6 bg-gray-300 rounded w-3/4 mb-2 animate-pulse"></div>
                          <div className="h-4 bg-gray-300 rounded w-full mb-2 animate-pulse"></div>
                          <div className="h-4 bg-gray-300 rounded w-2/3 mb-2 animate-pulse"></div>
                          <div className="flex justify-between items-center mt-auto">
                            <div className="h-6 bg-gray-300 rounded w-1/4 animate-pulse"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            }>
            <Products />
          </Suspense>
        </div>
      </MaxWidthWrapper>
    </>
  );
}
