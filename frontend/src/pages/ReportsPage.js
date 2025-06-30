import React from 'react';
import { Container, Typography, Card } from '@mui/material';
import { useLanguage } from '../contexts/LanguageContext';

const ReportsPage = () => {
  const { language } = useLanguage();
  
  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 4 }}>
        {language === 'ar' ? 'التقارير' : 'Reports'}
      </Typography>
      <Card sx={{ p: 3 }}>
        <Typography variant="body1">
          {language === 'ar'
            ? 'نظام التقارير قيد التطوير. سيتم إضافة قائمة التقارير قريباً.'
            : 'Reports system is under development. Reports list will be added soon.'}
        </Typography>
      </Card>
    </Container>
  );
};

export default ReportsPage;