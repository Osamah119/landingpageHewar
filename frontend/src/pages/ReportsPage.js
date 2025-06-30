import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Button,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Divider,
  Avatar,
  Stack,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  Assessment as AssessmentIcon,
  FileDownload as FileDownloadIcon,
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  FilterList as FilterListIcon,
  Search as SearchIcon,
  Today as TodayIcon,
  CalendarMonth as CalendarMonthIcon,
  Person as PersonIcon
} from '@mui/icons-material';
import { useLanguage } from '../contexts/LanguageContext';

const ReportsPage = () => {
  const { language } = useLanguage();
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    dateRange: 'all',
    status: 'all'
  });
  const [stats, setStats] = useState({
    total: 0,
    thisWeek: 0,
    thisMonth: 0,
    completed: 0
  });

  // Sample data - in real app this would come from API
  useEffect(() => {
    const sampleReports = [
      {
        id: 1,
        patientName: language === 'ar' ? 'أحمد محمد' : 'Ahmed Mohammed',
        date: '2024-01-15',
        time: '10:30',
        diagnosis: language === 'ar' ? 'صداع توتري' : 'Tension Headache',
        icd10: 'G44.2',
        status: 'completed',
        duration: '25 min',
        notes: language === 'ar' ? 'مريض يعاني من صداع متكرر...' : 'Patient experiencing recurring headaches...'
      },
      {
        id: 2,
        patientName: language === 'ar' ? 'فاطمة علي' : 'Fatima Ali',
        date: '2024-01-14',
        time: '14:15',
        diagnosis: language === 'ar' ? 'التهاب الحلق' : 'Sore Throat',
        icd10: 'J02.9',
        status: 'completed',
        duration: '15 min',
        notes: language === 'ar' ? 'التهاب بسيط في الحلق...' : 'Mild throat inflammation...'
      },
      {
        id: 3,
        patientName: language === 'ar' ? 'محمد الأحمد' : 'Mohammed Al-Ahmad',
        date: '2024-01-13',
        time: '09:45',
        diagnosis: language === 'ar' ? 'فحص دوري' : 'Routine Checkup',
        icd10: 'Z00.00',
        status: 'completed',
        duration: '30 min',
        notes: language === 'ar' ? 'فحص دوري شامل...' : 'Comprehensive routine examination...'
      },
      {
        id: 4,
        patientName: language === 'ar' ? 'سارة حسن' : 'Sara Hassan',
        date: '2024-01-12',
        time: '16:00',
        diagnosis: language === 'ar' ? 'حساسية موسمية' : 'Seasonal Allergy',
        icd10: 'J30.1',
        status: 'pending',
        duration: '20 min',
        notes: language === 'ar' ? 'أعراض حساسية موسمية...' : 'Seasonal allergy symptoms...'
      }
    ];
    setReports(sampleReports);
    setFilteredReports(sampleReports);
    setStats({
      total: sampleReports.length,
      thisWeek: 2,
      thisMonth: sampleReports.length,
      completed: sampleReports.filter(r => r.status === 'completed').length
    });
  }, [language]);

  // Filter reports based on search and filters
  useEffect(() => {
    let filtered = reports;

    if (filters.search) {
      filtered = filtered.filter(report =>
        report.patientName.toLowerCase().includes(filters.search.toLowerCase()) ||
        report.diagnosis.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.status !== 'all') {
      filtered = filtered.filter(report => report.status === filters.status);
    }

    setFilteredReports(filtered);
  }, [filters, reports]);

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleViewReport = (report) => {
    setSelectedReport(report);
    setShowReportDialog(true);
  };

  const handleExportReport = (report) => {
    // Simulate PDF export
    const blob = new Blob([`Report for ${report.patientName}\nDate: ${report.date}\nDiagnosis: ${report.diagnosis}\nNotes: ${report.notes}`], 
      { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `report_${report.id}_${report.date}.txt`;
    a.click();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'success';
      case 'pending': return 'warning';
      case 'draft': return 'info';
      default: return 'default';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'completed': return language === 'ar' ? 'مكتمل' : 'Completed';
      case 'pending': return language === 'ar' ? 'قيد المراجعة' : 'Pending';
      case 'draft': return language === 'ar' ? 'مسودة' : 'Draft';
      default: return status;
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
        {language === 'ar' ? 'التقارير والاستشارات' : 'Reports & Consultations'}
      </Typography>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            background: 'linear-gradient(135deg, #7cdfd3 0%, #5cb7ac 100%)',
            color: 'white'
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AssessmentIcon sx={{ mr: 2, fontSize: 40 }} />
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {stats.total}
                  </Typography>
                  <Typography variant="body2">
                    {language === 'ar' ? 'إجمالي الاستشارات' : 'Total Consultations'}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            background: 'linear-gradient(135deg, #a5e9e1 0%, #7cdfd3 100%)',
            color: 'white'
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TodayIcon sx={{ mr: 2, fontSize: 40 }} />
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {stats.thisWeek}
                  </Typography>
                  <Typography variant="body2">
                    {language === 'ar' ? 'هذا الأسبوع' : 'This Week'}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            background: 'linear-gradient(135deg, #cef3ef 0%, #a5e9e1 100%)',
            color: '#2e2b2b'
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CalendarMonthIcon sx={{ mr: 2, fontSize: 40 }} />
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {stats.thisMonth}
                  </Typography>
                  <Typography variant="body2">
                    {language === 'ar' ? 'هذا الشهر' : 'This Month'}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            background: 'linear-gradient(135deg, #484444 0%, #2e2b2b 100%)',
            color: 'white'
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <PersonIcon sx={{ mr: 2, fontSize: 40 }} />
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {stats.completed}
                  </Typography>
                  <Typography variant="body2">
                    {language === 'ar' ? 'مكتملة' : 'Completed'}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filters */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <FilterListIcon sx={{ mr: 1, color: 'primary.main' }} />
            <Typography variant="h6">
              {language === 'ar' ? 'فلترة التقارير' : 'Filter Reports'}
            </Typography>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                placeholder={language === 'ar' ? 'البحث في التقارير...' : 'Search reports...'}
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                InputProps={{
                  startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>{language === 'ar' ? 'الفترة الزمنية' : 'Date Range'}</InputLabel>
                <Select
                  value={filters.dateRange}
                  onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                  label={language === 'ar' ? 'الفترة الزمنية' : 'Date Range'}
                >
                  <MenuItem value="all">{language === 'ar' ? 'جميع الفترات' : 'All Time'}</MenuItem>
                  <MenuItem value="today">{language === 'ar' ? 'اليوم' : 'Today'}</MenuItem>
                  <MenuItem value="week">{language === 'ar' ? 'هذا الأسبوع' : 'This Week'}</MenuItem>
                  <MenuItem value="month">{language === 'ar' ? 'هذا الشهر' : 'This Month'}</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>{language === 'ar' ? 'الحالة' : 'Status'}</InputLabel>
                <Select
                  value={filters.status}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                  label={language === 'ar' ? 'الحالة' : 'Status'}
                >
                  <MenuItem value="all">{language === 'ar' ? 'جميع الحالات' : 'All Status'}</MenuItem>
                  <MenuItem value="completed">{language === 'ar' ? 'مكتمل' : 'Completed'}</MenuItem>
                  <MenuItem value="pending">{language === 'ar' ? 'قيد المراجعة' : 'Pending'}</MenuItem>
                  <MenuItem value="draft">{language === 'ar' ? 'مسودة' : 'Draft'}</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Reports Table */}
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 3 }}>
            {language === 'ar' ? 'قائمة التقارير' : 'Reports List'}
          </Typography>
          <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: '#f8fffe' }}>
                  <TableCell sx={{ fontWeight: 600 }}>
                    {language === 'ar' ? 'اسم المريض' : 'Patient Name'}
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>
                    {language === 'ar' ? 'التاريخ والوقت' : 'Date & Time'}
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>
                    {language === 'ar' ? 'التشخيص' : 'Diagnosis'}
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>
                    {language === 'ar' ? 'رمز ICD-10' : 'ICD-10 Code'}
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>
                    {language === 'ar' ? 'المدة' : 'Duration'}
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>
                    {language === 'ar' ? 'الحالة' : 'Status'}
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>
                    {language === 'ar' ? 'الإجراءات' : 'Actions'}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredReports.map((report) => (
                  <TableRow key={report.id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ 
                          mr: 2, 
                          bgcolor: 'primary.light',
                          width: 32,
                          height: 32,
                          fontSize: '0.875rem'
                        }}>
                          {report.patientName.split(' ')[0][0]}
                        </Avatar>
                        {report.patientName}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {report.date}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {report.time}
                      </Typography>
                    </TableCell>
                    <TableCell>{report.diagnosis}</TableCell>
                    <TableCell>
                      <Chip 
                        label={report.icd10} 
                        size="small" 
                        variant="outlined" 
                        sx={{ borderColor: 'primary.main' }}
                      />
                    </TableCell>
                    <TableCell>{report.duration}</TableCell>
                    <TableCell>
                      <Chip 
                        label={getStatusLabel(report.status)}
                        color={getStatusColor(report.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <Tooltip title={language === 'ar' ? 'عرض' : 'View'}>
                          <IconButton 
                            size="small" 
                            onClick={() => handleViewReport(report)}
                            sx={{ color: 'primary.main' }}
                          >
                            <VisibilityIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title={language === 'ar' ? 'تصدير' : 'Export'}>
                          <IconButton 
                            size="small" 
                            onClick={() => handleExportReport(report)}
                            sx={{ color: 'success.main' }}
                          >
                            <FileDownloadIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Report Details Dialog */}
      <Dialog 
        open={showReportDialog} 
        onClose={() => setShowReportDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {language === 'ar' ? 'تفاصيل التقرير' : 'Report Details'}
        </DialogTitle>
        <DialogContent>
          {selectedReport && (
            <Box>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    {language === 'ar' ? 'اسم المريض' : 'Patient Name'}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {selectedReport.patientName}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    {language === 'ar' ? 'التاريخ والوقت' : 'Date & Time'}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {selectedReport.date} - {selectedReport.time}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    {language === 'ar' ? 'التشخيص' : 'Diagnosis'}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {selectedReport.diagnosis}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    {language === 'ar' ? 'رمز ICD-10' : 'ICD-10 Code'}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {selectedReport.icd10}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary">
                    {language === 'ar' ? 'الملاحظات' : 'Notes'}
                  </Typography>
                  <Paper sx={{ p: 2, bgcolor: '#f8fffe', mt: 1 }}>
                    <Typography variant="body2">
                      {selectedReport.notes}
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowReportDialog(false)}>
            {language === 'ar' ? 'إغلاق' : 'Close'}
          </Button>
          <Button 
            variant="contained" 
            startIcon={<FileDownloadIcon />}
            onClick={() => selectedReport && handleExportReport(selectedReport)}
          >
            {language === 'ar' ? 'تصدير PDF' : 'Export PDF'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ReportsPage;