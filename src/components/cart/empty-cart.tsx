import Link from "next/link";
import { ShoppingBag } from "lucide-react";

export function EmptyCart() {
  return <div className="empty-state"><ShoppingBag size={27} strokeWidth={1.2} /><span className="eyebrow">Your bag is waiting</span><h1>A little room for a new ritual.</h1><p>Explore the NARA collection and find something made with care.</p><Link className="button" href="/hair-care">Explore hair care</Link></div>;
}
