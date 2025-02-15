import React from "react";
import CardContainer from "../../components/cardContainer/CardContainer";
import OrderTable from "../../components/PosTable/OrderTable";
import DisplayTotal from "../../components/DisplayTotal/DisplayTotal";
import ItemCard from "../../components/itemCard/ItemCard";
import ActionContainer from "../../components/ActionContainer/ActionContainer";
import Image from "../../assets/2254.jpg_wh860.jpg";

function Pos() {
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
        <OrderTable tType="pos" />
        <ActionContainer>
          <DisplayTotal />
        </ActionContainer>
      </div>
    </div>
  );
}

export default Pos;
