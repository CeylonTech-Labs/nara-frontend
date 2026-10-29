"use client";

import { ShoppingBag } from "lucide-react";
import { useCart } from "@/features/cart/cart-context";
import type { Product } from "@/types/catalog";

export function ProductPurchase({ product }: { product: Product }) {
  const { add } = useCart();
  if (product.status !== "available") return <span className="status-badge status-large">Coming soon</span>;
  return <div className="purchase-action"><button className="button" onClick={() => add(product)}><ShoppingBag size={16} /> Add to bag</button><p>Pricing and product details are being confirmed. Checkout is not available yet.</p></div>;
}
