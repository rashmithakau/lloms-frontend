import React, { useState } from "react";
import IconNavButton from "../buttons/IconNavButton";
import FillButton from "../buttons/FillButton";
import BorderButton from "../buttons/BorderButton";
import OrderHistory from "../Popup/HistoryPopup/FactoryOrderHistoryPage.jsx";
import FacOrderHisPopup from "../FacOrderHisPopup/FacOrderHisPopup.jsx";
import { getFacOrderItemsByOutletId } from "../../api/outlet_service/factoryOrderController.js";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext.jsx";
import { useEffect } from "react";



function OrderAction({ onClear,onSubmit,isActive}) {
  const [showModal, setShowModal] = useState(false);
  const [orders, setOrders] = useState([]);
  const { outletId } = useContext(AuthContext);


  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getFacOrderItemsByOutletId(outletId);
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
      
      }
    };

    fetchOrders();
  }, [showModal],[]); // Ensure category updates trigger a new fetch

  return (
    <div>
      {/* Action Buttons */}
      <div className="flex justify-center gap-8 my-10">
        <FillButton onClick={onSubmit} disabled={!isActive}>Place Order</FillButton>
        <BorderButton onClick={onClear}>Cancel</BorderButton>
      </div>

      {/* History Button */}
      <div>
        <IconNavButton
          icon={"src/assets/icons/historyIcon.svg"}
          onClick={() => setShowModal(true)}
        >
          Factory Order History
        </IconNavButton>
      </div>

     

      {/* Modal for Order History */}
      {showModal && (
        <FacOrderHisPopup orders={orders} onClose={() => setShowModal(false)}/>
      )}
    </div>
  );
}

export default OrderAction;
