import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { prefixer } from 'stylis';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl/dist/stylis-rtl.js';
import { Box } from '@mui/material';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';

// Pages and Layouts
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import Layout from './components/Layout';

// Create rtl cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

// Create ltr cache
const cacheLtr = createCache({
  key: 'muiltr',
  stylisPlugins: [prefixer],
});

const theme = createTheme({
  direction: 'rtl',
  typography: {
    fontFamily: 'Roboto, "Noto Kufi Arabic", sans-serif',
  },
  palette: {
    primary: {
      main: '#7cdfd3',
      light: '#a5e9e1',
      dark: '#2e2b2b',
    },
    secondary: {
      main: '#484444',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
          padding: '8px 16px',
          boxShadow: 'none',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          },
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #7cdfd3 0%, #5cb7ac 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #5cb7ac 0%, #4a9e94 100%)',
          },
        },
        containedSecondary: {
          background: 'linear-gradient(135deg, #484444 0%, #2e2b2b 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #2e2b2b 0%, #1a1818 100%)',
          },
        },
        outlined: {
          borderWidth: '1.5px',
          '&:hover': {
            borderWidth: '1.5px',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
          overflow: 'hidden',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.1)',
          },
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          padding: '16px 20px',
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '16px 20px',
          '&:last-child': {
            paddingBottom: '20px',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
        },
        colorPrimary: {
          backgroundColor: '#cef3ef',
          color: '#2e2b2b',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
        elevation1: {
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 600,
          backgroundColor: '#f8fffe',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:nth-of-type(even)': {
            backgroundColor: 'rgba(206, 243, 239, 0.1)',
          },
          '&:hover': {
            backgroundColor: 'rgba(206, 243, 239, 0.2)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#cef3ef',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: 'rgba(165, 233, 225, 0.5)',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          margin: '4px 0',
          '&.Mui-selected': {
            backgroundColor: 'rgba(124, 223, 211, 0.2)',
            '&:hover': {
              backgroundColor: 'rgba(124, 223, 211, 0.3)',
            },
          },
          '&:hover': {
            backgroundColor: 'rgba(124, 223, 211, 0.1)',
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          border: '2px solid #ffffff',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          minHeight: 48,
        },
      },
    },
    MuiCircularProgress: {
      styleOverrides: {
        colorPrimary: {
          color: '#7cdfd3',
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

const AppContent = () => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  return (
    <CacheProvider value={isRTL ? cacheRtl : cacheLtr}>
      <ThemeProvider theme={createTheme({ ...theme, direction: isRTL ? 'rtl' : 'ltr' })}>
        <CssBaseline />
        <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Routes>
            {/* Public routes without sidebar */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            
            {/* Protected routes with sidebar */}
            <Route path="/dashboard/*" element={<Layout />} />
          </Routes>
        </Box>
      </ThemeProvider>
    </CacheProvider>
  );
};

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
