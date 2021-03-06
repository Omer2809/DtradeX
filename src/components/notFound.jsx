import React from "react";
import "./styledComponents/notFound.css";

const NotFound = () => {
  return (
    <div className="notFound">
      <h1 className="erro">404</h1>
      <h3 className="below">OPPS! PAGE NOT FOUND</h3>
      <button className="btn btn-block btn-outline" primary="true" to="/" style={{ zIndex: 25 }}>
        Back To Home
      </button>
    </div>
  );
};

export default NotFound;
