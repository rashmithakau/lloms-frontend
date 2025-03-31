import React, { useState } from "react";
import Swal from "sweetalert2";
import Dropdown2 from "../Dropdown2/Dropdown2";
import OrderTable from "../PosTable/OrderTable";
import LoadingWheel from "../loadingWheel/LoadingWheel";
import { getFacOrderItemsByFacOrId, updateFacOrderStatusById } from "../../api/outlet_service/factoryOrderController";
import LoadingPopup from "../Popup/LoadingPopup/LoadingPopup";

const FactoryOrderTable = ({ orders }) => {
  const [statuses, setStatuses] = useState({});
  const [openDrawer, setOpenDrawer] = useState(null);
  const [loadingItems, setLoadingItems] = useState(false);
  const [orderItems, setOrderItems] = useState([]);
  const [orderLoading, setOrderLoading] = useState(false);

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
        await updateFacOrderStatusById(orderId, newStatus);
        Swal.fire("Updated!", "Order status has been updated.", "success");
        setStatuses((prev) => ({ ...prev, [orderId]: newStatus }));
      } catch (error) {
        console.error("Error updating status:", error);
        Swal.fire("Error!", "Failed to update order status.", "error");
      }finally{
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
    { value: "Pending", label: "Pending" },
    { value: "Confirmed", label: "Confirmed" },
    { value: "Delivered", label: "Delivered" },
    { value: "Rejected", label: "Rejected" },
  ];

  return (
    <div className="bg-gray-100 p-6 rounded-3xl">
      <div className="overflow-x-auto overflow-y-auto">
        <div className="max-h-[85vh] overflow-y-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead className="sticky top-0 bg-white">
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
                const bgColor = isDrawerOpen ? "bg-pink-50 rounded-t-3xl" : "bg-gray-50";

                return (
                  <React.Fragment key={order.orderId}>
                    <tr className={`border-b border-gray-200 hover:bg-gray-100 ${bgColor}`}>
                      <td className="py-3 px-6 text-left whitespace-nowrap">{index + 1}</td>
                      <td className="py-3 px-6 text-left whitespace-nowrap">FO/{order.orderId}</td>
                      <td className="py-3 px-6 text-left">{order.outletName}</td>
                      <td className="py-3 px-6 text-left">{order.date}</td>
                      <td className="py-3 px-6 text-left">{order.time}</td>
                      <td className="py-3 px-6 text-left">
                        <Dropdown2
                          label="Status"
                          value={statuses[order.orderId] || order.status}
                          onChange={(e) => handleStatusChange(e, order.orderId)}
                          options={options}
                        />
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
                        <td colSpan="7" className="bg-pink-50 p-4 rounded-b-3xl border-gray-200">
                          <div className="w-[95vh] transition-all duration-300 ease-in-out">
                            {loadingItems ? <LoadingWheel /> : <OrderTable tType="order" products={orderItems} setProducts={setOrderItems} />}
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
      {orderLoading && <LoadingPopup txt="Order Status Is Chageing..."/>}
    </div>
  );
};

export default FactoryOrderTable;
