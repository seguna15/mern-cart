import React from 'react';
import { Outlet } from 'react-router-dom';
import { styled } from "styled-components";

const MainContent = () => {
  return (
    <Content>
        <Outlet/>
    </Content>
  )
}

export default MainContent;

const Content = styled.div`
  margin-left: 200px;
  padding: 2rem 3rem;
  width: 100%;
`;