"use client";
import app from "@/app/utils/firebaseConfig";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Google login handler
  const handleGoogleLogin = async () => {
    setError(null);
    setLoading(true);
    try {
      const auth = getAuth(app);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Call API to save/update user data to Firestore
      const response = await fetch("/api/create-account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || "",
          photoURL: user.photoURL || "",
          loginMethod: "google", // Add login method to distinguish from email
        }),
      });

      // Check user role for redirect
      if (response.ok) {
        const data = await response.json();
        const userRole = data.user?.role;

        // Redirect based on role
        if (userRole === "admin") {
          router.push("/admin/order");
        } else {
          router.push("/");
        }
      } else {
        console.warn("Không thể lưu thông tin người dùng vào Firestore");
        router.push("/");
      }
    } catch (err: any) {
      setError("Đăng nhập Google thất bại.");
      setLoading(false);
    }
  };

  // Email/Password login handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!email || !password) {
      setError("Vui lòng nhập email và mật khẩu.");
      setLoading(false);
      return;
    }

    try {
      const auth = getAuth(app);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Call API to update user data in Firestore (always as customer for email/password login)
      const response = await fetch("/api/create-account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || "",
          photoURL: user.photoURL || "",
          loginMethod: "email", // Add login method to distinguish from Google
        }),
      });

      // Always redirect to home page for email/password login
      if (!response.ok) {
        console.warn("Không thể cập nhật thông tin người dùng vào Firestore");
      }
      router.push("/");
    } catch (err: any) {
      if (err.code === "auth/user-not-found") {
        setError(
          "❌ Tài khoản này không tồn tại. Vui lòng kiểm tra lại email hoặc đăng ký tài khoản mới."
        );
      } else if (err.code === "auth/wrong-password") {
        setError("🔒 Mật khẩu sai! Vui lòng nhập lại mật khẩu chính xác.");
      } else if (err.code === "auth/invalid-email") {
        setError("📧 Định dạng email không hợp lệ. Vui lòng nhập đúng địa chỉ email.");
      } else if (err.code === "auth/too-many-requests") {
        setError("⚠️ Bạn đã thử đăng nhập quá nhiều lần. Vui lòng đợi một lúc rồi thử lại.");
      } else if (err.code === "auth/user-disabled") {
        setError("🚫 Tài khoản này đã bị vô hiệu hóa. Vui lòng liên hệ hỗ trợ.");
      } else if (err.code === "auth/invalid-credential") {
        setError(
          "🔐 Thông tin đăng nhập không chính xác. Vui lòng kiểm tra lại email và mật khẩu."
        );
      } else {
        setError(
          "💥 Có lỗi xảy ra trong quá trình đăng nhập. Vui lòng thử lại hoặc liên hệ hỗ trợ."
        );
      }
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-0 min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      <div className="relative z-10 w-full max-w-md">
        <div className="rounded-3xl shadow-2xl border border-indigo-100 bg-white/80 backdrop-blur-lg px-8 py-10 flex flex-col items-center animate-fade-in">
          <img
            src="/assets/img/labuca-logo.png"
            alt="Labuca Logo"
            className="w-28 mb-2 drop-shadow"
          />
          <h1 className="text-2xl font-bold text-center text-indigo-700 mb-6 tracking-wide">
            Đăng nhập
          </h1>
          <form onSubmit={handleLogin} className="space-y-5 w-full">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white/90"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="username"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu</label>
              <input
                type="password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white/90"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </div>
            {error && (
              <div className="bg-red-100 text-red-700 px-4 py-2 rounded text-sm">{error}</div>
            )}
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition-colors shadow"
              disabled={loading}
            >
              {loading ? "Đang đăng nhập..." : "Đăng nhập"}
            </button>
          </form>
          <div className="my-6 flex items-center w-full">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="mx-4 text-gray-400 text-sm">hoặc</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2 bg-white border-2 border-indigo-200 hover:bg-indigo-50 text-indigo-700 font-semibold py-2 rounded-lg transition-all shadow"
            disabled={loading}
          >
            <svg className="w-5 h-5" viewBox="0 0 48 48">
              <g>
                <path
                  fill="#4285F4"
                  d="M24 9.5c3.54 0 6.7 1.22 9.19 3.23l6.85-6.85C35.64 2.36 30.13 0 24 0 14.82 0 6.73 5.48 2.69 13.44l7.98 6.2C12.13 13.09 17.62 9.5 24 9.5z"
                />
                <path
                  fill="#34A853"
                  d="M46.1 24.55c0-1.64-.15-3.22-.42-4.74H24v9.01h12.42c-.54 2.9-2.18 5.36-4.64 7.01l7.19 5.6C43.98 37.13 46.1 31.36 46.1 24.55z"
                />
                <path
                  fill="#FBBC05"
                  d="M10.67 28.65c-1.13-3.36-1.13-6.94 0-10.3l-7.98-6.2C.99 16.36 0 20.06 0 24c0 3.94.99 7.64 2.69 11.09l7.98-6.2z"
                />
                <path
                  fill="#EA4335"
                  d="M24 48c6.13 0 11.64-2.03 15.54-5.53l-7.19-5.6c-2.01 1.35-4.6 2.15-8.35 2.15-6.38 0-11.87-3.59-14.33-8.74l-7.98 6.2C6.73 42.52 14.82 48 24 48z"
                />
                <path fill="none" d="M0 0h48v48H0z" />
              </g>
            </svg>
            Đăng nhập với Google
          </button>

          {/* Register link for users without account */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              Chưa có tài khoản?{" "}
              <button
                onClick={() => router.push("/register")}
                className="text-indigo-600 hover:text-indigo-800 font-semibold underline transition-colors"
              >
                Đăng ký
              </button>
            </p>
          </div>
        </div>
        <style jsx global>{`
          @keyframes fade-in {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: none;
            }
          }
          .animate-fade-in {
            animation: fade-in 0.7s cubic-bezier(0.4, 0, 0.2, 1) both;
          }
        `}</style>
      </div>
    </div>
  );
}
