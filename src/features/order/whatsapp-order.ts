import { formatLkr } from "@/data/products";
import { getPricing, type Product } from "@/types/catalog";

export const SRI_LANKA_DISTRICTS = [
  "Ampara", "Anuradhapura", "Badulla", "Batticaloa", "Colombo", "Galle", "Gampaha", "Hambantota",
  "Jaffna", "Kalutara", "Kandy", "Kegalle", "Kilinochchi", "Kurunegala", "Mannar", "Matale",
  "Matara", "Monaragala", "Mullaitivu", "Nuwara Eliya", "Polonnaruwa", "Puttalam", "Ratnapura",
  "Trincomalee", "Vavuniya",
] as const;

export type OrderLine = { product: Product; quantity: number };

export type DeliveryDetails = {
  name: string;
  phone: string;
  address: string;
  city: string;
  district: string;
  note: string;
};

export type DeliveryErrors = Partial<Record<keyof DeliveryDetails, string>>;

/** Accepts 0771234567, 771234567, +94 77 123 4567 or 0094771234567; returns +94XXXXXXXXX. */
export function normalizeSriLankanPhone(raw: string): string | null {
  const compact = raw.replace(/[\s().-]/g, "");
  const match = /^(?:\+94|0094|94|0)?([1-9]\d{8})$/.exec(compact);
  return match ? `+94${match[1]}` : null;
}

export function validateDelivery(details: DeliveryDetails): DeliveryErrors {
  const errors: DeliveryErrors = {};
  if (details.name.trim().length < 2) errors.name = "Please enter your name.";
  if (!normalizeSriLankanPhone(details.phone)) errors.phone = "Please enter a Sri Lankan phone number, for example 077 123 4567.";
  if (details.address.trim().length < 5) errors.address = "Please enter your delivery address.";
  if (details.city.trim().length < 2) errors.city = "Please enter your city or town.";
  if (!(SRI_LANKA_DISTRICTS as readonly string[]).includes(details.district)) errors.district = "Please choose your district.";
  return errors;
}

export type OrderTotals = { subtotalLkr: number; discountLkr: number; payableLkr: number; percentOff: number | null };

/** List-price subtotal, offer savings and the amount payable (before delivery). */
export function getOrderTotals(lines: readonly OrderLine[]): OrderTotals {
  let subtotalLkr = 0;
  let payableLkr = 0;
  const percents = new Set<number>();
  for (const { product, quantity } of lines) {
    const pricing = getPricing(product);
    if (!pricing) continue;
    subtotalLkr += pricing.listLkr * quantity;
    payableLkr += pricing.payableLkr * quantity;
    if (pricing.percentOff) percents.add(pricing.percentOff);
  }
  return { subtotalLkr, discountLkr: subtotalLkr - payableLkr, payableLkr, percentOff: percents.size === 1 ? [...percents][0] : null };
}

export const offerLabel = (totals: OrderTotals) => totals.percentOff ? `Offer (${totals.percentOff}% off)` : "Offer savings";

const oneLine = (value: string) => value.replace(/\s+/g, " ").trim();

/** The text the customer sends to NARA on WhatsApp. Prices come from the catalog. */
export function buildOrderMessage(lines: readonly OrderLine[], details: DeliveryDetails): string {
  const totals = getOrderTotals(lines);
  const items = lines.map(({ product, quantity }, index) => {
    const name = product.volume ? `${product.name} (${product.volume})` : product.name;
    const pricing = getPricing(product);
    if (!pricing) return `${index + 1}. ${name} × ${quantity}`;
    const was = pricing.percentOff ? ` (was ${formatLkr(pricing.listLkr * quantity)})` : "";
    return `${index + 1}. ${name} × ${quantity} = ${formatLkr(pricing.payableLkr * quantity)}${was}`;
  });
  const note = oneLine(details.note);

  return [
    "Hello NARA, I would like to place an order.",
    "",
    "*Order*",
    ...items,
    `Subtotal: ${formatLkr(totals.subtotalLkr)}`,
    ...(totals.discountLkr > 0 ? [`${offerLabel(totals)}: -${formatLkr(totals.discountLkr)}`] : []),
    `*Payable amount: ${formatLkr(totals.payableLkr)}*`,
    "Delivery fee: to be confirmed by NARA",
    "Payment: Cash on delivery",
    "",
    "*Deliver to*",
    `Name: ${oneLine(details.name)}`,
    `Phone: ${normalizeSriLankanPhone(details.phone) ?? oneLine(details.phone)}`,
    `Address: ${oneLine(details.address)}`,
    `City: ${oneLine(details.city)}`,
    `District: ${details.district}`,
    ...(note ? [`Note: ${note}`] : []),
  ].join("\n");
}
