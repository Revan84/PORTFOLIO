import styles from "./Marquee.module.css";

interface MarqueeProps {
  items: readonly string[];
}

// The list is rendered twice so the band loops seamlessly; the copy is hidden from assistive tech.
export function Marquee({ items }: MarqueeProps) {
  const group = (hidden: boolean) => (
    <ul className={styles.group} aria-hidden={hidden || undefined}>
      {items.map((item, index) => (
        <li key={item} className={index % 2 === 1 ? styles.outline : undefined}>
          {item}
        </li>
      ))}
    </ul>
  );

  return (
    <section className={styles.band} aria-label="Technologies">
      <div className={styles.track}>
        {group(false)}
        {group(true)}
      </div>
    </section>
  );
}
