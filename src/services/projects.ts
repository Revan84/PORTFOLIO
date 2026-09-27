import { projectListSchema, type Project } from "../types/project";
import { request } from "./http";
import { restUrl } from "./supabase";

export function buildProjectsUrl(): URL {
  const url = restUrl("projects");
  url.searchParams.set("select", "id,title,slug,summary,skills(name)");
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
