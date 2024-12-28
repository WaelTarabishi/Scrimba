import ThankYouPageSkeleton from "@/components/thank-you-skeleton";
import { Suspense } from "react";

export default async function searchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Suspense fallback={<ThankYouPageSkeleton />}> {children}</Suspense>;
}
