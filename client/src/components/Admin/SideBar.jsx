import React from 'react'
import { NavLink } from 'react-router-dom';
import { styled } from "styled-components";

const SideBar = () => {
  
  return (
    <SideNav>
      <h3>Quick Links</h3>
      <NavLink
        className={({ isActive }) =>
          isActive ? "link-active" : "link-inactive"
        }
        to="/admin/summary"
      >
        Summary
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? "link-active" : "link-inactive"
        }
        to="/admin/products"
      >
        Products
      </NavLink>
    </SideNav>
  );
}

export default SideBar;

const SideNav = styled.div`
  border-right: 1px solid grey;
  height: calc(100vh - 70px);
  position: fixed;
  overflow-y: auto;
  width: 200px;
  display: flex;
  flex-direction: column;
  padding: 2rem;

  h3 {
    margin: 0 0 1rem 0;
    padding: 0;
    text-transform: uppercase;
    font-size: 17px;
  }

  a {
    text-decoration: none;
    margin-bottom: 1rem;
    font-size: 14px;
  }
`;