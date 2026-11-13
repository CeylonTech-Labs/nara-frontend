"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { hairOils } from "@/data/products";
import { ProductImage } from "@/components/product/product-image";

export function HeritageHero() {
  const section = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 45]);
  return <section ref={section} className="heritage-hero" aria-labelledby="hero-title">
    <motion.div className="heritage-hero-background" style={{ y: reduce ? 0 : y }}><Image src="/images/heritage/fresco-detail.webp" alt="" fill preload sizes="100vw" /></motion.div>
    <div className="heritage-hero-overlay" />
    <div className="container heritage-hero-grid">
      <motion.div className="heritage-hero-copy" initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduce ? 0 : .7 }}>
        <span className="hero-kicker"><span /> Sri Lankan heritage beauty</span>
        <h1 id="hero-title">The Beauty of<br /><em>Our Heritage</em></h1><span className="hero-ornament" aria-hidden="true">✧ ── ❧ ── ✧</span>
        <p>Rooted in Sri Lankan traditions. Crafted with nature. Made for your everyday beauty ritual.</p>
        <Link href="/#hair-oils" className="button hero-shop">Explore Our Hair Oils <ArrowRight size={16} /></Link>
        <div className="hero-footnote">Love Your Beauty Again <span>•</span> NARA</div>
      </motion.div>
      <motion.div className="hero-oils" initial={reduce ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduce ? 0 : .8, delay: reduce ? 0 : .15 }}>
        <span className="hero-oils-caption">The signature collection · 30 ml</span>
        {hairOils.map((product, i) => <Link className={`hero-oil hero-oil-${i}`} href={`/products/${product.slug}`} key={product.slug}><div className="hero-bottle"><ProductImage src={product.image} alt={product.imageAlt} fill preload sizes="(max-width: 760px) 38vw, 240px" /></div><span>{i === 0 ? "Botanical Hair Oil" : "Rosemary Oil"}</span></Link>)}
        <span className="hero-art-note">Supplied NARA product artwork</span>
      </motion.div>
    </div>
  </section>;
}
