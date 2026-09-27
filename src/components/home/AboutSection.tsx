import { profileText } from "../../content/profile";
import { getDictionary } from "../../i18n/dictionaries";
import type { Locale } from "../../i18n/locales";
import styles from "./AboutSection.module.css";
import section from "./Section.module.css";
import { ScrollFill } from "./ScrollFill";
import { SectionLabel } from "./SectionLabel";

interface AboutSectionProps {
  locale: Locale;
}

export function AboutSection({ locale }: AboutSectionProps) {
  const text = profileText[locale];

  return (
    <section id="about" className={`${section.split} ${styles.section}`} aria-labelledby="about-title">
      <h2 id="about-title" className="visually-hidden">
        {getDictionary(locale).about.title}
      </h2>
      <SectionLabel index="00" path="about" className={section.labelOffset} />
      <div className={styles.content}>
        <ScrollFill className={styles.statement} lens>{text.about}</ScrollFill>
        <ol className={styles.milestones}>
          {text.milestones.map((milestone) => (
            <li key={milestone.period} className={styles.milestone} data-reveal="">
              <span className={`${styles.period} ${milestone.current ? styles.current : ""}`}>
                {milestone.period}
              </span>
              <span className={styles.label}>{milestone.label}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
