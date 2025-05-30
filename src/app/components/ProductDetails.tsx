import { formatPriceVND } from "@/app/constants/common";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ProductTypes } from "../types/common";
import VariantSelectionModal from "./VariantSelectionModal";

const ProductDetails = ({
  id,
  imageUrl,
  title,
  typeLabel,
  href,
  price,
  discount,
  size,
  color,
}: ProductTypes) => {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [showVariantModal, setShowVariantModal] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowVariantModal(true);
  };

  const discountedPrice = (price * (100 - discount)) / 100;

  return (
    <>
      <Link
        href={href}
        className="block group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative max-w-80 rounded-2xl overflow-hidden bg-gradient-to-br from-white to-gray-50 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300">
          {/* Image Container */}
          <div className="aspect-[4/5] relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Image
              src={imageUrl}
              alt={title}
              fill
              className={`
                object-cover object-center transform 
                transition-all duration-700 ease-out
                ${isHovered ? "scale-110" : "scale-100"}
                ${isImageLoading ? "opacity-0 blur-2xl" : "opacity-100 blur-0"}
              `}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
              onLoadingComplete={() => setIsImageLoading(false)}
            />
            {isImageLoading && <div className="absolute inset-0 bg-gray-100 animate-pulse" />}

            {/* Floating Action Button */}
            <button
              onClick={handleAddToCart}
              className={`
                absolute bottom-4 right-4 z-20 
                flex items-center gap-2 px-4 py-2.5
                bg-gradient-to-r from-[#B14BF4] to-[#F364D7] rounded-full
                text-sm font-medium text-white
                transform transition-all duration-300
                hover:shadow-[0_8px_20px_rgb(177,75,244,0.3)]
                hover:translate-y-[-2px]
                active:scale-95
                ${isHovered ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}
              `}
            >
              <span className="relative top-px">Thêm vào giỏ</span>
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </button>

            {/* Labels */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-20">
              {typeLabel && (
                <span className="px-3 py-1 text-xs font-medium text-white bg-[#B14BF4]/90 backdrop-blur-md rounded-full shadow-sm">
                  {typeLabel}
                </span>
              )}
              {discount > 0 && (
                <span className="px-3 py-1 text-xs font-medium text-white bg-red-500/90 backdrop-blur-md rounded-full shadow-sm">
                  -{discount}%
                </span>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-700 line-clamp-2 min-h-[40px] group-hover:text-[#B14BF4] transition-colors duration-300">
              {title}
            </h3>

            <div className="mt-2 flex items-center gap-2">
              <span className="text-base font-semibold text-gray-900">
                {formatPriceVND(discountedPrice)}
              </span>
              {discount > 0 && (
                <span className="text-xs text-gray-400 line-through">{formatPriceVND(price)}</span>
              )}
            </div>
          </div>
        </div>
      </Link>

      {/* Variant Selection Modal - Outside Link to prevent event bubbling */}
      <VariantSelectionModal
        isOpen={showVariantModal}
        onClose={() => setShowVariantModal(false)}
        product={{
          id,
          title,
          price,
          discount,
          imageUrl,
          size,
          color,
        }}
      />
    </>
  );
};

export default ProductDetails;
