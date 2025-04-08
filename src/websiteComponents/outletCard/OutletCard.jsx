import React from "react";
import "./OutletCard.css";
import { FaMapMarkerAlt, FaPhone, FaInfoCircle } from "react-icons/fa";
import { MdOutlineVerified } from "react-icons/md";

function OutletCard({ outlet }) {
  return (
      <div className="font-poppins border-2 border-[#F4952C]/20 rounded-2xl p-6 shadow-sm flex flex-col items-center transition-transform transform hover:scale-105 cursor-pointer w-56 h-80 my-3 hover:shadow-lg relative group hover:border-3 hover:border-[#F4952C]/90">
        <div className="absolute rounded-2xl inset-0 bg-[#F4952C]/30 group-hover:h-full transition-all duration-400 ease-in-out h-0 -z-10"></div>

        <h3 className="text-black font-bold text-lg text-center mb-2">
          {outlet.outletName}
          {outlet.status === 'Active' &&
              <MdOutlineVerified className="inline-block ml-1 text-green-500" />}
        </h3>

        <img
            src={`http://localhost:8088/api/v1/outlet/url/${outlet.imageUrl}`}
            alt={outlet.outletName}
            className="w-24 h-24 rounded-full my-2 border-4 border-[#F4952C]/90 shadow-lg object-cover"
        />

        <div className="w-full mt-2 space-y-2">
          <div className="flex items-center text-sm">
            <FaMapMarkerAlt className="text-[#F4952C] mr-2 flex-shrink-0" />
            <span className="text-gray-600 truncate">{outlet.location}</span>
          </div>

          <div className="flex items-center text-sm">
            <div className={`w-3 h-3 rounded-full mr-2 
            ${outlet.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`} />
            <span className={`font-medium ${
                outlet.status === 'Active' ? 'text-green-600' : 'text-red-600'
            }`}>
            {outlet.status}
          </span>
          </div>

          {outlet.phone && (
              <div className="flex items-center text-sm">
                <FaPhone className="text-[#F4952C] mr-2 flex-shrink-0" />
                <span className="text-gray-600">{outlet.phone}</span>
              </div>
          )}

          {outlet.description && (
              <div className="flex items-start text-sm">
                <FaInfoCircle className="text-[#F4952C] mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-600 text-justify">{outlet.description}</span>
              </div>
          )}
        </div>
      </div>
  );
}

export default OutletCard;