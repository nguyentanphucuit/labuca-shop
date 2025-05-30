"use client";
import { emptyProduct } from "@/app/constants";
import { useAllProducts } from "@/app/hooks/useProducts";
import CreateModal from "@/app/modal/product/CreateModal";
import DeleteModal from "@/app/modal/product/DeleteModal";
import EditModal from "@/app/modal/product/EditModal";
import { ProductTypes } from "@/app/types/common";
import app from "@/app/utils/firebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { Filter, Package, Pencil, Plus, Search, ShoppingCart, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

const firestore = getFirestore(app);

const ProductAdminPage = () => {
  const {
    products: productList,
    loading: productsLoading,
    error: productsError,
  } = useAllProducts();
  const [filteredProducts, setFilteredProducts] = useState<ProductTypes[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
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

  // Update filtered products when productList changes
  useEffect(() => {
    setFilteredProducts(productList);
  }, [productList]);

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

  // Show loading state
  if (authLoading || productsLoading) {
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

  // Show error state
  if (productsError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">⚠️ Có lỗi xảy ra</div>
          <p className="text-gray-600 mb-4">{productsError}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  // Don't render anything if not admin (will be redirected)
  if (!isAdmin) {
    return null;
  }

  console.log("📊 Admin Products Data:", {
    totalProducts: productList.length,
    filteredProducts: filteredProducts.length,
    searchTerm,
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <Package className="w-8 h-8" />
                Quản lý sản phẩm
              </h1>
              <p className="text-gray-600 mt-2">
                Tổng cộng {productList.length} sản phẩm
                {searchTerm && ` • Tìm thấy ${filteredProducts.length} kết quả`}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={onCreateProduct}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Tạo sản phẩm mới
              </button>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 bg-white rounded-lg shadow p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Tìm kiếm theo tên, mã sản phẩm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="w-5 h-5" />
              Bộ lọc
            </button>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sản phẩm
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mã
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Danh mục
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Giá
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ngày tạo
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center">
                        <ShoppingCart className="w-12 h-12 text-gray-400 mb-4" />
                        <p className="text-gray-500">
                          {searchTerm ? "Không tìm thấy sản phẩm phù hợp" : "Chưa có sản phẩm nào"}
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-16 w-16 flex-shrink-0">
                            <Image
                              className="h-16 w-16 rounded-lg object-cover"
                              src={product.imageUrl}
                              alt={product.title}
                              width={64}
                              height={64}
                            />
                          </div>
                          <div className="ml-4 max-w-[300px] text-ellipsis overflow-hidden">
                            <div className="text-sm font-medium text-gray-900 line-clamp-1">
                              {product.title}
                            </div>
                            <div className="text-sm text-gray-500 line-clamp-1">
                              {product.subtitle}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-mono text-gray-900 bg-gray-100 px-2 py-1 rounded">
                          {product.code}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                          {product.typeLabel}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {product.discount > 0 && (
                            <div className="flex items-center gap-2">
                              <span className="font-medium">
                                {(
                                  (product.price * (100 - product.discount)) /
                                  100
                                ).toLocaleString()}
                                đ
                              </span>
                              <span className="text-xs text-gray-500 line-through">
                                {product.price.toLocaleString()}đ
                              </span>
                              <span className="text-xs bg-red-100 text-red-800 px-1 py-0.5 rounded">
                                -{product.discount}%
                              </span>
                            </div>
                          )}
                          {product.discount === 0 && (
                            <span className="font-medium">{product.price.toLocaleString()}đ</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {product.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => onEditProduct(product)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Chỉnh sửa"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onDeleteProduct(product)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Xóa"
                          >
                            <Trash2 className="w-4 h-4" />
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

        {/* Modals */}
        <CreateModal showCreateModal={showCreateModal} setShowCreateModal={setShowCreateModal} />
        <EditModal
          showEditModal={showEditModal}
          setShowEditModal={setShowEditModal}
          productCurrent={productCurrent}
        />
        <DeleteModal
          showDeleteModal={showDeleteModal}
          setShowDeleteModal={setShowDeleteModal}
          productCurrent={productCurrent}
          collection="products"
        />

        <ToastContainer />
      </div>
    </div>
  );
};

export default ProductAdminPage;
