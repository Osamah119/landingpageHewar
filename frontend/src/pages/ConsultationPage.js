import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
  Avatar,
  Paper,
  TextField,
  IconButton,
  useTheme,
} from '@mui/material';
import {
  Mic as MicIcon,
  Stop as StopIcon,
  Pause as PauseIcon,
  Description as DescriptionIcon,
  MicOff as MicOffIcon,
  Person as PersonIcon,
} from '@mui/icons-material';

const ConsultationPage = ({ language = 'en' }) => {
  const theme = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();
  const [recording, setRecording] = useState(false);
  const [paused, setPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [patientDetails, setPatientDetails] = useState({
    name: '',
    age: '',
    gender: '',
    visitReason: '',
  });

  const translations = {
    en: {
      newConsultation: 'New Consultation',
      consultation: 'Consultation',
      patientInfo: 'Patient Information',
      patientName: 'Patient Name',
      age: 'Age',
      gender: 'Gender',
      visitReason: 'Reason for Visit',
      readyToRecord: 'Ready to Record',
      clickToStart: 'Click the microphone button to start recording the consultation',
      consultationDetails: 'Consultation Details',
      doctor: 'Doctor',
      specialty: 'Specialty',
      dateTime: 'Date & Time',
      languages: 'Languages',
      resume: 'Resume',
      pause: 'Pause',
      stop: 'Stop Recording',
      live: 'LIVE',
      paused: 'PAUSED'
    },
    ar: {
      newConsultation: 'استشارة جديدة',
      consultation: 'استشارة',
      patientInfo: 'معلومات المريض',
      patientName: 'اسم المريض',
      age: 'العمر',
      gender: 'الجنس',
      visitReason: 'سبب الزيارة',
      readyToRecord: 'جاهز للتسجيل',
      clickToStart: 'انقر على زر الميكروفون لبدء تسجيل الاستشارة',
      consultationDetails: 'تفاصيل الاستشارة',
      doctor: 'الطبيب',
      specialty: 'التخصص',
      dateTime: 'التاريخ والوقت',
      languages: 'اللغات',
      resume: 'استئناف',
      pause: 'إيقاف مؤقت',
      stop: 'إيقاف التسجيل',
      live: 'مباشر',
      paused: 'متوقف'
    }
  };

  const t = (key) => translations[language]?.[key] || translations.en[key];

  // Timer effect for recording
  useEffect(() => {
    let interval;
    if (recording && !paused) {
      interval = setInterval(() => {
        setRecordingTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [recording, paused]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPatientDetails({
      ...patientDetails,
      [name]: value,
    });
  };

  const toggleRecording = () => {
    if (!recording) {
      // Start recording
      setRecording(true);
      setPaused(false);
    } else {
      // Stop recording
      setRecording(false);
      setPaused(false);
      
      // In a real app, you would process the recording here
      // For demo, we'll navigate to the transcript page after a delay
      setTimeout(() => {
        navigate(`/consultation/${id === 'new' ? 1 : id}/transcript`);
      }, 1000);
    }
  };

  const togglePause = () => {
    setPaused(!paused);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Box sx={{ 
      p: 3,
      direction: language === 'ar' ? 'rtl' : 'ltr'
    }}>
      <Paper
        elevation={0}
        sx={{
          mb: 4,
          p: 3,
          background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          color: 'white',
          borderRadius: 2,
          position: 'relative',
          overflow: 'hidden',
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)',
            animation: 'shine 2s infinite',
          },
          '@keyframes shine': {
            '0%': { transform: 'translateX(-100%)' },
            '100%': { transform: 'translateX(100%)' }
          }
        }}
      >
        <Typography variant="h4" component="h1" fontWeight="500">
          {id === 'new' ? t('newConsultation') : t('consultation')}
        </Typography>
      </Paper>

      <Grid container spacing={4}>
        <Grid item xs={12} md={5}>
          <Card 
            elevation={2}
            sx={{
              mb: 3,
              background: '#ffffff',
              borderRadius: 2,
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: 4
              }
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PersonIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                <Typography variant="h6">{t('patientInfo')}</Typography>
              </Box>
              <TextField
                fullWidth
                label={t('patientName')}
                name="name"
                value={patientDetails.name}
                onChange={handleInputChange}
                margin="normal"
                variant="outlined"
                placeholder={language === 'en' ? "e.g., Fatima Ahmed" : "مثال: فاطمة أحمد"}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: theme.palette.primary.main,
                    },
                  },
                }}
              />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label={t('age')}
                    name="age"
                    value={patientDetails.age}
                    onChange={handleInputChange}
                    margin="normal"
                    variant="outlined"
                    placeholder={language === 'en' ? "e.g., 25" : "مثال: 25"}
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
                    label={t('gender')}
                    name="gender"
                    value={patientDetails.gender}
                    onChange={handleInputChange}
                    margin="normal"
                    variant="outlined"
                    placeholder={language === 'en' ? "e.g., Female" : "مثال: أنثى"}
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
              <TextField
                fullWidth
                label={t('visitReason')}
                name="visitReason"
                value={patientDetails.visitReason}
                onChange={handleInputChange}
                margin="normal"
                variant="outlined"
                multiline
                rows={3}
                placeholder={language === 'en' ? "e.g., Abdominal pain during menstruation" : "مثال: ألم في البطن أثناء الدورة الشهرية"}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: theme.palette.primary.main,
                    },
                  },
                }}
              />
            </CardContent>
          </Card>
          
          <Card 
            sx={{ 
              background: '#ffffff',
              borderRadius: 2,
              transition: 'all 0.2s',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: 4
              }
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <DescriptionIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                <Typography variant="h6">
                  Doctor Notes
                </Typography>
              </Box>
              <TextField
                fullWidth
                placeholder="Add any additional notes here..."
                multiline
                rows={5}
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: theme.palette.primary.main,
                    },
                  },
                }}
              />
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={7}>
          <Box sx={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 300,
            background: `linear-gradient(135deg, ${theme.palette.primary.light}20 0%, ${theme.palette.primary.main}10 100%)`,
            borderRadius: 2,
            position: 'relative',
            overflow: 'hidden'
          }}>
            {recording ? (
              <Box sx={{ textAlign: 'center' }}>
                <Box
                  sx={{
                    width: 120,
                    height: 120,
                    borderRadius: '50%',
                    background: paused ? theme.palette.warning.light : theme.palette.error.light,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 3,
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      top: -4,
                      left: -4,
                      right: -4,
                      bottom: -4,
                      borderRadius: '50%',
                      border: '2px solid',
                      borderColor: paused ? theme.palette.warning.main : theme.palette.error.main,
                      animation: paused ? 'none' : 'pulse 1.5s infinite'
                    },
                    '@keyframes pulse': {
                      '0%': {
                        transform: 'scale(1)',
                        opacity: 1
                      },
                      '100%': {
                        transform: 'scale(1.3)',
                        opacity: 0
                      }
                    }
                  }}
                >
                  <Typography variant="h4" sx={{ color: 'white' }}>
                    {formatTime(recordingTime)}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                  <Button
                    variant="contained"
                    color="error"
                    startIcon={<StopIcon />}
                    onClick={toggleRecording}
                    sx={{
                      background: `linear-gradient(135deg, ${theme.palette.error.light} 0%, ${theme.palette.error.main} 100%)`,
                      '&:hover': {
                        background: `linear-gradient(135deg, ${theme.palette.error.main} 0%, ${theme.palette.error.dark} 100%)`
                      }
                    }}
                  >
                    {t('stop')}
                  </Button>
                  <Button
                    variant="outlined"
                    color="warning"
                    startIcon={paused ? <MicIcon /> : <PauseIcon />}
                    onClick={togglePause}
                    sx={{
                      borderColor: theme.palette.warning.main,
                      color: theme.palette.warning.main,
                      '&:hover': {
                        borderColor: theme.palette.warning.dark,
                        background: theme.palette.warning.light
                      }
                    }}
                  >
                    {paused ? t('resume') : t('pause')}
                  </Button>
                </Box>
              </Box>
            ) : (
              <Box sx={{ textAlign: 'center' }}>
                <IconButton
                  color="primary"
                  aria-label="start recording"
                  component="span"
                  sx={{
                    width: 100,
                    height: 100,
                    background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
                    color: 'white',
                    '&:hover': {
                      background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                      transform: 'scale(1.05)'
                    },
                    transition: 'transform 0.2s',
                    mb: 3,
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      top: -4,
                      left: -4,
                      right: -4,
                      bottom: -4,
                      borderRadius: '50%',
                      border: `2px solid ${theme.palette.primary.light}`,
                      animation: 'ripple 1.5s infinite'
                    },
                    '@keyframes ripple': {
                      '0%': {
                        transform: 'scale(1)',
                        opacity: 1
                      },
                      '100%': {
                        transform: 'scale(1.3)',
                        opacity: 0
                      }
                    }
                  }}
                  onClick={toggleRecording}
                >
                  <MicIcon sx={{ fontSize: 40 }} />
                </IconButton>
                <Typography variant="h6" gutterBottom>
                  {t('readyToRecord')}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {t('clickToStart')}
                </Typography>
              </Box>
            )}
          </Box>

          <Card 
            sx={{ 
              mt: 3,
              background: '#ffffff',
              borderRadius: 2,
              transition: 'all 0.2s',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: 4
              }
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <DescriptionIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                  <Typography variant="h6">
                    {t('consultationDetails')}
                  </Typography>
                </Box>
                
                {recording && (
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      bgcolor: paused ? 'warning.light' : 'error.light',
                      color: paused ? 'warning.dark' : 'error.dark', 
                      py: 0.5, 
                      px: 2, 
                      borderRadius: 8,
                      animation: paused ? 'none' : 'blink 2s infinite'
                    }}
                  >
                    {paused ? t('paused') : t('live')}
                  </Typography>
                )}
              </Box>
              
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    {t('doctor')}:
                  </Typography>
                  <Typography variant="body1">
                    Dr. Huda
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    {t('specialty')}:
                  </Typography>
                  <Typography variant="body1">
                    OB/GYN
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    {t('dateTime')}:
                  </Typography>
                  <Typography variant="body1">
                    {new Date().toLocaleString('en-US', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    {t('languages')}:
                  </Typography>
                  <Typography variant="body1">
                    Arabic, English
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ConsultationPage;
