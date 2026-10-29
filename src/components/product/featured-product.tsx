import type { Product } from "@/types/catalog";
import { ProductCard } from "@/components/product/product-card";
import { SectionHeading } from "@/components/shared/section-heading";

export function FeaturedProduct({ product }: { product: Product }) {
  return <section className="featured section"><div className="container"><SectionHeading eyebrow="The first ritual" title="A thoughtful beginning" description="Meet the first piece of the NARA story. Product information is being confirmed ahead of launch." /><div className="featured-product"><ProductCard product={product} /></div></div></section>;
}
