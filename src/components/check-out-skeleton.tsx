import React from "react";
import { Skeleton } from "./ui/skeleton";

const CkeckoutPageSkeleton = () => {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <Skeleton className="h-10 w-64 mb-12" />

        <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <div className="lg:col-span-7">
            <ul className="divide-y divide-gray-200 border-b border-t border-gray-200">
              {[...Array(3)].map((_, index) => (
                <li key={index} className="flex py-6 sm:py-10">
                  <div className="flex-shrink-0">
                    <Skeleton className="h-36 w-32 rounded" />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                      <div className="flex-1">
                        <Skeleton className="h-6 w-3/4 mb-2" />
                        <div className="flex flex-wrap gap-x-4 gap-y-2">
                          <Skeleton className="h-4 w-20" />
                          <Skeleton className="h-4 w-24" />
                          <Skeleton className="h-4 w-24" />
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        <div className="flex items-center gap-2">
                          <Skeleton className="h-6 w-6 rounded-full" />
                          <Skeleton className="h-6 w-8" />
                          <Skeleton className="h-6 w-6 rounded-full" />
                        </div>
                        <Skeleton className="h-4 w-16" />
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <section className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8 sticky top-20">
            <Skeleton className="h-6 w-32 mb-6" />

            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <div className="text-base font-medium justify-between items-center text-gray-900 flex flex-row w-full">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-5 w-24" />
                </div>
              </div>
            </div>
            <div className="mt-6">
              <Skeleton className="h-12 w-full rounded-md" />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CkeckoutPageSkeleton;
