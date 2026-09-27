import { beforeEach, expect, it, vi } from "vitest";

beforeEach(() => {
  vi.resetModules();
  vi.stubEnv("SUPABASE_URL", "https://example.supabase.co");
  vi.stubEnv("SUPABASE_PUBLISHABLE_KEY", "sb_publishable_test");
});

it("orders the layers and the skills inside each layer", async () => {
  const { buildStackUrl } = await import("./career");
  const url = buildStackUrl("en");
  expect(url.pathname).toBe("/rest/v1/stack_layers");
  expect(url.searchParams.get("select")).toBe("code,name,skills(name)");
  expect(url.searchParams.get("order")).toBe("position.asc");
  expect(url.searchParams.get("skills.order")).toBe("position.asc");
});

it("reads the French layer names under the English column name", async () => {
  const { buildStackUrl } = await import("./career");
  expect(buildStackUrl("fr").searchParams.get("select")).toBe("code,name:name_fr,skills(name)");
});

it("reads the career newest first", async () => {
  const { buildExperiencesUrl } = await import("./career");
  expect(buildExperiencesUrl("en").searchParams.get("order")).toBe("position.asc");
});

it("translates the texts of the career but not the refs", async () => {
  const { buildExperiencesUrl } = await import("./career");
  const select = buildExperiencesUrl("fr").searchParams.get("select");
  expect(select).toContain("title:title_fr");
  expect(select).toContain("highlights:highlights_fr");
  expect(select).toContain(",ref,node,");
});
