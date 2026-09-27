import type { Locale } from "../i18n/locales";

export const site = {
  url: "https://quentin-euillot.com",
  name: "Quentin Euillot",
  // Served from public/; the header button appears from the next build (see next.config.ts).
  cvPath: "/cv.pdf",
} as const;

export const siteText: Record<Locale, { title: string; description: string; jobTitle: string }> = {
  en: {
    title: "Quentin Euillot · Full-stack developer",
    description:
      "Quentin Euillot, full-stack developer in Montpellier, France. I build web and mobile products end to end: the interface, the API, and the servers underneath.",
    jobTitle: "Full-stack developer",
  },
  fr: {
    title: "Quentin Euillot · Développeur full-stack",
    description:
      "Quentin Euillot, développeur full-stack à Montpellier. Je conçois des produits web et mobiles de bout en bout : l'interface, l'API et les serveurs en dessous.",
    jobTitle: "Développeur full-stack",
  },
};
