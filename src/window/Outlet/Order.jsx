import React from "react";
import CardContainer from "../../components/cardContainer/CardContainer";
import OrderTable from "../../components/PosTable/OrderTable";
import ItemCard from "../../components/itemCard/ItemCard";
import ActionContainer from "../../components/ActionContainer/ActionContainer";
import OrderAction from "../../components/OrderAction/OrderAction";
import ReturnAction from "../../components/ReturnAction/ReturnAction";
import Image from "../../assets/2254.jpg_wh860.jpg";

function Order() {
  const items = Array.from({ length: 30 }).map((_, index) => ({
    image: Image,
    productId: `PD/${String(index + 1).padStart(3, "0")}`,
    stock: 10,
    productName: "Cream Cake",
    price: 100.0,
  }));

  return (
    <div>
      <div className="flex justify-center items-center my-2">
        <CardContainer>
          {items.map((item, index) => (
            <ItemCard key={index} item={item} />
          ))}
        </CardContainer>
      </div>
      <div className="flex">
        <OrderTable tType="order" />
        <ActionContainer>
          <OrderAction />
        </ActionContainer>
      </div>
    </div>
  );
}

export default Order;