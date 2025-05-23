"use client";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

export default function CartButton() {
  const { items, setIsCartOpen } = useCart();
  const [animate, setAnimate] = useState(false);
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  // Trigger animation when itemCount changes
  useEffect(() => {
    // Only animate if there are items
    if (itemCount > 0) {
      // Reset animation state
      setAnimate(false);

      // Use requestAnimationFrame to ensure smooth animation
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAnimate(true);
        });
      });

      // Reset animation after it completes
      const timer = setTimeout(() => setAnimate(false), 500);
      return () => clearTimeout(timer);
    }
  }, [itemCount]);

  return (
    <button
      type="button"
      onClick={() => setIsCartOpen(true)}
      className="relative p-2 rounded-full bg-gray-100 text-gray-700 hover:text-gray-900 hover:bg-gray-200 transition-colors duration-200"
    >
      <span className="sr-only">Open cart</span>
      {itemCount > 0 && (
        <span
          className={`absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full transition-all duration-500 ease-out
            ${animate ? "scale-110 animate-bounce" : "scale-100"}`}
        >
          {itemCount}
        </span>
      )}
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
          d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
        />
      </svg>
    </button>
  );
}
