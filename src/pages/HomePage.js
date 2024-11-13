import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
    return (
        <div className="homepage">
            {/* Header */}
            <header className="header">
                <div className="logo-container">
                    <img src="/logo.png" alt="Service Logo" className="logo" />
                    <h1 className="service-name">AI 건강 관리 서비스</h1>
                </div>
                <div className="auth-buttons">
                    <Link to="/login" className="button">로그인</Link>
                    <Link to="/signup" className="button">회원 가입</Link>
                </div>
            </header>

            {/* Main Content */}
            <main className="main-content">
                <section className="intro">
                    <h2>건강 관리, 이젠 간편하게</h2>
                    <p>당신의 목표를 설정하고 매일 기록해보세요. 맞춤형 운동 및 식단 계획으로 건강한 삶을 이어가세요.</p>
                </section>
                <section className="features">
                    <div className="feature-box">
                        <h3>개인 맞춤형 식단</h3>
                        <p>당신의 목표에 맞춘 식단을 추천해드립니다.</p>
                    </div>
                    <div className="feature-box">
                        <h3>운동 기록 및 분석</h3>
                        <p>운동 기록을 바탕으로 맞춤형 피드백을 받아보세요.</p>
                    </div>
                    <div className="feature-box">
                        <h3>목표 달성 추적</h3>
                        <p>매일의 작은 성과가 쌓여 목표를 달성할 수 있도록 돕습니다.</p>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default HomePage;
