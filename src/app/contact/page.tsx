import type { Metadata } from "next";
import { MessageCircle, Mail } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/utils/whatsapp";
import { canonicalMetadata } from "@/lib/config/site";

export const metadata: Metadata = { title: "Contact", description: "Get in touch with NARA about our collections and launch.", ...canonicalMetadata("/contact") };

export default function ContactPage() {
  const url = getWhatsAppUrl(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER, "Hello NARA, I would love to know more about your collection.");
  return <section className="contact-page section container"><div className="page-intro"><span className="eyebrow">We’d love to hear from you</span><h1>A note to <em>NARA.</em></h1><p>Have a question about our collection or the launch? Reach out and we’ll be glad to help.</p></div><div className="contact-options">{url ? <a className="contact-option" href={url} target="_blank" rel="noreferrer"><MessageCircle size={22} /><span><strong>WhatsApp</strong><small>Send us a message</small></span></a> : <div className="contact-option contact-muted"><MessageCircle size={22} /><span><strong>WhatsApp</strong><small>Contact details will be available soon.</small></span></div>}<div className="contact-option contact-muted"><Mail size={22} /><span><strong>Email</strong><small>Contact details will be available soon.</small></span></div></div></section>;
}
