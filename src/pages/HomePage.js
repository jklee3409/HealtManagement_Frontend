import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { useInView } from 'react-intersection-observer';
import Image1 from '../assets/images/function1.png'; 
import Image2 from '../assets/images/function2.png'; 
import Image3 from '../assets/images/function3.png';

const Container = styled.div`
  font-family: Arial, sans-serif;
  background-color: #121212;
  color: #e6e6ff;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  background-color: #1e1e1e;
  border-radius: 8px;
`;

const Logo = styled.h1`
  font-size: 24px;
  color: #a366ff;
`

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

const MainBanner = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 500px;
  color: #fff;
  text-align: center;
  padding: 0 20px;
  margin-bottom: 40px;
`;

const MainTitle = styled.h2`
  font-size: 48px;
  margin-bottom: 20px;
`;

const SubTitle = styled.p`
  font-size: 18px;
  margin-bottom: 40px;
`;

const CTAButton = styled.button`
  padding: 12px 24px;
  background-color: #a366ff;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #944dff;
  }
`;

// 애니메이션 추가
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const FeaturesSection = styled.section`
  padding: 60px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;


const FeatureContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1e1e1e;
  border-radius: 8px;
  padding: 40px;
  margin-bottom: 40px;
  width: 80%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  opacity: ${({ inView }) => (inView ? 1 : 0)};
  animation: ${({ inView }) => (inView ? fadeIn : 'none')} 0.7s ease-out;
  transition: opacity 0.7s ease-out;

  &:nth-child(odd) {
    flex-direction: row;
  }

  &:nth-child(even) {
    flex-direction: row-reverse;
  }
`;

const FeatureImage = styled.img`
  width: 50%;
  border-radius: 8px;
  margin: 0 20px;
`;

const FeatureText = styled.div`
  width: 50%;
  color: #e6e6ff;
  text-align: left;
`;

const FeatureTitle = styled.h3`
  font-size: 24px;
  color: #a366ff;
  margin-bottom: 20px;
`;

const FeatureDescription = styled.p`
  font-size: 16px;
`;

const HomePage = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (isLoggedIn) {
      navigate('/dashboard');
    } else {
      navigate('/signup');
    }
  };

  return (
    <Container>
      <Header>
        <Logo>FitWell</Logo>
        <NavMenu>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/feedback">Insight</NavLink>
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/update">Update</NavLink>
          {isLoggedIn ? (
            <NavLink to="/" onClick={onLogout}>Logout</NavLink>
          ) : (
            <NavLink to="/login">Login</NavLink>
          )}
        </NavMenu>
      </Header>

      <MainBanner>
        <MainTitle>FitWell</MainTitle>
        <SubTitle>개인 맞춤형 건강 관리와 분석을 하나의 플랫폼에서 제공합니다.</SubTitle>
        <CTAButton onClick={handleButtonClick}>
          {isLoggedIn ? 'Dashboard' : 'Get Started'}
        </CTAButton>
      </MainBanner>

      <FeaturesSection>
        <FeatureBlock 
          title="주간 & 월간 리포트" 
          description="칼로리 섭취량과 소모량을 분석하여 정리한 리포트를 받아보세요." 
          image={Image1} 
        />
        <FeatureBlock 
          title="식단 & 운동 모니터링" 
          description="일일 식단과 운동을 추적하여 신체 활동을 효율적으로 관리하세요." 
          image={Image2} 
        />
        <FeatureBlock
          title="AI 피드백 생성 및 추적" 
          description="chaGPT API를 활용한 피드백을 생성하고 피드백 내용을 한 곳에서 확인할 수 있습니다." 
          image={Image3}
        />
      </FeaturesSection>
    </Container>
  );
};

// 별도의 FeatureBlock 컴포넌트로 분리
const FeatureBlock = ({ title, description, image }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <FeatureContainer ref={ref} inView={inView}>
      <FeatureText>
        <FeatureTitle>{title}</FeatureTitle>
        <FeatureDescription>{description}</FeatureDescription>
      </FeatureText>
      <FeatureImage src={image} alt={title} />
    </FeatureContainer>
  );
};

export default HomePage;