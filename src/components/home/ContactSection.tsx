import { profile, profileText } from "../../content/profile";
import { getDictionary } from "../../i18n/dictionaries";
import type { Locale } from "../../i18n/locales";
import { ArrowIcon } from "../ArrowIcon";
import styles from "./ContactSection.module.css";
import { PingTerminal } from "./PingTerminal";
import { SectionLabel } from "./SectionLabel";

interface ContactSectionProps {
  locale: Locale;
}

export function ContactSection({ locale }: ContactSectionProps) {
  const [first, second] = getDictionary(locale).contact.title;
  const links = profile.links.flatMap((link) =>
    link.href === null ? [] : [{ label: link.label, href: link.href }],
  );

  return (
    <section id="contact" className={styles.section} aria-labelledby="contact-title">
      <div className={styles.lead} data-reveal="">
        <SectionLabel index="05" path="contact" />
        <h2 id="contact-title" className={styles.title} data-cursor="lens">
          <span>{first}</span> <span className={styles.outline}>{second}</span>
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
        <PingTerminal replies={profileText[locale].pingReplies} links={links} locale={locale} />
      </div>
    </section>
  );
}
