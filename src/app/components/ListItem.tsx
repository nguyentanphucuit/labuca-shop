"use client";
import ProductDetails from "@/app/components/ProductDetails";
import {
  fetchFilteredSource,
  fetchSourcesPage,
  totalNumberSearchQuery,
} from "@/app/constants/common";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { ProductTypes } from "../types/common";
import Search from "../ui/search";
import Pagination from "./Pagination";
import ProductSkeleton from "./ProductSkeleton";

const ListItem = ({ items, loading }: { items: ProductTypes[]; loading: boolean }) => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const currentPage = searchParams.get("page") || 1;
  const sources = fetchFilteredSource(items, query, +currentPage) || null;

  const totalPages = fetchSourcesPage(items, query);
  const totalNumber = totalNumberSearchQuery(items, query);
  console.log(sources);

  const renderContent = () => {
    if (loading) {
      return (
        <>
          {[1, 2, 3, 4].map((index) => (
            <ProductSkeleton key={index} />
          ))}
        </>
      );
    }

    if (sources != null && sources.length === 0) {
      return <p className="col-span-full text-center">Không tìm thấy sản phẩm</p>;
    }

    return sources && sources.map((source) => <ProductDetails key={source.id} {...source} />);
  };

  return (
    <>
      <div className="flex items-center justify-center pt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div>
          <Suspense>
            <Search placeholder="Tìm kiếm ..." />
          </Suspense>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {renderContent()}
          </div>
          {!loading && sources && sources.length > 0 && (
            <Pagination totalNumber={totalNumber} totalPages={totalPages} />
          )}
        </div>
      </div>
    </>
  );
};

export default ListItem;
