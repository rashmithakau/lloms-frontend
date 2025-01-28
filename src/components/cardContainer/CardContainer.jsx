import React from "react";

function CardContainer({ children }) {
  return (
    <div
      className="w-full bg-white border-[2px] border-black/20 shadow-lg rounded-lg overflow-auto p-4 grid gap-4 mx-10"
      style={{
        gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
        maxHeight: "55vh",
      }}
    >
      {children}
    </div>
  );
}

export default CardContainer;
