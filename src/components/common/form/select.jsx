import React from "react";
import { FormGroup } from "../../styledComponents/InputStyling";

const Select = ({ name, label, options, error, ...rest }) => {
  return (
    <FormGroup>
      <label htmlFor={name}>{label}</label>
      <select name={name} id={name} {...rest} className="form-control">
        <option value="" />
        {options.map((option) => (
          <option key={option._id} value={option._id}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </FormGroup>
  );
};

export default Select;
