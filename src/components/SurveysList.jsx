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

const InnerTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 0;
`;

const Th = styled.th`
  background: #4A4032;
  color: #C5A572;
  padding: 1rem;
  text-align: right;
  font-weight: 500;
`;

const InnerTh = styled.th`
  background: #f5f5f5;
  color: #4A4032;
  padding: 0.5rem;
  text-align: right;
  font-weight: 500;
  border-bottom: 1px solid #eee;
`;

const Td = styled.td`
  padding: ${props => props.noPadding ? '0' : '1rem'};
  border-bottom: 1px solid #eee;
`;

const InnerTd = styled.td`
  padding: 0.5rem;
  border-bottom: 1px solid #f5f5f5;
  
  &:first-child {
    width: 200px;
  }
  
  &:nth-child(2) {
    width: 100px;
  }
`;

const Tr = styled.tr`
  &:nth-child(even) {
    background: #f9f9f9;
  }
`;

const InnerTr = styled.tr`
  &:last-child td {
    border-bottom: none;
  }
`;

const BackButton = styled.button`
  background-color: #C5A572;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 1rem;

  &:hover {
    background-color: #9A7B4F;
  }
`;

const NoSurveys = styled.div`
  text-align: center;
  padding: 2rem;
  color: #666;
`;

const Stars = styled.span`
  color: #C5A572;
`;

function SurveysList({ onBack }) {
  const [surveys, setSurveys] = useState([]);

  useEffect(() => {
    setSurveys(getAllSurveys().reverse());
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderStars = (rating) => {
    return rating > 0 ? '★'.repeat(rating) + '☆'.repeat(3 - rating) : '-';
  };

  return (
    <Container>
      <BackButton onClick={onBack}>عودة إلى الاستبيان</BackButton>
      <Title>الاستبيانات المستلمة</Title>
      
      {surveys.length === 0 ? (
        <NoSurveys>لا توجد استبيانات مستلمة</NoSurveys>
      ) : (
        <Table>
          <thead>
            <tr>
              <Th>التاريخ</Th>
              <Th>تفاصيل التقييم</Th>
            </tr>
          </thead>
          <tbody>
            {surveys.map((survey) => (
              <Tr key={survey.id}>
                <Td>{formatDate(survey.date)}</Td>
                <Td noPadding>
                  <InnerTable>
                    <thead>
                      <tr>
                        <InnerTh>الخدمة</InnerTh>
                        <InnerTh>التقييم</InnerTh>
                        <InnerTh>الملاحظات</InnerTh>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(survey)
                        .filter(([key]) => key !== 'id' && key !== 'date')
                        .map(([service, data]) => (
                          <InnerTr key={service}>
                            <InnerTd>{service}</InnerTd>
                            <InnerTd>
                              <Stars>{renderStars(data.rating)}</Stars>
                            </InnerTd>
                            <InnerTd>{data.notes || '-'}</InnerTd>
                          </InnerTr>
                        ))}
                    </tbody>
                  </InnerTable>
                </Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

export default SurveysList;
