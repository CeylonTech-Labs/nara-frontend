"use client";

import { MessageCircle } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/utils/whatsapp";

const whatsAppUrl = getWhatsAppUrl(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER, "Hello NARA, I would love to know more about your hair oil.");

export function WhatsAppContact() {
  if (!whatsAppUrl) return <span className="whatsapp-unconfigured" title="Set NEXT_PUBLIC_WHATSAPP_NUMBER to enable WhatsApp contact" aria-label="WhatsApp contact is not configured"><MessageCircle size={20} /><span>WhatsApp soon</span></span>;
  return <a className="whatsapp-float" href={whatsAppUrl} target="_blank" rel="noreferrer" aria-label="Contact NARA on WhatsApp"><MessageCircle size={21} /><span>Let’s talk</span></a>;
}
