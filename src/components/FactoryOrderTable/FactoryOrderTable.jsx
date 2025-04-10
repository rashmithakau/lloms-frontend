import React, { useState } from "react";
import Swal from "sweetalert2";
import OrderTable from "../PosTable/OrderTable";
import LoadingWheel from "../loadingWheel/LoadingWheel";
import {
  getFacOrderItemsByFacOrId,
  updateFacOrderStatusById,
} from "../../api/outlet_service/factoryOrderController";
import LoadingPopup from "../Popup/LoadingPopup/LoadingPopup";
import { saveNotification } from "../../api/reporting_service/notificationController";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext.jsx";

const FactoryOrderTable = ({ orders }) => {
  const [statuses, setStatuses] = useState({});
  const [openDrawer, setOpenDrawer] = useState(null);
  const [loadingItems, setLoadingItems] = useState(false);
  const [orderItems, setOrderItems] = useState([]);
  const [orderLoading, setOrderLoading] = useState(false);
  const { outletId } = useContext(AuthContext);

  // Fetch order items
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

  // Handle status change confirmation
  const handleStatusChange = async (event, orderId) => {
    const newStatus = event.target.value;

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
    
        if (newStatus === "Delivered") {
          const notificationDTO = {
            outletId:outletId,
            message: `Order FO/${orderId} has been delivered!`,
            date: new Date(),
          };
  
          // Set isNotify to true to send the notification (you can adjust this logic as needed)
          const isNotify = true;
          
          // Save the notification and pass the isNotify flag
          await saveNotification(notificationDTO, isNotify);
        }
 
        await updateFacOrderStatusById(orderId, newStatus);
        Swal.fire("Updated!", "Order status has been updated.", "success");
        setStatuses((prev) => ({ ...prev, [orderId]: newStatus }));
      } catch (error) {
        console.error("Error updating status:", error);
        Swal.fire("Error!", "Failed to update order status.", "error");
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

  return (
    <div
      className="bg-gray-100 p-6 rounded-3xl my-5"
      style={{ maxHeight: "600px" }}
    >
      <div className="overflow-x-auto">
        <div className="max-h-[500px] overflow-y-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead className="sticky top-0 bg-white z-10">
              <tr className="text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">#</th>
                <th className="py-3 px-6 text-left">Order ID</th>
                <th className="py-3 px-6 text-left">Outlet Name</th>
                <th className="py-3 px-6 text-left">Date</th>
                <th className="py-3 px-6 text-left">Time</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-left"></th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {orders.map((order, index) => {
                const isDrawerOpen = openDrawer === order.orderId;
                const bgColor = isDrawerOpen
                  ? "bg-pink-50 rounded-t-3xl"
                  : "bg-gray-50";

                return (
                  <React.Fragment key={order.orderId}>
                    <tr
                      className={`border-b border-gray-200 hover:bg-gray-100 ${bgColor}`}
                    >
                      <td className="py-3 px-6 text-left whitespace-nowrap">
                        {index + 1}
                      </td>
                      <td className="py-3 px-6 text-left whitespace-nowrap">
                        FO/{order.orderId}
                      </td>
                      <td className="py-3 px-6 text-left">
                        {order.outletName}
                      </td>
                      <td className="py-3 px-6 text-left">{order.date}</td>
                      <td className="py-3 px-6 text-left">{order.time}</td>
                      <td className="py-3 px-6 text-left">
                        <select
                          value={statuses[order.orderId] || order.status}
                          onChange={(e) => handleStatusChange(e, order.orderId)}
                          className="px-4 py-2 bg-white border rounded-lg"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Rejected">Rejected</option>
                          <option value="Received" disabled>
                            Received
                          </option>
                        </select>
                      </td>
                      <td className="py-3 px-6 text-left">
                        <button
                          className="bg-pink-500 text-white py-1 px-3 rounded-full shadow-md hover:bg-pink-600 transition duration-300"
                          onClick={() => toggleDrawer(order.orderId)}
                        >
                          {isDrawerOpen ? "Hide" : "See More"}
                        </button>
                      </td>
                    </tr>
                    {isDrawerOpen && (
                      <tr>
                        <td
                          colSpan="7"
                          className="bg-pink-50 p-4 rounded-b-3xl border-gray-200"
                        >
                          <div className="w-[95vh] transition-all duration-300 ease-in-out">
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
      </div>
      {orderLoading && <LoadingPopup txt="Order Status Is Changing..." />}
    </div>
  );
};

export default FactoryOrderTable;
