"use client";
import { Phone } from "lucide-react";

export default function PhoneSpeedDial() {
  return (
    <div className="fixed bottom-6 left-6 z-50 flex items-center gap-3">
      {/* Phone Button with Number */}
      <a
        href="tel:0978552409"
        className="flex items-center gap-3 px-4 py-2.5 rounded-full
          bg-cyan-500/10 hover:bg-cyan-500/20
          transition-all duration-200
          hover:scale-[1.02] group"
      >
        <div
          className="relative flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600
          transition-transform duration-200 group-hover:rotate-12 shadow-lg shadow-cyan-500/30"
        >
          <Phone className="w-5 h-5 text-white relative z-10" />
          {/* Ripple Effect only on icon */}
          <span className="absolute inset-0 rounded-full animate-ping bg-cyan-500" />
        </div>
        <span className="text-base font-medium bg-gradient-to-r from-cyan-600 to-cyan-500 bg-clip-text text-transparent">
          0978 552 409
        </span>
      </a>
    </div>
  );
}
