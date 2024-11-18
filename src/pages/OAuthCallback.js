import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

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

const OAuthCallback = () => {
  const [tokenFetched, setTokenFetched] = useState(false);

  useEffect(() => {
    const fetchAccessToken = async () => {
      // Prevent multiple fetches
      if (tokenFetched) return;

      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');

      // Validate code exists
      if (!code) {
        alert('인증 코드가 존재하지 않습니다.');
        window.location.href = '/login';
        return;
      }

      try {
        const response = await fetch('http://localhost:8080/oauth/kakao/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code })
        });

        // Mark token as fetched to prevent duplicate calls
        setTokenFetched(true);

        if (response.status === 201) {
          // New user - redirect to signup
          const userData = await response.json();
          window.location.href = `/signup?user=${encodeURIComponent(JSON.stringify(userData))}`;
        } else if (response.ok) {
          // Existing user - store user data and redirect to home
          const userData = await response.json();
          localStorage.setItem('user', JSON.stringify(userData));
          window.location.href = '/';
        } else {
          throw new Error('Login failed');
        }
      } catch (error) {
        console.error('OAuth 처리 중 오류:', error);
        
        // More specific error handling
        alert('존재하지 않는 계정입니다. 회원가입을 진행해주세요.');
        window.location.href = '/login';
      }
    };

    fetchAccessToken();
  }, [tokenFetched]);

  const Loading = () => {
    return (
      <LoadingScreen>
        <LoadingText>로그인 처리 중입니다. 잠시만 기다려주세요...</LoadingText>
      </LoadingScreen>
    );
  };
};

export default OAuthCallback;