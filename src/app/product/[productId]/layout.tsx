import { Suspense } from "react";
import ProductPageSkeleton from "./_component/product-page-skeleton";

export default async function searchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Suspense fallback={<ProductPageSkeleton />}> {children}</Suspense>;
}
