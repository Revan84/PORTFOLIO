export const PAGE_SIZE = 6;

export function readTotal(contentRange: string | null): number {
  const match = contentRange?.match(/\/(\d+)$/);
  if (!match) {
    throw new Error(`Invalid Content-Range: ${contentRange}`);
  }
  return Number(match[1]);
}

export function countPages(total: number): number {
  return Math.max(1, Math.ceil(total / PAGE_SIZE));
}
