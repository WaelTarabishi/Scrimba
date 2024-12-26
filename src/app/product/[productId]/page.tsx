import { GetProductById } from "../../../../actions/get-product";
import ProductPage from "./_component/product-page";

const page = async ({
  params: { productId },
}: {
  params: { productId: string };
}) => {
  const product = await GetProductById(productId);
  return <ProductPage product={product} />;
};

export default page;
