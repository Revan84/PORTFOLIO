import { describe, expect, it } from "vitest";
import { formatPeriod } from "./period";

describe("formatPeriod", () => {
  it("joins the two years", () => {
    expect(formatPeriod(2022, 2023)).toBe("2022—2023");
  });

  it("marks an ongoing period", () => {
    expect(formatPeriod(2025, null)).toBe("2025—now");
  });

  it("writes an ongoing period in the page's language", () => {
    expect(formatPeriod(2025, null, "auj.")).toBe("2025—auj.");
  });

  it("shows one year when it starts and ends the same year", () => {
    expect(formatPeriod(2019, 2019)).toBe("2019");
  });
});
