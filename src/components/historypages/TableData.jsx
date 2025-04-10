import React, { useState } from "react";
import { getCusOrderItemsByCusOrId } from "../../api/outlet_service/cusOrderController";
import BillTable from "../PosTable/BillTable";

const TableData = ({ orders }) => {
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState({}); // Track loading state per order

  const toggleExpand = async (orderId) => {
    if (expandedOrder === orderId) {
      setExpandedOrder(null);
      setOrderItems([]);
      return;
    }

    setLoadingOrders((prev) => ({ ...prev, [orderId]: true })); // Set loading for specific order

    try {
      const data = await getCusOrderItemsByCusOrId(orderId);
      const items = data.map((item) => ({
        id: item.productId,
        name: item.productName,
        price: item.unitPrice,
        discount: item.discountPerUnit,
        quantity: item.quantity,
      }));
      setOrderItems(items);
      setExpandedOrder(orderId);
    } catch (error) {
      console.error("Error fetching order items:", error);
    } finally {
      setLoadingOrders((prev) => ({ ...prev, [orderId]: false })); // Unset loading state
    }
  };

  return (
    <div className="container mx-auto p-4">
      {orders.map((order) => {
        const isLoading = loadingOrders[order.orderId] || false;
        return (
          <div
            key={order.orderId}
            className="border-1 border-[#432634] rounded-lg mb-8 backdrop-blur-lg"
          >
            {/* Main Order Row */}
            <div className="flex items-center p-3 backdrop-blur rounded-lg">
              <div className="w-1/5 text-[#432634]">CO/{order.orderId}</div>
              <div className="w-1/5 text-[#432634]">{order.date}</div>
              <div className="w-1/5 text-[#432634]">{order.time}</div>
              <div className="w-1/5 text-[#432634]">{order.status}</div>
              <div className="w-1/5 text-[#432634]">{order.customerName}</div>
              <div className="w-1/5 text-[#432634]">{order.customerPhone}</div>
              <div className="w-1/5">
                <button
                  className="px-1 py-2 text-base text-[#432634] border-1 border-[#432634] rounded-full"
                  onClick={() => toggleExpand(order.orderId)}
                  style={{ minWidth: "120px" }}
                  disabled={isLoading} // Prevent multiple clicks during loading
                >
                  {isLoading
                    ? "Loading..."
                    : expandedOrder === order.orderId
                    ? "Less"
                    : "See More"}
                </button>
              </div>
            </div>

            {/* Expanded Section */}
            {expandedOrder === order.orderId && (
              <div className="w-fit h-auto p-4 border-t border-[#432634] rounded-lg bg-transparent shadow-md">
                <div className="p-4 rounded-lg text-center bg-transparent">
                  <BillTable products={orderItems} />
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default TableData;
