import { GetProducts } from "../../../actions/get-products";
import ProductsClientComponent from "./products-client";

const Products = async () => {
  const products = await GetProducts();
  return <ProductsClientComponent products={products} />;
};

export default Products;
