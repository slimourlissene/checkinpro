import { DateTime, WeekdayNumbers } from "luxon";

export function formatWeekday({ days }: { days: string[] }): string {
  const daysInFranch = days.map((day: string) => {
    return DateTime.now()
      .set({ weekday: parseInt(day) as WeekdayNumbers })
      .setLocale("fr")
      .toFormat("cccc");
  });

  return daysInFranch.join(", ");
}
