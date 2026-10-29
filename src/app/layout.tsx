import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Noto_Serif_Sinhala } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { WhatsAppContact } from "@/components/shared/whatsapp-contact";
import { CartProvider } from "@/features/cart/cart-context";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const notoSinhala = Noto_Serif_Sinhala({
  variable: "--font-sinhala",
  subsets: ["sinhala"],
  weight: ["400", "500", "600"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "NARA | The Beauty of Our Heritage", template: "%s | NARA" },
  description: "Discover NARA, a Sri Lankan heritage beauty brand inspired by botanical rituals and timeless care.",
  openGraph: {
    type: "website",
    siteName: "NARA",
    title: "NARA | The Beauty of Our Heritage",
    description: "Sri Lankan heritage beauty, thoughtfully reimagined.",
    images: ["/images/brand/nara-logo.jpeg"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable} ${notoSinhala.variable}`}>
      <body>
        <CartProvider>
          <a className="skip-link" href="#main-content">Skip to content</a>
          <SiteHeader />
          <main id="main-content">{children}</main>
          <SiteFooter />
          <WhatsAppContact />
        </CartProvider>
      </body>
    </html>
  );
}
