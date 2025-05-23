import React from 'react';
import Link from 'next/link';
import { formatPriceVND } from '@/app/constants/common';
import Image, { StaticImageData } from 'next/image';
import { ProductTypes } from '../types/common';
import { Skeleton } from '@/components/ui/skeleton';

const ProductSkeleton = () => {
  return (
    <div className="max-w-72 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="w-64 h-64 flex flex-col items-center justify-center mx-auto">
        <Skeleton className="h-60 w-56 " />
      </div>
      <div className="p-5">
        <Skeleton className="py-1 w-32 h-6" />
        <Skeleton className="my-3 w-full h-6" />
        <div className="flex flex-row justify-between items-center">
          <Skeleton className="my-1 w-24 h-6" />
          <Skeleton className="my-1 w-24 h-6" />
        </div>
        <div className="flex flex-row justify-end mt-4">
          <Skeleton className="my-1 w-10 h-8" />
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
