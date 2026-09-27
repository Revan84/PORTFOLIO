import { profile } from "../content/profile";
import styles from "./SiteFooter.module.css";
import { Uptime } from "./Uptime";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.bar}`}>
        <span className={styles.status}>
          <span className={styles.dot} aria-hidden="true" />
          all systems operational
        </span>
        <Uptime since={profile.uptimeSince} className={styles.uptime} />
        <span>43.61°N 3.88°E</span>
        <span className={styles.copyright}>© {new Date().getFullYear()} Quentin Euillot</span>
      </div>
    </footer>
  );
}
