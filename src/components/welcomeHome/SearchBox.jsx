import React, { useState } from "react";
import Icon from "../icon";

const SearchBox = ({ value, onChange, placeholder, options, select }) => {
  const [selectedId, setSelectedId] = useState("");

  const getClasses = (id) => {
    return selectedId === id ? "badge badge--secondary" : "";
  };

  const handleClick = (id) => {
    const value = selectedId === id ? "" : id;
    setSelectedId(value);
    select(value);
  };

  return (
    <section dataAos="zoom-in-up" className="block container block-domain">
      <header className="block__header">
        {/* <!-- <h2>Each purchase will be made with pleasure!</h2> --> */}
        <h2>Purchase made easy!</h2>
        <p>
          We work with global brands and provide the best collections for you to
          do your shopping.
        </p>
      </header>
      <div className="search-input-group">
        <input
          aria-label="Product"
          type="text"
          className="search-input"
          placeholder={placeholder || "Enter product name here...."}
          value={value}
          onChange={(e) => onChange(e.currentTarget.value)}
        />
        <button className="btn btn--accent">
          <Icon name="#search" className="icon icon--white" />
          Search
        </button>
      </div>
      <ul className="list block-domain__prices">
        {options.map((option) => {
          return (
            <li
              key={option._id}
              className="badge-category"
              onClick={() => handleClick(option._id)}
            >
              <span className={getClasses(option._id)}>{option.label}</span>
            </li>
          );
        })}

        {/* <li>
          <span className="badge badge--secondary">furniture</span>
        </li>
        <li>clothing</li>
        <li>books</li>
        <li>cars</li>
        <li>music</li>
        <li>clothing</li>
        <li>Movies & Music</li>
        <li>cars</li>
        <li>music</li>
        <li>others</li> */}
      </ul>
    </section>
  );
};

export default SearchBox;
