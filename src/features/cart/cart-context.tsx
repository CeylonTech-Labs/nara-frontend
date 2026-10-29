"use client";

import { createContext, startTransition, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { getProduct } from "@/data/products";
import type { Product } from "@/types/catalog";

type CartLine = { slug: string; quantity: number };
type CartContextValue = {
  items: CartLine[];
  count: number;
  canCheckout: boolean;
  add: (product: Product) => void;
  remove: (slug: string) => void;
  setQuantity: (slug: string, quantity: number) => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "nara-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let restoredItems: CartLine[] = [];
    try {
      const stored: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
      if (Array.isArray(stored)) {
        restoredItems = stored.filter((line): line is CartLine =>
          typeof line?.slug === "string" && Number.isInteger(line?.quantity) && line.quantity > 0 &&
          getProduct(line.slug)?.status === "available",
        );
      }
    } catch {
      restoredItems = [];
    }
    startTransition(() => {
      setItems(restoredItems);
      setHydrated(true);
    });
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [hydrated, items]);

  const add = useCallback((product: Product) => {
    if (product.status !== "available") return;
    setItems((current) => current.some((line) => line.slug === product.slug)
      ? current.map((line) => line.slug === product.slug ? { ...line, quantity: line.quantity + 1 } : line)
      : [...current, { slug: product.slug, quantity: 1 }]);
  }, []);

  const remove = useCallback((slug: string) => setItems((current) => current.filter((line) => line.slug !== slug)), []);
  const setQuantity = useCallback((slug: string, quantity: number) => {
    if (!Number.isInteger(quantity) || quantity < 1) return remove(slug);
    setItems((current) => current.map((line) => line.slug === slug ? { ...line, quantity } : line));
  }, [remove]);

  const value = useMemo(() => ({
    items,
    count: items.reduce((total, line) => total + line.quantity, 0),
    canCheckout: items.length > 0 && items.every((line) => {
      const product = getProduct(line.slug);
      return product?.status === "available" && product.priceLkr !== null && product.volume !== null && product.ingredients !== null;
    }),
    add, remove, setQuantity,
  }), [items, add, remove, setQuantity]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
