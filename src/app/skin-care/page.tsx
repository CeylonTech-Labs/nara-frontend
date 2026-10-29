import type { Metadata } from "next";
import { ProductGrid } from "@/components/product/product-grid";
import { products } from "@/data/products";
import { canonicalMetadata } from "@/lib/config/site";

export const metadata: Metadata = { title: "Skin Care", description: "Discover the NARA skin care collection as it takes shape.", ...canonicalMetadata("/skin-care") };

export default function SkinCarePage() {
  return <section className="collection-page section container"><div className="page-intro"><span className="eyebrow">NARA collections · 02</span><h1>Skin care, <em>in its own time.</em></h1><p>Our skin care collection is taking shape. We look forward to sharing more when each product is ready.</p></div><ProductGrid items={products.filter((product) => product.category === "skin-care")} /></section>;
}
