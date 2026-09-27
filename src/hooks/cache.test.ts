import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createCache } from "./cache";

describe("createCache", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns a stored value", () => {
    const cache = createCache<number>(1000);
    cache.set("react|1", 42);
    expect(cache.get("react|1")).toBe(42);
    expect(cache.get("react|2")).toBeUndefined();
  });

  it("forgets a value once its lifetime is over", () => {
    const cache = createCache<number>(1000);
    cache.set("react|1", 42);
    vi.advanceTimersByTime(1001);
    expect(cache.get("react|1")).toBeUndefined();
  });
});
