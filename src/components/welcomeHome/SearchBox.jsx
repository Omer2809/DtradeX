import React, { useState, useRef } from "react";
import FontAwesome from "react-fontawesome";

import {
  StyledSearchBar,
  StyledSearchBarContent,
} from "../styles/StyledSearchBar";

const SearchBox = ({ value, onChange ,placeholder}) => {


  return (
    <StyledSearchBar>
      <div className="GlobalContainer">
        <StyledSearchBarContent>
          <FontAwesome className="fa-search" name="search" />
          <input
            type="text"
            name="query"
            placeholder={placeholder || "Search..."} 
            value={value}
            onChange={e => onChange(e.currentTarget.value)}
          />
        </StyledSearchBarContent>
      </div>
    </StyledSearchBar>
  );
};

export default SearchBox;
