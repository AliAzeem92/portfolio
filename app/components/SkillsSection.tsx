"use client";

import React, { useEffect, useState } from "react";
import { Zap, Globe, Server, Layers } from "lucide-react";

interface SkillData {
  frontend: {
    name: string;
    icon: string;
    level?: number;
  }[];
  backend: {
    name: string;
    icon: string;
    level?: number;
  }[];
  tools: {
    name: string;
    icon: string;
    level?: number;
  }[];
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
        const grouped = {
          frontend: data.filter((s: any) => s.category === "frontend"),
          backend: data.filter((s: any) => s.category === "backend"),
          tools: data.filter((s: any) => s.category === "tools"),
        };
        setSkillData(grouped);
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
    <section
      id="skills"
      data-aos="fade-up"
     className="py-20 px-6 bg-slate-900 relative">
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
            A toolkit I use to design, build, and deploy modern web
            applications.
          </p>
        </div>

        {/* Skills Grid */}
        {loading ? (
          <div className="grid lg:grid-cols-3 gap-8 animate-pulse">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white/5 rounded-2xl p-8 border border-white/10">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-white/10 rounded-lg" />
                  <div className="h-6 w-24 bg-white/10 rounded" />
                </div>
                <div className="flex flex-wrap gap-3">
                  {[...Array(6)].map((_, j) => (
                    <div key={j} className="h-9 w-24 bg-white/10 rounded-lg" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Frontend */}
          <SkillCard
            title="Frontend"
            icon={<Globe className="w-6 h-6 text-white" />}
            gradient="from-purple-500 to-pink-500"
            skills={skillData?.frontend}
            color="purple"
            aos="flip-left"
          />

          {/* Backend */}
          <SkillCard
            title="Backend"
            icon={<Server className="w-6 h-6 text-white" />}
            gradient="from-blue-500 to-cyan-500"
            skills={skillData?.backend}
            color="blue"
            aos="flip-left"
          />

          {/* Tools & DevOps */}
          <SkillCard
            title="Tools & DevOps"
            icon={<Layers className="w-6 h-6 text-white" />}
            gradient="from-green-500 to-teal-500"
            skills={skillData?.tools}
            color="green"
            aos="flip-left"
          />
        </div>
        )}
      </div>
    </section>
  );
};

interface Skill {
  name: string;
  icon: string;
  level?: number;
}

interface SkillCardProps {
  title: string;
  icon: React.ReactNode;
  gradient: string;
  skills: Skill[];
  color: "purple" | "blue" | "green";
  aos?: string;
}

const SkillCard: React.FC<SkillCardProps> = ({
  title,
  icon,
  gradient,
  skills,
  color,
  aos,
}) => {
  return (
    <div
      data-aos={aos}
      className={`bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-${color}-500/50 transition-all duration-300 group`}
    >
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <div
          className={`w-12 h-12 bg-gradient-to-br ${gradient} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}
        >
          {icon}
        </div>
        <h3 className="text-2xl font-bold text-white">{title}</h3>
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-3">
        {skills.map((skill) => (
          <span
            key={skill.name}
            className={`flex items-center gap-2 px-4 py-2 bg-${color}-500/10 text-${color}-300 rounded-lg text-sm font-medium border border-${color}-400/30 hover:bg-${color}-500/20 hover:scale-105 transition-all duration-300`}
          >
            <span>{skill.icon}</span>
            <span>{skill.name}</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default SkillsSection;
