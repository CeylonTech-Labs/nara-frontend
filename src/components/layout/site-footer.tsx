import Image from "next/image";
import Link from "next/link";
import { Instagram } from "lucide-react";

export function SiteFooter() {
  return <footer className="site-footer">
    <div className="container footer-main">
      <div className="footer-brand"><Image src="/images/brand/nara-logo.jpeg" alt="NARA" width={84} height={84} /><p>Rooted in the beauty of Sri Lanka.<br />Made for the rituals that feel like home.</p></div>
      <div><span className="eyebrow">Explore</span><Link href="/hair-care">Hair care</Link><Link href="/skin-care">Skin care</Link><Link href="/about">Our story</Link></div>
      <div><span className="eyebrow">A little help</span><Link href="/contact">Contact us</Link><Link href="/cart">Your bag</Link><span className="footer-note">Cash on delivery in Sri Lanka</span></div>
    </div>
    <div className="container footer-bottom"><span>© {new Date().getFullYear()} NARA. All rights reserved.</span><span className="footer-locale"><Instagram size={14} aria-hidden="true" /> Made with care in Sri Lanka</span></div>
  </footer>;
}
