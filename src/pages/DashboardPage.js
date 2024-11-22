// DashboardPage.js

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title as ChartTitle, Tooltip, Legend } from 'chart.js';
import { useNavigate, Link } from 'react-router-dom';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ChartTitle, Tooltip, Legend);

const Container = styled.div`
  font-family: Arial, sans-serif;
  padding: 40px;
  max-width: 1400px;
  margin: 0 auto;
  background-color: #121212;
  color: #e6e6ff;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  background-color: #1e1e1e;
  border-radius: 8px;
  width: 100%;
`;

const Logo = styled.h1`
  font-size: 24px;
  color: #a366ff;
`;

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

const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 10px;
`;

const ChartWrapper = styled.div`
  width: 48%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
`;

const ChartContainer = styled.div`
  width: 100%;
  padding: 20px;
  background-color: #1e1e1e;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  height: 300px;
`;

const ChartHeading = styled.h3`
  font-size: 18px;
  color: #f0e6ff;
  margin-bottom: 10px;
  text-align: center;
`;

const BottomSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const DateSection = styled.div`
  margin-bottom: 20px;
`;

const DatePickerStyled = styled(DatePicker)`
  width: 220px;
  text-align: center;
  padding: 12px;
  border-radius: 8px;
  background-color: #2e2e2e;
  color: #e6e6ff;
  border: 1px solid #6a42c2;
  cursor: pointer;
  &:hover {
    background-color: #1e1e1e;
  }
`;

const DataDisplay = styled.div`
  padding: 20px;
  background-color: #1e1e1e;
  border-radius: 12px;
  width: 80%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
`;

const DietExerciseList = styled.ul`
  list-style: none;
  padding: 0;
`;

const DietExerciseItem = styled.li`
  margin-bottom: 10px;
  padding: 10px;
  background-color: #2e2e2e;
  border-radius: 6px;
`;

const DashboardPage = ({ isLoggedIn, onLogout }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dietExerciseData, setDietExerciseData] = useState(null);
  const [weeklyData, setWeeklyData] = useState(null);
  const [monthlyData, setMonthlyData] = useState(null);
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userId');
    navigate('/');
  };

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        const weeklyResponse = await axios.get(`${process.env.REACT_APP_API_URL}/api/reports/weekly?userId=${userId}`);
        const monthlyResponse = await axios.get(`${process.env.REACT_APP_API_URL}/api/reports/monthly?userId=${userId}`);
        setWeeklyData(weeklyResponse.data);
        setMonthlyData(monthlyResponse.data);
      } catch (error) {
        console.error('Error fetching report data:', error);
      }
    };
    fetchReportData();
  }, [userId]);

  useEffect(() => {
    const fetchData = async () => {
      const formattedDate = selectedDate.toISOString().split('T')[0];
      try {
        const response = await axios.get(`https://fiwell-health-care.duckdns.org/api/diet-exercise?date=${formattedDate}&userId=${userId}`);
        setDietExerciseData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    if (selectedDate) {
      fetchData();
    }
  }, [selectedDate, userId]);

  const formatChartData = (data) => ({
    labels: data.dates,
    datasets: [
      {
        label: '칼로리 섭취량 (kcal)',
        data: data.calories,
        borderColor: '#a366ff',
        backgroundColor: 'rgba(163, 102, 255, 0.2)',
        fill: true,
      },
      {
        label: '운동 소모량 (kcal)',
        data: data.exercise,
        borderColor: '#e6e6ff',
        backgroundColor: 'rgba(230, 230, 255, 0.2)',
        fill: true,
      },
    ],
  });

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
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
            <NavLink to="/" onClick={handleLogout}>Logout</NavLink>
          ) : (
            <NavLink to="/login">Login</NavLink>
          )}
        </NavMenu>
      </Header>

      <TopSection>
        <ChartWrapper>
          <ChartHeading>주간 리포트</ChartHeading>
          <ChartContainer>
            {weeklyData && <Line data={formatChartData(weeklyData)} options={chartOptions} height={200} />}
          </ChartContainer>
        </ChartWrapper>

        <ChartWrapper>
          <ChartHeading>월간 리포트</ChartHeading>
          <ChartContainer>
            {monthlyData && <Bar data={formatChartData(monthlyData)} options={chartOptions} height={200} />}
          </ChartContainer>
        </ChartWrapper>
      </TopSection>

      <BottomSection>
        <DateSection>
          <h3>&emsp;날짜별 식단 및 운동 정보</h3>
          <DatePickerStyled
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="yyyy-MM-dd"
          />
        </DateSection>

        <DataDisplay>
          {dietExerciseData ? (
            <>
              <h3>식단 정보</h3>
              <DietExerciseList>
                {dietExerciseData.mealLogs?.length ? (
                  dietExerciseData.mealLogs.map((item, index) => (
                    <DietExerciseItem key={index}>
                      음식: {item.foodName}, 칼로리: {item.calories} kcal
                    </DietExerciseItem>
                  ))
                ) : (
                  <p>선택한 날짜의 식단 정보가 없습니다.</p>
                )}
              </DietExerciseList>

              <h3>운동 정보</h3>
              <DietExerciseList>
                {dietExerciseData.exerciseLogs?.length ? (
                  dietExerciseData.exerciseLogs.map((item, index) => (
                    <DietExerciseItem key={index}>
                      운동: {item.exerciseType}, 시간: {item.duration} 분, 칼로리 소모: {item.caloriesBurned} kcal
                    </DietExerciseItem>
                  ))
                ) : (
                  <p>선택한 날짜의 운동 정보가 없습니다.</p>
                )}
              </DietExerciseList>
            </>
          ) : (
            <p>선택한 날짜에 대한 데이터를 불러오는 중입니다...</p>
          )}
        </DataDisplay>
      </BottomSection>
    </Container>
  );
};

export default DashboardPage;
