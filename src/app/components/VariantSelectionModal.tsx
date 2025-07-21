"use client";
import { X } from "lucide-react";
import { useState } from "react";
import { PRODUCT_COLORS, isLightColor } from "../constants";
import { formatPriceVND } from "../constants/common";
import { useCart } from "../context/CartContext";

interface VariantSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: string;
    title: string;
    price: number;
    discount: number;
    imageUrl: string;
    size: string; // Comma-separated sizes
    color: string; // Will be converted to available colors
  };
}

export default function VariantSelectionModal({
  isOpen,
  onClose,
  product,
}: VariantSelectionModalProps) {
  // Parse colors from product data instead of using all global colors
  const availableColors = product.color
    ? product.color.split(",").map((colorName) => {
        const foundColor = PRODUCT_COLORS.find(
          (c) => c.name.toLowerCase() === colorName.trim().toLowerCase()
        );
        return foundColor || { name: colorName.trim(), value: "#ccc" };
      })
    : PRODUCT_COLORS.slice(0, 3); // fallback to first 3 colors

  const sizes = product.size.split(",").map((s) => s.trim());
  const discountedPrice = (product.price * (100 - product.discount)) / 100;

  const [selectedColor, setSelectedColor] = useState(availableColors[0]);
  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const [quantity, setQuantity] = useState(1);

  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      quantity: quantity,
      color: selectedColor,
      size: selectedSize,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />

      {/* Modal */}
      <div
        className="relative bg-white rounded-2xl max-w-md w-full mx-4 p-6 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Chọn tùy chọn sản phẩm</h2>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Product Info */}
        <div className="flex gap-4 mb-6">
          <div className="w-20 h-20 relative rounded-lg overflow-hidden bg-gray-100">
            <img
              src={product.imageUrl}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-gray-900 line-clamp-2">{product.title}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-lg font-semibold text-gray-900">
                {formatPriceVND(discountedPrice)}
              </span>
              {product.discount > 0 && (
                <span className="text-sm text-gray-400 line-through">
                  {formatPriceVND(product.price)}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Color Selection */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium">Màu sắc</span>
            <span className="text-sm text-gray-500">{selectedColor.name}</span>
          </div>
          <div className="flex gap-2">
            {availableColors.map((color) => (
              <button
                key={color.name}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedColor(color);
                }}
                className={`w-10 h-10 rounded-full border-2 transition-all ${
                  selectedColor.name === color.name
                    ? "border-black scale-110"
                    : "border-gray-300 hover:border-gray-400"
                }`}
                style={{ backgroundColor: color.value }}
                title={color.name}
              >
                {isLightColor(color.name) && (
                  <div className="w-full h-full rounded-full border border-gray-200" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Size Selection */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium">Kích cỡ</span>
            <span className="text-sm text-gray-500">{selectedSize}</span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedSize(size);
                }}
                className={`px-3 py-2 text-sm font-medium rounded-lg border transition-colors ${
                  selectedSize === size
                    ? "bg-black text-white border-black"
                    : "bg-white text-gray-900 border-gray-300 hover:border-gray-400"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity Selection */}
        <div className="mb-6">
          <span className="text-sm font-medium block mb-3">Số lượng</span>
          <div className="flex items-center border rounded-lg w-fit">
            <button
              className="px-4 py-2 text-gray-600 hover:text-black disabled:opacity-50"
              onClick={(e) => {
                e.stopPropagation();
                setQuantity(Math.max(1, quantity - 1));
              }}
              disabled={quantity <= 1}
            >
              -
            </button>
            <span className="px-4 py-2 text-center min-w-[3rem]">{quantity}</span>
            <button
              className="px-4 py-2 text-gray-600 hover:text-black"
              onClick={(e) => {
                e.stopPropagation();
                setQuantity(quantity + 1);
              }}
            >
              +
            </button>
          </div>
        </div>

        {/* Add to Cart Button */}
        {/*
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleAddToCart();
          }}
          className="w-full bg-black text-white rounded-lg px-6 py-3 text-sm font-medium hover:bg-gray-900 transition-colors"
        >
          Thêm vào giỏ hàng - {formatPriceVND(discountedPrice * quantity)}
        </button>
        */}
      </div>
    </div>
  );
}
