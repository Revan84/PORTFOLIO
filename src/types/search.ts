import { z } from "zod";

// Query string values arrive as string, string[] or undefined: invalid ones fall back to defaults.
export const articlesSearchSchema = z.object({
  q: z.string().trim().catch(""),
  page: z.coerce.number().int().min(1).catch(1),
});

export type ArticlesSearch = z.infer<typeof articlesSearchSchema>;
