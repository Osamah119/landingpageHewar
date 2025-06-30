import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import Layout from './Layout';
import { useLanguage } from '../contexts/LanguageContext';

// Pages
import DashboardPage from '../pages/DashboardPage';
import ConsultationPage from '../pages/ConsultationPage';
import ReportsPage from '../pages/ReportsPage';
import ProfilePage from '../pages/ProfilePage';

const DashboardLayout = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();

  // Check authentication
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      navigate('/login');
      return;
    }
  }, [navigate]);

  return (
    <Layout>
      <Routes>
        <Route index element={<DashboardPage />} />
        <Route path="consultation/new" element={<ConsultationPage />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Routes>
    </Layout>
  );
};

export default DashboardLayout;
