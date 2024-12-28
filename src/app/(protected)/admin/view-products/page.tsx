import { GetProducts } from "../../../../../actions/product/get-products";
import Products from "./_component/products";

const page = async () => {
  const products = await GetProducts();
  console.log(products);
  return <Products products={products} />;
};

export default page;
