import React, { useState } from "react";

import FillButton from "../buttons/FillButton";
import BorderButton from "../buttons/BorderButton";
import IconNavButton from "../buttons/IconNavButton";
import ReturnHistoryPopup from "../ReturnHistoryPopup/ReturnHistoryPopup";
import PlaceReturnOrderPopup from "../PlaceReturnOrderPopup/PlaceReturnOrderPopup";
import ReturnHistoryPopupForOutlet from "../ReturnHistoryPopupForOutlet/ReturnHistoryPopupForOutlet";

function ReturnAction({ onClear }) {
  const [showModal, setShowModal] = useState(false);
  const [showReturnPopup, setShowReturnPopup] = useState(false);

  return (
    <div>
      <div className="flex justify-center gap-8 my-10">
        <FillButton onClick={() => setShowReturnPopup(true)}>Return</FillButton>
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
          <PlaceReturnOrderPopup onClose={() => setShowReturnPopup(false)} />
        )}
      </div>
    </div>
  );
}

export default ReturnAction;
