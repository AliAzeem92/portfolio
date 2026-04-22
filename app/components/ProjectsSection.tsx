"use client";

import React, { useEffect, useState } from "react";
import { Briefcase } from "lucide-react";
import ProjectCard from "./ProjectCard";

interface ProjectData {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
}

const ProjectsSection: React.FC = () => {
  const [projectData, setProjectData] = useState<ProjectData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await fetch("/api/projects")
        if (!response.ok) throw new Error("Failed to fetch project data")
        const data = await response.json()
        setProjectData(data)
      } catch {
        setError("Failed to fetch project data")
      } finally {
        setLoading(false)
      }
    }
    fetchAboutData()
  }, [])

  if (error) return (
    <section id="projects" className="py-20 px-6 bg-gradient-to-b from-slate-900 to-slate-800 relative">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-gray-400 text-lg">Unable to load projects. Please refresh the page.</p>
      </div>
    </section>
  );

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
          {loading ? (
            <>
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white/5 rounded-2xl p-6 border border-white/10 animate-pulse">
                  <div className="h-48 bg-white/10 rounded-2xl mb-6" />
                  <div className="space-y-3">
                    <div className="h-4 w-1/3 bg-white/10 rounded" />
                    <div className="h-6 w-3/4 bg-white/10 rounded" />
                    <div className="h-4 w-full bg-white/10 rounded" />
                    <div className="h-4 w-5/6 bg-white/10 rounded" />
                  </div>
                </div>
              ))}
            </>
          ) : (
            <>
              {projectData.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
