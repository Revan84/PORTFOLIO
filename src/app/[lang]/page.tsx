import { notFound } from "next/navigation";
import { AboutSection } from "../../components/home/AboutSection";
import { ContactSection } from "../../components/home/ContactSection";
import { ExperienceSection } from "../../components/home/ExperienceSection";
import { Hero } from "../../components/home/Hero";
import { Marquee } from "../../components/home/Marquee";
import { ReferencesSection } from "../../components/home/ReferencesSection";
import { StackSection } from "../../components/home/StackSection";
import { WorkSection } from "../../components/home/WorkSection";
import { JsonLd } from "../../components/JsonLd";
import { profile } from "../../content/profile";
import { isLocale } from "../../i18n/locales";
import { homeStructuredData } from "../../lib/structuredData";
import { fetchExperiences, fetchStack } from "../../services/career";
import { fetchProjects } from "../../services/projects";
import styles from "./home.module.css";

export default async function HomePage(props: PageProps<"/[lang]">) {
  const { lang } = await props.params;
  if (!isLocale(lang)) notFound();

  const [projects, experiences, stack] = await Promise.all([
    fetchProjects(lang),
    fetchExperiences(lang),
    fetchStack(lang),
  ]);

  return (
    <div className={styles.home}>
      <JsonLd data={homeStructuredData(lang)} />
      <Hero locale={lang} />
      <Marquee items={profile.marquee} />
      <div className="container">
        <AboutSection locale={lang} />
        <WorkSection projects={projects} locale={lang} />
        <ExperienceSection experiences={experiences} locale={lang} />
        <StackSection layers={stack} locale={lang} />
        <ReferencesSection locale={lang} />
        <ContactSection locale={lang} />
      </div>
    </div>
  );
}
