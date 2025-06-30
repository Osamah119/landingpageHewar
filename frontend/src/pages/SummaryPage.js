import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Collapse,
  IconButton,
  Snackbar,
  Alert,
  Paper,
  CircularProgress,
  Chip
} from '@mui/material';
import {
  MedicalServices as MedicalIcon,
  LocalHospital as HospitalIcon,
  CheckCircle as CheckCircleIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  ExpandMore,
  ExpandLess
} from '@mui/icons-material';
import axios from 'axios';

const SummaryPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [soapData, setSoapData] = useState(null);
  const [icdCodes, setIcdCodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saving, setSaving] = useState(false);
  const [language, setLanguage] = useState('en'); // 'en' for English, 'ar' for Arabic
  const [expanded, setExpanded] = useState({
    subjective: true,
    objective: true,
    assessment: true,
    plan: true
  });
  const [editMode, setEditMode] = useState({
    subjective: false,
    objective: false,
    assessment: false,
    plan: false
  });

  useEffect(() => {
    // بيانات وهمية للعرض
    setSoapData({
      subjective: 'المريضة تشكو من ألم في البطن منذ يومين. الألم متقطع ويزداد مع الحركة.',
      objective: 'الضغط: 120/80\nالنبض: 72\nالحرارة: 37.2\nالفحص السريري: ألم عند الضغط على البطن',
      assessment: 'التشخيص المبدئي: آلام في البطن - يحتمل التهاب في المعدة',
      plan: 'إجراء تحليل دم كامل\nأشعة بطن\nمضاد حيوي لمدة 5 أيام\nمراجعة بعد أسبوع'
    });

    setIcdCodes([
      { code: 'R10.4', description: 'Other and unspecified abdominal pain', description_ar: 'ألم في البطن، غير محدد', confidence: 0.92, selected: true },
      { code: 'R10.30', description: 'Lower abdominal pain, unspecified', description_ar: 'ألم في البطن السفلي، غير محدد', confidence: 0.85, selected: false },
      { code: 'K29.70', description: 'Gastritis, unspecified', description_ar: 'التهاب المعدة، غير محدد', confidence: 0.78, selected: true }
    ]);

    setLoading(false);
  }, []);

  const handleSaveToEMR = () => {
    setSaving(true);
    // محاكاة عملية الحفظ
    setTimeout(() => {
      setSaving(false);
      setSaveSuccess(true);
      // الانتقال إلى لوحة التحكم بعد 3 ثوان
      setTimeout(() => {
        navigate('/dashboard');
      }, 3000);
    }, 2000);
  };

  const toggleExpand = (section) => {
    setExpanded({
      ...expanded,
      [section]: !expanded[section]
    });
  };

  const toggleEditMode = (section) => {
    setEditMode({
      ...editMode,
      [section]: !editMode[section]
    });
  };

  const handleSoapChange = (section, value) => {
    setSoapData({
      ...(soapData || {}),
      [section]: value
    });
  };

  const toggleIcdSelection = (index) => {
    const updatedCodes = [...icdCodes];
    updatedCodes[index] = {
      ...updatedCodes[index],
      selected: !updatedCodes[index].selected
    };
    setIcdCodes(updatedCodes);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {language === 'ar' ? 'الملخص السريري' : 'Clinical Summary'}
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
          >
            {language === 'ar' ? 'English' : 'العربية'}
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
            onClick={handleSaveToEMR}
            disabled={saving}
          >
            {saving ? (language === 'ar' ? 'جاري الحفظ...' : 'Saving...') : 
                     (language === 'ar' ? 'حفظ في السجل الطبي' : 'Save to EMR')}
          </Button>
        </Box>
      </Box>
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                SOAP Note
              </Typography>
              
              {/* Subjective Section */}
              <Paper variant="outlined" sx={{ mb: 2, overflow: 'hidden' }}>
                <Box 
                  sx={{ 
                    p: 2, 
                    backgroundColor: 'primary.light', 
                    color: 'primary.contrastText',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      S: Subjective
                    </Typography>
                    <IconButton 
                      size="small" 
                      onClick={() => toggleExpand('subjective')} 
                      sx={{ ml: 1, color: 'inherit' }}
                    >
                      {expanded.subjective ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
                  </Box>
                  <IconButton 
                    size="small" 
                    onClick={() => toggleEditMode('subjective')} 
                    sx={{ color: 'inherit' }}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Box>
                <Collapse in={expanded.subjective}>
                  <Box sx={{ p: 2 }}>
                    {editMode.subjective ? (
                      <TextField
                        fullWidth
                        multiline
                        rows={4}
                        value={language === 'ar' ? (soapData?.subjective_ar || '') : (soapData?.subjective || '')}
                        onChange={(e) => handleSoapChange(language === 'ar' ? 'subjective_ar' : 'subjective', e.target.value)}
                        variant="outlined"
                        dir={language === 'ar' ? 'rtl' : 'ltr'}
                      />
                    ) : (
                      <Typography variant="body1" dir={language === 'ar' ? 'rtl' : 'ltr'}>
                        {language === 'ar' ? (soapData?.subjective_ar || '') : (soapData?.subjective || '')}
                      </Typography>
                    )}
                  </Box>
                </Collapse>
              </Paper>
              
              {/* Objective Section */}
              <Paper variant="outlined" sx={{ mb: 2, overflow: 'hidden' }}>
                <Box 
                  sx={{ 
                    p: 2, 
                    backgroundColor: 'secondary.light', 
                    color: 'secondary.contrastText',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      O: Objective
                    </Typography>
                    <IconButton 
                      size="small" 
                      onClick={() => toggleExpand('objective')} 
                      sx={{ ml: 1, color: 'inherit' }}
                    >
                      {expanded.objective ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
                  </Box>
                  <IconButton 
                    size="small" 
                    onClick={() => toggleEditMode('objective')} 
                    sx={{ color: 'inherit' }}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Box>
                <Collapse in={expanded.objective}>
                  <Box sx={{ p: 2 }}>
                    {editMode.objective ? (
                      <TextField
                        fullWidth
                        multiline
                        rows={3}
                        value={language === 'ar' ? (soapData?.objective_ar || '') : (soapData?.objective || '')}
                        onChange={(e) => handleSoapChange(language === 'ar' ? 'objective_ar' : 'objective', e.target.value)}
                        variant="outlined"
                        dir={language === 'ar' ? 'rtl' : 'ltr'}
                      />
                    ) : (
                      <Typography variant="body1" dir={language === 'ar' ? 'rtl' : 'ltr'}>
                        {language === 'ar' ? (soapData?.objective_ar || '') : (soapData?.objective || '')}
                      </Typography>
                    )}
                  </Box>
                </Collapse>
              </Paper>
              
              {/* Assessment Section */}
              <Paper variant="outlined" sx={{ mb: 2, overflow: 'hidden' }}>
                <Box 
                  sx={{ 
                    p: 2, 
                    backgroundColor: 'info.light', 
                    color: 'info.contrastText',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      A: Assessment
                    </Typography>
                    <IconButton 
                      size="small" 
                      onClick={() => toggleExpand('assessment')} 
                      sx={{ ml: 1, color: 'inherit' }}
                    >
                      {expanded.assessment ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
                  </Box>
                  <IconButton 
                    size="small" 
                    onClick={() => toggleEditMode('assessment')} 
                    sx={{ color: 'inherit' }}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Box>
                <Collapse in={expanded.assessment}>
                  <Box sx={{ p: 2 }}>
                    {editMode.assessment ? (
                      <TextField
                        fullWidth
                        multiline
                        rows={3}
                        value={language === 'ar' ? (soapData?.assessment_ar || '') : (soapData?.assessment || '')}
                        onChange={(e) => handleSoapChange(language === 'ar' ? 'assessment_ar' : 'assessment', e.target.value)}
                        variant="outlined"
                        dir={language === 'ar' ? 'rtl' : 'ltr'}
                      />
                    ) : (
                      <Typography variant="body1" dir={language === 'ar' ? 'rtl' : 'ltr'}>
                        {language === 'ar' ? (soapData?.assessment_ar || '') : (soapData?.assessment || '')}
                      </Typography>
                    )}
                  </Box>
                </Collapse>
              </Paper>
              
              {/* Plan Section */}
              <Paper variant="outlined" sx={{ overflow: 'hidden' }}>
                <Box 
                  sx={{ 
                    p: 2, 
                    backgroundColor: 'warning.light', 
                    color: 'warning.contrastText',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      P: Plan
                    </Typography>
                    <IconButton 
                      size="small" 
                      onClick={() => toggleExpand('plan')} 
                      sx={{ ml: 1, color: 'inherit' }}
                    >
                      {expanded.plan ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
                  </Box>
                  <IconButton 
                    size="small" 
                    onClick={() => toggleEditMode('plan')} 
                    sx={{ color: 'inherit' }}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Box>
                <Collapse in={expanded.plan}>
                  <Box sx={{ p: 2 }}>
                    {editMode.plan ? (
                      <TextField
                        fullWidth
                        multiline
                        rows={4}
                        value={language === 'ar' ? (soapData?.plan_ar || '') : (soapData?.plan || '')}
                        onChange={(e) => handleSoapChange(language === 'ar' ? 'plan_ar' : 'plan', e.target.value)}
                        variant="outlined"
                        dir={language === 'ar' ? 'rtl' : 'ltr'}
                      />
                    ) : (
                      <Typography 
                        variant="body1" 
                        sx={{ whiteSpace: 'pre-line' }}
                        dir={language === 'ar' ? 'rtl' : 'ltr'}
                      >
                        {language === 'ar' ? (soapData?.plan_ar || '') : (soapData?.plan || '')}
                      </Typography>
                    )}
                  </Box>
                </Collapse>
              </Paper>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                ICD-10 Code Suggestions
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Select the appropriate diagnosis code(s)
              </Typography>
              
              <List>
                {icdCodes.map((code, index) => (
                  <React.Fragment key={code.code}>
                    <ListItem 
                      button 
                      onClick={() => toggleIcdSelection(index)}
                      sx={{
                        borderRadius: 1,
                        bgcolor: code.selected ? 'primary.50' : 'transparent',
                        border: code.selected ? '1px solid' : 'none',
                        borderColor: 'primary.main',
                        mb: 1
                      }}
                    >
                      <ListItemIcon>
                        <MedicalIcon 
                          color={code.selected ? 'primary' : 'action'} 
                        />
                      </ListItemIcon>
                      <ListItemText 
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography variant="subtitle2" sx={{ mr: 1 }}>
                              {code.code}
                            </Typography>
                            <Typography variant="body2">
                              {code.description}
                            </Typography>
                          </Box>
                        } 
                        secondary={
                          <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                            <Typography variant="caption" color="text.secondary">
                              Confidence:
                            </Typography>
                            <Box 
                              sx={{ 
                                width: '100px', 
                                height: '6px', 
                                bgcolor: 'grey.200', 
                                borderRadius: '3px',
                                mx: 1 
                              }}
                            >
                              <Box 
                                sx={{ 
                                  width: `${code.confidence * 100}%`, 
                                  height: '100%', 
                                  bgcolor: code.confidence > 0.8 ? 'success.main' : 'warning.main',
                                  borderRadius: '3px'
                                }} 
                              />
                            </Box>
                            <Typography variant="caption" color="text.secondary">
                              {Math.round(code.confidence * 100)}%
                            </Typography>
                          </Box>
                        }
                      />
                      {code.selected && <CheckCircleIcon color="primary" />}
                    </ListItem>
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                EMR Integration
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <HospitalIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="body1">
                  Epic Systems
                </Typography>
              </Box>
              
              <Grid container spacing={1} sx={{ mb: 2 }}>
                <Grid item xs={6}>
                  <Chip 
                    label="SNOMED-CT" 
                    color="primary" 
                    variant="outlined" 
                    size="small" 
                    sx={{ width: '100%' }} 
                  />
                </Grid>
                <Grid item xs={6}>
                  <Chip 
                    label="LOINC" 
                    color="secondary" 
                    variant="outlined" 
                    size="small" 
                    sx={{ width: '100%' }} 
                  />
                </Grid>
                <Grid item xs={6}>
                  <Chip 
                    label="RxNorm" 
                    color="info" 
                    variant="outlined" 
                    size="small" 
                    sx={{ width: '100%' }} 
                  />
                </Grid>
                <Grid item xs={6}>
                  <Chip 
                    label="ICD-10" 
                    color="success" 
                    variant="outlined" 
                    size="small" 
                    sx={{ width: '100%' }} 
                  />
                </Grid>
              </Grid>
              
              <Button
                variant="contained"
                fullWidth
                startIcon={<SaveIcon />}
                onClick={handleSaveToEMR}
                disabled={saving}
                sx={{ py: 1 }}
              >
                {saving ? 'Saving...' : 'Push to EMR'}
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      <Snackbar
        open={saveSuccess}
        autoHideDuration={6000}
        onClose={() => setSaveSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          severity="success" 
          variant="filled"
          sx={{ width: '100%' }}
        >
          Note pushed to EMR successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SummaryPage;
