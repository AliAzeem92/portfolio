"use client";

import React, { useEffect, useRef } from "react";
import { Zap } from "lucide-react";

interface Skill {
  name: string;
  icon: string;
  iconUrl: string;
}

interface SkillsSectionProps {
  skills: Skill[];
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ skills }) => {
  return (
    <section id="skills" data-aos="fade-up" className="py-20 px-6 bg-slate-900 relative">
      <div className="max-w-6xl mx-auto">
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
        <LogoScroller skills={skills} />
      </div>
    </section>
  );
};

interface LogoScrollerProps {
  skills: Skill[];
}

const SPEED = 3; // px per frame

const LogoScroller: React.FC<LogoScrollerProps> = ({ skills }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const xRef = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const track = trackRef.current;
    const copy = copyRef.current;
    if (!track || !copy) return;

    const loop = () => {
      xRef.current -= SPEED;
      // Reset exactly when we've scrolled one full copy width
      if (Math.abs(xRef.current) >= copy.offsetWidth) {
        xRef.current = 0;
      }
      track.style.transform = `translateX(${xRef.current}px)`;
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [skills]);

  if (skills.length === 0) return null;

  const renderItems = (keySuffix: string) =>
    skills.map((skill, i) => (
      <div
        key={`${skill.name}-${keySuffix}-${i}`}
        className="flex-shrink-0 flex items-center justify-center"
        style={{ height: "96px" }}
      >
        {skill.iconUrl ? (
          <img src={skill.iconUrl} alt={skill.name} className="h-16 w-auto object-contain" />
        ) : (
          <span className="text-4xl leading-none select-none">{skill.icon}</span>
        )}
      </div>
    ));

  return (
    <div className="logo-scroller">
      <div ref={trackRef} className="logo-track">
        {/* original copy — measured for reset point */}
        <div ref={copyRef} className="flex items-center gap-10 flex-shrink-0">
          {renderItems("a")}
        </div>
        {/* clone copy — seamlessly follows */}
        <div className="flex items-center gap-10 flex-shrink-0">
          {renderItems("b")}
        </div>
      </div>
    </div>
  );
};

export default SkillsSection;
