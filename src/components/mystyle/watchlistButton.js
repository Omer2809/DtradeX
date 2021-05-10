import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import { devices } from "./MediaQueries";

export const Button = styled.button`
  display: block;
  color: #fff;
  background-color: #663399;
  border: 1px solid #663399;
  border-radius: 5px;
  padding: 6px 15px;
  margin: 15px auto;
  font-size: 16px;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: transform 80ms ease-in;
  text-align: center;

  &:hover {
    opacity: 0.95;
    color: #fff;
  }

  &:active {
    transform: scale(0.95);
  }

  &:focus {
    outline: none;
  }

  ${(props) =>
    props.secondary &&
    css`
      border: none;
      background: #ff00ff;
      color: #fff;
    `}
  ${(props) =>
    props.infoPage === "yes" &&
    css`
      margin: 0px 0px;
      box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25),
        0 10px 10px rgba(0, 0, 0, 0.22);
    `}
  ${(props) =>
    props.submit === "true" &&
    css`
      margin: 20px 20px;
      box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25),
        0 10px 10px rgba(0, 0, 0, 0.22);
    `}

    @media ${devices.mobile} {
    padding: 7px 10px;
    text-align: center;
  }
`;
export const ButtonInfo = styled.button`
  display: block;
  color: #fff;
  background-color: #663399;
  border: 1px solid #663399;
  border-radius: 5px;
  padding: 6px 15px;
  font-size: 16px;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: transform 80ms ease-in;
  text-align: center;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);

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

export const FooterButton = styled(Link)`
  display: block;
  color: #fff;
  background-color: #ff00ff;
  border: 1px solid #ff00ff;
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
