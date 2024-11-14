import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const FeedbackContainer = styled.div`
  max-width: 600px;
  margin: 80px auto;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 28px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
`;

const Input = styled.textarea`
  width: 100%;
  height: 120px;
  padding: 15px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 16px;
  resize: none;
  margin-bottom: 20px;
  background-color: #f7fafc;
  color: #333;
  outline: none;
  &:focus {
    border-color: #5a67d8;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px 20px;
  background-color: #5a67d8;
  color: white;
  font-size: 18px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
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
  text-align: left;
  font-size: 16px;
  line-height: 1.6;
`;

const LoadingSpinner = styled.div`
  border: 4px solid #e2e8f0;
  border-top: 4px solid #5a67d8;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  animation: spin 1s linear infinite;
  margin: 20px auto;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const FeedbackPage = () => {
  const [prompt, setPrompt] = useState('');
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback('');
    try {
      const response = await axios.post('http://localhost:8080/api/feedback', { prompt }, {
        headers: { 'Content-Type': 'application/json' },
      });
      setFeedback(response.data); 
    } catch (error) {
      console.error('Error fetching feedback:', error);
      setFeedback('피드백 요청 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <FeedbackContainer>
      <Title>맞춤형 건강 피드백</Title>
      <form onSubmit={handleSubmit}>
        <Input
          placeholder="피드백을 받고 싶은 내용을 입력하세요."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          required
        />
        <Button type="submit" disabled={loading}>
          {loading ? '요청 중...' : '피드백 요청'}
        </Button>
      </form>
      {loading && <LoadingSpinner />}
      {feedback && (
        <FeedbackResult>  
          <h3>피드백 결과</h3>
          <p>{feedback}</p>
        </FeedbackResult>
      )}
    </FeedbackContainer>
  );
};

export default FeedbackPage;
