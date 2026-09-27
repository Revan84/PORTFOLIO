// "head" is the current position, "branch" a side activity drawn off the main line,
// "root" the first commit.
export type CommitNode = "head" | "commit" | "branch" | "root";

export type RichText = (string | { label: string; href: string })[];

export interface Commit {
  hash: string;
  period: string;
  title: string;
  ref: string;
  node: CommitNode;
  organization: string;
  body: RichText;
}

export const experience: Commit[] = [
  {
    hash: "a91f3c2",
    period: "2023—2025",
    title: "Full-Stack Developer",
    ref: "HEAD → main",
    node: "head",
    organization: "Éminence, Aimargues · via ESN Klanik",
    body: [
      "Project and IT support team. Internal tools in Symfony 2 and 7, PHP 7 and AngularJS, on SQL and an AS400 environment.",
    ],
  },
  {
    hash: "7c04e9b",
    period: "2022—2023",
    title: "Full-Stack Developer, work-study",
    ref: "work-study",
    node: "commit",
    organization: "Acelys Services Numériques",
    body: [
      "Maintenance and evolution on several web projects. Next, React and Vue front ends; Symfony 1, 4 and 6 with PHP 7 and 8. Shipped ",
      { label: "reservation.lesgrandsbuffets.com", href: "https://reservation.lesgrandsbuffets.com/" },
      ".",
    ],
  },
  {
    hash: "3e8d1a0",
    period: "2021—2025",
    title: "Artist & Communications Lead",
    ref: "side/music",
    node: "branch",
    organization: "EXO SOUND association",
    body: [
      "Web and print posters. Maintenance and evolution of ",
      { label: "exo-sound.com", href: "https://exo-sound.com/" },
      ".",
    ],
  },
  {
    hash: "f25b7d4",
    period: "2021—2022",
    title: "Developer, internships",
    ref: "internships",
    node: "commit",
    organization: "Recolt' · Crédit Agricole",
    body: [
      "Flutter: APIs and CRUD for the admin interface, UI components for the main app. Database updates and missions in PHP, Vue and Tailwind.",
    ],
  },
  {
    hash: "c61a9e8",
    period: "2020—2023",
    title: "Bac +3 Web Developer",
    ref: "edu/web",
    node: "commit",
    organization: "MyDigitalSchool Montpellier",
    body: [
      "Web development, graphic production, digital marketing. Titre Professionnel Concepteur Développeur d'Applications, 2023.",
    ],
  },
  {
    hash: "0b7e2f1",
    period: "2016—2019",
    title: "Initial commit: aeronautics",
    ref: "init",
    node: "root",
    organization: "ESMA Mauguio · IUT de Montpellier",
    body: [
      "BTS in aircraft maintenance, then a professional degree in avionics, both in work-study.",
    ],
  },
];
