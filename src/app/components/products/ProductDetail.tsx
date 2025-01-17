import React from "react";
import ProductPage from "@/app/products/page";
import { ProductDetailProps } from "@/app/types/common";
import { listItems } from "@/app/constants/index";
2;
const ProductDetail = ({ title }: { title: string }) => {
  const id = listItems.findIndex(
    (product) => product.href.toLowerCase() === title.toLowerCase()
  );

  return id === -1 ? (
    <ProductPage />
  ) : (
    <ProductDetailTemplate {...listItems[id]} />
  );
};

const ProductDetailTemplate = ({ ...props }: ProductDetailProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className=" text-slate-700 dark:text-slate-400">{props.date}</div>
      <div className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-200 md:text-3xl">
        {props.title}
      </div>
      {props.content}
    </div>
  );
};

export default ProductDetail;
