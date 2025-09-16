import { SkillsCategory, Project } from "../types";
import { Mail, Github, Linkedin } from "lucide-react";
import Shahab from "@/public/Projects/Shahab-Portfolio.png";
import Movie from "@/public/Projects/movie-suggestion.png";

export const roles = [
  "Full Stack Developer",
  "React Specialist",
  "UI/UX Engineer",
  "Next.js Expert",
];

export const skills: SkillsCategory = {
  frontend: [
    { name: "React", icon: "⚛️" },
    { name: "React Native", icon: "📱" },
    { name: "Next.js", icon: "▲" },
    { name: "NextAuth.js", icon: "🔑" },
    { name: "TypeScript", icon: "📘" },
    { name: "JavaScript (ES6+)", icon: "✨" },
    { name: "Tailwind CSS", icon: "🎨" },
    { name: "HTML5", icon: "📄" },
    { name: "CSS3", icon: "🎭" },
  ],
  backend: [
    { name: "Node.js", icon: "🟢" },
    { name: "Express.js", icon: "🚀" },
    { name: "MongoDB", icon: "🍃" },
    { name: "MERN Stack", icon: "🌐" },
    { name: "Firebase", icon: "🔥" },
    { name: "REST APIs", icon: "🔗" },
    { name: "Python", icon: "🐍" },
  ],
  tools: [
    { name: "Git & GitHub", icon: "📝" },
    { name: "Docker", icon: "🐳" },
    { name: "AWS", icon: "☁️" },
    { name: "Vercel", icon: "▲" },
    { name: "Postman", icon: "📮" },
    { name: "Figma", icon: "🎯" },
    { name: "VS Code", icon: "💻" },
  ],
};

export const projects: Project[] = [
  {
    id: 1,
    title: "Shahab Ahmad Portfolio",
    category: "Full Stack App",
    description:
      "A sleek and responsive portfolio website for Shahab Ahmad, developed with Next.js and TypeScript, featuring modern UI components and seamless performance.",
    image: Shahab,
    technologies: [
      "Next.js",
      "Email.js",
      "TypeScript",
      "Tailwind CSS",
      "Aceternity Ui",
    ],
    liveUrl: "https://shahabahmad.online/",
    githubUrl: "https://github.com/AliAzeem92/Shahab-Ahmad-Portfolio",
  },
  {
    id: 2,
    title: "Movie Suggestion",
    category: "AI Application",
    description:
      "A movie recommendation app that suggests films based on user preferences, built with React, Node.js, and Tailwind CSS.",
    image: Movie,
    technologies: [
      "React.js",
      "REST API",
      "Node.js",
      "Express.js",
      "Tailwind CSS",
      "TypeScript",
    ],
    liveUrl: "https://ali-azeem-movie-suggestion-app.vercel.app/",
    githubUrl: "https://github.com/AliAzeem92/Movie-Suggestion",
  },
  // {
  //   id: 3,
  //   title: "DevCollab Platform",
  //   category: "SaaS Platform",
  //   description:
  //     "A collaborative workspace for development teams featuring real-time code sharing, project management, and integrated communication tools.",
  //   image: pic,
  //   technologies: ["React", "WebRTC", "Socket.io", "Redis", "Docker"],
  //   features: [
  //     "Real-time collaborative coding",
  //     "Integrated video conferencing",
  //     "Project timeline management",
  //     "Code review automation",
  //   ],
  //   liveUrl: "https://devcollab.tech",
  //   githubUrl: "https://github.com/alexjohnson/devcollab",
  //   metrics: { users: "5K+", performance: "99%", satisfaction: "4.7/5" },
  // },
];

export const socialLinks = [
  {
    icon: Github,
    href: "https://github.com/AliAzeem92",
    label: "GitHub",
    color: "from-gray-600 to-gray-800",
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/ali-azeem-a7694b379/",
    label: "LinkedIn",
    color: "from-blue-600 to-blue-800",
  },
  {
    icon: Mail,
    href: "mailto:aliazeemaliazeem786@gmail.com",
    label: "Email",
    color: "from-purple-600 to-purple-800",
  },
];
