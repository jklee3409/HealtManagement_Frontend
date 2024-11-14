import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #121212;
`;

const FormWrapper = styled.div`
  width: 400px;
  padding: 40px;
  border-radius: 12px;
  background-color: #1e1e1e;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 28px;
  color: white;
  margin-bottom: 30px;
`;

const Input = styled.input`
  width: 100%;
  padding: 14px;
  margin: 12px 0;
  border: 1px solid #3a3a3a;
  border-radius: 8px;
  font-size: 16px;
  color: #e6e6ff;
  background-color: #2e2e2e;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #a366ff;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 14px;
  background-color: #a366ff;
  color: white;
  font-size: 18px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #944dff;
  }
`;

const LoginPage = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/users/login', {
        email,
        password,
      });

      if (response.status === 200) {
        const user = response.data;
        localStorage.setItem('userId', user.id);
        localStorage.setItem('user', JSON.stringify(user));
        setIsLoggedIn(true);

        navigate('/');  // 홈페이지로 이동
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.');
    }
  };

  return (
    <LoginContainer>
      <FormWrapper>
        <Title>Singin</Title>
        <form onSubmit={handleLogin}>
          <Input
            type="email"
            name="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            name="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit">로그인</Button>
        </form>
      </FormWrapper>
    </LoginContainer>
  );
};

export default LoginPage;
