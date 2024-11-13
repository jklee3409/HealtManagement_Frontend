import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import FeedbackPage from './pages/FeedbackPage';
import InputPage from './pages/InputPage';

function App() {
    return (
        <Router>
            <div className="app">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<RegisterPage />} />
                    <Route path="/feedback" element={<FeedbackPage />} />
                    <Route path='/input' element={<InputPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
