import { z } from "zod";

export const articlePreviewSchema = z.object({
  id: z.number().int(),
  title: z.string(),
  slug: z.string(),
  excerpt: z.string(),
  cover_url: z.url().nullable(),
  cover_alt: z.string().nullable(),
});

export const articlePreviewListSchema = z.array(articlePreviewSchema);

export type ArticlePreview = z.infer<typeof articlePreviewSchema>;
