import type { Project } from "../types/project";
import { SkillList } from "./SkillList";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article>
      <h2>{project.title}</h2>
      <p>{project.summary}</p>
      <SkillList skills={project.skills} />
    </article>
  );
}
