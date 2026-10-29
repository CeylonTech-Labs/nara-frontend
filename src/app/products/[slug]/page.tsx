import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getProduct, products } from "@/data/products";
import { ProductPurchase } from "@/components/product/product-purchase";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { canonicalMetadata } from "@/lib/config/site";

export function generateStaticParams() { return products.map((product) => ({ slug: product.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  return product ? { title: product.name, description: product.description, ...canonicalMetadata(`/products/${product.slug}`) } : {};
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  return <section className="product-detail section container"><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: product.category === "hair-care" ? "Hair care" : "Skin care", href: product.category === "hair-care" ? "/hair-care" : "/skin-care" }, { label: product.name }]} /><div className="product-detail-grid"><div className="product-detail-image"><Image src={product.image} alt={product.imageAlt} fill priority sizes="(max-width: 760px) 90vw, 600px" /></div><div className="product-detail-copy"><span className="eyebrow">{product.category === "hair-care" ? "Hair care" : "Skin care"} · NARA collection</span><h1>{product.name}</h1><p>{product.description}</p><dl className="product-facts"><div><dt>Price</dt><dd>{product.priceLkr === null ? "To be confirmed" : `LKR ${product.priceLkr}`}</dd></div><div><dt>Volume</dt><dd>{product.volume ?? "To be confirmed"}</dd></div><div><dt>Ingredients</dt><dd>{product.ingredients?.join(", ") ?? "To be confirmed"}</dd></div></dl><ProductPurchase product={product} /><p className="product-disclaimer">Product imagery is a supplied concept. Final product presentation and details are pending confirmation.</p></div></div></section>;
}
