"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, MessageCircle, Search, ShoppingBag, X } from "lucide-react";
import { useRef, useState } from "react";
import { useCart } from "@/features/cart/cart-context";
import { formatLkr, products } from "@/data/products";
import { getPricing, type Product } from "@/types/catalog";
import { siteContact } from "@/lib/config/site";
import { getWhatsAppUrl } from "@/lib/utils/whatsapp";

const searchPrice = (product: Product) => {
  const pricing = getPricing(product);
  return pricing ? formatLkr(pricing.payableLkr) : "Price pending";
};

const links = [{ href: "/", label: "Home" }, { href: "/hair-care", label: "Hair care" }, { href: "/skin-care", label: "Skin care" }, { href: "/about", label: "Our story" }, { href: "/#ingredients", label: "Ingredients" }, { href: "/contact", label: "Contact" }];

export function SiteHeader() {
  const { count } = useCart();
  const menu = useRef<HTMLDialogElement>(null);
  const search = useRef<HTMLDialogElement>(null);
  const [query, setQuery] = useState("");
  const whatsapp = getWhatsAppUrl(siteContact.whatsappNumber, "Hello NARA, I have a product enquiry.");
  const results = products.filter((product) => `${product.name} ${product.ingredients?.join(" ") ?? ""}`.toLowerCase().includes(query.trim().toLowerCase()));
  return <>
    <div className="announcement">Rooted in Sri Lanka <span aria-hidden="true">·</span> Botanical beauty rituals <span aria-hidden="true">·</span> Cash on delivery available</div>
    <header className="site-header">
      <div className="container premium-header">
        <button className="mobile-menu-toggle" aria-label="Open navigation" aria-haspopup="dialog" onClick={() => menu.current?.showModal()}><Menu size={21} /></button>
        <Link href="/" className="brand-mark" aria-label="NARA home"><Image src="/images/brand/nara-logo.jpeg" alt="NARA — love your beauty again" width={74} height={74} preload /></Link>
        <nav className="desktop-nav" aria-label="Main navigation">{links.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}</nav>
        <div className="header-tools"><button className="header-icon" aria-label="Search products" aria-haspopup="dialog" onClick={() => search.current?.showModal()}><Search size={19} /></button><Link href="/cart" className="header-cart" aria-label={`Shopping bag, ${count} items`}><ShoppingBag size={19} /><span className="cart-count">{count}</span></Link>{whatsapp && <a className="header-whatsapp" href={whatsapp} target="_blank" rel="noreferrer"><MessageCircle size={17} /><span>WhatsApp</span></a>}</div>
      </div>
    </header>
    <dialog ref={menu} className="navigation-dialog" aria-labelledby="navigation-title" onClick={(event) => { if (event.target === event.currentTarget) menu.current?.close(); }}>
      <div className="dialog-top"><span className="eyebrow" id="navigation-title">Explore NARA</span><button className="header-icon" aria-label="Close navigation" onClick={() => menu.current?.close()}><X /></button></div>
      <nav aria-label="Mobile navigation">{links.map((link) => <Link key={link.href} href={link.href} onClick={() => menu.current?.close()}>{link.label}</Link>)}</nav>
      {whatsapp && <a className="button" href={whatsapp} target="_blank" rel="noreferrer">Message NARA <MessageCircle size={17} /></a>}
    </dialog>
    <dialog ref={search} className="search-dialog" aria-labelledby="search-title">
      <div className="dialog-top"><h2 id="search-title">Find your ritual</h2><button className="header-icon" aria-label="Close search" onClick={() => search.current?.close()}><X /></button></div>
      <label className="eyebrow" htmlFor="product-search">Search products or ingredients</label><input id="product-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try rosemary or coconut" />
      <p className="search-count" role="status">{results.length} {results.length === 1 ? "product" : "products"} found</p>
      <ul className="search-results">{results.map((product) => <li key={product.slug}><Link href={`/products/${product.slug}`} onClick={() => search.current?.close()}>{product.name}<small>{product.status === "coming-soon" ? "Coming soon" : `${product.volume} · ${searchPrice(product)}`}</small></Link></li>)}</ul>
      {!results.length && <p>No products match. Try another name or ingredient.</p>}
    </dialog>
  </>;
}
