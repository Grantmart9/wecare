"use client";
import { createTheme, Theme } from "@mui/material";

// Theme configuration interfaces
interface ThemePalette {
  mode: 'light' | 'dark';
  primary: {
    main: string;
    light: string;
    dark: string;
    contrastText: string;
  };
  secondary: {
    main: string;
    light: string;
    dark: string;
    contrastText: string;
  };
  background: {
    default: string;
    paper: string;
    secondary: string;
  };
  text: {
    primary: string;
    secondary: string;
    disabled: string;
  };
  divider: string;
  border: string;
  action: {
    hover: string;
    selected: string;
    disabled: string;
  };
}

interface ThemeConfig {
  palette: ThemePalette;
}

interface ComponentOverrides {
  MuiSelect?: {
    styleOverrides?: {
      root?: Record<string, any>;
    };
  };
  MuiButton?: {
    styleOverrides?: {
      root?: Record<string, any>;
    };
  };
  MuiTextField?: {
    styleOverrides?: {
      root?: Record<string, any>;
    };
  };
}

interface AppThemeOptions extends ThemeConfig {
  components?: ComponentOverrides;
  typography?: {
    fontFamily: string;
  };
  shape?: {
    borderRadius: number;
  };
}

// Theme configurations
const lightTheme: ThemeConfig = {
  palette: {
    mode: 'light',
    primary: {
      main: '#3b82f6', // blue-600
      light: '#60a5fa', // blue-400
      dark: '#1d4ed8', // blue-700
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#8b5cf6', // purple-600
      light: '#a78bfa', // purple-400
      dark: '#7c3aed', // purple-700
      contrastText: '#ffffff',
    },
    background: {
      default: '#f9fafb', // gray-50
      paper: '#ffffff',
      secondary: '#f3f4f6', // gray-100
    },
    text: {
      primary: '#1f2937', // gray-800
      secondary: '#6b7280', // gray-500
      disabled: '#9ca3af', // gray-400
    },
    divider: '#e5e7eb', // gray-200
    border: '#d1d5db', // gray-300
    action: {
      hover: '#f3f4f6', // gray-100
      selected: '#dbeafe', // blue-100
      disabled: '#9ca3af', // gray-400
    },
  },
};

const darkTheme: ThemeConfig = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#3b82f6', // blue-600
      light: '#60a5fa', // blue-400
      dark: '#1d4ed8', // blue-700
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#8b5cf6', // purple-600
      light: '#a78bfa', // purple-400
      dark: '#7c3aed', // purple-700
      contrastText: '#ffffff',
    },
    background: {
      default: '#111827', // gray-900
      paper: '#1f2937', // gray-800
      secondary: '#374151', // gray-700
    },
    text: {
      primary: '#f9fafb', // gray-50
      secondary: '#d1d5db', // gray-300
      disabled: '#6b7280', // gray-500
    },
    divider: '#374151', // gray-700
    border: '#4b5563', // gray-600
    action: {
      hover: '#374151', // gray-700
      selected: '#1e3a8a', // blue-900
      disabled: '#6b7280', // gray-500
    },
  },
};

// Function to create theme based on mode
const createAppTheme = (mode: 'light' | 'dark' = 'light'): Theme => {
  const baseConfig = mode === 'dark' ? darkTheme : lightTheme;

  return createTheme({
    ...baseConfig,
    components: {
      MuiSelect: {
        styleOverrides: {
          root: {
            borderRadius: 100,
            marginBottom: 20,
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 9999, // fully rounded
            textTransform: 'none',
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: 12,
            },
          },
        },
      },
    },
    typography: {
      fontFamily: "inherit",
    },
    shape: {
      borderRadius: 12,
    },
  } as AppThemeOptions);
};

// Export theme creation function and configurations
export { createAppTheme, lightTheme, darkTheme };
export default createAppTheme;