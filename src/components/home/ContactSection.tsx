import { profile } from "../../content/profile";
import { ArrowIcon } from "../ArrowIcon";
import styles from "./ContactSection.module.css";
import { PingTerminal } from "./PingTerminal";
import { SectionLabel } from "./SectionLabel";

export function ContactSection() {
  const links = profile.links.flatMap((link) =>
    link.href === null ? [] : [{ label: link.label, href: link.href }],
  );

  return (
    <section id="contact" className={styles.section} aria-labelledby="contact-title">
      <div className={styles.lead} data-reveal="">
        <SectionLabel index="05" path="contact" />
        <h2 id="contact-title" className={styles.title} data-cursor="lens">
          <span>Let&apos;s</span> <span className={styles.outline}>connect.</span>
        </h2>
        <a href={`mailto:${profile.email}`} className={styles.email}>
          {profile.email}
          <ArrowIcon size={22} />
        </a>
      </div>

      <div className={styles.terminal} data-reveal="">
        <div className={styles.titleBar} aria-hidden="true">
          <span className={styles.light} />
          <span className={styles.light} />
          <span className={styles.light} />
          <span className={styles.windowTitle}>zsh — quentin@montpellier</span>
        </div>
        <PingTerminal replies={profile.pingReplies} links={links} />
      </div>
    </section>
  );
}
