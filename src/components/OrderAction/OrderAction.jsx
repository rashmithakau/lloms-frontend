import React, { useState } from "react";
import IconNavButton from "../buttons/IconNavButton";
import FillButton from "../buttons/FillButton";
import BorderButton from "../buttons/BorderButton";
import OrderHistory from "../Popup/HistoryPopup/FactoryOrderHistoryPage.jsx";


function OrderAction({ onClear }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      {/* Action Buttons */}
      <div className="flex justify-center gap-8 my-10">
        <FillButton>Place Order</FillButton>
        <BorderButton>Cancel</BorderButton>
      </div>

      {/* History Button */}
      <div>
        <IconNavButton
          icon={"src/assets/icons/historyIcon.svg"}
          onClick={() => setShowModal(true)}
        >
          Factory Order History
        </IconNavButton>
      </div>

      {/* Modal for Order History */}
      {showModal && (
        <OrderHistory
          show={showModal}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

export default OrderAction;
