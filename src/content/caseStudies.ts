// Case study details that Supabase does not store, keyed by project slug.
// Every field is optional: a project without an entry still gets a page built from its row.

export interface ArchitectureNode {
  kind: string;
  title: string;
  detail: string;
  highlight?: boolean;
}

export interface CaseStudy {
  lead?: string;
  facts?: { label: string; value: string }[];
  architecture?: {
    nodes: ArchitectureNode[];
    host?: { tag: string; text: string };
  };
  outcomes?: string[];
}

export const caseStudies: Record<string, CaseStudy> = {
  homeapp: {
    lead: "A mobile app to monitor and control connected devices in real time, on a stack I designed and host myself.",
    facts: [
      { label: "ROLE", value: "Design · development · infrastructure" },
      { label: "APP", value: "Flutter · Dart" },
      { label: "API", value: "Go · Gin" },
      { label: "MESSAGING", value: "MQTT" },
      { label: "HOSTING", value: "Self-hosted NAS server" },
    ],
    architecture: {
      nodes: [
        { kind: "client", title: "Flutter app", detail: "Dashboard, controls, alerts" },
        { kind: "api", title: "Go · Gin", detail: "REST, auth, history" },
        { kind: "broker", title: "MQTT", detail: "Pub / sub messaging", highlight: true },
        { kind: "edge", title: "Devices", detail: "Sensors, actuators" },
      ],
      host: { tag: "nas", text: "Hosts the API, the broker and the data on the local network" },
    },
  },
};
