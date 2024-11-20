import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

const PageContainer = styled.div`
  background-color: #121212;
  color: #e6e6ff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  width: 94%;
  margin: 0 auto;
  padding: 20px 40px;
  background-color: #1e1e1e;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #e6e6ff;
  border-radius: 8px;
`;

const Logo = styled.h1`
  font-size: 24px;
  color: #a366ff;
  cursor: pointer;
`;

const NavMenu = styled.div`
  display: flex;
  gap: 20px;
`;

const NavLink = styled(Link)`
  color: #e6e6ff;
  text-decoration: none;
  font-size: 16px;
  &:hover {
    color: #a366ff;
  }
`;

const MainContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 1200px;
  margin: 20px auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 200px;
  background-color: #1e1e1e;
  padding: 10px;
  border-radius: 8px 0 0 8px;
  position: sticky;
  top: 20px;
  height: fit-content;
`;

const SidebarButton = styled.button`
  padding: 12px;
  background-color: #2e2e2e;
  color: #e6e6ff;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  white-space: nowrap; /* 버튼 텍스트가 줄바꿈되지 않도록 설정 */
  &:hover {
    background-color: #3e3e3e;
  }
`;

const FeedbackContainer = styled.div`
  flex-grow: 1;
  padding-left: 20px;
`;

const Title = styled.h2`
  color: white;
  font-size: 24px;
`;

const FeedbackResult = styled.div`
  margin-top: 20px;
  padding: 20px;
  background-color: #1e1e1e;
  border-radius: 8px;
  color: #e6e6ff;
  font-size: 16px;
  line-height: 1.6;
  white-space: pre-wrap;
  overflow-wrap: break-word; /* 긴 텍스트 줄바꿈 처리 */
`;

const Button = styled.button`
  padding: 12px;
  background-color: #5a67d8;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 20px;
  &:hover {
    background-color: #4c51bf;
  }
`;

const FeedbackPage = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState('today');
  const [loading, setLoading] = useState(false);
  const [newFeedback, setNewFeedback] = useState('');
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeedbackHistory = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://fiwell-health-care.duckdns.org/api/feedback/history`, {
          params: { userId, period: selectedPeriod },
        });

        const feedbackTexts = response.data.map(feedback => {
          try {
            const choices = JSON.parse(feedback.feedback)?.choices || [];
            return choices.map(choice => choice.message?.content).join('\n');
          } catch (parseError) {
            console.error('Error parsing feedback JSON:', parseError);
            return 'Invalid feedback format';
          }
        });
        setFeedbacks(feedbackTexts);
      } catch (error) {
        console.error('Error fetching feedback history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbackHistory();
  }, [selectedPeriod, userId]);

  const handleNewFeedback = async () => {
    setLoading(true);
    setNewFeedback('');
    try {
      const response = await axios.get(`https://fiwell-health-care.duckdns.org/api/feedback`, {
        params: { userId },
      });

      const feedbackText = response.data.choices
        .map(choice => choice.text || choice.message?.content)
        .join('\n');
      setNewFeedback(feedbackText || '피드백이 없습니다.');
    } catch (error) {
      console.error('Error requesting new feedback:', error);
      setNewFeedback('피드백 요청 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userId');
    navigate('/login');
  };

  return (
    <PageContainer>
      <Header>
        <Logo>FitWell</Logo>
        <NavMenu>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/feedback">Insight</NavLink>
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/update">Update</NavLink>
          {userId ? (
            <NavLink
              as="button"
              onClick={handleLogout}
              style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}
            >
              Logout
            </NavLink>
          ) : (
            <NavLink to="/login">Login</NavLink>
          )}
        </NavMenu>
      </Header>

      <MainContainer>
        <Sidebar>
          <SidebarButton onClick={() => setSelectedPeriod('today')}>오늘</SidebarButton>
          <SidebarButton onClick={() => setSelectedPeriod('yesterday')}>어제</SidebarButton>
          <SidebarButton onClick={() => setSelectedPeriod('last_7_days')}>지난 7일</SidebarButton>
          <SidebarButton onClick={() => setSelectedPeriod('last_month')}>지난 한 달</SidebarButton>
        </Sidebar>
        <FeedbackContainer>
          <Title>피드백 목록</Title>
          {loading ? (
            <p>로딩 중...</p>
          ) : feedbacks.length > 0 ? (
            feedbacks.map((feedback, index) => (
              <FeedbackResult key={index}>{feedback}</FeedbackResult>
            ))
          ) : (
            <p>선택한 기간에 피드백이 없습니다.</p>
          )}
          <Button onClick={handleNewFeedback} disabled={loading}>
            {loading ? '피드백 요청 중...' : '새로운 피드백 요청'}
          </Button>
          {newFeedback && (
            <FeedbackResult>
              <h3>새로운 피드백:</h3>
              <ReactMarkdown>{newFeedback}</ReactMarkdown>
            </FeedbackResult>
          )}
        </FeedbackContainer>
      </MainContainer>
    </PageContainer>
  );
};

export default FeedbackPage;
