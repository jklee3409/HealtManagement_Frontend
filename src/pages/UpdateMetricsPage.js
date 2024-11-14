import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Background = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background-color: #121212;
  color: #e6e6ff;
`;

const Navbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 97%; /* 전체 화면에 맞추기 */
  padding: 10px 20px;
  background-color: #1e1e1e;
  border-bottom: 1px solid #333;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;

const Logo = styled.h1`
  font-size: 24px;
  color: #a366ff;
`;

const NavMenu = styled.div`
  display: flex;
  gap: 15px;
`;

const NavLink = styled.span`
  color: #e6e6ff;
  text-decoration: none;
  font-size: 16px;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    color: #a366ff;
  }
`;

const Container = styled.div`
  padding: 40px;
  max-width: 500px;
  width: 100%;
  background-color: #1e1e1e;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  text-align: center;
  margin-top: 40px;
`;

const Title = styled.h2`
  color: #a366ff;
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  color: #d1b3ff;
  text-align: left;
  font-size: 14px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin: 10px 0 20px;
  border: 1px solid #6a42c2;
  border-radius: 6px;
  background-color: #2e2e2e;
  color: #e6e6ff;
  font-size: 16px;
  &:focus {
    border-color: #944dff;
    outline: none;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #a366ff;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #944dff;
  }
`;

const UpdateMetricsPage = ({ userId }) => {
  const [weight, setWeight] = useState('');
  const [skeletalMuscleMass, setSkeletalMuscleMass] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/users/${userId}/updateMetrics`, {
        weight: parseFloat(weight),
        skeletalMuscleMass: parseFloat(skeletalMuscleMass),
      });
      alert("Metrics updated successfully!");
    } catch (error) {
      console.error("Failed to update metrics", error);
      alert("Failed to update metrics.");
    }
  };

  return (
    <Background>
      <Navbar>
        <Logo>FitWell</Logo>
        <NavMenu>
          <NavLink onClick={() => window.location.href = '/'}>Home</NavLink>
          <NavLink onClick={() => window.location.href = '/insights'}>Insights</NavLink>
          <NavLink onClick={() => window.location.href = '/dashboard'}>Dashboard</NavLink>
          <NavLink onClick={() => window.location.href = '/login'}>Logout</NavLink>
        </NavMenu>
      </Navbar>

      <Container>
        <Title>Update Your Body Metrics</Title>
        <form onSubmit={handleSubmit}>
          <Label>Weight (kg)</Label>
          <Input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="Enter your weight" />
          
          <Label>Skeletal Muscle Mass (kg)</Label>
          <Input type="number" value={skeletalMuscleMass} onChange={(e) => setSkeletalMuscleMass(e.target.value)} placeholder="Enter your skeletal muscle mass" />

          <Button type="submit">Update Metrics</Button>
        </form>
      </Container>
    </Background>
  );
};

export default UpdateMetricsPage;
