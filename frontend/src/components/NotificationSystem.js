import React, { createContext, useState, useContext, useEffect } from 'react';
import {
  Badge,
  IconButton,
  Drawer,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Button,
  Divider,
  Menu,
  Snackbar,
  Alert,
  useMediaQuery,
  useTheme,
  ListItemSecondaryAction
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  Error as ErrorIcon,
  Delete as DeleteIcon,
  DoneAll as DoneAllIcon
} from '@mui/icons-material';

// Create notification context
const NotificationContext = createContext();

// Custom hook to use the notification context
export const useNotifications = () => useContext(NotificationContext);

// Generate mock notifications function
const generateMockNotifications = (language) => [
  {
    id: 1,
    title: language === 'en' ? 'New consultation request' : 'طلب استشارة جديد',
    message: language === 'en' ? 'Patient Fatima Ahmed has requested a consultation' : 'طلبت المريضة فاطمة أحمد استشارة',
    timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    read: false,
    type: 'info'
  },
  {
    id: 2,
    title: language === 'en' ? 'Missing information' : 'معلومات ناقصة',
    message: language === 'en' ? 'LMP information missing for patient Layla Mohamed' : 'معلومات LMP مفقودة للمريضة ليلى محمد',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    read: false,
    type: 'warning'
  },
  {
    id: 3,
    title: language === 'en' ? 'Consultation completed' : 'اكتملت الاستشارة',
    message: language === 'en' ? 'Consultation with Sara Khalid has been completed' : 'اكتملت الاستشارة مع سارة خالد',
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    read: true,
    type: 'success'
  }
];

// Notification Provider component
export const NotificationProvider = ({ children, language = 'en' }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info'
  });
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // Translations
  const translations = {
    notifications: {
      en: "Notifications",
      ar: "الإشعارات"
    },
    noNotifications: {
      en: "No notifications",
      ar: "لا توجد إشعارات"
    },
    markAllAsRead: {
      en: "Mark all as read",
      ar: "تعيين الكل كمقروء"
    },
    clearAll: {
      en: "Clear all",
      ar: "مسح الكل"
    },
    justNow: {
      en: "Just now",
      ar: "الآن"
    },
    minutesAgo: {
      en: "minutes ago",
      ar: "دقائق مضت"
    },
    hoursAgo: {
      en: "hours ago",
      ar: "ساعات مضت"
    },
    daysAgo: {
      en: "days ago",
      ar: "أيام مضت"
    },
    markAsRead: {
      en: "Mark as read",
      ar: "تعيين كمقروء"
    },
    remove: {
      en: "Remove",
      ar: "إزالة"
    },
    notificationCleared: {
      en: "Notification cleared",
      ar: "تم مسح الإشعار"
    },
    allNotificationsRead: {
      en: "All notifications marked as read",
      ar: "تم تعيين جميع الإشعارات كمقروءة"
    },
    allNotificationsCleared: {
      en: "All notifications cleared",
      ar: "تم مسح جميع الإشعارات"
    }
  };

  // Helper function for translations
  const t = (key) => {
    return translations[key]?.[language] || key;
  };

  // Format time
  const formatTime = (timestamp) => {
    const now = new Date();
    const notificationTime = new Date(timestamp);
    const diffMinutes = Math.floor((now - notificationTime) / (1000 * 60));
    
    if (diffMinutes < 1) {
      return t('justNow');
    } else if (diffMinutes < 60) {
      return `${diffMinutes} ${t('minutesAgo')}`;
    } else if (diffMinutes < 1440) {
      const hours = Math.floor(diffMinutes / 60);
      return `${hours} ${t('hoursAgo')}`;
    } else {
      const days = Math.floor(diffMinutes / 1440);
      return `${days} ${t('daysAgo')}`;
    }
  };

  // Initialize notifications
  useEffect(() => {
    const mockData = generateMockNotifications(language);
    setNotifications(mockData);
    updateUnreadCount(mockData);
  }, [language]);

  // Update unread count
  const updateUnreadCount = (notifs) => {
    const count = notifs.filter(notif => !notif.read).length;
    setUnreadCount(count);
  };

  // Add notification
  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      read: false,
      ...notification
    };
    
    const updatedNotifications = [newNotification, ...notifications];
    setNotifications(updatedNotifications);
    updateUnreadCount(updatedNotifications);
    
    // Show snackbar for new notification
    setSnackbar({
      open: true,
      message: notification.title,
      severity: notification.type || 'info'
    });
  };

  // Mark notification as read
  const markAsRead = (id) => {
    const updatedNotifications = notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    );
    setNotifications(updatedNotifications);
    updateUnreadCount(updatedNotifications);
  };

  // Remove notification
  const removeNotification = (id) => {
    const updatedNotifications = notifications.filter(notif => notif.id !== id);
    setNotifications(updatedNotifications);
    updateUnreadCount(updatedNotifications);
    
    // Show snackbar for removed notification
    setSnackbar({
      open: true,
      message: t('notificationCleared'),
      severity: 'success'
    });
  };

  // Mark all as read
  const markAllAsRead = () => {
    const updatedNotifications = notifications.map(notif => ({ ...notif, read: true }));
    setNotifications(updatedNotifications);
    updateUnreadCount(updatedNotifications);
    
    // Show snackbar for all read
    setSnackbar({
      open: true,
      message: t('allNotificationsRead'),
      severity: 'success'
    });
    
    // Close menu if open
    handleMenuClose();
  };

  // Clear all notifications
  const clearAllNotifications = () => {
    setNotifications([]);
    setUnreadCount(0);
    
    // Show snackbar for all cleared
    setSnackbar({
      open: true,
      message: t('allNotificationsCleared'),
      severity: 'success'
    });
    
    // Close drawer and menu
    setIsDrawerOpen(false);
    handleMenuClose();
  };

  // Toggle drawer
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
    if (anchorEl) {
      setAnchorEl(null);
    }
  };

  // Handle menu open
  const handleMenuOpen = (event) => {
    if (isMobile) {
      toggleDrawer();
    } else {
      setAnchorEl(event.currentTarget);
    }
  };

  // Handle menu close
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Handle snackbar close
  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Get icon based on notification type
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircleIcon color="success" />;
      case 'warning':
        return <WarningIcon color="warning" />;
      case 'error':
        return <ErrorIcon color="error" />;
      case 'info':
      default:
        return <InfoIcon color="info" />;
    }
  };

  // Notification list component
  const NotificationList = () => (
    <Box
      sx={{
        width: isMobile ? 'auto' : 350,
        maxWidth: '100%',
        direction: language === 'ar' ? 'rtl' : 'ltr'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 2,
          borderBottom: `1px solid ${theme.palette.divider}`
        }}
      >
        <Typography variant="h6">{t('notifications')}</Typography>
        <Box>
          {notifications.length > 0 && (
            <>
              <Button
                size="small"
                onClick={markAllAsRead}
                startIcon={<DoneAllIcon />}
                sx={{ mr: 1 }}
              >
                {t('markAllAsRead')}
              </Button>
              <Button
                size="small"
                onClick={clearAllNotifications}
                startIcon={<DeleteIcon />}
                color="error"
              >
                {t('clearAll')}
              </Button>
            </>
          )}
        </Box>
      </Box>
      
      {notifications.length === 0 ? (
        <Box sx={{ p: 3, textAlign: 'center' }}>
          <Typography color="text.secondary">{t('noNotifications')}</Typography>
        </Box>
      ) : (
        <List sx={{ p: 0 }}>
          {notifications.map((notification) => (
            <React.Fragment key={notification.id}>
              <ListItem
                alignItems="flex-start"
                sx={{
                  bgcolor: notification.read ? 'transparent' : 'action.hover',
                  py: 1
                }}
              >
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: `${notification.type}.light` }}>
                    {getNotificationIcon(notification.type)}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="subtitle2" component="div">
                      {notification.title}
                    </Typography>
                  }
                  secondary={
                    <>
                      <Typography
                        variant="body2"
                        color="text.primary"
                        component="span"
                      >
                        {notification.message}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        component="div"
                        sx={{ mt: 0.5 }}
                      >
                        {formatTime(notification.timestamp)}
                      </Typography>
                    </>
                  }
                />
                <ListItemSecondaryAction>
                  {!notification.read && (
                    <IconButton
                      edge="end"
                      size="small"
                      onClick={() => markAsRead(notification.id)}
                      title={t('markAsRead')}
                    >
                      <DoneAllIcon fontSize="small" />
                    </IconButton>
                  )}
                  <IconButton
                    edge="end"
                    size="small"
                    onClick={() => removeNotification(notification.id)}
                    title={t('remove')}
                    sx={{ ml: 1 }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              <Divider component="li" />
            </React.Fragment>
          ))}
        </List>
      )}
    </Box>
  );

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        removeNotification,
        markAllAsRead,
        clearAllNotifications
      }}
    >
      {children}
      
      {/* Notification Icon with Badge */}
      <IconButton
        color="inherit"
        onClick={handleMenuOpen}
        size="large"
      >
        <Badge badgeContent={unreadCount} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      
      {/* Mobile: Drawer for notifications */}
      <Drawer
        anchor={language === 'ar' ? 'right' : 'left'}
        open={isDrawerOpen}
        onClose={toggleDrawer}
      >
        <NotificationList />
      </Drawer>
      
      {/* Desktop: Menu for notifications */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          elevation: 3,
          sx: { mt: 1.5, maxHeight: '80vh', overflow: 'auto' }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <NotificationList />
      </Menu>
      
      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </NotificationContext.Provider>
  );
};

// Export the NotificationProvider component as default as well
export default NotificationProvider;
