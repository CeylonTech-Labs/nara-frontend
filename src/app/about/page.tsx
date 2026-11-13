import type { Metadata } from "next";
import Image from "next/image";
import { canonicalMetadata } from "@/lib/config/site";

export const metadata: Metadata = { title: "Our Story", description: "The story and inspirations behind NARA, a Sri Lankan heritage beauty brand.", ...canonicalMetadata("/about") };

export default function AboutPage() {
  return <section className="story-page section container"><div className="story-visual"><Image src="/images/brand/nara-logo.jpeg" alt="NARA botanical emblem and wordmark" fill sizes="(max-width: 760px) 90vw, 540px" /></div><div className="story-copy"><span className="eyebrow">A Sri Lankan beauty house</span><h1>Remembering<br /><em>what feels like home.</em></h1><p>NARA begins with a simple affection for Sri Lanka: its botanical world, its living traditions and the care carried quietly from one generation to the next.</p><p>We are building this collection with intention. Our Premium Botanical Hair Oil and Premium Rosemary Oil begin that journey, each presented in a 30 ml bottle. Explore their individual label ingredients and everyday rituals.</p><p>Our name and visual language are a contemporary expression of that inspiration. The heritage imagery across this site is illustrative and is not presented as archaeological artwork.</p></div></section>;
}
