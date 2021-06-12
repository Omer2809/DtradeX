import React from "react";
import sprite from "../images/sprite.svg";

const Icon = ({ name, ...rest }) => (
  <svg {...rest}>
    <use href={sprite + name}></use>
  </svg>
);

export default Icon;
