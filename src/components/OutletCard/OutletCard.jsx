import React from "react";

function OutletCard({ outlet = [], onClick }) {  
  const statusClasses = outlet.isActive
    ? "bg-green-100 text-green-700"
    : "bg-red-100 text-red-700";

  const statusText = outlet.isActive ? "Active" : "Inactive";

  return (
    <div
      onClick={onClick}
      className="group border-[2px] shadow-md border-pink-200  rounded-tl-4xl rounded-br-4xl rounded-bl-md rounded-tr-md bg-white flex flex-col items-start transition-transform transform hover:scale-105 hover:shadow-lg hover:border-pink-500 min-w-55"
    >
      {/* Outlet Image (Local Only) */}
      <img
        src={outlet.img}
        alt={outlet.name || "Outlet"}  
        className="w-full h-48 object-cover rounded-tl-4xl rounded-br-4xl rounded-tr-md rounded-bl-md transition-transform transform group-hover:brightness-90"
      />

      {/* Outlet Info */}
      <div className="p-4 flex flex-col w-full space-y-2">
        {/* Outlet Name and Status */}
        <div className="flex justify-between items-center">
          <p className="font-semibold text-sm text-[#2C3E50] font-poppins">
            {outlet.name || "Unknown Outlet"}  
          </p>
          <div
            className={`text-xs font-bold px-3 py-1 rounded-full ${statusClasses}`}
          >
            {statusText || "Unknown Status"}  
          </div>
        </div>

        {/* Address */}
        <p className="text-sm text-[#2C3E50]/80 font-poppins truncate">
          📍 {outlet.address || "Address not available"}  
        </p>

        {/* Mobile */}
        <p className="text-sm text-[#2C3E50]/70 font-poppins">
          📞 {outlet.mobile || "Contact not available"}  
        </p>
      </div>
    </div>
  );
}

export default OutletCard;
