const pad = (value: number) => String(value).padStart(2, "0");

// The wall clock in Montpellier, whatever the visitor's time zone.
export function formatParisTime(date: Date): string {
  return date.toLocaleTimeString("en-GB", { timeZone: "Europe/Paris", hour12: false });
}

const YEAR_SECONDS = 31_557_600; // 365.25 days
const DAY_SECONDS = 86_400;

// Time elapsed since `since`, as "4y 25d 22:31:43".
export function formatUptime(since: Date, now: Date): string {
  let seconds = Math.max(0, Math.floor((now.getTime() - since.getTime()) / 1000));
  const years = Math.floor(seconds / YEAR_SECONDS);
  seconds -= years * YEAR_SECONDS;
  const days = Math.floor(seconds / DAY_SECONDS);
  seconds -= days * DAY_SECONDS;
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${years}y ${days}d ${pad(hours)}:${pad(minutes)}:${pad(seconds % 60)}`;
}
