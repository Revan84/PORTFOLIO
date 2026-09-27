import { experience, type RichText } from "../../content/experience";
import styles from "./ExperienceSection.module.css";
import section from "./Section.module.css";
import { SectionLabel } from "./SectionLabel";

function renderRichText(parts: RichText) {
  return parts.map((part) =>
    typeof part === "string" ? (
      part
    ) : (
      <a key={part.href} href={part.href}>
        {part.label}
      </a>
    ),
  );
}

export function ExperienceSection() {
  return (
    <section
      id="experience"
      className={`${section.section} ${styles.section}`}
      aria-labelledby="experience-title"
    >
      <div className={styles.intro}>
        <SectionLabel index="02" path="experience" />
        <h2 id="experience-title" className={styles.title}>
          Career,
          <br />
          as a commit log
        </h2>
        <code className={styles.command}>
          <span>$</span> git log --graph --career
        </code>
      </div>

      <ol className={styles.log}>
        {experience.map((commit) => (
          <li key={commit.hash} className={`${styles.commit} ${styles[commit.node] ?? ""}`}>
            <span className={styles.node} aria-hidden="true" />
            <span className={styles.meta}>
              <span>{commit.hash}</span>
              <span className={styles.period}>{commit.period}</span>
            </span>
            <div className={styles.body}>
              <div className={styles.titleRow}>
                <h3 className={styles.commitTitle}>{commit.title}</h3>
                <span
                  className={`tag ${commit.node === "head" ? "tag-outline" : "tag-neutral"} ${styles.ref}`}
                >
                  {commit.ref}
                </span>
              </div>
              <span className={styles.organization}>{commit.organization}</span>
              <p className={styles.text}>{renderRichText(commit.body)}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
