import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  Chip,
  IconButton,
  CircularProgress,
  useTheme,
} from '@mui/material';
import {
  Edit as EditIcon,
  Save as SaveIcon,
  ArrowBack as ArrowBackIcon,
  Download as DownloadIcon,
  Print as PrintIcon,
  Share as ShareIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  background: '#ffffff',
  borderRadius: theme.shape.borderRadius * 2,
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

const GlowingButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
  color: 'white',
  padding: '8px 24px',
  borderRadius: '24px',
  transition: 'all 0.3s ease',
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
    transform: 'translateY(-2px)',
    boxShadow: `0 8px 25px ${theme.palette.primary.main}40`,
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
  '&:hover::after': {
    transform: 'translateX(100%)',
  },
}));

const StyledChip = styled(Chip)(({ theme, status }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'completed':
        return theme.palette.success;
      case 'pending':
        return theme.palette.warning;
      case 'in_progress':
        return theme.palette.info;
      default:
        return theme.palette.primary;
    }
  };

  const statusColor = getStatusColor();

  return {
    background: `linear-gradient(135deg, ${statusColor.light} 0%, ${statusColor.main} 100%)`,
    color: 'white',
    fontWeight: 500,
    padding: '4px 8px',
    height: 28,
    '& .MuiChip-label': {
      padding: '0 12px',
    },
    boxShadow: `0 4px 15px ${statusColor.main}40`,
  };
});

const ReportDetailPage = ({ language = 'en' }) => {
  const theme = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [report, setReport] = useState(null);

  const translations = {
    en: {
      reportDetails: 'Report Details',
      patientInfo: 'Patient Information',
      consultationDetails: 'Consultation Details',
      diagnosis: 'Diagnosis',
      prescription: 'Prescription',
      notes: 'Doctor Notes',
      edit: 'Edit',
      save: 'Save Changes',
      back: 'Back to Reports',
      download: 'Download',
      print: 'Print',
      share: 'Share',
      status: 'Status',
      patientName: 'Patient Name',
      patientAge: 'Age',
      patientGender: 'Gender',
      consultationDate: 'Consultation Date',
      consultationType: 'Consultation Type',
      doctor: 'Doctor',
      duration: 'Duration',
    },
    ar: {
      reportDetails: 'تفاصيل التقرير',
      patientInfo: 'معلومات المريض',
      consultationDetails: 'تفاصيل الاستشارة',
      diagnosis: 'التشخيص',
      prescription: 'الوصفة الطبية',
      notes: 'ملاحظات الطبيب',
      edit: 'تعديل',
      save: 'حفظ التغييرات',
      back: 'العودة إلى التقارير',
      download: 'تحميل',
      print: 'طباعة',
      share: 'مشاركة',
      status: 'الحالة',
      patientName: 'اسم المريض',
      patientAge: 'العمر',
      patientGender: 'الجنس',
      consultationDate: 'تاريخ الاستشارة',
      consultationType: 'نوع الاستشارة',
      doctor: 'الطبيب',
      duration: 'المدة',
    }
  };

  const t = (key) => translations[language]?.[key] || translations.en[key];

  useEffect(() => {
    // Simulated API call to fetch report data
    setTimeout(() => {
      setReport({
        id: id,
        patientName: 'Sarah Ahmed',
        patientAge: 28,
        patientGender: 'Female',
        consultationDate: '2025-06-30',
        consultationType: 'Follow-up',
        doctor: 'Dr. Huda',
        duration: '25 minutes',
        status: 'completed',
        diagnosis: 'Chronic migraine with aura',
        prescription: 'Sumatriptan 50mg\nPropranolol 40mg daily',
        notes: 'Patient reports improvement in frequency of migraines. Continue current medication regimen.',
      });
      setLoading(false);
    }, 1000);
  }, [id]);

  if (loading) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh' 
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box 
      sx={{ 
        p: 3,
        direction: language === 'ar' ? 'rtl' : 'ltr',
        background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
        color: 'white',
        borderRadius: theme.shape.borderRadius * 2,
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
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
        <IconButton 
          onClick={() => navigate('/reports')}
          sx={{ 
            color: 'white',
            bgcolor: 'rgba(255,255,255,0.1)',
            '&:hover': {
              bgcolor: 'rgba(255,255,255,0.2)',
            }
          }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" fontWeight="500">
          {t('reportDetails')}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <StyledChip 
          label={report.status} 
          status={report.status}
        />
        <GlowingButton
          startIcon={editing ? <SaveIcon /> : <EditIcon />}
          onClick={() => setEditing(!editing)}
        >
          {editing ? t('save') : t('edit')}
        </GlowingButton>
        <GlowingButton startIcon={<DownloadIcon />}>
          {t('download')}
        </GlowingButton>
        <GlowingButton startIcon={<PrintIcon />}>
          {t('print')}
        </GlowingButton>
        <GlowingButton startIcon={<ShareIcon />}>
          {t('share')}
        </GlowingButton>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <StyledCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {t('patientInfo')}
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label={t('patientName')}
                    value={report.patientName}
                    disabled={!editing}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': {
                          borderColor: theme.palette.primary.main,
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label={t('patientAge')}
                    value={report.patientAge}
                    disabled={!editing}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': {
                          borderColor: theme.palette.primary.main,
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label={t('patientGender')}
                    value={report.patientGender}
                    disabled={!editing}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': {
                          borderColor: theme.palette.primary.main,
                        },
                      },
                    }}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </StyledCard>
        </Grid>

        <Grid item xs={12} md={6}>
          <StyledCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {t('consultationDetails')}
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label={t('consultationDate')}
                    value={report.consultationDate}
                    disabled={!editing}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': {
                          borderColor: theme.palette.primary.main,
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label={t('consultationType')}
                    value={report.consultationType}
                    disabled={!editing}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': {
                          borderColor: theme.palette.primary.main,
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label={t('doctor')}
                    value={report.doctor}
                    disabled={!editing}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': {
                          borderColor: theme.palette.primary.main,
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label={t('duration')}
                    value={report.duration}
                    disabled={!editing}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': {
                          borderColor: theme.palette.primary.main,
                        },
                      },
                    }}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </StyledCard>
        </Grid>

        <Grid item xs={12}>
          <StyledCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {t('diagnosis')}
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={3}
                value={report.diagnosis}
                disabled={!editing}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: theme.palette.primary.main,
                    },
                  },
                }}
              />
            </CardContent>
          </StyledCard>
        </Grid>

        <Grid item xs={12} md={6}>
          <StyledCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {t('prescription')}
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                value={report.prescription}
                disabled={!editing}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: theme.palette.primary.main,
                    },
                  },
                }}
              />
            </CardContent>
          </StyledCard>
        </Grid>

        <Grid item xs={12} md={6}>
          <StyledCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {t('notes')}
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                value={report.notes}
                disabled={!editing}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: theme.palette.primary.main,
                    },
                  },
                }}
              />
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ReportDetailPage;