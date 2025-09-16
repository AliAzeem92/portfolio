"use client";

import React from "react";
import { Code } from "lucide-react";

interface NavigationProps {
  scrollToSection: (sectionId: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ scrollToSection }) => {
  return (
    <nav className="relative z-10 flex flex-col md:flex-row justify-between items-center p-4 sm:p-6 lg:p-8 md:mx-12">
      {/* Logo (hidden on mobile) */}
      <div className="hidden md:flex items-center space-x-2 mb-4 md:mb-0">
        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
          <Code className="w-6 h-6 text-white" />
        </div>
        <span className="text-white font-bold text-xl">Ali Azeem</span>
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-gray-300">
        {["About", "Education", "Projects", "Skills", "Contact"].map((item) => (
          <button
            key={item}
            onClick={() => scrollToSection(item.toLowerCase())}
            className="hover:text-white transition-colors duration-300 relative group"
          >
            {item}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 transition-all duration-300 group-hover:w-full" />
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
