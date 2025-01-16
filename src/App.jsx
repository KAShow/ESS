import React, { useState } from 'react'
import { styled } from 'styled-components'
import logo from './assets/logo-legal.png'
import { saveSurvey } from './utils/storage'
import { sendSurveyEmail } from './utils/emailService'
import SurveysList from './components/SurveysList'
import LoginScreen from './components/LoginScreen'

const services = [
  "نظافة مواقع العمل",
  "أدوات ومستلزمات النظافة",
  "دورات المياه",
  "الصيانة",
  "التهوية",
  "الإضاءة",
  "الأثاث المكتبي",
  "الأدوات والقرطاسية المكتبية", 
  "الأجهزة المكتبية",
  "مواقف السيارات",
  "الصحة والسلامة المهنية",
  "أخرى: يرجى تحديدها"
]

const initialState = services.reduce((acc, service) => {
  acc[service] = { rating: 0, notes: '' };
  return acc;
}, {});

const Container = styled.div`
  max-width: 1400px;
  margin: 2rem auto;
  padding: 0 2rem;
  direction: rtl;
  font-family: 'Cairo', sans-serif;
`

const Header = styled.header`
  text-align: center;
  margin-bottom: 3rem;
`

const LogoContainer = styled.div`
  margin-bottom: 2rem;
`

const Logo = styled.img`
  width: 200px;
  height: auto;
  margin-bottom: 20px;
`

const HeaderTitle = styled.div`
  text-align: center;
`

const Title = styled.h1`
  color: #4A4032;
  margin: 0;
  font-size: 1.8rem;
  font-weight: 600;
`

const DateDisplay = styled.div`
  color: #4A4032;
  margin-top: 1rem;
  font-size: 1.1rem;
`

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const ServiceContainer = styled.div`
  padding: 1.5rem;
  border: 1px solid #C5A572;
  border-radius: 8px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  height: 100%;
`

const ServiceTitle = styled.h3`
  margin-bottom: 1rem;
  color: #4A4032;
  font-size: 1.2rem;
  min-height: 2.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`

const RatingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem 0;
  min-height: 60px;
`

const EmptyRatingSpace = styled.div`
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Star = styled.span`
  font-size: 2.5rem;
  color: ${props => props.selected ? '#C5A572' : '#ddd'};
  cursor: pointer;
  transition: color 0.2s ease;
  margin: 0 1rem;
  
  &:hover {
    color: #C5A572;
  }
`

const NotesTextArea = styled.textarea`
  width: 100%;
  padding: 0.8rem;
  height: 80px;
  border: 1px solid #C5A572;
  border-radius: 8px;
  resize: vertical;
  font-family: inherit;
  color: #4A4032;
  margin-top: auto;
  
  &:focus {
    outline: none;
    border-color: #9A7B4F;
    box-shadow: 0 0 0 2px rgba(197, 165, 114, 0.2);
  }

  &::placeholder {
    color: #999;
  }
`

const Button = styled.button`
  background-color: #C5A572;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 2rem;

  &:hover {
    background-color: #9A7B4F;
  }
`

const ViewSurveysButton = styled.button`
  background-color: #4A4032;
  color: #C5A572;
  border: 2px solid #C5A572;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  position: fixed;
  top: 2rem;
  left: 2rem;
  font-family: inherit;
  font-size: 1.1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    background-color: #C5A572;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  &::before {
    content: '📋';
    font-size: 1.2rem;
  }
`

function App() {
  const [ratings, setRatings] = useState(initialState);
  const [showSurveys, setShowSurveys] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleRatingChange = (service, value) => {
    setRatings(prev => ({
      ...prev,
      [service]: { ...prev[service], rating: value }
    }));
  };

  const handleNotesChange = (service, notes) => {
    setRatings(prev => ({
      ...prev,
      [service]: { ...prev[service], notes }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // التحقق من صحة النموذج
    const hasInvalidService = Object.entries(ratings).some(([service, data]) => {
      if (service === 'أخرى: يرجى تحديدها') {
        return data.notes.trim() === '';
      }
      return data.rating === 0;
    });

    if (hasInvalidService) {
      alert('الرجاء تقييم جميع الخدمات وإضافة ملاحظة للخدمات الأخرى');
      return;
    }

    try {
      // حفظ البيانات
      const result = await saveSurvey(ratings);
      
      if (result.success) {
        // إرسال البريد الإلكتروني
        await sendSurveyEmail(ratings);
        
        // إعادة تعيين النموذج
        setRatings(initialState);
        alert('شكراً لك! تم إرسال تقييمك بنجاح');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('عذراً، حدث خطأ أثناء حفظ التقييم');
    }
  };

  const today = new Date().toLocaleDateString('ar', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    calendar: 'gregory'
  })

  if (showSurveys) {
    if (!isAuthenticated) {
      return (
        <LoginScreen 
          onLogin={() => setIsAuthenticated(true)}
          onBack={() => setShowSurveys(false)}
        />
      );
    }
    return <SurveysList onBack={() => {
      setShowSurveys(false);
      setIsAuthenticated(false);
    }} />;
  }

  return (
    <Container>
      <ViewSurveysButton onClick={() => setShowSurveys(true)}>
        عرض الاستبيانات
      </ViewSurveysButton>
      
      <Header>
        <LogoContainer>
          <Logo src={logo} alt="شعار هيئة التشريع والرأي القانوني" />
        </LogoContainer>
        <HeaderTitle>
          <Title>استبانة قياس رضا عن الخدمات الإدارية</Title>
          <DateDisplay>التاريخ: {today}</DateDisplay>
        </HeaderTitle>
      </Header>

      <form onSubmit={handleSubmit}>
        <ServicesGrid>
          {services.map((service, index) => (
            <ServiceContainer key={index}>
              <ServiceTitle>{service}</ServiceTitle>
              {service !== "أخرى: يرجى تحديدها" ? (
                <RatingContainer>
                  {[1, 2, 3].map((value) => (
                    <Star
                      key={value}
                      selected={ratings[service].rating >= value}
                      onClick={() => handleRatingChange(service, value)}
                    >
                      ★
                    </Star>
                  ))}
                </RatingContainer>
              ) : (
                <EmptyRatingSpace />
              )}
              <NotesTextArea
                placeholder={service === "أخرى: يرجى تحديدها" ? "يرجى تحديد الخدمة وملاحظاتك هنا..." : "أضف ملاحظاتك هنا..."}
                value={ratings[service].notes}
                onChange={(e) => handleNotesChange(service, e.target.value)}
              />
            </ServiceContainer>
          ))}
        </ServicesGrid>
        <div style={{ textAlign: 'center' }}>
          <Button type="submit">إرسال الاستبيان</Button>
        </div>
      </form>

      <div style={{ textAlign: 'center', marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid #C5A572', color: '#4A4032' }}>
        <p>شاكرين ومقدرين للجميع حسن التعاون معنا</p>
        <p>إدارة الموارد البشرية والمالية</p>
      </div>
    </Container>
  )
}

export default App
