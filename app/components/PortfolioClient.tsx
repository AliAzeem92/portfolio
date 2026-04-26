"use client";

import React, { useState, useEffect } from "react";
import HeroSection from "./HeroSection";
import Footer from "./Footer";
import FloatingWhatsApp from "./FloatingWhatsApp";

interface HeroData {
  name?: string;
  tagline?: string;
  bio?: string;
  roles?: string[] | string;
  profileImage?: string;
  isAvailable?: boolean;
}

interface PortfolioClientProps {
  heroData: HeroData | null;
  primaryPhone: string;
  siteName: string;
  children: React.ReactNode;
}

const PortfolioClient: React.FC<PortfolioClientProps> = ({
  heroData,
  primaryPhone,
  siteName,
  children,
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-slate-900 text-white relative">
      <div className="overflow-x-hidden w-full">
        <HeroSection
          mousePosition={mousePosition}
          scrollToSection={scrollToSection}
          heroData={heroData}
        />

        {children}

        <Footer scrollToSection={scrollToSection} name={siteName} />
      </div>

      {primaryPhone && (
        <FloatingWhatsApp
          phoneNumber={primaryPhone}
          message="Hi! I have a question."
        />
      )}
    </div>
  );
};

export default PortfolioClient;
