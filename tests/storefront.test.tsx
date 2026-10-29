import { describe, expect, it, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "@/app/page";
import CheckoutPage from "@/app/checkout/page";
import { SiteHeader } from "@/components/layout/site-header";
import { ProductCard } from "@/components/product/product-card";
import { CartProvider, useCart } from "@/features/cart/cart-context";
import { products } from "@/data/products";
import { getWhatsAppUrl } from "@/lib/utils/whatsapp";

function CartProbe() {
  const { items, setQuantity } = useCart();
  return <><span data-testid="quantity">{items[0]?.quantity ?? 0}</span><button onClick={() => setQuantity("hair-oil", (items[0]?.quantity ?? 0) + 1)}>Increase</button></>;
}

describe("NARA storefront", () => {
  beforeEach(() => localStorage.clear());

  it("renders the accessible site navigation and cart link", () => {
    render(<CartProvider><SiteHeader /></CartProvider>);
    expect(screen.getAllByRole("link", { name: "Hair care" }).length).toBeGreaterThan(0);
    expect(screen.getByRole("link", { name: /shopping bag, 0 items/i })).toBeInTheDocument();
  });

  it("renders product names and pending pricing", () => {
    render(<CartProvider><ProductCard product={products[0]} /></CartProvider>);
    expect(screen.getByRole("heading", { name: "NARA Hair Oil" })).toBeInTheDocument();
    expect(screen.getByText("Details coming soon")).toBeInTheDocument();
  });

  it("does not offer a purchase action for coming soon products", () => {
    render(<CartProvider><ProductCard product={products[1]} /></CartProvider>);
    expect(screen.getAllByText("Coming soon")).toHaveLength(2);
    expect(screen.queryByRole("button", { name: /add shampoo to bag/i })).not.toBeInTheDocument();
  });

  it("supports increasing the quantity of a cart item", async () => {
    const user = userEvent.setup();
    function CartActions() {
      const { add } = useCart();
      return <button onClick={() => add(products[0])}>Add product</button>;
    }
    render(<CartProvider><CartActions /><CartProbe /></CartProvider>);
    await user.click(screen.getByRole("button", { name: "Add product" }));
    await user.click(screen.getByRole("button", { name: "Increase" }));
    expect(screen.getByTestId("quantity")).toHaveTextContent("2");
  });

  it("validates WhatsApp digits and encodes a message", () => {
    expect(getWhatsAppUrl("+94771234567")).toBeNull();
    expect(getWhatsAppUrl("04771234567")).toBeNull();
    expect(getWhatsAppUrl("94771234567", "Hello NARA")).toBe("https://wa.me/94771234567?text=Hello+NARA");
  });

  it("renders the homepage hero", () => {
    render(<CartProvider><Home /></CartProvider>);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /discover nara hair oil/i }).length).toBeGreaterThan(0);
  });

  it("explains that checkout cannot submit orders", () => {
    render(<CheckoutPage />);
    expect(screen.getByRole("heading", { name: /orders aren’t open just yet/i })).toBeInTheDocument();
    expect(screen.getByText(/no order has been submitted/i)).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /place order/i })).not.toBeInTheDocument();
  });
});
