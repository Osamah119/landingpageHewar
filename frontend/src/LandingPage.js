import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import {
  Box,
  Typography,
  Container,
  Grid,
  Button,
  useTheme,
  AppBar,
  Toolbar,
  IconButton,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  Paper,
  Stack
} from '@mui/material';
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  ArrowForward as ArrowForwardIcon,
  ArrowBack as ArrowBackIcon,
  CheckCircle as CheckCircleIcon,
  BarChart as BarChartIcon,
  Translate as TranslateIcon,
  MedicalServices as MedicalServicesIcon,
  Psychology as PsychologyIcon,
  CloudUpload as CloudUploadIcon,
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  LinkedIn as LinkedInIcon,
  Instagram as InstagramIcon,
  Person as PersonIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { LanguageContext } from '../contexts/LanguageContext';

// Custom hook for language
const useLanguage = () => {
  const { language } = useContext(LanguageContext);
  return [language === 'ar'];
};

// Styled Components
const LandingAppBar = styled(AppBar)`
  background-color: transparent;
  box-shadow: none;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
`;

const HeroSection = styled(motion.div)`
  min-height: 100vh;
  background: linear-gradient(135deg, #cef3ef 0%, #7cdfd3 100%);
  position: relative;
  overflow: hidden;
  padding-bottom: 150px;
  padding-top: 80px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 50% 50%, transparent 20%, rgba(255,255,255,0.1) 100%);
    pointer-events: none;
  }
`;

const FloatingShape = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.2));
  backdrop-filter: blur(5px);
  z-index: 0;
`;

// Enhanced image display components
const OvalImageContainer = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 300px;
  border-radius: 70% 30% 30% 70% / 60% 40% 60% 40%;
  overflow: hidden;
  box-shadow: 0 15px 35px rgba(0,0,0,0.2);
  transform-style: preserve-3d;
  transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  z-index: 2;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      45deg,
      rgba(206, 243, 239, 0.3),
      rgba(124, 223, 211, 0.4)
    );
    z-index: 1;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.8s ease-out;
  }

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
    
    img {
      transform: scale(1.1) rotate(3deg);
    }
  }
`;

const WavyImageContainer = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 350px;
  border-radius: 50% 50% 30% 70% / 50% 30% 70% 50%;
  overflow: hidden;
  box-shadow: 0 15px 35px rgba(0,0,0,0.2);
  transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  z-index: 2;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to right,
      rgba(206, 243, 239, 0.3),
      rgba(124, 223, 211, 0.4)
    );
    z-index: 1;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.8s ease-out;
  }

  &:hover {
    transform: translateY(-5px) scale(1.02);
    border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
    
    img {
      transform: scale(1.05);
    }
  }
`;

const SpiralImageContainer = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 320px;
  border-radius: 80% 20% 60% 40% / 40% 60% 20% 80%;
  overflow: hidden;
  box-shadow: 0 15px 35px rgba(0,0,0,0.2);
  transition: all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  z-index: 2;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      rgba(206, 243, 239, 0.35),
      rgba(124, 223, 211, 0.45)
    );
    z-index: 1;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 1s ease-out;
  }

  &:hover {
    transform: rotate(-5deg) scale(1.05);
    border-radius: 20% 80% 40% 60% / 60% 30% 70% 40%;
    
    img {
      transform: scale(1.15) rotate(5deg);
    }
  }
`;

const FloatingImageGallery = styled(Box)`
  position: relative;
  height: 700px;
  width: 100%;
  perspective: 2000px;
  transform-style: preserve-3d;
`;

const OrbitingImage = styled(motion.div)`
  position: absolute;
  width: ${props => props.size || '300px'};
  height: ${props => props.size || '300px'};
  top: 50%;
  left: 50%;
  transform-style: preserve-3d;
  z-index: ${props => props.zIndex || 2};
`;

const Section = styled(Box)`
  padding: 100px 0;
  position: relative;
  overflow: hidden;
`;

const DarkSection = styled(Section)`
  background-color: #2e2b2b;
  color: white;
`;

const LightSection = styled(Section)`
  background-color: #f8fffe;
`;

const GradientSection = styled(Section)`
  background: linear-gradient(135deg, #cef3ef 0%, #a5e9e1 100%);
`;

const WaveShape = styled(Box)`
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
  transform: rotate(180deg);
  
  svg {
    position: relative;
    display: block;
    width: calc(100% + 1.3px);
    height: 78px;
  }
  
  .shape-fill {
    fill: #FFFFFF;
  }
`;

const ImageWrapper = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 300px;
  border-radius: ${props => props.borderRadius || '20px'};
  overflow: hidden;
  transform-style: preserve-3d;
  perspective: 1000px;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom right,
      rgba(206, 243, 239, 0.2),
      rgba(124, 223, 211, 0.3)
    );
    z-index: 1;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s ease-out;
  }

  &:hover img {
    transform: scale(1.1) rotate(2deg);
  }
`;

const FeatureCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  padding: 2rem;
  height: 100%;
  position: relative;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(to right, #7cdfd3, #a5e9e1);
  }
`;

const ServiceCard = styled(Card)`
  border-radius: 16px;
  overflow: hidden;
  height: 100%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
  }
`;

const TestimonialCard = styled(Paper)`
  padding: 2rem;
  border-radius: 16px;
  position: relative;
  margin-top: 30px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  
  &::before {
    content: '\201C';
    position: absolute;
    top: -30px;
    left: 20px;
    font-size: 80px;
    color: #7cdfd3;
    font-family: serif;
    line-height: 1;
  }
`;

const StatCard = styled(Box)`
  text-align: center;
  padding: 2rem;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
`;

const FooterSection = styled(Box)`
  background-color: #2e2b2b;
  color: white;
  padding: 60px 0 20px;
`;

const StyledButton = styled(Button)`
  background: linear-gradient(45deg, #7cdfd3 30%, #a5e9e1 90%);
  border-radius: 25px;
  padding: 12px 35px;
  color: white;
  font-weight: bold;
  text-transform: none;
  box-shadow: 0 3px 15px rgba(124, 223, 211, 0.4);
  transition: all 0.3s ease;
  
  &:hover {
    background: linear-gradient(45deg, #6bcdc1 30%, #94d8d0 90%);
    transform: translateY(-2px);
    box-shadow: 0 5px 20px rgba(124, 223, 211, 0.6);
  }
`;

const OutlinedButton = styled(Button)`
  border: 2px solid #7cdfd3;
  border-radius: 25px;
  padding: 10px 30px;
  color: #2e2b2b;
  font-weight: bold;
  text-transform: none;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: rgba(124, 223, 211, 0.1);
    transform: translateY(-2px);
  }
`;

const DarkButton = styled(Button)`
  background-color: #2e2b2b;
  border-radius: 25px;
  padding: 12px 35px;
  color: white;
  font-weight: bold;
  text-transform: none;
  box-shadow: 0 3px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #484444;
    transform: translateY(-2px);
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
  }
`;

const SocialButton = styled(IconButton)`
  color: white;
  background-color: rgba(255, 255, 255, 0.1);
  margin: 0 8px;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #7cdfd3;
    transform: translateY(-3px);
  }
`;

const LandingPage = () => {
  const [isRTL] = useLanguage();
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Box dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Navigation Bar */}
      <AppBar position="fixed" sx={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', boxShadow: 2 }}>
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            {/* Logo */}
            <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => handleNavigation('/')}>
              <img src="/images/logo.png" alt="Hewar" style={{ height: '40px', marginRight: '10px' }} />
              <Typography variant="h6" sx={{ color: '#2e2b2b', fontWeight: 700 }}>
                Hewar
              </Typography>
            </Box>

            {/* Navigation Links */}
            <Stack 
              direction="row" 
              spacing={4} 
              sx={{ 
                flexGrow: 1, 
                justifyContent: 'center',
                display: { xs: 'none', md: 'flex' }
              }}
            >
              <Button 
                onClick={() => handleNavigation('/')}
                sx={{ color: '#2e2b2b' }}
              >
                {isRTL ? 'الرئيسية' : 'Home'}
              </Button>
              <Button 
                onClick={() => handleNavigation('/features')}
                sx={{ color: '#2e2b2b' }}
              >
                {isRTL ? 'المميزات' : 'Features'}
              </Button>
              <Button 
                onClick={() => handleNavigation('/services')}
                sx={{ color: '#2e2b2b' }}
              >
                {isRTL ? 'الخدمات' : 'Services'}
              </Button>
              <Button 
                onClick={() => handleNavigation('/testimonials')}
                sx={{ color: '#2e2b2b' }}
              >
                {isRTL ? 'آراء العملاء' : 'Testimonials'}
              </Button>
              <Button 
                onClick={() => handleNavigation('/contact')}
                sx={{ color: '#2e2b2b' }}
              >
                {isRTL ? 'اتصل بنا' : 'Contact'}
              </Button>
            </Stack>

            {/* Login Button */}
            <Box sx={{ flexGrow: 0 }}>
              <Button 
                variant="contained"
                onClick={() => handleNavigation('/login')}
                sx={{
                  backgroundColor: '#7cdfd3',
                  '&:hover': {
                    backgroundColor: '#a5e9e1'
                  }
                }}
              >
                {isRTL ? 'تسجيل الدخول' : 'Login'}
              </Button>
            </Box>

            {/* Mobile Menu */}
            <Box sx={{ display: { xs: 'flex', md: 'none' }, ml: 2 }}>
              <IconButton
                size="large"
                aria-label="menu"
                sx={{ color: '#2e2b2b' }}
                onClick={() => {/* Handle mobile menu */}}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Add toolbar spacing */}
      <Toolbar />

      {/* Main Content - Hero Section */}
      <HeroSection
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              duration: 0.6,
              staggerChildren: 0.2
            }
          }
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center" sx={{ minHeight: '90vh' }}>
            <Grid item xs={12} md={6}>
              <motion.div variants={{
                hidden: { opacity: 0, x: -60 },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: { duration: 0.8, ease: "easeOut" }
                }
              }}>
                <Typography variant="h1" 
                  sx={{ 
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                    fontWeight: 700,
                    color: '#2e2b2b',
                    mb: 3
                  }}
                >
                  {isRTL ? 'مستقبل الرعاية الصحية' : 'The Future of Healthcare'}
                </Typography>
                <Typography variant="h2" 
                  sx={{ 
                    fontSize: { xs: '1.5rem', md: '2rem' },
                    fontWeight: 500,
                    color: '#484444',
                    mb: 4
                  }}
                >
                  {isRTL ? 'ذكاء اصطناعي متقدم لتحسين تجربة الاستشارات الطبية' : 'Advanced AI for Enhanced Medical Consultations'}
                </Typography>
                <Button 
                  variant="contained"
                  onClick={() => handleNavigation('/')}
                  sx={{
                    backgroundColor: '#7cdfd3',
                    '&:hover': {
                      backgroundColor: '#a5e9e1'
                    }
                  }}
                >
                  {isRTL ? 'ابدأ الآن' : 'Get Started'}
                </Button>
              </motion.div>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <FloatingImageGallery>
                <OrbitingImage
                  as={SpiralImageContainer}
                  size="400px"
                  initial={{ x: '-50%', y: '-50%', rotateY: 0 }}
                  animate={{ 
                    rotateY: 360,
                    transition: { duration: 20, repeat: Infinity, ease: "linear" }
                  }}
                >
                  <img src="/images/consultation-interface-1.jpeg" alt="Clinical Summary" />
                </OrbitingImage>
                
                <OrbitingImage
                  as={WavyImageContainer}
                  size="350px"
                  initial={{ x: '-30%', y: '-70%', rotateY: 120 }}
                  animate={{ 
                    rotateY: 480,
                    transition: { duration: 20, repeat: Infinity, ease: "linear" }
                  }}
                >
                  <img src="/images/consultation-interface-2.jpeg" alt="Patient Details" />
                </OrbitingImage>
                
                <OrbitingImage
                  as={OvalImageContainer}
                  size="300px"
                  initial={{ x: '-70%', y: '-30%', rotateY: 240 }}
                  animate={{ 
                    rotateY: 600,
                    transition: { duration: 20, repeat: Infinity, ease: "linear" }
                  }}
                >
                  <img src="/images/consultation-interface-3.jpeg" alt="Medical Records" />
                </OrbitingImage>
              </FloatingImageGallery>
            </Grid>
          </Grid>
        </Container>
        
        <FloatingShape
          style={{
            width: '300px',
            height: '300px',
            top: '10%',
            left: '5%',
          }}
          animate={{
            y: [0, 30, 0],
            rotate: [0, 360],
            transition: { duration: 15, repeat: Infinity, ease: "linear" }
          }}
        />
        <FloatingShape
          style={{
            width: '200px',
            height: '200px',
            bottom: '15%',
            right: '10%',
          }}
          animate={{
            y: [30, 0, 30],
            rotate: [360, 0],
            transition: { duration: 12, repeat: Infinity, ease: "linear" }
          }}
        />
      </HeroSection>
      
      {/* Section 2: Features */}
      <LightSection id="features">
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={{
                hidden: { opacity: 0, y: 60 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, ease: "easeOut" }
                }
              }}
            >
              <Typography 
                variant="h3" 
                component="h2" 
                sx={{ 
                  fontWeight: 'bold',
                  mb: 2,
                  color: '#2e2b2b'
                }}
              >
                {isRTL ? 'مميزات حوار' : 'Hewar Features'}
              </Typography>
              <Typography 
                variant="h6" 
                sx={{ 
                  mb: 4,
                  color: '#484444',
                  maxWidth: '700px',
                  mx: 'auto'
                }}
              >
                {isRTL 
                  ? 'اكتشف كيف يمكن لتطبيق حوار أن يحسن تجربة الاستشارات الطبية ويزيد من كفاءة الأطباء'
                  : 'Discover how Hewar can enhance medical consultations and improve physician efficiency'}
              </Typography>
            </motion.div>
          </Box>
          
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    transition: { duration: 0.6 }
                  }
                }}
              >
                <FeatureCard>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ bgcolor: '#7cdfd3', mr: 2 }}>
                      <TranslateIcon />
                    </Avatar>
                    <Typography variant="h6" gutterBottom align={isRTL ? 'right' : 'left'}>
                      {isRTL ? 'ترجمة فورية' : 'Real-time Translation'}
                    </Typography>
                  </Box>
                  <Typography color="text.secondary" align={isRTL ? 'right' : 'left'}>
                    {isRTL
                      ? 'ترجمة المحادثات الطبية بين الطبيب والمريض بشكل فوري ودقيق، مما يتيح تواصلاً أفضل وتجربة أكثر راحة للمرضى من مختلف الخلفيات اللغوية.'
                      : 'Instant and accurate translation of medical conversations between doctor and patient, enabling better communication and a more comfortable experience for patients from diverse linguistic backgrounds.'}
                  </Typography>
                </FeatureCard>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={4}>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    transition: { duration: 0.6, delay: 0.2 }
                  }
                }}
              >
                <FeatureCard>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ bgcolor: '#7cdfd3', mr: 2 }}>
                      <PsychologyIcon />
                    </Avatar>
                    <Typography variant="h6" gutterBottom align={isRTL ? 'right' : 'left'}>
                      {isRTL ? 'تشخيص ذكي' : 'Smart Diagnosis'}
                    </Typography>
                  </Box>
                  <Typography color="text.secondary" align={isRTL ? 'right' : 'left'}>
                    {isRTL
                      ? 'اقتراح رموز ICD-10 وتحليل المحادثة باستخدام الذكاء الاصطناعي، مما يساعد الأطباء على اتخاذ قرارات أكثر دقة وسرعة في التشخيص.'
                      : 'AI-powered conversation analysis and ICD-10 code suggestions, helping physicians make more accurate and faster diagnostic decisions.'}
                  </Typography>
                </FeatureCard>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={4}>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    transition: { duration: 0.6, delay: 0.4 }
                  }
                }}
              >
                <FeatureCard>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ bgcolor: '#7cdfd3', mr: 2 }}>
                      <CloudUploadIcon />
                    </Avatar>
                    <Typography variant="h6" gutterBottom align={isRTL ? 'right' : 'left'}>
                      {isRTL ? 'تكامل مع EMR' : 'EMR Integration'}
                    </Typography>
                  </Box>
                  <Typography color="text.secondary" align={isRTL ? 'right' : 'left'}>
                    {isRTL
                      ? 'تكامل سلس مع أنظمة السجلات الطبية الإلكترونية، مما يوفر الوقت ويقلل من الأخطاء في إدخال البيانات ويحسن تدفق العمل الطبي.'
                      : 'Seamless integration with Electronic Medical Record systems, saving time, reducing data entry errors, and improving medical workflow.'}
                  </Typography>
                </FeatureCard>
              </motion.div>
            </Grid>
          </Grid>
          
          <Box sx={{ mt: 8, textAlign: 'center' }}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={{
                hidden: { opacity: 0, y: 60 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, ease: "easeOut" }
                }
              }}
            >
              <Button 
                variant="contained"
                onClick={() => handleNavigation('/')}
                sx={{
                  backgroundColor: '#7cdfd3',
                  '&:hover': {
                    backgroundColor: '#a5e9e1'
                  }
                }}
              >
                {isRTL ? 'اكتشف جميع المميزات' : 'Explore All Features'}
              </Button>
            </motion.div>
          </Box>
        </Container>
      </LightSection>
      
      {/* Section 3: How It Works */}
      <GradientSection id="how-it-works">
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={{
                hidden: { opacity: 0, y: 60 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, ease: "easeOut" }
                }
              }}
            >
              <Typography 
                variant="h3" 
                component="h2" 
                sx={{ 
                  fontWeight: 'bold',
                  mb: 2,
                  color: '#2e2b2b'
                }}
              >
                {isRTL ? 'كيف يعمل حوار' : 'How Hewar Works'}
              </Typography>
              <Typography 
                variant="h6" 
                sx={{ 
                  mb: 4,
                  color: '#484444',
                  maxWidth: '700px',
                  mx: 'auto'
                }}
              >
                {isRTL 
                  ? 'عملية بسيطة وفعالة لتحسين التواصل الطبي وتوثيق الاستشارات'
                  : 'A simple and effective process to enhance medical communication and consultation documentation'}
              </Typography>
            </motion.div>
          </Box>
          
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={{
                  hidden: { opacity: 0, x: -60 },
                  visible: {
                    opacity: 1,
                    x: 0,
                    transition: { duration: 0.8, ease: "easeOut" }
                  }
                }}
              >
                <List>
                  <ListItem sx={{ mb: 4 }}>
                    <ListItemIcon>
                      <Avatar sx={{ bgcolor: '#2e2b2b' }}>1</Avatar>
                    </ListItemIcon>
                    <ListItemText 
                      primary={
                        <Typography variant="h6">
                          {isRTL ? 'بدء الاستشارة' : 'Start Consultation'}
                        </Typography>
                      } 
                      secondary={
                        <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                          {isRTL 
                            ? 'ابدأ جلسة جديدة واختر لغات الطبيب والمريض للترجمة الفورية'
                            : 'Initiate a new session and select physician and patient languages for real-time translation'}
                        </Typography>
                      } 
                    />
                  </ListItem>
                  
                  <ListItem sx={{ mb: 4 }}>
                    <ListItemIcon>
                      <Avatar sx={{ bgcolor: '#2e2b2b' }}>2</Avatar>
                    </ListItemIcon>
                    <ListItemText 
                      primary={
                        <Typography variant="h6">
                          {isRTL ? 'إجراء المحادثة' : 'Conduct Conversation'}
                        </Typography>
                      } 
                      secondary={
                        <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                          {isRTL 
                            ? 'تحدث بشكل طبيعي بينما يقوم حوار بترجمة وتسجيل المحادثة في الوقت الفعلي'
                            : 'Speak naturally while Hewar translates and records the conversation in real-time'}
                        </Typography>
                      } 
                    />
                  </ListItem>
                  
                  <ListItem sx={{ mb: 4 }}>
                    <ListItemIcon>
                      <Avatar sx={{ bgcolor: '#2e2b2b' }}>3</Avatar>
                    </ListItemIcon>
                    <ListItemText 
                      primary={
                        <Typography variant="h6">
                          {isRTL ? 'مراجعة الملخص' : 'Review Summary'}
                        </Typography>
                      } 
                      secondary={
                        <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                          {isRTL 
                            ? 'راجع ملاحظات SOAP المولدة تلقائيًا واقتراحات رموز ICD-10 وعدلها حسب الحاجة'
                            : 'Review auto-generated SOAP notes and ICD-10 code suggestions and edit as needed'}
                        </Typography>
                      } 
                    />
                  </ListItem>
                  
                  <ListItem>
                    <ListItemIcon>
                      <Avatar sx={{ bgcolor: '#2e2b2b' }}>4</Avatar>
                    </ListItemIcon>
                    <ListItemText 
                      primary={
                        <Typography variant="h6">
                          {isRTL ? 'حفظ وتصدير' : 'Save and Export'}
                        </Typography>
                      } 
                      secondary={
                        <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                          {isRTL 
                            ? 'احفظ التقرير النهائي في نظام EMR أو صدره بتنسيق PDF للاستخدام المستقبلي'
                            : 'Save the final report to your EMR system or export as PDF for future reference'}
                        </Typography>
                      } 
                    />
                  </ListItem>
                </List>
              </motion.div>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={{
                  hidden: { opacity: 0, x: 60 },
                  visible: {
                    opacity: 1,
                    x: 0,
                    transition: { duration: 0.8, ease: "easeOut" }
                  }
                }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'rgba(0, 0, 0, 0.05)',
                      zIndex: 1
                    }
                  }}
                >
                  <Box
                    component="img"
                    src="/images/consultation-preview.jpg"
                    alt="How Hewar Works"
                    sx={{
                      width: '100%',
                      height: 'auto',
                      display: 'block',
                      transform: 'scale(1.02)',
                      transition: 'transform 0.6s ease'
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      zIndex: 2
                    }}
                  >
                    <IconButton
                      sx={{
                        bgcolor: '#7cdfd3',
                        width: 80,
                        height: 80,
                        '&:hover': {
                          bgcolor: '#a5e9e1'
                        }
                      }}
                    >
                      <Box
                        component="svg"
                        viewBox="0 0 24 24"
                        sx={{ width: 40, height: 40, fill: 'white' }}
                      >
                        <path d="M8 5v14l11-7z" />
                      </Box>
                    </IconButton>
                  </Box>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </GradientSection>

      {/* Footer */}
      <FooterSection>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {/* Company Info */}
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ mb: 2, color: '#7cdfd3' }}>
                {isRTL ? 'حوار الذكاء الطبي' : 'Hewar Medical AI'}
              </Typography>
              <Typography variant="body2" sx={{ mb: 2, color: 'rgba(255,255,255,0.7)' }}>
                {isRTL 
                  ? 'نقدم حلول الذكاء الاصطناعي المتقدمة للرعاية الصحية في المملكة العربية السعودية'
                  : 'Providing advanced AI healthcare solutions in Saudi Arabia'}
              </Typography>
              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" sx={{ color: '#7cdfd3', mb: 1 }}>
                  {isRTL ? 'المملكة العربية السعودية' : 'Saudi Arabia'}
                </Typography>
              </Box>
            </Grid>

            {/* Founders */}
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ mb: 2, color: '#7cdfd3' }}>
                {isRTL ? 'المؤسسون' : 'Founders'}
              </Typography>
              <List sx={{ mb: 2 }}>
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon>
                    <Avatar sx={{ bgcolor: '#2e2b2b', width: 32, height: 32 }}>
                      <PersonIcon sx={{ fontSize: 18 }} />
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText 
                    primary={
                      <Typography variant="body2" sx={{ color: 'white' }}>
                        Salsabil Almarzooq
                      </Typography>
                    }
                    secondary={
                      <Typography variant="body2" sx={{ color: '#7cdfd3' }}>
                        CEO
                      </Typography>
                    }
                  />
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon>
                    <Avatar sx={{ bgcolor: '#2e2b2b', width: 32, height: 32 }}>
                      <PersonIcon sx={{ fontSize: 18 }} />
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText 
                    primary={
                      <Typography variant="body2" sx={{ color: 'white' }}>
                        Osamah Alaawr
                      </Typography>
                    }
                    secondary={
                      <Typography variant="body2" sx={{ color: '#7cdfd3' }}>
                        CTO
                      </Typography>
                    }
                  />
                </ListItem>
              </List>
            </Grid>

            {/* Social & Professional Links */}
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ mb: 2, color: '#7cdfd3' }}>
                {isRTL ? 'تواصل معنا' : 'Connect With Us'}
              </Typography>
              
              {/* Social Media */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" sx={{ mb: 2, color: 'rgba(255,255,255,0.7)' }}>
                  {isRTL ? 'منصات التواصل الاجتماعي' : 'Social Media'}
                </Typography>
                <Stack direction="row" spacing={1}>
                  <SocialButton 
                    component="a" 
                    href="https://linkedin.com/company/hewar-ai" 
                    target="_blank"
                    aria-label="LinkedIn"
                  >
                    <LinkedInIcon />
                  </SocialButton>
                  <SocialButton 
                    component="a" 
                    href="https://x.com/hewar_ai" 
                    target="_blank"
                    aria-label="X (Twitter)"
                  >
                    <TwitterIcon />
                  </SocialButton>
                  <SocialButton 
                    component="a" 
                    href="https://facebook.com/hewar.ai" 
                    target="_blank"
                    aria-label="Facebook"
                  >
                    <FacebookIcon />
                  </SocialButton>
                </Stack>
              </Box>

              {/* Professional Platforms */}
              <Box>
                <Typography variant="body2" sx={{ mb: 2, color: 'rgba(255,255,255,0.7)' }}>
                  {isRTL ? 'المنصات المهنية' : 'Professional Platforms'}
                </Typography>
                <Stack direction="row" spacing={1}>
                  <SocialButton 
                    component="a" 
                    href="https://medium.com/@hewar-ai" 
                    target="_blank"
                    aria-label="Medium"
                  >
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                      <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
                    </svg>
                  </SocialButton>
                  <SocialButton 
                    component="a" 
                    href="https://www.researchgate.net/profile/Hewar-AI" 
                    target="_blank"
                    aria-label="ResearchGate"
                  >
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                      <path d="M19.586 0c-.818 0-1.508.19-2.073.565-.563.377-.97.936-1.213 1.68a3.193 3.193 0 0 0-.112.437 8.365 8.365 0 0 0-.078.53 9 9 0 0 0-.05.727c-.01.282-.013.621-.013 1.016a31.121 31.121 0 0 0 .014 1.017 9 9 0 0 0 .05.727 7.946 7.946 0 0 0 .077.53h-7.71v1.753h3.682c-.004.954-.023 1.704-.058 2.251-.035.548-.093 1.017-.173 1.407-.08.389-.188.701-.326.937-.139.236-.308.407-.509.513-.2.106-.43.16-.69.16a1.543 1.543 0 0 1-.855-.262 2.31 2.31 0 0 1-.662-.641 2.977 2.977 0 0 1-.414-.869 3.168 3.168 0 0 1-.134-.961c0-.232.033-.446.1-.641.066-.195.16-.373.283-.534.123-.16.269-.3.438-.421.17-.121.356-.214.558-.28v1.707h1.668v-1.707h.649v1.707h1.668v-1.707h.649v1.707h1.668v-1.707c.202.066.387.159.557.28.17.121.316.261.439.421.123.161.217.339.283.534.067.195.1.409.1.641 0 .342-.045.666-.134.961-.089.295-.227.604-.414.869-.187.264-.41.481-.662.641-.252.161-.538.262-.855.262-.26 0-.49-.054-.69-.16-.201-.106-.37-.277-.509-.513-.138-.236-.246-.548-.326-.937-.08-.39-.138-.859-.173-1.407a25.96 25.96 0 0 1-.058-2.25h3.682v-1.754h-7.71a8.007 8.007 0 0 0 .077-.53 9 9 0 0 0 .05-.727c.01-.282.013-.621.013-1.016a31.121 31.121 0 0 0-.014-1.017 9 9 0 0 0-.05-.727 7.946 7.946 0 0 0-.077-.53c-.031-.197-.07-.358-.112-.437a2.457 2.457 0 0 0-1.213-1.68C13.922.19 13.232 0 12.414 0zM12 6.92c-.199 0-.393.016-.581.049a2.65 2.65 0 0 0-.547.146 2.322 2.322 0 0 0-.881.688 1.993 1.993 0 0 0-.585 1.423c0 .493.195.918.585 1.276a2.322 2.322 0 0 0 .881.689c.174.073.354.12.547.145.188.033.382.049.581.049.199 0 .393-.016.581-.049a2.65 2.65 0 0 0 .547-.145 2.322 2.322 0 0 0 .881-.689c.39-.358.585-.783.585-1.276 0-.493-.195-.918-.585-1.276a2.322 2.322 0 0 0-.881-.689 2.65 2.65 0 0 0-.547-.146 3.126 3.126 0 0 0-.581-.049z"/>
                    </svg>
                  </SocialButton>
                  <SocialButton 
                    component="a" 
                    href="https://www.ncbi.nlm.nih.gov/pmc/" 
                    target="_blank"
                    aria-label="PubMed Central"
                  >
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                      <path d="M12 0C5.377 0 0 5.377 0 12s5.377 12 12 12 12-5.377 12-12S18.623 0 12 0zm0 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm-2 4v12h4v-2h-2V8h2V6h-4z"/>
                    </svg>
                  </SocialButton>
                </Stack>
              </Box>
            </Grid>
          </Grid>

          {/* Copyright */}
          <Box sx={{ 
            borderTop: '1px solid rgba(255,255,255,0.1)', 
            mt: 4, 
            pt: 2,
            textAlign: 'center'
          }}>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)' }}>
              {isRTL ? 'جميع الحقوق محفوظة' : 'All rights reserved.'} Hewar Medical AI {new Date().getFullYear()}
            </Typography>
          </Box>
        </Container>
      </FooterSection>
    </Box>
  );
};

export default LandingPage;