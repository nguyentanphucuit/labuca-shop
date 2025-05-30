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
import { AlertCircle, CheckCircle, Eye, Trash2Icon, X } from "lucide-react";
import { useEffect, useState } from "react";

const db = getFirestore(app);

// Status configuration
const ORDER_STATUSES = [
  { value: "pending", label: "Chờ xử lý", color: "bg-yellow-50 text-yellow-700 border-yellow-200" },
  { value: "processing", label: "Đang xử lý", color: "bg-blue-50 text-blue-700 border-blue-200" },
  { value: "shipped", label: "Đã gửi", color: "bg-purple-50 text-purple-700 border-purple-200" },
  { value: "delivered", label: "Đã giao", color: "bg-green-50 text-green-700 border-green-200" },
  { value: "cancelled", label: "Đã hủy", color: "bg-red-50 text-red-700 border-red-200" },
];

export default function AdminOrderPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [notification, setNotification] = useState<{
    type: "success" | "error" | "warning";
    message: string;
    show: boolean;
  }>({ type: "success", message: "", show: false });
  const [deleteConfirm, setDeleteConfirm] = useState<{
    show: boolean;
    orderId: string;
    orderInfo: string;
  }>({ show: false, orderId: "", orderInfo: "" });

  useEffect(() => {
    async function fetchOrders() {
      try {
        const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        setOrders(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        showNotification("error", "Lỗi tải danh sách đơn hàng!");
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);

  const showNotification = (type: "success" | "error" | "warning", message: string) => {
    setNotification({ type, message, show: true });
    setTimeout(() => {
      setNotification((prev) => ({ ...prev, show: false }));
    }, 3000);
  };

  const handleDeleteClick = (orderId: string, customerName: string) => {
    setDeleteConfirm({
      show: true,
      orderId,
      orderInfo: `đơn hàng của ${customerName}`,
    });
  };

  const handleConfirmDelete = async () => {
    try {
      await updateDoc(doc(db, "orders", deleteConfirm.orderId), { isShow: false });
      setOrders((prev) => prev.filter((order) => order.id !== deleteConfirm.orderId));
      showNotification("success", "Đã xoá đơn hàng thành công!");
    } catch (error) {
      showNotification("error", "Lỗi khi xoá đơn hàng!");
    } finally {
      setDeleteConfirm({ show: false, orderId: "", orderInfo: "" });
    }
  };

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, "orders", orderId), { status: newStatus });
      setOrders((prev) =>
        prev.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order))
      );
      const statusLabel = ORDER_STATUSES.find((s) => s.value === newStatus)?.label || newStatus;
      showNotification("success", `Đã cập nhật trạng thái thành "${statusLabel}"!`);
    } catch (error) {
      showNotification("error", "Lỗi khi cập nhật trạng thái!");
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = ORDER_STATUSES.find((s) => s.value === status) || ORDER_STATUSES[0];
    return (
      <span
        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold shadow-sm border transition-all duration-200 hover:scale-105 ${statusConfig.color}`}
      >
        <span
          className="w-2 h-2 rounded-full mr-2 animate-pulse"
          style={{
            backgroundColor:
              status === "pending"
                ? "#f59e0b"
                : status === "processing"
                  ? "#3b82f6"
                  : status === "shipped"
                    ? "#8b5cf6"
                    : status === "delivered"
                      ? "#10b981"
                      : "#ef4444",
          }}
        ></span>
        {statusConfig.label}
      </span>
    );
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
    <div className="max-w-7xl mx-auto p-8">
      {/* Notification */}
      {notification.show && (
        <div
          className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg transition-all duration-300 ${
            notification.type === "success"
              ? "bg-green-100 text-green-800 border border-green-200"
              : notification.type === "error"
                ? "bg-red-100 text-red-800 border border-red-200"
                : "bg-yellow-100 text-yellow-800 border border-yellow-200"
          }`}
        >
          {notification.type === "success" && <CheckCircle className="w-4 h-4" />}
          {notification.type === "error" && <X className="w-4 h-4" />}
          {notification.type === "warning" && <AlertCircle className="w-4 h-4" />}
          <span className="font-medium">{notification.message}</span>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm.show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Xác nhận xoá đơn hàng</h3>
                <p className="text-sm text-gray-600">Hành động này không thể hoàn tác</p>
              </div>
            </div>
            <p className="text-gray-700 mb-6">
              Bạn có chắc chắn muốn xoá <strong>{deleteConfirm.orderInfo}</strong> không?
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteConfirm({ show: false, orderId: "", orderInfo: "" })}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
              >
                Xác nhận xoá
              </button>
            </div>
          </div>
        </div>
      )}

      <h1 className="text-2xl font-bold mb-6">Danh sách đơn hàng</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
          <thead className="bg-gradient-to-r from-indigo-100 to-purple-100">
            <tr>
              <th className="px-4 py-3 border-b text-left font-semibold">ID</th>
              <th className="px-4 py-3 border-b text-left font-semibold">Khách</th>
              <th className="px-4 py-3 border-b text-right font-semibold">Tổng tiền</th>
              <th className="px-4 py-3 border-b text-left font-semibold">Trạng thái</th>
              <th className="px-4 py-3 border-b text-center font-semibold">Chi tiết</th>
              <th className="px-4 py-3 border-b text-center font-semibold">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {orders.filter((order) => order.isShow !== false).length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-8 text-gray-500">
                  Không có đơn hàng nào.
                </td>
              </tr>
            ) : (
              orders
                .filter((order) => order.isShow !== false)
                .map((order, idx) => (
                  <>
                    <tr
                      key={order.id}
                      className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-indigo-50 transition-colors`}
                    >
                      <td className="px-4 py-3 text-xs text-gray-500 font-mono">
                        {order.id?.slice(0, 8)}...
                      </td>
                      <td className="px-4 py-3 font-semibold capitalize">{order.user?.fullName}</td>
                      <td className="px-4 py-3 text-right text-indigo-600 font-bold">
                        {order.total?.toLocaleString()}đ
                      </td>
                      <td className="px-4 py-3">{getStatusBadge(order.status || "pending")}</td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="p-2 rounded-full hover:bg-indigo-100 transition-colors"
                        >
                          <Eye className="w-4 h-4 text-gray-600" />
                        </button>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() =>
                            handleDeleteClick(order.id, order.user?.fullName || "khách hàng")
                          }
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs transition-colors"
                        >
                          <Trash2Icon className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  </>
                ))
            )}
          </tbody>
        </table>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-900">Chi tiết đơn hàng</h3>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Thông tin đơn hàng</h4>
                    <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                      <p className="text-sm">
                        <span className="font-medium">ID:</span> {selectedOrder.id}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Ngày đặt:</span>{" "}
                        {selectedOrder.createdAt?.toDate?.().toLocaleString?.()}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Tổng tiền:</span>{" "}
                        <span className="text-indigo-600 font-bold">
                          {selectedOrder.total?.toLocaleString()}đ
                        </span>
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Trạng thái đơn hàng</h4>
                    <div className="space-y-3">
                      <select
                        value={selectedOrder.status || "pending"}
                        onChange={(e) => {
                          handleStatusChange(selectedOrder.id, e.target.value);
                          setSelectedOrder({ ...selectedOrder, status: e.target.value });
                        }}
                        className="w-full text-sm font-medium border-2 border-gray-200 rounded-lg px-3 py-2 bg-white hover:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 cursor-pointer shadow-sm"
                      >
                        {ORDER_STATUSES.map((status) => (
                          <option key={status.value} value={status.value}>
                            {status.label}
                          </option>
                        ))}
                      </select>
                      <div className="flex justify-start">
                        {getStatusBadge(selectedOrder.status || "pending")}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Thông tin khách hàng</h4>
                    <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                      <p className="text-sm">
                        <span className="font-medium">Tên:</span> {selectedOrder.user?.fullName}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">SĐT:</span> {selectedOrder.user?.phone}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Email:</span> {selectedOrder.user?.email}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Địa chỉ:</span> {selectedOrder.user?.address},{" "}
                        {selectedOrder.user?.city}
                      </p>
                      {selectedOrder.user?.notes && (
                        <p className="text-sm">
                          <span className="font-medium">Ghi chú:</span> {selectedOrder.user.notes}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-700 mb-3">Sản phẩm trong đơn hàng</h4>
                <div className="space-y-3">
                  {selectedOrder.items?.map((item: any, idx: number) => (
                    <div key={idx} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="flex gap-4 items-start">
                        <div className="flex-shrink-0">
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="w-16 h-16 object-cover rounded-lg border border-gray-300"
                          />
                        </div>
                        <div className="flex-1">
                          <h5 className="font-medium text-gray-900">{item.title}</h5>
                          <div className="text-sm text-gray-600 mt-1">
                            <span className="mr-4">Màu: {item.color?.name}</span>
                            <span className="mr-4">Size: {item.size}</span>
                            <span>Số lượng: {item.quantity}</span>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="font-medium text-gray-900">
                            {item.price?.toLocaleString()}đ
                          </p>
                          <p className="text-sm text-gray-600">x{item.quantity}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
