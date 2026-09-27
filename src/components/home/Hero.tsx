import { profile, profileText } from "../../content/profile";
import { getDictionary } from "../../i18n/dictionaries";
import type { Locale } from "../../i18n/locales";
import { FactList } from "../FactList";
import { TerminalTitle } from "../TerminalTitle";
import styles from "./Hero.module.css";
import { HeroNetwork } from "./HeroNetwork";
import { RotatingRole } from "./RotatingRole";

interface HeroProps {
  locale: Locale;
}

export function Hero({ locale }: HeroProps) {
  const text = profileText[locale];
  const dictionary = getDictionary(locale);

  return (
    <section id="top" className={styles.hero} aria-labelledby="hero-name">
      <HeroNetwork className={styles.network} />
      <div className={styles.shade} aria-hidden="true" />
      <div className={`container ${styles.inner}`}>
        <p className={styles.prompt}>
          <span className={styles.path}>
            ~/portfolio <span className={styles.dollar}>$</span>{" "}
            <span className={styles.command}>whoami</span>
            <span className={`caret ${styles.promptCaret}`} aria-hidden="true" />
          </span>
          <span className={styles.role}>
            → <RotatingRole roles={text.roles} />
          </span>
        </p>

        <div className={styles.bottom}>
          <TerminalTitle
            id="hero-name"
            lead={profile.firstName}
            last={profile.lastName}
            tag='h1 class="name"'
            className={styles.name}
          />

          <div className={styles.details}>
            <p className={styles.intro}>{text.intro}</p>
            <FactList facts={text.facts} className={styles.facts} />
            <div className={styles.actions}>
              <a href="#work" className="btn btn-primary">
                {dictionary.hero.viewWork}
              </a>
              <a href="#contact" className="btn btn-secondary">
                {dictionary.hero.contact}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
