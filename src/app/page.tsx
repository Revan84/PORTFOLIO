import { AboutSection } from "../components/home/AboutSection";
import { ContactSection } from "../components/home/ContactSection";
import { ExperienceSection } from "../components/home/ExperienceSection";
import { Hero } from "../components/home/Hero";
import { Marquee } from "../components/home/Marquee";
import { ReferencesSection } from "../components/home/ReferencesSection";
import { StackSection } from "../components/home/StackSection";
import { WorkSection } from "../components/home/WorkSection";
import { profile } from "../content/profile";
import { fetchProjects } from "../services/projects";
import styles from "./home.module.css";

export default async function HomePage() {
  const projects = await fetchProjects();

  return (
    <div className={styles.home}>
      <Hero />
      <Marquee items={profile.marquee} />
      <div className="container">
        <AboutSection />
        <WorkSection projects={projects} />
        <ExperienceSection />
        <StackSection />
        <ReferencesSection />
        <ContactSection />
      </div>
    </div>
  );
}
