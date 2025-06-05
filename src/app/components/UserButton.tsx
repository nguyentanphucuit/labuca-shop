"use client";

import { getAuth, onAuthStateChanged, signOut, User } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { Image, LogOut, Package, ShoppingBag, UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import app from "@/app/utils/firebaseConfig";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Constants
const BUTTON_BASE_STYLES =
  "block w-full text-left px-4 py-2.5 text-sm rounded-md transition-all duration-200 flex items-center gap-2";
const MENU_ITEM_STYLES = `${BUTTON_BASE_STYLES} text-gray-600 hover:text-black hover:bg-gray-50`;
const LOGOUT_ITEM_STYLES = `${BUTTON_BASE_STYLES} text-red-600 hover:text-red-800 hover:bg-red-50`;

const db = getFirestore(app);

export default function UserButton() {
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const auth = getAuth(app);

  // Fetch user role from Firestore
  const fetchUserRole = async (currentUser: User): Promise<string> => {
    try {
      const userDoc = await getDoc(doc(db, "users", currentUser.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        return userData.role || "customer";
      }
      return "customer";
    } catch (error) {
      console.error("Error fetching user role:", error);
      return "customer";
    }
  };

  // Authentication effect
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        const role = await fetchUserRole(currentUser);
        setUserRole(role);
      } else {
        setUserRole(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  // Event handlers
  const handleSignOut = async (): Promise<void> => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleOrdersClick = (): void => {
    const route = userRole === "admin" ? "/admin/order" : "/customers/order";
    router.push(route);
  };

  const handleLogin = (): void => {
    router.push("/login");
  };

  // Loading state
  if (loading) {
    return (
      <div className="relative p-2 rounded-full bg-gray-100 animate-pulse">
        <div className="h-6 w-6 bg-gray-300 rounded" />
      </div>
    );
  }

  // Not logged in state
  if (!user) {
    return (
      <button
        type="button"
        onClick={handleLogin}
        className="relative p-2 rounded-full bg-gray-100 text-gray-700 hover:text-gray-900 hover:bg-gray-200 transition-colors duration-200"
        title="Đăng nhập"
        aria-label="Đăng nhập"
      >
        <UserIcon className="h-6 w-6" />
      </button>
    );
  }

  // User avatar component
  const UserAvatar = () => (
    <>
      {user.photoURL ? (
        <img src={user.photoURL} alt="User avatar" className="h-6 w-6 rounded-full object-cover" />
      ) : (
        <div className="h-6 w-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
          <span className="text-white text-xs font-bold">
            {user.displayName?.charAt(0)?.toUpperCase() ||
              user.email?.charAt(0)?.toUpperCase() ||
              "U"}
          </span>
        </div>
      )}
      <span className="absolute -top-1 -right-1 bg-green-500 w-3 h-3 rounded-full border-2 border-white" />
    </>
  );

  // Menu items data
  const menuItems = [
    {
      icon: UserIcon,
      label: "Hồ sơ",
      onClick: () => router.push("/profile"),
      show: true,
    },
    {
      icon: ShoppingBag,
      label: "Đơn hàng",
      onClick: handleOrdersClick,
      show: true,
    },
    {
      icon: Package,
      label: "Quản lý sản phẩm",
      onClick: () => router.push("/admin/products"),
      show: userRole === "admin",
    },
    {
      icon: Image,
      label: "Quản lý banner",
      onClick: () => router.push("/admin/banner"),
      show: userRole === "admin",
    },
  ];

  // Logged in state
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="relative p-2 rounded-full bg-gray-100 text-gray-700 hover:text-gray-900 hover:bg-gray-200 transition-colors duration-200 outline-none"
        aria-label="User menu"
      >
        <UserAvatar />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="bg-white border border-gray-100 rounded-lg shadow-lg mt-2 min-w-[200px] p-1"
        align="end"
        sideOffset={8}
      >
        {/* User info header */}
        <div className="px-4 py-2 text-sm text-gray-600 border-b border-gray-100">
          <p className="font-medium text-gray-900">{user.displayName || "Người dùng"}</p>
          <p className="text-xs truncate">{user.email}</p>
        </div>

        {/* Menu items */}
        {menuItems.map((item) =>
          item.show ? (
            <DropdownMenuItem key={item.label} className="focus:outline-none">
              <button onClick={item.onClick} className={MENU_ITEM_STYLES}>
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            </DropdownMenuItem>
          ) : null
        )}

        <DropdownMenuSeparator className="my-1 border-gray-100" />

        {/* Logout */}
        <DropdownMenuItem className="focus:outline-none">
          <button onClick={handleSignOut} className={LOGOUT_ITEM_STYLES}>
            <LogOut className="w-4 h-4" />
            Đăng xuất
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
