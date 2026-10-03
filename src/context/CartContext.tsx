"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import type { ColourId, Size } from "@/types/product";

export interface CartItem {
  productId: string;
  colour: ColourId;
  size: Size;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  totalQuantity: number;
  addToCart: (item: CartItem) => void;
}

const CartContext = createContext<CartContextValue | null>(null);

const isSameVariant = (a: CartItem, b: CartItem) =>
  a.productId === b.productId && a.colour === b.colour && a.size === b.size;

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = useCallback((item: CartItem) => {
    setItems((current) => {
      const existing = current.find((line) => isSameVariant(line, item));
      if (!existing) return [...current, item];
      return current.map((line) =>
        line === existing ? { ...line, quantity: line.quantity + item.quantity } : line,
      );
    });
  }, []);

  const value = useMemo(
    () => ({
      items,
      totalQuantity: items.reduce((sum, line) => sum + line.quantity, 0),
      addToCart,
    }),
    [items, addToCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside <CartProvider>");
  return context;
}
