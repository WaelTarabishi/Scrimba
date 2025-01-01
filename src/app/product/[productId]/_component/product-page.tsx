"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
// import useProductStore from "@/store";
import MaxWidthWrapper from "@/lib/max-widht-wrapper";
import { cn } from "@/lib/utils";
import useProductStore from "@/store/products-store";
import Image from "next/image";
import toast from "react-hot-toast";
import TShirt from "../../../../../public/t-shirt.jpg";

interface Product {
  product: {
    id: string;
    title: string | null;
    price: number | null;
    color: string | null;
    size: string | null;
    category: string | null;
    description: string | null;
    image: string | null;
    createdAt: Date;
    updatedAt: Date;
  };
}

const ProductPage = ({ product }: Product) => {
  const { addProduct } = useProductStore();
  return (
    <MaxWidthWrapper className="bg-white">
      <div className="bg-white">
        <div className="mx-auto max-w-2xl  px-4 py-16 sm:px-16 sm:pb-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8  lg:px-8 ">
          {/* Product Details */}
          <div className="lg:max-w-lg lg:self-end">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink>{/* {t2("products")} */}</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="mt-4">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {product.title}
              </h1>
            </div>

            <section className="mt-4">
              <div className="flex items-center justify-between">
                <p className="text-2xl font-semibold text-gray-900">
                  {new Intl.NumberFormat("de-DE", {
                    style: "currency",
                    currency: "USD",
                  }).format(product.price ? product.price : 0)}
                </p>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-500">
                    Color:
                  </span>
                  <div
                    className="w-6 h-6 rounded-full border-2 border-gray-300"
                    style={{ backgroundColor: product.color || "gray" }}></div>
                </div>
              </div>

              <div className="mt-4">
                <span className="text-sm font-medium text-gray-500">Size:</span>
                <div className="mt-2 grid grid-cols-4 gap-2">
                  {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                    <Button
                      key={size}
                      variant={product.size === size ? "default" : "outline"}
                      className={cn(
                        "w-full",
                        product.size === size ? "default text-white" : ""
                      )}>
                      {size}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="mt-6 space-y-6">
                <p className="text-base text-gray-600">{product.description}</p>
              </div>
            </section>
          </div>

          <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
            <div className="aspect-square rounded-lg overflow-hidden">
              <Image
                src={
                  product.image?.startsWith("https") ? product.image : TShirt
                }
                alt={product.title || "product"}
                width={600}
                height={600}
                className="object-cover w-full h-full"
              />
            </div>
          </div>

          {/* add to cart part */}

          <div className=" lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
            <div>
              <div className="mt-10">
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
                      icon: <CheckCircle className="text-yellow-500" />,
                    });
                  }}
                  size={"lg"}
                  className="w-full text-white">
                  Add To Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default ProductPage;
