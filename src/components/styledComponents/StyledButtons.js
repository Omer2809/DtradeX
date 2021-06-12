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


