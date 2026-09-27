import { describe, expect, it } from "vitest";
import { articlesHref, countPages, readTotal } from "./pagination";

describe("articlesHref", () => {
  it("keeps the home URL clean on the first page", () => {
    expect(articlesHref("", 1)).toBe("/");
  });

  it("encodes the search and the page", () => {
    expect(articlesHref("React & Zod", 2)).toBe("/?q=React+%26+Zod&page=2");
  });
});

describe("readTotal", () => {
  it("reads the total after the slash", () => {
    expect(readTotal("0-5/13")).toBe(13);
  });

  it("reads a zero total when the range is empty", () => {
    expect(readTotal("*/0")).toBe(0);
  });

  it("rejects a missing header", () => {
    expect(() => readTotal(null)).toThrow();
  });
});

describe("countPages", () => {
  it("rounds up to the next page", () => {
    expect(countPages(13)).toBe(3);
  });

  it("returns at least one page", () => {
    expect(countPages(0)).toBe(1);
  });
});
