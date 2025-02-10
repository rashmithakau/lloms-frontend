import React from "react";

import FillButton from "../buttons/FillButton";
import BorderButton from "../buttons/BorderButton";
import IconNavButton from "../buttons/IconNavButton";

function ReturnAction() {
  return (
    <div>
      <div className=" flex justify-center gap-8 my-10">
        <FillButton>Return</FillButton>
        <BorderButton>Cancel</BorderButton>
      </div>
      <IconNavButton icon={"src/assets/icons/historyIcon.svg"}>
        Return History
      </IconNavButton>
    </div>
  );
}

export default ReturnAction;
