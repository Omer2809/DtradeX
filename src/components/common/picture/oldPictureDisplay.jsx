import React from "react";

import "../../welcomeHome/style.css";
import FA from "react-fontawesome";

const OldPictureDisplay = ({ image, onDelete }) => {
  return (
    <div className="card-container">
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
      <div className="overlay">
        <button
          type="button"
          className="delete-btn"
          title="delete Image"
          onClick={() => onDelete(image)}
        >
          <FA className="delete" name="trash" />
        </button>
      </div>
    </div>
  );
};

export default OldPictureDisplay;
