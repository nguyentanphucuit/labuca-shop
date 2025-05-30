"use client";

import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { formatPriceVND } from "../constants/common";
import { useCart } from "../context/CartContext";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clearCart } = useCart();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    note: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check if cart is empty

  // If cart is empty, show loading or redirect
  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="mb-8">
          <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto" />
        </div>
        <h1 className="text-2xl font-bold mb-4">Giỏ hàng trống</h1>
        <p className="text-gray-600 mb-8">
          Vui lòng thêm sản phẩm vào giỏ hàng trước khi thanh toán.
        </p>
        <button
          onClick={() => router.push("/")}
          className="inline-block bg-black text-white rounded-lg px-6 py-3 text-sm font-medium hover:bg-gray-900 transition-colors"
        >
          Tiếp tục mua sắm
        </button>
      </div>
    );
  }

  const total = items.reduce((sum, item) => {
    const price = item.price ?? 0;
    const discount = item.discount ?? 0;
    const discountedPrice = (price * (100 - discount)) / 100;
    return sum + discountedPrice * item.quantity;
  }, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Double check if cart is empty
    if (items.length === 0) {
      setError("Vui lòng thêm sản phẩm vào giỏ hàng trước khi thanh toán.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Format order items for email (plain text)
      const orderItems = items
        .map((item) => {
          const price = item.price ?? 0;
          const discount = item.discount ?? 0;
          const discountedPrice = (price * (100 - discount)) / 100;
          return `
          - ${item.title}
            Màu: ${item.color.name}
            Size: ${item.size}
            Số lượng: ${item.quantity}
            Giá: ${formatPriceVND(discountedPrice * item.quantity)}
        `;
        })
        .join("\n");

      // Format order items for email (HTML)
      const orderItemsHtml = items
        .map((item) => {
          const price = item.price ?? 0;
          const discount = item.discount ?? 0;
          const discountedPrice = (price * (100 - discount)) / 100;
          return `<tr>
          <td style='padding:8px 0;border-bottom:1px solid #eee;'>${item.title}</td>
          <td style='padding:8px 0;border-bottom:1px solid #eee;'>${item.color.name}</td>
          <td style='padding:8px 0;border-bottom:1px solid #eee;'>${item.size}</td>
          <td style='padding:8px 0;border-bottom:1px solid #eee;text-align:center;'>${item.quantity}</td>
          <td style='padding:8px 0;border-bottom:1px solid #eee;text-align:right;'>${formatPriceVND(discountedPrice * item.quantity)}</td>
        </tr>`;
        })
        .join("");

      // Customer email HTML
      const customerEmailHtml = `
        <div style="font-family:sans-serif;max-width:600px;margin:auto;color:#222;">
          <h2 style="color:#7c3aed;">Labuca Shop</h2>
          <p>Xin chào <b>${formData.fullName}</b>,</p>
          <p>Cảm ơn bạn đã đặt hàng tại Labuca Shop. Dưới đây là thông tin đơn hàng của bạn:</p>
          <h3 style="margin-top:32px;">Chi tiết đơn hàng:</h3>
          <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
            <thead>
              <tr style="background:#f3f4f6;">
                <th align="left" style="padding:8px 0;">Sản phẩm</th>
                <th align="left" style="padding:8px 0;">Màu</th>
                <th align="left" style="padding:8px 0;">Size</th>
                <th align="center" style="padding:8px 0;">SL</th>
                <th align="right" style="padding:8px 0;">Giá</th>
              </tr>
            </thead>
            <tbody>
              ${orderItemsHtml}
            </tbody>
          </table>
          <h3>Thông tin giao hàng:</h3>
          <ul style="margin-bottom:24px;">
            <li><b>Họ và tên:</b> ${formData.fullName}</li>
            <li><b>Số điện thoại:</b> ${formData.phone}</li>
            <li><b>Địa chỉ:</b> ${formData.address}</li>
            <li><b>Thành phố:</b> ${formData.city}</li>
            ${formData.note ? `<li><b>Ghi chú:</b> ${formData.note}</li>` : ""}
          </ul>
          <div style="font-size:18px;margin-bottom:32px;"><b>Tổng tiền:</b> <span style="color:#7c3aed;">${formatPriceVND(total)}</span></div>
          <p style="color:#666;">Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất để xác nhận đơn hàng.<br>Cảm ơn bạn đã tin tưởng Labuca Shop!</p>
        </div>
      `;

      // Send email to admin (plain text only for now)
      const adminResponse = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: process.env.NEXT_PUBLIC_EMAIL_USER,
          subject: `Đơn hàng mới từ ${formData.fullName}`,
          text: `Đơn hàng mới từ ${formData.fullName}\n\n${orderItems}\n\nThông tin: ${formData.fullName}, ${formData.phone}, ${formData.address}, ${formData.city}`,
        }),
      });

      // Send email to customer (HTML and plain text)
      const customerResponse = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: formData.email,
          subject: "Xác nhận đơn hàng - Labuca Shop",
          text: `Xin chào ${formData.fullName},\n\nCảm ơn bạn đã đặt hàng tại Labuca Shop. Dưới đây là thông tin đơn hàng của bạn:\n\n${orderItems}\n\nThông tin giao hàng: ${formData.fullName}, ${formData.phone}, ${formData.address}, ${formData.city}\n\nTổng tiền: ${formatPriceVND(total)}`,
          html: customerEmailHtml,
        }),
      });

      if (!adminResponse.ok || !customerResponse.ok) {
        throw new Error("Không thể gửi đơn hàng. Vui lòng thử lại sau.");
      }

      // Save order to Firestore
      await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          user: formData,
          total,
        }),
      });

      clearCart();
      router.push("/checkout/success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Có lỗi xảy ra. Vui lòng thử lại sau.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Thanh toán</h1>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Order Summary - Now on the left */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Đơn hàng của bạn</h2>
          <div className="space-y-6">
            {items.map((item) => {
              const price = item.price ?? 0;
              const discount = item.discount ?? 0;
              const discountedPrice = (price * (100 - discount)) / 100;
              return (
                <div
                  key={`${item.id}-${item.color.name}-${item.size}`}
                  className="flex gap-4 items-start"
                >
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
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-gray-600">
                          {item.color.name} - {item.size}
                        </p>
                        <p className="text-sm text-gray-600">Số lượng: {item.quantity}</p>
                      </div>
                      <p className="font-medium">
                        {formatPriceVND(discountedPrice * item.quantity)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between font-bold text-lg">
                <p>Tổng tiền</p>
                <p>{formatPriceVND(total)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Checkout Form - Now on the right */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h2 className="text-lg font-semibold mb-6">Thông tin giao hàng</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                  Họ và tên
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Số điện thoại
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Địa chỉ
              </label>
              <input
                type="text"
                id="address"
                name="address"
                required
                value={formData.address}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>

            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                Thành phố
              </label>
              <input
                type="text"
                id="city"
                name="city"
                required
                value={formData.city}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>

            <div>
              <label htmlFor="note" className="block text-sm font-medium text-gray-700">
                Ghi chú
              </label>
              <textarea
                id="note"
                name="note"
                value={formData.note}
                onChange={handleChange}
                rows={3}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hay chỉ dẫn địa điểm giao hàng chi tiết hơn."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-black text-white rounded-lg px-6 py-3 text-sm font-medium transition-colors ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-900"
              }`}
            >
              {isSubmitting ? "Đang xử lý..." : "Đặt hàng"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
