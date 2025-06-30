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
import DashboardLayout from './components/DashboardLayout';

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

// Create theme
const createAppTheme = (direction) => createTheme({
  direction,
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
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
        },
      },
    },
  },
});

const AppContent = () => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';
  const theme = createAppTheme(isRTL ? 'rtl' : 'ltr');

  return (
    <CacheProvider value={isRTL ? cacheRtl : cacheLtr}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard/*" element={<DashboardLayout />} />
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
