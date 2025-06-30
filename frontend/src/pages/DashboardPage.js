import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Button,
  CircularProgress,
  Paper,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  AccessTime as AccessTimeIcon,
  Group as GroupIcon,
  Assessment as AssessmentIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { Language as LanguageIcon } from '@mui/icons-material';

const StyledCard = styled(Card)(({ theme, dir }) => ({
  background: '#ffffff',
  borderRadius: theme.shape.borderRadius * 2,
  direction: dir || 'ltr',
  transition: 'all 0.3s ease',
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
    '&::after': {
      transform: 'translateX(100%)',
    },
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100%',
    background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)',
    pointerEvents: 'none',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: -100,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
    transition: 'transform 0.5s ease',
  },
}));

const GlowingIcon = styled(Box)(({ theme }) => ({
  width: 48,
  height: 48,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
  boxShadow: `0 0 20px ${theme.palette.primary.light}40`,
  marginBottom: theme.spacing(2),
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    borderRadius: '50%',
    background: `linear-gradient(135deg, ${theme.palette.primary.light}50 0%, ${theme.palette.primary.main}50 100%)`,
    filter: 'blur(8px)',
    zIndex: -1,
  },
  '& svg': {
    fontSize: 24,
    color: 'white',
    filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.5))',
  },
}));

const StatBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius * 2,
  background: `linear-gradient(135deg, ${theme.palette.primary.light}20 0%, ${theme.palette.primary.main}10 100%)`,
  backdropFilter: 'blur(10px)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)',
    pointerEvents: 'none',
  },
}));

const DashboardPage = ({ language = 'en', toggleLanguage }) => {
  const [loading, setLoading] = useState(true);
  const [statistics, setStatistics] = useState(null);
  const isRTL = language === 'ar';
  


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/statistics');
        const data = await response.json();
        setStatistics(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching statistics:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

  // Mock data for preview (will be replaced by actual API data)
  const mockStatistics = statistics || {
    monthly_consultations: [
      { month: "January", count: 45 },
      { month: "February", count: 52 },
      { month: "March", count: 48 },
      { month: "April", count: 61 },
      { month: "May", count: 58 },
      { month: "June", count: 64 }
    ],
    top_diagnoses: [
      { diagnosis: "Dysmenorrhea", diagnosis_ar: "عسر الطمث", count: 38 },
      { diagnosis: "Pregnancy Check", diagnosis_ar: "فحص الحمل", count: 32 },
      { diagnosis: "PCOS", diagnosis_ar: "متلازمة المبيض المتعدد الكيسات", count: 27 },
      { diagnosis: "UTI", diagnosis_ar: "التهاب المسالك البولية", count: 21 },
      { diagnosis: "Endometriosis", diagnosis_ar: "بطانة الرحم المهاجرة", count: 18 }
    ],
    consultation_types: [
      { type: "Initial Consultation", type_ar: "استشارة أولية", count: 150 },
      { type: "Follow-up", type_ar: "متابعة", count: 210 },
      { type: "Urgent Care", type_ar: "رعاية عاجلة", count: 45 }
    ],
    efficiency_metrics: {
      avg_consultation_time: 18.5,
      avg_report_generation_time: 3.2,
      avg_transcription_accuracy: 0.94,
      avg_icd_code_confidence: 0.87
    }
  };

  // Simple bar chart representation using div elements
  const SimpleBarChart = ({ data, valueKey, labelKey }) => {
    const maxValue = Math.max(...data.map(item => item[valueKey]));
    
    return (
      <Box sx={{ direction: isRTL ? 'rtl' : 'ltr' }}>
        {data.map((item, index) => {
          const label = language === 'en' ? 
            item[labelKey] : 
            (item[`${labelKey}_ar`] || item[labelKey]);
          
          const percentage = (item[valueKey] / maxValue) * 100;
          
          return (
            <Box key={index} mb={1}>
              <Typography variant="body2" gutterBottom dir={language === 'ar' ? 'rtl' : 'ltr'}>
                {label}: {item[valueKey]}
              </Typography>
              <Box 
                height={10} 
                borderRadius={5} 
                bgcolor="#ccc" 
                position="relative"
              >
                <Box 
                  height={10} 
                  borderRadius={5} 
                  bgcolor="#333" 
                  width={`${percentage}%`}
                  position="absolute"
                  top={0}
                  left={0}
                />
              </Box>
            </Box>
          );
        })}
      </Box>
    );
  };

  // Helper function for translations object
  const translations = {
    dashboard: {
      en: "Dashboard",
      ar: "لوحة المعلومات"
    },
    summary: {
      en: "Summary",
      ar: "ملخص"
    },
    consultationMetrics: {
      en: "Consultation Metrics",
      ar: "مقاييس الاستشارات"
    },
    monthlyConsultations: {
      en: "Monthly Consultations",
      ar: "الاستشارات الشهرية"
    },
    topDiagnoses: {
      en: "Top Diagnoses",
      ar: "التشخيصات الأكثر شيوعًا"
    },
    consultationTypes: {
      en: "Consultation Types",
      ar: "أنواع الاستشارات"
    },
    totalConsultations: {
      en: "Total Consultations",
      ar: "إجمالي الاستشارات"
    },
    avgTime: {
      en: "Avg. Consultation Time",
      ar: "متوسط وقت الاستشارة"
    },
    transcriptAccuracy: {
      en: "Transcript Accuracy",
      ar: "دقة النصوص"
    },
    codingConfidence: {
      en: "ICD Coding Confidence",
      ar: "مستوى الثقة في ترميز ICD"
    },
    minutes: {
      en: "minutes",
      ar: "دقائق"
    },
    switchLanguage: {
      en: "عربي",
      ar: "English"
    }
  };

  const t = (key) => {
    return translations[key]?.[language] || key;
  };

  // Sum all consultation counts
  const totalConsultations = mockStatistics.consultation_types.reduce(
    (sum, type) => sum + type.count, 0
  );

  return (
    <Box sx={{ py: 2, px: { xs: 2, md: 3 } }}>
      <Paper
        elevation={0}
        sx={{
          mb: 4,
          p: 3,
          background: `linear-gradient(135deg, #2196f3 0%, #1a237e 100%)`,
          color: 'white',
          borderRadius: 2,
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)',
            pointerEvents: 'none',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: -200,
            width: '200%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
            animation: 'shine 3s infinite',
          },
          '@keyframes shine': {
            '0%': { transform: 'translateX(-100%)' },
            '100%': { transform: 'translateX(50%)' }
          }
        }}
      >
        <Typography variant="h4" fontWeight="500" gutterBottom>
          {t('dashboard')}
        </Typography>
        <Typography variant="subtitle1" sx={{ opacity: 0.8 }}>
          {t('summary')}
        </Typography>
      </Paper>

      <Grid container spacing={3} sx={{ direction: isRTL ? 'rtl' : 'ltr' }}>
        <Grid item xs={12} sm={6} md={3}>
          <StyledCard>
            <CardContent>
              <GlowingIcon>
                <LanguageIcon />
              </GlowingIcon>
              <Typography 
                variant="h4" 
                sx={{ 
                  mb: 1,
                  background: `linear-gradient(135deg, #2196f3 0%, #1a237e 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {totalConsultations}
              </Typography>
              <Typography 
                variant="body2" 
                color="textSecondary" 
                gutterBottom
              >
                {t('totalConsultations')}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: 'success.main',
                  bgcolor: 'success.light',
                  px: 1,
                  py: 0.5,
                  borderRadius: 1,
                }}
              >
                +14%
              </Typography>
            </CardContent>
          </StyledCard>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StyledCard>
            <CardContent>
              <GlowingIcon>
                <AccessTimeIcon />
              </GlowingIcon>
              <Typography 
                variant="h4" 
                sx={{ 
                  mb: 1,
                  background: `linear-gradient(135deg, #2196f3 0%, #1a237e 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {mockStatistics.efficiency_metrics.avg_consultation_time}
              </Typography>
              <Typography 
                variant="body2" 
                color="textSecondary" 
                gutterBottom
              >
                {t('avgTime')} ({t('minutes')})
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: 'error.main',
                  bgcolor: 'error.light',
                  px: 1,
                  py: 0.5,
                  borderRadius: 1,
                }}
              >
                -2.5%
              </Typography>
            </CardContent>
          </StyledCard>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StyledCard>
            <CardContent>
              <GlowingIcon>
                <GroupIcon />
              </GlowingIcon>
              <Typography 
                variant="h4" 
                sx={{ 
                  mb: 1,
                  background: `linear-gradient(135deg, #2196f3 0%, #1a237e 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {mockStatistics.consultation_types.reduce((sum, type) => sum + type.count, 0)}
              </Typography>
              <Typography 
                variant="body2" 
                color="textSecondary" 
                gutterBottom
              >
                {t('activePatients')}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: 'success.main',
                  bgcolor: 'success.light',
                  px: 1,
                  py: 0.5,
                  borderRadius: 1,
                }}
              >
                +7.8%
              </Typography>
            </CardContent>
          </StyledCard>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StyledCard>
            <CardContent>
              <GlowingIcon>
                <AssessmentIcon />
              </GlowingIcon>
              <Typography 
                variant="h4" 
                sx={{ 
                  mb: 1,
                  background: `linear-gradient(135deg, #2196f3 0%, #1a237e 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {mockStatistics.efficiency_metrics.avg_transcription_accuracy * 100}%
              </Typography>
              <Typography 
                variant="body2" 
                color="textSecondary" 
                gutterBottom
              >
                {t('transcriptAccuracy')}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: 'success.main',
                  bgcolor: 'success.light',
                  px: 1,
                  py: 0.5,
                  borderRadius: 1,
                }}
              >
                +3.1%
              </Typography>
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12} md={8}>
          <StyledCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {t('consultationsToday')}
              </Typography>
              <SimpleBarChart 
                data={mockStatistics.monthly_consultations} 
                valueKey="count" 
                labelKey="month"
              />
            </CardContent>
          </StyledCard>
        </Grid>
        <Grid item xs={12} md={4}>
          <StatBox>
            <Typography variant="h6" gutterBottom>
              {t('consultationMetrics')}
            </Typography>
            <SimpleBarChart 
              data={mockStatistics.top_diagnoses} 
              valueKey="count" 
              labelKey="diagnosis"
            />
          </StatBox>
        </Grid>
      </Grid>

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
          {t('dashboard')}
        </Typography>
        <Button 
          variant="outlined" 
          onClick={toggleLanguage}
          sx={{ minWidth: 100 }}
        >
          {t('switchLanguage')}
        </Button>
      </Box>
    </Box>
  );
};

export default DashboardPage;
