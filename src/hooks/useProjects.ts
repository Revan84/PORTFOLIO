import { fetchProjects } from "../services/projects";
import type { Project } from "../types/project";
import { createCache } from "./cache";
import { useResource, type ResourceState } from "./useResource";

const projectsCache = createCache<Project[]>();

export type ProjectsState = ResourceState<Project[]>;

export function useProjects(): ProjectsState {
  return useResource("all", fetchProjects, projectsCache);
}
