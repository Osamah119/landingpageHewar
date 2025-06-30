import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Grid, Card, CardContent, Typography, Button, Container } from '@mui/material';
import { useLanguage } from '../contexts/LanguageContext';

const DashboardPage = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();

  const stats = [
    { label: language === 'ar' ? 'الاستشارات اليوم' : 'Today\'s Consultations', value: '5' },
    { label: language === 'ar' ? 'الاستشارات هذا الشهر' : 'Monthly Consultations', value: '42' },
    { label: language === 'ar' ? 'إجمالي الاستشارات' : 'Total Consultations', value: '156' },
  ];

  return (
    <Container>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
          {language === 'ar' ? 'لوحة التحكم' : 'Dashboard'}
        </Typography>
        
        <Grid container spacing={3}>
          {stats.map((stat, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card sx={{
                height: '100%',
                background: 'linear-gradient(135deg, #ffffff 0%, #f8fffe 100%)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)'
                }
              }}>
                <CardContent>
                  <Typography variant="h3" sx={{ mb: 1, color: 'primary.main', fontWeight: 700 }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    {stat.label}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ mb: 3 }}>
          {language === 'ar' ? 'الإجراءات السريعة' : 'Quick Actions'}
        </Typography>
        <Grid container spacing={2}>
          <Grid item>
            <Button
              variant="contained"
              onClick={() => navigate('/dashboard/consultation/new')}
              sx={{
                background: 'linear-gradient(135deg, #7cdfd3 0%, #5cb7ac 100%)',
                color: 'white',
                px: 4
              }}
            >
              {language === 'ar' ? 'استشارة جديدة' : 'New Consultation'}
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              onClick={() => navigate('/dashboard/reports')}
              sx={{ px: 4 }}
            >
              {language === 'ar' ? 'عرض التقارير' : 'View Reports'}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default DashboardPage;
