# Portfolio

Portfolio personnel en Next.js (App Router), React et TypeScript. Il lit les articles, les projets et les pages publiés dans Supabase par l'API REST. Chaque réponse est validée par Zod avant d'atteindre les composants.

Le projet a d'abord été construit avec React et Vite (TP 04), puis migré vers Next.js dans le même dépôt.

## Paliers traités

- **Palier 1** : liste des articles publiés, recherche par titre (insensible à la casse), états chargement, erreur, liste vide et liste remplie.
- **Palier 2** : détail d'un article en Markdown (`react-markdown`, jamais `dangerouslySetInnerHTML`), pagination par 6 avec le total lu dans `Content-Range`.
- **Palier 3** : projets avec leurs compétences (relation `skills(name)`), page « À propos », cache des requêtes, carte client et serveur.
- **Migration Next.js** : pages rendues côté serveur, recherche et pagination dans l'URL, deux composants client seulement.

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

## Routes

| Route | Contenu |
|---|---|
| `/` | articles publiés ; `?q=` filtre par titre, `?page=` choisit la page |
| `/articles/[slug]` | détail d'un article, « Article introuvable » si le slug n'existe pas ou désigne un brouillon |
| `/projects` | projets publiés et leurs compétences |
| `/about` | page `about` de la table `pages` |

`loading.tsx` affiche l'état de chargement, `error.tsx` l'état d'erreur (`role="alert"`). La recherche est un formulaire GET (`next/form`) : elle fonctionne sans JavaScript et, comme elle n'envoie que `q`, une nouvelle recherche revient en page 1. Une page au-delà de la dernière (`/?page=99`) redirige vers la dernière page au lieu de laisser Supabase répondre 416.

## Architecture

```
Supabase (RLS)
  -> src/services/    construit l'URL, appelle fetch, valide avec Zod (sans React)
  -> src/app/         routes Next.js : chaque page appelle les services avec await
  -> src/components/  reçoivent des données déjà validées en props
```

Les types viennent des schémas Zod de `src/types/` (`z.infer`), y compris les paramètres d'URL (`articlesSearchSchema`). `process.env` n'est lu que dans `src/services/supabase.ts`.

## Cache

Chaque `fetch` vers Supabase passe `next: { revalidate: 300 }` (`src/services/http.ts`).

- **Clé** : Next.js met en cache chaque réponse selon l'URL complète de la requête, donc selon la table, les colonnes, le filtre `title`, `limit` et `offset`. Deux visiteurs qui demandent la même recherche à la même page partagent la même entrée.
- **Invalidation** : une réponse est réutilisée pendant 5 minutes, puis Next.js la redemande en arrière-plan. Le contenu change rarement et se publie depuis le tableau de bord Supabase, donc 5 minutes de retard au pire restent acceptables.
- **Pourquoi un cache partagé est sans risque** : toutes les requêtes utilisent la même clé publishable et RLS ne renvoie que du contenu publié. La réponse est la même pour tous les visiteurs.

`/about` et `/projects` sont générées au build puis régénérées toutes les 5 minutes. `/` et `/articles/[slug]` dépendent de l'URL et sont rendues à la demande, avec les réponses Supabase en cache.

## Carte client et serveur

Le critère est la présence de `useState`, `useEffect`, d'un hook de Next.js ou d'un gestionnaire d'événement défini dans le composant.

| Composant | Classement | Justification |
|---|---|---|
| `ArticleCover` | serveur | ni hook, ni gestionnaire : il rend une `<Image>` ou rien |
| `ArticleCard` | serveur | « Lire l'article » est un `<Link>`, sans `onClick` |
| `ArticleList` | serveur | affichage pur de ses props |
| `ProjectCard`, `ProjectList`, `SkillList` | serveur | affichage pur de leurs props |
| `SearchForm` | serveur | formulaire GET `next/form` non contrôlé (`defaultValue`) : ni `useState`, ni `onSubmit` |
| `Pagination` | serveur | deux `<Link>` calculés depuis la page et le total, sans `onClick` |
| pages de `src/app/` | serveur | `async`, elles appellent les services avec `await` |
| `SiteNav` | client (`"use client"`) | `usePathname` pour marquer l'entrée courante avec `aria-current` |
| `error.tsx` | client (`"use client"`) | exigé par Next.js ; gestionnaire `onClick` sur « Réessayer » |

Dans la version Vite, `SearchForm`, `Pagination`, `ArticleCard` et `App` étaient client à cause de `useState` et des `onClick`. Les liens et le formulaire GET les rendent serveur.
