import { GetProductById } from "../../../../actions/product/get-product";
import ProductPage from "./_component/product-page";

export async function generateMetadata({
  params: { productId },
}: {
  params: { productId: string };
}) {
  const product = await GetProductById(productId);

  return {
    keywords: [product.title, "product", "category", "brand"],
    title: product.title,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/product/${product.id}`,
      images: [{ url: product.image }],
    },
    twitter: {
      card: "summary_large_image",
      title: product.title,
      description: product.description,
      images: [product.image],
    },
  };
}

const page = async ({
  params: { productId },
}: {
  params: { productId: string };
}) => {
  const product = await GetProductById(productId);
  return <ProductPage product={product} />;
};

export default page;
