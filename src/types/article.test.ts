import { describe, expect, it } from "vitest";
import { articlePreviewListSchema } from "./article";

const validRow = {
  id: 1,
  title: "React & Zod",
  slug: "react-zod",
  excerpt: "Recherche avec esperluette.",
  cover_url: null,
  cover_alt: null,
};

describe("articlePreviewListSchema", () => {
  it("accepts a valid row", () => {
    const result = articlePreviewListSchema.safeParse([validRow]);
    expect(result.success).toBe(true);
    expect(result.data).toEqual([validRow]);
  });

  it("accepts an empty list and keeps it empty", () => {
    const result = articlePreviewListSchema.safeParse([]);
    expect(result.success).toBe(true);
    expect(result.data).toEqual([]);
  });

  it("rejects a numeric title", () => {
    const result = articlePreviewListSchema.safeParse([{ ...validRow, title: 42 }]);
    expect(result.success).toBe(false);
  });
});