import type { MetadataRoute } from "next";
import { site } from "../content/site";
import { localizePath, locales } from "../i18n/locales";
import { languageAlternates } from "../lib/metadata";
import { fetchArticleSlugs } from "../services/articles";
import { fetchProjects } from "../services/projects";

type SitemapEntry = MetadataRoute.Sitemap[number];

// Every page in both languages, each entry pointing to its translation (hreflang).
function entries(path: string, changeFrequency: SitemapEntry["changeFrequency"], priority: number): SitemapEntry[] {
  const languages = Object.fromEntries(
    Object.entries(languageAlternates(path)).map(([language, url]) => [language, `${site.url}${url}`]),
  );
  return locales.map((locale) => ({
    url: `${site.url}${localizePath(locale, path)}`,
    changeFrequency,
    priority,
    alternates: { languages },
  }));
}

// Every published article and project, read from Supabase, plus the two list pages.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, articleSlugs] = await Promise.all([fetchProjects("en"), fetchArticleSlugs()]);

  return [
    ...entries("/", "monthly", 1),
    ...entries("/articles", "weekly", 0.8),
    ...projects.flatMap((project) =>
      entries(`/projects/${encodeURIComponent(project.slug)}`, "monthly", 0.7),
    ),
    ...articleSlugs.flatMap((slug) => entries(`/articles/${encodeURIComponent(slug)}`, "yearly", 0.6)),
  ];
}
