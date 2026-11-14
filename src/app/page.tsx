import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, MessageCircle, Package, Banknote } from "lucide-react";
import { HeritageHero } from "@/components/home/heritage-hero";
import { FeaturedProduct } from "@/components/product/featured-product";
import { CategoryCard } from "@/components/shared/category-card";
import { Reveal } from "@/components/shared/reveal";
import { IngredientsPreview } from "@/components/home/ingredients-preview";
import { TrustBadges } from "@/components/shared/trust-badges";
import { SectionHeading } from "@/components/shared/section-heading";
import { canonicalMetadata } from "@/lib/config/site";

export const metadata: Metadata = { ...canonicalMetadata("/") };

export default function Home() {
  return <>
    <HeritageHero />
    <div className="trust-ribbon"><div className="container"><TrustBadges /></div></div>
    <FeaturedProduct />
    <section className="collections section container"><SectionHeading eyebrow="Find your ritual" title="A little care, every day" description="Explore our hair oils, and discover what’s next for NARA." /><div className="grid-two"><Reveal><CategoryCard title="Hair care" subtitle="Hair oils · Shampoo & toner coming soon" href="/hair-care" image="/images/collections/hair-care-v2.webp" tone="maroon" /></Reveal><Reveal delay={.1}><CategoryCard title="Skin care" subtitle="Natural soap & face serum · Coming soon" href="/skin-care" image="/images/brand/nara-logo.jpeg" tone="forest" /></Reveal></div></section>
    <IngredientsPreview />
    <section className="heritage-story section"><div className="container heritage"><Reveal><figure className="heritage-figure"><div className="heritage-image landscape-image"><Image src="/images/heritage/sigiriya.webp" alt="Sigiriya rock fortress rising above the forest in evening light, seen from Pidurangala Rock" fill sizes="(max-width: 760px) 90vw, 580px" /></div><figcaption className="photo-credit">Sigiriya from Pidurangala. Photo: <a href="https://commons.wikimedia.org/wiki/File:Sigiriya,_taken_from_Pidurangala_Rock.jpg" target="_blank" rel="noreferrer">C.J.Hatton</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noreferrer license">CC BY-SA 4.0</a>, cropped.</figcaption></figure></Reveal><Reveal delay={.1}><div className="heritage-copy"><span className="eyebrow">The island, our inspiration</span><h2>Inspired by Sri Lanka’s <em>Timeless Heritage</em></h2><p>Warm earth, botanical abundance, the intricate beauty of a carved doorway. NARA’s visual world draws from the colours and textures of Sri Lanka.</p><p>Our collection brings that inspiration to an everyday ritual of care. A contemporary expression of the island we call home.</p><Link className="text-link" href="/about">Our story <ArrowRight size={14} /></Link></div></Reveal></div></section>
    <section className="order-section section"><div className="container"><SectionHeading eyebrow="A personal touch" title="Care is a conversation" description="Discover your oil and speak with NARA about availability and delivery." /><div className="order-steps"><div><span>01</span><Package size={21} /><h3>Find your ritual</h3><p>Compare our two 30 ml oils and explore their label ingredients.</p></div><div><span>02</span><MessageCircle size={21} /><h3>Message NARA</h3><p><Link href="/contact">Ask us about current pricing and availability on WhatsApp.</Link></p></div><div><span>03</span><Banknote size={21} /><h3>Delivery, with care</h3><p>Cash on delivery available. Confirm delivery coverage and charges with us before ordering.</p></div></div></div></section>
    <section className="closing-cta"><div className="container"><span className="eyebrow">Love Your Beauty Again</span><h2>Your ritual.<br /><em>Our island’s inspiration.</em></h2><Link className="button button-light" href="/contact">Talk to NARA <ArrowRight size={15} /></Link></div></section>
  </>;
}
