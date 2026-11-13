import type { Product } from "@/types/catalog";
import { botanicalIngredients } from "@/data/ingredients";

export const products: readonly Product[] = [
  {
    slug: "hair-oil", name: "NARA Premium Botanical Hair Oil", category: "hair-care", status: "available",
    description: "A botanical hair oil inspired by Sri Lankan beauty rituals, presented in NARA’s cream and gold floral artwork.",
    priceLkr: 1500, discountPercent: 15, volume: "30 ml", purchasable: true,
    ingredients: botanicalIngredients.map(({ name }) => name),
    usage: "Apply to your scalp and hair 2–3 times a week. Massage gently and leave for a few hours or overnight. Rinse if needed. As stated on the supplied label.",
    image: "/images/products/botanical-cutout.webp", imageAlt: "NARA Premium Botanical Hair Oil, 30 ml, amber dropper bottle with cream and gold floral label",
    gallery: [{ src: "/images/products/botanical-label.webp", alt: "Supplied Botanical Hair Oil reference showing front label, back label, ingredient list and bottle" }],
    imageryNote: "Supplied product artwork; final product photography is pending.",
  },
  {
    slug: "rosemary-oil", name: "NARA Premium Rosemary Oil", category: "hair-care", status: "available",
    description: "A rosemary and coconut oil ritual, with NARA’s Sinhala branding and green botanical artwork.",
    priceLkr: 900, discountPercent: 15, volume: "30 ml", purchasable: true,
    ingredients: ["Virgin Coconut Oil", "Rosemary", "Rosemary Essential Oil"],
    usage: "Apply a few drops to your scalp and hair. Massage gently for 2–5 minutes. Leave it on or use before washing, 2–3 times a week. As stated on the supplied label.",
    image: "/images/products/rosemary-cutout.webp", imageAlt: "NARA Premium Rosemary Oil, 30 ml, amber dropper bottle with Sinhala branding and a woman wearing a red flower",
    gallery: [{ src: "/images/products/rosemary-label.webp", alt: "Supplied Rosemary Oil front and back label artwork with ingredient list and usage instructions" }],
    imageryNote: "Supplied product artwork. The price printed on the label is not the current selling price.",
  },
  ...([
    ["shampoo", "Shampoo", "hair-care"], ["hair-toner", "Hair Toner", "hair-care"],
    ["natural-soap", "Natural Soap", "skin-care"], ["face-serum", "Face Serum", "skin-care"],
  ] as const).map(([slug, name, category]): Product => ({ slug, name, category, status: "coming-soon", description: "A future addition to the NARA collection. Details will be shared when ready.", priceLkr: null, volume: null, ingredients: null, purchasable: false, image: "/images/brand/nara-logo.jpeg", imageAlt: "NARA botanical brand emblem; product photography pending" })),
];
export const hairOils = products.filter((product) => product.status === "available" && product.category === "hair-care");
export const getProduct = (slug: string) => products.find((product) => product.slug === slug);
export const formatLkr = (amount: number) => new Intl.NumberFormat("en-LK", { style: "currency", currency: "LKR", maximumFractionDigits: 0 }).format(amount);
