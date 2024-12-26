import React from "react";
import { Skeleton } from "./ui/skeleton";

const ProductSliderSkeleton = () => {
  return (
    <div className="container mx-auto px-4 p-5 mt-5 w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="relative group p-2 cursor-pointer">
            <div className="h-65 flex flex-col bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
              <div className="absolute top-4 right-4 z-10">
                <Skeleton className="w-10 h-10 rounded-full" />
              </div>
              <Skeleton className="w-full h-48 md:h-64 rounded-t-lg" />
              <div className="flex flex-col p-4">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3 mb-2" />
                <div className="flex justify-between items-center mt-auto">
                  <Skeleton className="h-6 w-1/4" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSliderSkeleton;
