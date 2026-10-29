import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function CategoryCard({ title, subtitle, href, image, tone }: { title: string; subtitle: string; href: string; image: string; tone: "maroon" | "forest" }) {
  return <Link className={`category-card category-${tone}`} href={href}><Image src={image} alt="" fill sizes="(max-width: 760px) 90vw, 580px" /><span className="category-overline">The collection</span><h3>{title}</h3><span>{subtitle}<ArrowUpRight size={16} /></span></Link>;
}
