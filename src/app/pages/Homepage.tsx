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

// Interfaces
interface CommunityItem {
  name: string;
  icon: React.ReactNode;
  description: string;
}

interface ImpactStat {
  number: number;
  label: string;
}

interface DonationType {
  title: string;
  description: string;
}

interface LottieOptions {
  loop: boolean;
  autoplay: boolean;
  animationData: any;
  rendererSettings: {
    preserveAspectRatio: string;
  };
}

interface AnimatedNumberProps {
  value: number;
}

const community: CommunityItem[] = [
  { name: "Social media", icon: <InstagramIcon sx={{ color: "black" }} />, description: "Follow us on social media." },
  { name: "Projects", icon: <FolderCopyIcon sx={{ color: "black" }} />, description: "Find a project you connect with." },
  { name: "Upcoming events", icon: <EventIcon sx={{ color: "black" }} />, description: "Attend our awesome events." }
];

const impactStats: ImpactStat[] = [
  { number: 10000, label: "Items Donated" },
  { number: 5000, label: "People Helped" },
  { number: 500, label: "Active Volunteers" },
  { number: 50, label: "Community Projects" }
];

const donationTypes: DonationType[] = [
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

const defaultOptions: LottieOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData4,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

const AnimatedNumber = ({ value }: AnimatedNumberProps) => {
  const [count, setCount] = React.useState(0);

  useEffect(() => {
    let startTime: number;
    const duration = 3000; // 3 seconds

    const animateValue = (timestamp: number) => {
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

interface HomepageProps {
  handlePage: (page: string) => void;
}

const Homepage = ({ handlePage }: HomepageProps) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen theme-bg-primary">
      {/* Hero Section */}
      <div className="relative h-[500px] md:h-[600px] gradient-hero">
        <div className="absolute inset-0 bg-black opacity-20"></div>
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
              className="group relative overflow-hidden bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-400 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              sx={{
                textTransform: "none",
                fontSize: "18px",
                paddingX: "32px",
                paddingY: "12px",
                borderRadius: "12px",
                color: "white",
                border: "none",
                background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
                '&:hover': {
                  background: "linear-gradient(135deg, #ea580c 0%, #dc2626 100%)",
                  transform: "translateY(-2px) scale(1.05)",
                  boxShadow: "0 20px 40px rgba(249, 115, 22, 0.4)",
                },
                '&::before': {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: "-100%",
                  width: "100%",
                  height: "100%",
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                  transition: "left 0.5s",
                },
                '&:hover::before': {
                  left: "100%",
                }
              }}
            >
              <span className="relative z-10 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Donate Now
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Impact Stats Section */}
      <motion.div
        className="py-16 theme-bg-secondary"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold theme-text-primary mb-4">Our Collective Impact</h2>
            <div className="w-24 h-1 gradient-primary mx-auto mb-6"></div>
            <p className="text-xl theme-text-secondary max-w-3xl mx-auto">
              Together, we're building stronger communities and changing lives through the power of giving.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {impactStats.map((stat, index) => (
              <motion.div
                key={index}
                className="modern-card text-center p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <div className="text-4xl md:text-5xl font-bold theme-text-primary mb-3">
                  <AnimatedNumber value={stat.number} />+
                </div>
                <div className="theme-text-secondary font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      { /* How It Works Section */}
      <motion.div
        className="gradient-section py-20"
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
            <h2 className="text-4xl font-bold text-center theme-text-primary mb-3 pt-3">How Your Donation Helps</h2>
            <div className="w-24 h-1 gradient-primary mx-auto mb-6"></div>
            <p className="theme-text-secondary text-center mb-16 max-w-2xl mx-auto text-xl">
              Every contribution creates ripples of positive change in our community.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {donationTypes.map((type, index) => (
              <motion.div
                key={index}
                className="group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * index }}
                whileHover={{ y: -8 }}
              >
                <div className="modern-card-interactive p-8 h-full">
                  <div className="gradient-primary rounded-2xl shadow-lg p-6 transform rotate-2 transition-transform duration-300 hover:rotate-0 max-w-80 mx-auto mb-8">
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
                  <h3 className="text-2xl font-bold theme-text-primary mb-4 mt-6 text-center">{type.title}</h3>
                  <p className="theme-text-secondary leading-relaxed text-center">{type.description}</p>
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
        className="py-16 theme-bg-card"
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
            <h2 className="text-4xl font-bold text-center theme-text-primary mb-3">Join Our Community</h2>
            <div className="w-24 h-1 gradient-primary mx-auto mb-6"></div>
            <p className="theme-text-secondary text-center mb-16 max-w-2xl mx-auto text-xl">
              Be part of a movement that's making real change happen.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {community.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * index }}
              >
                <div className="modern-card-interactive flex flex-col items-center w-full h-full p-8 text-center">
                  <div className="text-5xl mb-6 theme-text-primary">{item.icon}</div>
                  <h3 className="text-2xl font-bold theme-text-primary mb-3">{item.name}</h3>
                  <p className="theme-text-secondary">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Featured Causes Section */}
      <motion.div
        className="py-16 theme-bg-secondary"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold theme-text-primary mb-4">Featured Causes</h2>
            <div className="w-24 h-1 gradient-primary mx-auto mb-6"></div>
            <p className="theme-text-secondary max-w-3xl mx-auto text-lg">
              Discover the current initiatives that need your support.
            </p>
          </div>
          <FeaturedCauses />
        </div>
      </motion.div>

      {/* Closing Section */}
      <motion.div
        className="gradient-hero py-20 text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.0 }}
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Make a Difference?</h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto opacity-90">
            Join thousands of donors who are transforming lives and strengthening communities.
          </p>
          <div className="mb-12">
            <Lottie
              options={defaultOptions}
              className="mx-auto w-64 h-64"
            />
          </div>
          <Button
            onClick={() => handlePage("Donate")}
            className="btn-secondary bg-white hover:bg-gray-50 text-white hover:text-secondary-color"
            sx={{
              border: "2px solid white",
              backgroundColor: "transparent",
              color: "white",
              fontSize: "18px",
              paddingX: "32px",
              paddingY: "14px",
              fontWeight: "bold",
              '&:hover': {
                backgroundColor: "white",
                color: "var(--primary-color)",
                transform: "translateY(-2px)",
                boxShadow: "0 8px 25px rgba(255, 255, 255, 0.3)",
              }
            }}
          >
            Start Donating Today
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default Homepage;