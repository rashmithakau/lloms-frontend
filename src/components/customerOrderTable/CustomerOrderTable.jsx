import React, { useState } from "react";
import LoadingWheel from "../loadingWheel/LoadingWheel";
import BillTable from "../PosTable/BillTable";
import { getCusOrderItemsByCusOrId } from "../../api/outlet_service/cusOrderController";

function CustomerOrderTable({ orders }) {
  const [openDrawer, setOpenDrawer] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  const [loadingItems, setLoadingItems] = useState(false);

  const toggleExpand = async (orderId) => {
    if (openDrawer === orderId) {
      setOpenDrawer(null);
      setOrderItems([]);
      return;
    }

    // Show drawer first and display loading state
    setOpenDrawer(orderId);
    setLoadingItems(true);

    try {
      const data = await getCusOrderItemsByCusOrId(orderId);
      const items = data.map((item) => ({
        id: item.productId,
        name: item.productName,
        price: item.unitPrice,
        quantity: item.quantity,
        discount: item.discountPerUnit,
      }));
      setOrderItems(items);
    } catch (error) {
      console.error("Error fetching order items:", error);
    } finally {
      setLoadingItems(false);
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
                <th className="py-3 px-6 text-left">Customer Name</th>
                <th className="py-3 px-6 text-left">Customer Phone No.</th>
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
                        CO/{order.orderId}
                      </td>
                      <td className="py-3 px-6 text-left">
                        {order.outletName}
                      </td>
                      <td className="py-3 px-6 text-left">{order.date}</td>
                      <td className="py-3 px-6 text-left">{order.time}</td>
                      <td className="py-3 px-6 text-left">{order.status}</td>
                      <td className="py-3 px-6 text-left">
                        {order.customerName}
                      </td>
                      <td className="py-3 px-6 text-left">
                        {order.customerPhone}
                      </td>
                      <td className="py-3 px-6 text-left">
                        <button
                          className="bg-pink-500 text-white py-1 px-3 rounded-full shadow-md hover:bg-pink-600 transition duration-300"
                          onClick={() => toggleExpand(order.orderId)}
                        >
                          {isDrawerOpen ? "Hide" : "See More"}
                        </button>
                      </td>
                    </tr>
                    {isDrawerOpen && (
                      <tr>
                        <td
                          colSpan="9"
                          className="bg-pink-50 p-4 rounded-b-3xl border-gray-200"
                        >
                          <div className="w-[70vw] transition-all duration-300 ease-in-out">
                            {loadingItems ? (
                              <LoadingWheel />
                            ) : (
                              <BillTable products={orderItems} />
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
    </div>
  );
}

export default CustomerOrderTable;
