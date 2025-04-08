import React, { useState } from "react";
import Swal from "sweetalert2";
import LoadingPopup from "../Popup/LoadingPopup/LoadingPopup";
import { saveReturn } from "../../api/outlet_service/returnController" // adjust path if needed

const PlaceReturnOrderPopup = ({ onClose, products, outletId }) => {
  const [orderLoading, setOrderLoading] = useState(false);
  const [returnReasons, setReturnReasons] = useState({});

  const [orderItems] = useState(
    products.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      reason: ""
    }))
  );

  console.log("Order Items:", orderItems);

  const handleReturnReasonChange = (itemId, reason) => {
    setReturnReasons((prevReasons) => ({
      ...prevReasons,
      [itemId]: reason,
    }));
  };

  const handleSubmitReturnOrder = async () => {
    const incompleteItems = orderItems.filter(
      (item) => !returnReasons[item.id]
    );

    if (incompleteItems.length > 0) {
      Swal.fire({
        icon: "error",
        title: "Return Reason Required",
        text: "Please provide a reason for all the selected items.",
      });
      return;
    }

    console.log("Order items"+orderItems);

    const returnItems = orderItems.map((item) => ({
      productId: item.id,
        productName: item.name,
        unitPrice: item.price,
      quantity: 1, // default quantity (can be dynamic if needed)
      reason: returnReasons[item.id],
    }));

    const payload = {
      returnId: 0,
      returnDate: new Date(),
      outletId: outletId, // use actual outlet ID from props
      outletReturnStatus: "Pending",
      returnItems,
    };

    setOrderLoading(true);
    try {
        console.log("Payload:", payload);
      await saveReturn(payload);
      setOrderLoading(false);
      Swal.fire({
        icon: "success",
        title: "Return Order Submitted",
        text: "Return order has been submitted successfully.",
      });
      onClose();
    } catch (error) {
      setOrderLoading(false);
      Swal.fire({
        icon: "error",
        title: "Error Submitting Return",
        text: error.message || "Something went wrong.",
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md">
      <div className="bg-white p-6 rounded-3xl max-h-[90vh] w-[90%] md:w-[60%] shadow-2xl relative border border-gray-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl font-bold"
        >
          ×
        </button>

        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Place Return Order
        </h2>

        {/* Table for displaying items and return reason */}
        <div className="mb-4 overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Item Name</th>
                <th className="px-4 py-2 text-left">Return Reason</th>
              </tr>
            </thead>
            <tbody>
              {orderItems.map((item) => (
                <tr key={item.id}>
                  <td className="px-4 py-2">{item.name}</td>
                  <td className="px-4 py-2">
                    <textarea
                      value={returnReasons[item.id] || ""}
                      onChange={(e) =>
                        handleReturnReasonChange(item.id, e.target.value)
                      }
                      rows="2"
                      placeholder="Enter the reason for return"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                    ></textarea>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Submit Button */}
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleSubmitReturnOrder}
            className="bg-pink-500 text-white px-6 py-2 rounded-full shadow hover:scale-105 transition-all duration-200"
          >
            Submit Return Order
          </button>
        </div>

        {orderLoading && <LoadingPopup txt="Processing Return Order..." />}
      </div>
    </div>
  );
};

export default PlaceReturnOrderPopup;
