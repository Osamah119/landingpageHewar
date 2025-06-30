import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Avatar,
  Button,
  Grid,
  Paper,
  Tabs,
  Tab,
  TextField,
  CircularProgress,
  Divider,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import {
  Edit as EditIcon,
  Save as SaveIcon,
  School as SchoolIcon,
  Language as LanguageIcon,
  Person as PersonIcon,
} from '@mui/icons-material';

const ProfilePage = () => {
  const [language, setLanguage] = useState('en'); // 'en' or 'ar'
  const [tabValue, setTabValue] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);

  // Toggle language between English and Arabic
  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ar' : 'en');
  };

  useEffect(() => {
    // Simulate API call to fetch profile data
    const fetchProfile = async () => {
      try {
        setLoading(true);
        // In a real app, this would be an API call
        // await fetch('/api/profile')
        
        // Mock data for demonstration
        setTimeout(() => {
          setProfile({
            id: 1,
            name: "Dr. Huda Al-Mansour",
            name_ar: "د. هدى المنصور",
            title: "OB/GYN Specialist",
            title_ar: "أخصائية أمراض النساء والتوليد",
            email: "dr.huda@hewar.med",
            phone: "+966 50 123 4567",
            location: "Riyadh Medical Center, Floor 3",
            location_ar: "المركز الطبي بالرياض، الطابق الثالث",
            bio: "Specialized in women's health with over 10 years of experience in obstetrics and gynecology. Graduated from King Saud University Medical School and completed residency at Johns Hopkins Hospital.",
            bio_ar: "متخصصة في صحة المرأة مع أكثر من 10 سنوات من الخبرة في أمراض النساء والتوليد. تخرجت من كلية الطب بجامعة الملك سعود وأكملت الإقامة في مستشفى جونز هوبكنز.",
            education: [
              {
                degree: "MD in Medicine",
                degree_ar: "دكتوراه في الطب",
                institution: "King Saud University",
                institution_ar: "جامعة الملك سعود",
                year: "2008-2014"
              },
              {
                degree: "Residency in OB/GYN",
                degree_ar: "إقامة في أمراض النساء والتوليد",
                institution: "Johns Hopkins Hospital",
                institution_ar: "مستشفى جونز هوبكنز",
                year: "2014-2018"
              }
            ],
            certifications: [
              {
                name: "American Board of Obstetrics and Gynecology",
                name_ar: "المجلس الأمريكي لأمراض النساء والتوليد",
                year: "2018"
              },
              {
                name: "Saudi Commission for Health Specialties",
                name_ar: "الهيئة السعودية للتخصصات الصحية",
                year: "2019"
              }
            ],
            statistics: {
              consultations: 1245,
              patients: 780,
              avgRating: 4.8,
              yearsOfExperience: 10
            },
            avatar: "/assets/doctor-avatar.jpg" // This would be a real path in a production app
          });
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Toggle edit mode
  const handleEditToggle = () => {
    setEditMode(!editMode);
  };

  // Handle save profile changes
  const handleSaveProfile = () => {
    // In a real app, this would send data to an API
    // await fetch('/api/profile/update', { method: 'POST', body: JSON.stringify(profile) })
    setEditMode(false);
    // Show success message
  };

  // Translations object
  const translations = {
    profile: {
      en: "Doctor Profile",
      ar: "الملف الشخصي للطبيب"
    },
    personalInfo: {
      en: "Personal Information",
      ar: "المعلومات الشخصية"
    },
    qualifications: {
      en: "Qualifications",
      ar: "المؤهلات"
    },
    statistics: {
      en: "Statistics",
      ar: "الإحصائيات"
    },
    edit: {
      en: "Edit Profile",
      ar: "تعديل الملف"
    },
    save: {
      en: "Save",
      ar: "حفظ"
    },
    cancel: {
      en: "Cancel",
      ar: "إلغاء"
    },
    email: {
      en: "Email",
      ar: "البريد الإلكتروني"
    },
    phone: {
      en: "Phone",
      ar: "الهاتف"
    },
    location: {
      en: "Location",
      ar: "الموقع"
    },
    bio: {
      en: "Biography",
      ar: "السيرة الذاتية"
    },
    education: {
      en: "Education",
      ar: "التعليم"
    },
    certifications: {
      en: "Certifications",
      ar: "الشهادات"
    },
    totalConsultations: {
      en: "Total Consultations",
      ar: "إجمالي الاستشارات"
    },
    uniquePatients: {
      en: "Unique Patients",
      ar: "المرضى الفريدين"
    },
    averageRating: {
      en: "Average Rating",
      ar: "متوسط التقييم"
    },
    experience: {
      en: "Years of Experience",
      ar: "سنوات الخبرة"
    },
    switchLanguage: {
      en: "عربي",
      ar: "English"
    }
  };

  // Helper function for translations
  const t = (key) => {
    return translations[key]?.[language] || key;
  };

  if (loading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="80vh"
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return (
    <Box sx={{ py: 2, px: { xs: 2, md: 3 } }}>
      <Box 
        display="flex" 
        justifyContent="space-between" 
        alignItems="center" 
        mb={4}
        flexDirection={{ xs: 'column', sm: 'row' }}
        gap={2}
      >
        <Typography 
          variant="h4" 
          component="h1" 
          fontWeight="bold"
          dir={language === 'ar' ? 'rtl' : 'ltr'}
          align={language === 'ar' ? 'right' : 'left'}
          sx={{ width: '100%' }}
        >
          {t('profile')}
        </Typography>
        
        <Box display="flex" gap={2}>
          <Button 
            variant="outlined" 
            onClick={toggleLanguage}
            startIcon={<LanguageIcon />}
          >
            {t('switchLanguage')}
          </Button>
        </Box>
      </Box>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Box 
          display="flex" 
          flexDirection={{ xs: 'column', md: 'row' }}
          alignItems={{ xs: 'center', md: 'flex-start' }}
          gap={4}
          dir={language === 'ar' ? 'rtl' : 'ltr'}
        >
          <Avatar 
            src={profile.avatar || "https://via.placeholder.com/150"} 
            alt={language === 'en' ? profile.name : profile.name_ar}
            sx={{ 
              width: 150, 
              height: 150,
              border: `4px solid #1976d2`,
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)'
            }}
          />
          
          <Box flex={1}>
            <Box 
              display="flex" 
              justifyContent="space-between" 
              alignItems="center"
              flexDirection={{ xs: 'column', sm: 'row' }}
              gap={1}
              mb={2}
            >
              <Box>
                <Typography variant="h4" fontWeight="bold">
                  {language === 'en' ? profile.name : profile.name_ar}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  {language === 'en' ? profile.title : profile.title_ar}
                </Typography>
              </Box>
              
              {!editMode ? (
                <Button 
                  variant="contained" 
                  startIcon={<EditIcon />}
                  onClick={handleEditToggle}
                >
                  {t('edit')}
                </Button>
              ) : (
                <Box display="flex" gap={1}>
                  <Button 
                    variant="outlined" 
                    startIcon={<PersonIcon />}
                    onClick={handleEditToggle}
                    color="error"
                  >
                    {t('cancel')}
                  </Button>
                  <Button 
                    variant="contained" 
                    startIcon={<SaveIcon />}
                    onClick={handleSaveProfile}
                    color="success"
                  >
                    {t('save')}
                  </Button>
                </Box>
              )}
            </Box>
            
            <Divider sx={{ my: 2 }} />
            
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Box display="flex" alignItems="center" gap={1} mb={1}>
                  <Typography variant="body1">
                    {profile.email}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box display="flex" alignItems="center" gap={1} mb={1}>
                  <Typography variant="body1">
                    {profile.phone}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box display="flex" alignItems="center" gap={1} mb={1}>
                  <Typography variant="body1">
                    {language === 'en' ? profile.location : profile.location_ar}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>

      <Paper sx={{ mb: 4 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="profile tabs"
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            '& .MuiTab-root': {
              py: 2
            }
          }}
        >
          <Tab 
            label={t('personalInfo')} 
            dir={language === 'ar' ? 'rtl' : 'ltr'}
          />
          <Tab 
            label={t('qualifications')}
            dir={language === 'ar' ? 'rtl' : 'ltr'}
          />
          <Tab 
            label={t('statistics')} 
            dir={language === 'ar' ? 'rtl' : 'ltr'}
          />
        </Tabs>
        
        <Box p={3}>
          {/* Personal Information Tab */}
          {tabValue === 0 && (
            <Box dir={language === 'ar' ? 'rtl' : 'ltr'}>
              <Typography variant="h6" gutterBottom>
                {t('bio')}
              </Typography>
              
              {editMode ? (
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  defaultValue={language === 'en' ? profile.bio : profile.bio_ar}
                  variant="outlined"
                  sx={{ mb: 3 }}
                />
              ) : (
                <Typography variant="body1" paragraph>
                  {language === 'en' ? profile.bio : profile.bio_ar}
                </Typography>
              )}
            </Box>
          )}
          
          {/* Qualifications Tab */}
          {tabValue === 1 && (
            <Box dir={language === 'ar' ? 'rtl' : 'ltr'}>
              <Typography variant="h6" gutterBottom>
                {t('education')}
              </Typography>
              
              <List>
                {profile.education.map((edu, index) => (
                  <ListItem key={index} sx={{ pl: 0 }}>
                    <ListItemIcon>
                      <SchoolIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary={language === 'en' ? edu.degree : edu.degree_ar}
                      secondary={
                        <>
                          {language === 'en' ? edu.institution : edu.institution_ar}
                          {' • '}
                          {edu.year}
                        </>
                      }
                    />
                  </ListItem>
                ))}
              </List>
              
              <Divider sx={{ my: 2 }} />
              
              <Typography variant="h6" gutterBottom>
                {t('certifications')}
              </Typography>
              
              <List>
                {profile.certifications.map((cert, index) => (
                  <ListItem key={index} sx={{ pl: 0 }}>
                    <ListItemIcon>
                      <SchoolIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary={language === 'en' ? cert.name : cert.name_ar}
                      secondary={cert.year}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
          
          {/* Statistics Tab */}
          {tabValue === 2 && (
            <Grid container spacing={3} dir={language === 'ar' ? 'rtl' : 'ltr'}>
              <Grid item xs={12} sm={6} md={3}>
                <Card elevation={2}>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" color="primary" fontWeight="bold">
                      {profile.statistics.consultations}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {t('totalConsultations')}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} sm={6} md={3}>
                <Card elevation={2}>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" color="primary" fontWeight="bold">
                      {profile.statistics.patients}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {t('uniquePatients')}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} sm={6} md={3}>
                <Card elevation={2}>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" color="primary" fontWeight="bold">
                      {profile.statistics.avgRating}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {t('averageRating')}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} sm={6} md={3}>
                <Card elevation={2}>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" color="primary" fontWeight="bold">
                      {profile.statistics.yearsOfExperience}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {t('experience')}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default ProfilePage;
