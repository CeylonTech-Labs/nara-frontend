import { hairOils } from "@/data/products";
import { ProductCard } from "@/components/product/product-card";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";

export function FeaturedProduct() {
  return <section className="featured section" id="hair-oils"><div className="container"><SectionHeading eyebrow="Two oils. Your everyday ritual." title="Our signature hair oils" description="Botanical richness, thoughtful care, and a little of the island in every bottle." /><div className="signature-grid">{hairOils.map((product, i) => <Reveal key={product.slug} delay={i * .1}><ProductCard product={product} /></Reveal>)}</div></div></section>;
}
