"use client";

import { useState } from "react";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/features/cart/cart-context";
import { isPurchasable, type Product } from "@/types/catalog";

export function ProductPurchase({ product }: { product: Product }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  if (product.status !== "available") return <span className="status-badge status-large">Coming soon</span>;
  if (!isPurchasable(product)) return <p className="price-pending">Price pending · Contact us for availability.</p>;
  return <div className="purchase-action"><button className="button" onClick={() => { add(product); setAdded(true); }}><ShoppingBag size={16} /> Add to bag</button><span role="status">{added ? `${product.name} added to your bag.` : ""}</span></div>;
}
