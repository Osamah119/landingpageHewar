import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const translations = {
  ar: {
    title: 'حوار',
    subtitle: 'مساعد طبي ذكي ثنائي اللغة',
    email: 'البريد الإلكتروني',
    password: 'كلمة المرور',
    signIn: 'تسجيل الدخول',
    demo: 'بيانات تجريبية: dr.huda@hewar.ai / password123',
  },
  en: {
    title: 'HEWAR',
    subtitle: 'Bilingual AI Assistant for Medical Professionals',
    email: 'Email Address',
    password: 'Password',
    signIn: 'Sign In',
    demo: 'Demo credentials: dr.huda@hewar.ai / password123',
  }
};

const LoginPage = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language];
  const isRTL = language === 'ar';
  
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // For demo purposes, we'll just navigate to dashboard
    navigate('/dashboard');
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: 'linear-gradient(120deg, #f0f8ff 0%, #e3f2fd 100%)',
        direction: isRTL ? 'rtl' : 'ltr'
      }}
    >
      <Container maxWidth="sm">
        <Card sx={{ boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)' }}>
          <CardContent sx={{ p: 4 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mb: 3,
              }}
            >
              <Typography
                variant="h4"
                component="h1"
                gutterBottom
                sx={{ fontWeight: 700, color: 'primary.main' }}
              >
                {t.title}
              </Typography>
              <Typography variant="subtitle1" sx={{ mb: 3, textAlign: 'center' }}>
                {t.subtitle}
              </Typography>
            </Box>
            
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label={t.email}
                name="email"
                autoComplete="email"
                autoFocus
                value={formData.email}
                onChange={handleChange}
                sx={{ mb: 3 }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label={t.password}
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={togglePassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 3 }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{ mt: 2, py: 1.5, fontWeight: 600 }}
              >
                {t.signIn}
              </Button>
              
              <Box sx={{ mt: 4, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  {t.demo}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default LoginPage;
