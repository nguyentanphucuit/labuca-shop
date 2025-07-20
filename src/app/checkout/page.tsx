"use client";

import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { formatPriceVND } from "../constants/common";
import { useCart } from "../context/CartContext";
import app from "../utils/firebaseConfig";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clearCart } = useCart();
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
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

  const auth = getAuth(app);

  // Function to extract name from email
  const extractNameFromEmail = (email: string): string => {
    if (!email) return "";

    // Get the part before @ symbol
    const localPart = email.split("@")[0];

    // Replace dots, underscores, and hyphens with spaces
    const nameWithSpaces = localPart.replace(/[._-]/g, " ");

    // Capitalize first letter of each word
    const capitalizedName = nameWithSpaces
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");

    return capitalizedName;
  };

  // Check authentication status
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        // Auto-fill email and name from authenticated user
        const nameFromAccount = currentUser.displayName;
        const nameFromEmail = extractNameFromEmail(currentUser.email || "");

        setFormData((prev) => ({
          ...prev,
          email: currentUser.email || "",
          fullName: nameFromAccount || nameFromEmail || prev.fullName,
        }));
      } else {
        // Redirect to login if not authenticated
        router.push("/login");
      }
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, [auth, router]);

  // Show loading while checking authentication
  if (authLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-8"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gray-200 rounded-lg h-96"></div>
            <div className="bg-gray-200 rounded-lg h-96"></div>
          </div>
        </div>
      </div>
    );
  }

  // Check if cart is empty
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

  const shippingFee = total >= 300000 ? 0 : 20000;
  const finalTotal = total + shippingFee;

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
          <div style="font-size:18px;margin-bottom:32px;">
            <div style="margin-bottom:8px;"><b>Tạm tính:</b> ${formatPriceVND(total)}</div>
            <div style="margin-bottom:8px;"><b>Phí vận chuyển:</b> ${total >= 300000 ? "Miễn phí" : formatPriceVND(20000)}</div>
            <div><b>Tổng tiền:</b> <span style="color:#7c3aed;">${formatPriceVND(finalTotal)}</span></div>
          </div>
          <p style="color:#666;">Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất để xác nhận đơn hàng.<br>Cảm ơn bạn đã tin tưởng Labuca Shop!</p>
        </div>
      `;

      // Admin email HTML
      const adminEmailHtml = `
        <div style="font-family:sans-serif;max-width:600px;margin:auto;color:#222;">
          <h2 style="color:#dc2626;">🔔 Đơn hàng mới - Labuca Shop</h2>
          <p>Một đơn hàng mới vừa được đặt từ khách hàng <b>${formData.fullName}</b></p>
          
          <h3 style="margin-top:32px;">Chi tiết đơn hàng:</h3>
          <table style="width:100%;border-collapse:collapse;margin-bottom:24px;border:1px solid #ddd;">
            <thead>
              <tr style="background:#f3f4f6;">
                <th align="left" style="padding:12px 8px;border:1px solid #ddd;">Sản phẩm</th>
                <th align="left" style="padding:12px 8px;border:1px solid #ddd;">Màu</th>
                <th align="left" style="padding:12px 8px;border:1px solid #ddd;">Size</th>
                <th align="center" style="padding:12px 8px;border:1px solid #ddd;">SL</th>
                <th align="right" style="padding:12px 8px;border:1px solid #ddd;">Giá</th>
              </tr>
            </thead>
            <tbody>
              ${orderItemsHtml}
            </tbody>
          </table>
          
          <h3 style="margin-top:32px;">Thông tin khách hàng:</h3>
          <div style="background:#f9fafb;padding:16px;border-radius:8px;margin-bottom:24px;">
            <ul style="margin:0;padding:0;list-style:none;">
              <li style="margin-bottom:8px;"><b>Họ và tên:</b> ${formData.fullName}</li>
              <li style="margin-bottom:8px;"><b>Email:</b> ${formData.email}</li>
              <li style="margin-bottom:8px;"><b>Số điện thoại:</b> ${formData.phone}</li>
              <li style="margin-bottom:8px;"><b>Địa chỉ giao hàng:</b> ${formData.address}</li>
              <li style="margin-bottom:8px;"><b>Thành phố:</b> ${formData.city}</li>
              ${formData.note ? `<li style="margin-bottom:8px;"><b>Ghi chú:</b> ${formData.note}</li>` : ""}
            </ul>
          </div>
          
          <div style="font-size:20px;margin-bottom:32px;padding:16px;background:#fef2f2;border-radius:8px;border:1px solid #fecaca;">
            <div style="margin-bottom:8px;"><b>Tạm tính:</b> ${formatPriceVND(total)}</div>
            <div style="margin-bottom:8px;"><b>Phí vận chuyển:</b> ${total >= 300000 ? "Miễn phí" : formatPriceVND(20000)}</div>
            <div><b>💰 Tổng tiền:</b> <span style="color:#dc2626;font-weight:bold;">${formatPriceVND(finalTotal)}</span>
          </div>
          
          <div style="background:#eff6ff;padding:16px;border-radius:8px;border:1px solid #bfdbfe;">
            <p style="margin:0;color:#1e40af;"><b>📋 Hành động cần thực hiện:</b></p>
            <p style="margin:8px 0 0 0;color:#374151;">Vui lòng liên hệ với khách hàng để xác nhận đơn hàng và sắp xếp giao hàng.</p>
          </div>
        </div>
      `;

      // Send email to admin (now with HTML and text)
      const adminResponse = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: process.env.NEXT_PUBLIC_EMAIL_USER,
          subject: `🔔 Đơn hàng mới từ ${formData.fullName} - ${formatPriceVND(finalTotal)}`,
          text: `Đơn hàng mới từ ${formData.fullName}\n\n${orderItems}\n\nThông tin khách hàng:\n- Tên: ${formData.fullName}\n- Email: ${formData.email}\n- SĐT: ${formData.phone}\n- Địa chỉ: ${formData.address}, ${formData.city}${formData.note ? `\n- Ghi chú: ${formData.note}` : ""}\n\nTạm tính: ${formatPriceVND(total)}\nPhí vận chuyển: ${total >= 300000 ? "Miễn phí" : formatPriceVND(20000)}\nTổng tiền: ${formatPriceVND(finalTotal)}\n\nVui lòng liên hệ với khách hàng để xác nhận đơn hàng.`,
          html: adminEmailHtml,
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
          text: `Xin chào ${formData.fullName},\n\nCảm ơn bạn đã đặt hàng tại Labuca Shop. Dưới đây là thông tin đơn hàng của bạn:\n\n${orderItems}\n\nThông tin giao hàng: ${formData.fullName}, ${formData.phone}, ${formData.address}, ${formData.city}\n\nTạm tính: ${formatPriceVND(total)}\nPhí vận chuyển: ${total >= 300000 ? "Miễn phí" : formatPriceVND(20000)}\nTổng tiền: ${formatPriceVND(finalTotal)}`,
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
          total: finalTotal,
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

    // Prevent email changes when user is logged in
    if (name === "email" && user) {
      return;
    }

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
              {/* Shipping Info */}
              <div className="mb-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">Phí vận chuyển</span>
                  </div>
                  <span
                    className={`text-sm font-bold px-3 py-1 rounded-full ${
                      total >= 300000
                        ? "bg-green-100 text-green-700 border border-green-200"
                        : "bg-orange-100 text-orange-700 border border-orange-200"
                    }`}
                  >
                    {total >= 300000 ? "Miễn phí" : "20.000 VND"}
                  </span>
                </div>
                {total < 300000 && (
                  <div className="space-y-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min((total / 300000) * 100, 100)}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-600">
                      Cần thêm{" "}
                      <span className="font-semibold text-blue-600">
                        {formatPriceVND(300000 - total)}
                      </span>{" "}
                      để được miễn phí vận chuyển
                    </p>
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm text-gray-600">
                  <p>Tạm tính</p>
                  <p>{formatPriceVND(total)}</p>
                </div>

                <div className="flex justify-between text-sm text-gray-600">
                  <p>Phí vận chuyển</p>
                  <p>
                    {total >= 300000 ? (
                      <span className="text-green-600">Miễn phí</span>
                    ) : (
                      formatPriceVND(shippingFee)
                    )}
                  </p>
                </div>

                <div className="flex justify-between font-bold text-lg border-t pt-2">
                  <p>Tổng tiền</p>
                  <p>{formatPriceVND(finalTotal)}</p>
                </div>
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
                  {user && (
                    <span className="text-xs text-blue-600 ml-2">
                      {user.displayName ? "(Từ tài khoản đã đăng nhập)" : "(Từ email đã đăng nhập)"}
                    </span>
                  )}
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
                {user && !user.displayName && (
                  <p className="mt-1 text-xs text-gray-500">
                    Tên được tự động tạo từ email. Bạn có thể chỉnh sửa nếu cần.
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                  {user && (
                    <span className="text-xs text-green-600 ml-2">(Từ tài khoản đã đăng nhập)</span>
                  )}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  readOnly={!!user}
                  className={`mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-1 ${
                    user
                      ? "border-gray-200 bg-gray-50 text-gray-600 cursor-not-allowed"
                      : "border-gray-300 focus:border-black focus:ring-black"
                  }`}
                  placeholder={user ? "Email từ tài khoản đã đăng nhập" : "Nhập email của bạn"}
                />
                {user && (
                  <p className="mt-1 text-xs text-gray-500">
                    Email được lấy từ tài khoản đã đăng nhập và không thể thay đổi
                  </p>
                )}
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
