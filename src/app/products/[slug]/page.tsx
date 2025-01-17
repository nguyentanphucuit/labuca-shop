"use client";
import ProductDetail from "@/app/components/products/ProductDetail";

import { usePathname } from "next/navigation";

const ProductDetailsTemplate = () => {
  const pathname = usePathname();
  const slug = pathname;

  return (
    <div className="max-h-max w-full pt-12 mx-auto max-w-7xl px-6 lg:px-8">
      <ProductDetail title={slug || ""} />
    </div>
  );
};

export default ProductDetailsTemplate;
