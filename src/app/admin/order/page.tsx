"use client";
import app from "@/app/utils/firebaseConfig";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { Trash2Icon } from "lucide-react";
import { useEffect, useState } from "react";

const db = getFirestore(app);

export default function AdminOrderPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      setOrders(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    }
    fetchOrders();
  }, []);

  const handleHideOrder = async (orderId: string) => {
    await updateDoc(doc(db, "orders", orderId), { isShow: false });
    setOrders((prev) => prev.filter((order) => order.id !== orderId));
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-64">
        <svg className="animate-spin h-8 w-8 text-indigo-500 mr-3" viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
        <span className="text-indigo-600 font-medium text-lg">Đang tải đơn hàng...</span>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Danh sách đơn hàng</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
          <thead className="bg-gradient-to-r from-indigo-100 to-purple-100">
            <tr>
              <th className="px-4 py-3 border-b text-left font-semibold">ID</th>
              <th className="px-4 py-3 border-b text-left font-semibold">Khách</th>
              <th className="px-4 py-3 border-b text-left font-semibold">SĐT</th>
              <th className="px-4 py-3 border-b text-left font-semibold">Địa chỉ</th>
              <th className="px-4 py-3 border-b text-right font-semibold">Tổng tiền</th>
              <th className="px-4 py-3 border-b text-left font-semibold">Ngày</th>
              <th className="px-4 py-3 border-b text-left font-semibold">Sản phẩm</th>
              <th className="px-4 py-3 border-b text-center font-semibold">Xoá</th>
            </tr>
          </thead>
          <tbody>
            {orders.filter((order) => order.isShow !== false).length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-8 text-gray-500">
                  Không có đơn hàng nào.
                </td>
              </tr>
            ) : (
              orders
                .filter((order) => order.isShow !== false)
                .map((order, idx) => (
                  <tr
                    key={order.id}
                    className={`$${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-indigo-50 transition-colors`}
                  >
                    <td className="px-4 py-3 text-xs text-gray-500 font-mono">
                      {order.id?.slice(0, 8)}...
                    </td>
                    <td className="px-4 py-3 font-semibold capitalize">{order.user?.fullName}</td>
                    <td className="px-4 py-3">{order.user?.phone}</td>
                    <td className="px-4 py-3">
                      {order.user?.address}, {order.user?.city}
                    </td>
                    <td className="px-4 py-3 text-right text-indigo-600 font-bold">
                      {order.total?.toLocaleString()}đ
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-500">
                      {order.createdAt?.toDate?.().toLocaleString?.()}
                    </td>
                    <td className="px-4 py-3">
                      <ul className="space-y-1">
                        {order.items?.map((item: any, idx: number) => (
                          <li
                            key={idx}
                            className="bg-indigo-100 rounded px-2 py-1 text-xs text-indigo-800 font-medium list-none"
                          >
                            {item.title} - {item.color?.name} - Size: {item.size} - SL:{" "}
                            {item.quantity}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => handleHideOrder(order.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                      >
                        <Trash2Icon className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
