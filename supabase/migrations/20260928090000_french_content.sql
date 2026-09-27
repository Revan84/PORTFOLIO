-- French version of the site: every text the visitor reads gets a *_fr column beside the
-- English one. Slugs, URLs, skill names and git-style refs stay shared by both languages.
-- A new row must now come with its French text: the columns are filled here, then required.
-- Texts use $$ quoting so apostrophes need no escaping.

begin;

alter table public.projects
  add column title_fr text,
  add column summary_fr text,
  add column description_fr text,
  add column cover_alt_fr text;

alter table public.experiences
  add column title_fr text,
  add column location_fr text,
  add column summary_fr text,
  add column highlights_fr text[] not null default '{}';

alter table public.stack_layers
  add column name_fr text;

alter table public.articles
  add column title_fr text,
  add column excerpt_fr text,
  add column content_fr text,
  add column cover_alt_fr text;

-- ════════════════════════════════════════════════════════════════════════════
-- Projects
-- ════════════════════════════════════════════════════════════════════════════

update public.projects set
  title_fr = $$HomeApp$$,
  summary_fr = $$Une app Flutter pour piloter une maison connectée depuis une seule interface.$$,
  description_fr = $$HomeApp est une application mobile Flutter qui réunit les objets connectés d'une maison dans une seule interface. L'architecture reste locale et extensible, pour ajouter au fil du temps de nouveaux protocoles et de nouvelles marques.$$,
  cover_alt_fr = $$L'interface de HomeApp$$
where slug = 'homeapp';

update public.projects set
  title_fr = $$HomeApp Backend$$,
  summary_fr = $$Le backend Go qui gère les appareils de HomeApp.$$,
  description_fr = $$Une API Go construite avec Gin et PostgreSQL. Elle modélise les appareils et les pièces, et pose les bases de la découverte et du pilotage de nouveaux appareils.$$,
  cover_alt_fr = $$L'architecture du backend de HomeApp$$
where slug = 'homeapp-backend';

update public.projects set
  title_fr = $$Exo Sound$$,
  summary_fr = $$Un site moderne pour une association musicale.$$,
  description_fr = $$La refonte complète du site d'Exo Sound : un front Next.js et un back Symfony. Une interface d'administration permet aux membres de gérer eux-mêmes le contenu du site.$$,
  cover_alt_fr = $$Le site de l'association Exo Sound$$
where slug = 'exo-sound';

update public.projects set
  title_fr = $$Bureau connecté$$,
  summary_fr = $$Un bureau assis-debout connecté, fabriqué sur mesure.$$,
  description_fr = $$Un projet personnel entre fabrication et logiciel. Le bureau repose sur un piétement assis-debout électrique et doit rejoindre ma domotique.$$,
  cover_alt_fr = $$Le bureau connecté sur mesure$$
where slug = 'connected-desk';

-- ════════════════════════════════════════════════════════════════════════════
-- Experiences. Links to case studies point to the French pages.
-- ════════════════════════════════════════════════════════════════════════════

update public.experiences set
  title_fr = $$Développeur full-stack, projets perso$$,
  location_fr = $$Montpellier, FR$$,
  summary_fr = $$Je construis ma propre plateforme domotique et le nouveau site de l'association EXO SOUND.$$,
  highlights_fr = array[
    $$[HomeApp](/fr/projects/homeapp) : une app Flutter, une API Go · Gin et un broker MQTT, auto-hébergés sur un NAS$$,
    $$[EXO SOUND](/fr/projects/exo-sound) : un nouveau site Next.js avec un fil Facebook et un tableau de bord d'administration$$
  ]
where position = 1;

update public.experiences set
  title_fr = $$Développeur full-stack, consultant$$,
  location_fr = $$Aimargues, FR$$,
  summary_fr = $$Consultant dans l'équipe projet et support informatique d'Éminence, sur les outils internes de l'entreprise.$$,
  highlights_fr = array[
    $$Développement et maintenance d'outils internes en PHP natif et Symfony 2 et 7, avec des fronts AngularJS$$,
    $$Bases de données SQL dans un environnement IBM AS400$$,
    $$Accompagnement des équipes métier qui utilisent ces outils au quotidien$$
  ]
where position = 2;

update public.experiences set
  title_fr = $$Développeur full-stack, alternance$$,
  summary_fr = $$Troisième année de mon bachelor web en alternance : maintenance et nouvelles fonctionnalités sur des projets web clients, du front au back.$$,
  highlights_fr = array[
    $$Fronts en Next.js, React et Vue$$,
    $$Backs en Symfony 1, 4 et 6, avec PHP 7 et 8$$,
    $$Mise en production de [reservation.lesgrandsbuffets.com](https://reservation.lesgrandsbuffets.com/)$$,
    $$Au quotidien : Bitbucket, Docker, WSL et PhpStorm$$
  ]
where position = 3;

update public.experiences set
  title_fr = $$Artiste et responsable communication$$,
  summary_fr = $$Membre d'une association musicale : je m'y produis comme artiste et je gère sa communication et son site web.$$,
  highlights_fr = array[
    $$Création des affiches web et print des événements de l'association$$,
    $$Maintenance et évolution de [exo-sound.com](https://exo-sound.com/)$$
  ]
where position = 4;

update public.experiences set
  title_fr = $$Développeur, stages$$,
  summary_fr = $$Deux stages sur des applications mobiles et web.$$,
  highlights_fr = array[
    $$Flutter : API REST et fonctionnalités CRUD pour l'interface d'administration$$,
    $$Composants d'interface pour l'app principale, comme la barre de navigation et les carrousels$$,
    $$Mises à jour de bases de données et missions en PHP, Vue.js et Tailwind$$
  ]
where position = 5;

update public.experiences set
  title_fr = $$Bachelor Développeur Web$$,
  location_fr = $$Montpellier, FR$$,
  summary_fr = $$École du web en trois ans : développement, production graphique et marketing digital.$$,
  highlights_fr = array[
    $$Projets web et mobiles en HTML/CSS/JS, Flutter, React, Vue, Node, Nest, PHP, Symfony et WordPress$$,
    $$Diplômé en 2023 du titre RNCP « Concepteur Développeur d'Applications » (niveau bac +3)$$
  ]
where position = 6;

update public.experiences set
  title_fr = $$Licence professionnelle avionique$$,
  location_fr = $$Montpellier, FR$$,
  summary_fr = $$Systèmes avioniques, en alternance chez Sabena Technics, une entreprise de maintenance aéronautique.$$
where position = 7;

update public.experiences set
  title_fr = $$BTS Maintenance des systèmes aéronautiques$$,
  location_fr = $$Mauguio, FR$$,
  summary_fr = $$BTS en maintenance aéronautique, avec un stage de première année chez Assystem.$$
where position = 8;

update public.experiences set
  title_fr = $$Initial commit : bac S$$,
  location_fr = $$Près de Montpellier, FR$$,
  summary_fr = $$Bac scientifique option Informatique et Sciences du Numérique (ISN) : mes premières lignes de Python.$$
where position = 9;

-- ════════════════════════════════════════════════════════════════════════════
-- Stack layers
-- ════════════════════════════════════════════════════════════════════════════

update public.stack_layers set name_fr = $$Interface$$ where code = 'L6';
update public.stack_layers set name_fr = $$Application$$ where code = 'L5';
update public.stack_layers set name_fr = $$Données & messagerie$$ where code = 'L4';
update public.stack_layers set name_fr = $$Infrastructure$$ where code = 'L3';
update public.stack_layers set name_fr = $$Workflow$$ where code = 'L2';
update public.stack_layers set name_fr = $$Design & contenu$$ where code = 'L1';

-- ════════════════════════════════════════════════════════════════════════════
-- Articles
-- ════════════════════════════════════════════════════════════════════════════

update public.articles set
  title_fr = $$Construire une app domotique locale avec Flutter$$,
  excerpt_fr = $$Concevoir une app Flutter qui pilote des objets connectés depuis une seule interface.$$,
  content_fr = $$Dans ce projet, je construis une app Flutter qui réunit différents objets connectés de la maison au même endroit. L'objectif : une architecture locale, fiable et facile à étendre à de nouveaux appareils.$$
where slug = 'local-smart-home-app-with-flutter';

update public.articles set
  title_fr = $$Pourquoi la domotique devrait tourner en local$$,
  excerpt_fr = $$Confidentialité, fiabilité et indépendance vis-à-vis des services cloud.$$,
  content_fr = $$Une domotique locale vous laisse maître de vos données et de vos appareils. Elle réduit aussi la dépendance aux services tiers et rend l'installation plus réactive.$$
where slug = 'why-local-home-automation';

update public.articles set
  title_fr = $$Construire un portfolio moderne avec Next.js$$,
  excerpt_fr = $$Les choix techniques derrière un portfolio moderne et facile à maintenir.$$,
  content_fr = $$Next.js permet de construire une interface moderne tout en gardant une architecture claire. Le contenu de ce portfolio vient de Supabase via son API REST : il peut évoluer sans toucher au code.$$
where slug = 'modern-portfolio-with-nextjs';

update public.articles set
  title_fr = $$React et Zod : valider les données Supabase avant l'affichage$$,
  excerpt_fr = $$Pourquoi une interface TypeScript ne suffit pas, et comment Zod protège les composants du portfolio.$$,
  content_fr = $$## Le problème

`response.json()` renvoie une valeur typée `any`. Une interface TypeScript ne vérifie rien à l'exécution : si la base change, l'erreur apparaît dans un composant, loin de sa cause.

## La solution

Un schéma Zod décrit les données **et** fournit le type :

```ts
const result = articleListSchema.safeParse(await response.json());
if (!result.success) throw new Error("Invalid articles response");
```

## Et le contenu Markdown ?

Le contenu est rendu avec `react-markdown`, jamais avec `dangerouslySetInnerHTML`. Une balise comme <script>alert(1)</script> s'affiche en texte brut.$$
where slug = 'react-and-zod';

update public.articles set
  title_fr = $$Piloter des objets connectés en temps réel avec MQTT et Go$$,
  excerpt_fr = $$L'architecture de mon app IoT : une app Flutter, une API Go · Gin et un broker MQTT.$$,
  content_fr = $$## Quatre briques

- **Flutter** : tableau de bord, commandes et alertes
- **Go · Gin** : API REST, authentification, historique
- **MQTT** : messagerie pub / sub entre l'API et les appareils
- **Appareils** : capteurs et actionneurs

## Pourquoi MQTT

Le publish / subscribe découple l'app des appareils : chaque appareil publie son état, et l'API s'abonne aux topics qui l'intéressent.$$
where slug = 'real-time-iot-with-mqtt-and-go';

update public.articles set
  title_fr = $$Auto-héberger une API et un broker MQTT sur un NAS$$,
  excerpt_fr = $$Pourquoi un NAS héberge l'API, le broker et les données sur le réseau local.$$,
  content_fr = $$## Le choix du local

Le NAS héberge l'API Go, le broker MQTT et les données, sur le réseau local.

## Ce que ça implique

- aucune dépendance à un service cloud pour faire tourner la maison
- des mises à jour en temps réel sur du matériel domestique
- un réseau parfois instable, que l'app doit savoir gérer$$
where slug = 'self-hosting-on-a-nas';

update public.articles set
  title_fr = $$Un site associatif : Next.js, un fil Facebook et un tableau de bord$$,
  excerpt_fr = $$Comment le site d'EXO SOUND affiche ses publications Facebook et se gère depuis un tableau de bord.$$,
  content_fr = $$## Le besoin

Une association musicale veut un site à jour sans republier ses actualités à la main.

## Les choix

- **Next.js** pour le site public
- l'**API Graph** de Facebook pour afficher le fil des publications
- un **tableau de bord** d'administration pour gérer le contenu$$
where slug = 'association-website-with-nextjs';

update public.articles set
  title_fr = $$Des sites pour des clients indépendants : du design à la mise en ligne$$,
  excerpt_fr = $$Concevoir et développer des sites pour des clients indépendants, en React ou WordPress selon le besoin.$$,
  content_fr = $$## Un outil par besoin

- **React** quand le site a besoin d'interactivité
- **WordPress** quand le client doit publier lui-même

## La méthode

Je commence par le design, puis je développe et mets le site en ligne. Le client repart avec un site qu'il sait maintenir.$$
where slug = 'websites-for-independent-clients';

update public.articles set
  title_fr = $$De l'avionique au développement full-stack$$,
  excerpt_fr = $$Maintenance aéronautique, avionique, puis développement web : ce que le premier métier a apporté au second.$$,
  content_fr = $$## Le parcours

- 2016 → 2018 : BTS maintenance aéronautique à l'ESMA, avec un stage chez Assystem
- 2018 → 2019 : licence pro avionique, en alternance chez Sabena Technics
- 2020 → 2023 : bachelor développeur web à MyDigitalSchool Montpellier
- depuis 2021 : développeur full-stack en production

## La règle que j'ai gardée

Chaque système doit être fiable, documenté et facile à transmettre.$$
where slug = 'from-avionics-to-full-stack';

-- Every existing row is translated: from now on the French text is required, like the English.
alter table public.projects
  alter column title_fr set not null,
  alter column summary_fr set not null,
  alter column description_fr set not null;

alter table public.experiences
  alter column title_fr set not null,
  alter column summary_fr set not null;

alter table public.stack_layers
  alter column name_fr set not null;

alter table public.articles
  alter column title_fr set not null,
  alter column excerpt_fr set not null;

commit;

-- Organizations are names, except where the English wording shows ("EXO SOUND association").
begin;

alter table public.experiences add column organization_fr text;
update public.experiences set organization_fr = organization;
update public.experiences set organization_fr = $$Association EXO SOUND$$
where organization = 'EXO SOUND association';
alter table public.experiences alter column organization_fr set not null;

commit;
