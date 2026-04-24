import React from "react";
import { prisma } from "./lib/prisma";
import PortfolioClient from "./components/PortfolioClient";
import AboutSection from "./components/AboutSection";
import EducationSection from "./components/EducationSection";
import ProjectsSection from "./components/ProjectsSection";
import SkillsSection from "./components/SkillsSection";
import ContactSection from "./components/ContactSection";

export const revalidate = 60; // ISR: revalidate every 60 seconds

export default async function PortfolioSite() {
  const [heroData, aboutData, educationData, certificatesData, projectData, skills, contact] =
    await Promise.all([
      prisma.hero.findFirst().catch(() => null),
      prisma.about.findFirst().catch(() => null),
      prisma.education.findMany({ orderBy: { order: "asc" } }).catch(() => []),
      prisma.certificate.findMany({ orderBy: { order: "asc" } }).catch(() => []),
      prisma.project.findMany({ orderBy: { order: "asc" } }).catch(() => []),
      prisma.skill.findMany({ orderBy: { order: "asc" } }).catch(() => []),
      prisma.contact.findFirst().catch(() => null),
    ]);

  return (
    <PortfolioClient
      heroData={heroData}
      primaryPhone={contact?.primaryPhone ?? ""}
      siteName={heroData?.name ?? "Ali Azeem"}
    >
      <AboutSection aboutData={aboutData} />
      <EducationSection educationData={educationData} certificatesData={certificatesData} />
      <ProjectsSection projectData={projectData} />
      <SkillsSection skills={skills} />
      <ContactSection />
    </PortfolioClient>
  );
}
