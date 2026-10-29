import { Leaf, Sprout } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";

export function IngredientsPreview() {
  return <section className="botanical-section"><div className="container botanical-inner"><Reveal><span className="eyebrow">From the natural world</span><h2>Rooted in the<br /><em>island’s beauty.</em></h2><p>For generations, Sri Lankan beauty rituals have found inspiration in the world just outside the door. We are gathering those stories with care, and will share confirmed ingredients as each product is ready.</p><a className="text-link text-link-light" href="/hair-care">Explore hair care <Leaf size={14} /></a></Reveal><div className="botanical-stamp" aria-hidden="true"><Sprout size={38} strokeWidth={1} /><span>Grown from<br />our heritage</span></div></div></section>;
}
