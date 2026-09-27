import { z } from "zod";

export const skillSchema = z.object({
  name: z.string(),
});

export const projectSchema = z.object({
  id: z.number().int(),
  title: z.string(),
  slug: z.string(),
  summary: z.string(),
  skills: z.array(skillSchema),
});

export const projectListSchema = z.array(projectSchema);

export type Skill = z.infer<typeof skillSchema>;
export type Project = z.infer<typeof projectSchema>;
