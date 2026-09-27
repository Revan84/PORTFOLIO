import type { Metadata } from "next";
import { ProjectList } from "../../components/ProjectList";
import { fetchProjects } from "../../services/projects";

export const metadata: Metadata = { title: "Work" };

// Temporary: the projects move to the home #work section in step 3.
export default async function ProjectsPage() {
  const projects = await fetchProjects();

  return (
    <div className="container">
      <h1>Work</h1>
      {projects.length === 0 ? <p>No published project yet.</p> : <ProjectList projects={projects} />}
    </div>
  );
}
