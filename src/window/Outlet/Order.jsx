import React from "react";
import CardContainer from "../../components/cardContainer/CardContainer";
import OrderTable from "../../components/PosTable/OrderTable";
import ItemCard from "../../components/itemCard/ItemCard";
import ActionContainer from "../../components/ActionContainer/ActionContainer";
import OrderAction from "../../components/OrderAction/OrderAction";


function Order() {
  return (
    <div>
      <div className="flex justify-center items-center my-2">
        <CardContainer>
          {Array.from({ length: 30 }).map((_, index) => (
            <ItemCard key={index} />
          ))}
        </CardContainer>
      </div>
      <div className="flex">
        <OrderTable tType="order"/>
        <ActionContainer>
          <OrderAction/>
        </ActionContainer>
      </div>
    </div>
  );
}

export default Order;
