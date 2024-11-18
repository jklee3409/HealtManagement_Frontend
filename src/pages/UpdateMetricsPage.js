import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  width: 100%;
  max-width: 800px;
  padding: 20px;
  background-color: #1e1e1e;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
`;

const Section = styled.div`
  text-align: center;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  color: white;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  color: #d1b3ff;
  text-align: left;
  font-size: 14px;
`;

const Input = styled.input`
  width: 95%;
  padding: 12px;
  margin: 10px 0 20px;
  border: 1px solid #6a42c2;
  border-radius: 6px;
  background-color: #2e2e2e;
  color: #e6e6ff;
  font-size: 16px;
  &:focus {
    border-color: #944dff;
    outline: none;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #a366ff;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 20px;
  &:hover {
    background-color: #944dff;
  }
`;

const FeedbackResult = styled.div`
  margin-top: 30px;
  padding: 20px;
  background-color: #2e2e2e;
  border-radius: 8px;
  color: #e6e6ff;
  font-size: 16px;
  line-height: 1.6;
  white-space: pre-wrap;
`;

const UpdateMetricsPage = ({ isLoggedIn, onLogout }) => {
  const [weight, setWeight] = useState('');
  const [skeletalMuscleMass, setSkeletalMuscleMass] = useState('');
  const [diet, setDiet] = useState({ foodName: '', calories: '' });
  const [exercise, setExercise] = useState({ exerciseType: '', duration: '' });
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  const handleUpdateMetrics = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/users/${userId}/updateMetrics`, {
        weight: parseFloat(weight),
        skeletalMuscleMass: parseFloat(skeletalMuscleMass),
      });
      alert('Metrics updated successfully!');
    } catch (error) {
      console.error('Failed to update metrics', error);
      alert('Failed to update metrics.');
    }
  };

  const handleDietChange = (e) => {
    setDiet({ ...diet, [e.target.name]: e.target.value });
  };

  const handleExerciseChange = (e) => {
    setExercise({ ...exercise, [e.target.name]: e.target.value });
  };

  const saveDietAndExercise = async () => {
    try {
      console.log(userId);
      await axios.post(`http://localhost:8080/api/diet?userId=${userId}`, { ...diet });
      await axios.post(`http://localhost:8080/api/exercise?userId=${userId}`, { ...exercise });
      alert('식단 및 운동 정보가 저장되었습니다.');
      navigate('/update');
    } catch (error) {
      console.error('Error saving diet and exercise:', error);
      alert('식단 및 운동 정보를 저장하는 중 오류가 발생했습니다.');
    }
  };

  const handleFeedback = async () => {
    setLoading(true);
    setFeedback('');
    try {
      const response = await axios.get(`http://localhost:8080/api/feedback`, { params: { userId } });
      const feedbackText = response.data.choices
        .map((choice) => choice.text || choice.message?.content)
        .join('\n');
      setFeedback(feedbackText || '피드백이 없습니다.');
    } catch (error) {
      console.error('Error fetching feedback:', error);
      setFeedback('피드백 요청 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Background>
      <Header>
        <Logo>FitWell</Logo>
        <NavMenu>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/feedback">Insights</NavLink>
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/update">Update</NavLink>
          {isLoggedIn ? (
            <NavLink to="/" onClick={onLogout}>
              Logout
            </NavLink>
          ) : (
            <NavLink to="/login">Login</NavLink>
          )}
        </NavMenu>
      </Header>

      <Container>
      <Section>
          <Title>식단 및 운동 업데이트</Title>
          <Input
            type="text"
            name="foodName"
            placeholder="음식 이름"
            value={diet.foodName}
            onChange={handleDietChange}
          />
          <Input
            type="number"
            name="calories"
            placeholder="칼로리 (kcal)"
            value={diet.calories}
            onChange={handleDietChange}
          />
          <Input
            type="text"
            name="exerciseType"
            placeholder="운동 종류"
            value={exercise.exerciseType}
            onChange={handleExerciseChange}
          />
          <Input
            type="number"
            name="duration"
            placeholder="운동 시간 (분)"
            value={exercise.duration}
            onChange={handleExerciseChange}
          />
          <Button onClick={saveDietAndExercise}>식단 및 운동 정보 저장</Button>
        </Section>
        
        <Section>
          <Title>체중 및 골격근량 업데이트</Title>
          <form onSubmit={handleUpdateMetrics}>
            <Label>몸무게 (kg)</Label>
            <Input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="몸무게를 입력하세요. (kg)"
            />

            <Label>골격근량 (kg)</Label>
            <Input
              type="number"
              value={skeletalMuscleMass}
              onChange={(e) => setSkeletalMuscleMass(e.target.value)}
              placeholder="골격근량을 입력하세요. (kg)"
            />

            <Button type="submit">Update</Button>
          </form>
        </Section>
      </Container>
    </Background>
  );
};

export default UpdateMetricsPage;
