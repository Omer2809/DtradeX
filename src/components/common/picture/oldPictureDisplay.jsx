import React from "react";

import "../../welcomeHome/style.css";
import Icon from "../../icon";
const OldPictureDisplay = ({ image, onDelete }) => {
  return (
    <div className="picture-card">
      <img
        src={image.url || image}
        style={{
          width: 100,
          height: 100,
          marginRight: 3,
          border: "2px solid #132c20",
        }}
        alt="product"
      />
      <div className="picture-overlay">
        <button
          type="button"
          className="overlay__icon delete-btn"
          title="delete Image"
          onClick={() => onDelete(image)}
        >
          <Icon className="icon--small delete--icon" name="#delete" />
        </button>
      </div>
    </div>
  );
};

export default OldPictureDisplay;
