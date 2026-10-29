"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ShoppingBag } from "lucide-react";
import { useCart } from "@/features/cart/cart-context";
import { formatLkr } from "@/data/products";
import type { Product } from "@/types/catalog";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  return <article className="product-card">
    <Link className="product-image" href={`/products/${product.slug}`} aria-label={`View ${product.name}`}>
      <Image src={product.image} alt={product.imageAlt} fill sizes="(max-width: 760px) 90vw, 360px" />
      {product.status === "coming-soon" && <span className="status-badge">Coming soon</span>}
    </Link>
    <div className="product-card-copy"><div><span className="product-category">{product.category === "hair-care" ? "Hair care" : "Skin care"}</span><h3><Link href={`/products/${product.slug}`}>{product.name}</Link></h3><p>{product.priceLkr === null ? "Details coming soon" : formatLkr(product.priceLkr)}</p>{product.status === "available" && <small className="concept-note">Supplied concept image · details pending</small>}</div>
      {product.status === "available" ? <button className="icon-button" onClick={() => add(product)} aria-label={`Add ${product.name} to bag`}><ShoppingBag size={17} /></button> : <span className="coming-label">Coming soon</span>}
    </div>
    <Link className="card-arrow" href={`/products/${product.slug}`} aria-label={`Discover ${product.name}`}><ArrowUpRight size={17} /></Link>
  </article>;
}
