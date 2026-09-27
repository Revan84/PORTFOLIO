import type { Locale } from "./locales";

// Interface texts. Terminal decoration (paths such as /work, commands, "cd ../writing")
// stays the same in both languages; what a visitor reads as a sentence is translated.
const en = {
  skipLink: "Skip to content",
  nav: {
    label: "Main",
    work: "work",
    log: "log",
    stack: "stack",
    contact: "contact",
    writing: "writing",
  },
  languageSwitch: { label: "Language", switchTo: "Voir le site en français" },
  footer: { status: "all systems operational" },
  boot: { caption: "Full-stack developer · Systems & network architect" },
  hero: { viewWork: "View work", contact: "Contact" },
  about: { title: "About" },
  work: {
    title: "Selected work",
    hint: "click to open the case study",
    empty: "No published project yet.",
  },
  experience: { title: ["Career,", "as a commit log"], tools: "Tools", now: "now" },
  stack: { title: "The stack, top to bottom", softSkills: "Soft skills" },
  references: { title: "References" },
  contact: { title: ["Let's", "connect."] },
  articles: {
    title: "Writing",
    description: "Notes from the build: articles on web, mobile and self-hosted projects.",
    heading: "Notes from the build",
    empty: "No article matches this search.",
    searchPlaceholder: "Search articles",
    search: "Search",
    read: "read →",
    readLabel: "Read the article:",
    previous: "← Previous page",
    next: "Next page →",
    pagination: "Pagination",
  },
  project: {
    caseStudy: "case study",
    context: "context",
    architecture: "architecture",
    outcome: "outcome",
    next: "next",
  },
  notFound: {
    page: "This page does not exist",
    article: "Article not found",
    project: "Project not found",
    home: "Back home",
    writing: "Back to writing",
    work: "Back to work",
  },
};

export type Dictionary = typeof en;

const fr: Dictionary = {
  skipLink: "Aller au contenu",
  nav: {
    label: "Principale",
    work: "projets",
    log: "parcours",
    stack: "stack",
    contact: "contact",
    writing: "articles",
  },
  languageSwitch: { label: "Langue", switchTo: "View the site in English" },
  footer: { status: "tous les systèmes opérationnels" },
  boot: { caption: "Développeur full-stack · Architecte systèmes & réseaux" },
  hero: { viewWork: "Voir les projets", contact: "Contact" },
  about: { title: "À propos" },
  work: {
    title: "Projets choisis",
    hint: "cliquez pour ouvrir l'étude de cas",
    empty: "Aucun projet publié pour l'instant.",
  },
  experience: { title: ["Le parcours,", "en log de commits"], tools: "Outils", now: "auj." },
  stack: { title: "La stack, de haut en bas", softSkills: "Savoir-être" },
  references: { title: "Références" },
  contact: { title: ["Restons", "connectés."] },
  articles: {
    title: "Articles",
    description: "Carnet de chantier : des articles sur le web, le mobile et l'auto-hébergement.",
    heading: "Carnet de chantier",
    empty: "Aucun article ne correspond à cette recherche.",
    searchPlaceholder: "Rechercher un article",
    search: "Rechercher",
    read: "lire →",
    readLabel: "Lire l'article :",
    previous: "← Page précédente",
    next: "Page suivante →",
    pagination: "Pagination",
  },
  project: {
    caseStudy: "étude de cas",
    context: "contexte",
    architecture: "architecture",
    outcome: "résultats",
    next: "suivant",
  },
  notFound: {
    page: "Cette page n'existe pas",
    article: "Article introuvable",
    project: "Projet introuvable",
    home: "Retour à l'accueil",
    writing: "Retour aux articles",
    work: "Retour aux projets",
  },
};

const dictionaries: Record<Locale, Dictionary> = { en, fr };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
