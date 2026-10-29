import type { Metadata } from "next";
import Link from "next/link";
import { LockKeyhole } from "lucide-react";
import { canonicalMetadata } from "@/lib/config/site";

export const metadata: Metadata = { title: "Checkout", description: "NARA checkout information.", robots: { index: false, follow: false }, ...canonicalMetadata("/checkout") };

export default function CheckoutPage() {
  return <section className="checkout-page section container"><div className="checkout-notice"><div className="checkout-icon"><LockKeyhole size={22} /></div><span className="eyebrow">A note before checkout</span><h1>Orders aren’t open <em>just yet.</em></h1><p>We’re confirming product details and pricing before enabling checkout. No order has been submitted, and no payment will be taken on this page.</p><div className="checkout-reasons"><span>Product information pending</span><span>Pricing not yet confirmed</span><span>Live order submission unavailable</span></div><Link className="button" href="/hair-care">Continue exploring</Link><Link className="text-link checkout-back" href="/cart">Return to your bag</Link></div></section>;
}
