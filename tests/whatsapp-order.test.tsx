import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CheckoutPage from "@/app/checkout/page";
import { CartProvider } from "@/features/cart/cart-context";
import { products } from "@/data/products";
import { buildOrderMessage, normalizeSriLankanPhone, validateDelivery, type DeliveryDetails } from "@/features/order/whatsapp-order";

const details: DeliveryDetails = { name: " Nimal  Perera ", phone: "077 123 4567", address: "12 Temple Road,\nPeradeniya", city: "Kandy", district: "Kandy", note: "" };
const rosemary = () => products.find((product) => product.slug === "rosemary-oil")!;

describe("WhatsApp ordering", () => {
  beforeEach(() => localStorage.clear());
  afterEach(() => vi.restoreAllMocks());

  it("normalizes Sri Lankan phone numbers", () => {
    for (const input of ["0771234567", "077 123 4567", "+94 77 123 4567", "94771234567", "0094771234567", "771234567"]) {
      expect(normalizeSriLankanPhone(input)).toBe("+94771234567");
    }
    for (const input of ["", "12345", "+44 20 7946 0958", "07712345678"]) expect(normalizeSriLankanPhone(input)).toBeNull();
  });

  it("requires every delivery detail except the note", () => {
    const errors = validateDelivery({ name: "", phone: "abc", address: "", city: "", district: "Atlantis", note: "" });
    expect(Object.keys(errors).sort()).toEqual(["address", "city", "district", "name", "phone"]);
    expect(validateDelivery(details)).toEqual({});
  });

  it("writes the items, subtotal, payment and address into the message", () => {
    const message = buildOrderMessage([{ product: rosemary(), quantity: 2 }], { ...details, note: "Call before  delivery" });
    expect(message).toMatch(/NARA Premium Rosemary Oil \(30 ml\) × 2 = LKR\s1,530 \(was LKR\s1,800\)/);
    expect(message).toMatch(/Subtotal: LKR\s1,800/);
    expect(message).toMatch(/Offer \(15% off\): -LKR\s270/);
    expect(message).toMatch(/\*Payable amount: LKR\s1,530\*/);
    expect(message).toContain("Delivery fee: to be confirmed by NARA");
    expect(message).toContain("Payment: Cash on delivery");
    expect(message).toContain("Name: Nimal Perera");
    expect(message).toContain("Phone: +94771234567");
    expect(message).toContain("Address: 12 Temple Road, Peradeniya");
    expect(message).toContain("District: Kandy");
    expect(message).toContain("Note: Call before delivery");
  });

  it("validates the form, then opens WhatsApp to NARA with the order", async () => {
    const user = userEvent.setup();
    const open = vi.spyOn(window, "open").mockReturnValue({} as Window);
    localStorage.setItem("nara-cart-v1", JSON.stringify([{ slug: "rosemary-oil", quantity: 2 }]));
    render(<CartProvider><CheckoutPage /></CartProvider>);

    const submit = await screen.findByRole("button", { name: /confirm order on whatsapp/i });
    expect(screen.getByText("Payable amount").nextElementSibling).toHaveTextContent(/LKR\s1,530/);
    expect(screen.getByText("Offer (15% off)").nextElementSibling).toHaveTextContent(/−LKR\s270/);
    await user.click(submit);
    expect(open).not.toHaveBeenCalled();
    expect(screen.getByText(/please enter your name/i)).toBeInTheDocument();

    await user.type(screen.getByLabelText("Full name"), details.name);
    await user.type(screen.getByLabelText("Phone number"), details.phone);
    await user.type(screen.getByLabelText("Delivery address"), "12 Temple Road, Peradeniya");
    await user.type(screen.getByLabelText("City or town"), details.city);
    await user.selectOptions(screen.getByLabelText("District"), "Kandy");
    await user.click(submit);

    expect(open).toHaveBeenCalledTimes(1);
    const url = new URL(open.mock.calls[0][0] as string);
    expect(url.origin + url.pathname).toBe("https://wa.me/94706132303");
    expect(url.searchParams.get("text")).toContain("NARA Premium Rosemary Oil (30 ml) × 2");
    expect(url.searchParams.get("text")).toMatch(/Payable amount: LKR\s1,530/);
    expect(screen.getByRole("status")).toHaveTextContent(/press send/i);

    await user.click(screen.getByRole("button", { name: /clear my bag/i }));
    expect(JSON.parse(localStorage.getItem("nara-cart-v1") ?? "[]")).toEqual([]);
  }, 15_000);
});
