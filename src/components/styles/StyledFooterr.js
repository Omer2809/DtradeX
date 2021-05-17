import styled from "styled-components";
import { Link } from "react-router-dom";
export const StyledFooter = styled.div`
  margin: 0 auto;
  margin-top: 10px;
  line-height: 1.5;
  background: #fff;
  color: #333;
  border-top: 2px solid #132c20;
  align-items: center;
  padding: 2rem;
  .disclaimer {
    font-size: 12px;
  }

  ul {
    list-style: none;
  }

  p {
    margin: 0.5rem 0;
  }

  img {
    /* width: 100%; */
    margin-bottom: 10px;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: "Staatliches", cursive;
    margin-bottom: 0.55rem;
    line-height: 1.3;
  }
  .btn {
    display: inline-block;
    border: none;
    background: #333;
    color: #fff;
    padding: 0.5rem 1.5rem;
  }

  .btn-light {
    background: #f3f3f3;
  }
  .btn-primary {
    background: #c72727;
  }
  .btn-secondary {
    background: #f99500;
  }

  .btn-block {
    display: block;
    width: 100%;
    text-align: center;
  }

  .btn:hover {
    opacity: 0.9;
  }

  .l-heading {
    font-size: 2.5rem;
  }

  .list li {
    padding: 0.5rem 0;
    border-bottom: #555 dotted 1px;
    max-width: 100%;
  }

  .footer-container {
    max-width: 1400px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 1rem;
  }

  .share img {
    max-width: 160px;
  }

  /* @media (min-width: 600px) {
     .footer-container{
      grid-template-columns: repeat(2, 1fr);
    }
  } */

  .footer-container > *:last-child {
    background: #444;
    grid-column: 1 / span 4;
    padding: 0.5rem;
    text-align: center;
    font-size: 0.7rem;
  }

  @media (max-width: 950px) {
    .share img {
      max-width: 120px;
    }
  }
  @media (max-width: 800px) {
    .share img {
      max-width: 80px;
    }
  }
  @media (max-width: 600px) {
    .footer-container {
      grid-template-columns: 1fr;
    }

    .footer-container > *:last-child {
      grid-column: 1;
    }

    .footer-container > *:first-child,
    .footer-container > *:nth-child(2) {
      border-bottom: #444 dotted 1px;
      padding-bottom: 0.8rem;
    }

    .share img {
      max-width: 120px;
    }

    .page-container {
      grid-template-columns: 1fr;
      text-align: center;
    }

    .page-container > *:first-child {
      grid-row: 1;
    }

    .l-heading {
      font-size: 1.5rem;
    }
  }
  .socialLog {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    .wrapper {
      display: flex;
      align-items: center;
      /* justify-content: flex-start; */
    }
  }
`;
export const FooterLink = styled(Link)`
  /* color: #fff; */
  color: #333;
  text-decoration: none;

  &:hover {
    /* color: #ff00ff !important; */
    color: #132c20 !important;
    text-decoration: none;
  }
`;
export const SocialLink = styled(Link)`
  /* color: #fff; */
  color: #333;
  text-decoration: none;
  width: 45px;
  height: 41px;
  padding-top: 5px;
  text-align: center;
  display: inline-block;
  font-size: 1.3em;
  justify-content: flex-start;

  &:hover {
    /* background: #ff00ff; */
    background: #4ca664;
    border-radius: 50%;
    text-decoration: none;
    color: #fff;
  }
  @media (max-width: 870px) {
    width: 30px;
  }
  @media (max-width: 600px) {
    width: 45px;
  }
`;
