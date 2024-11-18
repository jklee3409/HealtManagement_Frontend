import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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
  width: 94%;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  background-color: #1e1e1e;
  border-radius: 8px;
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
  margin-top: 40px;
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

  ${(props) =>
    props.readOnly &&
    `
    background-color: #3a3a3a;
    cursor: not-allowed;
  `}
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
    kakaoId: null,
    isKakaoUser: false,
  });

  const [errors, setErrors] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const kakaoUserParam = urlParams.get('user');

    if (kakaoUserParam) {
      try {
        const kakaoUser = JSON.parse(decodeURIComponent(kakaoUserParam));
        setFormData((prevData) => ({
          ...prevData,
          email: kakaoUser.email || '',
          username: kakaoUser.username || '',
          kakaoId: kakaoUser.id,
          isKakaoUser: true,
        }));
      } catch (error) {
        console.error('Failed to parse Kakao user data:', error);
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = '이름을 입력해주세요.';
    }

    if (!formData.email.trim()) {
      newErrors.email = '이메일을 입력해주세요.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = '유효한 이메일 형식이 아닙니다.';
    }

    if (!formData.isKakaoUser && !formData.password) {
      newErrors.password = '비밀번호를 입력해주세요.';
    }

    if (!formData.height) {
      newErrors.height = '키를 입력해주세요.';
    }

    if (!formData.weight) {
      newErrors.weight = '몸무게를 입력해주세요.';
    }

    if (!formData.age) {
      newErrors.age = '나이를 입력해주세요.';
    }

    if (!formData.gender) {
      newErrors.gender = '성별을 선택해주세요.';
    }

    if (!formData.healthGoal) {
      newErrors.healthGoal = '건강 목표를 선택해주세요.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateForm()) {
      return;
    }
  
    try {
      // POST URL 결정
      const postUrl = formData.isKakaoUser
        ? 'http://localhost:8080/api/users/register/kakao'
        : 'http://localhost:8080/api/users/register';
  
      const response = await fetch(postUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        alert('회원가입 성공!');
        window.location.href = '/';
      } else {
        alert(result.message || '회원가입에 실패했습니다. 정보를 확인해주세요.');
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert('네트워크 오류가 발생했습니다.');
    }
  };
  

  return (
    <Background>
      <Header>
        <Logo>FitWell</Logo>
        <NavMenu>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/feedback">Insight</NavLink>
          <NavLink to="/dashboard">Dashboard</NavLink>
          {isLoggedIn ? (
            <NavLink to="/" onClick={() => setIsLoggedIn(false)}>
              Logout
            </NavLink>
          ) : (
            <NavLink to="/login">Login</NavLink>
          )}
        </NavMenu>
      </Header>

      <FormWrapper>
        <Title>회원 가입</Title>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <Input
            type="text"
            name="username"
            placeholder="이름"
            value={formData.username}
            onChange={handleChange}
            readOnly={formData.isKakaoUser}
          />
          {errors.username && <p style={{ color: 'red', margin: 0 }}>{errors.username}</p>}

          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            readOnly={formData.isKakaoUser}
          />
          {errors.email && <p style={{ color: 'red', margin: 0 }}>{errors.email}</p>}

          {!formData.isKakaoUser && (
            <>
              <Input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <p style={{ color: 'red', margin: 0 }}>{errors.password}</p>}
            </>
          )}

          <Input
            type="number"
            name="height"
            placeholder="키 (cm)"
            value={formData.height}
            onChange={handleChange}
          />
          {errors.height && <p style={{ color: 'red', margin: 0 }}>{errors.height}</p>}

          <Input
            type="number"
            name="weight"
            placeholder="몸무게 (kg)"
            value={formData.weight}
            onChange={handleChange}
          />
          {errors.weight && <p style={{ color: 'red', margin: 0 }}>{errors.weight}</p>}

          <Input
            type="number"
            name="age"
            placeholder="나이"
            value={formData.age}
            onChange={handleChange}
          />
          {errors.age && <p style={{ color: 'red', margin: 0 }}>{errors.age}</p>}

          <Select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">성별</option>
            <option value="male">남성</option>
            <option value="female">여성</option>
            <option value="other">기타</option>
          </Select>
          {errors.gender && <p style={{ color: 'red', margin: 0 }}>{errors.gender}</p>}

          <Select name="healthGoal" value={formData.healthGoal} onChange={handleChange}>
            <option value="">건강 목표</option>
            <option value="weight_loss">체중 감량</option>
            <option value="muscle_gain">근육 증가</option>
            <option value="maintenance">유지</option>
          </Select>
          {errors.healthGoal && <p style={{ color: 'red', margin: 0 }}>{errors.healthGoal}</p>}

          <Button type="submit">Create Account</Button>
        </form>
      </FormWrapper>
    </Background>
  );
};

export default Signup;
