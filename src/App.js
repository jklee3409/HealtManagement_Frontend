import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import FeedbackPage from './pages/FeedbackPage';
import InputPage from './pages/InputPage';
import DashboardPage from './pages/DashboardPage';
import UpdateMetricsPage from './pages/UpdateMetricsPage';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // 페이지 새로고침 시 localStorage에서 로그인 상태 확인
        const user = localStorage.getItem('user');
        setIsLoggedIn(!!user);
    }, []);

    const handleLogout = () => {
        // 로그아웃 처리: localStorage에서 사용자 정보 제거 및 상태 업데이트
        localStorage.removeItem('user');
        localStorage.removeItem('userId');
        setIsLoggedIn(false);
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage isLoggedIn={isLoggedIn} onLogout={handleLogout} />} />
                <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
                <Route path="/signup" element={<RegisterPage />} />
                <Route path="/feedback" element={<FeedbackPage />} />
                <Route path="/input" element={<InputPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/update" element={<UpdateMetricsPage />} />
            </Routes>
        </Router>
    );
}

export default App;
