import type { Metadata } from "next";
import { BOOT_FLAG_SCRIPT } from "../components/boot/bootFlag";
import { BootScreen, type BootLine } from "../components/boot/BootScreen";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { experience } from "../content/experience";
import { stackLayers } from "../content/stack";
import { inter, jetbrainsMono, martianMono } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Quentin Euillot · Full-stack developer", template: "%s · Quentin Euillot" },
  description:
    "I build web and mobile products end to end: the interface, the API, and the servers underneath.",
  icons: { icon: "/favicon.svg" },
};

const bootLines: BootLine[] = [
  { tag: ">", text: "booting quentin.os v2026.09", at: 0 },
  { tag: "[ ok ]", text: `loading /experience · ${experience.length} commits`, at: 22 },
  { tag: "[ ok ]", text: `mounting /stack · ${stackLayers.length} layers`, at: 45 },
  { tag: "[ ok ]", text: "connecting mqtt://montpellier", at: 68 },
  { tag: "[ ok ]", text: "compiling /work", at: 86 },
  { tag: "[ ok ]", text: "ready", at: 100 },
];

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // The boot script sets data-boot on <html> before React hydrates.
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} ${martianMono.variable}`}
      // Smooth scrolling for in-page anchors only, not when Next.js changes route.
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body>
        <script>{BOOT_FLAG_SCRIPT}</script>
        <BootScreen lines={bootLines} />
        <SiteHeader />
        <main className="page">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
