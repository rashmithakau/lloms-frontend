import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import OrderTable from "../PosTable/OrderTable";
import LoadingWheel from "../loadingWheel/LoadingWheel";
import {
  getFacOrderItemsByFacOrId,
  updateFacOrderStatusById,
} from "../../api/outlet_service/factoryOrderController";
import LoadingPopup from "../Popup/LoadingPopup/LoadingPopup";
import { updateProduct } from "../../api/product-service/stockController";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext.jsx";
import { saveNotification } from "../../api/reporting_service/notificationController";

const FacOrderHisPopup = ({ orders, onClose }) => {
  const [statuses, setStatuses] = useState({});
  const [openDrawer, setOpenDrawer] = useState(null);
  const [loadingItems, setLoadingItems] = useState(false);
  const [orderItems, setOrderItems] = useState([]);
  const [orderLoading, setOrderLoading] = useState(false);
  const { outletId } = useContext(AuthContext);

  const handleFetchOrderItems = async (orderId) => {
    try {
      setLoadingItems(true);
      const data = await getFacOrderItemsByFacOrId(orderId);
      const items = data.map((fItem) => ({
        id: fItem.productId,
        name: fItem.productName,
        price: fItem.unitPrice,
        quantity: fItem.quantity,
      }));
      setOrderItems(items);
    } catch (error) {
      console.error("Error fetching order items:", error);
    } finally {
      setLoadingItems(false);
    }
  };

  const handleStatusChange = async (event, orderId) => {
    const newStatus = event.target.value;

    if (newStatus !== "Received") {
      Swal.fire("Action Blocked", "You can only change status to 'Received'.", "info");
      return;
    }

    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Change status to "${newStatus}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, update it!",
    });

    if (result.isConfirmed) {
      try {
        setOrderLoading(true);

        if (newStatus === "Received") {
            const notificationDTO = {
              outletId:-1,
              message: `Order FO/${orderId} has been Received!`,
              date: new Date(),
            };
    
            // Set isNotify to true to send the notification (you can adjust this logic as needed)
            const isNotify = true;
            
            // Save the notification and pass the isNotify flag
            await saveNotification(notificationDTO, isNotify);
          }

        // Prepare update DTO for stock increase
        const updateDto = {
          outletId: outletId,
          productList: orderItems.map(item => ({
            productId: item.id,
            stockQuantity: item.quantity,
          })),
          increase: true,
        };

        // Update product stock
        await updateProduct(updateDto);

        // Update order status
        await updateFacOrderStatusById(orderId, newStatus);

        Swal.fire("Updated!", "Order status has been updated and stock increased.", "success");
        setStatuses((prev) => ({ ...prev, [orderId]: newStatus }));
      } catch (error) {
        console.error("Error updating status and stock:", error);
        Swal.fire("Error!", "Failed to update order status and stock.", "error");
      } finally {
        setOrderLoading(false);
      }
    }
  };

  const toggleDrawer = (orderId) => {
    if (openDrawer === orderId) {
      setOpenDrawer(null);
      setOrderItems([]);
    } else {
      setOpenDrawer(orderId);
      handleFetchOrderItems(orderId);
    }
  };

  const options = [
    "Received",
    "Pending",
    "Confirmed",
    "Delivered",
    "Rejected",
  ];

  // Function to sort orders by date and time
  const sortOrders = (orders) => {
    return orders.sort((a, b) => {
      const dateA = new Date(`${a.date} ${a.time}`);
      const dateB = new Date(`${b.date} ${b.time}`);
      return dateB - dateA; // Sorting in descending order (latest first)
    });
  };

  const sortedOrders = sortOrders(orders);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md">
      <div className="bg-white p-6 rounded-3xl max-h-[90vh] overflow-y-auto w-[95%] md:w-[85%] lg:w-[75%] shadow-2xl relative border border-gray-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl font-bold"
        >
          ×
        </button>

        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Factory Order History</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-xl shadow">
            <thead className="sticky top-0 bg-gray-100 z-10 rounded-t-xl">
              <tr className="text-gray-700 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">#</th>
                <th className="py-3 px-6 text-left">Order ID</th>
                <th className="py-3 px-6 text-left">Outlet Name</th>
                <th className="py-3 px-6 text-left">Date</th>
                <th className="py-3 px-6 text-left">Time</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm">
              {sortedOrders.map((order, index) => {
                const isDrawerOpen = openDrawer === order.orderId;
                return (
                  <React.Fragment key={order.orderId}>
                    <tr className={`border-b ${isDrawerOpen ? "bg-pink-50" : "hover:bg-gray-50"}`}>
                      <td className="py-3 px-6">{index + 1}</td>
                      <td className="py-3 px-6">FO/{order.orderId}</td>
                      <td className="py-3 px-6">{order.outletName}</td>
                      <td className="py-3 px-6">{order.date}</td>
                      <td className="py-3 px-6">{order.time}</td>
                      <td className="py-3 px-6">
                        <select
                          className="border px-3 py-1 rounded-lg bg-white text-gray-800"
                          value={statuses[order.orderId] ?? order.status}
                          onChange={(e) => handleStatusChange(e, order.orderId)}
                        >
                          {options.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="py-3 px-6 text-center">
                        <button
                          className={`${
                            isDrawerOpen ? "bg-gray-500" : "bg-pink-500"
                          } text-white px-4 py-1 rounded-full shadow hover:scale-105 transition-all duration-200`}
                          onClick={() => toggleDrawer(order.orderId)}
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
                              <OrderTable
                                tType="order"
                                products={orderItems}
                                setProducts={setOrderItems}
                              />
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

        {orderLoading && <LoadingPopup txt="Order Status Is Changing..." />}
      </div>
    </div>
  );
};

export default FacOrderHisPopup;
