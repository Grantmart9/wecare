"use client"
import React, { useState, useEffect, useRef } from "react";
import Homepage from "./pages/Homepage";
import DonatePage from "./pages/DonatePage";
import CommunityPage from "./pages/CommunityPage";
import SupportPage from "./pages/SupportPage";
import DashboardPage from "./pages/DashboardPage";
import AboutPage from "./pages/AboutPage";
import ContactUsPage from "./pages/ContactUsPage";
import Sidebar from "./components/Sidebar";

export default function Home() {
  const [CurrentPage, setCurrentPage] = useState("Home")
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const scrollContainerRef = useRef(null);

  const handlePage = (Page) => {
    setCurrentPage(Page);
    console.log("Current Page:", Page);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
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
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        currentPage={CurrentPage}
        handlePage={handlePage}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div ref={scrollContainerRef} className="flex-1 overflow-y-auto pt-4 pb-20 lg:pb-4 lg:pt-4">
          {
            <>
              {CurrentPage === "Home" ? <Homepage handlePage={handlePage} CurrentPage={CurrentPage} /> : null}
              {CurrentPage === "Donate" ? <DonatePage handlePage={handlePage} CurrentPage={CurrentPage} scrollToTop={scrollToTop} /> : null}
              {CurrentPage === "Community" ? <CommunityPage handlePage={handlePage} CurrentPage={CurrentPage} /> : null}
              {CurrentPage === "Support" ? <SupportPage handlePage={handlePage} CurrentPage={CurrentPage} /> : null}
              {CurrentPage === "Dashboard" ? <DashboardPage handlePage={handlePage} CurrentPage={CurrentPage} scrollToTop={scrollToTop} /> : null}
              {CurrentPage === "About" ? <AboutPage handlePage={handlePage} CurrentPage={CurrentPage} scrollToTop={scrollToTop} /> : null}
              {CurrentPage === "Contact" ? <ContactUsPage handlePage={handlePage} CurrentPage={CurrentPage} scrollToTop={scrollToTop} /> : null}
            </>
          }
        </div>
      </div>
    </div>
  );
}
