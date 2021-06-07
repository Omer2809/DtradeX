import React from "react";

const Filter = ({ options, onChangeId }) => (
  <>
    <select
      id="select-filter"
      className="form-control"
      onChange={(e) => onChangeId(e.target.value)}
    >
      <option value="">Select Category</option>
      {options.map((option) => (
        <option key={option._id} value={option._id}>
          {option.label}
        </option>
      ))}
    </select>
  </>
);

export default Filter;
