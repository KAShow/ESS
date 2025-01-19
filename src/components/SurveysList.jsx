import React, { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import { getAllSurveys } from '../utils/storage';

const Container = styled.div`
  max-width: 1400px;
  margin: 2rem auto;
  padding: 0 2rem;
  direction: rtl;
  font-family: 'Cairo', sans-serif;
`;

const Title = styled.h2`
  color: #4A4032;
  text-align: center;
  margin-bottom: 2rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const Th = styled.th`
  background: #4A4032;
  color: #C5A572;
  padding: 1rem;
  text-align: right;
  font-weight: 500;
`;

const Td = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #eee;
`;

const BackButton = styled.button`
  background: #4A4032;
  color: #C5A572;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 1rem;
  
  &:hover {
    background: #5A5042;
  }
`;

function SurveysList({ onBack }) {
  const [surveys, setSurveys] = useState([]);

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const data = await getAllSurveys();
        setSurveys(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching surveys:', error);
        setSurveys([]);
      }
    };

    fetchSurveys();
  }, []);

  return (
    <Container>
      <BackButton onClick={onBack}>عودة</BackButton>
      <Title>قائمة الاستبيانات</Title>
      <Table>
        <thead>
          <tr>
            <Th>الاسم</Th>
            <Th>البريد الإلكتروني</Th>
            <Th>القسم</Th>
            <Th>التقييمات</Th>
            <Th>التاريخ</Th>
          </tr>
        </thead>
        <tbody>
          {surveys.map((survey) => (
            <tr key={survey._id}>
              <Td>{survey.name || 'غير متوفر'}</Td>
              <Td>{survey.email || 'غير متوفر'}</Td>
              <Td>{survey.department || 'غير متوفر'}</Td>
              <Td>
                {survey.services ? 
                  Object.entries(survey.services).map(([service, data]) => (
                    <div key={service}>
                      {service}: {data.rating}/5 - {data.notes || 'لا توجد ملاحظات'}
                    </div>
                  ))
                  : 'لا توجد تقييمات'
                }
              </Td>
              <Td>{new Date(survey.createdAt).toLocaleDateString('ar')}</Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default SurveysList;
