import type { MetadataRoute } from "next";
import { products } from "@/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const routes = ["", "/hair-care", "/skin-care", "/about", "/contact"];
  return [...routes.map((route) => ({ url: `${baseUrl}${route}`, changeFrequency: "monthly" as const })), ...products.map((product) => ({ url: `${baseUrl}/products/${product.slug}`, changeFrequency: "monthly" as const }))];
}
