import AsyncStorage from "@react-native-async-storage/async-storage";

export const CURRENCIES = [
  {
    code: "ZAR",
    symbol: "R",
    name: "South African Rand",
    shortName: "Rand",
  },
  {
    code: "USD",
    symbol: "$",
    name: "US Dollar",
    shortName: "Dollar",
  },
  {
    code: "GBP",
    symbol: "£",
    name: "British Pound",
    shortName: "Pound",
  },
  {
    code: "EUR",
    symbol: "€",
    name: "Euro",
    shortName: "Euro",
  },
] as const;

export type CurrencyCode = (typeof CURRENCIES)[number]["code"];

const CURRENCY_KEY = "@shiftpay_currency_v1";

export function isCurrencyCode(value: string): value is CurrencyCode {
  return CURRENCIES.some((currency) => currency.code === value);
}

export function getCurrencyMeta(code: CurrencyCode) {
  return CURRENCIES.find((currency) => currency.code === code) ?? CURRENCIES[0];
}

export async function loadCurrency(): Promise<CurrencyCode> {
  try {
    const stored = await AsyncStorage.getItem(CURRENCY_KEY);

    if (stored && isCurrencyCode(stored)) {
      return stored;
    }

    return "ZAR";
  } catch {
    return "ZAR";
  }
}

export async function saveCurrency(currency: CurrencyCode): Promise<void> {
  await AsyncStorage.setItem(CURRENCY_KEY, currency);
}