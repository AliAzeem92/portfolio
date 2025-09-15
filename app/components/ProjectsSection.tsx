"use client";

import React from "react";
import { Briefcase } from "lucide-react";
import { projects } from "../data";
import ProjectCard from "./ProjectCard";

const ProjectsSection: React.FC = () => {
  return (
    <section
      id="projects"
      className="py-20 px-6 bg-gradient-to-b from-slate-900 to-slate-800 relative"
    >
      <div className="max-w-7xl mx-auto">
        <div data-aos="fade-down" className="text-center mb-16">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Briefcase className="w-6 h-6 text-purple-400" />
            <span className="text-purple-400 text-sm font-medium tracking-wider uppercase">
              Featured Work
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            My Projects
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            A showcase of my latest work, featuring innovative solutions and
            cutting-edge technologies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
