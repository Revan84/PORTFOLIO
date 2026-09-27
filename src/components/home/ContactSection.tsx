import { profile } from "../../content/profile";
import { ArrowIcon } from "../ArrowIcon";
import styles from "./ContactSection.module.css";
import { SectionLabel } from "./SectionLabel";

export function ContactSection() {
  const links = profile.links.filter((link) => link.href !== null);

  return (
    <section id="contact" className={styles.section} aria-labelledby="contact-title">
      <div className={styles.lead}>
        <SectionLabel index="05" path="contact" />
        <h2 id="contact-title" className={styles.title}>
          <span>Let&apos;s</span> <span className={styles.outline}>connect.</span>
        </h2>
        <a href={`mailto:${profile.email}`} className={styles.email}>
          {profile.email}
          <ArrowIcon size={22} />
        </a>
      </div>

      <div className={styles.terminal}>
        <div className={styles.titleBar} aria-hidden="true">
          <span className={styles.light} />
          <span className={styles.light} />
          <span className={styles.light} />
          <span className={styles.windowTitle}>zsh — quentin@montpellier</span>
        </div>
        <div className={styles.screen}>
          <span>
            <span className={styles.dollar}>$</span> ping quentin
            <span className={`caret ${styles.terminalCaret}`} aria-hidden="true" />
          </span>
          <div className={styles.actions}>
            {links.map((link) => (
              <a key={link.label} href={link.href ?? undefined} className="btn btn-secondary">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
