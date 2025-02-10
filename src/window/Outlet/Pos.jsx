import React from "react";
import CardContainer from "../../components/cardContainer/CardContainer";
import Table from "../../components/PosTable/OrderTable";
import DisplayTotal from "../../components/DisplayTotal/DisplayTotal";
import ItemCard from "../../components/itemCard/ItemCard";

function Pos() {
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
        <DisplayTotal />
      </div>
    </div>
  );
}

export default Pos;
