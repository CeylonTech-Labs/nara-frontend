"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { EmptyCart } from "@/components/cart/empty-cart";
import { useCart } from "@/features/cart/cart-context";
import { getProduct } from "@/data/products";
import { PriceTag } from "@/components/product/price-tag";
import { OrderTotalsRows } from "@/features/order/order-totals";
import { getOrderTotals } from "@/features/order/whatsapp-order";

export function CartContents() {
  const { items, canCheckout, remove, setQuantity } = useCart();
  if (!items.length) return <EmptyCart />;
  const lines = items.flatMap((line) => { const product = getProduct(line.slug); return product ? [{ ...line, product }] : []; });
  const totals = getOrderTotals(lines);
  const allPriced = lines.every(({ product }) => product.priceLkr !== null);
  return <div className="cart-layout"><div className="cart-lines">{lines.map(({ product, quantity }) => <article className="cart-line" key={product.slug}><div className="cart-line-image"><Image src={product.image} alt={product.imageAlt} fill sizes="120px" /></div><div className="cart-line-info"><span className="eyebrow">{product.category === "hair-care" ? "Hair care" : "Skin care"}</span><h2>{product.name}</h2><p><PriceTag product={product} fallback="Price to be confirmed" /></p><div className="quantity-control" aria-label={`Quantity for ${product.name}`}><button aria-label="Decrease quantity" onClick={() => setQuantity(product.slug, quantity - 1)}><Minus size={14} /></button><span aria-live="polite">{quantity}</span><button aria-label="Increase quantity" onClick={() => setQuantity(product.slug, quantity + 1)}><Plus size={14} /></button></div></div><button className="remove-item" onClick={() => remove(product.slug)} aria-label={`Remove ${product.name}`}><Trash2 size={17} /></button></article>)}</div><aside className="cart-summary"><span className="eyebrow">Order summary</span>{allPriced ? <OrderTotalsRows totals={totals} /> : <div className="summary-row"><span>Subtotal</span><strong>To be confirmed</strong></div>}<p>Cash on delivery. NARA confirms the delivery fee on WhatsApp.</p><Link aria-disabled={!canCheckout} className={`button cart-checkout ${canCheckout ? "" : "is-disabled"}`} href={canCheckout ? "/checkout" : "/checkout?unavailable=true"} onClick={(event) => { if (!canCheckout) event.preventDefault(); }}>Continue to order</Link><p className="cart-hint">{canCheckout ? "You’ll confirm your order on WhatsApp." : "Ordering will open once price and product details are confirmed."}</p></aside></div>;
}
