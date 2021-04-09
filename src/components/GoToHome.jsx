import React from "react";
import {FaHome} from "react-icons/fa";
import GoHome from "./styles/Styledgotopbtn";

const GoToHome = () => {
  return (
    <GoHome to="/">
      <FaHome style={styles} />
    </GoHome>
  );
};

const styles = {
  background: "#1a83ff",
  borderRadius: "50%",
  padding: 6,
  width: 35,
  height: 35,
};

export default GoToHome;
