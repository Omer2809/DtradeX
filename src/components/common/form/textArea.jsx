import React from "react";
import { FormGroup, StyledTextArea } from "../../styledComponents/InputStyling";

const TextArea = ({ name, label, error, ...rest }) => {
  return (
    <FormGroup>
      <label htmlFor={name}>{label}</label>
      <StyledTextArea {...rest} name={name} id={name} rows="4" />
      {error && <div className="alert alert-danger">{error}</div>}
    </FormGroup>
  );
};

export default TextArea;
