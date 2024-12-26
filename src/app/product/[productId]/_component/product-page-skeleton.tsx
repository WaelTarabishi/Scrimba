import { Skeleton } from "@/components/ui/skeleton";
import MaxWidthWrapper from "@/lib/max-widht-wrapper";

const ProductPageSkeleton = () => {
  return (
    <MaxWidthWrapper className="bg-white">
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-16 sm:pb-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          {/* Product Details */}
          <div className="lg:max-w-lg lg:self-end">
            <Skeleton className="h-6 w-40 mb-4" />

            <Skeleton className="h-10 w-3/4 mb-4" />

            <div className="mt-4">
              <Skeleton className="h-8 w-full mb-4" />
            </div>

            <section className="mt-4">
              <div className="flex items-center justify-between mb-4">
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-6 w-6 rounded-full" />
              </div>

              <Skeleton className="h-6 w-20 mb-2" />
              <div className="grid grid-cols-4 gap-2">
                {[...Array(6)].map((_, index) => (
                  <Skeleton key={index} className="h-10 w-full" />
                ))}
              </div>

              <div className="mt-6 space-y-6">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/6" />
              </div>
            </section>
          </div>

          {/* Product Image */}
          <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
            <Skeleton className="aspect-square rounded-lg w-full" />
          </div>

          {/* Add to Cart Button */}
          <div className="lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
            <div className="mt-10">
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default ProductPageSkeleton;
