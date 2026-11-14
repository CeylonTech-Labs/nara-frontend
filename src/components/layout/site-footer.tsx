import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram } from "lucide-react";
import { siteContact } from "@/lib/config/site";
import { getWhatsAppUrl } from "@/lib/utils/whatsapp";

export function SiteFooter() {
  const whatsappUrl = getWhatsAppUrl(siteContact.whatsappNumber);
  return <footer className="site-footer">
    <div className="container footer-main">
      <div className="footer-brand"><Image src="/images/brand/nara-logo.jpeg" alt="NARA" width={84} height={84} /><p>Rooted in the beauty of Sri Lanka.<br />Made for the rituals that feel like home.</p></div>
      <div><span className="eyebrow">Explore</span><Link href="/hair-care">Hair care</Link><Link href="/skin-care">Skin care</Link><Link href="/about">Our story</Link></div>
      <div><span className="eyebrow">A little help</span><Link href="/contact">Contact us</Link><a href={`mailto:${siteContact.email}`}>{siteContact.email}</a>{whatsappUrl && <a href={whatsappUrl} target="_blank" rel="noreferrer">WhatsApp · {siteContact.phoneDisplay}</a>}<a href={siteContact.instagramUrl} target="_blank" rel="noreferrer"><Instagram size={14} aria-hidden="true" /> @{siteContact.instagramHandle}</a><a href={siteContact.facebookUrl} target="_blank" rel="noreferrer"><Facebook size={14} aria-hidden="true" /> Facebook</a><Link href="/cart">Your bag</Link><span className="footer-note">Cash on delivery in Sri Lanka</span></div>
    </div>
    <div className="container footer-bottom"><span>© {new Date().getFullYear()} NARA. All rights reserved.</span><span className="footer-locale">Made with care in Sri Lanka</span><span className="footer-credit">Powered by <a href="https://ceylontechlabs.duckdns.org" target="_blank" rel="noreferrer">CeylonTech Labs</a></span></div>
  </footer>;
}
