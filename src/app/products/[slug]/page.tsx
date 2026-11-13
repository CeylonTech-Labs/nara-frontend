import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct, products } from "@/data/products";
import { ProductPurchase } from "@/components/product/product-purchase";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductGrid } from "@/components/product/product-grid";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { canonicalMetadata, siteContact } from "@/lib/config/site";
import { getWhatsAppUrl } from "@/lib/utils/whatsapp";
import { PriceTag } from "@/components/product/price-tag";
import { MessageCircle } from "lucide-react";

export function generateStaticParams() { return products.map((product) => ({ slug: product.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  return product ? { title: `${product.name}${product.volume ? ` — ${product.volume}` : ""}`, description: product.description, openGraph: { title: product.name, description: product.description, images: [{ url: product.image, alt: product.imageAlt }] }, ...canonicalMetadata(`/products/${product.slug}`) } : {};
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const whatsapp = getWhatsAppUrl(siteContact.whatsappNumber, `Hello NARA, I would like to enquire about ${product.name}${product.volume ? ` (${product.volume})` : ""}.`);
  const related = products.filter((item) => item.category === product.category && item.slug !== product.slug).slice(0, 3);
  const structuredData = { "@context": "https://schema.org", "@type": "Product", name: product.name, description: product.description, image: product.image, brand: { "@type": "Brand", name: "NARA" }, ...(product.volume ? { size: product.volume } : {}) };
  return <section className="product-detail section container"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} /><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: product.category === "hair-care" ? "Hair care" : "Skin care", href: product.category === "hair-care" ? "/hair-care" : "/skin-care" }, { label: product.name }]} />
    <div className="product-detail-grid"><ProductGallery product={product} /><div className="product-detail-copy"><span className="eyebrow">{product.category === "hair-care" ? "Hair care" : "Skin care"} · NARA collection</span><h1>{product.name}</h1><p>{product.description}</p>
      <dl className="product-facts"><div><dt>Price</dt><dd><PriceTag product={product} fallback="To be confirmed" /></dd></div><div><dt>Volume</dt><dd>{product.volume ?? "To be confirmed"}</dd></div></dl>
      <ProductPurchase product={product} />{whatsapp && <a className="button button-secondary enquiry-button" href={whatsapp} target="_blank" rel="noreferrer"><MessageCircle size={17} /> Enquire on WhatsApp</a>}
      <div className="product-information"><h2>Ingredients</h2>{product.ingredients ? <ul className="label-ingredient-list">{product.ingredients.map((ingredient) => <li key={ingredient}>{ingredient}</li>)}</ul> : <p>Ingredient details will be shared ahead of launch.</p>}<h2>Your ritual</h2><p>{product.usage ?? "Usage instructions will be shared ahead of launch."}</p><h2>Delivery & payment</h2><p>Cash on delivery in Sri Lanka. Add to your bag and confirm your order on WhatsApp; NARA will reply to confirm the delivery fee and delivery time.</p></div>
    </div></div>
    {related.length > 0 && <div className="related-products"><span className="eyebrow">Discover the collection</span><h2>A little more to explore</h2><ProductGrid items={related} /></div>}
  </section>;
}
