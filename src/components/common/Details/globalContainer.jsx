import React from "react";

const GlobalContainer = ({ children }) => {
  return (
    <div style={styles}>
      <div
        className="row  
        pt-4 pl-3 pr-3 pb-3
        ml-3 mr-3 mb-2 
        bg-light shadow rounded"
        style={{ marginTop: 80 }}
      >
        {children}
      </div>
    </div>
  );
};

const styles = {
  maxWidth: "1180px",
  margin: "auto",
  overflow: "hidden",
  height: "100%",
};

export default GlobalContainer;
