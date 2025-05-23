'use client';
import React, { Suspense } from 'react';
import SourceDetails from '@/app/components/ProductDetails';
import Search from '../ui/search';
import {
  fetchFilteredSource,
  fetchSourcesPage,
  totalNumberSearchQuery,
} from '@/app/constants/common';
import Pagination from './Pagination';
import { useSearchParams } from 'next/navigation';
import { ProductTypes } from '../types/common';
import ProductSkeleton from './ProductSkeleton';
import ProductDetails from '@/app/components/ProductDetails';

const ListItem = ({ items, loading }: { items: ProductTypes[]; loading: boolean }) => {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';
  const currentPage = searchParams.get('page') || 1;
  const sources = fetchFilteredSource(items, query, +currentPage) || [];

  const totalPages = fetchSourcesPage(items, query);
  const totalNumber = totalNumberSearchQuery(items, query);
  console.log(sources);

  return (
    <>
      <div className="flex items-center justify-center pt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div>
          <Suspense>
            <Search placeholder="Tìm kiếm ..." />
          </Suspense>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {loading ? (
              <>
                {[1, 2, 3, 4].map(index => (
                  <ProductSkeleton key={index} />
                ))}
              </>
            ) : sources.length > 0 ? (
              sources.map(source => <ProductDetails key={source.id} {...source} />)
            ) : (
              <p className="col-span-full text-center">Không có sản phẩm</p>
            )}
          </div>
          <Pagination totalNumber={totalNumber} totalPages={totalPages} />
        </div>
      </div>
    </>
  );
};

export default ListItem;
