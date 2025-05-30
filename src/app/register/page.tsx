"use client";
import app from "@/app/utils/firebaseConfig";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useState } from "react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    if (!email || !password || !confirmPassword) {
      setError("Vui lòng nhập đầy đủ thông tin.");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Mật khẩu nhập lại không khớp.");
      setLoading(false);
      return;
    }

    try {
      const auth = getAuth(app);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Call API to save user data to Firestore
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
        }),
      });

      if (!response.ok) {
        throw new Error("Lỗi lưu thông tin tài khoản");
      }

      setSuccess("Đăng ký thành công! Bạn có thể đăng nhập.");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      setError(err.message || "Đăng ký thất bại.");
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-0 min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#e0e7ff] via-[#f3e8ff] to-[#c7d2fe]">
      <div className="relative z-10 w-full max-w-md">
        <div className="rounded-3xl shadow-2xl border border-indigo-100 bg-white/70 backdrop-blur-lg px-8 py-10 flex flex-col items-center animate-fade-in">
          <img src="/assets/img/labuca-logo.png" alt="Logo" className="w-28 mb-2 drop-shadow" />
          <h1 className="text-2xl font-bold text-center text-indigo-700 mb-4 tracking-wide">
            Đăng ký tài khoản
          </h1>
          <form onSubmit={handleRegister} className="space-y-5 w-full">
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
                autoComplete="new-password"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nhập lại mật khẩu
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white/90"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
                required
              />
            </div>
            {error && (
              <div className="bg-red-100 text-red-700 px-4 py-2 rounded text-sm">{error}</div>
            )}
            {success && (
              <div className="bg-green-100 text-green-700 px-4 py-2 rounded text-sm">{success}</div>
            )}
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition-colors shadow"
              disabled={loading}
            >
              {loading ? "Đang đăng ký..." : "Đăng ký"}
            </button>
          </form>
          <div className="mt-4 text-sm text-gray-600">
            Đã có tài khoản?{" "}
            <a href="/login" className="text-indigo-600 hover:underline font-medium">
              Đăng nhập
            </a>
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
