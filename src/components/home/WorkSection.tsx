import Link from "next/link";
import type { Project } from "../../types/project";
import { ArrowIcon } from "../ArrowIcon";
import section from "./Section.module.css";
import { SectionLabel } from "./SectionLabel";
import styles from "./WorkSection.module.css";

const MAX_TAGS = 4;

interface WorkSectionProps {
  projects: Project[];
}

export function WorkSection({ projects }: WorkSectionProps) {
  return (
    <section id="work" className={section.section} aria-labelledby="work-title">
      <div className={styles.header} data-reveal="">
        <div className={styles.heading}>
          <SectionLabel index="01" path="work" />
          <h2 id="work-title" className={styles.title}>
            Selected work
          </h2>
        </div>
        <span className={styles.hint}>click to open the case study</span>
      </div>

      {projects.length === 0 ? (
        <p className={styles.empty}>No published project yet.</p>
      ) : (
        <ol className={styles.list}>
          {projects.map((project, index) => (
            <li key={project.id} data-reveal="">
              <Link href={`/projects/${encodeURIComponent(project.slug)}`} className={styles.row}>
                <span className={styles.index}>/{String(index + 1).padStart(2, "0")}</span>
                <span className={styles.text}>
                  <span className={styles.name}>{project.title}</span>
                  <span className={styles.summary}>{project.summary}</span>
                </span>
                <span className={styles.tags}>
                  {project.skills.slice(0, MAX_TAGS).map((skill, skillIndex) => (
                    <span
                      key={skill.name}
                      className={`tag ${skillIndex === 0 ? "tag-accent" : "tag-neutral"}`}
                    >
                      {skill.name}
                    </span>
                  ))}
                </span>
                <ArrowIcon size={32} />
              </Link>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
