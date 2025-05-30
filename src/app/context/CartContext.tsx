"use client";
import { doc, getDoc } from "firebase/firestore";
import React, { createContext, useContext, useState } from "react";
import db from "../utils/firestore";

export interface CartItem {
  id: string;
  quantity: number;
  color: { name: string; value: string };
  size: string;
  // These will be fetched from Firestore
  title?: string;
  price?: number;
  imageUrl?: string;
  discount?: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (itemId: string, color?: string, size?: string) => void;
  updateQuantity: (itemId: string, quantity: number, color?: string, size?: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Function to fetch product details from Firestore
  const fetchProductDetails = async (itemId: string) => {
    try {
      const docRef = doc(db, "products", itemId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        return {
          title: data.title,
          price: data.price,
          imageUrl: data.imageUrl,
          discount: data.discount,
        };
      }
      return null;
    } catch (error) {
      console.error("Error fetching product details:", error);
      return null;
    }
  };

  const addItem = async (newItem: CartItem) => {
    try {
      // Fetch product details when adding item
      const productDetails = await fetchProductDetails(newItem.id);
      if (!productDetails) {
        console.error("Product not found");
        return;
      }

      setItems((currentItems) => {
        // Create unique key for color/size combination
        const itemKey = `${newItem.id}-${newItem.color.name}-${newItem.size}`;

        // Check if item already exists with same id, color, and size
        const existingItemIndex = currentItems.findIndex(
          (item) =>
            item.id === newItem.id &&
            item.color.name === newItem.color.name &&
            item.size === newItem.size
        );

        if (existingItemIndex > -1) {
          // Update quantity of existing item
          const updatedItems = [...currentItems];
          updatedItems[existingItemIndex] = {
            ...updatedItems[existingItemIndex],
            quantity: updatedItems[existingItemIndex].quantity + newItem.quantity,
          };
          return updatedItems;
        }

        // Add new item with product details
        return [...currentItems, { ...newItem, ...productDetails }];
      });

      // Open cart when item is added
      setIsCartOpen(true);
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  const removeItem = (itemId: string, color?: string, size?: string) => {
    setItems((currentItems) =>
      currentItems.filter((item) => {
        if (color && size) {
          // Remove specific variant
          return !(item.id === itemId && item.color.name === color && item.size === size);
        } else {
          // Remove all variants of the product (legacy support)
          return item.id !== itemId;
        }
      })
    );
  };

  const updateQuantity = (itemId: string, quantity: number, color?: string, size?: string) => {
    setItems((currentItems) =>
      currentItems.map((item) => {
        if (color && size) {
          // Update specific variant
          return item.id === itemId && item.color.name === color && item.size === size
            ? { ...item, quantity }
            : item;
        } else {
          // Update by ID only (legacy support)
          return item.id === itemId ? { ...item, quantity } : item;
        }
      })
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
