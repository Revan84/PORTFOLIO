import type { MetadataRoute } from "next";
import { site } from "../content/site";
import { fetchArticleSlugs } from "../services/articles";
import { fetchProjects } from "../services/projects";

type SitemapEntry = MetadataRoute.Sitemap[number];

// Every published article and project, read from Supabase, plus the two list pages.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, articleSlugs] = await Promise.all([fetchProjects(), fetchArticleSlugs()]);

  return [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/articles`, changeFrequency: "weekly", priority: 0.8 },
    ...projects.map((project): SitemapEntry => ({
      url: `${site.url}/projects/${encodeURIComponent(project.slug)}`,
      changeFrequency: "monthly",
      priority: 0.7,
    })),
    ...articleSlugs.map((slug): SitemapEntry => ({
      url: `${site.url}/articles/${encodeURIComponent(slug)}`,
      changeFrequency: "yearly",
      priority: 0.6,
    })),
  ];
}
