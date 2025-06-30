import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import Layout from './Layout';
import { useLanguage } from '../contexts/LanguageContext';

// Temporary components with language support
const DashboardContent = () => {
  const { language } = useLanguage();
  return <div>{language === 'ar' ? 'لوحة التحكم' : 'Dashboard'}</div>;
};

const ConsultationContent = () => {
  const { language } = useLanguage();
  return <div>{language === 'ar' ? 'استشارة جديدة' : 'New Consultation'}</div>;
};

const TranscriptContent = () => {
  const { language } = useLanguage();
  return <div>{language === 'ar' ? 'النص' : 'Transcript'}</div>;
};

const SummaryContent = () => {
  const { language } = useLanguage();
  return <div>{language === 'ar' ? 'الملخص' : 'Summary'}</div>;
};

const ReportsContent = () => {
  const { language } = useLanguage();
  return <div>{language === 'ar' ? 'التقارير' : 'Reports'}</div>;
};

const ReportDetailContent = () => {
  const { language } = useLanguage();
  return <div>{language === 'ar' ? 'تفاصيل التقرير' : 'Report Details'}</div>;
};

const ProfileContent = () => {
  const { language } = useLanguage();
  return <div>{language === 'ar' ? 'الملف الشخصي' : 'Profile'}</div>;
};

const DashboardLayout = () => {
  const { language } = useLanguage();

  return (
    <Layout>
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Routes>
          <Route path="/" element={<DashboardContent />} />
          <Route path="/consultation/new" element={<ConsultationContent />} />
          <Route path="/consultation/:id/transcript" element={<TranscriptContent />} />
          <Route path="/consultation/:id/summary" element={<SummaryContent />} />
          <Route path="/reports" element={<ReportsContent />} />
          <Route path="/report/:id" element={<ReportDetailContent />} />
          <Route path="/profile" element={<ProfileContent />} />
        </Routes>
      </Box>
    </Layout>
  );
};

export default DashboardLayout;
