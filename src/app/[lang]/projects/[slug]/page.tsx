import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { ArchitectureDiagram } from "../../../../components/ArchitectureDiagram";
import { ArrowIcon } from "../../../../components/ArrowIcon";
import { ExternalLink } from "../../../../components/ExternalLink";
import { FactList, type Fact } from "../../../../components/FactList";
import { MarkdownContent } from "../../../../components/MarkdownContent";
import { splitTitle, TerminalTitle } from "../../../../components/TerminalTitle";
import { caseStudies } from "../../../../content/caseStudies";
import { getDictionary } from "../../../../i18n/dictionaries";
import { isLocale, localizePath, type Locale } from "../../../../i18n/locales";
import { pageMetadata } from "../../../../lib/metadata";
import { fetchProjectBySlug, fetchProjects } from "../../../../services/projects";
import type { ProjectDetail } from "../../../../types/project";
import styles from "./case.module.css";

// Published projects are built ahead and refreshed every 5 minutes; a slug added later is
// rendered on its first visit. Without streaming, an unknown slug answers a real 404.
export const revalidate = 300;

// Built for each language of the layout; the slugs are the same in both.
export async function generateStaticParams() {
  const projects = await fetchProjects("en");
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata(props: PageProps<"/[lang]/projects/[slug]">): Promise<Metadata> {
  const { lang, slug } = await props.params;
  if (!isLocale(lang)) return {};
  const project = await fetchProjectBySlug(slug, lang);
  if (project === null) return {};
  return pageMetadata({
    locale: lang,
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

function linkFacts(project: ProjectDetail, locale: Locale): Fact[] {
  const facts: Fact[] = [];
  if (project.demo_url !== null) {
    facts.push({
      label: "LIVE",
      value: (
        <ExternalLink href={project.demo_url} locale={locale}>
          {new URL(project.demo_url).host}
        </ExternalLink>
      ),
    });
  }
  if (project.repo_url !== null) {
    facts.push({
      label: "CODE",
      value: (
        <ExternalLink href={project.repo_url} locale={locale}>
          {new URL(project.repo_url).pathname.slice(1)}
        </ExternalLink>
      ),
    });
  }
  return facts;
}

export default async function ProjectPage(props: PageProps<"/[lang]/projects/[slug]">) {
  const { lang, slug } = await props.params;
  if (!isLocale(lang)) notFound();
  const [project, projects] = await Promise.all([fetchProjectBySlug(slug, lang), fetchProjects(lang)]);
  if (project === null) notFound();

  const text = getDictionary(lang).project;
  const caseStudy = caseStudies[lang][project.slug] ?? {};
  const position = projects.findIndex((item) => item.slug === project.slug);
  const next = projects.length > 1 ? projects[(position + 1) % projects.length] : undefined;
  const facts = [...(caseStudy.facts ?? defaultFacts(project)), ...linkFacts(project, lang)];

  const sections: { label: string; content: ReactNode }[] = [];
  if (project.description !== null) {
    sections.push({
      label: text.context,
      content: (
        <div className={styles.prose}>
          <MarkdownContent locale={lang}>{project.description}</MarkdownContent>
        </div>
      ),
    });
  }
  if (caseStudy.architecture) {
    sections.push({
      label: text.architecture,
      content: <ArchitectureDiagram architecture={caseStudy.architecture} />,
    });
  }
  if (caseStudy.outcomes && caseStudy.outcomes.length > 0) {
    sections.push({
      label: text.outcome,
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
        <Link href={localizePath(lang, "/#work")} className={styles.back}>
          cd ../work
        </Link>
        <span className="section-label">
          /work/{String(position + 1).padStart(2, "0")} · {text.caseStudy}
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
        <Link
          href={localizePath(lang, `/projects/${encodeURIComponent(next.slug)}`)}
          className={styles.next}
        >
          <span className={styles.nextText}>
            <span className={styles.nextLabel}>
              {text.next} → /work/{String(((position + 1) % projects.length) + 1).padStart(2, "0")}
            </span>
            <span className={styles.nextTitle}>{next.title}</span>
          </span>
          <ArrowIcon size={48} />
        </Link>
      )}
    </div>
  );
}
