import { profile } from "../../content/profile";
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
          <svg width="22" height="22" viewBox="0 0 256 256" fill="var(--color-accent)" aria-hidden="true">
            <path d="M200,64V168a8,8,0,0,1-16,0V83.31L69.66,197.66a8,8,0,0,1-11.32-11.32L172.69,72H88a8,8,0,0,1,0-16H192A8,8,0,0,1,200,64Z" />
          </svg>
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
