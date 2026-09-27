import type { MetadataRoute } from "next";
import { site } from "../content/site";
import { fetchArticles } from "../services/articles";
import { countPages } from "../services/pagination";
import { fetchProjects } from "../services/projects";

type SitemapEntry = MetadataRoute.Sitemap[number];

// Every published article and project, read from Supabase, plus the two list pages.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, firstPage] = await Promise.all([fetchProjects(), fetchArticles("", 1)]);
  const pageCount = countPages(firstPage.total);
  const otherPages = await Promise.all(
    Array.from({ length: pageCount - 1 }, (_, index) => fetchArticles("", index + 2)),
  );
  const articles = [firstPage, ...otherPages].flatMap((page) => page.articles);

  return [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/articles`, changeFrequency: "weekly", priority: 0.8 },
    ...projects.map((project): SitemapEntry => ({
      url: `${site.url}/projects/${encodeURIComponent(project.slug)}`,
      changeFrequency: "monthly",
      priority: 0.7,
    })),
    ...articles.map((article): SitemapEntry => ({
      url: `${site.url}/articles/${encodeURIComponent(article.slug)}`,
      changeFrequency: "yearly",
      priority: 0.6,
    })),
  ];
}
