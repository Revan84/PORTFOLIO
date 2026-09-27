export const CACHE_TTL_MS = 5 * 60 * 1000;

export function createCache<T>(ttlMs = CACHE_TTL_MS) {
  const entries = new Map<string, { value: T; storedAt: number }>();

  return {
    get(key: string): T | undefined {
      const entry = entries.get(key);
      if (entry === undefined) return undefined;
      if (Date.now() - entry.storedAt > ttlMs) {
        entries.delete(key);
        return undefined;
      }
      return entry.value;
    },
    set(key: string, value: T): void {
      entries.set(key, { value, storedAt: Date.now() });
    },
  };
}

export type Cache<T> = ReturnType<typeof createCache<T>>;
