import { experienceListSchema, type Experience } from "../types/experience";
import { stackLayerListSchema, type StackLayer } from "../types/stack";
import { request } from "./http";
import { restUrl } from "./supabase";

const EXPERIENCE_COLUMNS =
  "id,hash,title,organization,location,ref,node,start_year,end_year,summary,highlights,tools";

export function buildExperiencesUrl(): URL {
  const url = restUrl("experiences");
  url.searchParams.set("select", EXPERIENCE_COLUMNS);
  url.searchParams.set("order", "position.asc");
  return url;
}

// The career, newest first. RLS returns only published entries.
export async function fetchExperiences(signal?: AbortSignal): Promise<Experience[]> {
  const response = await request(buildExperiencesUrl(), signal);
  const result = experienceListSchema.safeParse(await response.json());
  if (!result.success) {
    throw new Error(`Invalid experiences response: ${result.error.message}`);
  }
  return result.data;
}

export function buildStackUrl(): URL {
  const url = restUrl("stack_layers");
  url.searchParams.set("select", "code,name,skills(name)");
  url.searchParams.set("order", "position.asc");
  // Orders the embedded skills inside each layer.
  url.searchParams.set("skills.order", "position.asc");
  return url;
}

// The six layers, top to bottom, each with its skills in display order.
export async function fetchStack(signal?: AbortSignal): Promise<StackLayer[]> {
  const response = await request(buildStackUrl(), signal);
  const result = stackLayerListSchema.safeParse(await response.json());
  if (!result.success) {
    throw new Error(`Invalid stack response: ${result.error.message}`);
  }
  return result.data;
}
