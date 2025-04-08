import React, { useState, useEffect } from "react";
import FillButton from "../buttons/FillButton";
import BorderButton from "../buttons/BorderButton";
import IconNavButton from "../buttons/IconNavButton";
import ReturnHistoryPopupForOutlet from "../ReturnHistoryPopupForOutlet/ReturnHistoryPopupForOutlet";
import PlaceReturnOrderPopup from "../PlaceReturnOrderPopup/PlaceReturnOrderPopup";

function ReturnAction({ onClear, products }) {
  const [showModal, setShowModal] = useState(false);
  const [showReturnPopup, setShowReturnPopup] = useState(false);
  const [returnEnabled, setReturnEnabled] = useState(false);

  useEffect(() => {
    setReturnEnabled(products.length > 0);
  }, [products]);

  return (
    <div>
      <div className="flex justify-center gap-8 my-10">
        <FillButton
          onClick={() => setShowReturnPopup(true)}
          disabled={!returnEnabled}
        >
          Return
        </FillButton>

        <BorderButton onClick={onClear}>Cancel</BorderButton>
      </div>

      <div>
        <IconNavButton
          icon={"src/assets/icons/historyIcon.svg"}
          onClick={() => setShowModal(true)}
        >
          Return History
        </IconNavButton>

        {showModal && (
          <ReturnHistoryPopupForOutlet onClose={() => setShowModal(false)} />
        )}

        {showReturnPopup && (
          <PlaceReturnOrderPopup
            onClose={() => setShowReturnPopup(false)}
            products={products}
            outletId={1} // Pass correct outlet ID here
          />
        )}
      </div>
    </div>
  );
}

export default ReturnAction;
