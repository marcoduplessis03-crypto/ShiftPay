import { ShiftResult } from './types';

function parseTime(value: string): number | null {
  const cleaned = value.trim();
  const match = cleaned.match(/^(\d{1,2}):(\d{2})$/);
  if (!match) return null;

  const h = Number(match[1]);
  const m = Number(match[2]);

  if (h < 0 || h > 23 || m < 0 || m > 59) return null;
  return h * 60 + m;
}

export function calculateShift(input: {
  startTime: string;
  endTime: string;
  breakMinutes: number;
  hourlyRate: number;
  overtimeAfter: number;
}): ShiftResult | null {
  const start = parseTime(input.startTime);
  const end = parseTime(input.endTime);

  if (start === null || end === null) return null;
  if (!input.hourlyRate || input.hourlyRate <= 0) return null;

  let elapsed = end - start;
  if (elapsed <= 0) elapsed += 24 * 60;

  const workedMinutes = Math.max(0, elapsed - input.breakMinutes);
  const totalHours = workedMinutes / 60;

  const regularHours = Math.min(totalHours, input.overtimeAfter);
  const overtimeHours = Math.max(0, totalHours - input.overtimeAfter);

  const regularPay = regularHours * input.hourlyRate;
  const overtimePay = overtimeHours * input.hourlyRate * 1.5;

  return {
    id: `${Date.now()}`,
    date: new Date().toISOString(),
    startTime: input.startTime,
    endTime: input.endTime,
    breakMinutes: input.breakMinutes,
    hourlyRate: input.hourlyRate,
    overtimeAfter: input.overtimeAfter,
    regularHours,
    overtimeHours,
    totalHours,
    regularPay,
    overtimePay,
    totalPay: regularPay + overtimePay,
  };
}

export function money(value: number) {
  return `R${value.toFixed(2)}`;
}

export function hoursLabel(hours: number) {
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  return `${h}h ${m}m`;
}