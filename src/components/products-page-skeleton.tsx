import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MaxWidthWrapper from "@/lib/max-widht-wrapper";
import { cn } from "@/lib/utils";
import ProductSliderSkeleton from "./product-slider-skeleton";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
const ProductsPageSkeleton = () => {
  return (
    <MaxWidthWrapper className="mx-auto w-full max-w-screen-2xl px-2.5 my-10 md:px1-0 xl:px-24">
      <div className={`flex flex-col xl:flex-row  gap-x-4 h-full        `}>
        <div className={`w-full md:h-full md:w-1/3  mt-14  sticky top-28  `}>
          <div className="border rounded-md bg-card p-4 shadow-lg">
            <h2 className={cn("text-xl font-semibold mb-4")}>Filters</h2>

            <Separator className="my-4" />

            {/* Color filter */}
            <div>
              <Label htmlFor="color">Color</Label>
              <Select required>
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
              <Select required>
                <SelectTrigger>
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="xs">
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full bg-gray-400 mr-2"></div>
                      XS
                    </div>
                  </SelectItem>
                  <SelectItem value="s">
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full bg-gray-500 mr-2"></div>
                      S
                    </div>
                  </SelectItem>
                  <SelectItem value="m">
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full bg-gray-600 mr-2"></div>
                      M
                    </div>
                  </SelectItem>
                  <SelectItem value="l">
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full bg-gray-700 mr-2"></div>
                      L
                    </div>
                  </SelectItem>
                  <SelectItem value="xl">
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full bg-gray-800 mr-2"></div>
                      XL
                    </div>
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

          <ProductSliderSkeleton items={6} />
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default ProductsPageSkeleton;
