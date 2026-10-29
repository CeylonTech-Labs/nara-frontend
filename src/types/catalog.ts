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
};
