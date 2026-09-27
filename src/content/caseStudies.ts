import type { Locale } from "../i18n/locales";

// Case study details that Supabase does not store, keyed by language then project slug.
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

export const caseStudies: Record<Locale, Record<string, CaseStudy>> = {
  en: {
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
  },
  fr: {
    homeapp: {
      lead: "Une app mobile pour surveiller et piloter des objets connectés en temps réel, sur une stack que j'ai conçue et que j'héberge moi-même.",
      facts: [
        { label: "RÔLE", value: "Conception · développement · infrastructure" },
        { label: "APP", value: "Flutter · Dart" },
        { label: "API", value: "Go · Gin" },
        { label: "MESSAGERIE", value: "MQTT" },
        { label: "HÉBERGEMENT", value: "Serveur NAS auto-hébergé" },
      ],
      architecture: {
        nodes: [
          { kind: "client", title: "App Flutter", detail: "Tableau de bord, commandes, alertes" },
          { kind: "api", title: "Go · Gin", detail: "REST, auth, historique" },
          { kind: "broker", title: "MQTT", detail: "Messagerie pub / sub", highlight: true },
          { kind: "edge", title: "Appareils", detail: "Capteurs, actionneurs" },
        ],
        host: { tag: "nas", text: "Héberge l'API, le broker et les données sur le réseau local" },
      },
    },
  },
};
