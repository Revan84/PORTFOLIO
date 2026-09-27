import type { Locale } from "../i18n/locales";

export const profile = {
  firstName: "Quentin",
  lastName: "Euillot",
  email: "ellt.quentin@gmail.com",
  // A link without an href is not rendered.
  links: [
    { label: "github", href: "https://github.com/Revan84" },
    { label: "linkedin", href: "https://www.linkedin.com/in/quentin-euillot-9b90a7167/" },
  ],
  // Start of the footer "uptime": the first day in production.
  uptimeSince: "2021-09-01T09:00:00+02:00",
  marquee: ["React", "Flutter", "Symfony", "Go · Gin", "MQTT", "Next.js", "Docker", "Node · Nest"],
} as const;

interface ProfileText {
  roles: readonly string[];
  intro: string;
  facts: readonly { label: string; value: string; highlight?: boolean }[];
  about: string;
  milestones: readonly { period: string; label: string; current?: boolean }[];
  pingReplies: readonly string[];
  softSkills: readonly string[];
}

// What the visitor reads about me, in each language.
export const profileText: Record<Locale, ProfileText> = {
  en: {
    roles: [
      "Full-stack developer",
      "Systems & network architect",
      "Web designer",
      "Music artist, off-screen",
    ],
    intro:
      "I build web and mobile products end to end: the interface, the API, and the servers underneath. Former avionics technician, now full-stack.",
    facts: [
      { label: "LOC", value: "43.61°N 3.88°E · Montpellier" },
      { label: "STATUS", value: "open to full-stack roles", highlight: true },
      { label: "LANG", value: "FR · EN C1" },
    ],
    about:
      "I started out maintaining aircraft and studying avionics. Now I build software with the same rule: every system should be reliable, documented, and easy to hand over.",
    milestones: [
      { period: "2016 → 2019", label: "Aircraft maintenance & avionics" },
      { period: "2020 → 2023", label: "Bac +3 Web Developer" },
      { period: "2021 → now", label: "Full-stack in production", current: true },
    ],
    pingReplies: [
      "PING quentin.euillot (Montpellier, FR)",
      "reply from ellt.quentin@gmail.com  status=open-to-work",
      "reply from github  repos=public",
      "--- 1 host up, 0% packet loss ---",
    ],
    softSkills: ["curious", "versatile", "autonomous", "adaptable", "team player"],
  },
  fr: {
    roles: [
      "Développeur full-stack",
      "Architecte systèmes & réseaux",
      "Web designer",
      "Artiste musical, hors écran",
    ],
    intro:
      "Je conçois des produits web et mobiles de bout en bout : l'interface, l'API et les serveurs en dessous. Ancien technicien avionique, aujourd'hui full-stack.",
    facts: [
      { label: "LOC", value: "43.61°N 3.88°E · Montpellier" },
      { label: "STATUT", value: "ouvert aux postes full-stack", highlight: true },
      { label: "LANGUES", value: "FR · EN C1" },
    ],
    about:
      "J'ai commencé par la maintenance d'avions et l'avionique. Aujourd'hui je construis du logiciel avec la même règle : chaque système doit être fiable, documenté et facile à transmettre.",
    milestones: [
      { period: "2016 → 2019", label: "Maintenance aéronautique & avionique" },
      { period: "2020 → 2023", label: "Bac +3 Développeur Web" },
      { period: "2021 → auj.", label: "Full-stack en production", current: true },
    ],
    pingReplies: [
      "PING quentin.euillot (Montpellier, FR)",
      "reply from ellt.quentin@gmail.com  status=open-to-work",
      "reply from github  repos=public",
      "--- 1 host up, 0% packet loss ---",
    ],
    softSkills: ["curieux", "polyvalent", "autonome", "adaptable", "esprit d'équipe"],
  },
};
