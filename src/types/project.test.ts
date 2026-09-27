import { describe, expect, it } from "vitest";
import { projectListSchema } from "./project";

const validRow = {
  id: 1,
  title: "HomeApp",
  slug: "homeapp",
  summary: "Application Flutter de gestion domotique.",
  skills: [{ name: "Flutter" }, { name: "Dart" }],
};

describe("projectListSchema", () => {
  it("accepts a project with its nested skills", () => {
    const result = projectListSchema.safeParse([validRow]);
    expect(result.success).toBe(true);
    expect(result.data?.[0]?.skills).toEqual([{ name: "Flutter" }, { name: "Dart" }]);
  });

  it("accepts a project without skills", () => {
    expect(projectListSchema.safeParse([{ ...validRow, skills: [] }]).success).toBe(true);
  });

  it("rejects a skill without a name", () => {
    expect(projectListSchema.safeParse([{ ...validRow, skills: [{}] }]).success).toBe(false);
  });
});
