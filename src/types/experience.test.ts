import { describe, expect, it } from "vitest";
import { experienceListSchema } from "./experience";

const row = {
  id: 1,
  hash: "e4c1b07",
  title: "Full-Stack Developer, own projects",
  organization: "HomeApp · EXO SOUND",
  location: "Montpellier, FR",
  ref: "HEAD → main",
  node: "head",
  start_year: 2025,
  end_year: null,
  summary: "Building my own smart home platform.",
  highlights: ["[HomeApp](/projects/homeapp): a Flutter app"],
  tools: ["Flutter", "Go"],
};

describe("experienceListSchema", () => {
  it("accepts an ongoing entry", () => {
    expect(experienceListSchema.safeParse([row]).success).toBe(true);
  });

  it("rejects a node the commit graph cannot draw", () => {
    expect(experienceListSchema.safeParse([{ ...row, node: "merge" }]).success).toBe(false);
  });

  it("rejects highlights that are not a list of strings", () => {
    expect(experienceListSchema.safeParse([{ ...row, highlights: "one line" }]).success).toBe(false);
  });
});
