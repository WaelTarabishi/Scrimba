import React from "react";
import { GetProducts } from "../../../actions/get-products";
import ProductsClientComponent from "./products-client";

const Products = async () => {
  const products = await GetProducts();
  //   console.log(products);
  //@ts-ignore
  return <ProductsClientComponent products={products} />;
};

export default Products;
