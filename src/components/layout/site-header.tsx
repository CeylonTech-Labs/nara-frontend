"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/features/cart/cart-context";

const links = [{ href: "/hair-care", label: "Hair care" }, { href: "/skin-care", label: "Skin care" }, { href: "/about", label: "Our story" }];

function AnnouncementBar() {
  return <div className="announcement">A Sri Lankan heritage beauty house <span aria-hidden="true">·</span> Cash on delivery available</div>;
}

export function SiteHeader() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  return <>
    <AnnouncementBar />
    <header className="site-header">
      <div className="container header-inner">
        <button className="mobile-menu-toggle" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? <X size={21} /> : <Menu size={21} />}</button>
        <nav className="desktop-nav" aria-label="Main navigation"><Link href="/hair-care">Hair care</Link><Link href="/skin-care">Skin care</Link></nav>
        <Link href="/" className="brand-mark" aria-label="NARA home"><Image src="/images/brand/nara-logo.jpeg" alt="NARA — love your beauty again" width={74} height={74} priority /></Link>
        <nav className="desktop-nav desktop-nav-right" aria-label="About NARA"><Link href="/about">Our story</Link><Link href="/contact">Contact</Link></nav>
        <Link href="/cart" className="cart-link" aria-label={`Shopping bag, ${count} items`}><ShoppingBag size={19} /><span className="cart-count">{count}</span></Link>
      </div>
      <nav id="mobile-navigation" className={`mobile-nav ${open ? "is-open" : ""}`} aria-label="Mobile navigation" hidden={!open}>
        {links.map((link) => <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</Link>)}
        <Link href="/contact" onClick={() => setOpen(false)}>Contact</Link>
      </nav>
    </header>
  </>;
}
