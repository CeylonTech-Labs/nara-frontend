import type { Product } from "@/types/catalog";
import { ProductCard } from "@/components/product/product-card";

export function ProductGrid({ items }: { items: readonly Product[] }) {
  return <div className="product-grid">{items.map((product) => <ProductCard key={product.slug} product={product} />)}</div>;
}
