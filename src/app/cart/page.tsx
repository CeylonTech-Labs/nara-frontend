import type { Metadata } from "next";
import { CartContents } from "@/features/cart/cart-contents";
import { canonicalMetadata } from "@/lib/config/site";

export const metadata: Metadata = { title: "Your Bag", description: "Review the items in your NARA shopping bag.", robots: { index: false, follow: false }, ...canonicalMetadata("/cart") };

export default function CartPage() { return <section className="cart-page section container"><div className="page-intro page-intro-small"><span className="eyebrow">Your NARA bag</span><h1>A considered <em>choice.</em></h1></div><CartContents /></section>; }
