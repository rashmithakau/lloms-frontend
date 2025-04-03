import React from "react";
import closeIcon from "../../../assets/orderhistory/close.png";
import backgroundImage from "../../../assets/orderhistory/bg2.jpg";
import TableContainer from "../../historypages/TableContainer.jsx";

const CustomerOrderHistory = ({ show, onClose, orders, loading }) => {
  return (
    <div>
      {show && (
        <div className="fixed inset-0 bg-transparent bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl border-4 border-transparent relative">
            <div className="w-full min-h-screen bg-transparent relative">
              <div
                className="absolute inset-0 bg-cover bg-center backdrop-blur-md"
                style={{ backgroundImage: `url(${backgroundImage})` }}
              ></div>
              <div className="relative z-10 p-8">
                <img
                  src={closeIcon}
                  alt="Close"
                  className="absolute top-4 right-4 w-8 h-8 cursor-pointer"
                  onClick={onClose}
                />
                <p className="text-3xl font-bold text-center mb-6">
                  Customer Order History
                </p>
                <div className="container">
                  <div className="flex bg-200 mx-5 rounded-t-lg">
                    <div className="w-1/5 text-black">Order ID</div>
                    <div className="w-1/5 text-black">Date</div>
                    <div className="w-1/5 text-black">Time</div>
                    <div className="w-1/5 text-black">Status</div>
                    <div className="w-1/5"></div>
                  </div>
                </div>
                {loading ? (
                  <p className="text-center text-lg font-semibold">
                    Loading...
                  </p>
                ) : (
                  <TableContainer orders={orders} />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerOrderHistory;
