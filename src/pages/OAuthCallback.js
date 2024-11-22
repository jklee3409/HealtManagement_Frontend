import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const LoadingScreen = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #121212;
  color: #e6e6ff;
  font-family: Arial, sans-serif;
  font-size: 18px;
`;

const LoadingText = styled.p`
  animation: fadeInOut 1.5s infinite;

  @keyframes fadeInOut {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
`;

const OAuthCallback = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccessToken = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');

      if (!code) {
        alert('인증 코드가 존재하지 않습니다.');
        navigate('/login'); // 로그인 페이지로 이동
        return;
      }

      try {
        console.log('OAuthCallback 진입');
        const response = await fetch('https://fiwell-health-care.duckdns.org/oauth/kakao/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code }),
        });

        if (response.status === 200) {
          const user = await response.json();
          localStorage.setItem('userId', user.id); // 사용자 ID 저장
          localStorage.setItem('user', JSON.stringify(user)); // 사용자 정보 저장
          setIsLoggedIn(true); // 로그인 상태 업데이트
          navigate('/'); // 홈페이지로 이동
        } else if (response.status === 201) {
          const userData = await response.json();
          navigate(`/signup?user=${encodeURIComponent(JSON.stringify(userData))}`); // 회원가입 페이지로 이동
        } else {
          throw new Error('로그인 실패');
        }
      } catch (error) {
        console.error('OAuth 처리 중 오류:', error);
        navigate('/login'); // 로그인 페이지로 이동
      }
    };

    fetchAccessToken();
  }, [navigate, setIsLoggedIn]);

  return (
    <LoadingScreen>
      <LoadingText>로그인 처리 중입니다. 잠시만 기다려주세요...</LoadingText>
    </LoadingScreen>
  );
};

export default OAuthCallback;
