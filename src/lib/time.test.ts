import { describe, expect, it } from "vitest";
import { formatParisTime, formatUptime } from "./time";

describe("formatParisTime", () => {
  it("shows the time in Paris, not in UTC", () => {
    expect(formatParisTime(new Date("2026-09-27T10:05:09Z"))).toBe("12:05:09");
  });
});

describe("formatUptime", () => {
  const since = new Date("2021-09-01T07:00:00Z");

  it("counts years, days and the time of day", () => {
    const now = new Date(since.getTime() + (2 * 31_557_600 + 3 * 86_400 + 3_723) * 1000);
    expect(formatUptime(since, now)).toBe("2y 3d 01:02:03");
  });

  it("never goes negative", () => {
    expect(formatUptime(since, new Date("2020-01-01T00:00:00Z"))).toBe("0y 0d 00:00:00");
  });
});
