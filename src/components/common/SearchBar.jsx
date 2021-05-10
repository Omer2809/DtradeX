import React, { useState, useRef } from "react";
import FontAwesome from "react-fontawesome";

import {
  StyledSearchBar,
  StyledSearchBarContent,
} from "../mystyle/StyledSearchBar";

const SearchBar = ({ callback }) => {
  const [state, setState] = useState("");
  const timeOut = useRef(null);

  const doSearch = (event) => {
    const { value } = event.target;

    clearTimeout(timeOut.current);
    setState(value);

    timeOut.current = setTimeout(() => {
      callback(value);
    }, 500);
  };

  return (
    <StyledSearchBar>
      <div className="GlobalContainer">
        <StyledSearchBarContent>
          <FontAwesome className="fa-search" name="search" />
          <input
            type="text"
            placeholder="Search Product"
            onChange={doSearch}
            value={state}
          />
        </StyledSearchBarContent>
      </div>
    </StyledSearchBar>
  );
};

export default SearchBar;
