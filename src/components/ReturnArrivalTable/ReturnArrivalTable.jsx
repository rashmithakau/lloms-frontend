import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import LoadingWheel from "../loadingWheel/LoadingWheel";
import LoadingPopup from "../Popup/LoadingPopup/LoadingPopup";

const ReturnArrivalTable = () => {
  const [returns, setReturns] = useState([]);
  const [loadingItems, setLoadingItems] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(null);
  const [orderLoading, setOrderLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchReturns = async () => {
    setIsLoading(true); // Start loading when fetching data
    try {
      const response = await axios.get(
        "http://localhost:8088/api/v1/return/all-by-status",
        {
          params: {
            status: "Pending", // Pass status as "Pending"
          },
        }
      );

      const data = response.data.data;

      const formatted = data.map((r) => {
        const dateObj = new Date(r.returnDate);
        const date = dateObj.toLocaleDateString("en-GB");
        const time = dateObj.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
        });

        return {
          returnId: r.returnId,
          outletName: r.outletName,
          date,
          time,
          returnItems: r.returnItems.map((item) => ({
            productId: item.productId,
            productName: item.productName, // Replace with actual name if available
            quantity: item.quantity,
            unitPrice: item.unitPrice, // Replace with real unit price if available
            returnReason: item.reason,
          })),
        };
      });

      setReturns(formatted);
    } catch (error) {
      console.error("Failed to fetch return data", error);
      Swal.fire("Error", "Failed to fetch return data", "error");
    } finally {
      setIsLoading(false); // End loading when data is fetched
    }
  };

  useEffect(() => {
    fetchReturns();
  }, []);

  const toggleDrawer = (returnId) => {
    if (openDrawer === returnId) {
      setOpenDrawer(null);
    } else {
      setOpenDrawer(returnId);
    }
  };

  const handleStatusChange = async (newStatus, returnId) => {
    const result = await Swal.fire({
      title: `Are you sure to mark as ${newStatus}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: `Yes, ${newStatus.toLowerCase()} it!`,
      cancelButtonText: "Cancel",
      confirmButtonColor: newStatus === "Approved" ? "#16a34a" : "#dc2626",
    });

    if (result.isConfirmed) {
      setOrderLoading(true);

      try {
        // Call the updateReturnStatus API
        const response = await axios.put(
          "http://localhost:8088/api/v1/return",
          null,
          {
            params: {
              returnId: returnId,
              status: newStatus,
            },
          }
        );

        if (response.data.code === 200) {
          Swal.fire("Success!", `Return marked as ${newStatus}.`, "success");
          // Refresh the returns list after saving the status
          fetchReturns();
        } else {
          Swal.fire("Error", "Failed to update return status", "error");
        }
      } catch (error) {
        console.error("Failed to update return status", error);
        Swal.fire("Error", "Failed to update return status", "error");
      } finally {
        setOrderLoading(false);
      }
    }
  };

  return (
    <div className="bg-gray-100 p-6 rounded-3xl my-5 max-h-[600px]">
      {isLoading ? (
        <LoadingWheel />
      ) : (
        <div className="overflow-x-auto">
          <div className="max-h-[500px] overflow-y-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg">
              <thead className="sticky top-0 bg-white z-10">
                <tr className="text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">#</th>
                  <th className="py-3 px-6 text-left">Return ID</th>
                  <th className="py-3 px-6 text-left">Outlet</th>
                  <th className="py-3 px-6 text-left">Date</th>
                  <th className="py-3 px-6 text-left">Time</th>
                  <th className="py-3 px-6 text-left">Actions</th>
                  <th className="py-3 px-6 text-left"></th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {returns.map((r, index) => {
                  const isDrawerOpen = openDrawer === r.returnId;

                  return (
                    <React.Fragment key={r.returnId}>
                      <tr
                        className={`border-b border-gray-200 hover:bg-gray-100 ${
                          isDrawerOpen ? "bg-pink-50 rounded-t-3xl" : ""
                        }`}
                      >
                        <td className="py-3 px-6">{index + 1}</td>
                        <td className="py-3 px-6">RA/{r.returnId}</td>
                        <td className="py-3 px-6">{r.outletName}</td>
                        <td className="py-3 px-6">{r.date}</td>
                        <td className="py-3 px-6">{r.time}</td>
                        <td className="py-3 px-6 flex space-x-2">
                          <button
                            onClick={() =>
                              handleStatusChange("Approved", r.returnId)
                            }
                            className="w-24 bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600 transition duration-200"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() =>
                              handleStatusChange("Rejected", r.returnId)
                            }
                            className="w-24 bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition duration-200"
                          >
                            Reject
                          </button>
                        </td>

                        <td className="py-3 px-6">
                          <button
                            className="bg-pink-500 text-white py-1 px-3 rounded hover:bg-pink-600 transition duration-300"
                            onClick={() => toggleDrawer(r.returnId)}
                          >
                            {isDrawerOpen ? "Hide" : "See More"}
                          </button>
                        </td>
                      </tr>

                      {isDrawerOpen && (
                        <tr>
                          <td
                            colSpan="7"
                            className="bg-pink-50 p-4 rounded-b-3xl"
                          >
                            <div className="w-full transition-all duration-300 ease-in-out">
                              {loadingItems ? (
                                <LoadingWheel />
                              ) : (
                                <>
                                  <h3 className="text-xl font-semibold mb-3">
                                    Return Items
                                  </h3>
                                  <table className="min-w-full bg-white shadow-md rounded-lg">
                                    <thead>
                                      <tr className="text-gray-600 uppercase text-sm leading-normal">
                                        <th className="py-3 px-6 text-left">
                                          #
                                        </th>
                                        <th className="py-3 px-6 text-left">
                                          Product Name
                                        </th>
                                        <th className="py-3 px-6 text-left">
                                          Quantity
                                        </th>
                                        <th className="py-3 px-6 text-left">
                                          Unit Price
                                        </th>
                                        <th className="py-3 px-6 text-left">
                                          Return Reason
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody className="text-gray-600 text-sm font-light">
                                      {r.returnItems.map((item, idx) => (
                                        <tr key={item.productId}>
                                          <td className="py-3 px-6">
                                            {idx + 1}
                                          </td>
                                          <td className="py-3 px-6">
                                            {item.productName}
                                          </td>
                                          <td className="py-3 px-6">
                                            {item.quantity}
                                          </td>
                                          <td className="py-3 px-6">
                                            Rs{item.unitPrice}
                                          </td>
                                          <td className="py-3 px-6">
                                            {item.returnReason}
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </>
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
        </div>
      )}
      {orderLoading && <LoadingPopup txt="Processing Return..." />}
    </div>
  );
};

export default ReturnArrivalTable;
