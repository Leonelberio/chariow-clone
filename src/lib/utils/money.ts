export function formatMoney(cents: number, currency = "EUR", locale = "fr-FR") {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(cents / 100);
}
