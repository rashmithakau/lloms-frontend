import React, { useState } from "react";
import Swal from "sweetalert2";
import LoadingWheel from "../loadingWheel/LoadingWheel"; 
import LoadingPopup from "../Popup/LoadingPopup/LoadingPopup"; // Loading Popup for status updates

const ReturnHistoryPopup = ({ onClose }) => {
  const [orderLoading, setOrderLoading] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(null);
  const [returnItems, setReturnItems] = useState([]);
  const [loadingItems, setLoadingItems] = useState(false);

  // Dummy return history data
  const returns = [
    {
      returnId: "R001",
      outletName: "Hakmana Outlet",
      returnDate: "2025-04-06",
      status: "Rejected",
    },
    {
      returnId: "R002",
      outletName: "Weligama Outlet",
      returnDate: "2025-03-30",
      status: "Approved",
    },
    {
      returnId: "R003",
      outletName: "Baddegama Outlet",
      returnDate: "2025-03-28",
      status: "Rejected",
    },
  ];

  // Dummy return items data (to be displayed when clicking "See More")
  const dummyReturnItems = [
    { id: 1, name: "Apple Cake", price: 10, quantity: 2, returnReason: "Damaged" },
    { id: 2, name: "Chocalate Cake", price: 20, quantity: 1, returnReason: "Wrong Size" },
  ];

  // Function to sort returns by date
  const sortReturns = (returns) => {
    return returns.sort((a, b) => {
      const dateA = new Date(a.returnDate);
      const dateB = new Date(b.returnDate);
      return dateB - dateA; // Sorting in descending order (latest first)
    });
  };

  const toggleDrawer = (returnId) => {
    if (openDrawer === returnId) {
      setOpenDrawer(null);
      setReturnItems([]);
    } else {
      setOpenDrawer(returnId);
      // Simulate fetching return items data (in real app, an API call would be here)
      setLoadingItems(true);
      setTimeout(() => {
        setReturnItems(dummyReturnItems);
        setLoadingItems(false);
      }, 1000); // Simulating a delay (e.g., fetching data)
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md">
      <div className="bg-white p-6 rounded-3xl max-h-[90vh] overflow-y-auto w-[95%] md:w-[85%] lg:w-[75%] shadow-2xl relative border border-gray-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl font-bold"
        >
          ×
        </button>

        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Return History</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-xl shadow">
            <thead className="sticky top-0 bg-gray-100 z-10 rounded-t-xl">
              <tr className="text-gray-700 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">#</th>
                <th className="py-3 px-6 text-left">Return ID</th>
                <th className="py-3 px-6 text-left">Outlet Name</th>
                <th className="py-3 px-6 text-left">Return Date</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm">
              {sortReturns(returns).map((returnItem, index) => {
                const isDrawerOpen = openDrawer === returnItem.returnId;
                return (
                  <React.Fragment key={returnItem.returnId}>
                    <tr className={`border-b ${isDrawerOpen ? "bg-pink-50" : "hover:bg-gray-50"}`}>
                      <td className="py-3 px-6">{index + 1}</td>
                      <td className="py-3 px-6">{returnItem.returnId}</td>
                      <td className="py-3 px-6">{returnItem.outletName}</td>
                      <td className="py-3 px-6">{returnItem.returnDate}</td>
                      <td className="py-3 px-6">{returnItem.status}</td>
                      <td className="py-3 px-6 text-center">
                        <button
                          className={`${
                            isDrawerOpen ? "bg-gray-500" : "bg-pink-500"
                          } text-white px-4 py-1 rounded-full shadow hover:scale-105 transition-all duration-200`}
                          onClick={() => toggleDrawer(returnItem.returnId)}
                        >
                          {isDrawerOpen ? "Hide" : "See More"}
                        </button>
                      </td>
                    </tr>
                    {isDrawerOpen && (
                      <tr>
                        <td colSpan="7" className="bg-pink-50 p-4 rounded-b-xl">
                          <div className="transition-all duration-300 ease-in-out">
                            {loadingItems ? (
                              <LoadingWheel />
                            ) : (
                              <div>
                                <table className="min-w-full bg-white border border-gray-200 rounded-xl shadow">
                                  <thead className="bg-gray-100">
                                    <tr className="text-gray-700 uppercase text-sm leading-normal">
                                      <th className="py-3 px-6 text-left">Item Name</th>
                                      <th className="py-3 px-6 text-left">Price</th>
                                      <th className="py-3 px-6 text-left">Quantity</th>
                                      <th className="py-3 px-6 text-left">Return Reason</th>
                                    </tr>
                                  </thead>
                                  <tbody className="text-gray-600 text-sm">
                                    {returnItems.map((item) => (
                                      <tr key={item.id}>
                                        <td className="py-3 px-6">{item.name}</td>
                                        <td className="py-3 px-6">Rs.{item.price}</td>
                                        <td className="py-3 px-6">{item.quantity}</td>
                                        <td className="py-3 px-6">{item.returnReason}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>

        {orderLoading && <LoadingPopup txt="Return Status Is Changing..." />}
      </div>
    </div>
  );
};

export default ReturnHistoryPopup;


