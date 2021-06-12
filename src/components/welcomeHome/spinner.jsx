import React from "react";

import { StyledSpinner, StyledText } from "../styledComponents/StyledSpinner";

const Spinner = ({ form, saving,log }) => (
  <>
    <StyledSpinner primary={form} save={saving} />
    {saving && (
      <StyledText primary={form} >
        {log ? "Authenticating User ..." : "Saving ..."}
      </StyledText>
    )}
  </>
);

export default Spinner;
