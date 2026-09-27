import type { Project } from "../types/project";
import { ProjectCard } from "./ProjectCard";

interface ProjectListProps {
  projects: Project[];
}

export function ProjectList({ projects }: ProjectListProps) {
  return (
    <ul>
      {projects.map((project) => (
        <li key={project.id}>
          <ProjectCard project={project} />
        </li>
      ))}
    </ul>
  );
}
