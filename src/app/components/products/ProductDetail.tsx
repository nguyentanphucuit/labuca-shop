import { useProductBySlug } from "@/app/hooks/useProducts";
import ProductDetailSkeleton from "../ProductDetailSkeleton";
import ProductDetailTemplate from "../ProductDetailTemplate";

const ProductDetail = ({ title }: { title: string }) => {
  const { product, loading, error } = useProductBySlug(title);

  if (loading) {
    return <ProductDetailSkeleton />;
  }

  if (error || !product) {
    return <ProductDetailTemplate error={error || "Product not found"} {...({} as any)} />;
  }

  console.log("🔍 Product Detail Data:", { title, product });
  return <ProductDetailTemplate {...product} />;
};

export default ProductDetail;
