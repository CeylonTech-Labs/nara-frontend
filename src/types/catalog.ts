export type ProductStatus = "available" | "coming-soon";
export type ProductCategory = "hair-care" | "skin-care";

export type Product = {
  slug: string;
  name: string;
  category: ProductCategory;
  status: ProductStatus;
  description: string;
  priceLkr: number | null;
  volume: string | null;
  ingredients: readonly string[] | null;
  image: string;
  imageAlt: string;
  /** Extra product images. `label` names the thumbnail; `fullSize` offers a full-size link (for label artwork). */
  gallery?: readonly { src: string; alt: string; label?: string; fullSize?: boolean }[];
  usage?: string;
  imageryNote?: string;
  purchasable?: boolean;
  /** Current offer, as a whole percentage off priceLkr. */
  discountPercent?: number;
};

export const isPurchasable = (product: Product) => product.status === "available" && product.purchasable === true && product.priceLkr !== null && product.priceLkr > 0;

export type Pricing = { listLkr: number; payableLkr: number; percentOff: number };

/** The single source of displayed and ordered prices, including any current offer. */
export const getPricing = (product: Product): Pricing | null => {
  if (product.priceLkr === null || product.priceLkr <= 0) return null;
  const percentOff = product.discountPercent && product.discountPercent > 0 && product.discountPercent < 100 ? product.discountPercent : 0;
  return { listLkr: product.priceLkr, payableLkr: Math.round(product.priceLkr * (100 - percentOff) / 100), percentOff };
};
