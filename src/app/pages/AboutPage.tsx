"use client";

import * as motion from "motion/react-client"

/* -------------------------- MUI -------------------------- */
import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Badge,
  Typography,
  Box,
  Container,
} from "@mui/material";

/* ------------------------ Local data --------------------- */
import { team } from "../data/about";
import { fadeInUp, stagger } from "../animations/about";
import { Colors } from "../supabase";

/* =========================================================
   AboutPage – with blue‑purple banner and a working Lottie
   ========================================================= */

// Team member interface
interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  avatar: string;
}

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* -----------------------------------------------------------------
           1️⃣  Hero Banner Section
           ----------------------------------------------------------------- */}
      <div className="relative h-[400px] md:h-[500px] gradient-hero overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-white bg-opacity-10 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-24 h-24 bg-white bg-opacity-10 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-white bg-opacity-5 rounded-full animate-pulse delay-500"></div>
        </div>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black opacity-40"></div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
          {/* Main title with enhanced animation */}
          <motion.div
            initial={{ opacity: 0, y: -30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            className="mb-6"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              About Us
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full mx-auto"></div>
          </motion.div>

          {/* Subtitle with staggered animation */}
          <motion.p
            className="text-xl md:text-2xl max-w-4xl leading-relaxed"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Learn more about our mission, the incredible people behind the project,
            and how we're creating lasting impact in communities worldwide.
          </motion.p>

          {/* Call to action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-8"
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-6 py-3 border border-white border-opacity-30">
                <span className="text-white font-medium">Join our community of changemakers</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* -----------------------------------------------------------------
           2️⃣  Main Content Section
           ----------------------------------------------------------------- */}
      <motion.main
        className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50"
        initial="hidden"
        animate="visible"
        variants={stagger}
      >
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-20"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-orange-200 to-pink-200 rounded-full opacity-20"></div>
        </div>

        <Container maxWidth="lg" className="relative z-10 py-16">
          {/* ---------- Our Story Section ---------- */}
          <motion.div
            className="text-center mb-20"
            variants={fadeInUp}
          >
            <div className="inline-flex items-center bg-white rounded-full px-6 py-2 shadow-md border border-blue-100 mb-6">
              <span className="text-blue-600 font-semibold text-sm uppercase tracking-wide">Our Story</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              From Vision to <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Impact</span>
            </h2>

            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
              What started as a handful of passionate volunteers has grown into a global community
              of changemakers. We're driven by transparency, collaboration, and measurable impact
              that transforms lives and strengthens communities.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
              {[
                { number: "10K+", label: "Lives Impacted" },
                { number: "500+", label: "Active Volunteers" },
                { number: "50+", label: "Community Projects" },
                { number: "25+", label: "Partner Organizations" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 * index }}
                >
                  <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ---------- Team Section ---------- */}
          <motion.div
            className="mb-20"
            variants={fadeInUp}
          >
            <div className="text-center mb-12">
              <motion.div
                className="inline-flex items-center bg-gradient-to-r from-blue-100 to-purple-100 rounded-full px-6 py-2 shadow-md mb-6"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-blue-700 font-semibold text-sm uppercase tracking-wide">Our Team</span>
              </motion.div>

              <motion.h2
                className="text-4xl md:text-5xl font-bold text-gray-800 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Meet the <motion.span
                  className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{ backgroundSize: '200% 200%' }}
                >
                  Dream Team
                </motion.span>
              </motion.h2>

              <motion.p
                className="text-lg text-gray-600 max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Passionate individuals dedicated to creating positive change in our communities.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {team.map((member: TeamMember, index) => (
                <motion.div
                  key={member.id}
                  className="group cursor-pointer"
                  initial={{ opacity: 0, y: 50, rotateY: -15 }}
                  animate={{ opacity: 1, y: 0, rotateY: 0 }}
                  transition={{
                    delay: 0.1 * index,
                    duration: 0.8,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{
                    y: -5,
                    transition: { duration: 0.3 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-blue-200 relative"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Animated background gradient */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      initial={false}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    />

                    {/* Avatar section */}
                    <div className="relative h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center overflow-hidden">
                      <motion.div
                        className="relative"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.div
                          className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg border-4 border-white"
                          whileHover={{
                            boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)"
                          }}
                        >
                          <motion.span
                            className="text-3xl font-bold text-blue-600"
                            animate={{
                              scale: [1, 1.1, 1],
                              rotate: [0, 5, -5, 0]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          >
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </motion.span>
                        </motion.div>

                        {/* Animated online indicator */}
                        <motion.div
                          className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-4 border-white"
                          animate={{
                            scale: [1, 1.2, 1],
                            boxShadow: [
                              "0 0 0 0 rgba(34, 197, 94, 0.7)",
                              "0 0 0 10px rgba(34, 197, 94, 0)",
                              "0 0 0 0 rgba(34, 197, 94, 0)"
                            ]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                      </motion.div>

                      {/* Floating particles */}
                      <motion.div
                        className="absolute top-4 right-4 w-2 h-2 bg-blue-400 rounded-full opacity-60"
                        animate={{
                          y: [0, -10, 0],
                          opacity: [0.6, 1, 0.6]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: index * 0.5
                        }}
                      />
                      <motion.div
                        className="absolute bottom-6 left-6 w-1.5 h-1.5 bg-purple-400 rounded-full opacity-60"
                        animate={{
                          y: [0, 8, 0],
                          opacity: [0.6, 1, 0.6]
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: index * 0.3 + 1
                        }}
                      />
                    </div>

                    {/* Content section */}
                    <div className="relative p-6">
                      <motion.h3
                        className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-700 transition-colors duration-300"
                        whileHover={{ scale: 1.05 }}
                      >
                        {member.name}
                      </motion.h3>

                      <motion.div
                        className="inline-flex items-center bg-gradient-to-r from-blue-100 to-purple-100 rounded-full px-4 py-1 mb-4"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      >
                        <motion.span
                          className="text-sm font-semibold text-blue-700"
                          animate={{
                            color: ['#1e40af', '#7c3aed', '#1e40af']
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          {member.role}
                        </motion.span>
                      </motion.div>

                      <motion.p
                        className="text-gray-600 leading-relaxed"
                        initial={{ opacity: 0.8 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        {member.bio}
                      </motion.p>

                      {/* Animated social links */}
                      <div className="flex space-x-3 mt-4">
                        {['linkedin', 'twitter', 'email'].map((social, socialIndex) => (
                          <motion.div
                            key={social}
                            className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-100 transition-colors duration-200 cursor-pointer"
                            whileHover={{
                              scale: 1.2,
                              rotate: 360,
                              backgroundColor: "#dbeafe"
                            }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                          >
                            <motion.span
                              className="text-xs text-gray-600 font-bold"
                              animate={{
                                color: socialIndex === 0 ? ['#666', '#0077b5', '#666'] :
                                       socialIndex === 1 ? ['#666', '#1da1f2', '#666'] :
                                       ['#666', '#ea4335', '#666']
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: socialIndex * 0.5
                              }}
                            >
                              {social === 'linkedin' ? 'in' : social === 'twitter' ? 't' : '@'}
                            </motion.span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ---------- Mission Section ---------- */}
          <motion.div
            className="text-center"
            variants={fadeInUp}
          >
            <div className="bg-white rounded-3xl shadow-xl p-12 border border-gray-100">
              <div className="inline-flex items-center bg-gradient-to-r from-orange-100 to-pink-100 rounded-full px-6 py-2 shadow-md mb-6">
                <span className="text-orange-700 font-semibold text-sm uppercase tracking-wide">Our Mission</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8">
                Creating Lasting <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">Change</span>
              </h2>

              <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {[
                  {
                    icon: "🚀",
                    title: "Empower",
                    description: "Provide tools, resources and mentorship to underserved communities worldwide."
                  },
                  {
                    icon: "📚",
                    title: "Educate",
                    description: "Knowledge sharing is at the heart of our programs and community initiatives."
                  },
                  {
                    icon: "✨",
                    title: "Inspire",
                    description: "Every donation and volunteer hour fuels the next generation of changemakers."
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="text-center group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 * index }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-orange-600 transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </motion.div>
                ))}
              </div>

              {/* Call to action */}
              <motion.div
                className="mt-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
                  <h3 className="text-2xl font-bold mb-4">Ready to Join Our Mission?</h3>
                  <p className="mb-6 opacity-90">Be part of something bigger. Your contribution matters.</p>
                  <button className="bg-white text-blue-600 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
                    Get Involved Today
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </Container>
      </motion.main>
    </div>
  );
}