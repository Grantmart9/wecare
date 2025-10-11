"use client";
import React, { useState, useEffect } from "react";
import HomeIcon from "@mui/icons-material/Home";
import AddBoxIcon from "@mui/icons-material/AddBox";
import PeopleIcon from "@mui/icons-material/People";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LoginIcon from "@mui/icons-material/Login";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import * as motion from "motion/react-client";
import { Button } from "@mui/material";
import { createClient } from "@supabase/supabase-js";
import { SUPABASE_URL, API_KEY } from "../supabase";
import { useTheme } from "../layout";

const supabase = createClient(SUPABASE_URL, API_KEY);

const TopNavbar = ({ currentPage, handlePage, scrollToTop }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Get theme context
    const { themeMode } = useTheme();

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
    const navItems = [
        { name: "Home", icon: HomeIcon, page: "Home" },
        { name: "Donate", icon: AddBoxIcon, page: "Donate" },
        { name: "Community", icon: PeopleIcon, page: "Community" },
        { name: "Profile", icon: AccountBoxIcon, page: "Dashboard" },
    ];

    const SubMenuList = [
        { name: "About Us", page: "About" },
        { name: "Support", page: "Support" },
        { name: "Contact Us", page: "Contact" },
    ];

    const handleNavClick = (page) => {
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
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                    ? 'backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 shadow-lg border-b border-gray-200/20 dark:border-gray-700/20'
                    : 'bg-transparent'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="flex items-center space-x-2 cursor-pointer"
                            onClick={() => handleNavClick('Home')}
                        >
                            <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white w-10 h-10 rounded-xl flex items-center justify-center font-bold shadow-lg">
                                W
                            </div>
                            <span className={`text-3xl font-bold transition-colors duration-300 ${isScrolled ? 'text-gray-900 dark:text-white' : 'text-gray-900 dark:text-white'
                                }`}>
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
                                        className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition-all duration-200 ${currentPage === item.page
                                            ? ' bg-transparent  text-blue-600 dark:text-orange-200'
                                            : ` ${isScrolled
                                                ? 'text-gray-900 dark:text-gray-300 '
                                                : 'text-gray-900 dark:text-gray-200 '
                                            }`
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
                                        className={`px-3 py-2 rounded-lg text-sm transition-all duration-200 ${currentPage === item.page
                                            ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 shadow-md'
                                            : `hover:bg-gray-100 dark:hover:bg-gray-800 ${isScrolled
                                                ? 'text-gray-900 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                                                : 'text-gray-900 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white/10'
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
                                                className={`shadow-lg ${isScrolled
                                                    ? 'bg-blue-600 hover:bg-blue-700'
                                                    : 'bg-white text-blue-600 hover:bg-gray-100'
                                                    }`}
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
                                className={`p-2 rounded-lg ${isScrolled
                                    ? 'text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                                    : 'text-gray-900 dark:text-gray-200 hover:bg-white/10'
                                    }`}
                            >
                                {isMobileMenuOpen ? (
                                    <CloseIcon className="h-6 w-6" />
                                ) : (
                                    <MenuIcon className="h-6 w-6" />
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
                    className="md:hidden overflow-hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-t border-gray-200/20 dark:border-gray-700/20"
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
                                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-colors ${currentPage === item.page
                                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                                        : 'theme-text-secondary hover:bg-gray-100 dark:hover:bg-gray-800'
                                        }`}
                                >
                                    <item.icon className="h-5 w-5" />
                                    <span>{item.name}</span>
                                </motion.button>
                            ))}
                        </div>

                        {/* Submenu Items */}
                        <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-2">
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
                                    className={`w-full text-left px-4 py-2 rounded-lg font-medium transition-colors ${currentPage === item.page
                                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                                        : 'theme-text-secondary hover:bg-gray-100 dark:hover:bg-gray-800'
                                        }`}
                                >
                                    {item.name}
                                </motion.button>
                            ))}
                        </div>

                        {/* Mobile User Section */}
                        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
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
                                        className="w-full bg-blue-600 hover:bg-blue-700"
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