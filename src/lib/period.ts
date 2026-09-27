// "2022—2023", "2025—now", or a single year when it starts and ends the same year.
// `now` is the word for an ongoing period in the page's language.
export function formatPeriod(startYear: number, endYear: number | null, now = "now"): string {
  if (endYear === null) return `${startYear}—${now}`;
  if (endYear === startYear) return String(startYear);
  return `${startYear}—${endYear}`;
}
