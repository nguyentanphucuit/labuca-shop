"use client";

import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function CheckoutSuccessPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      <div className="mb-8">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
      </div>
      <h1 className="text-3xl font-bold mb-4">Đặt hàng thành công!</h1>
      <p className="text-gray-600 mb-8">
        Cảm ơn bạn đã đặt hàng. Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất để xác nhận
        đơn hàng.
      </p>
      <div className="space-y-4">
        <Link
          href="/"
          className="inline-block bg-black text-white rounded-lg px-6 py-3 text-sm font-medium hover:bg-gray-900 transition-colors"
        >
          Tiếp tục mua sắm
        </Link>
      </div>
    </div>
  );
}
