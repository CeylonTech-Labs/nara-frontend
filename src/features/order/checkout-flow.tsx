"use client";

import Link from "next/link";
import { useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { LockKeyhole, MessageCircle } from "lucide-react";
import { EmptyCart } from "@/components/cart/empty-cart";
import { getProduct } from "@/data/products";
import { useCart } from "@/features/cart/cart-context";
import { siteContact } from "@/lib/config/site";
import { getWhatsAppUrl } from "@/lib/utils/whatsapp";
import { PriceTag } from "@/components/product/price-tag";
import { OrderTotalsRows } from "./order-totals";
import {
  SRI_LANKA_DISTRICTS,
  buildOrderMessage,
  getOrderTotals,
  validateDelivery,
  type DeliveryDetails,
  type DeliveryErrors,
  type OrderLine,
} from "./whatsapp-order";

const EMPTY_DETAILS: DeliveryDetails = { name: "", phone: "", address: "", city: "", district: "", note: "" };

function OrdersClosedNotice() {
  return <div className="checkout-notice"><div className="checkout-icon"><LockKeyhole size={22} /></div><span className="eyebrow">A note before ordering</span><h1>Orders aren’t open <em>just yet.</em></h1><p>We’re confirming product details and pricing before enabling orders. No order has been submitted, and no payment will be taken on this page.</p><div className="checkout-reasons"><span>Product information pending</span><span>Pricing not yet confirmed</span><span>Ordering unavailable</span></div><Link className="button" href="/hair-care">Continue exploring</Link><Link className="text-link checkout-back" href="/cart">Return to your bag</Link></div>;
}

export function CheckoutFlow() {
  const { items, canCheckout, hydrated, clear } = useCart();
  const [details, setDetails] = useState<DeliveryDetails>(EMPTY_DETAILS);
  const [errors, setErrors] = useState<DeliveryErrors>({});
  const [sentUrl, setSentUrl] = useState<string | null>(null);
  const [cleared, setCleared] = useState(false);

  if (!hydrated) return <div className="checkout-loading" aria-busy="true" />;
  if (sentUrl) {
    return <div className="checkout-notice order-sent" role="status"><div className="checkout-icon"><MessageCircle size={22} /></div><span className="eyebrow">Almost done</span><h1>Send your order <em>on WhatsApp.</em></h1><p>WhatsApp has opened with your order written out. Press <strong>Send</strong> there to place it. NARA will reply to confirm the delivery fee and delivery time. Payment is cash on delivery.</p><a className="button" href={sentUrl} target="_blank" rel="noreferrer"><MessageCircle size={16} /> Open WhatsApp again</a>{cleared ? <p className="order-cleared">Your bag has been cleared.</p> : <button type="button" className="text-link checkout-back" onClick={() => { clear(); setCleared(true); }}>I’ve sent it, clear my bag</button>}</div>;
  }
  if (!items.length) return <EmptyCart />;
  if (!canCheckout) return <OrdersClosedNotice />;

  const lines: OrderLine[] = items.flatMap((line) => {
    const product = getProduct(line.slug);
    return product ? [{ product, quantity: line.quantity }] : [];
  });
  const totals = getOrderTotals(lines);
  const whatsappAvailable = getWhatsAppUrl(siteContact.whatsappNumber) !== null;

  const update = (field: keyof DeliveryDetails) => (event: { target: { value: string } }) => {
    const value = event.target.value;
    setDetails((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validateDelivery(details);
    setErrors(found);
    if (Object.keys(found).length) {
      const first = event.currentTarget.querySelector<HTMLElement>("[aria-invalid='true']");
      first?.focus();
      return;
    }
    const url = getWhatsAppUrl(siteContact.whatsappNumber, buildOrderMessage(lines, details));
    if (!url) return;
    const opened = window.open(url, "_blank");
    if (opened) opened.opener = null;
    else window.location.assign(url);
    setSentUrl(url);
  };

  const field = (name: keyof DeliveryDetails, label: string, input: ReactNode) => (
    <div className={`order-field${errors[name] ? " has-error" : ""}`}>
      <label htmlFor={`order-${name}`}>{label}</label>
      {input}
      {errors[name] && <span className="order-error" id={`order-${name}-error`}>{errors[name]}</span>}
    </div>
  );
  const describedBy = (name: keyof DeliveryDetails) => (errors[name] ? `order-${name}-error` : undefined);

  return <div className="order-layout">
    <form className="order-form" onSubmit={submit} noValidate>
      <span className="eyebrow">Delivery details</span>
      <h1>Confirm your <em>order.</em></h1>
      <p className="order-intro">Your order will open in WhatsApp, ready to send to NARA. Nothing is sent until you press Send there.</p>
      {field("name", "Full name", <input id="order-name" name="name" autoComplete="name" value={details.name} onChange={update("name")} aria-invalid={Boolean(errors.name)} aria-describedby={describedBy("name")} />)}
      {field("phone", "Phone number", <input id="order-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="077 123 4567" value={details.phone} onChange={update("phone")} aria-invalid={Boolean(errors.phone)} aria-describedby={describedBy("phone")} />)}
      {field("address", "Delivery address", <textarea id="order-address" name="address" rows={3} autoComplete="street-address" value={details.address} onChange={update("address")} aria-invalid={Boolean(errors.address)} aria-describedby={describedBy("address")} />)}
      <div className="order-row">
        {field("city", "City or town", <input id="order-city" name="city" autoComplete="address-level2" value={details.city} onChange={update("city")} aria-invalid={Boolean(errors.city)} aria-describedby={describedBy("city")} />)}
        {field("district", "District", <select id="order-district" name="district" value={details.district} onChange={update("district")} aria-invalid={Boolean(errors.district)} aria-describedby={describedBy("district")}><option value="">Choose district</option>{SRI_LANKA_DISTRICTS.map((district) => <option key={district} value={district}>{district}</option>)}</select>)}
      </div>
      {field("note", "Note for NARA (optional)", <textarea id="order-note" name="note" rows={2} value={details.note} onChange={update("note")} />)}
      {whatsappAvailable
        ? <button className="button order-submit" type="submit"><MessageCircle size={16} /> Confirm order on WhatsApp</button>
        : <p className="order-error">WhatsApp ordering is not available right now. Please <Link href="/contact">contact NARA</Link>.</p>}
    </form>
    <aside className="cart-summary order-summary">
      <span className="eyebrow">Order summary</span>
      <ul className="order-lines">{lines.map(({ product, quantity }) => <li key={product.slug}><span>{product.name}{product.volume ? ` (${product.volume})` : ""} × {quantity}</span><PriceTag product={product} quantity={quantity} /></li>)}</ul>
      <OrderTotalsRows totals={totals} />
      <div className="summary-row"><span>Delivery</span><strong>Confirmed by NARA</strong></div>
      <p>Cash on delivery. No payment is taken on this site.</p>
      <Link className="text-link" href="/cart">Edit your bag</Link>
    </aside>
  </div>;
}
