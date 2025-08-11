"use client"
import React, { useEffect } from "react";
import { Colors } from "../supabase";
import * as motion from "motion/react-client"
import Image from "next/image";

const CommunityPage = () => {
  // Mock data for community content
  const socialMediaPosts = [
    {
      id: 1,
      username: "@community_hero",
      content: "Another successful donation drive! Thank you to everyone who contributed. Together we're making a difference in our neighborhood.",
      image: "/placeholder-social-1.jpg",
      likes: 124,
      comments: 28
    },
    {
      id: 2,
      username: "@volunteer_star",
      content: "Volunteering at the local shelter today. The smiles on the children's faces are priceless! #CommunityLove #VolunteerLife",
      image: "/placeholder-social-2.jpg",
      likes: 89,
      comments: 15
    },
    {
      id: 3,
      username: "@helping_hands",
      content: "Just dropped off supplies at the community center. It's amazing what we can accomplish when we work together!",
      image: "/placeholder-social-3.jpg",
      likes: 67,
      comments: 9
    }
  ];

  const projects = [
    {
      id: 1,
      title: "Neighborhood Garden Project",
      description: "Transforming vacant lots into beautiful community gardens where neighbors can grow fresh produce together.",
      image: "/placeholder-project-1.jpg",
      progress: 75,
      volunteers: 42
    },
    {
      id: 2,
      title: "Youth Mentorship Program",
      description: "Connecting local high school students with professionals in various fields for guidance and career exploration.",
      image: "/placeholder-project-2.jpg",
      progress: 40,
      volunteers: 28
    },
    {
      id: 3,
      title: "Senior Support Network",
      description: "Providing regular check-ins, grocery delivery, and companionship for elderly community members.",
      image: "/placeholder-project-3.jpg",
      progress: 90,
      volunteers: 35
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Community Cleanup Day",
      date: "Sat, Oct 15 @ 9:00 AM",
      location: "Riverside Park",
      description: "Join us for a day of cleaning up our local park and making it beautiful for families to enjoy.",
      image: "/placeholder-event-1.jpg"
    },
    {
      id: 2,
      title: "Charity Fundraiser Gala",
      date: "Fri, Nov 4 @ 6:30 PM",
      location: "Community Center",
      description: "An evening of dinner, entertainment, and fundraising for local families in need this holiday season.",
      image: "/placeholder-event-2.jpg"
    },
    {
      id: 3,
      title: "Kids & Families Fun Run",
      date: "Sun, Nov 20 @ 8:00 AM",
      location: "Downtown Streets",
      description: "A 5K fun run/walk for the whole family to promote health and community spirit.",
      image: "/placeholder-event-3.jpg"
    }
  ];

  const videos = [
    {
      id: 1,
      title: "Community Garden Tour",
      thumbnail: "/placeholder-video-1.jpg",
      duration: "3:45"
    },
    {
      id: 2,
      title: "Volunteer Spotlight: Maria's Story",
      thumbnail: "/placeholder-video-2.jpg",
      duration: "5:22"
    }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Welcome to Our Community
          </motion.h1>
          <motion.p
            className="text-xl max-w-2xl mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Where neighbors become friends and together we make a difference
          </motion.p>
          <motion.button
            className="bg-white text-blue-600 font-bold py-3 px-8 rounded-full text-lg hover:bg-gray-100 transition duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Join Us Today
          </motion.button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Social Media Section */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Social Media Highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {socialMediaPosts.map((post, index) => (
              <motion.div
                key={post.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                    <div className="ml-4">
                      <h3 className="font-bold text-gray-800">{post.username}</h3>
                      <p className="text-gray-600 text-sm">Posted just now</p>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4">{post.content}</p>
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-48 mb-4" />
                  <div className="flex justify-between text-gray-600">
                    <span>❤️ {post.likes} likes</span>
                    <span>💬 {post.comments} comments</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Projects Section */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Community Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-48" />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">👥 {project.volunteers} volunteers</span>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition duration-300">
                      Learn More
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Videos Section */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Community Videos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {videos.map((video, index) => (
              <motion.div
                key={video.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <div className="relative">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-64" />
                  <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white px-2 py-1 rounded">
                    {video.duration}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{video.title}</h3>
                  <button className="mt-4 bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-lg transition duration-300 flex items-center">
                    <span>▶</span>
                    <span className="ml-2">Watch Video</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Upcoming Events Section */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={event.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-48" />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{event.title}</h3>
                  <div className="flex items-center text-gray-600 mb-2">
                    <span>📅</span>
                    <span className="ml-2">{event.date}</span>
                  </div>
                  <div className="flex items-center text-gray-600 mb-3">
                    <span>📍</span>
                    <span className="ml-2">{event.location}</span>
                  </div>
                  <p className="text-gray-600 mb-4">{event.description}</p>
                  <button className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-lg transition duration-300">
                    Add to Calendar
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}

export default CommunityPage;