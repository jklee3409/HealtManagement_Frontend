import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignupContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const FormWrapper = styled.div`
  width: 400px;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
`;

const Select = styled.select`
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #5a67d8;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 18px;
  cursor: pointer;
  &:hover {
    background-color: #4c51bf;
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
      navigate('/');
    } catch (error) {
      console.error("Signup error:", error);
      alert("회원가입에 실패했습니다. 누락된 정보가 없는지 확인해주세요.");
    }
  };

  return (
    <SignupContainer>
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
    </SignupContainer>
  );
};

export default Signup;
