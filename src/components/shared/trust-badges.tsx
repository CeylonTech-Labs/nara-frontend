import { Banknote, MapPin, MessageCircle } from "lucide-react";

export function TrustBadges() {
  return <div className="trust-badges" aria-label="Shopping information"><span><MapPin size={16} /> Sri Lankan brand</span><span><Banknote size={16} /> Cash on delivery planned</span><span><MessageCircle size={16} /> WhatsApp support coming soon</span></div>;
}
