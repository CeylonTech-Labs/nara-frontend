import type { Product } from "@/types/catalog";
import { botanicalIngredients } from "@/data/ingredients";

export const products: readonly Product[] = [
  {
    slug: "hair-oil", name: "NARA Premium Botanical Hair Oil", category: "hair-care", status: "available",
    description: "Ancient botanicals. Modern care. A luxurious blend of nature’s finest oils and time-honoured herbs, crafted to nourish your scalp, strengthen your hair and bring out its natural shine.",
    priceLkr: 1500, discountPercent: 15, volume: "30 ml", purchasable: true,
    ingredients: botanicalIngredients.map(({ name }) => name),
    usage: "Apply 2–3 times a week on your scalp and hair. Massage gently and leave it for a few hours or overnight. Rinse if needed. For frizz-free, smooth and naturally beautiful hair, you can also use it daily. As stated on the supplied label.",
    image: "/images/products/botanical-v2-cutout.webp", imageAlt: "NARA Premium Botanical Hair Oil, 30 ml, amber dropper bottle with a cream and gold arched label showing a woman among hibiscus and blue water lily",
    gallery: [
      { src: "/images/products/botanical-lifestyle.webp", alt: "NARA Premium Botanical Hair Oil on warm stone with jasmine and a red hibiscus flower", label: "Styled" },
      { src: "/images/products/botanical-back.webp", alt: "Back of the NARA Premium Botanical Hair Oil bottle, showing the description, key ingredients and label badges", label: "Back of bottle" },
      { src: "/images/products/botanical-v2-label.webp", alt: "Full NARA Premium Botanical Hair Oil label artwork with usage instructions, description and key ingredients", label: "Label & ingredients", fullSize: true },
    ],
    imageryNote: "Supplied product artwork for the updated packaging.",
  },
  {
    slug: "rosemary-oil", name: "NARA Premium Rosemary Oil", category: "hair-care", status: "available",
    description: "A rosemary and coconut oil ritual, with NARA’s Sinhala branding and green botanical artwork.",
    priceLkr: 900, discountPercent: 15, volume: "30 ml", purchasable: true,
    ingredients: ["Virgin Coconut Oil", "Rosemary", "Rosemary Essential Oil"],
    usage: "Apply a few drops to your scalp and hair. Massage gently for 2–5 minutes. Leave it on or use before washing, 2–3 times a week. As stated on the supplied label.",
    image: "/images/products/rosemary-cutout.webp", imageAlt: "NARA Premium Rosemary Oil, 30 ml, amber dropper bottle with Sinhala branding and a woman wearing a red flower",
    gallery: [{ src: "/images/products/rosemary-label.webp", alt: "Supplied Rosemary Oil front and back label artwork with ingredient list and usage instructions", label: "Label & ingredients", fullSize: true }],
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
