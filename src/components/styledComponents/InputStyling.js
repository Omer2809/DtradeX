import styled from "styled-components";

export const FormGroup = styled.div`
  /* margin-top: 5px; */

  label {
    display: block;
    color: #444;
    padding-top: 1rem;
  }
  .alert {
    color: red;
    font-size: 15px;
    margin-top: 5px;
  }
  select {
    padding: 0.7rem;
  }

  .form-control {
    font-size: 1.5rem;
  }
`;

export const StyledInput = styled.input`
  width: 100%;
  background-color: #eee;
  border: 1px solid #cfd8dc;
  border-radius: 3px;
  padding: 1rem 1.5rem;
  margin-bottom: 2px;
  font-weight: 300;
  font-size: 14px;
`;
export const StyledTextArea = styled.textarea`
  width: 100%;
  background-color: #eee;
  border: 1px solid #cfd8dc;
  border-radius: 3px;
  padding: 8.85px 13px;
  margin-bottom: 2px;
  font-weight: 300;
  font-size: 14px;
`;
