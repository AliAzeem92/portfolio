"use client";

import React from "react";
import {
  User,
  MapPin,
  Briefcase,
  Award,
  Calendar,
  Download,
} from "lucide-react";
import Link from "next/link";

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 px-6 bg-slate-900 relative">
      <div className="max-w-6xl mx-auto">
        <div data-aos="fade-up" className="text-center mb-16">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <User className="w-6 h-6 text-purple-400" />
            <span className="text-purple-400 text-sm font-medium tracking-wider uppercase">
              About Me
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Passionate About Creating Something Amazing
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div data-aos="fade-right" className="space-y-6">
            <p className="text-lg text-gray-300 leading-relaxed">
              With over 2 years of experience in full-stack development, I
              specialize in building scalable web applications that solve
              real-world problems. My journey began with a curiosity about how
              things work on the internet, and it has evolved into a passion for
              creating seamless user experiences.
            </p>

            <p className="text-lg text-gray-300 leading-relaxed">
              I believe in the power of clean code, thoughtful design, and
              collaborative development. Whether working on a startup MVP or an
              enterprise-level application, I bring the same level of dedication
              and attention to detail.
            </p>

            <div className="grid grid-cols-2 gap-6 mt-8">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="text-3xl font-bold text-purple-400 mb-2">
                  10+
                </div>
                <div className="text-gray-300">Projects Completed</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="text-3xl font-bold text-blue-400 mb-2">2+</div>
                <div className="text-gray-300">Years Experience</div>
              </div>
            </div>
          </div>

          <div data-aos="fade-left" className="relative">
            <div
              className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-2xl p-8 backdrop-blur-sm border border-white/10 shadow-lg shadow-purple-500/10 
                  transform transition-all duration-500 hover:scale-[1.02] hover:shadow-purple-500/20 animate-fadeIn"
            >
              <div className="space-y-4">
                <div className="flex items-center space-x-3 group">
                  <MapPin className="w-5 h-5 text-purple-400 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" />
                  <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                    Faisalabad, Pakistan
                  </span>
                </div>

                <div className="flex items-center space-x-3 group">
                  <Briefcase className="w-5 h-5 text-blue-400 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300" />
                  <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                    Full Stack Developer
                  </span>
                </div>

                <div className="flex items-center space-x-3 group">
                  <Award className="w-5 h-5 text-yellow-400 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" />
                  <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                    Saylani Mass IT Trained
                  </span>
                </div>

                <div className="flex items-center space-x-3 group">
                  <Calendar className="w-5 h-5 text-green-400 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300" />
                  <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                    Available for new projects
                  </span>
                </div>
              </div>

              <div className="mt-8">
                <Link
                  href="https://drive.usercontent.google.com/u/0/uc?id=1Fm2kNJYUsA7uP8pY1vdu03XNrviuXQII&export=download"
                  download="Ali_Azeem_CV.pdf"
                  className="group bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 px-6 py-3 rounded-lg transition-all duration-500 flex items-center space-x-2 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20"
                >
                  <Download className="w-5 h-5 animate-bounce " />
                  <span className="group-hover:text-purple-300 transition-colors duration-300">
                    Download Resume
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
