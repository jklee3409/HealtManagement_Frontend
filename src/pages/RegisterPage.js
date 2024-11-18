import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Background = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background-color: #121212;
  color: #e6e6ff;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 94%;
  max-width: 1400px;
  padding: 20px 40px;
  background-color: #1e1e1e;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const Logo = styled.h1`
  font-size: 24px;
  color: #a366ff;
`;

const NavMenu = styled.nav`
  display: flex;
  gap: 20px;
`;

const NavLink = styled(Link)`
  color: #e6e6ff;
  text-decoration: none;
  font-size: 16px;
  padding: 8px 12px;
  border-radius: 4px;
  &:hover {
    color: #a366ff;
    background-color: #2e2e2e;
  }
`;

const FormWrapper = styled.div`
  width: 400px;
  padding: 40px;
  border-radius: 8px;
  background-color: #1e1e1e;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 24px;
  color: white;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 93.5%;
  padding: 12px;
  margin: 10px 0;
  border: 1px solid #6a42c2;
  border-radius: 4px;
  background-color: #2e2e2e;
  color: #e6e6ff;
  font-size: 16px;
  &:focus {
    outline: none;
    border-color: #944dff;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border: 1px solid #6a42c2;
  border-radius: 4px;
  background-color: #2e2e2e;
  color: #e6e6ff;
  font-size: 16px;
  &:focus {
    outline: none;
    border-color: #944dff;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #a366ff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #944dff;
  }
`;

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    height: '',
    weight: '',
    age: '',
    gender: '',
    healthGoal: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      await axios.post('http://localhost:8080/api/users/register', formData);
      navigate('/home');
    } catch (error) {
      console.error("Signup error:", error);
      alert("회원가입에 실패했습니다. 누락된 정보가 없는지 확인해주세요.");
    }
  };

  return (
    <Background>
      <Header>
        <Logo>FitWell</Logo>
        <NavMenu>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/insight">Insights</NavLink>
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/login">Login</NavLink>
        </NavMenu>
      </Header>

      <FormWrapper>
        <Title>회원 가입</Title>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="username"
            placeholder="이름"
            value={formData.username}
            onChange={handleChange}
          />
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <Input
            type="number"
            name="height"
            placeholder="키 (cm)"
            value={formData.height}
            onChange={handleChange}
          />
          <Input
            type="number"
            name="weight"
            placeholder="몸무게 (kg)"
            value={formData.weight}
            onChange={handleChange}
          />
          <Input
            type="number"
            name="age"
            placeholder="나이"
            value={formData.age}
            onChange={handleChange}
          />
          <Select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">성별</option>
            <option value="male">남성</option>
            <option value="female">여성</option>
            <option value="other">기타</option>
          </Select>
          <Select name="healthGoal" value={formData.healthGoal} onChange={handleChange}>
            <option value="">건강 목표</option>
            <option value="weight_loss">체중 감량</option>
            <option value="muscle_gain">근육 증가</option>
            <option value="maintenance">유지</option>
          </Select>
          <Button type="submit">Create Account</Button>
        </form>
      </FormWrapper>
    </Background>
  );
};

export default Signup;
