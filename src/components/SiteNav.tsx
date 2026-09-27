"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./SiteNav.module.css";

interface SiteNavProps {
  label: string;
  links: { href: string; label: string }[];
}

export function SiteNav({ label, links }: SiteNavProps) {
  const pathname = usePathname();

  return (
    <nav aria-label={label} className={styles.nav}>
      <ul className={styles.list}>
        {links.map((link, index) => (
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
