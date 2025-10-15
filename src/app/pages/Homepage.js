"use client"
import React, { useEffect } from "react";
import { Button } from "@mui/material";
import * as motion from "motion/react-client"
import Lottie from 'react-lottie';
import animationData4 from '../animations/give.json';
import InstagramIcon from '@mui/icons-material/Instagram';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import EventIcon from '@mui/icons-material/Event';
import HowItWorksAnimation from "../components/HowItWorksAnimation";
import FeaturedCauses from "../components/Featuredcauses";
import WavyText from "../components/Wavy";

const community = [
  { name: "Social media", icon: <InstagramIcon sx={{ color: "black" }} />, description: "Follow us on social media." },
  { name: "Projects", icon: <FolderCopyIcon sx={{ color: "black" }} />, description: "Find a project you connect with." },
  { name: "Upcoming events", icon: <EventIcon sx={{ color: "black" }} />, description: "Attend our awesome events." }
];

const impactStats = [
  { number: 10000, label: "Items Donated" },
  { number: 5000, label: "People Helped" },
  { number: 500, label: "Active Volunteers" },
  { number: 50, label: "Community Projects" }
];

const donationTypes = [
  {
    title: "Goods Donations",
    description: "Donate clothing, food, electronics, and household items to support families in need in your community."
  },
  {
    title: "Financial Support",
    description: "Contribute funds to help us expand our reach and support more community initiatives and programs."
  },
  {
    title: "Volunteer Services",
    description: "Share your skills and time to make a direct impact through hands-on community service projects."
  }
];

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData4,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

const AnimatedNumber = ({ value }) => {
  const [count, setCount] = React.useState(0);

  useEffect(() => {
    let startTime;
    const duration = 3000; // 3 seconds

    const animateValue = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const currentValue = Math.floor(progress * value);
      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animateValue);
      } else {
        // Ensure we end exactly at the target value
        setCount(value);
      }
    };

    const animationId = requestAnimationFrame(animateValue);
    return () => cancelAnimationFrame(animationId);
  }, [value]);

  return <span>{count}</span>;
};

const Homepage = ({ handlePage }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="relative h-[500px] md:h-[600px] bg-gradient-to-r from-blue-600 to-purple-700">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="pb-10"
          >
            <WavyText />
          </motion.div>
          <motion.p
            className="text-xl md:text-2xl max-w-3xl mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Make a lasting impact in your community by donating goods, cash, or services to those who need it most.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button
              onClick={() => handlePage("Donate")}
              className="rounded-full px-8 py-3 bg-gradient-to-r from-yellow-200 to-yellow-400"
              sx={{
                bgcolor: "transparent",
                color: "white",

                textTransform: "none",
                '&:hover': {
                  bgcolor: "gray.100",
                  scale: 1.05,
                  color: "yellow",
                  transition: "all 0.3s ease-in-out",
                }
              }}
            >
              <div className="text-lg font-bold text-purple-800"> Donate Now</div>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Impact Stats Section */}
      <motion.div
        className="py-12 bg-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Our Collective Impact</h2>
          <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Together, we're building stronger communities and changing lives through the power of giving.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {impactStats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  <AnimatedNumber value={stat.number} />+
                </div>
                <div className="text-gray-700">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      { /* How It Works Section */}
      <motion.div
        className="bg-gradient-to-b from-gray-50 to-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-3 pt-3">How Your Donation Helps</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-gray-600 text-center mb-16 max-w-2xl mx-auto text-lg">
              Every contribution creates ripples of positive change in our community.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
            {donationTypes.map((type, index) => (
              <motion.div
                key={index}
                className="group hover:transform hover:scale-105 transition-all duration-300"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 * index }}
              >
                <div className=" rounded-2xl shadow-xl p-8 h-full border border-gray-100 hover:border-blue-500 transition-colors duration-300">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-xl shadow-md p-4 transform rotate-4 transition-transform hover:rotate-0 duration-300 max-w-72 mx-auto mb-6">
                    <div className="w-32 h-32 mx-auto">
                      <Lottie
                        options={{
                          loop: true,
                          autoplay: true,
                          animationData: index === 0
                            ? require('../animations/goods.json')
                            : index === 1
                              ? require('../animations/cash.json')
                              : require('../animations/service.json'),
                          rendererSettings: {
                            preserveAspectRatio: 'xMidYMid slice'
                          }
                        }}
                      />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-6">{type.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{type.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <h3 className="text-3xl font-bold text-gray-800 mb-8">How It Works</h3>
            <HowItWorksAnimation />
          </motion.div>
        </div>
      </motion.div>

      {/* Community Section */}
      <motion.div
        className="py-10 bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-3">Join Our Community</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-gray-600 text-center mb-16 max-w-2xl mx-auto text-lg">
              Be part of a movement that's making real change happen.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {community.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * index }}
              >
                <Button
                  variant="contained"
                  sx={{
                    background: 'linear-gradient(145deg, #ffffff, #f3f4f6)',
                    boxShadow: '8px 8px 16px #d1d1d1, -8px -8px 16px #ffffff',
                    textTransform: 'none',
                    height: '100%',
                    padding: '2rem',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '12px 12px 20px #d1d1d1, -12px -12px 20px #ffffff',
                    }
                  }}
                  className="flex flex-col items-center w-full rounded-2xl transition-all duration-300"
                >
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <div className="text-2xl font-bold text-gray-800 mb-2">{item.name}</div>
                  <div className="text-gray-600 text-center">{item.description}</div>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Featured Causes Section */}
      <motion.div
        className="py-5 bg-gray-50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Featured Causes</h2>
          <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Discover the current initiatives that need your support.
          </p>
          <FeaturedCauses />
        </div>
      </motion.div>

      {/* Closing Section */}
      <motion.div
        className="py-16 bg-gradient-to-r from-blue-600 to-purple-700 text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.0 }}
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Make a Difference?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of donors who are transforming lives and strengthening communities.
          </p>
          <Lottie
            options={defaultOptions}
            className="mx-auto w-64 h-64"
          />
          <Button
            onClick={() => handlePage("Donate")}
            className="rounded-full px-8 py-3 bg-gradient-to-r from-yellow-200 to-yellow-400"
            sx={{
              bgcolor: "white",
              color: "blue.600",
              textTransform: "none",
              '&:hover': {
                bgcolor: "gray.100",
              }
            }}
          >
            <div className="text-lg font-bold text-purple-800">Start Donating Today</div>
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default Homepage;