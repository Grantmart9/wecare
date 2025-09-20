"use client";
import { ThemeProvider } from "@mui/material";
import React, { createContext, useContext, useState, useEffect } from "react";
import { createAppTheme } from "./themeprovider";
import "./globals.css";

// Create theme context
const ThemeContext = createContext();

// Custom hook to use theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Theme provider component
const AppThemeProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState('light');
  const [currentTheme, setCurrentTheme] = useState(createAppTheme('light'));

  // Load theme preference from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('themeMode');
    let initialTheme = 'light';

    if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
      initialTheme = savedTheme;
    } else {
      // Check system preference
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      initialTheme = systemPrefersDark ? 'dark' : 'light';
    }

    setThemeMode(initialTheme);
    setCurrentTheme(createAppTheme(initialTheme === 'system' ? 'light' : initialTheme));

    // Apply theme to document
    applyThemeToDocument(initialTheme === 'system' ? 'light' : initialTheme);
  }, []);

  // Listen for system theme changes when mode is 'system'
  useEffect(() => {
    if (themeMode === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e) => {
        const newTheme = e.matches ? 'dark' : 'light';
        setCurrentTheme(createAppTheme(newTheme));
        applyThemeToDocument(newTheme);
      };

      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [themeMode]);

  // Function to apply theme to document
  const applyThemeToDocument = (mode) => {
    const root = document.documentElement;
    const body = document.body;

    if (mode === 'dark') {
      root.classList.add('dark');
      body.classList.add('dark');
      body.style.backgroundColor = '#111827'; // gray-900
      body.style.color = '#f9fafb'; // gray-50
    } else {
      root.classList.remove('dark');
      body.classList.remove('dark');
      body.style.backgroundColor = '#f9fafb'; // gray-50
      body.style.color = '#1f2937'; // gray-800
    }
  };

  // Handle theme mode changes
  const handleThemeChange = (newMode) => {
    setThemeMode(newMode);

    let actualTheme = newMode;
    if (newMode === 'system') {
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      actualTheme = systemPrefersDark ? 'dark' : 'light';
    }

    const newTheme = createAppTheme(actualTheme);
    setCurrentTheme(newTheme);
    applyThemeToDocument(actualTheme);

    // Save to localStorage
    localStorage.setItem('themeMode', newMode);
  };

  const value = {
    themeMode,
    setThemeMode: handleThemeChange,
    theme: currentTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      <ThemeProvider theme={currentTheme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="h-full w-full transition-colors duration-300">
        <AppThemeProvider>{children}</AppThemeProvider>
      </body>
    </html>
  );
}
