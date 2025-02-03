import React from "react";
import image from "../../assets/profileImages/mathara.jpg";
import "./OutletCard.css"

function OutletCard({ outlet }) {
  return (
    <div
      className="font-poppins border-2 border-[#F4952C]/20 rounded-2xl p-6 shadow-sm flex flex-col items-center transition-transform transform hover:scale-105 cursor-pointer w-56 h-80 my-3 hover:shadow-lg relative group hover:border-3 hover:border-[#F4952C]/90"
      onClick={() => (window.location.href = `/outlet/${outlet.id}`)}
    >
      <div className="absolute rounded-2xl inset-0 bg-[#F4952C]/30 group-hover:h-full transition-all duration-400 ease-in-out h-0 -z-10"></div>
      <h3 className="text-black font-bold text-lg">{outlet.name}</h3>
      <img
        src={image}
        alt={outlet.name}
        className="w-24 h-24 rounded-full my-2 border-4 border-[#F4952C]/90 shadow-lg "
      />
      <p className="text-black mt-2 z-10">{outlet.phone}</p>
      <p className="text-black text-sm text-center mt-2">
        {outlet.description}
      </p>
    </div>
  );
}

export default OutletCard;