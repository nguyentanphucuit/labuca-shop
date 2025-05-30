"use client";
import ProductDetail from "@/app/components/products/ProductDetail";

import { usePathname } from "next/navigation";

const ProductDetailsTemplate = () => {
  const pathname = usePathname();
  const slug = pathname.split("/").pop();

  return (
    <div className="max-h-max w-full mx-auto max-w-7xl px-6 lg:px-8">
      <ProductDetail title={slug || ""} />
    </div>
  );
};

export default ProductDetailsTemplate;
