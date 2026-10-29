import type { Product } from "@/types/catalog";

export const products: readonly Product[] = [
  {
    slug: "hair-oil",
    name: "NARA Hair Oil",
    category: "hair-care",
    status: "available",
    description: "Our first hair care offering, inspired by the care rituals passed through generations.",
    priceLkr: null,
    volume: null,
    ingredients: null,
    image: "/images/products/nara-hair-oil-concept.jpeg",
    imageAlt: "NARA hair oil concept photograph against a warm, heritage-inspired backdrop",
  },
  { slug: "shampoo", name: "Shampoo", category: "hair-care", status: "coming-soon", description: "A future addition to the NARA hair care collection.", priceLkr: null, volume: null, ingredients: null, image: "/images/products/nara-hair-oil-concept.jpeg", imageAlt: "Warm botanical-inspired product still life" },
  { slug: "hair-toner", name: "Hair Toner", category: "hair-care", status: "coming-soon", description: "A future addition to the NARA hair care collection.", priceLkr: null, volume: null, ingredients: null, image: "/images/products/nara-hair-oil-concept.jpeg", imageAlt: "Warm botanical-inspired product still life" },
  { slug: "natural-soap", name: "Natural Soap", category: "skin-care", status: "coming-soon", description: "A future addition to the NARA skin care collection.", priceLkr: null, volume: null, ingredients: null, image: "/images/products/nara-hair-oil-concept.jpeg", imageAlt: "Warm botanical-inspired product still life" },
  { slug: "face-serum", name: "Face Serum", category: "skin-care", status: "coming-soon", description: "A future addition to the NARA skin care collection.", priceLkr: null, volume: null, ingredients: null, image: "/images/products/nara-hair-oil-concept.jpeg", imageAlt: "Warm botanical-inspired product still life" },
];

export const getProduct = (slug: string) => products.find((product) => product.slug === slug);
export const formatLkr = (amount: number) => new Intl.NumberFormat("en-LK", { style: "currency", currency: "LKR", maximumFractionDigits: 0 }).format(amount);
