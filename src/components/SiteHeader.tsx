import Link from "next/link";
import { getDictionary } from "../i18n/dictionaries";
import { localizePath, type Locale } from "../i18n/locales";
import { CvLink } from "./CvLink";
import { LanguageSwitch } from "./LanguageSwitch";
import { NavClock } from "./NavClock";
import { ScrollProgress } from "./ScrollProgress";
import styles from "./SiteHeader.module.css";
import { SiteNav } from "./SiteNav";

interface SiteHeaderProps {
  locale: Locale;
}

export function SiteHeader({ locale }: SiteHeaderProps) {
  const dictionary = getDictionary(locale);
  const home = localizePath(locale, "/");

  return (
    <header className={styles.header}>
      <div className={`container ${styles.bar}`}>
        <Link href={home} className={styles.brand}>
          <span className={styles.monogram} aria-hidden="true">
            QE
          </span>
          <span>
            quentin.euillot<span className={styles.path}>/portfolio</span>
          </span>
        </Link>
        <SiteNav
          label={dictionary.nav.label}
          links={[
            { href: localizePath(locale, "/#work"), label: dictionary.nav.work },
            { href: localizePath(locale, "/#experience"), label: dictionary.nav.log },
            { href: localizePath(locale, "/#stack"), label: dictionary.nav.stack },
            { href: localizePath(locale, "/#contact"), label: dictionary.nav.contact },
            { href: localizePath(locale, "/articles"), label: dictionary.nav.writing },
          ]}
        />
        <span className={styles.status}>
          <span className={styles.pulse} aria-hidden="true" />
          <NavClock className={styles.clock} />
        </span>
        <LanguageSwitch
          locale={locale}
          label={dictionary.languageSwitch.label}
          switchTo={dictionary.languageSwitch.switchTo}
          className={styles.language}
        />
        <CvLink className={styles.cv} />
      </div>
      <ScrollProgress className={styles.progress} />
    </header>
  );
}
