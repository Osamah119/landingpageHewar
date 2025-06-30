import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  Grid,
  Button,
  IconButton,
  TextField,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Tooltip,
  CircularProgress,
  Fade,
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Download as DownloadIcon,
} from '@mui/icons-material';

const ReportsPage = ({ language = 'ar' }) => {
  const isRTL = language === 'ar';
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Translations object
  const translations = {
    reports: {
      en: "Medical Reports",
      ar: "التقارير الطبية"
    },
    newReport: {
      en: "New Report",
      ar: "تقرير جديد"
    },
    search: {
      en: "Search reports...",
      ar: "البحث في التقارير..."
    },
    filterByDoctor: {
      en: "Filter by Doctor",
      ar: "تصفية حسب الطبيب"
    },
    filterByStatus: {
      en: "Filter by Status",
      ar: "تصفية حسب الحالة"
    },
    allDoctors: {
      en: "All Doctors",
      ar: "جميع الأطباء"
    },
    allStatuses: {
      en: "All Statuses",
      ar: "جميع الحالات"
    },
    patientName: {
      en: "Patient Name",
      ar: "اسم المريض"
    },
    doctor: {
      en: "Doctor",
      ar: "الطبيب"
    },
    date: {
      en: "Date",
      ar: "التاريخ"
    },
    status: {
      en: "Status",
      ar: "الحالة"
    },
    actions: {
      en: "Actions",
      ar: "الإجراءات"
    },
    view: {
      en: "View",
      ar: "عرض"
    },
    edit: {
      en: "Edit",
      ar: "تعديل"
    },
    download: {
      en: "Download",
      ar: "تحميل"
    },
    pending: {
      en: "Pending",
      ar: "قيد الانتظار"
    },
    completed: {
      en: "Completed",
      ar: "مكتمل"
    },
    inProgress: {
      en: "In Progress",
      ar: "قيد التنفيذ"
    }
  };

  // Helper function for translations
  const t = (key) => {
    return translations[key]?.[language] || key;
  };

  // Mock data for demonstration
  const mockReports = [
    {
      id: 1,
      patientName: "Sarah Johnson",
      patientName_ar: "سارة جونسون",
      doctor: "Dr. Ahmed Hassan",
      doctor_ar: "د. أحمد حسن",
      date: "2025-06-29",
      status: "completed",
      diagnosis: "Chronic Migraine",
      diagnosis_ar: "الصداع النصفي المزمن"
    },
    {
      id: 2,
      patientName: "Mohammed Ali",
      patientName_ar: "محمد علي",
      doctor: "Dr. Emily Parker",
      doctor_ar: "د. إيميلي باركر",
      date: "2025-06-28",
      status: "pending",
      diagnosis: "Hypertension",
      diagnosis_ar: "ارتفاع ضغط الدم"
    },
    {
      id: 3,
      patientName: "Fatima Ahmed",
      patientName_ar: "فاطمة أحمد",
      doctor: "Dr. John Smith",
      doctor_ar: "د. جون سميث",
      date: "2025-06-27",
      status: "in_progress",
      diagnosis: "Diabetes Type 2",
      diagnosis_ar: "السكري من النوع الثاني"
    },
    {
      id: 4,
      patientName: "Ahmad Hassan",
      patientName_ar: "أحمد حسن",
      doctor: "Dr. Sarah Wilson",
      doctor_ar: "د. سارة ويلسون",
      date: "2025-06-26",
      status: "completed",
      diagnosis: "Asthma",
      diagnosis_ar: "الربو"
    },
    {
      id: 5,
      patientName: "Sarah Johnson",
      patientName_ar: "سارة جونسون",
      doctor: "Dr. Ahmed Hassan",
      doctor_ar: "د. أحمد حسن",
      date: "2025-06-29",
      status: "completed",
      diagnosis: "Chronic Migraine",
      diagnosis_ar: "الصداع النصفي المزمن"
    },
    {
      id: 6,
      patientName: "Mohammed Ali",
      patientName_ar: "محمد علي",
      doctor: "Dr. Emily Parker",
      doctor_ar: "د. إيميلي باركر",
      date: "2025-06-28",
      status: "pending",
      diagnosis: "Hypertension",
      diagnosis_ar: "ارتفاع ضغط الدم"
    },
    // Add more mock data as needed
  ];

  useEffect(() => {
    // Simulate API call
    const fetchReports = async () => {
      setLoading(true);
      try {
        // In a real application, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setReports(mockReports);
        setFilteredReports(mockReports);
      } catch (error) {
        console.error('Error fetching reports:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  useEffect(() => {
    // Filter reports based on search term and filters
    const filtered = reports.filter(report => {
      const matchesSearch = (
        report[language === 'ar' ? 'patientName_ar' : 'patientName'].toLowerCase().includes(searchTerm.toLowerCase()) ||
        report[language === 'ar' ? 'doctor_ar' : 'doctor'].toLowerCase().includes(searchTerm.toLowerCase()) ||
        report[language === 'ar' ? 'diagnosis_ar' : 'diagnosis'].toLowerCase().includes(searchTerm.toLowerCase())
      );

      const matchesDoctor = selectedDoctor === 'all' || report.doctor === selectedDoctor;
      const matchesStatus = selectedStatus === 'all' || report.status === selectedStatus;

      return matchesSearch && matchesDoctor && matchesStatus;
    });

    setFilteredReports(filtered);
  }, [searchTerm, selectedDoctor, selectedStatus, reports, language]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return {
          bg: '#cef3ef',
          color: '#2e2b2b',
          borderColor: '#7cdfd3'
        };
      case 'pending':
        return {
          bg: '#484444',
          color: '#ffffff',
          borderColor: '#2e2b2b'
        };
      case 'inProgress':
        return {
          bg: '#a5e9e1',
          color: '#2e2b2b',
          borderColor: '#7cdfd3'
        };
      default:
        return {
          bg: '#ffffff',
          color: '#2e2b2b',
          borderColor: '#cef3ef'
        };
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <CircularProgress 
          sx={{
            color: '#7cdfd3',
            '& .MuiCircularProgress-circle': {
              strokeLinecap: 'round',
            }
          }}
        />
      </Box>
    );
  }

  return (
    <Box sx={{ direction: isRTL ? 'rtl' : 'ltr', p: 3 }}>

          {/* Header Section */}
          <Box
            sx={{
              mb: 4, 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 2
            }}
          >
            <Typography 
              variant="h4" 
              component="h1"
              sx={{ 
                fontWeight: 'bold',
                textAlign: isRTL ? 'right' : 'left',
                width: '100%'
              }}
            >
              {t('reports')}
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              sx={{
                background: 'linear-gradient(135deg, #484444 0%, #2e2b2b 100%)',
                color: '#ffffff',
                '&:hover': {
                  background: 'linear-gradient(135deg, #2e2b2b 0%, #1a1818 100%)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                },
                transition: 'all 0.3s ease',
                position: 'relative',
                zIndex: 1
              }}
            >
              {t('newReport')}
            </Button>
          </Box>

          {/* Filters Section */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder={t('search')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: <SearchIcon sx={{ mr: 1, color: '#484444' }} />,
                  sx: {
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#a5e9e1',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#7cdfd3',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#7cdfd3',
                    },
                    borderRadius: 2,
                    backgroundColor: '#ffffff',
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                select
                fullWidth
                value={selectedDoctor}
                onChange={(e) => setSelectedDoctor(e.target.value)}
                variant="outlined"
                InputProps={{
                  startAdornment: <FilterIcon sx={{ mr: 1, color: '#484444' }} />,
                  sx: {
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#a5e9e1',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#7cdfd3',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#7cdfd3',
                    },
                    borderRadius: 2,
                    backgroundColor: '#ffffff',
                  }
                }}
              >
                <MenuItem value="all">{t('allDoctors')}</MenuItem>
                {/* Add doctor options */}
              </TextField>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                select
                fullWidth
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                variant="outlined"
                InputProps={{
                  startAdornment: <FilterIcon sx={{ mr: 1, color: '#484444' }} />,
                  sx: {
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#a5e9e1',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#7cdfd3',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#7cdfd3',
                    },
                    borderRadius: 2,
                    backgroundColor: '#ffffff',
                  }
                }}
              >
                <MenuItem value="all">{t('allStatuses')}</MenuItem>
                <MenuItem value="pending">{t('pending')}</MenuItem>
                <MenuItem value="inProgress">{t('inProgress')}</MenuItem>
                <MenuItem value="completed">{t('completed')}</MenuItem>
              </TextField>
            </Grid>
          </Grid>

          {/* Reports Table */}
          <TableContainer 
            component={Paper}
            sx={{
              borderRadius: 2,
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              overflow: 'hidden',
              '& .MuiTableCell-root': {
                textAlign: isRTL ? 'right' : 'left',
                direction: isRTL ? 'rtl' : 'ltr'
              },
              transition: 'all 0.3s ease'
            }}
          >
            <Table>
            <TableHead>
              <TableRow>
                <TableCell 
                  sx={{ 
                    fontWeight: 600,
                    backgroundColor: '#cef3ef',
                    color: '#2e2b2b',
                    borderBottom: '2px solid #7cdfd3'
                  }}
                >
                  {t('patientName')}
                </TableCell>
                <TableCell 
                  sx={{ 
                    fontWeight: 600,
                    backgroundColor: '#cef3ef',
                    color: '#2e2b2b',
                    borderBottom: '2px solid #7cdfd3'
                  }}
                >
                  {t('doctor')}
                </TableCell>
                <TableCell 
                  sx={{ 
                    fontWeight: 600,
                    backgroundColor: '#cef3ef',
                    color: '#2e2b2b',
                    borderBottom: '2px solid #7cdfd3'
                  }}
                >
                  {t('date')}
                </TableCell>
                <TableCell 
                  sx={{ 
                    fontWeight: 600,
                    backgroundColor: '#cef3ef',
                    color: '#2e2b2b',
                    borderBottom: '2px solid #7cdfd3'
                  }}
                >
                  {t('status')}
                </TableCell>
                <TableCell 
                  sx={{ 
                    fontWeight: 600,
                    backgroundColor: '#cef3ef',
                    color: '#2e2b2b',
                    borderBottom: '2px solid #7cdfd3'
                  }}
                >
                  {t('actions')}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredReports.map((report) => (
                <TableRow
                  key={report.id}
                  sx={{
                    '&:hover': {
                      backgroundColor: 'rgba(206, 243, 239, 0.1)',
                      '& .action-buttons': {
                        opacity: 1,
                      }
                    },
                  }}
                >
                  <TableCell>
                    {language === 'ar' ? report.patientName_ar : report.patientName}
                  </TableCell>
                  <TableCell>
                    {language === 'ar' ? report.doctor_ar : report.doctor}
                  </TableCell>
                  <TableCell>
                    {new Date(report.date).toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US')}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={t(report.status)}
                      sx={{
                        backgroundColor: getStatusColor(report.status).bg,
                        color: getStatusColor(report.status).color,
                        border: `1px solid ${getStatusColor(report.status).borderColor}`,
                        fontWeight: 500,
                        '&:hover': {
                          backgroundColor: getStatusColor(report.status).bg,
                          filter: 'brightness(0.95)',
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Box 
                      className="action-buttons"
                      sx={{ 
                        opacity: { xs: 1, md: 0 },
                        transition: 'opacity 0.2s ease'
                      }}
                    >
                      <Tooltip title={t('view')}>
                        <IconButton
                          onClick={() => navigate(`/report/${report.id}`)}
                          sx={{
                            color: '#7cdfd3',
                            '&:hover': {
                              backgroundColor: 'rgba(124, 223, 211, 0.1)',
                              transform: 'translateY(-2px)',
                            },
                            transition: 'all 0.2s ease',
                          }}
                        >
                          <VisibilityIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title={t('edit')}>
                        <IconButton
                          onClick={() => navigate(`/report/${report.id}/edit`)}
                          sx={{
                            color: '#484444',
                            '&:hover': {
                              backgroundColor: 'rgba(72, 68, 68, 0.1)',
                              transform: 'translateY(-2px)',
                            },
                            transition: 'all 0.2s ease',
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title={t('download')}>
                        <IconButton
                          sx={{
                            color: '#2e2b2b',
                            '&:hover': {
                              backgroundColor: 'rgba(46, 43, 43, 0.1)',
                              transform: 'translateY(-2px)',
                            },
                            transition: 'all 0.2s ease',
                          }}
                        >
                          <DownloadIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
    </Box>
  );
};

export default ReportsPage;