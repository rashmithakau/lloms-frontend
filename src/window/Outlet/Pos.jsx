import React from "react";
import CardContainer from "../../components/cardContainer/CardContainer";
import OrderTable from "../../components/PosTable/OrderTable";
import DisplayTotal from "../../components/DisplayTotal/DisplayTotal";
import ItemCard from "../../components/itemCard/ItemCard";
import ActionContainer from "../../components/ActionContainer/ActionContainer";
import Image from "../../assets/2254.jpg_wh860.jpg";
import { useState } from "react";

function Pos() {

  const [orderItems, setOrderItems] = useState([]);

  const items = Array.from({ length: 30 }).map((_, index) => ({
    image: Image,
    productId: `PD/${String(index + 1).padStart(3, "0")}`,
    stock: 10,
    productName: "Cream Cake",
    price: 100.0,
  }));

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
          quantity: 1,
          discount: 0,
        },
      ]);
    }
  };
  
  const calculateTotals = () => {
    const subtotal = orderItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const totalDiscount = orderItems.reduce(
      (sum, item) => sum + (item.discount || 0),
      0
    );
    return {
      subtotal,
      discount: totalDiscount,
      total: subtotal - totalDiscount,
    };
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
        <OrderTable tType="pos" products={orderItems} setProducts={setOrderItems}/>
        <ActionContainer>
          <DisplayTotal totals={calculateTotals()}/>
        </ActionContainer>
      </div>
    </div>
  );
}

export default Pos;
