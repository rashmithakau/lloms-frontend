import React, { useState } from "react";
import FillButton from "../buttons/FillButton";
import BorderButton from "../buttons/BorderButton";
import IconNavButton from "../buttons/IconNavButton";
import ReturnHistory from "../Popup/HistoryPopup/ReturnHistory.jsx";
import Swal from "sweetalert2";
import { saveReturn } from "../../api/outlet_service/returnController";
import Allert from "../Allert/Allert";
import LoadingPopup from "../Popup/LoadingPopup/LoadingPopup";

function ReturnAction({ onClear, products }) {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleReturn = () => {
    // Check if there are any products to return
    if (!products || products.length === 0) {
      Swal.fire({
        title: "Error!",
        text: "Please add items to return",
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#ff69b4",
      });
      return;
    }

    // Show confirmation dialog
    Swal.fire({
      title: "Are you sure you want to return?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#ff69b4",
    }).then((result) => {
      if (result.isConfirmed) {
        processReturn();
      }
    });
  };

  const processReturn = async () => {
    try {
      setLoading(true);
      
      // Prepare the return request
      const returnItems = products.map((item) => ({
        productId: item.id,
        quantity: item.quantity || 1, // Default to 1 if quantity not specified
      }));

      const returnRequest = {
        returnDate: new Date().toISOString(),
        status: "Pending",
        outletId: 1, // You might want to get this from a context or props
        items: returnItems,
      };

      // Call API to process the return
      await saveReturn(returnRequest);

      // Show success message
      Swal.fire({
        title: "Success!",
        text: "Return request sent successfully",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#ff69b4",
      });

      // Clear return items
      onClear();
    } catch (error) {
      console.error("Error processing return:", error);
      
      // Show error message
      Swal.fire({
        title: "Error!",
        text: "Failed to process return",
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#ff69b4",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-center gap-8 my-10">
        <FillButton onClick={handleReturn}>Return</FillButton>
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
          <ReturnHistory
            show={showModal}
            onClose={() => setShowModal(false)}
          />
        )}
      </div>
      {loading && <LoadingPopup />}
    </div>
  );
}

export default ReturnAction;