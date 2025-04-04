import React, { useState } from "react";
import FillButton from "../buttons/FillButton";
import BorderButton from "../buttons/BorderButton";
import IconNavButton from "../buttons/IconNavButton";
import CusDetailsPopup from "../Popup/CusDetailsPopup/CusDetailsPopup";
import CustomerOrderHistory from "../Popup/HistoryPopup/CustomerOrderHistory.jsx";
import { getAllCusOrderByOutlet } from "../../api/outlet_service/cusOrderController.js";

const DisplayTotal = ({ totals, onClear, onSubmit }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false); // Track loading state

  const total = totals?.total || 0;
  const discount = totals?.discount || 0;
  const subtotal = totals?.subtotal || 0;

  const handleOpenPopup = () => setIsPopupOpen(true);
  const handleClosePopup = () => setIsPopupOpen(false);

  const handleSubmitDetails = (cusName, cusPho) => {
    setIsPopupOpen(false);
    onSubmit(cusName, cusPho);
  };

  const handleOpenHistory = async () => {
    setLoading(true);
    setShowModal(true); // Open modal while loading

    try {
      const data = await getAllCusOrderByOutlet(1); // Outlet ID is always 1
      const orderList = data
        .map((item) => ({
          orderId: item.cusOrderID.toString().padStart(3, "0"),
          outletName: item.outletName,
          date: new Date(item.orderDate).toLocaleDateString("en-US"),
          time: new Date(item.orderDate).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          }), // 12-hour format
          status: item.status,
          customerName: item.customerName,
          customerPhone: item.customerPhone,
        }))
        .sort((a, b) => b.orderId.localeCompare(a.orderId)); // Sort by orderId descending
      setOrders(orderList);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
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
        <FillButton onClick={handleOpenPopup}>Proceed {">"}</FillButton>
        <BorderButton onClick={onClear}>Cancel</BorderButton>
      </div>

      <div>
        <IconNavButton
          icon={"src/assets/icons/historyIcon.svg"}
          onClick={handleOpenHistory}
        >
          Customer Order History
        </IconNavButton>
      </div>

      {showModal && (
        <CustomerOrderHistory
          show={showModal}
          onClose={() => setShowModal(false)}
          orders={orders}
          loading={loading}
        />
      )}

      <CusDetailsPopup
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        onSubmit={handleSubmitDetails}
      />
    </div>
  );
};

export default DisplayTotal;
