import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const currencyMap: Record<string, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  JPY: "¥",
  INR: "₹",
  AUD: "A$",
  CAD: "C$",
  CHF: "Fr",
  CNY: "¥",
  HKD: "¥",
  NZD: "NZ$",
};

export function getCurrencySymbol(currencyCode: string | undefined | null): string {
  if (!currencyCode) return "$";
  return currencyMap[currencyCode] || currencyCode; // Fallback to code if symbol not found (e.g. 'SEK') or return symbol
}

export function getLogoUrl(website: string | undefined | null): string | undefined {
  if (!website) return undefined;
  try {
    const url = new URL(website.startsWith('http') ? website : `https://${website}`);
    const domain = url.hostname.replace(/^www\./, '');
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
  } catch (e) {
    return undefined;
  }
}
