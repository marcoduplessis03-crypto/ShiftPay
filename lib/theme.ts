import type { CurrencyCode } from "./currency";
import { getCurrencyMeta } from "./currency";

export const theme = {
  colors: {
    background: "#070A12",
    surface: "rgba(255,255,255,0.075)",
    surfaceStrong: "rgba(255,255,255,0.11)",
    border: "rgba(255,255,255,0.12)",
    borderStrong: "rgba(255,255,255,0.18)",
    text: "#FFFFFF",
    muted: "#9CA3AF",
    muted2: "#6B7280",
    green: "#22C55E",
    greenDark: "#03110A",
    blue: "#38BDF8",
    gold: "#F5C451",
    danger: "#EF4444",
    dangerSoft: "rgba(239,68,68,0.15)",
  },
  radius: {
    sm: 14,
    md: 18,
    lg: 24,
    xl: 30,
  },
};

export function formatMoney(
  value: number,
  currency: CurrencyCode = "ZAR"
): string {
  const amount = Number.isFinite(value) ? value.toFixed(2) : "0.00";
  const meta = getCurrencyMeta(currency);

  return `${meta.symbol}${amount}`;
}

export function formatHours(decimalHours: number): string {
  if (!Number.isFinite(decimalHours) || decimalHours <= 0) {
    return "0h 0m";
  }

  const totalMinutes = Math.round(decimalHours * 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${hours}h ${minutes}m`;
}

export function formatDate(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Unknown date";
  }

  return date.toLocaleDateString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}