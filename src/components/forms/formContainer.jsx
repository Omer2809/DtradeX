import React from "react";
import { HeaderLink } from "../styles/FormStyling";
// import { HeaderLink } from "../../mystyle/styledFormComponents";

const FormContainer = ({ name, url, member, children }) => {
  let classes = "row ";
  let margin = {};

  if (member) {
    classes += "p-1 pt-md-3 pl-md-5 pb-md-5 pr-md-5  m-3  bg-light shadow rounded";
  } else {
    classes += " pt-4 pl-3 pr-3 pb-3 ml-3 mr-3 mb-2  bg-light shadow rounded";
    margin = { marginTop: 80,  borderRadius:10, };
  }

  return (
    <div style={styles}>
      <div className={classes} style={margin}>
        <div className="col ZIndex">
          <h3
            className="ml-2"
            style={{
              color: "#060b26",
              fontWeight: "600",
              marginBottom: 20,
              textTransform: "uppercase",
            }}
          >
            {" "}
            <HeaderLink to={url}> {name}s form</HeaderLink>
          </h3>
          {children}
        </div>
      </div>
    </div>
  );
};

const styles = {
  margin: "auto",
  maxWidth: 800,
  color: "#333",
  overflow: "hidden",
  height: "100%",
  borderRadius:10,
  paddingTop:70
};

export default FormContainer;
