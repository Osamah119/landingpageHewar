import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Avatar,
  Box,
  TextField,
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Switch,
  FormControlLabel,
  Alert,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  School as SchoolIcon,
  Work as WorkIcon,
  Language as LanguageIcon,
  Security as SecurityIcon,
  Notifications as NotificationsIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Badge as BadgeIcon,
  MedicalServices as MedicalServicesIcon
} from '@mui/icons-material';
import { useLanguage } from '../contexts/LanguageContext';

const ProfilePage = () => {
  const { language, toggleLanguage } = useLanguage();
  const [userInfo, setUserInfo] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    darkMode: false,
    autoTranslate: true
  });
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [saveStatus, setSaveStatus] = useState('');

  useEffect(() => {
    // Load user info from localStorage or API
    const storedUserInfo = JSON.parse(localStorage.getItem('user_info') || '{}');
    const defaultUserInfo = {
      name: storedUserInfo.name || 'Dr. Huda',
      role: storedUserInfo.role || 'General Physician',
      email: storedUserInfo.email || 'dr.huda@hewar.ai',
      phone: '+966 50 123 4567',
      location: language === 'ar' ? 'الرياض، المملكة العربية السعودية' : 'Riyadh, Saudi Arabia',
      specialization: language === 'ar' ? 'طب عام' : 'General Medicine',
      licenseNumber: 'MED-2024-001',
      yearsExperience: '8',
      education: language === 'ar' ? 'جامعة الملك سعود - كلية الطب' : 'King Saud University - College of Medicine',
      languages: language === 'ar' ? 'العربية، الإنجليزية' : 'Arabic, English',
      joinDate: '2022-03-15'
    };
    setUserInfo(defaultUserInfo);
    setEditForm(defaultUserInfo);
  }, [language]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      setEditForm(userInfo); // Reset form if canceling
    }
  };

  const handleSave = () => {
    setSaveStatus('saving');
    // Simulate API call
    setTimeout(() => {
      setUserInfo(editForm);
      localStorage.setItem('user_info', JSON.stringify({
        ...editForm,
        name: editForm.name,
        role: editForm.role,
        email: editForm.email
      }));
      setIsEditing(false);
      setSaveStatus('success');
      setTimeout(() => setSaveStatus(''), 3000);
    }, 1500);
  };

  const handleInputChange = (field, value) => {
    setEditForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSettingChange = (setting, value) => {
    setSettings(prev => ({ ...prev, [setting]: value }));
  };

  const handlePasswordChange = () => {
    // Simulate password change
    setSaveStatus('saving');
    setTimeout(() => {
      setShowPasswordDialog(false);
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setSaveStatus('success');
      setTimeout(() => setSaveStatus(''), 3000);
    }, 1500);
  };

  const personalInfo = [
    {
      icon: <EmailIcon />,
      label: language === 'ar' ? 'البريد الإلكتروني' : 'Email',
      value: isEditing ? (
        <TextField
          size="small"
          value={editForm.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          sx={{ width: '100%' }}
        />
      ) : userInfo.email
    },
    {
      icon: <PhoneIcon />,
      label: language === 'ar' ? 'رقم الهاتف' : 'Phone',
      value: isEditing ? (
        <TextField
          size="small"
          value={editForm.phone}
          onChange={(e) => handleInputChange('phone', e.target.value)}
          sx={{ width: '100%' }}
        />
      ) : userInfo.phone
    },
    {
      icon: <LocationIcon />,
      label: language === 'ar' ? 'الموقع' : 'Location',
      value: isEditing ? (
        <TextField
          size="small"
          value={editForm.location}
          onChange={(e) => handleInputChange('location', e.target.value)}
          sx={{ width: '100%' }}
        />
      ) : userInfo.location
    }
  ];

  const professionalInfo = [
    {
      icon: <WorkIcon />,
      label: language === 'ar' ? 'التخصص' : 'Specialization',
      value: isEditing ? (
        <TextField
          size="small"
          value={editForm.specialization}
          onChange={(e) => handleInputChange('specialization', e.target.value)}
          sx={{ width: '100%' }}
        />
      ) : userInfo.specialization
    },
    {
      icon: <BadgeIcon />,
      label: language === 'ar' ? 'رقم التراخيص' : 'License Number',
      value: isEditing ? (
        <TextField
          size="small"
          value={editForm.licenseNumber}
          onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
          sx={{ width: '100%' }}
        />
      ) : userInfo.licenseNumber
    },
    {
      icon: <SchoolIcon />,
      label: language === 'ar' ? 'التعليم' : 'Education',
      value: isEditing ? (
        <TextField
          size="small"
          value={editForm.education}
          onChange={(e) => handleInputChange('education', e.target.value)}
          sx={{ width: '100%' }}
        />
      ) : userInfo.education
    },
    {
      icon: <LanguageIcon />,
      label: language === 'ar' ? 'اللغات' : 'Languages',
      value: isEditing ? (
        <TextField
          size="small"
          value={editForm.languages}
          onChange={(e) => handleInputChange('languages', e.target.value)}
          sx={{ width: '100%' }}
        />
      ) : userInfo.languages
    }
  ];

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
        {language === 'ar' ? 'الملف الشخصي' : 'Profile'}
      </Typography>

      {saveStatus === 'success' && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {language === 'ar' ? 'تم حفظ التغييرات بنجاح!' : 'Changes saved successfully!'}
        </Alert>
      )}

      {saveStatus === 'saving' && (
        <Alert severity="info" sx={{ mb: 3 }}>
          {language === 'ar' ? 'جاري حفظ التغييرات...' : 'Saving changes...'}
        </Alert>
      )}

      <Grid container spacing={4}>
        {/* Profile Header */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar
                    sx={{
                      width: 100,
                      height: 100,
                      bgcolor: 'linear-gradient(135deg, #7cdfd3 0%, #5cb7ac 100%)',
                      fontSize: '2rem',
                      fontWeight: 600,
                      mr: 3
                    }}
                  >
                    {userInfo.name?.split(' ')[0]?.[0]}{userInfo.name?.split(' ')[1]?.[0]}
                  </Avatar>
                  <Box>
                    {isEditing ? (
                      <TextField
                        variant="h5"
                        value={editForm.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        sx={{ mb: 1, fontSize: '1.5rem', fontWeight: 600 }}
                      />
                    ) : (
                      <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                        {userInfo.name}
                      </Typography>
                    )}
                    {isEditing ? (
                      <TextField
                        size="small"
                        value={editForm.role}
                        onChange={(e) => handleInputChange('role', e.target.value)}
                        sx={{ mb: 1 }}
                      />
                    ) : (
                      <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2 }}>
                        {userInfo.role}
                      </Typography>
                    )}
                    <Chip
                      icon={<MedicalServicesIcon />}
                      label={`${userInfo.yearsExperience} ${language === 'ar' ? 'سنوات خبرة' : 'Years Experience'}`}
                      color="primary"
                      variant="outlined"
                    />
                  </Box>
                </Box>
                <Box>
                  {!isEditing ? (
                    <Button
                      variant="outlined"
                      startIcon={<EditIcon />}
                      onClick={handleEditToggle}
                      sx={{ mr: 1 }}
                    >
                      {language === 'ar' ? 'تعديل' : 'Edit'}
                    </Button>
                  ) : (
                    <Box>
                      <Button
                        variant="outlined"
                        startIcon={<CancelIcon />}
                        onClick={handleEditToggle}
                        sx={{ mr: 1 }}
                      >
                        {language === 'ar' ? 'إلغاء' : 'Cancel'}
                      </Button>
                      <Button
                        variant="contained"
                        startIcon={<SaveIcon />}
                        onClick={handleSave}
                        disabled={saveStatus === 'saving'}
                      >
                        {language === 'ar' ? 'حفظ' : 'Save'}
                      </Button>
                    </Box>
                  )}
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Personal Information */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                <PersonIcon sx={{ mr: 1, color: 'primary.main' }} />
                {language === 'ar' ? 'المعلومات الشخصية' : 'Personal Information'}
              </Typography>
              <List>
                {personalInfo.map((item, index) => (
                  <ListItem key={index} sx={{ px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.label}
                      secondary={item.value}
                      sx={{ '& .MuiListItemText-secondary': { mt: 1 } }}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Professional Information */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                <MedicalServicesIcon sx={{ mr: 1, color: 'primary.main' }} />
                {language === 'ar' ? 'المعلومات المهنية' : 'Professional Information'}
              </Typography>
              <List>
                {professionalInfo.map((item, index) => (
                  <ListItem key={index} sx={{ px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.label}
                      secondary={item.value}
                      sx={{ '& .MuiListItemText-secondary': { mt: 1 } }}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Settings */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                <NotificationsIcon sx={{ mr: 1, color: 'primary.main' }} />
                {language === 'ar' ? 'الإعدادات' : 'Settings'}
              </Typography>
              <List>
                <ListItem sx={{ px: 0 }}>
                  <ListItemText
                    primary={language === 'ar' ? 'إشعارات البريد الإلكتروني' : 'Email Notifications'}
                    secondary={language === 'ar' ? 'تلقي الإشعارات عبر البريد الإلكتروني' : 'Receive email notifications'}
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.emailNotifications}
                        onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                        color="primary"
                      />
                    }
                    label=""
                  />
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <ListItemText
                    primary={language === 'ar' ? 'إشعارات الرسائل النصية' : 'SMS Notifications'}
                    secondary={language === 'ar' ? 'تلقي الإشعارات عبر الرسائل النصية' : 'Receive SMS notifications'}
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.smsNotifications}
                        onChange={(e) => handleSettingChange('smsNotifications', e.target.checked)}
                        color="primary"
                      />
                    }
                    label=""
                  />
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <ListItemText
                    primary={language === 'ar' ? 'الترجمة التلقائية' : 'Auto Translation'}
                    secondary={language === 'ar' ? 'تفعيل الترجمة التلقائية في الاستشارات' : 'Enable auto translation in consultations'}
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.autoTranslate}
                        onChange={(e) => handleSettingChange('autoTranslate', e.target.checked)}
                        color="primary"
                      />
                    }
                    label=""
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Security */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                <SecurityIcon sx={{ mr: 1, color: 'primary.main' }} />
                {language === 'ar' ? 'الأمان' : 'Security'}
              </Typography>
              <List>
                <ListItem sx={{ px: 0 }}>
                  <ListItemText
                    primary={language === 'ar' ? 'كلمة المرور' : 'Password'}
                    secondary={language === 'ar' ? 'آخر تغيير: منذ 30 يوماً' : 'Last changed: 30 days ago'}
                  />
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => setShowPasswordDialog(true)}
                  >
                    {language === 'ar' ? 'تغيير' : 'Change'}
                  </Button>
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <ListItemText
                    primary={language === 'ar' ? 'اللغة' : 'Language'}
                    secondary={language === 'ar' ? 'تغيير لغة الواجهة' : 'Change interface language'}
                  />
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<LanguageIcon />}
                    onClick={toggleLanguage}
                  >
                    {language === 'ar' ? 'English' : 'العربية'}
                  </Button>
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Password Change Dialog */}
      <Dialog open={showPasswordDialog} onClose={() => setShowPasswordDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {language === 'ar' ? 'تغيير كلمة المرور' : 'Change Password'}
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            type="password"
            label={language === 'ar' ? 'كلمة المرور الحالية' : 'Current Password'}
            value={passwordForm.currentPassword}
            onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
            sx={{ mb: 2, mt: 1 }}
          />
          <TextField
            fullWidth
            type="password"
            label={language === 'ar' ? 'كلمة المرور الجديدة' : 'New Password'}
            value={passwordForm.newPassword}
            onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            type="password"
            label={language === 'ar' ? 'تأكيد كلمة المرور الجديدة' : 'Confirm New Password'}
            value={passwordForm.confirmPassword}
            onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowPasswordDialog(false)}>
            {language === 'ar' ? 'إلغاء' : 'Cancel'}
          </Button>
          <Button onClick={handlePasswordChange} variant="contained">
            {language === 'ar' ? 'تغيير' : 'Change'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ProfilePage;
