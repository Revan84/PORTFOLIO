# Portfolio

Portfolio de Quentin Euillot, développeur full-stack, publié sur [quentin-euillot.com](https://quentin-euillot.com). Next.js (App Router), React et TypeScript. Les articles, les projets, le parcours et la stack viennent de Supabase par l'API REST, et chaque réponse est validée par Zod avant d'atteindre les composants.

Le projet a d'abord été construit avec React et Vite (TP 04), puis migré vers Next.js dans le même dépôt. L'interface suit ensuite la maquette « Portfolio v2 » réalisée sur Claude Design, avec le design system Nocturne en variante verte.

## Paliers traités (TP 04)

- **Palier 1** : liste des articles publiés, recherche par titre (insensible à la casse), états chargement, erreur, liste vide et liste remplie.
- **Palier 2** : détail d'un article en Markdown (`react-markdown`, jamais `dangerouslySetInnerHTML`), pagination par 6 avec le total lu dans `Content-Range`.
- **Palier 3** : projets avec leurs compétences (relation `skills(name)`), texte « À propos », cache des requêtes, carte client et serveur.
- **Migration Next.js** : pages rendues côté serveur, recherche et pagination dans l'URL.

## Installation

Copiez `.env.example` vers `.env.local`, puis renseignez les valeurs de Supabase > Connect :

```
SUPABASE_URL=https://<PROJECT_REF>.supabase.co
SUPABASE_PUBLISHABLE_KEY=sb_publishable_<KEY>
```

Les variables n'ont pas le préfixe `NEXT_PUBLIC_` : elles ne sont lues que sur le serveur et n'apparaissent jamais dans le JavaScript envoyé au navigateur. N'utilisez que la clé `sb_publishable_...`. `src/services/supabase.ts` refuse une clé `sb_secret_...` au démarrage, puisqu'elle contourne RLS.

```bash
npm install
npm run dev     # serveur de développement sur http://localhost:3000
npm test        # tests Vitest
npm run lint    # ESLint (eslint-config-next)
npm run build   # build de production, avec vérification TypeScript
npm start       # sert le build de production
```

**CV.** Déposez le fichier dans `public/cv.pdf` : le bouton `cv.pdf ↓` de l'en-tête apparaît au build suivant (`next.config.ts` vérifie la présence du fichier au moment du build).

## Déploiement

- **Vercel** héberge le site : chaque push sur `main` déploie la production, chaque autre branche une préversion. Variables à définir dans le projet Vercel : `SUPABASE_URL` et `SUPABASE_PUBLISHABLE_KEY`.
- **o2switch** garde le nom de domaine `quentin-euillot.com` : la zone DNS (cPanel > Zone Editor) pointe vers Vercel avec les enregistrements indiqués par Vercel.
- **GitHub Actions** : `.github/workflows/supabase-keepalive.yml` lit une ligne dans Supabase chaque jour, pour que le projet gratuit ne soit pas mis en pause après 7 jours d'inactivité. Secrets du dépôt à définir : `SUPABASE_URL` et `SUPABASE_PUBLISHABLE_KEY`.

## Routes

| Route | Contenu |
|---|---|
| `/` | accueil : hero, about, work, experience, stack, references, contact |
| `/projects/[slug]` | étude de cas d'un projet, « Project not found » si le slug n'existe pas |
| `/articles` | articles publiés ; `?q=` filtre par titre, `?page=` choisit la page |
| `/articles/[slug]` | détail d'un article, « Article not found » si le slug n'existe pas ou désigne un brouillon |
| `/about`, `/projects` | redirigées vers `/#about` et `/#work` |
| `/sitemap.xml`, `/robots.txt`, `/opengraph-image` | générés : toutes les pages publiées, et l'image des aperçus de partage |

`loading.tsx` affiche l'état de chargement, `error.tsx` l'état d'erreur (`role="alert"`). La recherche est un formulaire GET (`next/form`) : elle fonctionne sans JavaScript et, comme elle n'envoie que `q`, une nouvelle recherche revient en page 1. Une page au-delà de la dernière (`/articles?page=99`) redirige vers la dernière page au lieu de laisser Supabase répondre 416.

## Architecture

```
Supabase (RLS)
  -> src/services/    construit l'URL, appelle fetch, valide avec Zod (sans React)
  -> src/app/         routes Next.js : chaque page appelle les services avec await
  -> src/components/  reçoivent des données déjà validées en props
src/content/          contenu absent de la base : profil, références, études de cas
```

Les types viennent des schémas Zod de `src/types/` (`z.infer`), y compris les paramètres d'URL (`articlesSearchSchema`). `process.env` n'est lu que dans `src/services/supabase.ts`.

**Modifier le contenu.** Les articles, les projets, le parcours (`experiences`) et la stack (`stack_layers` et `skills`) se gèrent dans Supabase. Le reste se modifie dans `src/content/` sans toucher aux composants :

| Fichier | Contenu |
|---|---|
| `profile.ts` | nom, rôles, présentation, faits, e-mail, liens, soft skills, réponses du terminal `ping`, lecteur de musique |
| `references.ts` | les citations ; une citation `draft: true` n'est pas publiée, et la section reste masquée tant qu'elles le sont toutes |
| `caseStudies.ts` | par slug de projet : accroche, fiche, architecture, résultats |
| `site.ts` | domaine, titre, description, chemin du CV |

## Base Supabase

| Table | Contenu | Lecture publique |
|---|---|---|
| `articles` | articles du blog, en Markdown | si `published_at` est rempli |
| `projects` | projets et études de cas | si `published_at` est rempli |
| `skills` | compétences, rattachées à une couche de la stack (`layer_id`, `position`) | toutes |
| `project_skills` | liaisons projet ↔ compétence | si le projet est publié |
| `stack_layers` | les six couches de la stack, dans l'ordre d'affichage | toutes |
| `experiences` | le parcours, affiché comme un `git log` (`node` : `head`, `commit`, `branch`, `root`) | si `published_at` est rempli |

Les changements de structure sont dans `supabase/migrations/`, le contenu en anglais dans `supabase/seed/`.

## Cache

Chaque `fetch` vers Supabase passe `next: { revalidate: 300 }` (`src/services/http.ts`).

- **Clé** : Next.js met en cache chaque réponse selon l'URL complète de la requête, donc selon la table, les colonnes, le filtre `title`, `limit` et `offset`. Deux visiteurs qui demandent la même recherche à la même page partagent la même entrée.
- **Invalidation** : une réponse est réutilisée pendant 5 minutes, puis Next.js la redemande en arrière-plan. Le contenu change rarement et se publie depuis le tableau de bord Supabase, donc 5 minutes de retard au pire restent acceptables.
- **Pourquoi un cache partagé est sans risque** : toutes les requêtes utilisent la même clé publishable et RLS ne renvoie que du contenu publié. La réponse est la même pour tous les visiteurs.

L'accueil et le sitemap sont générés au build puis régénérés toutes les 5 minutes. `/articles` et les pages de détail dépendent de l'URL et sont rendues à la demande, avec les réponses Supabase en cache.

## Effets et accessibilité

Les effets de la maquette sont de petits composants client isolés : horloge et barre de progression de l'en-tête, fond en réseau du hero (canvas), rôles qui défilent, nom qui se « décode », texte about qui se remplit au défilement, pile 3D de la stack, terminal `ping`, uptime du pied de page, écran de démarrage.

- Avec « réduire les animations » activé dans le système, rien ne bouge et l'écran de démarrage ne s'affiche pas.
- L'écran de démarrage s'affiche une fois par session. Un script en ligne, exécuté avant le premier affichage, décide s'il faut l'afficher ; sans JavaScript, il ne s'affiche jamais. Un clic ou une touche le passe.
- L'apparition des sections au défilement est en CSS pur (`animation-timeline: view()`) ; les navigateurs qui ne la gèrent pas affichent les sections sans animation.
- Le canvas se met en pause quand le hero sort de l'écran ou que l'onglet est caché.
- Les lecteurs d'écran lisent le vrai nom et la liste des rôles, jamais les caractères animés. Un lien « Skip to content » est le premier arrêt au clavier.

## Carte client et serveur

Le critère est la présence de `useState`, `useEffect`, d'un hook de Next.js ou d'un gestionnaire d'événement défini dans le composant.

| Composant | Classement | Justification |
|---|---|---|
| pages de `src/app/` | serveur | `async`, elles appellent les services avec `await` |
| `SiteHeader`, `SiteFooter`, `CvLink` | serveur | affichage ; `CvLink` vérifie sur le disque que `public/cv.pdf` existe |
| `Hero`, `AboutSection`, `WorkSection`, `ExperienceSection`, `StackSection`, `ReferencesSection`, `ContactSection` | serveur | assemblent le contenu et délèguent les effets à des composants client |
| `TerminalTitle`, `FactList`, `ArchitectureDiagram`, `ArrowIcon`, `Marquee` | serveur | affichage pur de leurs props ; le bandeau défile en CSS |
| `ArticleCover`, `ArticleCard`, `ArticleList` | serveur | ni hook, ni gestionnaire ; « read → » est un `<Link>` |
| `SearchForm` | serveur | formulaire GET `next/form` non contrôlé (`defaultValue`) : ni `useState`, ni `onSubmit` |
| `Pagination` | serveur | deux `<Link>` calculés depuis la page et le total, sans `onClick` |
| `SiteNav` | client | `usePathname` pour marquer l'entrée courante avec `aria-current` |
| `NavClock`, `Uptime`, `ScrollProgress` | client | `useEffect` : un timer ou l'écoute du défilement |
| `HeroNetwork` | client | `useEffect` : boucle d'animation du canvas, écoute de la souris |
| `RotatingRole`, `ScrambleText` | client | `useState` et `useEffect` : timers d'animation ; `onMouseEnter` pour re-brouiller une lettre |
| `ScrollFill` | client | `useEffect` : écoute du défilement |
| `StackExplorer` | client | `useState` pour la couche active, `onMouseEnter` et `onClick` |
| `PingTerminal` | client | `useState` pour les lignes affichées, `onClick` sur « run » |
| `BootScreen` | client | `useState` et `useEffect` : compteur, phases, touche pour passer |
| `error.tsx` | client | exigé par Next.js ; gestionnaire `onClick` sur « Try again » |

Dans la version Vite, `SearchForm`, `Pagination`, `ArticleCard` et `App` étaient client à cause de `useState` et des `onClick`. Les liens et le formulaire GET les rendent serveur.
