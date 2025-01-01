import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loading = () => {
  return (
    <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
        Admin Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Skeleton className="    text-white rounded-lg p-6 flex flex-col items-center justify-center    h-48" />
        <Skeleton className="text-white rounded-lg p-6 flex flex-col items-center justify-center h-48 " />
        <Skeleton className="text-white rounded-lg p-6 flex flex-col items-center justify-center h-48" />
        <Skeleton className="text-white rounded-lg p-6 flex flex-col items-center justify-center h-48" />
      </div>
    </div>
  );
};

export default Loading;
