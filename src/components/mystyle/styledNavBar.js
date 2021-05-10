import styled from "styled-components";
import { Link } from "react-router-dom";

export const NavItems = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  padding: 10px;
`;

export const NavItemButton = styled(Link)`
  text-decoration: none;
  cursor: pointer;
  color: #fff;
  background-color:#5035ff;
  padding: 5px 15px;
  font-weight: bold;
  border-radius: 10px;
  margin: 10px 0px 0px 10px;
  border: 2px solid #1a83ff;
  letter-spacing: 0.5px;
  text-align: center;
  transition: transform 80ms ease-in;
  transition: all 0.3s ease-in;
  box-shadow: 1px 2px 10px rgba(230, 230, 230, 0.15),
    1px 3px 11px rgba(230, 230, 230, 0.1);

  &:hover {
    text-decoration: none;
    background-color: #5035ff;
    border: 2px solid#5035ff;
    color: #fff;
    opacity: 0.9;
    transition: all 0.3s ease-in;
  }

  &:active {
    transform: scale(0.95);
  }

  &:focus {
    outline: none;
  }
`;

