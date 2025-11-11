"use client"
import React, { useState } from "react";
import TopNavbar from "./components/TopNavbar";
import { useTheme } from "./layout";

// Import page components
import Homepage from "./pages/Homepage";
import AboutPage from "./pages/AboutPage";
import DonatePage from "./pages/DonatePage";
import DashboardPage from "./pages/DashboardPage";
import CommunityPage from "./pages/CommunityPage";
import SupportPage from "./pages/SupportPage";
import ContactUsPage from "./pages/ContactUsPage";
import LoginPage from "./pages/LoginPage";

export default function Home() {
  // Get theme context
  const { themeMode } = useTheme();
  
  // State for current page
  const [currentPage, setCurrentPage] = useState("Home");

  // Handle page navigation
  const handlePage = (page: string) => {
    setCurrentPage(page);
  };

  // Handle scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Render current page component
  const renderPage = () => {
    switch (currentPage) {
      case "Home":
        return <Homepage handlePage={handlePage} />;
      case "About":
        return <AboutPage />;
      case "Donate":
        return <DonatePage handlePage={handlePage} scrollToTop={scrollToTop} />;
      case "Dashboard":
        return <DashboardPage handlePage={handlePage} scrollToTop={scrollToTop} />;
      case "Community":
        return <CommunityPage handlePage={handlePage} />;
      case "Support":
        return <SupportPage />;
      case "Contact":
        return <ContactUsPage />;
      case "Login":
        return <LoginPage handlePage={handlePage} />;
      default:
        return <Homepage handlePage={handlePage} />;
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${themeMode === 'dark' ? 'dark' : ''}`} style={{ backgroundColor: 'transparent' }}>
      <TopNavbar
        currentPage={currentPage}
        handlePage={handlePage}
        scrollToTop={scrollToTop}
      />
      <div className="pt-0">
        <div className="min-h-screen overflow-y-auto" style={{ backgroundColor: 'transparent' }}>
          {renderPage()}
        </div>
      </div>
    </div>
  );
}