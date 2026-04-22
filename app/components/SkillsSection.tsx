"use client";

import React, { useEffect, useState } from "react";
import { Zap } from "lucide-react";

interface Skill {
  name: string;
  icon: string;
  iconUrl: string;
  category: string;
  level?: number;
}

interface SkillData {
  frontend: Skill[];
  backend: Skill[];
  tools: Skill[];
}

const SkillsSection: React.FC = () => {
  const [skillData, setSkillData] = useState<SkillData>({ frontend: [], backend: [], tools: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSkillData = async () => {
      try {
        const response = await fetch("/api/skills");
        if (!response.ok) throw new Error("Failed to fetch skill data");
        const data = await response.json();
        setSkillData({
          frontend: data.filter((s: Skill) => s.category === "frontend"),
          backend: data.filter((s: Skill) => s.category === "backend"),
          tools: data.filter((s: Skill) => s.category === "tools"),
        });
      } catch {
        setError("Failed to fetch skill data");
      } finally {
        setLoading(false);
      }
    };
    fetchSkillData();
  }, []);

  if (error) return (
    <section id="skills" className="py-20 px-6 bg-slate-900 relative">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-gray-400 text-lg">Unable to load skills. Please refresh the page.</p>
      </div>
    </section>
  );

  return (
    <section id="skills" data-aos="fade-up" className="py-20 px-6 bg-slate-900 relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div data-aos="fade-up" className="text-center mb-16">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Zap className="w-6 h-6 text-purple-400" />
            <span className="text-purple-400 text-sm font-medium tracking-wider uppercase">
              Expertise
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Skills & Technologies
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            A toolkit I use to design, build, and deploy modern web applications.
          </p>
        </div>

        {/* Logo Scrollers */}
        {loading ? (
          <div className="space-y-8 animate-pulse">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex gap-10">
                {[...Array(6)].map((_, j) => (
                  <div key={j} className="w-20 h-20 bg-white/10 rounded-xl flex-shrink-0" />
                ))}
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-10">
            <LogoScroller skills={skillData.frontend} direction="left" />
            <LogoScroller skills={skillData.backend} direction="right" />
            <LogoScroller skills={skillData.tools} direction="left" />
          </div>
        )}
      </div>
    </section>
  );
};

/* ── Logo Scroller ── */
interface LogoScrollerProps {
  skills: Skill[];
  direction: "left" | "right";
}

const LogoScroller: React.FC<LogoScrollerProps> = ({ skills, direction }) => {
  if (skills.length === 0) return null;
  const items = [...skills, ...skills];

  return (
    <div className="logo-scroller">
      <div
        className={`flex items-center gap-10 w-max ${
          direction === "left" ? "animate-scroll-left" : "animate-scroll-right"
        }`}
      >
        {items.map((skill, i) => (
          <div
            key={`${skill.name}-${i}`}
            className="flex-shrink-0 w-24 h-24 flex items-center justify-center"
          >
            {skill.iconUrl ? (
              <img
                src={skill.iconUrl}
                alt={skill.name}
                className="w-full h-full object-contain"
              />
            ) : (
              <span className="text-4xl leading-none select-none">{skill.icon}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsSection;
