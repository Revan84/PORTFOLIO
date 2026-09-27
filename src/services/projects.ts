import {
  projectDetailListSchema,
  projectListSchema,
  type Project,
  type ProjectDetail,
} from "../types/project";
import { request } from "./http";
import { restUrl } from "./supabase";

const PROJECT_COLUMNS = "id,title,slug,summary,skills(name)";
const PROJECT_DETAIL_COLUMNS = `${PROJECT_COLUMNS},description,cover_url,cover_alt,demo_url,repo_url`;

export function buildProjectsUrl(): URL {
  const url = restUrl("projects");
  url.searchParams.set("select", PROJECT_COLUMNS);
  url.searchParams.set("order", "created_at.desc,id.desc");
  return url;
}

export async function fetchProjects(signal?: AbortSignal): Promise<Project[]> {
  const response = await request(buildProjectsUrl(), signal);
  const result = projectListSchema.safeParse(await response.json());
  if (!result.success) {
    throw new Error(`Invalid projects response: ${result.error.message}`);
  }
  return result.data;
}

export async function fetchProjectBySlug(
  slug: string,
  signal?: AbortSignal,
): Promise<ProjectDetail | null> {
  const url = restUrl("projects");
  url.searchParams.set("select", PROJECT_DETAIL_COLUMNS);
  url.searchParams.set("slug", `eq.${slug}`);

  const response = await request(url, signal);
  const result = projectDetailListSchema.safeParse(await response.json());
  if (!result.success) {
    throw new Error(`Invalid project response: ${result.error.message}`);
  }
  return result.data[0] ?? null;
}
