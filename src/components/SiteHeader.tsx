import Link from "next/link";
import { NavClock } from "./NavClock";
import { ScrollProgress } from "./ScrollProgress";
import styles from "./SiteHeader.module.css";
import { SiteNav } from "./SiteNav";

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.bar}`}>
        <Link href="/" className={styles.brand}>
          <span className={styles.monogram} aria-hidden="true">
            QE
          </span>
          <span>
            quentin.euillot<span className={styles.path}>/portfolio</span>
          </span>
        </Link>
        <SiteNav />
        <span className={styles.status}>
          <span className={styles.pulse} aria-hidden="true" />
          <NavClock className={styles.clock} />
        </span>
      </div>
      <ScrollProgress className={styles.progress} />
    </header>
  );
}
