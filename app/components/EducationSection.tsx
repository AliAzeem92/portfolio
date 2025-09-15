import React from "react";
import { GraduationCap, Calendar, MapPin, BookOpen, Star } from "lucide-react";

const EducationSection: React.FC = () => {
  const educationData = [
    {
      id: 1,
      degree: "Bachelor of Science in Computer Science",
      institution:
        "Government Graduate College Satiana Road (Peoples Colony # 2)",
      location: "Faisalabad, Pakiatan",
      duration: "2023 - 2027(Continouing)",
      gpa: "3.1/4.0",
      status: "Studying",
      description:
        "Specialized in Software Engineering and Web Development with focus on modern frameworks and algorithms.",
      coursework: [
        "Data Structures & Algorithms",
        "Web Development",
        "Database Systems",
        "Software Engineering",
        "Computer Networks",
        "Machine Learning",
      ],
      color: "from-purple-500 to-blue-500",
    },
    {
      id: 2,
      degree: "Full Stack Web Development Bootcamp",
      institution: "TechloSet Solutions",
      location: "On site - Faisalabad, Pakistan",
      duration: "2024 (Jan) - 2024 (May)",
      status: "Certified",
      description:
        "Intensive 5-month program covering modern web technologies, focusing on React.js, Next.js, React Native and Node.js etc.",
      coursework: [
        "React & Next.js",
        "Node.js & Express",
        "MongoDB & Firebase",
        "TypeScript",
        "Tailwind CSS",
        "RESTful APIs",
        "UI/UX Design Principles",
      ],
      color: "from-green-500 to-teal-500",
    },
    {
      id: 3,
      degree: "Web & Mobile App Development",
      institution: "Saylani Mass IT Training",
      location: "On site - Faisalabad, Pakistan",
      duration: "2022 - 2023",
      status: "Certified",
      description:
        "Comprehensive training program focused on building modern web and mobile applications. Covered both frontend and backend technologies along with hands-on projects.",
      coursework: [
        "HTML, CSS & JavaScript",
        "React.js & Next.js",
        "React Native (Mobile Apps)",
        "Node.js & Express",
        "Firebase",
        "RESTful APIs & State Management",
      ],
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <section id="education" className="px-6 bg-slate-900 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div data-aos="fade-up" className="text-center mb-16">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <GraduationCap className="w-6 h-6 text-purple-400" />
            <span className="text-purple-400 text-sm font-medium tracking-wider uppercase">
              Academic Journey
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Education & Certifications
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            My academic background and professional certifications that laid the
            foundation for my career in technology.
          </p>
        </div>

        {/* Education Timeline */}
        <div className="space-y-12">
          {educationData.map((edu, index) => (
            <div key={edu.id} className="relative">
              {/* Timeline Line */}
              {index !== educationData.length - 1 && (
                <div className="absolute left-6 top-24 w-0.5 h-32 bg-gradient-to-b from-purple-500/50 to-transparent hidden lg:block" />
              )}

              {/* Education Card */}
              <div className="grid lg:grid-cols-12 gap-8 items-start">
                {/* Timeline Dot */}
                <div className="hidden lg:flex lg:col-span-1 justify-center">
                  <div
                    className={`w-12 h-12 rounded-full bg-gradient-to-br ${edu.color} flex items-center justify-center shadow-lg`}
                  >
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* Main Content */}
                <div data-aos="flip-up" className="lg:col-span-11">
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-purple-500/50 transition-all duration-300 group">
                    <div className="grid lg:grid-cols-3 gap-8">
                      {/* Left Column - Basic Info */}
                      <div className="lg:col-span-2 space-y-4">
                        <div className="flex items-start justify-between flex-wrap gap-4">
                          <div>
                            <div className="flex items-center space-x-2 mb-2">
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${edu.color} text-white`}
                              >
                                {edu.status}
                              </span>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                              {edu.degree}
                            </h3>
                            <p className="text-xl text-purple-400 font-semibold mb-1">
                              {edu.institution}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-4 text-sm text-gray-300">
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4 text-blue-400" />
                            <span>{edu.duration}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4 text-green-400" />
                            <span>{edu.location}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            {edu.gpa && (
                              <div className="flex items-center space-x-2">
                                <Star className="w-4 h-4 text-yellow-400" />
                                <span>GPA: {edu.gpa}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        <p className="text-gray-300 leading-relaxed">
                          {edu.description}
                        </p>

                        {/* Key Coursework */}
                        <div>
                          <h4 className="text-white font-semibold mb-3 flex items-center space-x-2">
                            <BookOpen className="w-4 h-4 text-purple-400" />
                            <span>Key Coursework</span>
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {edu.coursework.map((course) => (
                              <span
                                key={course}
                                className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm text-gray-300 border border-white/20 hover:border-purple-400/50 transition-colors"
                              >
                                {course}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Certifications */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">
            Additional Certifications & Learning
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Adobe Premiere Pro",
                provider: "Adobe",
                icon: "🎬",
              },
              {
                name: "Adobe After Effects",
                provider: "Adobe",
                icon: "✨",
              },
              {
                name: "Adobe Photoshop",
                provider: "Adobe",
                icon: "🖌️",
              },
              {
                name: "Creative Video Editing",
                provider: "Online Learning",
                icon: "🎥",
              },
            ].map((cert, index) => (
              <div
                key={index}
                data-aos="flip-up"
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-purple-500/50 transition-all duration-300 group text-center"
              >
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">
                  {cert.icon}
                </div>
                <h4 className="text-white font-semibold mb-1">{cert.name}</h4>
                <p className="text-purple-400 text-sm mb-1">{cert.provider}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
