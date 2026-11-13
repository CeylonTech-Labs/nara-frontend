import type { Metadata } from "next";
import { ProductGrid } from "@/components/product/product-grid";
import { products } from "@/data/products";
import { canonicalMetadata } from "@/lib/config/site";

export const metadata: Metadata = { title: "Hair Care", description: "Explore the NARA hair care collection, inspired by Sri Lankan beauty rituals.", ...canonicalMetadata("/hair-care") };

export default function HairCarePage() {
  return <section className="collection-page section container"><div className="page-intro"><span className="eyebrow">NARA collections · 01</span><h1>Hair care, <em>with heritage.</em></h1><p>A collection beginning with a familiar ritual. Order on WhatsApp, with cash on delivery across Sri Lanka.</p></div><ProductGrid items={products.filter((product) => product.category === "hair-care")} /></section>;
}
