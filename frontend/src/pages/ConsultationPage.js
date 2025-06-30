import React from 'react';
import { Container, Typography, Card } from '@mui/material';
import { useLanguage } from '../contexts/LanguageContext';

const ConsultationPage = () => {
  const { language } = useLanguage();
  
  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 4 }}>
        {language === 'ar' ? 'استشارة جديدة' : 'New Consultation'}
      </Typography>
      <Card sx={{ p: 3 }}>
        <Typography variant="body1">
          {language === 'ar' 
            ? 'نظام الاستشارات قيد التطوير. سيتم إضافة نموذج الاستشارة قريباً.'
            : 'Consultation system is under development. Consultation form will be added soon.'}
        </Typography>
      </Card>
    </Container>
  );
};

export default ConsultationPage;
