import React, { useState, useEffect } from "react";
import CardContainer from "../../components/cardContainer/CardContainer";
import OrderTable from "../../components/PosTable/OrderTable";
import ItemCard from "../../components/itemCard/ItemCard";
import ActionContainer from "../../components/ActionContainer/ActionContainer";
import OrderAction from "../../components/OrderAction/OrderAction";
import LoadingWheel from "../../components/loadingWheel/LoadingWheel";
import { getAllProductsForOutlet } from "../../api/product-service/productController";
import { saveFacOrder } from "../../api/outlet_service/factoryOrderController";
import Allert from "../../components/Allert/Allert";
import LoadingPopup from "../../components/Popup/LoadingPopup/LoadingPopup";


function Order() {
  const [orderItems, setOrderItems] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orderLoading, setOrderLoading] = useState(false);

  // 🟢 Fetch products and filter active ones
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await getAllProductsForOutlet(101);
        const filteredItems = data.filter((item) => item.productStatus === true);
        setItems(filteredItems);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  // 🟢 Handle submit order
  const handleSubmit = async () => {
    const itemList = orderItems.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
    }));

    const orderRequest = {
      orderDate: new Date().toISOString(),
      status: "Pending",
      outletId: 1,
      items: itemList,
    };

    try {
      setOrderLoading(true);
      const data = await saveFacOrder(orderRequest);
      Allert({ message: "Order placed successfully", type: "success" });
    } catch (error) {
      console.error("Error placing order:", error);
      Allert({ message: "Your order could not be placed", type: "error" });
    }finally{
      setOrderLoading(false);
      handleClearOrder();
    };
  };

  // 🟢 Clear order items
  const handleClearOrder = () => {
    setOrderItems([]);
  };

  // 🟢 Handle item click
  const handleItemClick = (item) => {
    setOrderItems((prevOrderItems) => {
      const existingItem = prevOrderItems.find(
        (orderItem) => orderItem.id === item.productId
      );

      if (existingItem) {
        return prevOrderItems.map((orderItem) =>
          orderItem.id === item.productId
            ? { ...orderItem, quantity: orderItem.quantity + 1 }
            : orderItem
        );
      } else {
        return [
          ...prevOrderItems,
          {
            id: item.productId,
            name: item.productName,
            price: item.price,
            quantity: 1,
            discount: 0,
          },
        ];
      }
    });
  };

  return (
    <div>
      {/* Items List */}
      <div className="flex justify-center items-center my-2">
        <CardContainer h="58vh">
          {loading ? (
            <div className="text-center text-gray-600 py-5 text-lg">
              <LoadingWheel />
            </div>
          ) : (
            items.map((item, index) => (
              <ItemCard
                key={index}
                item={item}
                onClick={() => handleItemClick(item)}
              />
            ))
          )}
        </CardContainer>
      </div>

      {/* Order Table & Actions */}
      <div className="flex">
        <OrderTable
          tType="order"
          products={orderItems}
          setProducts={setOrderItems}
        />
        <ActionContainer>
          <OrderAction onClear={handleClearOrder} onSubmit={handleSubmit} isActive={orderItems.length>0}/>
        </ActionContainer>
      </div>
          {orderLoading && <LoadingPopup/>}
  
    </div>
  );
}

export default Order;
