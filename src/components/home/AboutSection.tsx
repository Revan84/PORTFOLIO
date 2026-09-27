import { profile } from "../../content/profile";
import styles from "./AboutSection.module.css";
import section from "./Section.module.css";
import { ScrollFill } from "./ScrollFill";
import { SectionLabel } from "./SectionLabel";

export function AboutSection() {
  return (
    <section id="about" className={`${section.split} ${styles.section}`} aria-labelledby="about-title">
      <h2 id="about-title" className="visually-hidden">
        About
      </h2>
      <SectionLabel index="00" path="about" className={section.labelOffset} />
      <div className={styles.content}>
        <ScrollFill className={styles.statement}>{profile.about}</ScrollFill>
        <ol className={styles.milestones}>
          {profile.milestones.map((milestone) => (
            <li key={milestone.period} className={styles.milestone} data-reveal="">
              <span
                className={`${styles.period} ${"current" in milestone ? styles.current : ""}`}
              >
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
