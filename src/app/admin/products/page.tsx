"use client";
import { emptyProduct } from "@/app/constants";
import CreateModal from "@/app/modal/product/CreateModal";
import DeleteModal from "@/app/modal/product/DeleteModal";
import EditModal from "@/app/modal/product/EditModal";
import { ProductTypes } from "@/app/types/common";
import app from "@/app/utils/firebaseConfig";
import db from "@/app/utils/firestore";
import { collection, getDocs } from "@firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { Filter, Package, Pencil, Plus, Search, ShoppingCart, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

const firestore = getFirestore(app);

const ProductAdminPage = () => {
  const [productList, setProductList] = useState<ProductTypes[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductTypes[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [productCurrent, setProductCurrent] = useState({
    ...emptyProduct,
  });
  const router = useRouter();

  // Check authentication and admin role
  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        // User not logged in, redirect to login
        router.push("/login");
        return;
      }

      try {
        // Check user role in Firestore
        const userDoc = await getDoc(doc(firestore, "users", user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          // Check if user is admin AND logged in via Google
          if (userData.role === "admin" && userData.loginMethod === "google") {
            setIsAdmin(true);
          } else {
            // User is not admin or didn't login via Google, redirect to home
            router.push("/");
            return;
          }
        } else {
          // User data not found, redirect to home
          router.push("/");
          return;
        }
      } catch (error) {
        console.error("Error checking user role:", error);
        router.push("/login");
        return;
      }

      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const onEditProduct = (product: ProductTypes) => {
    setShowEditModal(!showEditModal);
    setProductCurrent(product);
    console.log("Edit Product");
  };

  const onDeleteProduct = (product: ProductTypes) => {
    setShowDeleteModal(!showDeleteModal);
    setProductCurrent(product);
    console.log("Delete Product");
  };

  const onCreateProduct = () => {
    setShowCreateModal(!showCreateModal);
  };

  useEffect(() => {
    if (!authLoading && isAdmin) {
      const fetchItems = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, "products"));
          const products = querySnapshot.docs.map((doc) => {
            const data = doc.data();
            return {
              id: doc.id,
              code: data.code,
              date: data.date,
              title: data.title,
              subtitle: data.subtitle,
              content: data.content,
              color: data.color,
              size: data.size,
              typeValue: data.typeValue,
              typeLabel: data.typeLabel,
              imageUrl: data.imageUrl,
              href: data.href,
              price: data.price,
              discount: data.discount,
            };
          });
          setProductList(products);
          setFilteredProducts(products);
        } catch (error) {
          console.error("Error fetching products:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchItems();
    }
  }, [authLoading, isAdmin]);

  // Filter products based on search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredProducts(productList);
    } else {
      const filtered = productList.filter(
        (product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.subtitle.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchTerm, productList]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
            <Package className="w-6 h-6 text-blue-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
          <p className="mt-4 text-gray-600 font-medium">
            {authLoading ? "Đang xác thực..." : "Đang tải sản phẩm..."}
          </p>
        </div>
      </div>
    );
  }

  // Don't render anything if not admin (will be redirected)
  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 shadow-md">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                🔒 QUẢN TRỊ VIÊN
              </div>
              <div className="text-sm text-gray-500">Khu vực dành riêng cho quản trị viên</div>
            </div>
            <div className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
              Trang quản lý sản phẩm
            </div>
          </div>

          {/* Admin Navigation */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push("/admin/order")}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-all duration-200 hover:shadow-md"
            >
              <ShoppingCart className="w-4 h-4" />
              Quản lý đơn hàng
            </button>
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-medium shadow-sm">
              <Package className="w-4 h-4" />
              Quản lý sản phẩm
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Title and Actions Bar */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Package className="w-8 h-8 text-blue-600" />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Danh sách sản phẩm</h1>
                  <p className="text-sm text-gray-500">Quản lý tất cả sản phẩm trong hệ thống</p>
                </div>
              </div>
              <button
                onClick={onCreateProduct}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-200 hover:shadow-lg transform hover:scale-105"
              >
                <Plus className="w-4 h-4" />
                Tạo mới
              </button>
            </div>

            {/* Search and Filter Bar */}
            <div className="flex items-center gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Tìm kiếm theo mã, tên hoặc mô tả..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
                <Filter className="w-4 h-4" />
                <span className="font-medium">{filteredProducts.length}</span>
                <span>sản phẩm</span>
              </div>
            </div>
          </div>

          {/* Products Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left py-4 px-6 font-semibold text-gray-900 w-24">Mã SP</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900 w-20">Hình ảnh</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Tên sản phẩm</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Mô tả ngắn</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-900 w-32">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-12">
                      <div className="flex flex-col items-center gap-3">
                        <Package className="w-12 h-12 text-gray-300" />
                        <p className="text-gray-500 font-medium">
                          {searchTerm ? "Không tìm thấy sản phẩm phù hợp" : "Chưa có sản phẩm nào"}
                        </p>
                        {searchTerm && (
                          <button
                            onClick={() => setSearchTerm("")}
                            className="text-blue-600 hover:text-blue-700 text-sm"
                          >
                            Xóa bộ lọc
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6">
                        <span className="font-mono text-sm font-medium text-gray-900 bg-gray-100 px-2 py-1 rounded">
                          {product.code}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="w-14 h-14 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                          <Image
                            src={product.imageUrl}
                            alt={product.title}
                            width={56}
                            height={56}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <h3 className="font-medium text-gray-900 line-clamp-2">{product.title}</h3>
                      </td>
                      <td className="py-4 px-6">
                        <p className="text-gray-600 line-clamp-2">{product.subtitle}</p>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => onEditProduct(product)}
                            className="p-2 text-orange-600 hover:text-orange-700 hover:bg-orange-50 rounded-lg transition-all duration-200 group"
                            title="Chỉnh sửa"
                          >
                            <Pencil className="w-4 h-4 group-hover:scale-110 transition-transform" />
                          </button>
                          <button
                            onClick={() => onDeleteProduct(product)}
                            className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200 group"
                            title="Xóa"
                          >
                            <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modals */}
      <ToastContainer />
      <CreateModal showCreateModal={showCreateModal} setShowCreateModal={setShowCreateModal} />
      <EditModal
        showEditModal={showEditModal}
        productCurrent={productCurrent}
        setShowEditModal={setShowEditModal}
      />
      <DeleteModal
        showDeleteModal={showDeleteModal}
        productCurrent={productCurrent}
        collection="products"
        setShowDeleteModal={setShowDeleteModal}
      />
    </div>
  );
};

export default ProductAdminPage;
