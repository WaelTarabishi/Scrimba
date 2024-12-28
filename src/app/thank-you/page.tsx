import React from "react";
import { GetOrderById } from "../../../actions/product/get-order-by-id";
import Order from "@/components/order";

const page = async ({
  searchParams: { orderId },
}: {
  searchParams: { orderId: string };
}) => {
  const order = await GetOrderById(orderId);
  // console.log(order);
  //@ts-ignore
  return <Order order={order} />;
};

export default page;
