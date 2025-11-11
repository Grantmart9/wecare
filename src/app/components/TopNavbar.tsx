"use client";
import React, { useState, useEffect, ReactNode } from "react";
import HomeIcon from "@mui/icons-material/Home";
import AddBoxIcon from "@mui/icons-material/AddBox";
import PeopleIcon from "@mui/icons-material/People";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LoginIcon from "@mui/icons-material/Login";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { motion } from "framer-motion";
import { Button } from "@mui/material";
import { createClient, SupabaseClient, User } from "@supabase/supabase-js";
import { SUPABASE_URL, API_KEY } from "../supabase";

const supabase: SupabaseClient = createClient(SUPABASE_URL, API_KEY);

// Types
interface NavItem {
  name: string;
  icon: React.ComponentType<any>;
  page: string;
}

interface SubMenuItem {
  name: string;
  page: string;
}

interface TopNavbarProps {
  currentPage: string;
  handlePage: (page: string) => void;
  scrollToTop: () => void;
}

const TopNavbar: React.FC<TopNavbarProps> = ({ currentPage, handlePage, scrollToTop }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Get initial session
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setIsLoading(false);
    };

    getSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        setIsLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLoginPage = () => {
    handlePage('Login');
    setIsMobileMenuOpen(false);
  };

  // Navigation items for the main navbar
  const navItems: NavItem[] = [
    { name: "Home", icon: HomeIcon, page: "Home" },
    { name: "Donate", icon: AddBoxIcon, page: "Donate" },
    { name: "Community", icon: PeopleIcon, page: "Community" },
    { name: "Profile", icon: AccountBoxIcon, page: "Dashboard" },
  ];

  const SubMenuList: SubMenuItem[] = [
    { name: "About Us", page: "About" },
    { name: "Support", page: "Support" },
    { name: "Contact Us", page: "Contact" },
  ];

  const handleNavClick = (page: string) => {
    handlePage(page);
    setIsMobileMenuOpen(false);
    if (scrollToTop) scrollToTop();
  };

  return (
    <>
      {/* Top Navigation Bar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'backdrop-blur-lg bg-white/90 shadow-lg border-b border-gray-200/30'
            : 'gradient-hero'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => handleNavClick('Home')}
            >
              <div className="gradient-primary text-white w-12 h-12 rounded-2xl flex items-center justify-center font-bold shadow-lg">
                WC
              </div>
              <span className="text-3xl font-bold text-white transition-colors duration-300">
                WeCare
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {/* Main Navigation Items */}
              <div className="flex items-center space-x-1">
                {navItems.map((item) => (
                  <motion.button
                    key={item.name}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleNavClick(item.page)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                      currentPage === item.page
                        ? 'theme-bg-accent text-gray-700 shadow-md'
                        : `text-white hover:text-white hover:theme-bg-tertiary`
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </motion.button>
                ))}
              </div>

              {/* Submenu Items */}
              <div className="flex items-center space-x-1">
                {SubMenuList.map((item) => (
                  <motion.button
                    key={item.name}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleNavClick(item.page)}
                    className={`px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                      currentPage === item.page
                        ? 'bg-transparent text-white'
                        : `hover:bg-gray-100 text-gray-500 ${
                            isScrolled
                              ? 'text-white hover:text-white-500'
                              : 'text-white hover:text-white hover:bg-white/10'
                          }`
                    }`}
                  >
                    {item.name}
                  </motion.button>
                ))}
              </div>

              {/* User Section */}
              <div className="flex items-center space-x-4">
                {!isLoading && (
                  user ? (
                    <div className="block w-28"></div>
                  ) : (
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant="contained"
                        className="btn-primary shadow-lg"
                        sx={{
                          backgroundColor: isScrolled ? "var(--primary-color)" : "white",
                          color: isScrolled ? "white" : "white",
                          border: isScrolled ? "none" : "2px solid var(--primary-color)",
                          '&:hover': {
                            backgroundColor: isScrolled ? "var(--primary-dark)" : "var(--primary-color)",
                            color: "white",
                            transform: "translateY(-2px)",
                            boxShadow: "var(--shadow-lg)",
                          }
                        }}
                        startIcon={<LoginIcon />}
                        onClick={handleLoginPage}
                        size="small"
                      >
                        Login
                      </Button>
                    </motion.div>
                  )
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`p-2 rounded-lg ${
                  isScrolled
                    ? 'theme-text-primary hover:bg-gray-100'
                    : 'theme-text-primary hover:bg-white/10'
                }`}
              >
                {isMobileMenuOpen ? (
                  <CloseIcon className="h-6 w-6 text-white" />
                ) : (
                  <MenuIcon className="h-6 w-6 text-white" />
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={{
            height: isMobileMenuOpen ? 'auto' : 0,
            opacity: isMobileMenuOpen ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden bg-white/95 backdrop-blur-lg border-t border-gray-200/30"
        >
          <div className="px-4 py-6 space-y-4">
            {/* Main Navigation Items */}
            <div className="space-y-2">
              {navItems.map((item) => (
                <motion.button
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{
                    opacity: isMobileMenuOpen ? 1 : 0,
                    x: isMobileMenuOpen ? 0 : -20
                  }}
                  transition={{ delay: 0.1 }}
                  onClick={() => handleNavClick(item.page)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                    currentPage === item.page
                      ? 'bg-blue-100 text-blue-600'
                      : 'theme-text-secondary hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </motion.button>
              ))}
            </div>

            {/* Submenu Items */}
            <div className="border-t border-gray-200 pt-4 space-y-2">
              {SubMenuList.map((item, index) => (
                <motion.button
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{
                    opacity: isMobileMenuOpen ? 1 : 0,
                    x: isMobileMenuOpen ? 0 : -20
                  }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                  onClick={() => handleNavClick(item.page)}
                  className={`w-full text-left px-4 py-2 rounded-lg font-medium transition-colors ${
                    currentPage === item.page
                      ? 'bg-blue-100 text-white'
                      : 'theme-text-secondary hover:bg-gray-100'
                  }`}
                >
                  {item.name}
                </motion.button>
              ))}
            </div>

            {/* Mobile User Section */}
            <div className="border-t border-gray-200 pt-4">
              {!isLoading && (
                user ? (
                  <div className="flex items-center space-x-3 p-3 theme-bg-secondary rounded-lg">
                    <AccountBoxIcon className="h-5 w-5 text-blue-600" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium theme-text-primary truncate">
                        {user.email || 'User'}
                      </p>
                      <p className="text-xs theme-text-secondary">Signed in</p>
                    </div>
                  </div>
                ) : (
                  <Button
                    variant="contained"
                    className="w-full text-white bg-blue-600 hover:bg-blue-700"
                    startIcon={<LoginIcon />}
                    onClick={handleLoginPage}
                  >
                    Login
                  </Button>
                )
              )}
            </div>
          </div>
        </motion.div>
      </motion.nav>

      {/* Spacer for fixed navbar */}
      <div className="h-16" />
    </>
  );
};

export default TopNavbar;