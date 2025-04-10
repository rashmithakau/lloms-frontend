import React from "react";
import defaultImage from "../../assets/Empty image.jpg"

function OutletCard({ outlet = {}, onClick }) {
  const filename = outlet.imageUrl ? outlet.imageUrl.split('/').pop().split('\\').pop() : '';
  const imageSrc = filename
      ? `http://localhost:8088/api/v1/outlet/url/${filename}`
      : defaultImage;

  // Determine status classes and text based on outlet.status string
  const statusClasses = outlet.status === "Active"
      ? "bg-green-100 text-green-700"
      : "bg-red-100 text-red-700";
  const statusText = outlet.status
      ? outlet.status.charAt(0).toUpperCase() + outlet.status.slice(1).toLowerCase()
      : "Inactive"; // Fallback in case status is missing

  return (
      <div
          onClick={onClick}
          className="group border-[2px] shadow-md border-pink-200 rounded-tl-4xl rounded-br-4xl rounded-bl-md rounded-tr-md bg-white flex flex-col items-start transition-transform transform hover:scale-105 hover:shadow-lg hover:border-pink-500 min-w-55"
      >
        <img
            src={imageSrc}
            alt={outlet.outletName}
            className="w-full h-48 object-cover rounded-tl-4xl rounded-br-4xl rounded-tr-md rounded-bl-md transition-transform transform group-hover:brightness-90"
        />

        <div className="p-4 flex flex-col w-full space-y-2">
          <div className="flex justify-between items-center">
            <p className="font-semibold text-sm text-[#2C3E50] font-poppins">
              {outlet.outletName}
            </p>
            <div className={`text-xs font-bold px-3 py-1 rounded-full ${statusClasses}`}>
              {statusText}
            </div>
          </div>

          <p className="text-sm text-[#2C3E50]/80 font-poppins truncate">
            📍 {outlet.location}
          </p>
        </div>
      </div>
  );
}

export default OutletCard;