import type { Metadata } from "next";
import { BOOT_FLAG_SCRIPT } from "../components/boot/bootFlag";
import { BootScreen, type BootLine } from "../components/boot/BootScreen";
import { CustomCursor } from "../components/CustomCursor";
import { MusicPlayer } from "../components/MusicPlayer";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { profile } from "../content/profile";
import { site } from "../content/site";
import { inter, jetbrainsMono, martianMono } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s · ${site.name}` },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: site.title,
    description: site.description,
    url: "/",
    locale: "en_GB",
  },
  twitter: { card: "summary_large_image", title: site.title, description: site.description },
};

const bootLines: BootLine[] = [
  { tag: ">", text: "booting quentin.os v2026.09", at: 0 },
  { tag: "[ ok ]", text: "loading /experience · git log", at: 22 },
  { tag: "[ ok ]", text: "mounting /stack · 6 layers", at: 45 },
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
        <a href="#content" className="skip-link">
          Skip to content
        </a>
        <BootScreen lines={bootLines} />
        <SiteHeader />
        <main id="content" className="page">
          {children}
        </main>
        <SiteFooter />
        <MusicPlayer {...profile.music} />
        <CustomCursor />
      </body>
    </html>
  );
}
