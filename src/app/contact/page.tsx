import type { Metadata } from "next";
import { Facebook, Instagram, MessageCircle, Mail } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/utils/whatsapp";
import { canonicalMetadata, siteContact } from "@/lib/config/site";

export const metadata: Metadata = { title: "Contact", description: "Contact NARA on WhatsApp, email or Instagram for collection and product enquiries.", ...canonicalMetadata("/contact") };

export default function ContactPage() {
  const url = getWhatsAppUrl(siteContact.whatsappNumber, "Hello NARA, I would love to know more about your collection.");
  return <section className="contact-page section container">
    <div className="page-intro"><span className="eyebrow">We’d love to hear from you</span><h1>A note to <em>NARA.</em></h1><p>Have a question about our collection? Reach out and we’ll be glad to help.</p></div>
    <div className="contact-options">
      {url && <a className="contact-option" href={url} target="_blank" rel="noreferrer"><MessageCircle size={22} aria-hidden="true" /><span><strong>WhatsApp</strong><small>{siteContact.phoneDisplay}</small></span></a>}
      <a className="contact-option" href={`mailto:${siteContact.email}`}><Mail size={22} aria-hidden="true" /><span><strong>Email</strong><small>{siteContact.email}</small></span></a>
      <a className="contact-option" href={siteContact.instagramUrl} target="_blank" rel="noreferrer"><Instagram size={22} aria-hidden="true" /><span><strong>Instagram</strong><small>@{siteContact.instagramHandle}</small></span></a>
      <a className="contact-option" href={siteContact.facebookUrl} target="_blank" rel="noreferrer"><Facebook size={22} aria-hidden="true" /><span><strong>Facebook</strong><small>Visit NARA on Facebook</small></span></a>
    </div>
  </section>;
}
