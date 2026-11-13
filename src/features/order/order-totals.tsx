import { formatLkr } from "@/data/products";
import { offerLabel, type OrderTotals } from "./whatsapp-order";

export function OrderTotalsRows({ totals }: { totals: OrderTotals }) {
  return <>
    <div className="summary-row"><span>Subtotal</span><strong>{formatLkr(totals.subtotalLkr)}</strong></div>
    {totals.discountLkr > 0 && <div className="summary-row offer-row"><span>{offerLabel(totals)}</span><strong>−{formatLkr(totals.discountLkr)}</strong></div>}
    <div className="summary-row payable-row"><span>Payable amount</span><strong>{formatLkr(totals.payableLkr)}</strong></div>
  </>;
}
