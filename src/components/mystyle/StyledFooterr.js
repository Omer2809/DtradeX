import styled from "styled-components";
import { Link } from "react-router-dom";
export const StyledFooter = styled.div`
  margin-top: 10px;
  line-height: 1.5;
  background: #fff;
  color: #333;
  border-top: 2px solid #132c20;
  /* background: #333;
  color: #fff; */

  padding: 2rem 1rem 2rem 2rem;
  /* position: absolute; */
  /* bottom: 0; */
  width: 100%;

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
    width: 100%;
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

  img {
    width: 160px;
  }

  .l-heading {
    font-size: 2.5rem;
  }

  .list li {
    padding: 0.5rem 0;
    border-bottom: #555 dotted 1px;
    width: 90%;
  }

  .footer-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 1.5rem;
  }

  .footer-container > *:last-child {
    background: #444;
    grid-column: 1 / span 4;
    padding: 0.5rem;
    text-align: center;
    font-size: 0.7rem;
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
    color: #147 !important;
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
    background: #147;
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
