import { formatLkr } from "@/data/products";
import { getPricing, type Product } from "@/types/catalog";

/** Shows the payable price, with the original price and offer when one applies. */
export function PriceTag({ product, quantity = 1, fallback = "Price pending" }: { product: Product; quantity?: number; fallback?: string }) {
  const pricing = getPricing(product);
  if (!pricing) return <span className="price-tag">{fallback}</span>;
  const payable = formatLkr(pricing.payableLkr * quantity);
  if (!pricing.percentOff) return <span className="price-tag"><strong className="price-now">{payable}</strong></span>;
  return <span className="price-tag">
    <strong className="price-now"><span className="sr-only">Offer price </span>{payable}</strong>
    <del className="price-was"><span className="sr-only">Original price </span>{formatLkr(pricing.listLkr * quantity)}</del>
    <span className="offer-badge">{pricing.percentOff}% off</span>
  </span>;
}
