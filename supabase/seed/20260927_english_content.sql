-- English content for the whole site. Run after 20260927160000_career_and_stack.sql.
-- Texts use $$ quoting so apostrophes need no escaping.

begin;

-- ════════════════════════════════════════════════════════════════════════════
-- Articles: English titles, excerpts, content and slugs. The test draft goes.
-- ════════════════════════════════════════════════════════════════════════════

delete from public.articles where slug = 'bureau-connecte';

update public.articles set
  slug = 'local-smart-home-app-with-flutter',
  title = $$Building a local smart home app with Flutter$$,
  excerpt = $$Designing a Flutter app that controls connected devices from a single interface.$$,
  content = $$In this project, I'm building a Flutter app that brings different smart home devices together in one place. The goal is a local architecture: reliable, and easy to extend with new devices.$$
where slug = 'application-domotique-flutter';

update public.articles set
  slug = 'why-local-home-automation',
  title = $$Why home automation should run locally$$,
  excerpt = $$Privacy, reliability and independence from cloud services.$$,
  content = $$A local home automation setup keeps you in control of your data and your devices. It also reduces the dependency on third-party services and makes the installation respond faster.$$
where slug = 'architecture-locale-domotique';

update public.articles set
  slug = 'modern-portfolio-with-nextjs',
  title = $$Building a modern portfolio with Next.js$$,
  excerpt = $$The technical choices behind a portfolio that is modern and easy to maintain.$$,
  content = $$Next.js makes it possible to build a modern interface while keeping a clear architecture. The content of this portfolio comes from Supabase through its REST API, so it can change without touching the code.$$
where slug = 'portfolio-nextjs';

update public.articles set
  slug = 'react-and-zod',
  title = $$React & Zod: validating Supabase data before rendering$$,
  excerpt = $$Why a TypeScript interface is not enough, and how Zod protects the portfolio's components.$$,
  content = $$## The problem

`response.json()` returns a value typed `any`. A TypeScript interface checks nothing at runtime: if the database changes, the error shows up in a component, far from its cause.

## The fix

A Zod schema describes the data **and** provides the type:

```ts
const result = articleListSchema.safeParse(await response.json());
if (!result.success) throw new Error("Invalid articles response");
```

## What about the Markdown content?

The content is rendered with `react-markdown`, never with `dangerouslySetInnerHTML`. A tag like <script>alert(1)</script> is displayed as plain text.$$
where slug = 'react-zod';

update public.articles set
  slug = 'real-time-iot-with-mqtt-and-go',
  title = $$Controlling connected devices in real time with MQTT and Go$$,
  excerpt = $$The architecture of my IoT app: a Flutter app, a Go · Gin API and an MQTT broker.$$,
  content = $$## Four building blocks

- **Flutter**: dashboard, controls and alerts
- **Go · Gin**: REST API, authentication, history
- **MQTT**: pub / sub messaging between the API and the devices
- **Devices**: sensors and actuators

## Why MQTT

Publish / subscribe decouples the app from the devices: each device publishes its state, and the API subscribes to the topics it cares about.$$
where slug = 'objets-connectes-mqtt-go';

update public.articles set
  slug = 'self-hosting-on-a-nas',
  title = $$Self-hosting an API and an MQTT broker on a NAS$$,
  excerpt = $$Why a NAS hosts the API, the broker and the data on the local network.$$,
  content = $$## Choosing local

The NAS hosts the Go API, the MQTT broker and the data, on the local network.

## What it implies

- no dependency on a cloud service to run the house
- real-time updates on home hardware
- a network that is sometimes unreliable, which the app has to handle$$
where slug = 'auto-hebergement-nas';

update public.articles set
  slug = 'association-website-with-nextjs',
  title = $$An association website: Next.js, a Facebook feed and a dashboard$$,
  excerpt = $$How the EXO SOUND website shows its Facebook posts and is managed from a dashboard.$$,
  content = $$## The need

A music association wants an up-to-date website without reposting its news by hand.

## The choices

- **Next.js** for the public site
- Facebook's **Graph API** to display the feed of posts
- an admin **dashboard** to manage the content$$
where slug = 'site-association-nextjs';

update public.articles set
  slug = 'websites-for-independent-clients',
  title = $$Websites for independent clients: from design to launch$$,
  excerpt = $$Designing and building websites for independent clients, in React or WordPress depending on the need.$$,
  content = $$## One tool per need

- **React** when the site needs interactivity
- **WordPress** when the client must publish on their own

## The method

I start with the design, then build and launch the site. The client leaves with a website they know how to maintain.$$
where slug = 'sites-clients-independants';

update public.articles set
  slug = 'from-avionics-to-full-stack',
  title = $$From avionics to full-stack development$$,
  excerpt = $$Aircraft maintenance, avionics, then web development: what the first trade brought to the second.$$,
  content = $$## The path

- 2016 → 2018: vocational degree in aircraft maintenance at ESMA, with an internship at Assystem
- 2018 → 2019: professional bachelor's in avionics, in work-study at Sabena Technics
- 2020 → 2023: bachelor's degree in web development at MyDigitalSchool Montpellier
- since 2021: full-stack developer in production

## The rule I kept

Every system should be reliable, documented, and easy to hand over.$$
where slug = 'avionique-full-stack';

-- ════════════════════════════════════════════════════════════════════════════
-- Projects: English summaries, descriptions and image alternatives.
-- ════════════════════════════════════════════════════════════════════════════

update public.projects set
  summary = $$A Flutter app to run a smart home from one interface.$$,
  description = $$HomeApp is a Flutter mobile app that brings a home's connected devices together in a single interface. The architecture stays local and extensible, so new protocols and brands can be added over time.$$,
  cover_alt = $$The HomeApp interface$$
where slug = 'homeapp';

update public.projects set
  summary = $$The Go backend that manages HomeApp's devices.$$,
  description = $$A Go API built with Gin and PostgreSQL. It models devices and rooms, and lays the groundwork for discovering and controlling new devices.$$,
  cover_alt = $$The HomeApp backend architecture$$
where slug = 'homeapp-backend';

update public.projects set
  summary = $$A modern website for a music association.$$,
  description = $$A full rebuild of the Exo Sound website: a Next.js front end and a Symfony back end. It includes an admin interface so members can manage the site's content themselves.$$,
  cover_alt = $$The Exo Sound association website$$
where slug = 'exo-sound';

update public.projects set
  summary = $$A custom-built, connected sit-stand desk.$$,
  description = $$A personal project mixing physical fabrication and software. The desk runs on an electric sit-stand frame and is meant to join my home automation setup.$$,
  cover_alt = $$The custom connected desk$$
where slug = 'connected-desk';

-- ════════════════════════════════════════════════════════════════════════════
-- Stack: six layers, every skill placed in one of them.
-- ════════════════════════════════════════════════════════════════════════════

insert into public.stack_layers (code, name, position) values
  ('L6', 'Interface', 1),
  ('L5', 'Application', 2),
  ('L4', 'Data & messaging', 3),
  ('L3', 'Infrastructure', 4),
  ('L2', 'Workflow', 5),
  ('L1', 'Design & content', 6);

-- Existing skills keep their id, so the project links stay intact.
update public.skills set level = 'Advanced' where level = 'Avancé';
update public.skills set level = 'Intermediate' where level = 'Intermédiaire';

insert into public.skills (name, level) values
  ('HTML · CSS · JS', 'Advanced'),
  ('Vue', null),
  ('AngularJS', null),
  ('Tailwind', null),
  ('Twig', null),
  ('Node', null),
  ('Nest', null),
  ('Express', null),
  ('Gin', null),
  ('SQL', 'Advanced'),
  ('AS400', null),
  ('MQTT', null),
  ('REST APIs', null),
  ('Facebook Graph API', null),
  ('NAS server', null),
  ('WSL', null),
  ('Wamp', null),
  ('Local', null),
  ('Bitbucket', null),
  ('Atlassian Suite', null),
  ('Insomnia', null),
  ('PhpStorm', null),
  ('Adobe Suite', null),
  ('Figma', null),
  ('WordPress', null),
  ('MediaWiki', null);

-- Place each skill in its layer, in display order.
with placement (name, code, position) as (
  values
    ('HTML · CSS · JS', 'L6', 1), ('TypeScript', 'L6', 2), ('React', 'L6', 3), ('Next.js', 'L6', 4),
    ('Vue', 'L6', 5), ('AngularJS', 'L6', 6), ('Tailwind', 'L6', 7), ('Flutter', 'L6', 8), ('Dart', 'L6', 9),
    ('PHP', 'L5', 1), ('Symfony', 'L5', 2), ('Twig', 'L5', 3), ('Node', 'L5', 4), ('Nest', 'L5', 5),
    ('Express', 'L5', 6), ('Go', 'L5', 7), ('Gin', 'L5', 8),
    ('SQL', 'L4', 1), ('PostgreSQL', 'L4', 2), ('Supabase', 'L4', 3), ('AS400', 'L4', 4), ('MQTT', 'L4', 5),
    ('REST APIs', 'L4', 6), ('Facebook Graph API', 'L4', 7),
    ('Docker', 'L3', 1), ('NAS server', 'L3', 2), ('WSL', 'L3', 3), ('Wamp', 'L3', 4), ('Local', 'L3', 5),
    ('Git', 'L2', 1), ('Bitbucket', 'L2', 2), ('Atlassian Suite', 'L2', 3), ('Insomnia', 'L2', 4), ('PhpStorm', 'L2', 5),
    ('Adobe Suite', 'L1', 1), ('Figma', 'L1', 2), ('WordPress', 'L1', 3), ('MediaWiki', 'L1', 4)
)
update public.skills s
set layer_id = l.id, position = p.position
from placement p
join public.stack_layers l on l.code = p.code
where s.name = p.name;

-- ════════════════════════════════════════════════════════════════════════════
-- Experiences: the career as a commit log, newest first.
-- ════════════════════════════════════════════════════════════════════════════

insert into public.experiences
  (hash, title, organization, location, ref, node, start_year, end_year, summary, highlights, tools, position, published_at)
values
  ('e4c1b07', $$Full-Stack Developer, own projects$$, $$HomeApp · EXO SOUND$$, $$Montpellier, FR$$,
   'HEAD → main', 'head', 2025, null,
   $$Building my own smart home platform and the new website of the EXO SOUND association.$$,
   array[
     $$[HomeApp](/projects/homeapp): a Flutter app, a Go · Gin API and an MQTT broker, self-hosted on a NAS$$,
     $$[EXO SOUND](/projects/exo-sound): a new Next.js website with a Facebook feed and an admin dashboard$$
   ],
   array['Flutter', 'Dart', 'Go', 'MQTT', 'Next.js', 'TypeScript'],
   1, now()),

  ('a91f3c2', $$Full-Stack Developer, consultant$$, $$Éminence · via ESN Klanik$$, $$Aimargues, FR$$,
   'consulting', 'commit', 2023, 2025,
   $$Consultant in Éminence's project and IT support team, on the company's internal tools.$$,
   array[
     $$Built and maintained internal tools in native PHP and Symfony 2 and 7, with AngularJS front ends$$,
     $$Worked with SQL databases in an IBM AS400 environment$$,
     $$Supported the business teams using these tools day to day$$
   ],
   array['PHP', 'Symfony', 'AngularJS', 'SQL', 'AS400'],
   2, now()),

  ('7c04e9b', $$Full-Stack Developer, work-study$$, $$Acelys Services Numériques$$, null,
   'work-study', 'commit', 2022, 2023,
   $$Third year of my web bachelor's in work-study: maintenance and new features on client web projects, from the front end to the back end.$$,
   array[
     $$Front ends in Next.js, React and Vue$$,
     $$Back ends in Symfony 1, 4 and 6, with PHP 7 and 8$$,
     $$Shipped [reservation.lesgrandsbuffets.com](https://reservation.lesgrandsbuffets.com/)$$,
     $$Daily workflow on Bitbucket, Docker, WSL and PhpStorm$$
   ],
   array['Next.js', 'React', 'Vue', 'Symfony', 'PHP', 'Docker', 'Bitbucket'],
   3, now()),

  ('3e8d1a0', $$Artist & Communications Lead$$, $$EXO SOUND association$$, null,
   'side/music', 'branch', 2021, null,
   $$Member of a music association: performing as an artist, and running its communication and website.$$,
   array[
     $$Designed web and print posters for the association's events$$,
     $$Maintained and evolved [exo-sound.com](https://exo-sound.com/)$$
   ],
   array['Next.js', 'Adobe Suite'],
   4, now()),

  ('f25b7d4', $$Developer, internships$$, $$Recolt' · Crédit Agricole$$, null,
   'internships', 'commit', 2021, 2022,
   $$Two internships on mobile and web applications.$$,
   array[
     $$Flutter: REST APIs and CRUD features for the admin interface$$,
     $$UI components for the main app, such as the navigation bar and carousels$$,
     $$Database updates and missions in PHP, Vue.js and Tailwind$$
   ],
   array['Flutter', 'Dart', 'PHP', 'Vue', 'Tailwind'],
   5, now()),

  ('c61a9e8', $$Bachelor's degree, Web Developer$$, $$MyDigitalSchool Montpellier$$, $$Montpellier, FR$$,
   'edu/web', 'commit', 2020, 2023,
   $$Three-year web school covering development, graphic production and digital marketing.$$,
   array[
     $$Web and mobile projects in HTML/CSS/JS, Flutter, React, Vue, Node, Nest, PHP, Symfony and WordPress$$,
     $$Graduated in 2023 with the French state certification "Concepteur Développeur d'Applications" (application designer and developer, bachelor level)$$
   ],
   array['Flutter', 'React', 'Vue', 'Node', 'Symfony', 'WordPress'],
   6, now()),

  ('5b9e7d3', $$Professional bachelor's degree in avionics$$, $$IUT de Montpellier · Sabena Technics$$, $$Montpellier, FR$$,
   'edu/avionics', 'commit', 2018, 2019,
   $$Avionics systems, in work-study at Sabena Technics, an aircraft maintenance company.$$,
   array[]::text[],
   array[]::text[],
   7, now()),

  ('0b7e2f1', $$Vocational degree in aircraft maintenance$$, $$ESMA Mauguio · Assystem$$, $$Mauguio, FR$$,
   'edu/aero', 'commit', 2016, 2018,
   $$BTS in aircraft maintenance, with a first-year internship at Assystem.$$,
   array[]::text[],
   array[]::text[],
   8, now()),

  ('3f0a9c1', $$Initial commit: scientific baccalaureate$$, $$Lycée Saint-Clément-de-Rivière$$, $$Montpellier area, FR$$,
   'init', 'root', 2012, 2015,
   $$Scientific baccalaureate with the computer science option (ISN): my first lines of Python.$$,
   array[]::text[],
   array['Python'],
   9, now());

commit;
