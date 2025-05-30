"use client";
import app from "@/app/utils/firebaseConfig";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getAuth, onAuthStateChanged, signOut, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function UserButton() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      console.error("Lỗi đăng xuất:", error);
    }
  };

  const handleLogin = () => {
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="relative p-2 rounded-full bg-gray-100 animate-pulse">
        <div className="h-6 w-6 bg-gray-300 rounded"></div>
      </div>
    );
  }

  if (!user) {
    // Not logged in - show login button
    return (
      <button
        type="button"
        onClick={handleLogin}
        className="relative p-2 rounded-full bg-gray-100 text-gray-700 hover:text-gray-900 hover:bg-gray-200 transition-colors duration-200"
        title="Đăng nhập"
      >
        <span className="sr-only">Đăng nhập</span>
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
          />
        </svg>
      </button>
    );
  }

  // Logged in - show user dropdown
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="relative p-2 rounded-full bg-gray-100 text-gray-700 hover:text-gray-900 hover:bg-gray-200 transition-colors duration-200 outline-none">
        <span className="sr-only">Tài khoản người dùng</span>
        {user.photoURL ? (
          <img src={user.photoURL} alt="Avatar" className="h-6 w-6 rounded-full object-cover" />
        ) : (
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>
        )}
        {/* Online indicator */}
        <span className="absolute -top-1 -right-1 bg-green-500 w-3 h-3 rounded-full border-2 border-white"></span>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="bg-white border border-gray-100 rounded-lg shadow-lg mt-2 min-w-[200px] p-1"
        align="end"
        sideOffset={8}
      >
        <div className="px-4 py-2 text-sm text-gray-600 border-b border-gray-100">
          <p className="font-medium text-gray-900">{user.displayName || "Người dùng"}</p>
          <p className="text-xs truncate">{user.email}</p>
        </div>

        <DropdownMenuItem className="focus:outline-none">
          <button
            onClick={() => router.push("/profile")}
            className="block w-full text-left px-4 py-2.5 text-sm text-gray-600 hover:text-black rounded-md hover:bg-gray-50 transition-all duration-200"
          >
            Hồ sơ
          </button>
        </DropdownMenuItem>

        <DropdownMenuItem className="focus:outline-none">
          <button
            onClick={() => router.push("/orders")}
            className="block w-full text-left px-4 py-2.5 text-sm text-gray-600 hover:text-black rounded-md hover:bg-gray-50 transition-all duration-200"
          >
            Đơn hàng
          </button>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="my-1 border-gray-100" />

        <DropdownMenuItem className="focus:outline-none">
          <button
            onClick={handleSignOut}
            className="block w-full text-left px-4 py-2.5 text-sm text-red-600 hover:text-red-800 rounded-md hover:bg-red-50 transition-all duration-200"
          >
            Đăng xuất
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
