import React from "react";
import CardContainer from "../cardContainer/CardContainer";
import ItemCard from "../itemCard/ItemCard";

function ItemList() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <CardContainer>
        {Array.from({ length: 30 }).map((_, index) => (
          <ItemCard key={index} />
        ))}
      </CardContainer>
    </div>
  );
}

export default ItemList;
