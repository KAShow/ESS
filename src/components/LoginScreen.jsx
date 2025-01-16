import React, { useState } from 'react';
import { styled } from 'styled-components';

const Container = styled.div`
  max-width: 400px;
  margin: 4rem auto;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  direction: rtl;
  font-family: 'Cairo', sans-serif;
`;

const Title = styled.h2`
  color: #4A4032;
  margin-bottom: 2rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  margin-bottom: 1rem;
  border: 2px solid ${props => props.error ? '#ff6b6b' : '#C5A572'};
  border-radius: 4px;
  font-size: 1.1rem;
  text-align: center;
  direction: ltr;
  
  &:focus {
    outline: none;
    border-color: #4A4032;
  }
`;

const Button = styled.button`
  background-color: #C5A572;
  color: white;
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 4px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  font-family: inherit;

  &:hover {
    background-color: #9A7B4F;
  }
`;

const ErrorMessage = styled.div`
  color: #ff6b6b;
  margin-bottom: 1rem;
  font-size: 0.9rem;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: #C5A572;
  cursor: pointer;
  margin-top: 1rem;
  font-family: inherit;

  &:hover {
    text-decoration: underline;
  }
`;

// كلمة المرور المطلوبة للوصول
const ADMIN_PASSWORD = 'alqattan';

function LoginScreen({ onLogin, onBack }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      onLogin();
    } else {
      setError('كلمة المرور غير صحيحة');
      setPassword('');
    }
  };

  return (
    <Container>
      <Title>الدخول لعرض الاستبيانات</Title>
      <form onSubmit={handleSubmit}>
        <Input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError('');
          }}
          placeholder="أدخل كلمة المرور"
          error={!!error}
          autoFocus
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Button type="submit">دخول</Button>
      </form>
      <BackButton onClick={onBack}>العودة للاستبيان</BackButton>
    </Container>
  );
}

export default LoginScreen;
