// Product Detail Skeleton Component
const ProductDetailSkeleton = () => (
  <div className="flex flex-col gap-8 py-8">
    <style jsx>{`
      @keyframes shimmer {
        0% {
          background-position: -200px 0;
        }
        100% {
          background-position: calc(200px + 100%) 0;
        }
      }
      @keyframes wave {
        0%,
        100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-4px);
        }
      }
      @keyframes pulse-scale {
        0%,
        100% {
          transform: scale(1);
          opacity: 1;
        }
        50% {
          transform: scale(1.05);
          opacity: 0.8;
        }
      }
      @keyframes fade-in-out {
        0%,
        100% {
          opacity: 0.6;
        }
        50% {
          opacity: 1;
        }
      }
      .shimmer {
        background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
        background-size: 200px 100%;
        animation: shimmer 1.5s infinite;
      }
      .shimmer-fast {
        background: linear-gradient(90deg, #f5f5f5 25%, #e8e8e8 50%, #f5f5f5 75%);
        background-size: 150px 100%;
        animation: shimmer 1s infinite;
      }
      .shimmer-slow {
        background: linear-gradient(90deg, #f8f8f8 25%, #eeeeee 50%, #f8f8f8 75%);
        background-size: 250px 100%;
        animation: shimmer 2s infinite;
      }
      .wave {
        animation: wave 2s ease-in-out infinite;
      }
      .pulse-scale {
        animation: pulse-scale 2s ease-in-out infinite;
      }
      .fade {
        animation: fade-in-out 2s ease-in-out infinite;
      }
      .delay-100 {
        animation-delay: 0.1s;
      }
      .delay-200 {
        animation-delay: 0.2s;
      }
      .delay-300 {
        animation-delay: 0.3s;
      }
      .delay-400 {
        animation-delay: 0.4s;
      }
      .delay-500 {
        animation-delay: 0.5s;
      }
      .delay-600 {
        animation-delay: 0.6s;
      }
      .delay-700 {
        animation-delay: 0.7s;
      }
      .delay-800 {
        animation-delay: 0.8s;
      }
    `}</style>

    {/* Breadcrumb skeleton with staggered animation */}
    <div className="flex items-center gap-2">
      <div className="h-4 shimmer-fast rounded w-16 wave delay-100"></div>
      <div className="h-4 shimmer rounded w-1 delay-200"></div>
      <div className="h-4 shimmer-fast rounded w-12 wave delay-300"></div>
      <div className="h-4 shimmer rounded w-1 delay-400"></div>
      <div className="h-4 shimmer-fast rounded w-32 wave delay-500"></div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Left Column - Image Gallery Skeleton */}
      <div className="flex flex-col gap-4">
        {/* Main image skeleton with wave effect */}
        <div className="aspect-square shimmer-slow rounded-lg pulse-scale delay-200"></div>

        {/* Thumbnails skeleton with staggered wave */}
        <div className="flex gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`aspect-square w-40 shimmer rounded-lg flex-shrink-0 wave delay-${i * 100 + 100}`}
            ></div>
          ))}
        </div>
      </div>

      {/* Right Column - Product Info Skeleton */}
      <div className="flex flex-col gap-6">
        {/* Title skeleton with dynamic heights */}
        <div className="space-y-3">
          <div className="h-12 shimmer-fast rounded-lg w-4/5 pulse-scale delay-300"></div>
          <div className="h-6 shimmer rounded w-2/3 fade delay-400"></div>
        </div>

        {/* Rating skeleton with individual star animations */}
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className={`w-5 h-5 shimmer-fast rounded wave delay-${i * 100}`}></div>
            ))}
          </div>
          <div className="h-4 shimmer rounded w-16 fade delay-600"></div>
        </div>

        {/* Price skeleton with emphasis effect */}
        <div className="flex items-center gap-4">
          <div className="h-10 shimmer-fast rounded-lg w-36 pulse-scale delay-200"></div>
          <div className="h-6 shimmer rounded w-28 fade delay-400"></div>
          <div className="h-7 shimmer-fast rounded-full w-20 wave delay-600"></div>
        </div>

        {/* Description skeleton with varying lines */}
        <div className="space-y-2">
          <div className="h-4 shimmer rounded w-full fade delay-100"></div>
          <div className="h-4 shimmer rounded w-4/5 fade delay-200"></div>
          <div className="h-4 shimmer rounded w-3/5 fade delay-300"></div>
        </div>

        {/* Color Selection skeleton with circular animations */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="h-5 shimmer-fast rounded w-28 wave delay-100"></div>
            <div className="h-4 shimmer rounded w-16 fade delay-300"></div>
          </div>
          <div className="flex gap-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className={`w-12 h-12 shimmer-fast rounded-full pulse-scale delay-${i * 150}`}
              ></div>
            ))}
          </div>
        </div>

        {/* Size Selection skeleton with button animations */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="h-5 shimmer-fast rounded w-24 wave delay-200"></div>
            <div className="h-4 shimmer rounded w-12 fade delay-400"></div>
          </div>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className={`w-14 h-11 shimmer rounded-lg wave delay-${i * 100 + 200}`}
              ></div>
            ))}
          </div>
        </div>

        {/* Quantity and Add to Cart skeleton with emphasis */}
        <div className="flex gap-4">
          <div className="w-36 h-14 shimmer rounded-lg pulse-scale delay-300"></div>
          <div className="flex-1 h-14 shimmer-fast rounded-lg pulse-scale delay-500"></div>
        </div>
      </div>
    </div>

    {/* Product Details Tabs skeleton with wave effect */}
    <div className="mt-12">
      <div className="border-b border-gray-200">
        <div className="flex gap-8">
          {["Chi tiết sản phẩm", "Đánh giá", "FAQs"].map((label, i) => (
            <div
              key={i}
              className={`h-7 shimmer-fast rounded w-${label.length > 10 ? "32" : "24"} mb-4 wave delay-${i * 200 + 100}`}
            ></div>
          ))}
        </div>
      </div>

      {/* Tab content skeleton with dynamic content */}
      <div className="py-6 space-y-8">
        {/* Product specifications skeleton */}
        <div>
          <div className="h-7 shimmer-fast rounded-lg w-44 mb-4 pulse-scale delay-100"></div>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-4">
                <div className={`h-5 shimmer rounded w-36 fade delay-${i * 100}`}></div>
                <div className={`h-5 shimmer-fast rounded w-28 wave delay-${i * 100 + 200}`}></div>
              </div>
            ))}
          </div>
        </div>

        {/* Features skeleton with checkmark shapes */}
        <div>
          <div className="h-7 shimmer-fast rounded-lg w-40 mb-4 pulse-scale delay-300"></div>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <div className={`w-6 h-6 shimmer-fast rounded-full wave delay-${i * 150}`}></div>
                <div className={`h-5 shimmer rounded flex-1 fade delay-${i * 150 + 100}`}></div>
              </div>
            ))}
          </div>
        </div>

        {/* Care instructions skeleton with bullet points */}
        <div>
          <div className="h-7 shimmer-fast rounded-lg w-48 mb-4 pulse-scale delay-500"></div>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-start gap-3">
                <div
                  className={`w-3 h-3 shimmer-fast rounded-full mt-1 wave delay-${i * 100}`}
                ></div>
                <div className="flex-1 space-y-2">
                  <div className={`h-5 shimmer rounded w-full fade delay-${i * 100 + 100}`}></div>
                  <div className={`h-5 shimmer rounded w-4/5 fade delay-${i * 100 + 200}`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ProductDetailSkeleton;
