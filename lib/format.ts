export function formatPrice(cents: number, currency: string) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: currency.toUpperCase()
  }).format(cents / 100);
}
