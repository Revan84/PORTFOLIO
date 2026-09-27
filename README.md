# Portfolio

Portfolio personnel en React, TypeScript et Vite. Il lit les articles, les projets et les pages publiés dans Supabase, par l'API REST. Chaque réponse est validée par Zod avant d'atteindre les composants.

## Paliers traités

- **Palier 1** : liste des articles publiés, recherche par titre (insensible à la casse), états chargement, erreur, liste vide et liste remplie.
- **Palier 2** : détail d'un article en Markdown (`react-markdown`, jamais `dangerouslySetInnerHTML`), pagination par 6 avec le total lu dans `Content-Range`.
- **Palier 3** : projets avec leurs compétences (relation `skills(name)`), page « À propos », cache des requêtes, carte client et serveur pour Next.js.

## Installation

Copiez `.env.example` vers `.env.local`, puis renseignez les valeurs de Supabase > Connect :

```
VITE_SUPABASE_URL=https://<PROJECT_REF>.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_<KEY>
```

N'utilisez que la clé `sb_publishable_...`. Une clé `sb_secret_...` contourne RLS et serait lisible par tous dans le bundle. `src/services/supabase.ts` la refuse au démarrage.

```bash
npm install
npm run dev     # serveur de développement
npm test        # tests Vitest
npm run lint    # ESLint
npm run build   # vérification TypeScript et build de production
```

## Architecture

```
Supabase (RLS)
  -> src/services/   construit l'URL, appelle fetch, valide avec Zod (sans React)
  -> src/hooks/      suit la requête pendant la vie du composant, met en cache
  -> src/app/App.tsx possède l'état et choisit quoi afficher
  -> src/components/ reçoivent des données déjà validées en props
```

Les types des données viennent des schémas Zod de `src/types/` (`z.infer`). `import.meta.env` n'est lu que dans `src/services/supabase.ts`.

## Cache

Les quatre hooks (`useArticles`, `useArticle`, `useProjects`, `usePage`) passent par `useResource`. Chaque hook possède son propre cache en mémoire (`src/hooks/cache.ts`).

**Clé.** Elle reprend exactement les paramètres qui changent la réponse :

| Hook | Clé |
|---|---|
| `useArticles` | `` `${query.trim()}\|${page}` `` : le terme est trimé comme dans l'URL, donc `" react"` et `"react"` partagent la même entrée |
| `useArticle` | le `slug` |
| `usePage` | le `slug` |
| `useProjects` | `"all"`, car la requête n'a aucun paramètre |

**Invalidation.**
- Une entrée expire 5 minutes après avoir été stockée. Au-delà, la requête est relancée. Le contenu change rarement et se publie depuis le tableau de bord Supabase, donc 5 minutes de retard au pire restent acceptables pour un portfolio.
- Seuls les succès sont mis en cache. Une erreur (réseau, 401, réponse invalide) est retentée à la visite suivante.
- Un rechargement de la page vide le cache, puisqu'il vit en mémoire.

**Pourquoi dans les hooks et pas dans les services.** Sous Next.js, les services s'exécuteront sur le serveur. Un cache au niveau du module y serait partagé entre tous les visiteurs. Côté navigateur, il ne concerne qu'un seul visiteur.

## Carte client et serveur pour Next.js

Le critère est la présence de `useState`, `useEffect` (directement ou par un hook) ou d'un gestionnaire d'événement défini dans le composant.

| Composant | Classement | Justification |
|---|---|---|
| `ArticleCover` | serveur possible | ni hook, ni gestionnaire d'événement : il rend une `<img>` ou rien |
| `ArticleList` | serveur possible | ni hook, ni gestionnaire ; il transmet `onSelect` sans l'appeler. Sous Next.js, `onSelect` disparaîtra au profit d'un lien |
| `ProjectCard` | serveur possible | affichage pur de ses props |
| `ProjectList` | serveur possible | affichage pur de ses props |
| `SkillList` | serveur possible | affichage pur de ses props |
| `ArticleCard` | client obligatoire | gestionnaire `onClick` sur « Lire l'article ». Il deviendra serveur possible quand le bouton sera remplacé par un `<Link href="/articles/[slug]">` |
| `ArticleDetail` | client obligatoire | `useArticle` (`useState` + `useEffect`) et `onClick` sur « Retour ». Sous Next.js, la page `/articles/[slug]` appellera `fetchArticleBySlug` côté serveur |
| `ProjectsView` | client obligatoire | `useProjects` (`useState` + `useEffect`). Sous Next.js, `await fetchProjects()` dans une page serveur le remplacera |
| `AboutView` | client obligatoire | `usePage` (`useState` + `useEffect`). Même remplacement par `await fetchPageBySlug("about")` |
| `SearchForm` | client obligatoire | `useState` pour le texte saisi, `onSubmit` et `onChange` |
| `Pagination` | client obligatoire | `onClick` sur les deux boutons |
| `SiteNav` | client obligatoire | `onClick` sur chaque entrée. Il deviendra serveur possible avec des `<Link>` vers les routes |
| `App` | client obligatoire | `useState` pour la vue, la recherche, la page et l'article sélectionné |
