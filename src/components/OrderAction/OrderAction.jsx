import React from "react";
import IconNavButton from "../buttons/IconNavButton";
import FillButton from "../buttons/FillButton";
import BorderButton from "../buttons/BorderButton";

function OrderAction() {
  return (
    <div>
      <div className=" flex justify-center gap-8 my-10">
        <FillButton>Place Order</FillButton>
        <BorderButton>Cancel</BorderButton>
      </div>
      <IconNavButton icon={"src/assets/icons/historyIcon.svg"}>
        Factory Order History
      </IconNavButton>
    </div>
  );
}

export default OrderAction;
