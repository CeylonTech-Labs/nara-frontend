import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PriceTag } from "./price-tag";
import type { Product } from "@/types/catalog";
import { ProductImage } from "./product-image";
import { ProductPurchase } from "./product-purchase";

export function ProductCard({ product }: { product: Product }) {
  return <article className="product-card">
    <Link className="product-image" href={`/products/${product.slug}`} aria-label={`View ${product.name}`}>
      <ProductImage src={product.image} alt={product.imageAlt} fill sizes="(max-width: 600px) 90vw, (max-width: 1024px) 45vw, 380px" />
      <span className="status-badge">{product.status === "coming-soon" ? "Coming soon" : product.volume}</span>
    </Link>
    <div className="product-card-copy"><div><span className="product-category">{product.category === "hair-care" ? "Hair care" : "Skin care"}</span><h3><Link href={`/products/${product.slug}`}>{product.name}</Link></h3><p><PriceTag product={product} fallback={product.status === "coming-soon" ? "Details coming soon" : "Price pending"} /></p></div></div>
    <Link className="text-link" href={`/products/${product.slug}`}>View details <ArrowUpRight size={15} /></Link>
    {product.status === "available" && product.purchasable && <ProductPurchase product={product} />}
  </article>;
}
