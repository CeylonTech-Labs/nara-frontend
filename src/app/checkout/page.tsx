import type { Metadata } from "next";
import { CheckoutFlow } from "@/features/order/checkout-flow";
import { canonicalMetadata } from "@/lib/config/site";

export const metadata: Metadata = { title: "Confirm Order", description: "Confirm your NARA order on WhatsApp.", robots: { index: false, follow: false }, ...canonicalMetadata("/checkout") };

export default function CheckoutPage() {
  return <section className="checkout-page section container"><CheckoutFlow /></section>;
}
