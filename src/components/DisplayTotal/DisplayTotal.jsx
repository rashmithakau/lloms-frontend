import React, { useState } from "react";
import FillButton from "../buttons/FillButton";
import BorderButton from "../buttons/BorderButton";
import IconNavButton from "../buttons/IconNavButton";
import CusDetailsPopup from "../Popup/CusDetailsPopup/CusDetailsPopup";
import CustomerOrderHistory from "../Popup/HistoryPopup/CustomerOrderHistory.jsx";

const DisplayTotal = ({ totals, onClear ,onSubmit}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const total = totals?.total || 0;
  const discount = totals?.discount || 0;
  const subtotal = totals?.subtotal || 0;


  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };


  const handleSubmitDetails = (cusName,cusPho) => {
    setIsPopupOpen(false); // Close the popup after submitting
    onSubmit(cusName,cusPho);
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-2 px-4 py-1">
        <p className="text-[17px]">Total</p>
        <div className="box-border bg-pink-100 px-2 py-1 border rounded-lg border-gray-400 text-sm sm:text-base">
          Rs.{total.toFixed(2)}
        </div>
        <p className="text-[17px]">Discount</p>
        <div className="box-border bg-pink-100 px-2 py-1 border rounded-lg border-gray-400 text-sm sm:text-base">
          Rs.{discount.toFixed(2)}
        </div>
        <p className="text-[17px]">Sub Total</p>
        <div className="box-border bg-pink-100 px-2 py-1 border rounded-lg border-gray-400 text-sm sm:text-base">
          Rs.{subtotal.toFixed(2)}
        </div>
      </div>

      <div className="flex justify-center items-center my-2 gap-8">
        <FillButton onClick={handleOpenPopup}>Proceed {">"}</FillButton> {/* */}
        <BorderButton onClick={onClear}>Cancel</BorderButton>
      </div>

      <div>
        <IconNavButton icon={"src/assets/icons/historyIcon.svg"} onClick={() => setShowModal(true)}>
          Customer Order History
        </IconNavButton>
      </div>

      {showModal && (
        <CustomerOrderHistory show={showModal} onClose={() => setShowModal(false)} />
      )}


      <CusDetailsPopup 
        isOpen={isPopupOpen} 
        onClose={handleClosePopup} 
        onSubmit={handleSubmitDetails} />
    </div>
  );
};

export default DisplayTotal;
