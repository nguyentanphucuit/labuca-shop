"use client";
import app from "@/app/utils/firebaseConfig";
import { getAuth, onAuthStateChanged, updatePassword, updateProfile, User } from "firebase/auth";
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import { Camera, Edit2, Eye, EyeOff, Save, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const db = getFirestore(app);

interface UserData {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  role: string;
  createdAt: any;
  updatedAt: any;
  isActive: boolean;
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [editForm, setEditForm] = useState({
    displayName: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const router = useRouter();
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        await fetchUserData(currentUser.uid);
        setEditForm((prev) => ({
          ...prev,
          displayName: currentUser.displayName || "",
        }));
      } else {
        router.push("/login");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth, router]);

  const fetchUserData = async (uid: string) => {
    try {
      const userDoc = await getDoc(doc(db, "users", uid));
      if (userDoc.exists()) {
        setUserData(userDoc.data() as UserData);
      }
    } catch (error) {
      console.error("Lỗi tải thông tin người dùng:", error);
    }
  };

  const handleSaveProfile = async () => {
    if (!user) return;

    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      // Update Firebase Auth profile
      await updateProfile(user, {
        displayName: editForm.displayName,
      });

      // Update Firestore user document
      await updateDoc(doc(db, "users", user.uid), {
        displayName: editForm.displayName,
        updatedAt: new Date(),
      });

      setSuccess("Cập nhật thông tin thành công!");
      setEditing(false);

      // Refresh user data
      await fetchUserData(user.uid);
    } catch (error: any) {
      setError("Lỗi cập nhật thông tin: " + error.message);
    }
    setSaving(false);
  };

  const handleImageUpload = async (file: File) => {
    if (!user) return;

    setUploading(true);
    setError(null);
    setSuccess(null);

    try {
      // Create form data for profile upload stream
      const formData = new FormData();
      formData.append("file", file);
      formData.append("public_id", `profile_${user.uid}`);

      console.log("Uploading profile image...");

      // Upload using dedicated profile upload API
      const uploadResponse = await fetch("/api/upload/profile", {
        method: "POST",
        body: formData,
      });

      if (!uploadResponse.ok) {
        const errorData = await uploadResponse.json();
        throw new Error(errorData.error || "Upload failed");
      }

      const uploadData = await uploadResponse.json();
      console.log("Profile upload successful:", uploadData);

      const newPhotoURL = uploadData.url;

      // Update Firebase Auth profile
      await updateProfile(user, {
        photoURL: newPhotoURL,
      });

      // Update Firestore user document
      await updateDoc(doc(db, "users", user.uid), {
        photoURL: newPhotoURL,
        updatedAt: new Date(),
      });

      setSuccess("Cập nhật ảnh đại diện thành công!");

      // Refresh user data
      await fetchUserData(user.uid);
    } catch (error: any) {
      console.error("Profile upload error:", error);
      setError("Lỗi cập nhật ảnh đại diện: " + error.message);
    }

    setUploading(false);
  };

  const handleChangePassword = async () => {
    if (!user) return;

    if (editForm.newPassword !== editForm.confirmPassword) {
      setError("Mật khẩu mới không khớp!");
      return;
    }

    if (editForm.newPassword.length < 6) {
      setError("Mật khẩu mới phải có ít nhất 6 ký tự!");
      return;
    }

    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      await updatePassword(user, editForm.newPassword);
      setSuccess("Đổi mật khẩu thành công!");
      setChangingPassword(false);
      setEditForm((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
    } catch (error: any) {
      if (error.code === "auth/requires-recent-login") {
        setError("Vui lòng đăng nhập lại để đổi mật khẩu.");
      } else {
        setError("Lỗi đổi mật khẩu: " + error.message);
      }
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="animate-pulse">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-20 h-20 bg-gray-300 rounded-full"></div>
                <div className="space-y-2">
                  <div className="h-6 bg-gray-300 rounded w-48"></div>
                  <div className="h-4 bg-gray-300 rounded w-64"></div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="h-12 bg-gray-300 rounded"></div>
                <div className="h-12 bg-gray-300 rounded"></div>
                <div className="h-12 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen pt-24 pb-8 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        {/* Customer Indicator Badge */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
              👤 KHÁCH HÀNG
            </div>
            <div className="text-sm text-gray-500">Thông tin cá nhân</div>
          </div>
          <div className="text-xs text-gray-400">Quản lý hồ sơ</div>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="Avatar"
                      className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center border-4 border-white shadow-lg">
                      <span className="text-white text-2xl font-bold">
                        {user.displayName?.charAt(0)?.toUpperCase() ||
                          user.email?.charAt(0)?.toUpperCase() ||
                          "U"}
                      </span>
                    </div>
                  )}
                  <div className="absolute bottom-0 right-0">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleImageUpload(file);
                      }}
                      className="hidden"
                      id="profile-upload"
                      ref={(input) => {
                        if (input) {
                          input.onclick = () => {
                            input.value = ""; // Reset to allow same file selection
                          };
                        }
                      }}
                    />
                    <button
                      onClick={() => {
                        const input = document.getElementById("profile-upload") as HTMLInputElement;
                        input?.click();
                      }}
                      className="bg-white rounded-full p-1.5 shadow-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                      disabled={uploading}
                      type="button"
                    >
                      {uploading ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
                      ) : (
                        <Camera className="w-4 h-4 text-gray-600" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="text-white">
                  <h1 className="text-2xl font-bold">{user.displayName || "Người dùng"}</h1>
                  <p className="text-indigo-100">{user.email}</p>
                  <p className="text-indigo-200 text-sm">
                    Thành viên từ {userData?.createdAt?.toDate?.()?.toLocaleDateString?.() || "N/A"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setEditing(!editing)}
                className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
              >
                {editing ? <X className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
                {editing ? "Hủy" : "Chỉnh sửa"}
              </button>
            </div>
          </div>

          {/* Alert Messages */}
          {(error || success) && (
            <div className="p-4">
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  {error}
                </div>
              )}
              {success && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                  {success}
                </div>
              )}
            </div>
          )}

          {/* Profile Content */}
          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Personal Information */}
              <div>
                <h2 className="text-lg font-semibold mb-4">Thông tin cá nhân</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tên hiển thị
                    </label>
                    {editing ? (
                      <input
                        type="text"
                        value={editForm.displayName}
                        onChange={(e) =>
                          setEditForm((prev) => ({ ...prev, displayName: e.target.value }))
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Nhập tên hiển thị"
                      />
                    ) : (
                      <p className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg">
                        {user.displayName || "Chưa có tên hiển thị"}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <p className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-600">
                      {user.email}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Vai trò</label>
                    <p className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-600">
                      {userData?.role === "admin" ? "Quản trị viên" : "Khách hàng"}
                    </p>
                  </div>

                  {editing && (
                    <button
                      onClick={handleSaveProfile}
                      disabled={saving}
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:bg-gray-400 flex items-center justify-center gap-2"
                    >
                      {saving ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      ) : (
                        <Save className="w-4 h-4" />
                      )}
                      {saving ? "Đang lưu..." : "Lưu thay đổi"}
                    </button>
                  )}
                </div>
              </div>

              {/* Account Security */}
              <div>
                <h2 className="text-lg font-semibold mb-4">Bảo mật tài khoản</h2>
                <div className="space-y-4">
                  {!changingPassword ? (
                    <button
                      onClick={() => setChangingPassword(true)}
                      className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors"
                    >
                      Đổi mật khẩu
                    </button>
                  ) : (
                    <div className="space-y-4 border border-gray-200 rounded-lg p-4">
                      <h3 className="font-medium text-gray-900">Đổi mật khẩu</h3>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Mật khẩu mới
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            value={editForm.newPassword}
                            onChange={(e) =>
                              setEditForm((prev) => ({ ...prev, newPassword: e.target.value }))
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 pr-10"
                            placeholder="Nhập mật khẩu mới"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4 text-gray-400" />
                            ) : (
                              <Eye className="h-4 w-4 text-gray-400" />
                            )}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Nhập lại mật khẩu mới
                        </label>
                        <input
                          type={showPassword ? "text" : "password"}
                          value={editForm.confirmPassword}
                          onChange={(e) =>
                            setEditForm((prev) => ({ ...prev, confirmPassword: e.target.value }))
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="Nhập lại mật khẩu mới"
                        />
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={handleChangePassword}
                          disabled={saving}
                          className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:bg-gray-400"
                        >
                          {saving ? "Đang đổi..." : "Đổi mật khẩu"}
                        </button>
                        <button
                          onClick={() => {
                            setChangingPassword(false);
                            setEditForm((prev) => ({
                              ...prev,
                              currentPassword: "",
                              newPassword: "",
                              confirmPassword: "",
                            }));
                          }}
                          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          Hủy
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Quick Actions */}
                  <div className="pt-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Liên kết nhanh</h3>
                    <div className="space-y-2">
                      <button
                        onClick={() => router.push("/customers/order")}
                        className="w-full text-left px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        📦 Đơn hàng của tôi
                      </button>
                      <button
                        onClick={() => router.push("/")}
                        className="w-full text-left px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        🏠 Về trang chủ
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
