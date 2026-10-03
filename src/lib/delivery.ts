export interface DeliveryRange {
  start: Date;
  end: Date;
}

function isWeekend(date: Date): boolean {
  const day = date.getDay();
  return day === 0 || day === 6;
}

/** Date that is `days` working days (Mon to Fri) after `from`. */
export function addWorkingDays(from: Date, days: number): Date {
  const date = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  let added = 0;
  while (added < days) {
    date.setDate(date.getDate() + 1);
    if (!isWeekend(date)) added += 1;
  }
  return date;
}

/** Delivery window of `minDays` to `maxDays` working days from `from`. */
export function getDeliveryRange(from: Date, minDays = 3, maxDays = 5): DeliveryRange {
  return { start: addWorkingDays(from, minDays), end: addWorkingDays(from, maxDays) };
}

const monthFormat = new Intl.DateTimeFormat("en-US", { month: "short" });
const pad = (day: number) => String(day).padStart(2, "0");

/** "Oct 08-12", or "Oct 30-Nov 03" when the range spans two months. */
export function formatDeliveryRange({ start, end }: DeliveryRange): string {
  const startMonth = monthFormat.format(start);
  const endMonth = monthFormat.format(end);
  const startLabel = `${startMonth} ${pad(start.getDate())}`;
  return startMonth === endMonth && start.getFullYear() === end.getFullYear()
    ? `${startLabel}-${pad(end.getDate())}`
    : `${startLabel}-${endMonth} ${pad(end.getDate())}`;
}
