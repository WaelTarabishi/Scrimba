import { GetProducts } from "../../../actions/product/get-products";
import ProductsClientComponent from "./products-client";

const Products = async () => {
  const products = await GetProducts({take:10});
  return <ProductsClientComponent products={products} />;
};

export default Products;
