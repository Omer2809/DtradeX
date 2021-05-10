import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

export const Button = styled.button`
  display: block;
  color: #fff;
  background-color: #663399;
  border: 1px solid #663399;
  border-radius: 20px;
  padding: 12px 45px;
  margin: 15px auto;
  font-size: 12px;
  font-weight: bold;
  letter-spacing: 1px;
  cursor: pointer;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  text-align: center;

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

  ${(props) =>
    props.secondary &&
    css`
      padding: 12px 24px;
      /* float:left; */
    `}

  ${(props) =>
    props.toggle &&
    css`
      margin: 15px 0px;
      box-shadow: 0px 15px 10px -15px #111;
    `}
`;

export const BottomText = styled.div`
  font-size: 13px;
  margin-top: 20px;
  text-align: center;
`;

export const FormFooter = styled.div`
  text-align: center;
  margin-top: 10px;
  color: #555;
`;

export const FooterLink = styled(Link)`
  text-decoration: none;
  ${(props) =>
    props.primary &&
    css`
      color: #663399;
      &:hover {
        text-decoration: none;
        color: #ff0000;
      }
    `}
  &:hover {
    text-decoration: none;
  }
`;

export const ButtonFavorite = styled(Button)`
  padding: 12px;
`;
