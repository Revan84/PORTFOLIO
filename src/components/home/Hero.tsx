import { profile } from "../../content/profile";
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
          <h1 id="hero-name" className={styles.name}>
            <span className={styles.tag} aria-hidden="true">
              {'<h1 class="name">'}
            </span>
            <span className={`${styles.line} ${styles.word}`}>{profile.firstName}</span>{" "}
            <span className={styles.line}>
              <span className={`${styles.word} ${styles.fade}`}>{profile.lastName}</span>
              <span className={`caret ${styles.nameCaret}`} aria-hidden="true" />
              <span className={`${styles.tag} ${styles.closingTag}`} aria-hidden="true">
                {"</h1>"}
              </span>
            </span>
          </h1>

          <div className={styles.details}>
            <p className={styles.intro}>{profile.intro}</p>
            <dl className={styles.facts}>
              {profile.facts.map((fact) => (
                <div key={fact.label} className={styles.fact}>
                  <dt>{fact.label}</dt>
                  <dd className={"highlight" in fact ? styles.highlight : undefined}>
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
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
