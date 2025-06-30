import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Add as AddIcon,
  Assessment as AssessmentIcon,
  Person as PersonIcon,
  Logout as LogoutIcon,
  Language as LanguageIcon,
} from '@mui/icons-material';
import { useLanguage } from '../contexts/LanguageContext';

const drawerWidth = 240;

const StyledListItem = styled(ListItem)(({ theme }) => ({
  margin: '4px 8px',
  padding: 0,
  '& .MuiListItemButton-root': {
    borderRadius: theme.shape.borderRadius,
    padding: '10px 16px',
    '&:hover': {
      backgroundColor: 'rgba(124, 223, 211, 0.08)',
      '& .MuiListItemIcon-root': {
        color: theme.palette.primary.main,
      },
      '& .MuiListItemText-primary': {
        color: theme.palette.primary.main,
      },
    },
    '&.Mui-selected': {
      backgroundColor: 'rgba(124, 223, 211, 0.16)',
      '&:hover': {
        backgroundColor: 'rgba(124, 223, 211, 0.24)',
      },
      '& .MuiListItemIcon-root': {
        color: theme.palette.primary.main,
      },
      '& .MuiListItemText-primary': {
        color: theme.palette.primary.main,
        fontWeight: 600,
      },
    },
  },
}));

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { language, toggleLanguage } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  // Check authentication on mount
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const menuItems = [
    { 
      text: language === 'ar' ? 'لوحة التحكم' : 'Dashboard',
      icon: <DashboardIcon />,
      path: '/dashboard'
    },
    { 
      text: language === 'ar' ? 'استشارة جديدة' : 'New Consultation',
      icon: <AddIcon />,
      path: '/dashboard/consultation/new'
    },
    { 
      text: language === 'ar' ? 'التقارير' : 'Reports',
      icon: <AssessmentIcon />,
      path: '/dashboard/reports'
    },
    { 
      text: language === 'ar' ? 'الملف الشخصي' : 'Profile',
      icon: <PersonIcon />,
      path: '/dashboard/profile'
    },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_info');
    navigate('/login');
  };

  const handleNavigation = (path) => {
    navigate(path);
    if (mobileOpen) {
      setMobileOpen(false);
    }
  };

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box sx={{ p: 2, background: 'linear-gradient(135deg, #cef3ef 0%, #7cdfd3 100%)' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Avatar sx={{ 
            width: 40, 
            height: 40,
            bgcolor: '#ffffff',
            color: '#2e2b2b',
            fontWeight: 600
          }}>
            {language === 'ar' ? 'د' : 'D'}
          </Avatar>
          <Box sx={{ ml: language === 'ar' ? 0 : 2, mr: language === 'ar' ? 2 : 0 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#2e2b2b' }}>
              {language === 'ar' ? 'د. هدى' : 'Dr. Huda'}
            </Typography>
            <Typography variant="body2" sx={{ color: '#484444' }}>
              {language === 'ar' ? 'طبيب عام' : 'General Physician'}
            </Typography>
          </Box>
        </Box>
        <IconButton 
          onClick={toggleLanguage}
          sx={{ 
            color: '#2e2b2b',
            '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' }
          }}
        >
          <LanguageIcon />
        </IconButton>
      </Box>

      <Divider />

      {/* Navigation Menu */}
      <List sx={{ flexGrow: 1, px: 1, py: 2 }}>
        {menuItems.map((item) => (
          <StyledListItem key={item.path} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => handleNavigation(item.path)}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </StyledListItem>
        ))}
      </List>

      {/* Logout */}
      <Divider />
      <List sx={{ px: 1, py: 2 }}>
        <StyledListItem disablePadding>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon sx={{ minWidth: 40 }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary={language === 'ar' ? 'تسجيل الخروج' : 'Logout'} />
          </ListItemButton>
        </StyledListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          bgcolor: '#ffffff',
          boxShadow: 'none',
          borderBottom: '1px solid rgba(0,0,0,0.08)',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' }, color: '#484444' }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        {/* Mobile drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box',
              width: drawerWidth,
              bgcolor: '#ffffff',
            },
          }}
        >
          {drawer}
        </Drawer>
        
        {/* Desktop drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              bgcolor: '#ffffff',
              border: 'none',
              boxShadow: '0 0 20px rgba(0,0,0,0.05)',
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          height: '100vh',
          overflow: 'auto',
          bgcolor: '#f8fffe',
          pt: { xs: 8, sm: 9 },
          px: 3,
          pb: 3,
        }}
      >
        {children}
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        onClick={handleMenuClose}
        PaperProps={{
          sx: {
            mt: 1.5,
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          },
        }}
      >
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>
            {language === 'ar' ? 'تسجيل الخروج' : 'Logout'}
          </ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default Layout;
