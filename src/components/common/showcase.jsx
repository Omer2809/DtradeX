import React from "react";
import "../styles/showcase.css";
import headerImage from "../images/0007.png";

const Showcase = () => {
  return (
    <div className="showcase-content">
    <img src={headerImage} className="logo" alt="background" style={{width:180,height:180}}/>
      <h1 className="gym-name"><span className="primarySpan">Fitness </span> dominator</h1>
      <p className="quote">
      it's more than just a gym ...
      </p>
    </div>
  );
};

export default Showcase;
