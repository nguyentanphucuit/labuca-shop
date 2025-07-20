"use client";

import { Truck } from "lucide-react";
import { useEffect, useState } from "react";

export default function ShippingAnnouncement() {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll to hide/show banner
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down - hide banner
        setIsScrolled(true);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up - show banner
        setIsScrolled(false);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed top-0 left-0 right-0 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 text-white py-2 px-2 sm:px-4 z-40 shadow-lg border-b border-purple-400 transition-transform duration-300 ${
        isScrolled ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-center text-center relative">
        {/* Animated background pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>

        {/* Truck icon with animation */}
        <div className="relative z-10 mr-2 sm:mr-3 flex-shrink-0">
          <Truck className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>

        {/* Main text */}
        <div className="relative z-10 text-xs sm:text-sm font-medium leading-relaxed">
          <span className="font-bold text-sm sm:text-base bg-white text-red-600 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md mr-1.5 sm:mr-2 shadow-sm">
            LABUCA
          </span>
          <span className="hidden sm:inline">
            {" "}
            miễn phí giao hàng trên toàn quốc với sản phẩm trị giá từ{" "}
          </span>
          <span className="sm:hidden"> miễn phí giao hàng toàn quốc từ </span>
          <span className="font-bold text-sm sm:text-base bg-white/20 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md ml-1.5 sm:ml-2">
            300.000 VND
          </span>
        </div>

        {/* Decorative elements - hidden on mobile */}
        <div className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white/30 rounded-full animate-ping hidden sm:block"></div>
        <div
          className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white/30 rounded-full animate-ping hidden sm:block"
          style={{ animationDelay: "0.5s" }}
        ></div>
      </div>
    </div>
  );
}
