import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "../components/SiteNav";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Portfolio", template: "%s · Portfolio" },
  description: "Articles, projets et parcours d'un développeur full-stack.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr">
      <body>
        <div className="site">
          <header>
            <p>
              <Link href="/">Portfolio</Link>
            </p>
            <SiteNav />
          </header>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
