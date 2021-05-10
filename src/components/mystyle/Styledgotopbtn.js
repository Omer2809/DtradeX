import { Link } from "react-scroll";
import styled from "styled-components";
import { devices } from "./MediaQueries";

export  const GoTop = styled(Link)`
  position: fixed;
  width: 50px;
  height: 70px;
  background: transparent;
  bottom: 40px;
  right: 50px;
  cursor: pointer;

  text-decoration: none;
  text-align: center;
  line-height: 70px;
  /* color: #663399; */
  color: #147;
  font-size: 22px;
  transition: transform 80ms ease-in;
  font-weight: bold;
  z-index: 9000;

  @media ${devices.mobile} {
    font-weight: none;
    height: 50px;
    bottom: 30px;
    right: 12px;
    .fa-2x {
      font-size: 1.7em;
    }
  }

  &:hover {
    opacity: 0.95;
    color: #147;
  }

  &:active {
    transform: scale(0.95);
  }

  &:focus {
    outline: none;
  }
`;


