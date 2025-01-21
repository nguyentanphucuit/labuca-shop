"use client";
import React, { Suspense } from "react";
import SourceDetails from "@/app/components/SourceDetails";
import Search from "../ui/search";
import {
  fetchFilteredSource,
  fetchSourcesPage,
  totalNumberSearchQuery,
} from "@/app/constants/common";
import Pagination from "./Pagination";
import { useSearchParams } from "next/navigation";
import { ProductTypes } from "../types/common";

const ListItem = ({ items }: { items: ProductTypes[] }) => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const currentPage = searchParams.get("page") || 1;
  const sources = fetchFilteredSource(items, query, +currentPage) || [];

  const totalPages = fetchSourcesPage(items, query);
  const totalNumber = totalNumberSearchQuery(items, query);
  console.log(sources);

  return (
    <>
      <div className="pt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Suspense>
          <Search placeholder="Tìm kiếm ..." />
        </Suspense>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {sources.length > 0 ? (
            sources.map((source) => (
              <SourceDetails key={source.id} {...source} />
            ))
          ) : (
            <p>No sources found</p>
          )}
        </div>
        <Pagination totalNumber={totalNumber} totalPages={totalPages} />
      </div>
    </>
  );
};

export default ListItem;
