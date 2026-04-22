"use client";

import React from "react";
import { Code } from "lucide-react";

interface FooterProps {
  scrollToSection: (sectionId: string) => void;
  name?: string | null;
}

const Footer: React.FC<FooterProps> = ({ scrollToSection, name }) => {
  const nameSkeleton = <div className="h-4 w-24 bg-white/10 rounded animate-pulse inline-block" />;

  return (
    <footer
      data-aos="fade-down"
      className="py-12 px-6 bg-slate-900 border-t border-white/10"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Code className="w-4 h-4 text-white" />
            </div>
            {name === null || name === undefined ? (
              <div className="h-4 w-24 bg-white/10 rounded animate-pulse" />
            ) : (
              <span className="text-white font-bold">{name}</span>
            )}
          </div>

          <div className="text-gray-400 text-sm">
            © {new Date().getFullYear()}{" "}
            {name === null || name === undefined ? nameSkeleton : name}. All rights reserved.
          </div>

          <div className="flex space-x-6 text-gray-400 text-sm">
            <button onClick={() => scrollToSection("about")} className="hover:text-white transition-colors">About</button>
            <button onClick={() => scrollToSection("projects")} className="hover:text-white transition-colors">Projects</button>
            <button onClick={() => scrollToSection("skills")} className="hover:text-white transition-colors">Skills</button>
            <button onClick={() => scrollToSection("contact")} className="hover:text-white transition-colors">Contact</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
