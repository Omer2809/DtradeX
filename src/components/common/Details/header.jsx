import React from "react";
import { FaPlus } from "react-icons/fa";
import { AddNewButton } from "../../styles/styledButtons";
import "../../styles/styledTable.css";

const Header = ({ name, totalCount, url, noAddButton }) => {
  return (
    <>
      {" "}
      <h3
        className="ml-2"
        style={{
          color: "#060b26",
          fontWeight: "600",
          textTransform: "uppercase",
        }}
      >
        {name}s
      </h3>
      <div className="leadsBelowHeading">
        <p>
          {totalCount === 0
            ? `There are no ${name}s in your DB`
            : `Showing ${totalCount} ${name}s in your Database.`}
        </p>
        {!noAddButton && (
          <AddNewButton style={{ marginRight: 45 }} to={url}>
            <FaPlus style={{ marginBottom:2}}/>  New{" "}
            {name}
          </AddNewButton>
        )}
      </div>
    </>
  );
};

export default Header;
