import { Banknote, Leaf, MapPin, MessageCircle } from "lucide-react";

export function TrustBadges() {
  return <div className="trust-badges" aria-label="Shopping information"><span><MapPin size={16} aria-hidden="true" /> Sri Lankan brand</span><span><Banknote size={16} aria-hidden="true" /> Cash on delivery available</span><span><MessageCircle size={16} aria-hidden="true" /> WhatsApp customer support</span><span><Leaf size={16} aria-hidden="true" /> Natural ingredient focus</span></div>;
}
