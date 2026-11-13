import { describe, expect, it, beforeEach } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "@/app/page";
import CheckoutPage from "@/app/checkout/page";
import ContactPage from "@/app/contact/page";
import ProductPage from "@/app/products/[slug]/page";
import { SiteHeader } from "@/components/layout/site-header";
import { ProductCard } from "@/components/product/product-card";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductImage } from "@/components/product/product-image";
import { ProductPurchase } from "@/components/product/product-purchase";
import { CartProvider, useCart } from "@/features/cart/cart-context";
import { products, hairOils } from "@/data/products";
import { botanicalIngredients } from "@/data/ingredients";
import { IngredientsPreview } from "@/components/home/ingredients-preview";
import { SiteFooter } from "@/components/layout/site-footer";
import { getPricing, isPurchasable, type Product } from "@/types/catalog";
import { getWhatsAppUrl } from "@/lib/utils/whatsapp";

const purchasable: Product = { ...products[0], purchasable: true, priceLkr: 1200 };
const pending: Product = { ...products[0], purchasable: false, priceLkr: null };
function CartProbe() {
  const { items, setQuantity, add } = useCart();
  return <><span data-testid="quantity">{items[0]?.quantity ?? 0}</span><button onClick={() => add(purchasable)}>Add fixture</button><button onClick={() => add(pending)}>Add pending</button><button onClick={() => add(products[2])}>Add coming soon</button><button onClick={() => setQuantity("hair-oil", (items[0]?.quantity ?? 0) + 1)}>Increase</button></>;
}

describe("NARA storefront", () => {
  beforeEach(() => localStorage.clear());

  it("renders all main navigation destinations and the cart", () => {
    render(<CartProvider><SiteHeader /></CartProvider>);
    const nav = screen.getByRole("navigation", { name: "Main navigation" });
    for (const label of ["Home", "Hair care", "Skin care", "Our story", "Ingredients", "Contact"]) expect(within(nav).getByRole("link", { name: label })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /shopping bag, 0 items/i })).toBeInTheDocument();
  });

  it("opens and closes the mobile navigation after selecting a destination", async () => {
    const user = userEvent.setup();
    render(<CartProvider><SiteHeader /></CartProvider>);
    await user.click(screen.getByRole("button", { name: "Open navigation" }));
    const dialog = screen.getByRole("dialog", { name: "Explore NARA" });
    await user.click(within(dialog).getByRole("link", { name: "Hair care" }));
    expect(dialog).not.toHaveAttribute("open");
  });

  it("searches names and ingredients and handles empty results", async () => {
    const user = userEvent.setup();
    render(<CartProvider><SiteHeader /></CartProvider>);
    await user.click(screen.getByRole("button", { name: "Search products" }));
    const input = screen.getByRole("searchbox");
    await user.type(input, "hibiscus");
    expect(screen.getByRole("status")).toHaveTextContent("1 product found");
    await user.clear(input); await user.type(input, "unlisted");
    expect(screen.getByText(/No products match/)).toBeInTheDocument();
  });

  it("shows both oils at their confirmed prices with the 15% offer", () => {
    render(<CartProvider>{hairOils.map(product => <ProductCard key={product.slug} product={product} />)}</CartProvider>);
    for (const product of hairOils) expect(screen.getByRole("heading", { name: product.name })).toBeInTheDocument();
    expect(screen.getAllByText("30 ml")).toHaveLength(2);
    expect(screen.getAllByText("15% off")).toHaveLength(2);
    for (const [now, was] of [["1,275", "1,500"], ["765", "900"]]) {
      expect(screen.getByText(new RegExp(`LKR\\s${now}$`))).toHaveClass("price-now");
      expect(screen.getByText(new RegExp(`LKR\\s${was}$`))).toHaveClass("price-was");
    }
  });

  it("rounds offer prices to whole rupees and ignores invalid offers", () => {
    expect(getPricing(products[0])).toEqual({ listLkr: 1500, payableLkr: 1275, percentOff: 15 });
    expect(getPricing(products[1])).toEqual({ listLkr: 900, payableLkr: 765, percentOff: 15 });
    expect(getPricing({ ...products[1], discountPercent: 100 })).toEqual({ listLkr: 900, payableLkr: 900, percentOff: 0 });
    expect(getPricing(pending)).toBeNull();
  });

  it("keeps coming-soon products out of purchasing", () => {
    render(<CartProvider><ProductCard product={products[2]} /><ProductPurchase product={products[2]} /></CartProvider>);
    expect(screen.getAllByText("Coming soon")).toHaveLength(2);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("blocks direct cart additions for pending and coming-soon items", async () => {
    const user = userEvent.setup();
    render(<CartProvider><CartProbe /></CartProvider>);
    await user.click(screen.getByText("Add pending")); await user.click(screen.getByText("Add coming soon"));
    expect(screen.getByTestId("quantity")).toHaveTextContent("0");
    expect(isPurchasable(pending)).toBe(false);
    expect(isPurchasable(products[0])).toBe(true);
  });

  it("supports quantities for explicitly purchasable test data", async () => {
    const user = userEvent.setup();
    render(<CartProvider><CartProbe /></CartProvider>);
    await user.click(screen.getByText("Add fixture")); await user.click(screen.getByText("Increase"));
    expect(screen.getByTestId("quantity")).toHaveTextContent("2");
  });

  it("announces add-to-bag feedback for a purchasable product", async () => {
    const user = userEvent.setup();
    render(<CartProvider><ProductPurchase product={purchasable} /></CartProvider>);
    await user.click(screen.getByRole("button", { name: /add to bag/i }));
    expect(screen.getByRole("status")).toHaveTextContent("added to your bag");
  });

  it("removes coming-soon and unknown products from saved carts", () => {
    localStorage.setItem("nara-cart-v1", JSON.stringify([{slug: "shampoo", quantity: 2}, {slug: "retired-product", quantity: 1}]));
    render(<CartProvider><CartProbe /></CartProvider>);
    expect(screen.getByTestId("quantity")).toHaveTextContent("0");
  });

  it("validates WhatsApp digits and encodes a message", () => {
    expect(getWhatsAppUrl("+94706132303")).toBeNull();
    expect(getWhatsAppUrl("0706132303")).toBeNull();
    expect(getWhatsAppUrl("94706132303", "Hello NARA")).toBe("https://wa.me/94706132303?text=Hello+NARA");
  });

  it("renders verified contact destinations", () => {
    render(<ContactPage />);
    expect(screen.getByRole("link", { name: /email/i })).toHaveAttribute("href", "mailto:nara.origin3@gmail.com");
    expect(screen.getByRole("link", { name: /whatsapp/i }).getAttribute("href")).toContain("wa.me/94706132303");
    expect(screen.getByRole("link", { name: /instagram/i })).toHaveAttribute("href", "https://www.instagram.com/nara_care26/");
    expect(screen.getByRole("link", { name: /facebook/i })).toHaveAttribute("href", "https://www.facebook.com/share/1H2nHciV55/");
  });

  it("renders the Phase 03 homepage sections and both oils", () => {
    render(<CartProvider><Home /></CartProvider>);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("The Beauty ofOur Heritage");
    expect(screen.getByRole("link", { name: /explore our hair oils/i })).toHaveAttribute("href", "/#hair-oils");
    expect(screen.getByRole("heading", { name: /Nature’s Goodness in Every Drop/ })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Inspired by Sri Lanka’s Timeless Heritage/ })).toBeInTheDocument();
    expect(screen.getAllByRole("img", { name: /Rosemary Oil, 30 ml/ }).length).toBeGreaterThan(0);
  });

  it("keeps the oils’ label ingredient lists separate", () => {
    expect(products[0].ingredients).toContain("Hibiscus");
    expect(products[1].ingredients).toEqual(["Virgin Coconut Oil", "Rosemary", "Rosemary Essential Oil"]);
    expect(products[1].ingredients).not.toContain("Hibiscus");
  });

  it("shows an illustration for every ingredient on the supplied botanical label", () => {
    const names = ["Virgin Coconut Oil", "Sesame Oil", "Almond Oil", "Castor Oil", "King Coconut Oil", "Hibiscus", "Blue Water Lily", "Fenugreek", "Rosemary", "Black Seed", "Gotukola", "Curry Leaves"];
    expect(products[0].ingredients).toEqual(names);
    expect(botanicalIngredients.map(ingredient => ingredient.name)).toEqual(names);
    render(<IngredientsPreview />);
    for (const name of names) expect(screen.getByRole("img", { name: name + ", botanical illustration" })).toBeInTheDocument();
    expect(screen.getAllByRole("img")).toHaveLength(12);
  });

  it("credits CeylonTech Labs in the footer", () => {
    render(<SiteFooter />);
    expect(screen.getByText("CeylonTech Labs").parentElement).toHaveTextContent("Powered by CeylonTech Labs");
  });

  it("falls back accessibly when a product image fails", () => {
    render(<ProductImage src="/missing.webp" alt="Test oil" width={100} height={100} />);
    fireEvent.error(screen.getByRole("img", { name: "Test oil" }));
    expect(screen.getByRole("img")).toHaveAttribute("alt", "Test oil — image unavailable; NARA brand emblem shown");
    expect(screen.getByRole("img").getAttribute("src")).toContain("nara-logo");
  });

  it("switches between bottle and full label artwork", async () => {
    const user = userEvent.setup();
    render(<ProductGallery product={products[1]} />);
    await user.click(screen.getByRole("button", { name: "Show full label artwork" }));
    expect(screen.getByRole("img", { name: /front and back label artwork/ })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "View label at full size" })).toHaveAttribute("href", products[1].gallery![0].src);
  });

  it("renders product-specific enquiries, instructions and related products", async () => {
    render(<CartProvider>{await ProductPage({params: Promise.resolve({slug: "rosemary-oil"})})}</CartProvider>);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(products[1].name);
    expect(screen.getByText(/Massage gently for 2–5 minutes/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /enquire on whatsapp/i }).getAttribute("href")).toContain("Rosemary");
    expect(screen.getByRole("heading", { name: /A little more to explore/ })).toBeInTheDocument();
  });

  it("offers no order form while the bag is empty", async () => {
    render(<CartProvider><CheckoutPage /></CartProvider>);
    expect(await screen.findByText(/your bag is waiting/i)).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /confirm order/i })).not.toBeInTheDocument();
  });
});
