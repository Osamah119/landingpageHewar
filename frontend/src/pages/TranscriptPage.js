import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  List,
  ListItem,
  Paper,
  Divider,
  Alert,
  Chip,
  IconButton,
  Tooltip,
  TextField,
  CircularProgress
} from '@mui/material';
import {
  Warning as WarningIcon,
  Check as CheckIcon,
  NavigateNext as NextIcon,
  ContentCopy as CopyIcon,
  Edit as EditIcon,
  Save as SaveIcon
} from '@mui/icons-material';

const TranscriptPage = ({ language = 'ar' }) => {
  const { id = '1' } = useParams();
  const navigate = useNavigate();
  const [transcript, setTranscript] = useState([
    { id: 1, speaker: 'doctor', text: 'مرحباً، كيف حالك اليوم؟', timestamp: '00:00' },
    { id: 2, speaker: 'patient', text: 'أشعر بألم في البطن منذ يومين', timestamp: '00:05' },
    { id: 3, speaker: 'doctor', text: 'هل يمكنك وصف الألم؟ هل هو مستمر أم متقطع؟', timestamp: '00:10' },
    { id: 4, speaker: 'patient', text: 'الألم متقطع ويزداد عند الحركة', timestamp: '00:15' },
    { id: 5, speaker: 'doctor', text: 'هل تناولت أي دواء لتخفيف الألم؟', timestamp: '00:20' },
    { id: 6, speaker: 'patient', text: 'نعم، تناولت مسكن ألم لكن لم يساعد كثيراً', timestamp: '00:25' }
  ]);

  const [soapData, setSoapData] = useState({
    subjective: '',
    objective: '',
    assessment: '',
    plan: ''
  });

  const [suggestedCodes] = useState([
    { code: 'R10.4', description: 'Other and unspecified abdominal pain', description_ar: 'ألم في البطن، غير محدد' },
    { code: 'R10.30', description: 'Lower abdominal pain, unspecified', description_ar: 'ألم في البطن السفلي، غير محدد' },
    { code: 'R10.13', description: 'Epigastric pain', description_ar: 'ألم في المعدة' }
  ]);

  const [selectedCodes, setSelectedCodes] = useState([]);
  const [isEditing, setIsEditing] = useState({
    subjective: false,
    objective: false,
    assessment: false,
    plan: false
  });

  const [missingInfo] = useState({
    field: 'Previous Medical History',
    field_ar: 'التاريخ الطبي السابق',
    description: 'Please add information about any previous similar symptoms or chronic conditions',
    description_ar: 'يرجى إضافة معلومات عن أي أعراض مماثلة سابقة أو حالات مزمنة'
  });

  const [isEditingTranscript, setIsEditingTranscript] = useState(false);
  const [editedTranscript, setEditedTranscript] = useState(transcript);

  const handleProceedToSummary = () => {
    // استخدام المعرف 1 إذا كان غير محدد
    const consultationId = id || '1';
    navigate(`/consultation/${consultationId}/summary`);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {language === 'ar' ? 'مراجعة النص' : 'Transcript Review'}
        </Typography>
        
        <Button 
          variant="outlined" 
          color="primary"
        >
          {language === 'ar' ? 'English' : 'العربية'}
        </Button>
      </Box>
      
      {missingInfo && (
        <Alert 
          severity="warning" 
          icon={<WarningIcon />}
          sx={{ 
            mb: 4, 
            display: 'flex', 
            alignItems: 'center',
            borderLeft: '4px solid',
            borderColor: 'warning.main'
          }}
          action={
            <Button color="warning" variant="outlined" size="small">
              {language === 'ar' ? 'إضافة معلومات' : 'Add Info'}
            </Button>
          }
        >
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
              {language === 'ar' ? 'معلومات ناقصة: ' : 'Missing Information: '}
              {language === 'ar' ? missingInfo.field_ar : missingInfo.field}
            </Typography>
            <Typography variant="body2" dir={language === 'ar' ? 'rtl' : 'ltr'}>
              {language === 'ar' ? missingInfo.description_ar : missingInfo.description}
            </Typography>
          </Box>
        </Alert>
      )}
      
      <Grid container spacing={3}>
        {/* SOAP Note Section */}
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            {language === 'ar' ? 'ملاحظة SOAP' : 'SOAP Note'}
          </Typography>

          {/* Subjective Section */}
          <Paper sx={{ mb: 3, overflow: 'hidden' }}>
            <Box
              sx={{
                p: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                bgcolor: '#cef3ef'
              }}
            >
              <Typography variant="h6">
                S: {language === 'ar' ? 'الشكوى' : 'Subjective'}
              </Typography>
              <IconButton
                size="small"
                onClick={() => setIsEditing({ ...isEditing, subjective: !isEditing.subjective })}
              >
                {isEditing.subjective ? <SaveIcon /> : <EditIcon />}
              </IconButton>
            </Box>
            <Box sx={{ p: 2 }}>
              <List sx={{ width: '100%' }}>
                {transcript.map((item, index) => (
                  <React.Fragment key={item.id}>
                    <ListItem
                      sx={{
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        py: 2
                      }}
                    >
                      <Box
                        sx={{
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          mb: 1
                        }}
                      >
                        <Chip
                          label={language === 'ar' ? (item.speaker === 'doctor' ? 'الطبيب' : 'المريض') : item.speaker}
                          size="small"
                          color={item.speaker === 'doctor' ? 'primary' : 'default'}
                          sx={{ mr: 1 }}
                        />
                        <Typography variant="caption" color="text.secondary">
                          {item.timestamp}
                        </Typography>
                      </Box>
                      <Typography
                        variant="body1"
                        sx={{
                          width: '100%',
                          direction: language === 'ar' ? 'rtl' : 'ltr'
                        }}
                      >
                        {item.text}
                      </Typography>
                    </ListItem>
                    {index < transcript.length - 1 && (
                      <Divider variant="fullWidth" component="li" />
                    )}
                  </React.Fragment>
                ))}
              </List>
            </Box>
          </Paper>

          {/* Objective Section */}
          <Paper sx={{ mb: 3, overflow: 'hidden' }}>
            <Box
              sx={{
                p: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                bgcolor: '#484444',
                color: 'white'
              }}
            >
              <Typography variant="h6">
                O: {language === 'ar' ? 'الفحص' : 'Objective'}
              </Typography>
              <IconButton
                size="small"
                onClick={() => setIsEditing({ ...isEditing, objective: !isEditing.objective })}
                sx={{ color: 'white' }}
              >
                {isEditing.objective ? <SaveIcon /> : <EditIcon />}
              </IconButton>
            </Box>
            <Box sx={{ p: 2 }}>
              <TextField
                multiline
                rows={4}
                fullWidth
                value={soapData.objective}
                onChange={(e) => setSoapData({ ...soapData, objective: e.target.value })}
                disabled={!isEditing.objective}
                sx={{ direction: language === 'ar' ? 'rtl' : 'ltr' }}
              />
            </Box>
          </Paper>

          {/* Assessment Section with ICD-10 Codes */}
          <Paper sx={{ mb: 3, overflow: 'hidden' }}>
            <Box
              sx={{
                p: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                bgcolor: '#7cdfd3'
              }}
            >
              <Typography variant="h6">
                A: {language === 'ar' ? 'التقييم' : 'Assessment'}
              </Typography>
              <IconButton
                size="small"
                onClick={() => setIsEditing({ ...isEditing, assessment: !isEditing.assessment })}
              >
                {isEditing.assessment ? <SaveIcon /> : <EditIcon />}
              </IconButton>
            </Box>
            <Box sx={{ p: 2 }}>
              {/* ICD-10 Code Suggestions */}
              <Typography variant="subtitle1" gutterBottom>
                {language === 'ar' ? 'رموز ICD-10 المقترحة:' : 'Suggested ICD-10 Codes:'}
              </Typography>
              <Box sx={{ mb: 3, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {suggestedCodes.map((code) => (
                  <Chip
                    key={code.code}
                    label={`${code.code} - ${language === 'ar' ? code.description_ar : code.description}`}
                    onClick={() => !selectedCodes.includes(code.code) && setSelectedCodes([...selectedCodes, code.code])}
                    sx={{
                      bgcolor: selectedCodes.includes(code.code) ? '#cef3ef' : 'white',
                      border: '1px solid #7cdfd3',
                      '&:hover': {
                        bgcolor: '#e6f9f7'
                      }
                    }}
                  />
                ))}
              </Box>

              {/* Selected Codes */}
              {selectedCodes.length > 0 && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    {language === 'ar' ? 'الرموز المختارة:' : 'Selected Codes:'}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {selectedCodes.map((code) => (
                      <Chip
                        key={code}
                        label={code}
                        onDelete={() => setSelectedCodes(selectedCodes.filter(c => c !== code))}
                        color="primary"
                        sx={{ bgcolor: '#7cdfd3' }}
                      />
                    ))}
                  </Box>
                </Box>
              )}

              <TextField
                multiline
                rows={4}
                fullWidth
                value={soapData.assessment}
                onChange={(e) => setSoapData({ ...soapData, assessment: e.target.value })}
                disabled={!isEditing.assessment}
                sx={{ direction: language === 'ar' ? 'rtl' : 'ltr' }}
              />
            </Box>
          </Paper>

          {/* Plan Section */}
          <Paper sx={{ mb: 3, overflow: 'hidden' }}>
            <Box
              sx={{
                p: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                bgcolor: '#a5e9e1'
              }}
            >
              <Typography variant="h6">
                P: {language === 'ar' ? 'الخطة' : 'Plan'}
              </Typography>
              <IconButton
                size="small"
                onClick={() => setIsEditing({ ...isEditing, plan: !isEditing.plan })}
              >
                {isEditing.plan ? <SaveIcon /> : <EditIcon />}
              </IconButton>
            </Box>
            <Box sx={{ p: 2 }}>
              <TextField
                multiline
                rows={4}
                fullWidth
                value={soapData.plan}
                onChange={(e) => setSoapData({ ...soapData, plan: e.target.value })}
                disabled={!isEditing.plan}
                sx={{ direction: language === 'ar' ? 'rtl' : 'ltr' }}
              />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} lg={8}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, alignItems: 'center' }}>
                <Typography variant="h6">
                  {language === 'ar' ? 'نص المحادثة' : 'Consultation Transcript'}
                </Typography>
                <Box>
                  <Tooltip title={language === 'ar' ? 'نسخ النص' : 'Copy transcript'}>
                    <IconButton 
                      size="small" 
                      sx={{ 
                        mr: 1,
                        color: '#484444',
                        '&:hover': {
                          backgroundColor: 'rgba(124, 223, 211, 0.1)',
                          transform: 'translateY(-2px)',
                        },
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <CopyIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={language === 'ar' ? (isEditingTranscript ? 'حفظ التغييرات' : 'تعديل النص') : (isEditingTranscript ? 'Save changes' : 'Edit transcript')}>
                    <IconButton 
                      size="small"
                      onClick={() => {
                        if (isEditingTranscript) {
                          setTranscript(editedTranscript);
                        }
                        setIsEditingTranscript(!isEditingTranscript);
                        setEditedTranscript(transcript);
                      }}
                      sx={{
                        color: isEditingTranscript ? '#7cdfd3' : '#484444',
                        '&:hover': {
                          backgroundColor: 'rgba(124, 223, 211, 0.1)',
                          transform: 'translateY(-2px)',
                        },
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
              
                <Paper 
                  variant="outlined" 
                  sx={{ 
                    p: 2,
                    bgcolor: 'background.default',
                    '& .MuiTypography-root': {
                      direction: language === 'ar' ? 'rtl' : 'ltr'
                    }
                  }}
                >  
                  <List sx={{ width: '100%' }}>
                    {(isEditingTranscript ? editedTranscript : transcript).map((item, index) => (
                      <React.Fragment key={item.id}>
                        <ListItem
                          sx={{
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            py: 2
                          }}
                        >
                          <Box
                            sx={{
                              width: '100%',
                              display: 'flex',
                              alignItems: 'center',
                              mb: 1
                            }}
                          >
                            <Chip
                              label={language === 'ar' ? (item.speaker === 'doctor' ? 'الطبيب' : 'المريض') : item.speaker}
                              size="small"
                              color={item.speaker === 'doctor' ? 'primary' : 'default'}
                              sx={{ mr: 1 }}
                            />
                            <Typography variant="caption" color="text.secondary">
                              {item.timestamp}
                            </Typography>
                          </Box>
                          
                          {isEditing ? (
                            <Box sx={{ width: '100%' }}>
                              <textarea
                                value={item.text}
                                onChange={(e) => {
                                  const newTranscript = editedTranscript.map((t) =>
                                    t.id === item.id ? { ...t, text: e.target.value } : t
                                  );
                                  setEditedTranscript(newTranscript);
                                }}
                                style={{
                                  width: '100%',
                                  minHeight: '60px',
                                  padding: '8px',
                                  border: '1px solid #e0e0e0',
                                  borderRadius: '4px',
                                  fontFamily: "'Roboto', 'Cairo', sans-serif",
                                  fontSize: '16px',
                                  resize: 'vertical',
                                  direction: language === 'ar' ? 'rtl' : 'ltr'
                                }}
                              />
                            </Box>
                          ) : (
                            <Typography
                              variant="body1"
                              sx={{
                                width: '100%',
                                fontFamily: "'Roboto', 'Cairo', sans-serif",
                                direction: language === 'ar' ? 'rtl' : 'ltr',
                                color: '#2e2b2b'
                              }}
                            >
                              {item.text}
                            </Typography>
                          )}
                        </ListItem>
                        {index < transcript.length - 1 && (
                          <Divider
                            variant="fullWidth"
                            component="li"
                            sx={{
                              borderColor: 'rgba(0, 0, 0, 0.08)',
                              margin: '0 24px'
                            }}
                          />
                        )}
                      </React.Fragment>
                    ))}
                  </List>
                </Paper>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} lg={4}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Consultation Summary
              </Typography>
              
              <Box sx={{ my: 2 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Patient Information
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Name:</Typography>
                  <Typography variant="body2" fontWeight="medium">Fatima Ahmed</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Age:</Typography>
                  <Typography variant="body2" fontWeight="medium">25</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="body2">Gender:</Typography>
                  <Typography variant="body2" fontWeight="medium">Female</Typography>
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ my: 2 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Key Points Detected
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                  <Chip label="Abdominal pain" size="small" />
                  <Chip label="During period" size="small" />
                  <Chip label="Worsening symptoms" size="small" />
                  <Chip label="Dysmenorrhea" size="small" color="primary" variant="outlined" />
                </Box>
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  AI Analysis Progress
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <CheckIcon color="success" fontSize="small" sx={{ mr: 1 }} />
                  <Typography variant="body2">Transcription completed</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <CheckIcon color="success" fontSize="small" sx={{ mr: 1 }} />
                  <Typography variant="body2">Key points identified</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <WarningIcon color="warning" fontSize="small" sx={{ mr: 1 }} />
                  <Typography variant="body2">Missing information detected</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button
              variant="contained"
              onClick={() => navigate(`/consultation/${id}/soap`)}
              size="large"
              fullWidth
              sx={{
                py: 1.5,
                bgcolor: '#7cdfd3',
                '&:hover': {
                  bgcolor: '#6bcdc1'
                }
              }}
            >
              {language === 'ar' ? 'إنشاء ملاحظة SOAP' : 'Create SOAP Note'}
            </Button>
            <Button
              variant="outlined"
              endIcon={<NextIcon />}
              onClick={handleProceedToSummary}
              size="large"
              fullWidth
              sx={{ py: 1.5 }}
            >
              {language === 'ar' ? 'إنشاء ملخص سريري' : 'Generate Clinical Summary'}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TranscriptPage;
