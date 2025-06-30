import React, { useState, useMemo } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
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
  Paper,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Add as AddIcon,
  Assessment as AssessmentIcon,
  Person as PersonIcon,
  Logout as LogoutIcon,
  LocalHospital as LocalHospitalIcon,
  Language as LanguageIcon,
} from '@mui/icons-material';

const StyledListItem = styled(ListItem)(({ theme, dir }) => ({
  margin: '4px 8px',
  borderRadius: theme.shape.borderRadius,
  direction: dir || 'ltr',
  '& .MuiListItemButton-root': {
    borderRadius: theme.shape.borderRadius,
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: 'rgba(124, 223, 211, 0.08)',
      '& .MuiListItemIcon-root': {
        color: '#7cdfd3',
      },
      '& .MuiListItemText-primary': {
        color: '#7cdfd3',
        transform: 'translateX(5px)',
      },
    },
  },
  '& .MuiListItemIcon-root': {
    color: '#484444',
    minWidth: 40,
    transition: 'color 0.3s ease',
  },
  '& .MuiListItemText-primary': {
    color: '#484444',
    fontSize: '1rem',
    fontWeight: 500,
    transition: 'all 0.3s ease',
  },
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  cursor: 'pointer',
  background: `linear-gradient(135deg, #cef3ef 0%, #7cdfd3 100%)`,
  color: '#2e2b2b',
  border: '2px solid #a5e9e1',
  boxShadow: '0 0 15px rgba(124,223,211,0.3)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.1)',
    boxShadow: '0 0 20px rgba(124,223,211,0.5)',
    border: '2px solid #7cdfd3',
  },
}));

const GlowingButton = styled(IconButton)(({ theme }) => ({
  color: '#484444',
  backgroundColor: 'rgba(206, 243, 239, 0.1)',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: 'rgba(124, 223, 211, 0.1)',
    transform: 'translateY(-2px)',
    boxShadow: '0 5px 15px rgba(124,223,211,0.2)',
  },
}));

const Layout = ({ language = 'ar', toggleLanguage }) => {
  const isRTL = language === 'ar';
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const menuItems = useMemo(() => [
    { text: language === 'ar' ? 'لوحة التحكم' : 'Dashboard', path: '/', icon: <DashboardIcon /> },
    { text: language === 'ar' ? 'استشارة جديدة' : 'New Consultation', path: '/consultation/new', icon: <AddIcon /> },
    { text: language === 'ar' ? 'التقارير' : 'Reports', path: '/reports', icon: <AssessmentIcon /> },
    { text: language === 'ar' ? 'الملف الشخصي' : 'Profile', path: '/profile', icon: <PersonIcon /> },
  ], [language]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Clear any stored authentication
    localStorage.removeItem('auth_token');
    sessionStorage.removeItem('auth_token');
    
    // Close the profile menu
    handleProfileMenuClose();
    
    // Navigate to login page
    navigate('/login');
  };

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Paper
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2.5,
          background: `linear-gradient(135deg, #cef3ef 0%, #7cdfd3 100%)`,
          borderRadius: 0,
          mb: 2,
          position: 'relative',
          overflow: 'hidden',
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: -200,
            width: '200%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
            animation: 'shine 3s infinite',
          },
          '@keyframes shine': {
            '0%': { transform: 'translateX(-100%)' },
            '100%': { transform: 'translateX(50%)' }
          }
        }}
        dir={language === 'ar' ? 'rtl' : 'ltr'}
      >
        <LocalHospitalIcon sx={{ 
          mr: language === 'ar' ? 0 : 1.5, 
          ml: language === 'ar' ? 1.5 : 0,
          fontSize: 28,
          color: '#2e2b2b'
        }} />
        <Typography 
          variant="h5" 
          fontWeight="500" 
          component="div"
          sx={{ color: '#2e2b2b' }}
        >
          {language === 'ar' ? 'حوار' : 'Hewar'}
        </Typography>
      </Paper>

      <List sx={{ px: 1, flex: 1 }}>
        {menuItems.map((item) => (
          <StyledListItem key={item.path} disablePadding>
            <ListItemButton
              onClick={() => handleNavigation(item.path)}
              sx={{
                py: 1.5,
                px: 2,
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </StyledListItem>
        ))}
      </List>

      <Divider sx={{ 
        my: 2,
        '&::before, &::after': {
          borderColor: '#cef3ef',
        }
      }} />

      <Box sx={{ 
        p: 2, 
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center',
          flex: 1,
        }}>
          <StyledAvatar onClick={handleMenuClick}>
            {language === 'ar' ? 'د' : 'D'}
          </StyledAvatar>
          <Box sx={{ ml: language === 'ar' ? 0 : 2, mr: language === 'ar' ? 2 : 0 }}>
            <Typography variant="subtitle1" sx={{ color: '#484444', fontWeight: 500 }}>
              {language === 'ar' ? 'د. هدى' : 'Dr. Huda'}
            </Typography>
            <Typography variant="body2" sx={{ color: '#484444' }}>
              {language === 'ar' ? 'طبيب عام' : 'General Physician'}
            </Typography>
          </Box>
        </Box>
        <GlowingButton onClick={toggleLanguage}>
          <LanguageIcon />
        </GlowingButton>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', height: '100vh', direction: isRTL ? 'rtl' : 'ltr' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${240}px)` },
          ml: { sm: `${240}px` },
          bgcolor: 'white',
          boxShadow: 'none',
          borderBottom: '1px solid #f0f0f0',
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
        sx={{ 
          width: { sm: 240 }, 
          flexShrink: { sm: 0 },
          '& .MuiDrawer-paper': {
            [isRTL ? 'right' : 'left']: 0,
            [isRTL ? 'left' : 'right']: 'auto'
          }
        }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: 240,
              bgcolor: '#ffffff',
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: 240,
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
          p: 3,
          width: { sm: `calc(100% - ${240}px)` },
          minHeight: '100vh',
          bgcolor: '#f8f9fa',
          mt: { xs: 7, sm: 8 },
        }}
      >
        <Outlet />
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleProfileMenuClose}
        onClick={handleProfileMenuClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.1))',
            mt: 1.5,
            '& .MuiPaper-root': {
              borderRadius: 2,
              minWidth: 180,
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              border: '1px solid #f0f0f0',
            },
          },
        }}
      >
        <MenuItem onClick={() => {
          handleProfileMenuClose();
          navigate('/profile');
        }}>
          <ListItemIcon>
            <PersonIcon fontSize="small" sx={{ color: '#7cdfd3' }} />
          </ListItemIcon>
          <ListItemText>
            {language === 'ar' ? 'الملف الشخصي' : 'Profile'}
          </ListItemText>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" sx={{ color: '#484444' }} />
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
