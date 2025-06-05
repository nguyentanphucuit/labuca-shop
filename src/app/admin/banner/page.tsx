"use client";
import ImageUploader from "@/app/components/ImageUploader";
import { BANNER_FOLDER } from "@/app/constants";
import DeleteImageModal from "@/app/modal/DeleteImageModal";
import EditPriorityModal from "@/app/modal/EditPriorityModal";
import app from "@/app/utils/firebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import {
  ChevronLeft,
  ChevronRight,
  Edit3,
  Eye,
  EyeOff,
  Image as ImageIcon,
  Trash2,
  Upload,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const db = getFirestore(app);

const BannerAdminPage = () => {
  const [images, setImages] = useState<
    { url: string; publicId: string; isVisible: boolean; priority: number }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [folder, setFolder] = useState(BANNER_FOLDER);
  const [publicIdCurrent, setPublicIdCurrent] = useState("");
  const [editingBanner, setEditingBanner] = useState<{
    publicId: string;
    priority: number;
  } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [uploadedImage, setUploadedImage] = useState<{
    url: string;
    publicId: string;
  } | null>(null);

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
        const userDoc = await getDoc(doc(db, "users", user.uid));
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

  useEffect(() => {
    if (!authLoading && isAdmin) {
      fetchImages();
      // Test different folders to find where images actually are
      setTimeout(() => {
        testDifferentFolders();
      }, 1000);
    }
  }, [authLoading, isAdmin]);

  const fetchImages = async () => {
    setLoading(true);
    try {
      console.log("🔍 Fetching banners from multiple locations...");

      // Fetch from the correct banner subfolder
      const bannerFolderResponse = await fetch(`/api/get-images?folder=${folder}`);
      const bannerFolderData = await bannerFolderResponse.json();

      // Fetch from the main labuca folder to catch older banner uploads
      const mainFolderResponse = await fetch(`/api/get-images?folder=labuca`);
      const mainFolderData = await mainFolderResponse.json();

      console.log("📊 Banner subfolder response:", bannerFolderData?.length || 0, "images");
      console.log("📊 Main folder response:", mainFolderData?.length || 0, "images");

      let allBannerImages = [];

      // Add images from banner subfolder
      if (bannerFolderResponse.ok && Array.isArray(bannerFolderData)) {
        allBannerImages.push(...bannerFolderData);
      }

      // Add banner images from main folder (ones that start with "banner_")
      if (mainFolderResponse.ok && Array.isArray(mainFolderData)) {
        const mainFolderBanners = mainFolderData.filter(
          (img: any) =>
            img.public_id.includes("banner_") && !img.public_id.includes("labuca/banner/")
        );
        allBannerImages.push(...mainFolderBanners);
        console.log("🔍 Found", mainFolderBanners.length, "banner images in main folder");
      }

      console.log("✅ Total banner images found:", allBannerImages.length);
      console.log("🖼️ All banner images:");
      allBannerImages.forEach((img, index) => {
        console.log(`  ${index + 1}. ${img.public_id} → ${img.secure_url}`);
      });

      // Store both URLs and full public_ids for deletion
      const bannerSettings = JSON.parse(localStorage.getItem("bannerSettings") || "{}");

      const imagesWithSettings = allBannerImages.map((img: any) => ({
        url: img.secure_url,
        publicId: img.public_id,
        isVisible: bannerSettings[img.public_id]?.isVisible ?? true,
        priority: bannerSettings[img.public_id]?.priority ?? 0,
      }));

      // Sort by priority (higher priority first)
      imagesWithSettings.sort((a, b) => b.priority - a.priority);

      setImages(imagesWithSettings);
    } catch (error) {
      console.error("💥 Fetch error:", error);
      setImages([]);
    } finally {
      setLoading(false);
    }
  };

  const testDifferentFolders = async () => {
    const possibleFolders = [
      "labuca/banner",
      "labuca",
      "banner",
      "LabucaBanner",
      "labuca-banner",
      "", // root folder
    ];

    console.log("🧪 Testing different folder paths to find your images...");

    for (const testFolder of possibleFolders) {
      try {
        console.log(`🔍 Testing folder: "${testFolder}"`);
        const response = await fetch(`/api/get-images?folder=${testFolder}`);
        const data = await response.json();

        if (response.ok && Array.isArray(data) && data.length > 0) {
          console.log(`✅ Found ${data.length} images in folder: "${testFolder}"`);
          data.forEach((img, index) => {
            console.log(`    ${index + 1}. ${img.public_id}`);
          });
        } else {
          console.log(`❌ No images in folder: "${testFolder}"`);
        }
      } catch (error) {
        console.log(`💥 Error checking folder "${testFolder}":`, error);
      }
    }
  };

  const onDeleteImageBanner = (publicIdCurrent: string) => {
    setShowDeleteModal(!showDeleteModal);
    setPublicIdCurrent(publicIdCurrent);
    console.log("Delete Image: ", publicIdCurrent);
  };

  const handleImageUploadSuccess = () => {
    // Refresh images after successful upload
    fetchImages();
    setUploadedImage(null);
  };

  // Generate a simple timestamp-based publicId for banners
  const generateBannerPublicId = () => {
    const timestamp = Date.now();
    const randomId = Math.floor(Math.random() * 1000);
    return `banner_${timestamp}_${randomId}`;
  };

  const updateBannerVisibility = (publicId: string, isVisible: boolean) => {
    const bannerSettings = JSON.parse(localStorage.getItem("bannerSettings") || "{}");
    if (!bannerSettings[publicId]) {
      bannerSettings[publicId] = {};
    }
    bannerSettings[publicId].isVisible = isVisible;
    localStorage.setItem("bannerSettings", JSON.stringify(bannerSettings));

    setImages((prev) =>
      prev.map((img) => (img.publicId === publicId ? { ...img, isVisible } : img))
    );
  };

  const updateBannerPriority = (publicId: string, priority: number) => {
    const bannerSettings = JSON.parse(localStorage.getItem("bannerSettings") || "{}");
    if (!bannerSettings[publicId]) {
      bannerSettings[publicId] = {};
    }
    bannerSettings[publicId].priority = priority;
    localStorage.setItem("bannerSettings", JSON.stringify(bannerSettings));

    setImages((prev) => {
      const updated = prev.map((img) => (img.publicId === publicId ? { ...img, priority } : img));
      // Re-sort by priority
      return updated.sort((a, b) => b.priority - a.priority);
    });
  };

  const onEditBanner = (publicId: string, priority: number) => {
    setEditingBanner({ publicId, priority });
    setShowEditModal(true);
  };

  // Pagination logic
  const totalPages = Math.ceil(images.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentImages = images.slice(startIndex, endIndex);

  // Show loading while checking authentication
  if (authLoading || loading) {
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
        <span className="text-indigo-600 font-medium text-lg">
          {authLoading ? "Đang xác thực..." : "Đang tải banner..."}
        </span>
      </div>
    );
  }

  // Don't render anything if not admin (will be redirected)
  if (!isAdmin) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto p-8">
      <DeleteImageModal
        showDeleteModal={showDeleteModal}
        public_id={publicIdCurrent}
        setShowDeleteModal={setShowDeleteModal}
        onSuccess={fetchImages}
      />

      <EditPriorityModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        banner={editingBanner}
        onUpdate={updateBannerPriority}
      />

      {/* Admin Indicator Badge */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            🔒 QUẢN TRỊ VIÊN
          </div>
          <div className="text-sm text-gray-500">Khu vực dành cho admin</div>
        </div>
        <div className="text-xs text-gray-400">Trang quản lý banner</div>
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <ImageIcon className="w-8 h-8" />
              Quản lý Banner
            </h1>
            <p className="text-gray-600 mt-2">
              Tổng cộng {images.length} banner • Hiển thị{" "}
              {images.filter((img) => img.isVisible).length} banner
            </p>
          </div>
        </div>
      </div>

      {/* Upload Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Upload className="w-5 h-5" />
          Thêm Banner Mới
        </h2>
        <ImageUploader
          uploadedImage={uploadedImage}
          setUploadedImage={(image) => {
            setUploadedImage(image);
            if (image) {
              handleImageUploadSuccess();
            }
          }}
          newPublicId={generateBannerPublicId()}
          folder={folder}
        />
      </div>

      {/* Images Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Danh sách Banner</h2>
        </div>

        {images.length === 0 ? (
          <div className="text-center py-12">
            <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Chưa có banner nào</h3>
            <p className="text-gray-500">Hãy upload banner đầu tiên của bạn</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Mã Banner
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Hình ảnh
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      URL
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ưu tiên
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Hành động
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentImages.map(({ url, publicId, isVisible, priority }, index) => {
                    const imageCode = url.split("/")?.pop()?.split(".")[0] as string;
                    return (
                      <tr key={index} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 font-mono">
                            {imageCode}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex-shrink-0 h-20 w-32">
                            <Image
                              src={url}
                              width={128}
                              height={80}
                              alt={`Banner ${index + 1}`}
                              className="h-20 w-32 object-cover rounded-lg border border-gray-200"
                            />
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 max-w-xs truncate">{url}</div>
                          <button
                            onClick={() => navigator.clipboard.writeText(url)}
                            className="text-xs text-blue-600 hover:text-blue-800 mt-1"
                          >
                            Sao chép URL
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 font-mono">{priority}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center gap-2 justify-end">
                            <button
                              onClick={() => onEditBanner(publicId, priority)}
                              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors"
                            >
                              <Edit3 className="w-3 h-3" />
                              Sửa
                            </button>
                            <button
                              onClick={() => updateBannerVisibility(publicId, !isVisible)}
                              className={`inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                                isVisible
                                  ? "text-orange-600 hover:text-orange-800 hover:bg-orange-50 border border-orange-200"
                                  : "text-green-600 hover:text-green-800 hover:bg-green-50 border border-green-200"
                              }`}
                            >
                              {isVisible ? (
                                <>
                                  <EyeOff className="w-3 h-3" />
                                  Ẩn
                                </>
                              ) : (
                                <>
                                  <Eye className="w-3 h-3" />
                                  Hiển thị
                                </>
                              )}
                            </button>
                            <button
                              onClick={() => onDeleteImageBanner(publicId)}
                              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors"
                            >
                              <Trash2 className="w-3 h-3" />
                              Xóa
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                <div className="flex-1 flex justify-between sm:hidden">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Trước
                  </button>
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Sau
                  </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Hiển thị <span className="font-medium">{startIndex + 1}</span> đến{" "}
                      <span className="font-medium">{Math.min(endIndex, images.length)}</span> trong
                      tổng số <span className="font-medium">{images.length}</span> banner
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                      <button
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                            page === currentPage
                              ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600"
                              : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                      <button
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BannerAdminPage;
