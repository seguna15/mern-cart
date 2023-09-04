import React from 'react'
import { styled } from 'styled-components';
import SideBar from './SideBar';
import MainContent from './MainContent';

const Dashboard = () => {
  return (
    <StyledDashboard>
        <SideBar/>
        <MainContent/>
    </StyledDashboard>
  )
}

export default Dashboard;

const StyledDashboard = styled.div`
  display: flex;
  height: 100vh;
`;

