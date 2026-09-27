import { getDictionary } from "../../i18n/dictionaries";
import type { Locale } from "../../i18n/locales";
import { formatPeriod } from "../../lib/period";
import type { Experience } from "../../types/experience";
import { MarkdownContent } from "../MarkdownContent";
import styles from "./ExperienceSection.module.css";
import section from "./Section.module.css";
import { SectionLabel } from "./SectionLabel";

interface ExperienceSectionProps {
  experiences: Experience[];
  locale: Locale;
}

export function ExperienceSection({ experiences, locale }: ExperienceSectionProps) {
  const text = getDictionary(locale).experience;
  const [titleFirst, titleSecond] = text.title;

  return (
    <section
      id="experience"
      className={`${section.section} ${styles.section}`}
      aria-labelledby="experience-title"
    >
      <div className={styles.intro} data-reveal="">
        <SectionLabel index="02" path="experience" />
        <h2 id="experience-title" className={styles.title} data-cursor="lens">
          {titleFirst}
          <br />
          {titleSecond}
        </h2>
        <code className={styles.command}>
          <span>$</span> git log --graph --career
        </code>
      </div>

      <ol className={styles.log}>
        {experiences.map((commit) => (
          <li
            key={commit.hash}
            className={`${styles.commit} ${styles[commit.node] ?? ""}`}
            data-reveal=""
          >
            <span className={styles.node} aria-hidden="true" />
            <span className={styles.meta}>
              <span>{commit.hash}</span>
              <span className={styles.period}>
                {formatPeriod(commit.start_year, commit.end_year, text.now)}
              </span>
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
              <span className={styles.organization}>
                {commit.organization}
                {commit.location !== null && (
                  <span className={styles.location}> · {commit.location}</span>
                )}
              </span>
              <div className={styles.text}>
                <MarkdownContent locale={locale}>{commit.summary}</MarkdownContent>
              </div>
              {commit.highlights.length > 0 && (
                <ul className={styles.highlights}>
                  {commit.highlights.map((highlight) => (
                    <li key={highlight}>
                      <MarkdownContent locale={locale} inline>
                        {highlight}
                      </MarkdownContent>
                    </li>
                  ))}
                </ul>
              )}
              {commit.tools.length > 0 && (
                <ul className={styles.tools} aria-label={text.tools}>
                  {commit.tools.map((tool) => (
                    <li key={tool} className="tag tag-neutral">
                      {tool}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
