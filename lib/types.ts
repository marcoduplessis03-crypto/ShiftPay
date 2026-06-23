export type ShiftResult = {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  breakMinutes: number;
  hourlyRate: number;
  overtimeAfter: number;
  regularHours: number;
  overtimeHours: number;
  totalHours: number;
  regularPay: number;
  overtimePay: number;
  totalPay: number;
};