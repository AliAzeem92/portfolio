"use client";

import React, { useState, useEffect } from "react";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";
import SkillsSection from "./components/SkillsSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import EducationSection from "./components/EducationSection";
import FloatingWhatsApp from "./components/FloatingWhatsApp";

const PortfolioSite: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-slate-900 text-white">
      <HeroSection
        mousePosition={mousePosition}
        scrollToSection={scrollToSection}
      />

      <AboutSection />
      <EducationSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />

      <Footer scrollToSection={scrollToSection} />

      {/* Custom animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }

        @media (max-width: 768px) {
          .text-6xl {
            font-size: 3rem;
          }
          .text-8xl {
            font-size: 4rem;
          }
        }
      `}</style>
      <FloatingWhatsApp
        phoneNumber="923218515137"
        message="Hi! I have a question."
      />
    </div>
  );
};

export default PortfolioSite;
