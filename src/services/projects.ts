import type { Locale } from "../i18n/locales";
import {
  projectDetailListSchema,
  projectListSchema,
  type Project,
  type ProjectDetail,
} from "../types/project";
import { request } from "./http";
import { restUrl, selectColumns } from "./supabase";

const PROJECT_COLUMNS = ["id", "title", "slug", "summary", "skills(name)"];
const PROJECT_DETAIL_COLUMNS = [
  ...PROJECT_COLUMNS,
  "description",
  "cover_url",
  "cover_alt",
  "demo_url",
  "repo_url",
];
const TRANSLATED = ["title", "summary", "description", "cover_alt"];

export function buildProjectsUrl(locale: Locale): URL {
  const url = restUrl("projects");
  url.searchParams.set("select", selectColumns(PROJECT_COLUMNS, TRANSLATED, locale));
  url.searchParams.set("order", "created_at.desc,id.desc");
  return url;
}

export async function fetchProjects(locale: Locale, signal?: AbortSignal): Promise<Project[]> {
  const response = await request(buildProjectsUrl(locale), signal);
  const result = projectListSchema.safeParse(await response.json());
  if (!result.success) {
    throw new Error(`Invalid projects response: ${result.error.message}`);
  }
  return result.data;
}

export async function fetchProjectBySlug(
  slug: string,
  locale: Locale,
  signal?: AbortSignal,
): Promise<ProjectDetail | null> {
  const url = restUrl("projects");
  url.searchParams.set("select", selectColumns(PROJECT_DETAIL_COLUMNS, TRANSLATED, locale));
  url.searchParams.set("slug", `eq.${slug}`);

  const response = await request(url, signal);
  const result = projectDetailListSchema.safeParse(await response.json());
  if (!result.success) {
    throw new Error(`Invalid project response: ${result.error.message}`);
  }
  return result.data[0] ?? null;
}
