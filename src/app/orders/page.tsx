"use client";
import app from "@/app/utils/firebaseConfig";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import { ArrowLeft, Calendar, DollarSign, Eye, Package, ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const db = getFirestore(app);

interface OrderItem {
  id: string;
  title: string;
  quantity: number;
  price: number;
  size: string;
  color: { name: string; value: string };
  imageUrl: string;
}

interface Order {
  id: string;
  user: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    notes?: string;
  };
  items: OrderItem[];
  total: number;
  createdAt: any;
  status: string;
  isShow: boolean;
}

export default function OrdersPage() {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const router = useRouter();
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        await fetchUserOrders(currentUser.email!);
      } else {
        router.push("/login");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth, router]);

  const fetchUserOrders = async (userEmail: string) => {
    try {
      // Use simple query without orderBy to avoid composite index requirement
      const q = query(collection(db, "orders"), where("user.email", "==", userEmail));

      const snapshot = await getDocs(q);
      const userOrders = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Order[];

      // Filter out hidden orders and sort on client side
      const visibleOrders = userOrders
        .filter((order) => order.isShow !== false)
        .sort((a, b) => {
          // Sort by createdAt descending (newest first)
          if (!a.createdAt?.toDate || !b.createdAt?.toDate) return 0;
          return b.createdAt.toDate().getTime() - a.createdAt.toDate().getTime();
        });

      setOrders(visibleOrders);
    } catch (error) {
      console.error("Lỗi tải đơn hàng:", error);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: "Chờ xử lý", color: "bg-yellow-100 text-yellow-800" },
      processing: { label: "Đang xử lý", color: "bg-blue-100 text-blue-800" },
      shipped: { label: "Đã gửi", color: "bg-purple-100 text-purple-800" },
      delivered: { label: "Đã giao", color: "bg-green-100 text-green-800" },
      cancelled: { label: "Đã hủy", color: "bg-red-100 text-red-800" },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp?.toDate) return "N/A";
    return timestamp.toDate().toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const OrderDetailsModal = ({ order, onClose }: { order: Order; onClose: () => void }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Chi tiết đơn hàng #{order.id.slice(0, 8)}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">
              ×
            </button>
          </div>

          {/* Order Info */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">Thông tin đơn hàng</h3>
                <p className="text-sm text-gray-600">Ngày đặt: {formatDate(order.createdAt)}</p>
                <p className="text-sm text-gray-600">
                  Trạng thái: {getStatusBadge(order.status || "pending")}
                </p>
                <p className="text-sm text-gray-600">Tổng tiền: {order.total.toLocaleString()}đ</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Thông tin giao hàng</h3>
                <p className="text-sm text-gray-600">Tên: {order.user.fullName}</p>
                <p className="text-sm text-gray-600">SĐT: {order.user.phone}</p>
                <p className="text-sm text-gray-600">
                  Địa chỉ: {order.user.address}, {order.user.city}
                </p>
                {order.user.notes && (
                  <p className="text-sm text-gray-600">Ghi chú: {order.user.notes}</p>
                )}
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div>
            <h3 className="font-semibold mb-4">Sản phẩm đã đặt</h3>
            <div className="space-y-4">
              {order.items.map((item, index) => (
                <div key={index} className="flex items-center space-x-4 border-b pb-4">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium">{item.title}</h4>
                    <p className="text-sm text-gray-600">
                      Màu: {item.color.name} | Size: {item.size} | SL: {item.quantity}
                    </p>
                    <p className="text-sm font-medium text-indigo-600">
                      {item.price.toLocaleString()}đ x {item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">
                      {(item.price * item.quantity).toLocaleString()}đ
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-8 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-48 mb-6"></div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-300 rounded w-32"></div>
                      <div className="h-3 bg-gray-300 rounded w-48"></div>
                    </div>
                    <div className="h-6 bg-gray-300 rounded w-20"></div>
                  </div>
                  <div className="h-4 bg-gray-300 rounded w-full"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-8 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-white rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Đơn hàng của tôi</h1>
              <p className="text-gray-600">Xem lịch sử đặt hàng và theo dõi đơn hàng</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Package className="w-4 h-4" />
            <span>{orders.length} đơn hàng</span>
          </div>
        </div>

        {/* Orders List */}
        {orders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Chưa có đơn hàng nào</h3>
            <p className="text-gray-600 mb-6">
              Bạn chưa đặt đơn hàng nào. Hãy khám phá các sản phẩm tuyệt vời của chúng tôi!
            </p>
            <button
              onClick={() => router.push("/")}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              Mua sắm ngay
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-3">
                        <h3 className="font-semibold text-gray-900">
                          Đơn hàng #{order.id.slice(0, 8)}
                        </h3>
                        {getStatusBadge(order.status || "pending")}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(order.createdAt)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Package className="w-4 h-4" />
                          <span>{order.items.length} sản phẩm</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1 text-lg font-bold text-indigo-600">
                        <DollarSign className="w-5 h-5" />
                        <span>{order.total.toLocaleString()}đ</span>
                      </div>
                    </div>
                  </div>

                  {/* Order Items Preview */}
                  <div className="border-t pt-4">
                    <div className="flex items-center space-x-4 overflow-x-auto pb-2">
                      {order.items.slice(0, 3).map((item, index) => (
                        <div key={index} className="flex-shrink-0 flex items-center space-x-3">
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="w-12 h-12 object-cover rounded-lg"
                          />
                          <div className="min-w-0">
                            <p className="text-sm font-medium truncate">{item.title}</p>
                            <p className="text-xs text-gray-600">
                              {item.color.name} • Size {item.size} • SL: {item.quantity}
                            </p>
                          </div>
                        </div>
                      ))}
                      {order.items.length > 3 && (
                        <div className="flex-shrink-0 text-sm text-gray-500">
                          +{order.items.length - 3} sản phẩm khác
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-4 pt-4 border-t flex justify-between items-center">
                    <div className="text-sm text-gray-600">
                      Giao đến: {order.user.address}, {order.user.city}
                    </div>
                    <button
                      onClick={() => {
                        setSelectedOrder(order);
                        setShowDetails(true);
                      }}
                      className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Xem chi tiết</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Order Details Modal */}
        {showDetails && selectedOrder && (
          <OrderDetailsModal
            order={selectedOrder}
            onClose={() => {
              setShowDetails(false);
              setSelectedOrder(null);
            }}
          />
        )}
      </div>
    </div>
  );
}
