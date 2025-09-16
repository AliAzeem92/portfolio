import type { StaticImageData } from "next/image";

export interface Skill {
  name: string;
  icon: string;
}

export interface SkillsCategory {
  frontend: Skill[];
  backend: Skill[];
  tools: Skill[];
}

export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string | StaticImageData;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
}

export interface SocialLink {
  icon: React.ElementType;
  href: string;
  label: string;
  color: string;
}
