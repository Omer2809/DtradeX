import styled, { css } from "styled-components";
// import { devices } from "./MediaQueries";
import { Link } from "react-router-dom";

export const Container = styled.div`
  margin: auto;
  max-width: 850px;
  padding: 20px;
  padding-top: 100px;
  @media (max-width: 880px) {
    /* margin: 20px auto 35px; */
  }
`;

export const FormWrap = styled.div`
  background: #fff;
  max-width: 800px;
  padding: 30px;
  color: #333;
  border-radius: 7px;
  border-bottom: 4px solid #132c20;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);

  .sign--form h1,
  .sign--form p {
    text-align: center;
  }
  .sign--form h1 {
    margin-top: 0;
    margin: 0;
  }
  .sign--form {
    margin-left: 1rem;
  }

  img {
    justify-self: center;
    margin-top: 5rem;
  }

  /* .sign__image {
    order: -1;
  } */
`;

export const Button = styled.button`
  display: block;
  color: #fff;
  background-color: #132c20;
  border: 1px solid #132c20;
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
      color: #132c20;
      &:hover {
        text-decoration: none;
        color: #ff0000;
      }
    `}
  &:hover {
    text-decoration: none;
  }
`;

export const HeaderLink = styled(Link)`
  text-decoration: none;
  color: #060b26;
  font-family: "Staatliches", cursive;
  &:hover {
    color: #060b26;
    text-decoration: none;
    opacity: 0.85;
  }
`;

// export const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   margin-top: 10px;
//   min-height: 100vh;
//   width: 100%;
//   z-index: 10;
//   position: absolute;
// `;
