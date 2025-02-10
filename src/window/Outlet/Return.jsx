import React from "react";
import CardContainer from "../../components/cardContainer/CardContainer";
import Table from "../../components/PosTable/OrderTable";
import ItemCard from "../../components/itemCard/ItemCard";
import ActionContainer from "../../components/ActionContainer/ActionContainer";
import OrderAction from "../../components/OrderAction/OrderAction";
import ReturnAction from "../../components/ReturnAction/ReturnAction";


function Return() {
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
        <Table />
        <ActionContainer>
          <ReturnAction/>
        </ActionContainer>
      </div>
    </div>
  );
}

export default Return;
