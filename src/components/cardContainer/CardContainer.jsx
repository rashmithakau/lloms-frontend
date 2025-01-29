import React from "react";

function CardContainer({ children }) {
  return (
    <div
    className="w-full bg-white border-[2px] border-black/30 shadow-lg rounded-lg overflow-auto px-6 py-6 
    grid gap-6 mx-7"
style={{
gridTemplateColumns: "repeat(auto-fit, minmax(185px, 1fr))", // Ensures dynamic column resizing
maxHeight: "60vh", // Improved height for better usability
}}
    >
      {children}
    </div>
  );
}

export default CardContainer;
