/**
 * Multi-currency display. All prices in the data layer are stored in USD;
 * they are converted for display only.
 *
 * The rates below are fixed placeholders. In the backend phase these come
 * from an exchange-rate API, and payments are charged in the currency the
 * payment provider settles in.
 */
export const CURRENCIES = {
  USD: { label: "US Dollar", symbol: "$", rate: 1 },
  EUR: { label: "Euro", symbol: "€", rate: 0.92 },
  GBP: { label: "British Pound", symbol: "£", rate: 0.79 },
  LKR: { label: "Sri Lankan Rupee", symbol: "Rs", rate: 300 },
} as const;

export type CurrencyCode = keyof typeof CURRENCIES;

export const DEFAULT_CURRENCY: CurrencyCode = "USD";

export function formatMoney(amountUsd: number, currency: CurrencyCode = DEFAULT_CURRENCY): string {
  const converted = amountUsd * CURRENCIES[currency].rate;
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency,
    currencyDisplay: "narrowSymbol",
    maximumFractionDigits: currency === "LKR" || Number.isInteger(converted) ? 0 : 2,
  }).format(converted);
}
