export function canonicalMetadata(pathname: string) {
  return process.env.NEXT_PUBLIC_SITE_URL ? { alternates: { canonical: pathname } } : {};
}
