import { profile } from "../content/profile";
import { getDictionary } from "../i18n/dictionaries";
import type { Locale } from "../i18n/locales";
import styles from "./SiteFooter.module.css";
import { Uptime } from "./Uptime";

interface SiteFooterProps {
  locale: Locale;
}

export function SiteFooter({ locale }: SiteFooterProps) {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.bar}`}>
        <span className={styles.status}>
          <span className={styles.dot} aria-hidden="true" />
          {getDictionary(locale).footer.status}
        </span>
        <Uptime since={profile.uptimeSince} className={styles.uptime} />
        <span>43.61°N 3.88°E</span>
        <span className={styles.copyright}>© {new Date().getFullYear()} Quentin Euillot</span>
      </div>
    </footer>
  );
}
