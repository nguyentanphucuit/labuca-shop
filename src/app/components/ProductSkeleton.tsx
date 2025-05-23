import { Skeleton } from "@/components/ui/skeleton";

const ProductSkeleton = () => {
  return (
    <div className="w-96 max-w-72 bg-white border border-gray-200 rounded-2xl shadow overflow-hidden">
      {/* Image Container */}
      <div className="aspect-[4/5] relative">
        <Skeleton className="absolute inset-0" />
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        {/* Title */}
        <Skeleton className="h-10 w-full" />

        {/* Price and Discount */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-5 w-20" />
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
