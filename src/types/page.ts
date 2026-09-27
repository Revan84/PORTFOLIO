import { z } from "zod";

export const pageSchema = z.object({
  id: z.number().int(),
  title: z.string(),
  slug: z.string(),
  content: z.string().nullable(),
  published_at: z.iso.datetime({ offset: true }),
});

export const pageListSchema = z.array(pageSchema);

export type Page = z.infer<typeof pageSchema>;
