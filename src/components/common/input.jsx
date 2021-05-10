import React from "react";
import { FormGroup, StyledInput } from "./../mystyle/InputStyling";

const Input = ({ name, label, error, ...rest }) => {
  return (
    <FormGroup>
      <label htmlFor={name}>{label}</label>
      <StyledInput {...rest} name={name} id={name} />
      {error && <div className="alert alert-danger">{error}</div>}
    </FormGroup>
  );
};

export default Input;
