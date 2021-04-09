import React from "react";
import { NavItemButton } from "./styles/styledButtons";
import "./styles/notFound.css";

const NotFound = () => {
  return (
    <div className="notFound">
      <h1 className="erro">404</h1>
      <h3 className="below">OPPS! PAGE NOT FOUND</h3>
      <NavItemButton primary="true" to="/" style={{zIndex:25}}>
        Back To Home
      </NavItemButton>
    </div>
  );
};

export default NotFound;
