import { GetOrders } from "../../../../../actions/product/get-orders";
import Orders from "./_components/orders";

const page = async () => {
  const orders = await GetOrders();
  //@ts-ignore
  return <Orders orders={orders} />;
};

export default page;
