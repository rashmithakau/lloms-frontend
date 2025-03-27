import React, { useEffect } from "react";
import FactoryOrderTable from "../../components/FactoryOrderTable/FactoryOrderTable";
import { useState } from "react";
import LoadingWheel from "../../components/loadingWheel/LoadingWheel";
import { getFacOrdersByStatus } from "../../api/outlet_service/factoryOrderController";

function Order() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const orderList=[];

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getFacOrdersByStatus("pending");
        const orderList = data.map((dataItem) => {
          // Convert database date to local timezone correctly
          const date = new Date(dataItem.orderDate);
          const formattedDate = date.toISOString().split("T")[0];
          const formattedTime = date.toTimeString().split(" ")[0];
  
          console.log("Original Date:", dataItem.orderDate);
          console.log("Formatted Date:", formattedDate);
          console.log("Formatted Time:", formattedTime);
  
          return {
            orderId: dataItem.facOrderId.toString().padStart(3, '0'),
            outletName: dataItem.outletName,
            date: formattedDate,
            time: formattedTime,
            status: dataItem.status,
          };
        });
        setOrders(orderList);  // Update state once after map
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchOrders();
  }, []);
  
  return (
    <div>
      <div>
        {loading ? (
          <div className="text-center text-gray-600 py-5 text-lg">
            <LoadingWheel />
          </div>
        ) : (
          <FactoryOrderTable orders={orders} />
        )}
      </div>
    </div>
  );
}

export default Order;
