"use client"
import React, { useEffect, useState } from "react";
import * as motion from "motion/react-client"
// import { useAuth } from "../authContext";

// Interfaces for data types
interface SocialMediaPost {
  id: number;
  username: string;
  content: string;
  image: string;
  likes: number;
  comments: number;
}

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  progress: number;
  volunteers: number;
}

interface UpcomingEvent {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
  image: string;
}

interface Video {
  id: number;
  title: string;
  youtubeId: string;
  duration: string;
}

interface CommunityPageProps {
  handlePage: (page: string) => void;
}

interface User {
  id: string;
  email?: string;
  user_metadata?: {
    name?: string;
  };
}

const CommunityPage = ({ handlePage }: CommunityPageProps) => {
  // Get auth context - temporarily disabled
  // const { user }: { user: User | null } = useAuth();
  const user = null; // Mock user state for now

  // Mock data for community content
  const socialMediaPosts: SocialMediaPost[] = [
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

  const projects: Project[] = [
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

  const upcomingEvents: UpcomingEvent[] = [
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

  const videos: Video[] = [
    {
      id: 1,
      title: "Community Garden Tour",
      youtubeId: "dQw4w9WgXcQ", // Example YouTube video ID
      duration: "3:45"
    },
    {
      id: 2,
      title: "Volunteer Spotlight: Maria's Story",
      youtubeId: "dQw4w9WgXcQ", // Example YouTube video ID
      duration: "5:22"
    }
  ];

  // State for video modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Video modal handlers
  const openVideoModal = (video: Video) => {
    setCurrentVideo(video);
    setIsModalOpen(true);
  };

  const closeVideoModal = () => {
    setIsModalOpen(false);
    setCurrentVideo(null);
  };

  // VideoModal component
  const VideoModal = () => {
    if (!isModalOpen || !currentVideo) return null;

    return (
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={closeVideoModal}
      >
        <motion.div
          className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center p-4 border-b">
            <h3 className="text-xl font-bold text-gray-800">{currentVideo.title}</h3>
            <button
              onClick={closeVideoModal}
              className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              ×
            </button>
          </div>
          <div className="relative pb-[56.25%] h-0">
            <iframe
              src={`https://www.youtube.com/embed/${currentVideo.youtubeId}?autoplay=1`}
              className="absolute top-0 left-0 w-full h-full"
              frameBorder={0}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={currentVideo.title}
            />
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="relative h-96 gradient-hero">
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
          {!user && (
            <motion.button
              onClick={() => handlePage('Login')}
              className="bg-white text-blue-600 font-bold py-3 px-8 rounded-full text-lg hover:bg-gray-100 transition duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Join Us Today
            </motion.button>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Social Media Section */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Community Stories
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See how our community members are making a difference every day
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {socialMediaPosts.map((post, index) => (
              <motion.div
                key={post.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-blue-200 transform hover:-translate-y-1"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                {/* Header with avatar and user info */}
                <div className="p-6 pb-4">
                  <div className="flex items-center mb-4">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                        <span className="text-blue-600 font-bold text-lg">
                          {post.username.charAt(1).toUpperCase()}
                        </span>
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white"></div>
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="font-bold text-gray-800 text-lg">{post.username}</h3>
                      <p className="text-gray-500 text-sm flex items-center">
                        <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                        Active now
                      </p>
                    </div>
                    <div className="text-gray-400">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
                      </svg>
                    </div>
                  </div>

                  {/* Content */}
                  <p className="text-gray-700 mb-4 leading-relaxed">{post.content}</p>
                </div>

                {/* Image placeholder with overlay */}
                <div className="relative px-6 pb-6">
                  <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl w-full h-48 flex items-center justify-center border-2 border-dashed border-gray-300 group-hover:border-blue-300 transition-colors duration-300">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <p className="text-gray-500 text-sm">Community Photo</p>
                    </div>
                  </div>
                </div>

                {/* Engagement stats */}
                <div className="px-6 pb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                      <button className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors duration-200 group">
                        <div className="p-2 rounded-full group-hover:bg-red-50 transition-colors duration-200">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        </div>
                        <span className="font-medium">{post.likes}</span>
                      </button>

                      <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors duration-200 group">
                        <div className="p-2 rounded-full group-hover:bg-blue-50 transition-colors duration-200">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                        </div>
                        <span className="font-medium">{post.comments}</span>
                      </button>
                    </div>

                    <button className="text-gray-400 hover:text-gray-600 transition-colors duration-200">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Projects Section */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Community Projects
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join ongoing initiatives that are transforming our community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-green-200 transform hover:-translate-y-1"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                {/* Project image placeholder */}
                <div className="relative h-48 bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center border-b border-gray-100">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                      <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <p className="text-gray-500 text-sm font-medium">Project Image</p>
                  </div>
                  {/* Status badge */}
                  <div className="absolute top-4 right-4 bg-white bg-opacity-90 backdrop-blur-sm rounded-full px-3 py-1">
                    <span className={`text-xs font-semibold ${
                      project.progress === 100 ? 'text-green-600' :
                      project.progress >= 75 ? 'text-blue-600' :
                      project.progress >= 50 ? 'text-yellow-600' : 'text-orange-600'
                    }`}>
                      {project.progress === 100 ? 'Complete' :
                       project.progress >= 75 ? 'Almost Done' :
                       project.progress >= 50 ? 'In Progress' : 'Starting'}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-green-700 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{project.description}</p>

                  {/* Progress section */}
                  <div className="mb-6">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span className="font-medium">Progress</span>
                      <span className="font-bold text-green-600">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Stats and CTA */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-600">
                      <div className="flex items-center bg-blue-50 rounded-full px-3 py-1">
                        <svg className="w-4 h-4 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span className="text-sm font-medium">{project.volunteers}</span>
                      </div>
                    </div>

                    <button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg">
                      Join Project
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Videos Section */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Community Videos
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Watch inspiring stories and learn about our community's impact
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {videos.map((video, index) => (
              <motion.div
                key={video.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-red-200 transform hover:-translate-y-1"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <div className="relative cursor-pointer overflow-hidden" onClick={() => openVideoModal(video)}>
                  {/* Video thumbnail */}
                  <div className="relative h-64 bg-gradient-to-br from-red-100 to-pink-100 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
                        <svg className="w-10 h-10 text-red-500 ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                      <p className="text-gray-500 text-sm font-medium">YouTube Video</p>
                      <p className="text-gray-400 text-xs mt-1">{video.duration}</p>
                    </div>

                    {/* Play button overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                      <div className="bg-red-600 text-white rounded-full p-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100 shadow-2xl">
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>

                    {/* Duration badge */}
                    <div className="absolute bottom-4 right-4 bg-black bg-opacity-80 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                      {video.duration}
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-red-700 transition-colors duration-300 leading-tight">
                    {video.title}
                  </h3>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-500 text-sm">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                      <span>Verified Content</span>
                    </div>

                    <button
                      onClick={() => openVideoModal(video)}
                      className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center"
                    >
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                      Watch Now
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Upcoming Events Section */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Upcoming Events
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join us for community gatherings and make new connections
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={event.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-purple-200 transform hover:-translate-y-1"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                {/* Event image placeholder */}
                <div className="relative h-48 bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center border-b border-gray-100">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                      <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p className="text-gray-500 text-sm font-medium">Community Event</p>
                  </div>

                  {/* Date badge */}
                  <div className="absolute top-4 right-4 bg-white bg-opacity-90 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        {new Date(event.date.split(',')[1]?.trim() || event.date).getDate()}
                      </div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide">
                        {new Date(event.date.split(',')[1]?.trim() || event.date).toLocaleDateString('en-US', { month: 'short' })}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-purple-700 transition-colors duration-300 leading-tight">
                    {event.title}
                  </h3>

                  {/* Date and location */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-600">
                      <div className="w-5 h-5 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                        <svg className="w-3 h-3 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <span className="text-sm font-medium">{event.date}</span>
                    </div>

                    <div className="flex items-center text-gray-600">
                      <div className="w-5 h-5 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                        <svg className="w-3 h-3 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <span className="text-sm font-medium">{event.location}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-6 leading-relaxed">{event.description}</p>

                  <button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Add to Calendar
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>

      {/* Video Modal */}
      <VideoModal />
    </div>
  );
}

export default CommunityPage;