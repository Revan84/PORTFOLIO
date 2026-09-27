"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./SiteNav.module.css";

const LINKS = [
  { href: "/#work", label: "work" },
  { href: "/#experience", label: "log" },
  { href: "/#stack", label: "stack" },
  { href: "/#contact", label: "contact" },
  { href: "/articles", label: "writing" },
];

export function SiteNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Main" className={styles.nav}>
      <ul className={styles.list}>
        {LINKS.map((link, index) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={styles.link}
              aria-current={pathname.startsWith(link.href) ? "page" : undefined}
            >
              <span className={styles.index}>{String(index + 1).padStart(2, "0")}</span>{" "}
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
