import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { hairOils } from "@/data/products";
import { botanicalIngredients } from "@/data/ingredients";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";


export function IngredientsPreview() {
  return <section className="ingredients-section section" id="ingredients"><div className="container"><SectionHeading eyebrow="From the botanical world" title="Nature’s Goodness in Every Drop" description="Explore the ingredients listed on our supplied product labels. All 11 ingredients from our Botanical Hair Oil label, with each oil’s ingredient list shown separately." />
    <div className="ingredient-circles">{botanicalIngredients.map((ingredient, i) => <Reveal key={ingredient.name} delay={i * .07}><div className="ingredient-circle"><Image src={`/images/ingredients/${ingredient.image}-illustration.webp`} alt={`${ingredient.name}, botanical illustration`} width={160} height={160} /><h3>{ingredient.name}</h3></div></Reveal>)}</div>
    <div className="ingredient-lists">{hairOils.map((product) => <Reveal key={product.slug}><article><span className="eyebrow">{product.volume} · Label ingredients</span><h3>{product.name}</h3><ul>{product.ingredients?.map((ingredient) => <li key={ingredient}>{ingredient}</li>)}</ul><Link className="text-link" href={`/products/${product.slug}`}>Explore this oil <ArrowRight size={14} /></Link></article></Reveal>)}</div>
    <p className="ingredient-caption">Ingredient lists follow the supplied labels. Botanical illustrations represent the ingredients, not the finished oils.</p>
  </div></section>;
}
