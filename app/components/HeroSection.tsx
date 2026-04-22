"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Sparkles, ArrowRight, ExternalLink, ChevronDown } from "lucide-react";
import Navigation from "./Navigation";
import Image from "next/image";

interface HeroSectionProps {
  mousePosition: { x: number; y: number };
  scrollToSection: (sectionId: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  mousePosition,
  scrollToSection,
}) => {
  interface HeroData {
    name?: string;
    firstName?: string;
    lastName?: string;
    tagline?: string;
    bio?: string;
    roles?: string[] | string;
    profileImage?: string;
    isAvailable?: boolean;
  }

  const [heroData, setHeroData] = useState<HeroData | null>(null);
  const [currentRole, setCurrentRole] = useState(0);
  const [roleVisible, setRoleVisible] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fecthHeroData = async () => {
      try {
        const response = await fetch("/api/hero");
        if (!response.ok) {
          throw new Error("Failed to fetch hero data");
        }
        const data = await response.json();
        setHeroData(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fecthHeroData();
  }, []);

  useEffect(() => {
    if (heroData?.roles && Array.isArray(heroData.roles)) {
      const roleInterval = setInterval(() => {
        setRoleVisible(false);
        setTimeout(() => {
          setCurrentRole((prev) => (prev + 1) % (heroData.roles as string[]).length);
          setRoleVisible(true);
        }, 400);
      }, 3000);
      return () => clearInterval(roleInterval);
    }
  }, [heroData?.roles]);

  // Memoize background elements to prevent unnecessary re-renders
  const backgroundElements = useMemo(
    () => (
      <>
        <div
          className="absolute w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"
          style={{
            left: `${mousePosition.x * 0.05}%`,
            top: `${mousePosition.y * 0.05}%`,
            transform: "translate(-50%, -50%)",
          }}
        />
        <div
          className="absolute w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"
          style={{
            right: `${(100 - mousePosition.x) * 0.03}%`,
            bottom: `${(100 - mousePosition.y) * 0.03}%`,
            transform: "translate(50%, 50%)",
          }}
        />
      </>
    ),
    [mousePosition.x, mousePosition.y],
  );

  return (
    <section
      id="hero"
      data-aos="fade-down"
      className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden"
    >
      <Navigation scrollToSection={scrollToSection} name={heroData?.name ?? null} />

      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-50">{backgroundElements}</div>

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)",
          backgroundSize: "50px 50px",
        }}
      />

      {/* Hero Content */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 mx-10 lg:mx-20 pt-5 sm:pt-10">
        {loading ? (
          <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-12 animate-pulse">
            <div className="flex-1 space-y-6">
              <div className="h-6 w-40 bg-white/10 rounded-full" />
              <div className="h-16 w-3/4 bg-white/10 rounded-xl" />
              <div className="h-10 w-1/2 bg-white/10 rounded-xl" />
              <div className="h-6 w-full bg-white/10 rounded-xl" />
              <div className="h-6 w-5/6 bg-white/10 rounded-xl" />
              <div className="flex gap-4">
                <div className="h-14 w-40 bg-white/10 rounded-full" />
                <div className="h-14 w-40 bg-white/10 rounded-full" />
              </div>
            </div>
            <div className="w-64 h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 bg-white/10 rounded-2xl flex-shrink-0" />
          </div>
        ) : (
          <>
        {/* Left Content */}
        <div className="flex-1 text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start space-x-2 sm:mb-6 ">
            <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
            <span className="text-purple-300 text-lg font-medium tracking-wide">
              {heroData?.tagline}
            </span>
          </div>

          <h1 className="text-5xl lg:text-7xl xl:text-8xl font-bold text-white sm:mb-4 leading-tight">
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent animate-pulse">
              {heroData?.name}
            </span>{" "}
            {/* <span className="text-white">Azeem</span> */}
          </h1>

          <div className="h-16 lg:h-20 sm:mb-8 flex items-center justify-center lg:justify-start">
            <h2 className="text-xl lg:text-2xl xl:text-4xl text-gray-300 font-light">
              <span className="text-purple-400">{"<"}</span>
              <span
                className="inline-block text-white font-medium mx-2 transition-all duration-400"
                style={{
                  opacity: roleVisible ? 1 : 0,
                  transform: roleVisible ? "translateY(0)" : "translateY(-10px)",
                  transition: "opacity 0.4s ease, transform 0.4s ease",
                }}
              >
                {Array.isArray(heroData?.roles) ? heroData.roles[currentRole] : ""}
              </span>
              <span className="text-purple-400">{"/>"}</span>
            </h2>
          </div>

          <p className="text-lg lg:text-xl text-gray-300 mb-12 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            {heroData?.bio}
          </p>

          {/* CTA Buttons */}
          <div className="relative z-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start sm:mb-8">
            <button
              onClick={() => scrollToSection("projects")}
              className="group bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 flex items-center justify-center space-x-2"
            >
              <span>View My Work</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => scrollToSection("contact")}
              className="group bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-8 py-4 rounded-full font-semibold text-lg border border-white/20 hover:border-white/40 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <span>Get In Touch</span>
              <ExternalLink className="w-5 h-5 group-hover:rotate-45 transition-transform" />
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex-shrink-0 relative">
          <div className="relative group">
            {/* Decorative background elements */}
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <div className="absolute -inset-2 bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500"></div>

            {/* Main image container */}
            <div className="relative w-64 h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 rounded-2xl overflow-hidden border-2 border-white/20 group-hover:border-white/40 transition-all duration-500 transform group-hover:scale-105">
              {heroData?.profileImage && (
                <Image
                  src={heroData?.profileImage}
                  alt="Ali Azeem - Full Stack Developer"
                  width={500}
                  height={500}
                  className="w-full h-full object-cover object-center"
                  priority
                // placeholder="blur"
                />
              )}
  
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-pulse">
              <Sparkles className="w-6 h-6 text-white" />
            </div>

            <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full animate-bounce delay-1000"></div>
          </div>

          {/* Status indicator */}
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-green-500/20 backdrop-blur-sm border border-green-500/40 rounded-full px-4 py-2 flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-300 text-sm font-medium">
              Available for work
            </span>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-0 sm:bottom-2 left-1/2 transform -translate-x-1/2">
          <button
            onClick={() => scrollToSection("about")}
            className="flex flex-col items-center space-y-2 text-gray-400 animate-bounce hover:text-white transition-colors"
            aria-label="Scroll to about section"
          >
            <span className="text-sm">Scroll to explore</span>
            <ChevronDown className="w-6 h-6" />
          </button>
        </div>
          </>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
