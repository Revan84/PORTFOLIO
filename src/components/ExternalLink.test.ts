import { describe, expect, it } from "vitest";
import { isExternalUrl } from "./ExternalLink";

const SITE = "https://quentin-euillot.com";

describe("isExternalUrl", () => {
  it("treats another host as external", () => {
    expect(isExternalUrl("https://github.com/Revan84", SITE)).toBe(true);
  });

  it("keeps links to this site in the same tab", () => {
    expect(isExternalUrl("https://quentin-euillot.com/articles", SITE)).toBe(false);
    expect(isExternalUrl("/projects/homeapp", SITE)).toBe(false);
    expect(isExternalUrl("#contact", SITE)).toBe(false);
  });

  it("leaves mailto links alone", () => {
    expect(isExternalUrl("mailto:ellt.quentin@gmail.com", SITE)).toBe(false);
  });
});
