import type { Metadata } from "next";
import { ProjectList } from "../../components/ProjectList";
import { fetchProjects } from "../../services/projects";

export const metadata: Metadata = { title: "Projets" };

export default async function ProjectsPage() {
  const projects = await fetchProjects();

  return (
    <>
      <h1>Projets</h1>
      {projects.length === 0 ? (
        <p>Aucun projet publié pour le moment.</p>
      ) : (
        <ProjectList projects={projects} />
      )}
    </>
  );
}
