import { describe, expect, it } from "vitest";
import { localeFromPathname, localizePath, negotiateLocale, stripLocale } from "./locales";

describe("localizePath", () => {
  it("keeps English paths as they are", () => {
    expect(localizePath("en", "/articles")).toBe("/articles");
  });

  it("prefixes French paths", () => {
    expect(localizePath("fr", "/")).toBe("/fr");
    expect(localizePath("fr", "/projects/homeapp")).toBe("/fr/projects/homeapp");
  });

  it("keeps an anchor or a query on the home page next to the prefix", () => {
    expect(localizePath("fr", "/#work")).toBe("/fr#work");
    expect(localizePath("fr", "/?q=go")).toBe("/fr?q=go");
  });
});

describe("localeFromPathname and stripLocale", () => {
  it("read French only from a whole /fr segment", () => {
    expect(localeFromPathname("/fr")).toBe("fr");
    expect(localeFromPathname("/fr/articles")).toBe("fr");
    expect(localeFromPathname("/frameworks")).toBe("en");
  });

  it("give back the English path", () => {
    expect(stripLocale("/fr")).toBe("/");
    expect(stripLocale("/fr/articles/react-and-zod")).toBe("/articles/react-and-zod");
    expect(stripLocale("/articles")).toBe("/articles");
  });
});

describe("negotiateLocale", () => {
  it("picks the best supported language by quality", () => {
    expect(negotiateLocale("fr-FR,fr;q=0.9,en;q=0.8")).toBe("fr");
    expect(negotiateLocale("de-DE,en;q=0.7,fr;q=0.5")).toBe("en");
  });

  it("returns null when no supported language is named", () => {
    expect(negotiateLocale("de-DE,it;q=0.5")).toBeNull();
    expect(negotiateLocale(null)).toBeNull();
  });

  it("ignores refused languages", () => {
    expect(negotiateLocale("fr;q=0,en")).toBe("en");
  });
});
