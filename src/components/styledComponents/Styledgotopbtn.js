import { Link } from "react-scroll";
import styled from "styled-components";
import { devices } from "./MediaQueries";

export const GoTop = styled(Link)`
  position: fixed;
  bottom: 40px;
  right: 50px;
  cursor: pointer;
  z-index: 9000;

  @media ${devices.mobile} {
    bottom: 30px;
    right: 12px;
  }
`;
