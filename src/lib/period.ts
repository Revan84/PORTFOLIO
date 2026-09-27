// "2022—2023", "2025—now", or a single year when it starts and ends the same year.
export function formatPeriod(startYear: number, endYear: number | null): string {
  if (endYear === null) return `${startYear}—now`;
  if (endYear === startYear) return String(startYear);
  return `${startYear}—${endYear}`;
}
