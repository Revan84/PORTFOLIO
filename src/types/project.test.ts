import { describe, expect, it } from "vitest";
import { projectDetailSchema, projectListSchema } from "./project";

describe("projectDetailSchema", () => {
  const detailRow = {
    id: 1,
    title: "HomeApp",
    slug: "homeapp",
    summary: "Application Flutter de gestion domotique.",
    skills: [{ name: "Flutter" }],
    description: null,
    cover_url: null,
    cover_alt: "Interface de l'application HomeApp",
    demo_url: null,
    repo_url: "https://github.com/Revan84/HomeApp",
  };

  it("accepts a project row with its optional links empty", () => {
    expect(projectDetailSchema.safeParse(detailRow).success).toBe(true);
  });

  it("rejects a repository link that is not a URL", () => {
    expect(projectDetailSchema.safeParse({ ...detailRow, repo_url: "github" }).success).toBe(false);
  });
});

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
