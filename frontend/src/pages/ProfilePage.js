import React from 'react';
import { Container, Typography, Card, Grid } from '@mui/material';
import { useLanguage } from '../contexts/LanguageContext';

const ProfilePage = () => {
  const { language } = useLanguage();
  const userInfo = JSON.parse(localStorage.getItem('user_info') || '{}');

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 4 }}>
        {language === 'ar' ? 'الملف الشخصي' : 'Profile'}
      </Typography>
      <Card sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="subtitle1" color="text.secondary">
              {language === 'ar' ? 'الاسم' : 'Name'}
            </Typography>
            <Typography variant="h6">{userInfo.name}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" color="text.secondary">
              {language === 'ar' ? 'التخصص' : 'Role'}
            </Typography>
            <Typography variant="h6">{userInfo.role}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" color="text.secondary">
              {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
            </Typography>
            <Typography variant="h6">{userInfo.email}</Typography>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
};

export default ProfilePage;
