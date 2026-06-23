import AsyncStorage from "@react-native-async-storage/async-storage";

export type ShiftDraft = {
  hourlyRate: number;
  hours: number;
  minutes: number;
  breakMinutes: number;
};

export type ShiftResult = ShiftDraft & {
  id: string;
  date: string;
  totalMinutes: number;
  totalHours: number;
  totalPay: number;
};

const HISTORY_KEY = "@shiftpay_history_v1";

function safeNumber(value: number): number {
  return Number.isFinite(value) && value > 0 ? value : 0;
}

export function calculateShift(
  draft: ShiftDraft
): Omit<ShiftResult, "id" | "date"> {
  const hourlyRate = safeNumber(draft.hourlyRate);
  const hours = safeNumber(draft.hours);
  const minutes = safeNumber(draft.minutes);
  const breakMinutes = safeNumber(draft.breakMinutes);

  const grossMinutes = hours * 60 + minutes;
  const totalMinutes = Math.max(grossMinutes - breakMinutes, 0);
  const totalHours = totalMinutes / 60;
  const totalPay = totalHours * hourlyRate;

  return {
    hourlyRate,
    hours,
    minutes,
    breakMinutes,
    totalMinutes,
    totalHours,
    totalPay,
  };
}

export async function loadHistory(): Promise<ShiftResult[]> {
  try {
    const raw = await AsyncStorage.getItem(HISTORY_KEY);

    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed as ShiftResult[];
  } catch {
    return [];
  }
}

export async function saveShift(draft: ShiftDraft): Promise<ShiftResult[]> {
  const calculated = calculateShift(draft);
  const history = await loadHistory();

  const newShift: ShiftResult = {
    ...calculated,
    id: `${Date.now()}`,
    date: new Date().toISOString(),
  };

  const updated = [newShift, ...history].slice(0, 250);

  await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(updated));

  return updated;
}

export async function deleteShift(id: string): Promise<ShiftResult[]> {
  const history = await loadHistory();

  const updated = history.filter((shift) => shift.id !== id);

  await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(updated));

  return updated;
}

export async function clearHistory(): Promise<void> {
  await AsyncStorage.removeItem(HISTORY_KEY);
}