import type { Metadata } from "next";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { inter, jetbrainsMono, martianMono } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Quentin Euillot · Full-stack developer", template: "%s · Quentin Euillot" },
  description:
    "I build web and mobile products end to end: the interface, the API, and the servers underneath.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} ${martianMono.variable}`}
    >
      <body>
        <SiteHeader />
        <main className="page">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
