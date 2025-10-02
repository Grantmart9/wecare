"use client"
import React, { useState, useEffect, useRef } from "react";
import Homepage from "./pages/Homepage";
import DonatePage from "./pages/DonatePage";
import CommunityPage from "./pages/CommunityPage";
import SupportPage from "./pages/SupportPage";
import DashboardPage from "./pages/DashboardPage";
import AboutPage from "./pages/AboutPage";
import ContactUsPage from "./pages/ContactUsPage";
import LoginPage from "./pages/LoginPage";
import TopNavbar from "./components/TopNavbar";
import { useTheme } from "./layout";

export default function Home() {
  const [CurrentPage, setCurrentPage] = useState("Home")
  const scrollContainerRef = useRef(null);

  // Get theme context
  const { themeMode } = useTheme();

  const handlePage = (Page) => {
    setCurrentPage(Page);
    console.log("Current Page:", Page);
    // Auto-scroll to top when changing pages
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
    // Also scroll the window to top for complete reset
    window.scrollTo(0, 0);
  }

  const scrollToTop = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }

  useEffect(() => {
    // Initialization code if needed
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${themeMode === 'dark' ? 'dark' : ''}`} style={{ backgroundColor: 'transparent' }}>
      <TopNavbar
        currentPage={CurrentPage}
        handlePage={handlePage}
        scrollToTop={scrollToTop}
      />
      <div className="pt-16">
        <div ref={scrollContainerRef} className="min-h-screen overflow-y-auto" style={{ backgroundColor: 'transparent' }}>
          {
            <>
              {CurrentPage === "Home" ? <Homepage handlePage={handlePage} CurrentPage={CurrentPage} /> : null}
              {CurrentPage === "Donate" ? <DonatePage handlePage={handlePage} CurrentPage={CurrentPage} scrollToTop={scrollToTop} /> : null}
              {CurrentPage === "Community" ? <CommunityPage handlePage={handlePage} CurrentPage={CurrentPage} /> : null}
              {CurrentPage === "Support" ? <SupportPage handlePage={handlePage} CurrentPage={CurrentPage} /> : null}
              {CurrentPage === "Dashboard" ? <DashboardPage handlePage={handlePage} CurrentPage={CurrentPage} scrollToTop={scrollToTop} /> : null}
              {CurrentPage === "About" ? <AboutPage handlePage={handlePage} CurrentPage={CurrentPage} scrollToTop={scrollToTop} /> : null}
              {CurrentPage === "Contact" ? <ContactUsPage handlePage={handlePage} CurrentPage={CurrentPage} scrollToTop={scrollToTop} /> : null}
              {CurrentPage === "Login" ? <LoginPage handlePage={handlePage} CurrentPage={CurrentPage} scrollToTop={scrollToTop} /> : null}
            </>
          }
        </div>
      </div>
    </div>
  );
}
