import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const response = await axios.post('http://localhost:8080/api/users/login', {
        email,
        password,
      });

      // 성공 시 토큰 저장
      localStorage.setItem('token', response.data.token);
      navigate('/profile');
    } catch (error){
      console.error('로그인 실패:', error);
    }
  };

  return (
    <div>
      <h2>로그인</h2>
        <form onSubmit={handleSubmit}>
          <label>
            이메일:
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>
          <label>
            비밀번호:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </label>
          <button type="submit">로그인</button>
        </form>
    </div>
  )
}

export default LoginPage;