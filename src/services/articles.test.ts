import { beforeEach, expect, it, vi } from "vitest";

beforeEach(() => {
  vi.resetModules();
  vi.stubEnv("SUPABASE_URL", "https://example.supabase.co");
  vi.stubEnv("SUPABASE_PUBLISHABLE_KEY", "sb_publishable_test");
});

it("encodes the search and computes the offset", async () => {
  const { buildArticlesUrl } = await import("./articles");
  const url = buildArticlesUrl(" React & Zod ", 2, "en");
  expect(url.searchParams.get("offset")).toBe("6");
  expect(url.search).toContain("React+%26+Zod");
});

it("searches the French titles on the French pages", async () => {
  const { buildArticlesUrl } = await import("./articles");
  const url = buildArticlesUrl("domotique", 1, "fr");
  expect(url.searchParams.get("title_fr")).toBe("ilike.*domotique*");
  expect(url.searchParams.has("title")).toBe(false);
  expect(url.searchParams.get("select")).toContain("excerpt:excerpt_fr");
});
