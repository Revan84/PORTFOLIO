"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALE_COOKIE, locales, localizePath, stripLocale, type Locale } from "../i18n/locales";
import styles from "./LanguageSwitch.module.css";

const ONE_YEAR_S = 60 * 60 * 24 * 365;

function rememberLocale(locale: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=${ONE_YEAR_S}; samesite=lax`;
}

interface LanguageSwitchProps {
  locale: Locale;
  label: string;
  // The link's accessible name, written in the other language.
  switchTo: string;
  className?: string;
}

// "EN | FR": the current language, and a link to the same page in the other one. The choice
// is kept in a cookie so the proxy stops sending the visitor back to the language their
// browser asks for.
export function LanguageSwitch({ locale, label, switchTo, className }: LanguageSwitchProps) {
  const pathname = usePathname();
  const path = stripLocale(pathname);

  return (
    <span role="group" aria-label={label} className={`${styles.switch} ${className ?? ""}`}>
      {locales.map((target, index) => (
        <span key={target} className={styles.item}>
          {index > 0 && (
            <span className={styles.separator} aria-hidden="true">
              |
            </span>
          )}
          {target === locale ? (
            <span className={styles.current} aria-current="true">
              {target.toUpperCase()}
            </span>
          ) : (
            // No prefetch: fetched before the click, the page would come back in the old
            // language, because the cookie is only written on the click.
            <Link
              href={localizePath(target, path)}
              prefetch={false}
              hrefLang={target}
              lang={target}
              aria-label={switchTo}
              className={styles.link}
              onClick={() => rememberLocale(target)}
            >
              {target.toUpperCase()}
            </Link>
          )}
        </span>
      ))}
    </span>
  );
}
