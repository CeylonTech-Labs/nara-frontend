import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowDown, ArrowRight, Check, MessageCircle } from "lucide-react";
import { products } from "@/data/products";
import { FeaturedProduct } from "@/components/product/featured-product";
import { CategoryCard } from "@/components/shared/category-card";
import { Reveal } from "@/components/shared/reveal";
import { IngredientsPreview } from "@/components/home/ingredients-preview";
import { TrustBadges } from "@/components/shared/trust-badges";
import { SectionHeading } from "@/components/shared/section-heading";
import { canonicalMetadata } from "@/lib/config/site";

export const metadata: Metadata = { ...canonicalMetadata("/") };

export default function Home() {
  const launchProduct = products[0];
  return <>
    <section className="hero">
      <div className="hero-image"><Image src={launchProduct.image} alt={launchProduct.imageAlt} fill priority sizes="100vw" /></div>
      <div className="hero-shade" />
      <div className="container hero-content"><span className="hero-kicker"><span /> Sri Lankan heritage beauty</span><h1>The beauty<br />of our <em>heritage.</em></h1><p>A considered return to the rituals, botanicals and quiet care that have always been part of us.</p><div className="hero-actions"><Link className="button button-light" href="/products/hair-oil">Discover NARA Hair Oil <ArrowRight size={15} /></Link><Link className="hero-text-link" href="/about">The NARA story</Link></div></div>
      <div className="hero-caption"><span>01 / A new chapter</span><span>Inspired by the island</span><ArrowDown size={16} /></div>
    </section>

    <section className="intro section container">
      <Reveal><div className="intro-mark"><span className="ornament">✳</span><span className="eyebrow">Beauty, remembered</span><h2>The Beauty of<br /><em>Our Heritage</em></h2><p>Some rituals are more than routine. They are a way of remembering where we come from, and a gentle way of caring for ourselves today.</p><Link className="text-link" href="/about">Meet NARA <ArrowRight size={14} /></Link></div></Reveal>
      <Reveal delay={0.12}><div className="intro-image"><Image src="/images/products/nara-hair-oil-concept.jpeg" alt="NARA hair oil concept image, styled with a Sri Lankan-inspired fresco backdrop" fill sizes="(max-width: 760px) 90vw, 520px" /><span className="image-note">A supplied concept image · final product presentation pending</span></div></Reveal>
    </section>

    <FeaturedProduct product={launchProduct} />

    <section className="collections section container"><SectionHeading eyebrow="Find your ritual" title="Care, in its own time" description="Two collections, thoughtfully taking shape." /><div className="grid-two"><CategoryCard title="Hair care" subtitle="Explore the collection" href="/hair-care" image="/images/products/nara-hair-oil-concept.jpeg" tone="maroon" /><CategoryCard title="Skin care" subtitle="Coming into bloom" href="/skin-care" image="/images/brand/nara-logo.jpeg" tone="forest" /></div></section>

    <IngredientsPreview />

    <section className="heritage section container"><div className="heritage-image"><Image src="/images/brand/nara-logo.jpeg" alt="NARA brand mark on warm ivory paper" fill sizes="(max-width: 760px) 90vw, 520px" /></div><div className="heritage-copy"><span className="eyebrow">A little about us</span><h2>Old wisdom.<br /><em>A softer rhythm.</em></h2><p>NARA is a Sri Lankan beauty house shaped by a deep affection for the island: its living traditions, its botanical richness and the people who carry its stories forward.</p><p>We are beginning simply, building with intention, and sharing only what is ready to be known.</p><Link className="text-link" href="/about">Our story <ArrowRight size={14} /></Link></div></section>

    <section className="order-section section"><div className="container"><SectionHeading eyebrow="When you’re ready" title="A simple way to order" description="A few clear steps, with a real person nearby if you need help." /><TrustBadges /><div className="order-steps"><div><span>01</span><Check size={19} /><h3>Choose your ritual</h3><p>Explore the products currently available.</p></div><div><span>02</span><MessageCircle size={19} /><h3>Ask us anything</h3><p>Our WhatsApp contact will be available once configured.</p></div><div><span>03</span><ArrowRight size={19} /><h3>Pay on delivery</h3><p>Cash on delivery is planned for Sri Lankan orders.</p></div></div></div></section>

    <section className="closing-cta"><div className="container"><span className="eyebrow">The beginning of something familiar</span><h2>Let’s make room<br />for a little <em>care.</em></h2><Link className="button button-light" href="/contact">Get in touch <ArrowRight size={15} /></Link></div></section>
  </>;
}
