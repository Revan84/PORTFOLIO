import { describe, expect, it } from "vitest";
import { articlesSearchSchema } from "./search";

describe("articlesSearchSchema", () => {
  it("reads the search and the page", () => {
    expect(articlesSearchSchema.parse({ q: " react ", page: "2" })).toEqual({ q: "react", page: 2 });
  });

  it("falls back to the first page without a search", () => {
    expect(articlesSearchSchema.parse({})).toEqual({ q: "", page: 1 });
  });

  it("ignores invalid values", () => {
    expect(articlesSearchSchema.parse({ q: ["a", "b"], page: "-3" })).toEqual({ q: "", page: 1 });
    expect(articlesSearchSchema.parse({ page: "abc" }).page).toBe(1);
  });
});
