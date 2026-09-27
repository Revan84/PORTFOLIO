import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import Markdown from "react-markdown";
import { ArchitectureDiagram } from "../../../components/ArchitectureDiagram";
import { ArrowIcon } from "../../../components/ArrowIcon";
import { FactList, type Fact } from "../../../components/FactList";
import { splitTitle, TerminalTitle } from "../../../components/TerminalTitle";
import { caseStudies } from "../../../content/caseStudies";
import { pageMetadata } from "../../../lib/metadata";
import { fetchProjectBySlug, fetchProjects } from "../../../services/projects";
import type { ProjectDetail } from "../../../types/project";
import styles from "./case.module.css";

export async function generateMetadata(props: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const project = await fetchProjectBySlug(slug);
  if (project === null) return {};
  return pageMetadata({
    title: project.title,
    description: project.summary,
    path: `/projects/${encodeURIComponent(project.slug)}`,
  });
}

// Without hand-written facts, the page falls back to what the Supabase row knows.
function defaultFacts(project: ProjectDetail): Fact[] {
  return project.skills.length === 0
    ? []
    : [{ label: "STACK", value: project.skills.map((skill) => skill.name).join(" · ") }];
}

function linkFacts(project: ProjectDetail): Fact[] {
  const facts: Fact[] = [];
  if (project.demo_url !== null) {
    facts.push({ label: "LIVE", value: <a href={project.demo_url}>{new URL(project.demo_url).host}</a> });
  }
  if (project.repo_url !== null) {
    facts.push({
      label: "CODE",
      value: <a href={project.repo_url}>{new URL(project.repo_url).pathname.slice(1)}</a>,
    });
  }
  return facts;
}

export default async function ProjectPage(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;
  const [project, projects] = await Promise.all([fetchProjectBySlug(slug), fetchProjects()]);
  if (project === null) notFound();

  const caseStudy = caseStudies[project.slug] ?? {};
  const position = projects.findIndex((item) => item.slug === project.slug);
  const next = projects.length > 1 ? projects[(position + 1) % projects.length] : undefined;
  const facts = [...(caseStudy.facts ?? defaultFacts(project)), ...linkFacts(project)];

  const sections: { label: string; content: ReactNode }[] = [];
  if (project.description !== null) {
    sections.push({
      label: "context",
      content: (
        <div className={styles.prose}>
          <Markdown>{project.description}</Markdown>
        </div>
      ),
    });
  }
  if (caseStudy.architecture) {
    sections.push({
      label: "architecture",
      content: <ArchitectureDiagram architecture={caseStudy.architecture} />,
    });
  }
  if (caseStudy.outcomes && caseStudy.outcomes.length > 0) {
    sections.push({
      label: "outcome",
      content: (
        <ol className={styles.outcomes}>
          {caseStudy.outcomes.map((outcome, index) => (
            <li key={outcome}>
              <span className={styles.outcomeIndex}>{String(index + 1).padStart(2, "0")}</span>
              {outcome}
            </li>
          ))}
        </ol>
      ),
    });
  }

  return (
    <div className="container">
      <header className={styles.intro}>
        <Link href="/#work" className={styles.back}>
          cd ../work
        </Link>
        <span className="section-label">
          /work/{String(position + 1).padStart(2, "0")} · case study
        </span>
        <TerminalTitle {...splitTitle(project.title)} tag='h1 class="case"' className={styles.title} />
        <div className={styles.summary}>
          <p className={styles.lead}>{caseStudy.lead ?? project.summary}</p>
          {facts.length > 0 && <FactList facts={facts} />}
        </div>
      </header>

      {project.cover_url !== null && (
        <div className={`lighten ${styles.cover}`}>
          <Image
            src={project.cover_url}
            alt={project.cover_alt ?? ""}
            width={1600}
            height={900}
            unoptimized
          />
        </div>
      )}

      {sections.map((section, index) => (
        <section
          key={section.label}
          className={styles.section}
          aria-label={section.label}
          data-reveal=""
        >
          <span className={`section-label ${styles.sectionLabel}`}>
            [{String(index + 1).padStart(2, "0")}] <span>{section.label}</span>
          </span>
          {section.content}
        </section>
      ))}

      {next && (
        <Link href={`/projects/${encodeURIComponent(next.slug)}`} className={styles.next}>
          <span className={styles.nextText}>
            <span className={styles.nextLabel}>
              next → /work/{String(((position + 1) % projects.length) + 1).padStart(2, "0")}
            </span>
            <span className={styles.nextTitle}>{next.title}</span>
          </span>
          <ArrowIcon size={48} />
        </Link>
      )}
    </div>
  );
}
