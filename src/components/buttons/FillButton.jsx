import React from "react";

function FillButton({children,onClick}) {
  return (
    <button className="transition-transform transform hover:scale-108 hover:shadow-lg cursor-pointer bg-pink-500 text-white p-3 w-36 rounded-lg" onClick={onClick}>
      {children}
    </button>
  );
}

export default FillButton;
