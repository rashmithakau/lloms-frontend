import React, {useState} from "react";

import FillButton from "../buttons/FillButton";
import BorderButton from "../buttons/BorderButton";
import IconNavButton from "../buttons/IconNavButton";
import ReturnHistory from "../Popup/HistoryPopup/ReturnHistory.jsx";

function ReturnAction() {

    const [showModal, setShowModal] = useState(false);

    return (
    <div>
      <div className=" flex justify-center gap-8 my-10">
        <FillButton>Return</FillButton>
        <BorderButton>Cancel</BorderButton>
      </div>
        <div>
            <IconNavButton
                icon={"src/assets/icons/historyIcon.svg"}
                onClick={() => setShowModal(true)}
            >
                Return History
            </IconNavButton>

            {showModal && (
                <ReturnHistory
                    show={showModal}
                    onClose={() => setShowModal(false)}
                />
            )}
        </div>

    </div>
  );
}

export default ReturnAction;
