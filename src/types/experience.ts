import { z } from "zod";

// "head" is the current position, "branch" a side activity drawn off the main line,
// "root" the first commit.
export const commitNodeSchema = z.enum(["head", "commit", "branch", "root"]);

export const experienceSchema = z.object({
  id: z.number().int(),
  hash: z.string(),
  title: z.string(),
  organization: z.string(),
  location: z.string().nullable(),
  ref: z.string(),
  node: commitNodeSchema,
  start_year: z.number().int(),
  end_year: z.number().int().nullable(),
  summary: z.string(),
  highlights: z.array(z.string()),
  tools: z.array(z.string()),
});

export const experienceListSchema = z.array(experienceSchema);

export type CommitNode = z.infer<typeof commitNodeSchema>;
export type Experience = z.infer<typeof experienceSchema>;
