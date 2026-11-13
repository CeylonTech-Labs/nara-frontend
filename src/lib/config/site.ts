export const siteContact = {
  email: "nara.origin3@gmail.com",
  phoneDisplay: "070 613 2303",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "94706132303",
  instagramHandle: "nara_care26",
  instagramUrl: "https://www.instagram.com/nara_care26/",
  facebookUrl: "https://www.facebook.com/share/1H2nHciV55/",
};

export function canonicalMetadata(pathname: string) {
  return process.env.NEXT_PUBLIC_SITE_URL ? { alternates: { canonical: pathname } } : {};
}
