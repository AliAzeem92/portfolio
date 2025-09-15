"use client";

import React from "react";
import { Mail, Phone, MapPin, Download } from "lucide-react";
import { socialLinks } from "../data";
import Link from "next/link";
import ContactForm from "./ContactForm";

const ContactSection: React.FC = () => {
  return (
    <section
      id="contact"
      className="py-20 px-6 bg-gradient-to-b from-slate-800 to-slate-900 relative"
    >
      <div className="max-w-4xl mx-auto">
        <div data-aos="fade-up" className="text-center mb-16">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Mail className="w-6 h-6 text-purple-400" />
            <span className="text-purple-400 text-sm font-medium tracking-wider uppercase">
              Get In Touch
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Let&apos;s Build Something Amazing
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Ready to bring your ideas to life? I&apos;m always excited to work
            on new projects and collaborate with fellow innovators.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div
              data-aos="fade-down"
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
            >
              <h3 className="text-2xl font-bold text-white mb-6">
                Contact Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">Email</div>
                    <div className="text-white">
                      aliazeemaliazeem786@gmail.com
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">Phone</div>
                    <div className="text-white">
                      +92 321-8515137, +92 310-6104748
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">Location</div>
                    <div className="text-white">Faisalabad, Pakistan</div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-8">
                <h4 className="text-white font-semibold mb-4">
                  Connect With Me
                </h4>
                <div className="flex space-x-4">
                  {socialLinks.map(({ icon: Icon, href, label, color }) => (
                    <Link
                      key={label}
                      href={href}
                      target="_blank"
                      className={`group w-12 h-12 bg-gradient-to-br ${color} rounded-lg flex items-center justify-center text-white hover:scale-110 transition-all duration-300 hover:shadow-lg`}
                      aria-label={label}
                    >
                      <Icon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Resume Download */}
            <div
              data-aos="fade-up"
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
            >
              <h3 className="text-2xl font-bold text-white mb-4">Resume</h3>
              <p className="text-gray-400 mb-6">
                Download my complete resume to learn more about my experience,
                education, and technical skills.
              </p>
              <Link
                href="https://drive.usercontent.google.com/u/0/uc?id=1zD_F6SeUrQt1hIyC7k2_DnAV0rA95oEB&export=download"
                download="Ali_Azeem_CV.pdf"
                className="group bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center space-x-2 w-full justify-center"
              >
                <Download className="w-5 h-5 animate-bounce" />
                <span>Download Resume (PDF)</span>
              </Link>
            </div>
          </div>

          {/* Contact Form */}
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
