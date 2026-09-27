import { beforeEach, expect, it, vi } from "vitest";

beforeEach(() => {
  vi.resetModules();
  vi.stubEnv("SUPABASE_URL", "https://example.supabase.co");
  vi.stubEnv("SUPABASE_PUBLISHABLE_KEY", "sb_publishable_test");
});

it("orders the layers and the skills inside each layer", async () => {
  const { buildStackUrl } = await import("./career");
  const url = buildStackUrl();
  expect(url.pathname).toBe("/rest/v1/stack_layers");
  expect(url.searchParams.get("select")).toBe("code,name,skills(name)");
  expect(url.searchParams.get("order")).toBe("position.asc");
  expect(url.searchParams.get("skills.order")).toBe("position.asc");
});

it("reads the career newest first", async () => {
  const { buildExperiencesUrl } = await import("./career");
  expect(buildExperiencesUrl().searchParams.get("order")).toBe("position.asc");
});
