"use client";
import { ShoppingCartIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import TShirt from "../../../public/t-shirt.jpg";
import ProductSliderSkeleton from "../product-slider-skeleton";
import useProductStore from "@/store/products-store";
import { Button } from "../ui/button";

const ProductsClientComponent = ({ products }: ProductInterface) => {
  const { addProduct } = useProductStore();
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return <ProductSliderSkeleton />;
  return (
    <div className="container mx-auto px-4 p-5 mt-5 w-full">
      <Swiper
        dir="ltr"
        modules={[Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 3 },
        }}
        className="h-[450px] md:h-[550px]">
        {products &&
          products.map((product) => (
            <SwiperSlide key={product.id} className="relative group p-2  ">
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
                    }}
                    size={"icon"}
                    className="bg-yellow-500 p-1 rounded-full text-white hover:bg-yellow-600 transition-colors duration-300">
                    <ShoppingCartIcon />
                  </Button>
                </div>
                <div className="absolute top-4 left-4 z-10 flex space-x-2">
                  <span className="px-2 py-1 bg-white/80 text-gray-700 rounded-full text-xs font-medium backdrop-blur-sm">
                    {product.color}
                  </span>
                  <span className="px-2 py-1 bg-white/80 text-gray-700 rounded-full text-xs font-medium backdrop-blur-sm">
                    {product.size}
                  </span>
                </div>
                <Image
                  src={TShirt}
                  width={500}
                  height={500}
                  alt={product.title ? product.title : "product"}
                  className="object-cover w-full h-48 md:h-64 rounded-t-lg"
                />
                <Link
                  href={`/product/${product.id}`}
                  className="flex flex-col p-4 h-full ">
                  <h3 className="text-lg font-semibold hover:underline-offset-2 hover:underline text-gray-800 mb-2 line-clamp-1">
                    {product.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3 truncate">
                    {product.description}
                  </p>

                  <div className="mt-auto">
                    <p className="text-xl font-bold text-yellow-600">
                      <span className="text-sm font-normal text-gray-500 mr-1">
                        USD
                      </span>
                      {product.price ? product.price.toFixed(2) : 0}
                    </p>
                  </div>
                </Link>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default ProductsClientComponent;
