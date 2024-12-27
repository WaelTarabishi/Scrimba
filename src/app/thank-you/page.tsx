import React from "react";
import { GetOrderById } from "../../../actions/get-order-by-id";

const page = async ({
  searchParams: { orderId },
}: {
  searchParams: { orderId: string };
}) => {
  const order = await GetOrderById(orderId);
  // console.log(order, "order");
  return <div>page</div>;
};

export default page;
