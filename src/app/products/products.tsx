"use client";
import ProductSliderSkeleton from "@/components/product-slider-skeleton";
import ProductsPageSkeleton from "@/components/products-page-skeleton";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Separator } from "@/components/ui/separator";
import MaxWidthWrapper from "@/lib/max-widht-wrapper";
import { cn } from "@/lib/utils";
import useProductStore from "@/store/products-store";
import { ProductInterface } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { CheckCircle, ShoppingCartIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import "rc-slider/assets/index.css";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  GetProducts,
  GetProductsCount,
} from "../../../actions/product/get-products";
import TShirt from "../../../public/t-shirt.jpg";
import { Skeleton } from "@/components/ui/skeleton";
const ProductsPage = () => {
  const [values, setValues] = useState([0, 999]);
  const [color, setColor] = useState("");
  const [name, setName] = useState("");
  const [size, setSize] = useState("");
  const [page, setPage] = useState<number>(1);
  const [isMounted, setIsMounted] = useState<boolean>();
  const {
    addProducts,
    setColor: setColorStore,
    setName: setNameStore,
    setSize: setSizeStore,
    size: sizeStore,
    color: colorStore,
    name: nameStore,
    page: pageStore,
    setPage: setPageStore,
    addProduct,
  } = useProductStore();

  const { data, isLoading } = useQuery({
    queryKey: [
      "products",
      color ? color : colorStore,
      name ? name : nameStore,
      size ? size : sizeStore,
      page ? page : pageStore,
    ],
    queryFn: () =>
      GetProducts({
        take: 6,
        skip: ((page ? page : pageStore) - 1) * 6,
        color: color ? color : colorStore ? colorStore : undefined,
        name: name ? name : nameStore ? nameStore : undefined,
        size: size ? size : sizeStore ? sizeStore : undefined,
      }),
  });
  const { data: count, isLoading: isCounting } = useQuery({
    queryKey: [
      "count",
      color ? color : colorStore,
      name ? name : nameStore,
      size ? size : sizeStore,
      page ? page : pageStore,
    ],
    queryFn: () =>
      GetProductsCount({
        color: color ? color : colorStore ? colorStore : undefined,
        name: name ? name : nameStore ? nameStore : undefined,
        size: size ? size : sizeStore ? sizeStore : undefined,
      }),
  });

  useEffect(() => {
    setProductData(data);
  }, [data]);

  const [productData, setProductData] = useState(data);
  const toatalPages = Math.ceil(count! / 6);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return <ProductsPageSkeleton />;
  console.log(toatalPages);
  return (
    <MaxWidthWrapper className="mx-auto w-full max-w-screen-2xl px-2.5 my-10 md:px1-0 xl:px-24">
      <div className={`flex flex-col xl:flex-row  gap-x-4 h-full        `}>
        {/* Filter section */}
        <div className={`w-full md:h-full md:w-1/3  mt-14  sticky top-28  `}>
          <div className="border rounded-md bg-card p-4 shadow-lg">
            <h2 className={cn("text-xl font-semibold mb-4")}>Filters</h2>

            <Separator className="my-4" />

            {/* Color filter */}
            <div>
              <Label htmlFor="color">Color</Label>
              <Select
                required
                onValueChange={(values) => {
                  setColor(values), setColorStore(values);
                }}
                defaultValue={color ? color : colorStore}>
                <SelectTrigger>
                  <SelectValue placeholder="Select color" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="black">
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full bg-black  mr-2"></div>
                      black
                    </div>
                  </SelectItem>
                  <SelectItem value="white">
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full bg-white border mr-2"></div>
                      white
                    </div>
                  </SelectItem>
                  <SelectItem value="red">
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full bg-red-500 mr-2"></div>
                      Red
                    </div>
                  </SelectItem>
                  <SelectItem value="blue">
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
                      Blue
                    </div>
                  </SelectItem>
                  <SelectItem value="green">
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
                      Green
                    </div>
                  </SelectItem>
                  {/* Add more color options as needed */}
                </SelectContent>
              </Select>
            </div>

            <Separator className="my-4" />
            <div>
              <Label htmlFor="size">Size</Label>
              <Select
                required
                onValueChange={(values) => {
                  setSize(values), setSizeStore(values);
                }}
                defaultValue={size ? size : sizeStore}>
                <SelectTrigger>
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="xs">
                    <div className="flex items-center">XS</div>
                  </SelectItem>
                  <SelectItem value="s">
                    <div className="flex items-center">S</div>
                  </SelectItem>
                  <SelectItem value="m">
                    <div className="flex items-center">M</div>
                  </SelectItem>
                  <SelectItem value="l">
                    <div className="flex items-center">L</div>
                  </SelectItem>
                  <SelectItem value="xl">
                    <div className="flex items-center">XL</div>
                  </SelectItem>
                  {/* Add more size options as needed */}
                </SelectContent>
              </Select>
            </div>

            <Separator className="my-4" />

            {/* Price filter */}
          </div>
        </div>

        <div className="w-full ">
          <h1 className="text-2xl font-bold mb-4">Products :</h1>
          {isLoading ? (
            <ProductSliderSkeleton items={6} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-x-2 gap-y-4">
              <>
                {productData?.length! > 0 ? (
                  productData?.map((product) => (
                    <div key={product.id} className="relative  p-2  ">
                      <div className="h-65 flex flex-col bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
                        <div className="absolute top-4 right-4 z-10">
                          <Button
                            onClick={() => {
                              addProduct({
                                id: product.id,
                                category: product.category,
                                color: product.color,
                                description: product.description,
                                title: product.title,
                                image: product.image,
                                price: product.price,
                                size: product.size,
                              });
                              toast.success("Product added successfully!", {
                                icon: (
                                  <CheckCircle className="text-yellow-500" />
                                ),
                              });
                            }}
                            size={"icon"}
                            className="bg-yellow-500 p-1 rounded-full text-white hover:bg-yellow-600 transition-colors duration-300">
                            <ShoppingCartIcon />
                          </Button>
                        </div>
                        <div className="absolute select-none top-4 left-4 z-10 flex space-x-2">
                          <span className="px-2 py-1 bg-white/80 text-gray-700 rounded-full text-xs font-medium backdrop-blur-sm">
                            {product.color}
                          </span>
                          <span className="px-2 py-1 bg-white/80 text-gray-700 rounded-full text-xs font-medium backdrop-blur-sm">
                            {product.size}
                          </span>
                        </div>
                        <Image
                          src={
                            product.image?.startsWith("https")
                              ? product.image
                              : TShirt
                          }
                          width={500}
                          height={500}
                          alt={product.title ? product.title : "product"}
                          className="object-cover w-full h-48 md:h-64 rounded-t-lg "
                        />
                        <Link
                          href={`/product/${product.id}`}
                          className="flex flex-col h-full p-4 group transition-all duration-300 hover:bg-gray-50 rounded-lg">
                          <div className="">
                            <h3 className="text-lg font-semibold text-gray-800   truncate group-hover:text-yellow-600 group-hover:underline-offset-4 group-hover:underline transition-colors duration-300 line-clamp-2 mb-2">
                              {product.title}
                            </h3>
                            <p className="text-sm text-gray-600 truncate mb-4">
                              {product.description}
                            </p>
                          </div>

                          <div className="flex items-center justify-between mt-auto">
                            <p className="text-lg font-bold text-yellow-600">
                              ${product.price ? product.price : "0.00"}
                            </p>
                            <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                              USD
                            </span>
                          </div>
                        </Link>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col col-span-3 w-full  mt-20 items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-16 w-16 "
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                      />
                    </svg>
                    <h3 className="mt-4 text-lg font-semibold ">
                      No results found
                    </h3>
                  </div>
                )}
              </>
            </div>
          )}
          <div className="  mt-5">
            <Pagination>
              <PaginationContent className="flex text-xs md:flex-row flex-col">
                {isCounting ? (
                  <div className="grid grid-cols-3  gap-x-3">
                    <Skeleton className="h-9 w-9" />
                    <Skeleton className="h-9 w-9" />
                    <Skeleton className="h-9 w-9" />
                  </div>
                ) : (
                  <>
                    {Array.from({ length: toatalPages }, (_, i) => i + 1).map(
                      (pageNumber) => (
                        <PaginationItem
                          key={pageNumber}
                          className={cn(
                            "mr-2 rounded-lg cursor-pointer transition-colors duration-300",
                            pageNumber === page
                              ? "bg-primary text-white"
                              : "bg-muted hover:bg-primary/50 text-muted-foreground hover:text-primary-foreground"
                          )}>
                          <PaginationLink
                            onClick={() => {
                              window.scrollTo({ top: 0, behavior: "smooth" });
                              setPage(pageNumber);
                              setPageStore(pageNumber);
                            }}
                            className="flex items-center justify-center w-8 h-8 rounded-lg">
                            {pageNumber}
                          </PaginationLink>
                        </PaginationItem>
                      )
                    )}
                  </>
                )}
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default ProductsPage;
