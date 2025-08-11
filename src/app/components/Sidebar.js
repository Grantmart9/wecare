"use client";
import React, { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import AddBoxIcon from "@mui/icons-material/AddBox";
import PeopleIcon from "@mui/icons-material/People";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { MainMenuList, SubMenuList } from "../supabase";
import { Accordion, AccordionSummary, AccordionDetails, Typography, List, ListItemButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import * as motion from "motion/react-client";

const Sidebar = ({ currentPage, handlePage, isOpen, setIsOpen }) => {
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Navigation items for the main sidebar
  const navItems = [
    { name: "Home", icon: HomeIcon, page: "Home" },
    { name: "Donate", icon: AddBoxIcon, page: "Donate" },
    { name: "Community", icon: PeopleIcon, page: "Community" },
    { name: "Profile", icon: ChatBubbleIcon, page: "Dashboard" },
  ];

  return (
    <>
      {/* Sidebar for desktop */}
      <div className={`hidden lg:flex flex-col h-screen bg-white shadow-lg transition-all duration-300 ease-in-out ${isOpen ? "w-64" : "w-20"}`}>
        {/* Sidebar header */}
        <div className="flex items-center justify-between p-4 border-b">
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center space-x-2"
            >
              <div className="bg-blue-600 text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold">
                W
              </div>
              <span className="text-xl font-bold text-gray-800">WeCare</span>
            </motion.div>
          )}
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-600"
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
                    className={`w-full flex items-center rounded-lg px-3 py-3 text-left transition-colors ${
                      currentPage === item.page
                        ? "bg-blue-50 text-blue-600 font-medium"
                        : "text-gray-700 hover:bg-gray-100"
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

            {/* Main menu items */}
            {isOpen && (
              <div className="mt-8 px-2">
                {MainMenuList.map((menu, index) => (
                  <Accordion
                    key={index}
                    elevation={0}
                    className="bg-transparent"
                    disableGutters
                  >
                    <AccordionSummary
                      expandIcon={<AddIcon className="text-gray-500" />}
                      className="px-2 py-1"
                      sx={{
                        minHeight: "40px !important",
                        '&.Mui-expanded': {
                          minHeight: "40px !important",
                        },
                        '& > .MuiAccordionSummary-content': {
                          margin: "8px 0 !important",
                        },
                      }}
                    >
                      <Typography className="text-gray-700 font-medium">
                        {menu.name}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ padding: "8px 0 !important" }}>
                      <List className="py-0">
                        {menu.menu.map((subItem, subIndex) => (
                          <ListItemButton
                            key={subIndex}
                            className="py-2 px-4 text-gray-600 rounded-lg hover:bg-gray-100"
                            onClick={() => {
                              localStorage.setItem("gender", menu.name);
                              localStorage.setItem("category", subItem.name);
                              handlePage("Donate");
                            }}
                          >
                            <span className="text-sm">{subItem.name}</span>
                          </ListItemButton>
                        ))}
                      </List>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </div>
            )}
          </nav>
        </div>

        {/* User section */}
        {isOpen && (
          <div className="p-4 border-t">
            <div className="space-y-2">
              {SubMenuList.map((item, index) => (
                <button
                  key={index}
                  className="w-full text-left px-3 py-2 text-gray-600 rounded-lg hover:bg-gray-100 text-sm"
                  onClick={() => {
                    if (item.name === "Logout") {
                      // Handle logout
                    } else {
                      // Handle other submenu items
                    }
                  }}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Mobile bottom navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="grid grid-cols-4">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => {
                handlePage(item.page);
              }}
              className={`flex flex-col items-center justify-center py-2 px-1 ${
                currentPage === item.page
                  ? "text-blue-600"
                  : "text-gray-500"
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