"use client";
import { ThemeProvider } from "@mui/material";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { createAppTheme } from "./themeprovider";
// import { AuthProvider } from "./authContext";
import "./globals.css";

// Types for theme context
interface ThemeContextType {
  themeMode: 'light' | 'dark' | 'system';
  setThemeMode: (mode: 'light' | 'dark' | 'system') => void;
  theme: any; // MUI theme type
}

// Create theme context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Custom hook to use theme context
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Theme provider component
const AppThemeProvider = ({ children }: { children: ReactNode }) => {
  const [themeMode, setThemeMode] = useState<'light' | 'dark' | 'system'>('light');
  const [currentTheme, setCurrentTheme] = useState(createAppTheme('light'));

  // Load theme preference from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('themeMode');
    let initialTheme: 'light' | 'dark' | 'system' = 'light';

    if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
      initialTheme = savedTheme as 'light' | 'dark' | 'system';
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
      const handleChange = (e: MediaQueryListEvent) => {
        const newTheme = e.matches ? 'dark' : 'light';
        setCurrentTheme(createAppTheme(newTheme));
        applyThemeToDocument(newTheme);
      };

      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [themeMode]);

  // Function to apply theme to document
  const applyThemeToDocument = (mode: 'light' | 'dark') => {
    const root = document.documentElement;
    const body = document.body;

    if (mode === 'dark') {
      root.classList.add('dark');
      body.classList.add('dark');
      body.className = 'dark';
      body.style.color = '#f9fafb'; // gray-50
    } else {
      root.classList.remove('dark');
      body.classList.remove('dark');
      body.className = '';
      body.style.color = '#1f2937'; // gray-800
    }
  };

  // Handle theme mode changes
  const handleThemeChange = (newMode: 'light' | 'dark' | 'system') => {
    setThemeMode(newMode);

    let actualTheme: 'light' | 'dark';
    if (newMode === 'system') {
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      actualTheme = systemPrefersDark ? 'dark' : 'light';
    } else {
      actualTheme = newMode;
    }

    const newTheme = createAppTheme(actualTheme);
    setCurrentTheme(newTheme);
    applyThemeToDocument(actualTheme);

    // Save to localStorage
    localStorage.setItem('themeMode', newMode);
  };

  const value: ThemeContextType = {
    themeMode,
    setThemeMode: handleThemeChange,
    theme: currentTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      <ThemeProvider theme={currentTheme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="transition-colors duration-300">
        <AppThemeProvider>{children}</AppThemeProvider>
      </body>
    </html>
  );
}