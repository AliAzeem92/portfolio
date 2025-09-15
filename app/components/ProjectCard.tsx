"use client";

import React from "react";
import { Eye, Github } from "lucide-react";
import { Project } from "../types";
import Image from "next/image";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div
      data-aos="zoom-in-up"
      className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-purple-500/50 transition-all duration-300 group"
    >
      {/* Project Image */}
      <div className="relative group/image mb-6">
        <Image
          src={project.image}
          alt={project.title}
          className="w-full h-80 object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent rounded-2xl opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 flex items-end p-6">
          <div className="flex space-x-4">
            <a
              href={project.liveUrl}
              className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-white/30 transition-colors"
            >
              <Eye className="w-4 h-4" />
              <span>Live Demo</span>
            </a>
            <a
              href={project.githubUrl}
              className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-white/30 transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>Code</span>
            </a>
          </div>
        </div>
      </div>

      {/* Project Info */}
      <div className="space-y-4">
        {/* Category */}
        <span className="text-purple-400 text-sm font-medium tracking-wider uppercase">
          {project.category}
        </span>

        {/* Title */}
        <h3 className="text-2xl font-bold text-white group-hover:text-purple-300 transition-colors">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-gray-300 leading-relaxed line-clamp-3">
          {project.description}
        </p>

        {/* Technologies Used */}
        <div>
          <h4 className="text-white font-semibold mb-3 text-sm">
            Technologies Used:
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm text-gray-300 border border-white/20 hover:border-purple-400/50 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
