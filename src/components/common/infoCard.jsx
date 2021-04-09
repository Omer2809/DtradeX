import React from "react";
import * as FaIcons from "react-icons/fa";
import { Link } from "react-router-dom";
import "../styles/infoCard.css";

const InfoCard = ({ name, count, newUrl, infoUrl, bg1, bg2, info }) => {
  return (
    <div className="dash" style={{ background: `${bg1}` }}>
      <div className="dash-upper">
        <div className="right">
          <h3 className="count">{count}</h3>
          <p className="content">{name}</p>
        </div>
        {newUrl ? (
          <Link to={newUrl} className="innfo">
            <FaIcons.FaUserPlus className="dash-icon" />
          </Link>
        ) : (
          <Link to={infoUrl} className="innfo">
            <FaIcons.FaUserSlash className="dash-icon inactive" />
          </Link>
        )}
      </div>
      <div className="dash-bottom" style={{ background: `${bg2}` }}>
        <Link to={infoUrl} className="innfo">
          More Info <FaIcons.FaArrowCircleRight />
        </Link>
      </div>
    </div>
  );
};

export default InfoCard;
