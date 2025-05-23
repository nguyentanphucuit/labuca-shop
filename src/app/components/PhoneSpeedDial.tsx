"use client";
import { Phone } from "lucide-react";

export default function PhoneSpeedDial() {
  return (
    <a
      href="tel:0905075588"
      className="flex items-center gap-3 px-4 py-2.5 rounded-full
        bg-cyan-500/10 hover:bg-cyan-500/20
        transition-all duration-200
        hover:scale-[1.02] group"
    >
      <div
        className="relative flex items-center justify-center w-9 h-9 rounded-full 
        bg-gradient-to-br from-cyan-400 to-cyan-600
        transition-transform duration-200 group-hover:rotate-12 
        shadow-lg shadow-cyan-500/30"
      >
        <div className="relative z-10">
          <Phone className="w-5 h-5 text-white" />
        </div>
        {/* Ripple Effect only on icon */}
        <span className="absolute inset-0 rounded-full animate-ping bg-cyan-500" />
      </div>
      <span className="text-base font-medium bg-gradient-to-r from-cyan-600 to-cyan-500 bg-clip-text text-transparent">
        0905.075.588
      </span>
    </a>
  );
}
