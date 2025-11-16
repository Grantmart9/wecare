"use client";
import React, { useState, useEffect, ReactNode } from "react";
import HomeIcon from "@mui/icons-material/Home";
import AddBoxIcon from "@mui/icons-material/AddBox";
import PeopleIcon from "@mui/icons-material/People";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LoginIcon from "@mui/icons-material/Login";
import { motion } from "framer-motion";
import { Button } from "@mui/material";
import { createClient, SupabaseClient, User } from "@supabase/supabase-js";
import { SUPABASE_URL, API_KEY } from "../supabase";
import { useTheme } from "../ClientLayout";

const supabase: SupabaseClient = createClient(SUPABASE_URL, API_KEY);

interface NavItem {
  name: string;
  icon: React.ComponentType<any>;
  page: string;
}

interface SubMenuItem {
  name: string;
  page: string;
}

interface SidebarProps {
  currentPage: string;
  handlePage: (page: string) => void;
  isOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, handlePage, isOpen, setIsSidebarOpen }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Get theme context
  const { themeMode } = useTheme();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isOpen);
  };

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

  const handleLoginPage = () => {
    handlePage('Login');
  };

  // Navigation items for the main sidebar
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

  return (
    <>
      {/* Sidebar for desktop */}
      <div className={`hidden lg:flex flex-col h-screen theme-bg-primary shadow-lg transition-all duration-300 ease-in-out border-r theme-border ${isOpen ? "w-64" : "w-20"}`}>
        {/* Sidebar header */}
        <div className="flex items-center justify-between p-4 theme-border border-b">
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center space-x-2"
            >
              <div className="bg-blue-600 text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold">
                W
              </div>
              <span className="text-xl font-bold theme-text-primary">WeCare</span>
            </motion.div>
          )}
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg theme-text-secondary hover:theme-bg-tertiary"
          >
            {isOpen ? (
              <ChevronLeftIcon className="h-5 w-5" />
            ) : (
              <ChevronRightIcon className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Navigation items */}
        <div className="flex-1 overflow-y-auto py-4">
          <nav>
            <ul className="space-y-1 px-2">
              {navItems.map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => {
                      handlePage(item.page);
                    }}
                    className={`w-full flex items-center rounded-lg px-3 py-3 text-left transition-colors ${currentPage === item.page
                      ? "theme-bg-tertiary text-blue-600 font-medium"
                      : "theme-text-secondary hover:theme-bg-tertiary"
                      }`}
                  >
                    <div className="flex items-center">
                      <item.icon className="h-6 w-6" />
                      {isOpen && (
                        <motion.span
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="ml-3"
                        >
                          {item.name}
                        </motion.span>
                      )}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        {/* User section */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 10 }}
            exit={{ opacity: 0, y: 10 }}
            className="p-4 theme-border border-t">
            <div className="space-y-2">
              <nav>
                <ul className="space-y-1 px-2">
                  {SubMenuList.map((item) => (
                    <li key={item.name}>
                      <button
                        onClick={() => {
                          handlePage(item.page);
                        }}
                        className={`w-full flex items-center rounded-lg pl-2 text-left transition-colors ${currentPage === item.page
                          ? "theme-bg-tertiary text-white font-medium"
                          : "text-white hover:theme-bg-tertiary"
                          }`}
                      >{item.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
              {!isLoading && (
                user ? (
                  <div className="flex items-center space-x-2 p-2 theme-bg-secondary rounded-lg">
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
                    className="text-white bg-blue-600 hover:bg-blue-800"
                    fullWidth
                    startIcon={<LoginIcon />}
                    onClick={handleLoginPage}
                  >
                    Login
                  </Button>
                )
              )}
            </div>
          </motion.div>
        )}
      </div>
      {/* Mobile bottom navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 theme-bg-primary theme-border border-t z-50">
        <div className="grid grid-cols-4">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => {
                handlePage(item.page);
              }}
              className={`flex flex-col items-center justify-center py-2 px-1 ${currentPage === item.page
                ? "text-blue-600"
                : "theme-text-secondary"
                }`}
            >
              <item.icon className="h-6 w-6" />
              <span className="text-xs mt-1">{item.name}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;