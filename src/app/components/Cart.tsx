"use client";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { formatPriceVND } from "../constants/common";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const router = useRouter();
  const { items, isCartOpen, setIsCartOpen, removeItem, updateQuantity } = useCart();

  const total = items.reduce((sum, item) => {
    // If price is undefined, use 0 as default
    const price = item.price ?? 0;
    // If discount is undefined, use 0 as default
    const discount = item.discount ?? 0;
    const discountedPrice = (price * (100 - discount)) / 100;
    return sum + discountedPrice * item.quantity;
  }, 0);

  return (
    <div className={`fixed inset-0 z-50 ${isCartOpen ? "visible" : "invisible"}`}>
      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-300 ${
          isCartOpen ? "opacity-50" : "opacity-0"
        }`}
        onClick={() => setIsCartOpen(false)}
      />

      {/* Cart Panel */}
      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div
          className={`w-screen max-w-md transform transition-transform duration-500 ease-in-out ${
            isCartOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-6 border-b">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-6 h-6" />
                <h2 className="text-lg font-semibold">Giỏ hàng của bạn</h2>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto py-6 px-4">
              {items.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingBag className="w-12 h-12 mx-auto text-gray-400" />
                  <p className="mt-4 text-gray-500">Giỏ hàng của bạn đang trống</p>
                </div>
              ) : (
                <ul className="divide-y divide-gray-200 list-none">
                  {items.map((item) => {
                    const price = item.price ?? 0;
                    const discount = item.discount ?? 0;
                    const discountedPrice = (price * (100 - discount)) / 100;
                    return (
                      <li key={`${item.id}-${item.color.name}-${item.size}`} className="py-6">
                        <div className="flex items-center">
                          {/* Product Image */}
                          <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
                            <Image
                              src={item.imageUrl ?? ""}
                              alt={item.title ?? "Product"}
                              fill
                              className="object-cover object-center"
                            />
                          </div>

                          {/* Product Details */}
                          <div className="ml-4 flex flex-1 flex-col">
                            <div className="flex justify-between">
                              <div>
                                <h3 className="font-medium text-sm text-gray-900 line-clamp-2">
                                  {item.title ?? "Product"}
                                </h3>
                                <p className="mt-1 text-sm text-gray-500">Màu: {item.color.name}</p>
                                <p className="mt-1 text-sm text-gray-500">Size: {item.size}</p>
                              </div>
                              <p className="text-sm font-medium text-gray-900">
                                {formatPriceVND(discountedPrice * item.quantity)}
                              </p>
                            </div>

                            {/* Quantity and Remove */}
                            <div className="flex items-center justify-between mt-4">
                              <div className="flex items-center border rounded-lg">
                                <button
                                  onClick={() =>
                                    updateQuantity(item.id, Math.max(1, item.quantity - 1))
                                  }
                                  className="p-2 hover:bg-gray-100"
                                  disabled={item.quantity <= 1}
                                >
                                  <Minus className="w-4 h-4" />
                                </button>
                                <span className="px-4 py-2">{item.quantity}</span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="p-2 hover:bg-gray-100"
                                >
                                  <Plus className="w-4 h-4" />
                                </button>
                              </div>
                              <button
                                onClick={() => removeItem(item.id)}
                                className="text-sm font-medium text-red-600 hover:text-red-500"
                              >
                                Xóa
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-gray-200 px-4 py-6">
                <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                  <p>Tổng tiền</p>
                  <p>{formatPriceVND(total)}</p>
                </div>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    router.push("/checkout");
                  }}
                  className="w-full bg-black text-white rounded-lg px-6 py-3 text-sm font-medium hover:bg-gray-900"
                >
                  Thanh toán
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
