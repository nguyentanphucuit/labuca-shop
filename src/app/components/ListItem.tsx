"use client";
import ProductDetails from "@/app/components/ProductDetails";
import {
  fetchFilteredSource,
  fetchSourcesPage,
  totalNumberSearchQuery,
} from "@/app/constants/common";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo } from "react";
import { ProductTypes } from "../types/common";
import Search from "../ui/search";
import Pagination from "./Pagination";
import ProductSkeleton from "./ProductSkeleton";

interface ListItemProps {
  items: ProductTypes[];
  loading: boolean;
  error?: string | null;
}

const ListItem = ({ items, loading, error }: ListItemProps) => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const currentPage = Number(searchParams.get("page")) || 1;

  // Memoize filtered data to avoid recalculation on every render
  const { filteredSources, totalPages, totalNumber } = useMemo(() => {
    if (!items || items.length === 0) {
      return { filteredSources: [], totalPages: 0, totalNumber: 0 };
    }

    const sources = fetchFilteredSource(items, query, currentPage);
    const pages = fetchSourcesPage(items, query);
    const total = totalNumberSearchQuery(items, query);

    return {
      filteredSources: sources || [],
      totalPages: pages,
      totalNumber: total,
    };
  }, [items, query, currentPage]);

  // Log data for debugging
  useEffect(() => {
    console.log("📊 ListItem Data:", {
      totalItems: items?.length || 0,
      filteredItems: filteredSources.length,
      query,
      currentPage,
      loading,
      error,
    });
  }, [items, filteredSources, query, currentPage, loading, error]);

  const renderContent = () => {
    // Loading state
    if (loading) {
      return (
        <>
          {Array.from({ length: 8 }, (_, index) => (
            <ProductSkeleton key={`skeleton-${index}`} />
          ))}
        </>
      );
    }

    // Error state
    if (error) {
      return (
        <div className="col-span-full text-center py-12">
          <div className="text-red-500 mb-2">⚠️ Có lỗi xảy ra</div>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Thử lại
          </button>
        </div>
      );
    }

    // No items state
    if (!items || items.length === 0) {
      return (
        <div className="col-span-full text-center py-12">
          <div className="text-gray-400 mb-2">📦</div>
          <p className="text-gray-600">Chưa có sản phẩm nào</p>
        </div>
      );
    }

    // No filtered results state
    if (filteredSources.length === 0 && query) {
      return (
        <div className="col-span-full text-center py-12">
          <div className="text-gray-400 mb-2">🔍</div>
          <p className="text-gray-600">Không tìm thấy sản phẩm cho "{query}"</p>
          <p className="text-sm text-gray-500 mt-2">Hãy thử tìm kiếm với từ khóa khác</p>
        </div>
      );
    }

    // Render products
    return filteredSources.map((product) => (
      <ProductDetails key={`product-${product.id}`} {...product} />
    ));
  };

  return (
    <div className="flex items-center justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="w-full">
        {/* Search Section */}
        <div className="mb-8">
          <Suspense fallback={<div className="h-12 bg-gray-200 rounded animate-pulse" />}>
            <Search placeholder="Tìm kiếm sản phẩm..." />
          </Suspense>
        </div>

        {/* Results Summary */}
        {!loading && items && items.length > 0 && (
          <div className="mb-6 text-sm text-gray-600">
            {query ? (
              <p>
                Tìm thấy <span className="font-medium">{totalNumber}</span> sản phẩm cho "{query}"
              </p>
            ) : (
              <p>
                Hiển thị <span className="font-medium">{items.length}</span> sản phẩm
              </p>
            )}
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {renderContent()}
        </div>

        {/* Pagination */}
        {!loading && !error && totalPages > 1 && (
          <Pagination totalNumber={totalNumber} totalPages={totalPages} />
        )}
      </div>
    </div>
  );
};

export default ListItem;
