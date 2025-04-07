import React from "react";
import defaultImage from "../../assets/Empty image.jpg"

function OutletCard({ outlet = [], onClick }) {
  
  const isActive = outlet.status === "Active";
  const statusClasses = isActive
    ? "bg-green-100 text-green-700"
    : "bg-red-100 text-red-700";

  

  // // Check if imageUrl exists and replace backslashes with slashes
  // const imageUrl = outlet.imageUrl
  //   ? `http://localhost:8088/api/v1/outlet/url/${outlet.imageUrl.replace(/\\/g, "/")}`
  //   : defaultImage; // Use default image if no imageUrl is provided

  // console.log("Image URL:", imageUrl); // For debugging

  const imageName = outlet.imageUrl ? outlet.imageUrl.split("\\").pop() : null;
    const imageSrc = imageName
      ? `http://localhost:8088/api/v1/outlet/url/${imageName}`
      : defaultImage;
  
      console.log("Image URL:", imageSrc);


  return (
    <div
      onClick={onClick}
      className="group border-[2px] shadow-md border-pink-200  rounded-tl-4xl rounded-br-4xl rounded-bl-md rounded-tr-md bg-white flex flex-col items-start transition-transform transform hover:scale-105 hover:shadow-lg hover:border-pink-500 min-w-55"
    >
      {/* Outlet Image (Local Only) */}
      <img
        src={imageSrc}  // Use the constructed URL to fetch the image
        onError={(e) => {
          e.target.onerror = null; // Prevent endless loop
          e.target.src = defaultImage; // Fallback if image fails to load
        }}
        alt={outlet.outletName || "Outlet"}  
        className="w-full h-48 object-cover rounded-tl-4xl rounded-br-4xl rounded-tr-md rounded-bl-md transition-transform transform group-hover:brightness-90"
      />

      {/* Outlet Info */}
      <div className="p-4 flex flex-col w-full space-y-2">
        {/* Outlet Name and Status */}
        <div className="flex justify-between items-center">
          <p className="font-semibold text-sm text-[#2C3E50] font-poppins">
            {outlet.outletName || "Unknown Outlet"}  
          </p>
          <div
            //className={`text-xs font-bold px-3 py-1 rounded-full ${statusClasses}`}
            className={`text-xs font-bold px-3 py-1 rounded-full ${statusClasses}`}
          >
            

            {outlet.status || "Unknown Status"}


          </div>
        </div>

        {/* Address */}
        <p className="text-sm text-[#2C3E50]/80 font-poppins truncate">
          📍 {outlet.location || "Address not available"}  
        </p>

      </div>
    </div>
  );
}

export default OutletCard;
