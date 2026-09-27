import { describe, expect, it } from "vitest";
import { transitionHref, type LinkClick } from "./navigation";

const current = new URL("https://quentin-euillot.com/articles?page=2");
const click = (overrides: Partial<LinkClick>): LinkClick => ({
  href: "/projects/homeapp",
  target: null,
  download: false,
  modified: false,
  ...overrides,
});

describe("transitionHref", () => {
  it("animates a plain link to another page", () => {
    expect(transitionHref(click({}), current)).toBe("/projects/homeapp");
  });

  it("keeps the search and the anchor of the destination", () => {
    expect(transitionHref(click({ href: "/#work" }), current)).toBe("/#work");
  });

  it("leaves links that stay on the current page alone", () => {
    expect(transitionHref(click({ href: "/articles?page=3" }), current)).toBeNull();
    expect(transitionHref(click({ href: "#content" }), current)).toBeNull();
  });

  it("leaves other sites, new tabs, downloads and modified clicks alone", () => {
    expect(transitionHref(click({ href: "https://github.com/Revan84" }), current)).toBeNull();
    expect(transitionHref(click({ target: "_blank" }), current)).toBeNull();
    expect(transitionHref(click({ download: true }), current)).toBeNull();
    expect(transitionHref(click({ modified: true }), current)).toBeNull();
    expect(transitionHref(click({ href: "mailto:ellt.quentin@gmail.com" }), current)).toBeNull();
  });
});
