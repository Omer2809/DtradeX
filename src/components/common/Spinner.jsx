import React from "react";

import { StyledSpinner,StyledText } from "../styles/StyledSpinner";

const Spinner = ({ form, saving ,reg,log}) => (
  <>
    <StyledSpinner primary={form} save={saving}/>
    {saving && <StyledText primary={form} secondary={reg} >{log?"Authenticating User ...":"Saving ..."}</StyledText>}
  </>
);

export default Spinner;
