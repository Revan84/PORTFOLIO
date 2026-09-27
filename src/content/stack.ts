export interface StackLayer {
  code: string;
  name: string;
  tools: string[];
}

// Ordered like a network stack: the interface on top, design and content at the bottom.
export const stackLayers: StackLayer[] = [
  {
    code: "L6",
    name: "Interface",
    tools: ["React", "Next.js", "Flutter", "Vue", "AngularJS", "Tailwind", "HTML · CSS · JS"],
  },
  {
    code: "L5",
    name: "Application",
    tools: ["Symfony", "PHP", "Node", "Nest", "Express", "Go · Gin", "Twig"],
  },
  {
    code: "L4",
    name: "Data & messaging",
    tools: ["SQL", "AS400", "MQTT", "REST APIs", "Facebook Graph API"],
  },
  { code: "L3", name: "Infrastructure", tools: ["Docker", "NAS server", "WSL", "Wamp", "Local"] },
  {
    code: "L2",
    name: "Workflow",
    tools: ["Git", "Bitbucket", "Atlassian Suite", "Insomnia", "PhpStorm"],
  },
  { code: "L1", name: "Design & content", tools: ["Adobe Suite", "WordPress", "MediaWiki"] },
];

export const softSkills = ["curious", "versatile", "autonomous", "adaptable", "team player"];
