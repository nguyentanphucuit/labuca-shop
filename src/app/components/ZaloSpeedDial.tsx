"use client";
import Image from "next/image";
import Link from "next/link";

export default function ZaloSpeedDial() {
  return (
    <Link
      href="https://zalo.me/0905075588"
      className="flex items-center gap-3 px-4 py-2.5 rounded-full
        bg-blue-500/10 hover:bg-blue-500/20
        transition-all duration-200
        hover:scale-[1.02] group"
    >
      <div
        className="relative flex items-center justify-center w-9 h-9 rounded-full 
        bg-gradient-to-br from-blue-400 to-blue-600
        transition-transform duration-200 group-hover:rotate-12 
        shadow-lg shadow-blue-500/30"
      >
        <div className="relative z-10">
          <Image
            src="/assets/img/zalo.png"
            alt="zalo-contact"
            width={24}
            height={24}
            className="w-5 h-5 object-contain"
          />
        </div>
        {/* Ripple Effect only on icon */}
        <span className="absolute inset-0 rounded-full animate-ping bg-blue-500" />
      </div>
      <span className="text-base font-medium bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
        Zalo Chat
      </span>
    </Link>
  );
}
