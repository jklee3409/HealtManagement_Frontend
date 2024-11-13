import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
`;

const Section = styled.div`
  margin-bottom: 30px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin: 5px 0 15px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #5a67d8;
  color: white;
  font-size: 18px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #4c51bf;
  }
  &:disabled {
    background-color: #a0aec0;
    cursor: not-allowed;
  }
`;

const FeedbackResult = styled.div`
  margin-top: 30px;
  padding: 20px;
  background-color: #edf2f7;
  border-radius: 8px;
  color: #333;
  font-size: 16px;
  line-height: 1.6;
`;

const InputPage = () => {
  const [diet, setDiet] = useState({ foodName: '', calories: '' });
  const [exercise, setExercise] = useState({ exerciseType: '', duration: '' });
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);
  const userId = localStorage.getItem('userId'); // 사용자 ID를 가져옴

  const handleDietChange = (e) => {
    setDiet({ ...diet, [e.target.name]: e.target.value });
  };

  const handleExerciseChange = (e) => {
    setExercise({ ...exercise, [e.target.name]: e.target.value });
  };

  const saveDietAndExercise = async () => {
    try {
      // 식단 정보 저장
      await axios.post(`http://localhost:8080/api/diet?userId=${userId}`, { ...diet }, {
        headers: { 'Content-Type': 'application/json' },
      });
      
      // 운동 정보 저장
      await axios.post(`http://localhost:8080/api/exercise?userId=${userId}`, { ...exercise }, {
        headers: { 'Content-Type': 'application/json' },
      });
      alert("식단 및 운동 정보가 저장되었습니다.");
    } catch (error) {
      console.error("Error saving diet and exercise:", error);
      alert("식단 및 운동 정보를 저장하는 중 오류가 발생했습니다.");
    }
  };

  const handleFeedback = async () => {
    setLoading(true);
    setFeedback('');
    try {
      // userId를 사용해 피드백 요청
      const response = await axios.get(`http://localhost:8080/api/feedback?userId=${userId}`);
      setFeedback(response.data); // 피드백 결과를 화면에 표시
    } catch (error) {
      console.error('Error fetching feedback:', error);
      setFeedback('피드백 요청 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Section>
        <Title>식단 입력</Title>
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
      </Section>

      <Section>
        <Title>운동 입력</Title>
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
      </Section>

      {/* 식단 및 운동 정보 저장 버튼 */}
      <Button onClick={saveDietAndExercise}>식단 및 운동 정보 저장하기</Button>

      {/* 피드백 요청 버튼 */}
      <Button onClick={handleFeedback} disabled={loading}>
        {loading ? '피드백 요청 중...' : '피드백 받기'}
      </Button>

      {/* 피드백 결과 표시 */}
      {feedback && (
        <FeedbackResult>
          <h3>피드백 결과:</h3>
          <p>{feedback}</p>
        </FeedbackResult>
      )}
    </Container>
  );
};

export default InputPage;
