import Link from "next/link";
import { AboutSection } from "../components/home/AboutSection";
import { ContactSection } from "../components/home/ContactSection";
import { ExperienceSection } from "../components/home/ExperienceSection";
import { Hero } from "../components/home/Hero";
import { Marquee } from "../components/home/Marquee";
import { ReferencesSection } from "../components/home/ReferencesSection";
import section from "../components/home/Section.module.css";
import { SectionLabel } from "../components/home/SectionLabel";
import { StackSection } from "../components/home/StackSection";
import { profile } from "../content/profile";
import styles from "./home.module.css";

export default function HomePage() {
  return (
    <div className={styles.home}>
      <Hero />
      <Marquee items={profile.marquee} />
      <div className="container">
        <AboutSection />

        {/* Temporary: the Supabase-backed project list replaces this in step 3. */}
        <section id="work" className={section.section} aria-labelledby="work-title">
          <div className={section.heading}>
            <SectionLabel index="01" path="work" />
            <h2 id="work-title" className={section.title}>
              Selected work
            </h2>
          </div>
          <Link href="/projects" className="btn btn-primary">
            See the projects
          </Link>
        </section>

        <ExperienceSection />
        <StackSection />
        <ReferencesSection />
        <ContactSection />
      </div>
    </div>
  );
}
