import React from "react";
import Icon from "./icon";
import "./styledComponents/notFound.css";

const FallBack = () => {
  return (
    <div className="notFound">
      <Icon name="#logo-red" className="icon" />
      <h3 className="below">Loading Please wait!</h3>
      <button
        className="btn btn-block btn-outline"
        primary="true"
        to="/"
        style={{ zIndex: 25 }}
      >
        Back To Home 
      </button>
    </div>
  );
};

export default FallBack;
