import { PrismaClient } from "../app/generated/prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding ...");

  await prisma.hero.upsert({
    where: { id: "000000000000000000000001" },
    update: {
      name: "Ali Azeem",
      tagline: "Hello, I'm",
      bio: "A developer who loves turning ideas into clean, modern, and functional digital experiences...",
      roles: [
        "Full Stack Developer",
        "React Specialist",
        "UI/UX Engineer",
        "Next.js Expert",
      ],
      profileImage: "/me-bgblur.png",
      isAvailable: true,
    },
    create: {
      id: "000000000000000000000001",
      name: "Ali Azeem",
      tagline: "Hello, I'm",
      bio: "A developer who loves turning ideas into clean, modern, and functional digital experiences...",
      roles: [
        "Full Stack Developer",
        "React Specialist",
        "UI/UX Engineer",
        "Next.js Expert",
      ],
      profileImage: "/me-bgblur.png",
      isAvailable: true,
    },
  });

  // About
  await prisma.about.upsert({
    where: { id: "000000000000000000000002" },
    update: {
      bio1: "With over 2 years of experience in full-stack development, I specialize in building scalable web applications that solve real-world problems. My journey began with a curiosity about how things work on the internet, and it has evolved into a passion for creating seamless user experiences.",
      bio2: "I believe in the power of clean code, thoughtful design, and collaborative development. Whether working on a startup MVP or an enterprise-level application, I bring the same level of dedication and attention to detail.",
      projectsCount: "10+",
      yearsExperience: "2+",
      location: "Faisalabad, Pakistan",
      jobTitle: "Full Stack Developer",
      training: "Saylani Mass IT Trained",
      availability: "Available for new projects",
      resumeUrl: "https://drive.usercontent.google.com/u/0/uc?id=1Fm2kNJYUsA7uP8pY1vdu03XNrviuXQII&export=download",
    },
    create: {
      id: "000000000000000000000002",
      bio1: "With over 2 years of experience in full-stack development, I specialize in building scalable web applications that solve real-world problems. My journey began with a curiosity about how things work on the internet, and it has evolved into a passion for creating seamless user experiences.",
      bio2: "I believe in the power of clean code, thoughtful design, and collaborative development. Whether working on a startup MVP or an enterprise-level application, I bring the same level of dedication and attention to detail.",
      projectsCount: "10+",
      yearsExperience: "2+",
      location: "Faisalabad, Pakistan",
      jobTitle: "Full Stack Developer",
      training: "Saylani Mass IT Trained",
      availability: "Available for new projects",
      resumeUrl: "https://drive.usercontent.google.com/u/0/uc?id=1Fm2kNJYUsA7uP8pY1vdu03XNrviuXQII&export=download",
    },
  });

  // Contact
  await prisma.contact.upsert({
    where: { id: "000000000000000000000003" },
    update: {
      email: "aliazeemaliazeem786@gmail.com",
      phone: "+92 321-8515137, +92 310-6104748",
      location: "Faisalabad, Pakistan",
      resumeUrl: "https://drive.usercontent.google.com/u/0/uc?id=1Fm2kNJYUsA7uP8pY1vdu03XNrviuXQII&export=download",
    },
    create: {
      id: "000000000000000000000003",
      email: "aliazeemaliazeem786@gmail.com",
      phone: "+92 321-8515137, +92 310-6104748",
      location: "Faisalabad, Pakistan",
      resumeUrl: "https://drive.usercontent.google.com/u/0/uc?id=1Fm2kNJYUsA7uP8pY1vdu03XNrviuXQII&export=download",
    },
  });

  // Education
  await prisma.education.deleteMany();
  await prisma.education.createMany({
    data: [
      {
        degree: "Bachelor of Science in Computer Science",
        institution: "Government Graduate College Satiana Road (Peoples Colony # 2)",
        location: "Faisalabad, Pakistan",
        duration: "2023 - 2027 (Continuing)",
        gpa: "3.1/4.0",
        status: "Studying",
        description: "Specialized in Software Engineering and Web Development with focus on modern frameworks and algorithms.",
        coursework: ["Data Structures & Algorithms", "Web Development", "Database Systems", "Software Engineering", "Computer Networks", "Machine Learning"],
        color: "from-purple-500 to-blue-500",
        order: 1,
      },
      {
        degree: "Full Stack Web Development Bootcamp",
        institution: "TechloSet Solutions",
        location: "On site - Faisalabad, Pakistan",
        duration: "2024 (Jan) - 2024 (May)",
        status: "Certified",
        description: "Intensive 5-month program covering modern web technologies, focusing on React.js, Next.js, React Native and Node.js etc.",
        coursework: ["React & Next.js", "Node.js & Express", "MongoDB & Firebase", "TypeScript", "Tailwind CSS", "RESTful APIs", "UI/UX Design Principles"],
        color: "from-green-500 to-teal-500",
        order: 2,
      },
      {
        degree: "Web & Mobile App Development",
        institution: "Saylani Mass IT Training",
        location: "On site - Faisalabad, Pakistan",
        duration: "2022 - 2023",
        status: "Certified",
        description: "Comprehensive training program focused on building modern web and mobile applications. Covered both frontend and backend technologies along with hands-on projects.",
        coursework: ["HTML, CSS & JavaScript", "React.js & Next.js", "React Native (Mobile Apps)", "Node.js & Express", "Firebase", "RESTful APIs & State Management"],
        color: "from-orange-500 to-red-500",
        order: 3,
      },
    ],
  });

  // Certificates
  await prisma.certificate.deleteMany();
  await prisma.certificate.createMany({
    data: [
      { name: "Adobe Premiere Pro", provider: "Adobe", icon: "🎬", order: 1 },
      { name: "Adobe After Effects", provider: "Adobe", icon: "✨", order: 2 },
      { name: "Adobe Photoshop", provider: "Adobe", icon: "🖌️", order: 3 },
      { name: "Creative Video Editing", provider: "Online Learning", icon: "🎥", order: 4 },
    ],
  });

  // Projects
  await prisma.project.deleteMany();
  await prisma.project.createMany({
    data: [
      {
        title: "FollowPro - Project Management System",
        category: "Full Stack Web Application",
        description: "A comprehensive MERN stack project management system with role-based access control, JWT authentication, email verification, and real-time task management.",
        image: "/Projects/follow-pro.png",
        technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "Prisma ORM", "JWT Authentication", "Tailwind CSS", "Nodemailer", "Vercel"],
        liveUrl: "https://follow-pro.vercel.app/",
        githubUrl: "https://github.com/AliAzeem92/Follow-Pro-Frontend",
        order: 1,
      },
      {
        title: "Shahab Ahmad Portfolio",
        category: "Full Stack App",
        description: "A sleek and responsive portfolio website for Shahab Ahmad, developed with Next.js and TypeScript, featuring modern UI components and seamless performance.",
        image: "/Projects/Shahab-Portfolio.png",
        technologies: ["Next.js", "Email.js", "TypeScript", "Tailwind CSS", "Aceternity Ui"],
        liveUrl: "https://shahabahmad.online/",
        githubUrl: "https://github.com/AliAzeem92/Shahab-Ahmad-Portfolio",
        order: 2,
      },
      {
        title: "MERN CRUD",
        category: "Web Application",
        description: "A full-stack MERN application that implements Create, Read, Update, and Delete (CRUD) functionality.",
        image: "/Projects/crud.png",
        technologies: ["MongoDB", "Express.js", "React.js", "Node.js", "Tailwind CSS", "TypeScript"],
        liveUrl: "https://aliazeem-crudverse.vercel.app/",
        githubUrl: "https://github.com/AliAzeem92/MERN-STACK-CRUD",
        order: 3,
      },
      {
        title: "Movie Suggestion",
        category: "AI Application",
        description: "A movie recommendation app that suggests films based on user preferences, built with React, Node.js, and Tailwind CSS.",
        image: "/Projects/movie-suggestion.png",
        technologies: ["React.js", "REST API", "Node.js", "Express.js", "Tailwind CSS", "TypeScript"],
        liveUrl: "https://ali-azeem-movie-suggestion-app.vercel.app/",
        githubUrl: "https://github.com/AliAzeem92/Movie-Suggestion",
        order: 4,
      },
      {
        title: "Currency Converter",
        category: "AI Application",
        description: "A real-time currency converter that allows users to convert between multiple currencies using live exchange rates.",
        image: "/Projects/CurrencyConverter.jpg",
        technologies: ["React.js", "REST API", "Tailwind CSS", "TypeScript"],
        liveUrl: "https://my-currency-exchanger-18.vercel.app/",
        githubUrl: "https://github.com/AliAzeem92/Movie-Suggestion",
        order: 5,
      },
    ],
  });

  // Skills
  await prisma.skill.deleteMany();
  await prisma.skill.createMany({
    data: [
      { name: "React", icon: "⚛️", category: "frontend", order: 1 },
      { name: "React Native", icon: "📱", category: "frontend", order: 2 },
      { name: "Next.js", icon: "▲", category: "frontend", order: 3 },
      { name: "NextAuth.js", icon: "🔑", category: "frontend", order: 4 },
      { name: "TypeScript", icon: "📘", category: "frontend", order: 5 },
      { name: "JavaScript (ES6+)", icon: "✨", category: "frontend", order: 6 },
      { name: "Tailwind CSS", icon: "🎨", category: "frontend", order: 7 },
      { name: "HTML5", icon: "📄", category: "frontend", order: 8 },
      { name: "CSS3", icon: "🎭", category: "frontend", order: 9 },
      { name: "Node.js", icon: "🟢", category: "backend", order: 1 },
      { name: "Express.js", icon: "🚀", category: "backend", order: 2 },
      { name: "MongoDB", icon: "🍃", category: "backend", order: 3 },
      { name: "MERN Stack", icon: "🌐", category: "backend", order: 4 },
      { name: "Firebase", icon: "🔥", category: "backend", order: 5 },
      { name: "REST APIs", icon: "🔗", category: "backend", order: 6 },
      { name: "Python", icon: "🐍", category: "backend", order: 7 },
      { name: "Git & GitHub", icon: "📝", category: "tools", order: 1 },
      { name: "Docker", icon: "🐳", category: "tools", order: 2 },
      { name: "AWS", icon: "☁️", category: "tools", order: 3 },
      { name: "Vercel", icon: "▲", category: "tools", order: 4 },
      { name: "Postman", icon: "📮", category: "tools", order: 5 },
      { name: "Figma", icon: "🎯", category: "tools", order: 6 },
      { name: "VS Code", icon: "💻", category: "tools", order: 7 },
    ],
  });

  // Social Links
  await prisma.socialLink.deleteMany();
  await prisma.socialLink.createMany({
    data: [
      { label: "GitHub", href: "https://github.com/AliAzeem92", icon: "Github", color: "from-gray-600 to-gray-800", order: 1 },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/ali-azeem-a7694b379/", icon: "Linkedin", color: "from-blue-600 to-blue-800", order: 2 },
      { label: "Email", href: "mailto:aliazeemaliazeem786@gmail.com", icon: "Mail", color: "from-purple-600 to-purple-800", order: 3 },
    ],
  });

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
