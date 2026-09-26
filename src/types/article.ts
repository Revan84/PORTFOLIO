import { z } from "zod";

export const articleSchema = z.object({
  id: z.number().int(),
  title: z.string(),
  slug: z.string(),
  excerpt: z.string(),
  content: z.string().nullable(),
  cover_url: z.url().nullable(),
  cover_alt: z.string().nullable(),
  published_at: z.iso.datetime({ offset: true }),
});

export const articleListSchema = z.array(articleSchema);

export type Article = z.infer<typeof articleSchema>;

export const articlePreviewSchema = articleSchema.pick({
  id: true,
  title: true,
  slug: true,
  excerpt: true,
  cover_url: true,
  cover_alt: true,
});

export const articlePreviewListSchema = z.array(articlePreviewSchema);

export type ArticlePreview = z.infer<typeof articlePreviewSchema>;
