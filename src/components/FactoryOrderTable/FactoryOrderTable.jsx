import React, { useState } from "react";
import Dropdown2 from "../Dropdown2/Dropdown2";
import OrderTable from "../PosTable/OrderTable";
import { getFacOrderItemsByFacOrId } from "../../api/outlet_service/factoryOrderController";
import LoadingWheel from "../loadingWheel/LoadingWheel";

const FactoryOrderTable = ({ orders }) => {
  const [statuses, setStatuses] = useState({}); // Track status for each order
  const [openDrawer, setOpenDrawer] = useState(null); // Track open drawer
  const [loadingItems, setLoadingItems] = useState(false); // Loading state

  // Hardcoded order items for the drawer
  const hardcodedItems = [];

//   { id: 3, name: "Product C", price: 150, quantity: 4}

  const [orderItems, setOrderItems] = useState([]); // Dynamically set items

  // Handle status change
  const handleChange = (event, orderId) => {
    setStatuses((prev) => ({
      ...prev,
      [orderId]: event.target.value,
    }));
  };

  // Toggle drawer and set hardcoded items
  const toggleDrawer = (orderId) => {
    if (openDrawer === orderId) {
      setOpenDrawer(null);
      setOrderItems([]);
    } else {
      setOpenDrawer(orderId);
      setOrderItems(hardcodedItems); // Use hardcoded items
    }
  };

  const handleFetchOrderItems = async (orderId) => {
    try {
      setLoadingItems(true);
      const data = await getFacOrderItemsByFacOrId(orderId);
      const items = data.map((fItem) => ({
        id: fItem.productId,
        name: fItem.productName,
        price: fItem.unitPrice,  // Make sure this is the correct field name
        quantity: fItem.quantity,
      }));
      setOrderItems(items);  // Update state with new array
    } catch (error) {
      console.error("Error fetching order items:", error);
    }finally{
        setLoadingItems(false);
    }
  };

  const options = [
    { value: "Pending", label: "Pending" },
    { value: "Confirmed", label: "Confirmed" },
    { value: "Delivered", label: "Delivered" },
    { value: "Rejected", label:"Rejected"}
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
                const bgColor = isDrawerOpen ? "bg-pink-50 rounded-t-3xl" : "bg-gary-50";

                return (
                  <React.Fragment key={order.orderId}>
                    <tr
                      className={`border-b border-gray-200 hover:bg-gray-100 ${bgColor}`}
                    >
                      <td className="py-3 px-6 text-left whitespace-nowrap">
                        <span className="font-medium">{index + 1}</span>
                      </td>
                      <td className="py-3 px-6 text-left whitespace-nowrap">
                        <span className="font-medium">FO/{order.orderId}</span>
                      </td>
                      <td className="py-3 px-6 text-left">
                        <span>{order.outletName}</span>
                      </td>
                      <td className="py-3 px-6 text-left">
                        <span>{order.date}</span>
                      </td>
                      <td className="py-3 px-6 text-left">
                        <span>{order.time}</span>
                      </td>
                      <td className="py-3 px-6 text-left">
                        <Dropdown2
                          label="Status"
                          value={statuses[order.orderId] || order.status}
                          onChange={(e) => handleChange(e, order.orderId)}
                          options={options}
                        />
                      </td>
                      <td className="py-3 px-6 text-left">
                        <button
                          className="bg-pink-500 text-white py-1 px-3 rounded-full shadow-md hover:bg-pink-600 transition duration-300"
                          onClick={() => {toggleDrawer(order.orderId);handleFetchOrderItems(order.orderId)}}
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
                           {loadingItems ? (<LoadingWheel />):
                           <OrderTable
                           tType="order"
                           products={orderItems}
                           setProducts={setOrderItems}
                         />}
                            
                             
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
    </div>
  );
};

export default FactoryOrderTable;
