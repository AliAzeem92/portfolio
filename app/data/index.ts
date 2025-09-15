import { SkillsCategory, Project } from "../types";
import { Mail, Github, Linkedin } from "lucide-react";
import pic from "@/public/me.jpg";

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
    title: "EcoTracker Dashboard",
    category: "Full Stack App",
    description:
      "A comprehensive sustainability tracking platform that helps companies monitor their environmental impact with real-time analytics and reporting.",
    image: pic,
    technologies: ["React", "Node.js", "PostgreSQL", "D3.js", "AWS"],
    features: [
      "Real-time carbon footprint tracking",
      "Interactive data visualizations",
      "Automated report generation",
      "Multi-tenant architecture",
    ],
    liveUrl: "https://ecotracker-demo.com",
    githubUrl: "https://github.com/alexjohnson/ecotracker",
    metrics: { users: "10K+", performance: "98%", satisfaction: "4.8/5" },
  },
  {
    id: 2,
    title: "MindfulChat AI",
    category: "AI Application",
    description:
      "An intelligent mental health companion app powered by advanced NLP, providing personalized support and mood tracking capabilities.",
    image: pic,
    technologies: ["Next.js", "OpenAI API", "Python", "MongoDB", "Stripe"],
    features: [
      "AI-powered conversation analysis",
      "Personalized wellness recommendations",
      "Secure data encryption",
      "Progress tracking & insights",
    ],
    liveUrl: "https://mindfulchat.app",
    githubUrl: "https://github.com/alexjohnson/mindfulchat",
    metrics: { users: "25K+", performance: "96%", satisfaction: "4.9/5" },
  },
  {
    id: 3,
    title: "DevCollab Platform",
    category: "SaaS Platform",
    description:
      "A collaborative workspace for development teams featuring real-time code sharing, project management, and integrated communication tools.",
    image: pic,
    technologies: ["React", "WebRTC", "Socket.io", "Redis", "Docker"],
    features: [
      "Real-time collaborative coding",
      "Integrated video conferencing",
      "Project timeline management",
      "Code review automation",
    ],
    liveUrl: "https://devcollab.tech",
    githubUrl: "https://github.com/alexjohnson/devcollab",
    metrics: { users: "5K+", performance: "99%", satisfaction: "4.7/5" },
  },
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
