import React, { useEffect, useState } from "react";
import FactoryOrderTable from "../../components/FactoryOrderTable/FactoryOrderTable";
import LoadingWheel from "../../components/loadingWheel/LoadingWheel";
import { getFacOrdersByStatus,getFacOrdersById } from "../../api/outlet_service/factoryOrderController";

function Order({ category, selCategory = "Pending", searchText }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const selectedCategory = category || selCategory; // Use `category` if provided

  useEffect(() => {
   
    const fetchOrders = async () => {
      setLoading(true); // Reset loading state before fetching
      try {
        const data = await getFacOrdersByStatus(selectedCategory);
        const orderList = data.map((dataItem) => {
          const date = new Date(dataItem.orderDate);
          return {
            orderId: dataItem.facOrderId.toString().padStart(3, "0"),
            outletName: dataItem.outletName,
            date: date.toISOString().split("T")[0],
            time: date.toTimeString().split(" ")[0],
            status: dataItem.status,
          };
        });
        setOrders(orderList);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [selectedCategory,searchText]); // Ensure category updates trigger a new fetch

  useEffect(() => {
    if (searchText?.trim().startsWith("FO/")) {
      console.log(searchText);
  
      // Extract numeric part & convert to integer
      let id = searchText.match(/FO\/(\d+)/)?.[1];
      if (!id || isNaN(id)) return; // Prevent API call if ID is invalid
      console.log(id);
  
      const fetchOrders = async () => {
        setLoading(true);
        try {
          const response = await getFacOrdersById(parseInt(id));
          console.log("API Response:", response);
  
          // Check if 'data' exists and is an array
          const data = response?.data;
          if (Array.isArray(data) && data.length === 0) {
            setOrders([]);
            return;
          }
  
          // Map over the fetched data to structure the orders
          const orderList = data.map((dataItem) => {
            const date = new Date(dataItem.orderDate);
            return {
              orderId: dataItem.facOrderId.toString().padStart(3, "0"),
              outletName: dataItem.outletName,
              date: date.toISOString().split("T")[0],
              time: date.toTimeString().split(" ")[0],
              status: dataItem.status,
            };
          });
          setOrders(orderList);
        } catch (error) {
          console.error("Error fetching orders:", error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchOrders();
    }
  }, [searchText]);
  
  
  
  

  return (
    <div>
      {loading ? (
        <div className="text-center text-gray-600 py-5 text-lg">
          <LoadingWheel />
        </div>
      ) : (
        <FactoryOrderTable orders={orders} category={category} />
      )}
    </div>
  );
}

export default Order;
