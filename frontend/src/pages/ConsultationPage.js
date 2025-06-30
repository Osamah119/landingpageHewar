import React, { useState } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Box,
  Paper,
  Divider,
  Alert,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import {
  Person as PersonIcon,
  Mic as MicIcon,
  Stop as StopIcon,
  Save as SaveIcon,
  VolumeUp as VolumeUpIcon,
  Translate as TranslateIcon,
  MedicalServices as MedicalServicesIcon
} from '@mui/icons-material';
import { useLanguage } from '../contexts/LanguageContext';

const ConsultationPage = () => {
  const { language } = useLanguage();
  const [isRecording, setIsRecording] = useState(false);
  const [patientInfo, setPatientInfo] = useState({
    name: '',
    age: '',
    gender: '',
    phone: '',
    medicalHistory: ''
  });
  const [consultation, setConsultation] = useState({
    chiefComplaint: '',
    symptoms: '',
    diagnosis: '',
    treatment: '',
    notes: ''
  });
  const [transcript, setTranscript] = useState('');
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');

  const handlePatientInfoChange = (field, value) => {
    setPatientInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleConsultationChange = (field, value) => {
    setConsultation(prev => ({ ...prev, [field]: value }));
  };

  const startRecording = () => {
    setIsRecording(true);
    // Simulate recording functionality
    setTimeout(() => {
      setTranscript('Patient: I have been experiencing headaches for the past week.\nDoctor: Can you describe the intensity and location of the pain?\nPatient: The pain is mostly in my forehead and temples, around 6-7 out of 10.\nDoctor: Any triggers you notice?\nPatient: It seems to get worse when I work on the computer for long periods.');
    }, 2000);
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  const handleSaveConsultation = () => {
    // Simulate saving consultation
    setSaveStatus('saving');
    setTimeout(() => {
      setSaveStatus('success');
      setTimeout(() => {
        setShowSaveDialog(false);
        setSaveStatus('');
      }, 2000);
    }, 1500);
  };

  const suggestedICD10 = [
    { code: 'G44.1', description: language === 'ar' ? 'صداع وعائي' : 'Vascular headache' },
    { code: 'G44.2', description: language === 'ar' ? 'صداع توتري' : 'Tension-type headache' },
    { code: 'Z51.11', description: language === 'ar' ? 'متابعة طبية' : 'Medical follow-up' }
  ];

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
        {language === 'ar' ? 'استشارة جديدة' : 'New Consultation'}
      </Typography>

      <Grid container spacing={4}>
        {/* Patient Information */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: 'fit-content' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <PersonIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">
                  {language === 'ar' ? 'معلومات المريض' : 'Patient Information'}
                </Typography>
              </Box>
              
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label={language === 'ar' ? 'اسم المريض' : 'Patient Name'}
                    value={patientInfo.name}
                    onChange={(e) => handlePatientInfoChange('name', e.target.value)}
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label={language === 'ar' ? 'العمر' : 'Age'}
                    type="number"
                    value={patientInfo.age}
                    onChange={(e) => handlePatientInfoChange('age', e.target.value)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label={language === 'ar' ? 'الجنس' : 'Gender'}
                    value={patientInfo.gender}
                    onChange={(e) => handlePatientInfoChange('gender', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label={language === 'ar' ? 'رقم الهاتف' : 'Phone Number'}
                    value={patientInfo.phone}
                    onChange={(e) => handlePatientInfoChange('phone', e.target.value)}
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label={language === 'ar' ? 'التاريخ المرضي' : 'Medical History'}
                    value={patientInfo.medicalHistory}
                    onChange={(e) => handlePatientInfoChange('medicalHistory', e.target.value)}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Recording Section */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: 'fit-content' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <TranslateIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">
                  {language === 'ar' ? 'تسجيل المحادثة' : 'Conversation Recording'}
                </Typography>
              </Box>

              <Box sx={{ textAlign: 'center', mb: 3 }}>
                {!isRecording ? (
                  <Button
                    variant="contained"
                    startIcon={<MicIcon />}
                    onClick={startRecording}
                    size="large"
                    sx={{ 
                      background: 'linear-gradient(135deg, #7cdfd3 0%, #5cb7ac 100%)',
                      color: 'white',
                      px: 4,
                      py: 1.5
                    }}
                  >
                    {language === 'ar' ? 'بدء التسجيل' : 'Start Recording'}
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    startIcon={<StopIcon />}
                    onClick={stopRecording}
                    size="large"
                    color="error"
                    sx={{ px: 4, py: 1.5 }}
                  >
                    {language === 'ar' ? 'إيقاف التسجيل' : 'Stop Recording'}
                  </Button>
                )}
              </Box>

              {isRecording && (
                <Alert severity="info" sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <VolumeUpIcon sx={{ mr: 1 }} />
                    {language === 'ar' ? 'جاري التسجيل...' : 'Recording in progress...'}
                  </Box>
                </Alert>
              )}

              {transcript && (
                <Paper sx={{ p: 2, bgcolor: '#f8fffe', maxHeight: 200, overflow: 'auto' }}>
                  <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                    {transcript}
                  </Typography>
                </Paper>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Consultation Notes */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <MedicalServicesIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">
                  {language === 'ar' ? 'ملاحظات الاستشارة' : 'Consultation Notes'}
                </Typography>
              </Box>

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label={language === 'ar' ? 'الشكوى الرئيسية' : 'Chief Complaint'}
                    value={consultation.chiefComplaint}
                    onChange={(e) => handleConsultationChange('chiefComplaint', e.target.value)}
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label={language === 'ar' ? 'الأعراض' : 'Symptoms'}
                    value={consultation.symptoms}
                    onChange={(e) => handleConsultationChange('symptoms', e.target.value)}
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label={language === 'ar' ? 'التشخيص' : 'Diagnosis'}
                    value={consultation.diagnosis}
                    onChange={(e) => handleConsultationChange('diagnosis', e.target.value)}
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label={language === 'ar' ? 'العلاج' : 'Treatment'}
                    value={consultation.treatment}
                    onChange={(e) => handleConsultationChange('treatment', e.target.value)}
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label={language === 'ar' ? 'ملاحظات إضافية' : 'Additional Notes'}
                    value={consultation.notes}
                    onChange={(e) => handleConsultationChange('notes', e.target.value)}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* ICD-10 Suggestions */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                {language === 'ar' ? 'اقتراحات رموز ICD-10' : 'ICD-10 Code Suggestions'}
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {suggestedICD10.map((item, index) => (
                  <Chip
                    key={index}
                    label={`${item.code} - ${item.description}`}
                    variant="outlined"
                    clickable
                    sx={{ 
                      borderColor: 'primary.main',
                      '&:hover': { bgcolor: 'primary.light', color: 'white' }
                    }}
                  />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Action Buttons */}
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button
              variant="outlined"
              size="large"
              sx={{ px: 4 }}
            >
              {language === 'ar' ? 'مسح' : 'Clear'}
            </Button>
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={() => setShowSaveDialog(true)}
              size="large"
              sx={{ 
                background: 'linear-gradient(135deg, #7cdfd3 0%, #5cb7ac 100%)',
                color: 'white',
                px: 4
              }}
            >
              {language === 'ar' ? 'حفظ الاستشارة' : 'Save Consultation'}
            </Button>
          </Box>
        </Grid>
      </Grid>

      {/* Save Dialog */}
      <Dialog open={showSaveDialog} onClose={() => setShowSaveDialog(false)}>
        <DialogTitle>
          {language === 'ar' ? 'حفظ الاستشارة' : 'Save Consultation'}
        </DialogTitle>
        <DialogContent>
          {saveStatus === 'saving' && (
            <Alert severity="info">
              {language === 'ar' ? 'جاري حفظ الاستشارة...' : 'Saving consultation...'}
            </Alert>
          )}
          {saveStatus === 'success' && (
            <Alert severity="success">
              {language === 'ar' ? 'تم حفظ الاستشارة بنجاح!' : 'Consultation saved successfully!'}
            </Alert>
          )}
          {saveStatus === '' && (
            <Typography>
              {language === 'ar' ? 'هل تريد حفظ هذه الاستشارة؟' : 'Do you want to save this consultation?'}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowSaveDialog(false)}>
            {language === 'ar' ? 'إلغاء' : 'Cancel'}
          </Button>
          <Button onClick={handleSaveConsultation} variant="contained" disabled={saveStatus === 'saving'}>
            {language === 'ar' ? 'حفظ' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ConsultationPage;
