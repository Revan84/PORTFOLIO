import { profile } from "../../content/profile";
import { FactList } from "../FactList";
import { TerminalTitle } from "../TerminalTitle";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section id="top" className={styles.hero} aria-labelledby="hero-name">
      <div className={styles.shade} aria-hidden="true" />
      <div className={`container ${styles.inner}`}>
        <p className={styles.prompt}>
          <span className={styles.path}>
            ~/portfolio <span className={styles.dollar}>$</span>{" "}
            <span className={styles.command}>whoami</span>
            <span className={`caret ${styles.promptCaret}`} aria-hidden="true" />
          </span>
          <span className={styles.role}>→ {profile.roles[0]}</span>
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
            <p className={styles.intro}>{profile.intro}</p>
            <FactList facts={profile.facts} className={styles.facts} />
            <div className={styles.actions}>
              <a href="#work" className="btn btn-primary">
                View work
              </a>
              <a href="#contact" className="btn btn-secondary">
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
