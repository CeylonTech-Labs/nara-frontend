export function getWhatsAppUrl(number: string | undefined, message?: string): string | null {
  if (!number || !/^[1-9]\d{7,14}$/.test(number)) return null;
  const url = new URL(`https://wa.me/${number}`);
  if (message) url.searchParams.set("text", message);
  return url.toString();
}
