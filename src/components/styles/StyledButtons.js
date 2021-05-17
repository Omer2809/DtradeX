import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
// import { devices } from "./MediaQueries";

export const Button = styled.button`
  padding: 10px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  border: 1px solid #132c20;
  font-size: 16px;

  ${(props) =>
    props.primary &&
    css`
      background-color: #132c20;
      color: white;
    `};
`;

export const NavItemButton = styled(Link)`
  text-decoration: none;
  cursor: pointer;
  color: #fff;
  background-color: #116530;
  padding: 5px 15px;
  font-weight: bold;
  border-radius: 12px;
  margin: 10px 0px 0px 10px;
  border: 2px solid #132c20;
  letter-spacing: 0.5px;
  text-align: center;
  transition: transform 80ms ease-in;
  transition: all 0.3s ease-in;

  &:hover {
    text-decoration: none;
    background-color: #132c20;
    border: 2px solid #132c20;
    color: #fff;
    opacity: 0.9;
    transition: all 0.3s ease-in;
    /* box-shadow: 1px 2px 10px rgba(20, 20, 20, 0.15),
      1px 3px 11px rgba(20, 20, 20, 0.1); */
    -webkit-box-shadow: 3px 3px 10px 3px #4ca664;
    -moz-box-shadow: 3px 3px 10px 3px #4ca664;
    box-shadow: 3px 3px 10px 3px #4ca664;
  }

  &:active {
    transform: scale(0.9);
  }

  &:focus {
    outline: none;
  }

  @media (max-width: 600px) {
    margin: 0px 0px 0px 0px;
  }
`;

export const AddNewButton = styled(Link)`
  display: block;
  color: #fff;
  background-color: #1a83ff;
  border: 1px solid #1a83ff;
  border-radius: 5px;
  padding: 4px 10px;
  font-size: 16px;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: transform 80ms ease-in;
  text-align: center;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2), 0 5px 5px rgba(0, 0, 0, 0.2);
  &:hover {
    opacity: 0.95;
    color: #fff;
    text-decoration: none;
  }

  &:active {
    transform: scale(0.95);
  }

  &:focus {
    outline: none;
  }
  @media (max-width: 600px) {
    margin: 8px 0px 8px 0px;
  }
`;

export const FooterButton = styled(Link)`
  display: block;
  color: #fff;
  background-color: #144c20;
  border: 1px solid #144c20;
  border-radius: 5px;
  padding: 4px 10px;
  margin-top: 5px;
  font-size: 16px;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: transform 80ms ease-in;
  text-align: center;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  width: 100px;
  &:hover {
    opacity: 0.95;
    color: #fff;
    text-decoration: none;
  }

  &:active {
    transform: scale(0.95);
  }

  &:focus {
    outline: none;
  }
`;
