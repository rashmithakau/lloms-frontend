import React from "react";
import CardContainer from "../../components/cardContainer/CardContainer";
import OrderTable from "../../components/PosTable/OrderTable";
import ItemCard from "../../components/itemCard/ItemCard";
import ActionContainer from "../../components/ActionContainer/ActionContainer";
import OrderAction from "../../components/OrderAction/OrderAction";
import ReturnAction from "../../components/ReturnAction/ReturnAction";
import Image from "../../assets/2254.jpg_wh860.jpg";
import { useState, useEffect } from "react";
import { getAllProducts } from "../../api/product-service/productController";

function Order() {
  const [orderItems, setOrderItems] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const data = await getAllProducts();
      setItems(data);
    };
    fetchItems();
  }, []);

  const handleClearOrder = () => {
    setOrderItems([]);
  };

  const handleItemClick = (item) => {
    const existingItem = orderItems.find(
      (orderItem) => orderItem.id === item.productId
    );

    if (existingItem) {
      setOrderItems(
        orderItems.map((orderItem) =>
          orderItem.id === item.productId
            ? { ...orderItem, quantity: orderItem.quantity + 1 }
            : orderItem
        )
      );
    } else {
      setOrderItems([
        ...orderItems,
        {
          id: item.productId,
          name: item.productName,
          price: item.price,
          //quantity: 1,
          discount: 0,
        },
      ]);
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center my-2">
        <CardContainer>
          {items.map((item, index) => (
            <ItemCard
              key={index}
              item={item}
              onClick={() => handleItemClick(item)}
            />
          ))}
        </CardContainer>
      </div>
      <div className="flex">
        <OrderTable
          tType="order"
          products={orderItems}
          setProducts={setOrderItems}
        />
        <ActionContainer>
          <OrderAction onClear={handleClearOrder} />
        </ActionContainer>
      </div>
    </div>
  );
}

export default Order;
