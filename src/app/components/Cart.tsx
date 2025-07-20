"use client";
import { Minus, Plus, ShoppingBag, Tag, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { formatPriceVND } from "../constants/common";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const router = useRouter();
  const { items, isCartOpen, setIsCartOpen, removeItem, updateQuantity, clearCart } = useCart();
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [voucherApplied, setVoucherApplied] = useState(false);
  const shippingFee = 20000;

  const total = items.reduce((sum, item) => {
    // If price is undefined, use 0 as default
    const price = item.price ?? 0;
    // If discount is undefined, use 0 as default
    const discount = item.discount ?? 0;
    const discountedPrice = (price * (100 - discount)) / 100;
    return sum + discountedPrice * item.quantity;
  }, 0);

  const finalTotal = voucherApplied ? total : total + shippingFee;

  const handleApplyVoucher = () => {
    setVoucherApplied(true);
  };

  const handleRemoveVoucher = () => {
    setVoucherApplied(false);
  };

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
                                    updateQuantity(
                                      item.id,
                                      Math.max(1, item.quantity - 1),
                                      item.color.name,
                                      item.size
                                    )
                                  }
                                  className="p-2 hover:bg-gray-100"
                                  disabled={item.quantity <= 1}
                                >
                                  <Minus className="w-4 h-4" />
                                </button>
                                <span className="px-4 py-2">{item.quantity}</span>
                                <button
                                  onClick={() =>
                                    updateQuantity(
                                      item.id,
                                      item.quantity + 1,
                                      item.color.name,
                                      item.size
                                    )
                                  }
                                  className="p-2 hover:bg-gray-100"
                                >
                                  <Plus className="w-4 h-4" />
                                </button>
                              </div>
                              <button
                                onClick={() => removeItem(item.id, item.color.name, item.size)}
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
                {/* Voucher Section */}
                <div className="mb-4 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-purple-600" />
                      <span className="text-sm font-medium text-gray-900">
                        Voucher miễn phí vận chuyển
                      </span>
                    </div>
                    {voucherApplied && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        Đã áp dụng
                      </span>
                    )}
                  </div>

                  {!voucherApplied ? (
                    <div className="space-y-2">
                      <p className="text-xs text-gray-600">Áp dụng cho đơn hàng từ 300.000 VND</p>
                      {total >= 300000 ? (
                        <button
                          onClick={handleApplyVoucher}
                          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium py-2 px-3 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
                        >
                          Áp dụng voucher
                        </button>
                      ) : (
                        <div className="text-xs text-gray-500 bg-gray-100 p-2 rounded">
                          Cần thêm {formatPriceVND(300000 - total)} để áp dụng voucher
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-green-700 font-medium">
                        Miễn phí vận chuyển
                      </span>
                      <button
                        onClick={handleRemoveVoucher}
                        className="text-xs text-red-600 hover:text-red-700 font-medium"
                      >
                        Hủy voucher
                      </button>
                    </div>
                  )}
                </div>

                {/* Price Summary */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm text-gray-600">
                    <p>Tạm tính</p>
                    <p>{formatPriceVND(total)}</p>
                  </div>

                  <div className="flex justify-between text-sm text-gray-600">
                    <p>Phí vận chuyển</p>
                    <p>
                      {voucherApplied ? (
                        <span className="text-green-600">Miễn phí</span>
                      ) : (
                        formatPriceVND(shippingFee)
                      )}
                    </p>
                  </div>

                  <div className="flex justify-between text-base font-medium text-gray-900 border-t pt-2">
                    <p>Tổng tiền</p>
                    <p>{formatPriceVND(finalTotal)}</p>
                  </div>
                </div>

                {/* Remove All Button */}
                <button
                  onClick={() => setShowClearConfirm(true)}
                  className="w-full mb-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg px-6 py-2 text-sm font-medium transition-colors"
                >
                  Xóa tất cả sản phẩm
                </button>

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

            {/* Clear Cart Confirmation Modal */}
            {showClearConfirm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl p-6 max-w-sm w-full mx-4">
                  <h3 className="text-lg font-semibold mb-2">Xác nhận xóa giỏ hàng</h3>
                  <p className="text-gray-600 mb-6">
                    Bạn có chắc chắn muốn xóa tất cả sản phẩm trong giỏ hàng không? Hành động này
                    không thể hoàn tác.
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowClearConfirm(false)}
                      className="flex-1 px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
                    >
                      Hủy
                    </button>
                    <button
                      onClick={() => {
                        clearCart();
                        setShowClearConfirm(false);
                      }}
                      className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
                    >
                      Xóa tất cả
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
