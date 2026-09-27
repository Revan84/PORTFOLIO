import { beforeEach, expect, it, vi } from "vitest";

beforeEach(() => {
  vi.resetModules();
  vi.stubEnv("VITE_SUPABASE_URL", "https://example.supabase.co");
  vi.stubEnv("VITE_SUPABASE_PUBLISHABLE_KEY", "sb_publishable_test");
});

it("encodes the search and computes the offset", async () => {
  const { buildArticlesUrl } = await import("./articles");
  const url = buildArticlesUrl(" React & Zod ", 2);
  expect(url.searchParams.get("offset")).toBe("6");
  expect(url.search).toContain("React+%26+Zod");
});
