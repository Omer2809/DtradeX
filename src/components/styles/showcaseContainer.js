import styled from "styled-components";
import headerImage from "../images/unsplash3.jpg";

export const ShowcaseContainer = styled.div`
  color: #fff;
  background: #060b26;
  position: relative;
  min-height: 100vh;
  
  img {
    width: 100%;
    height: 100%;
  }

  &:before {
    content: "";
    position: absolute;
    background: url(${({ primary }) => (primary ? `${headerImage}` : `${ headerImage }`)}) no-repeat center center/cover;
    
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.4;
  }
  @media screen and (max-width: 1180px) {
    min-height: 110vh;
  }

  @media screen and (max-width: 880px) {
    min-height: 130vh;
  }
  
`;
