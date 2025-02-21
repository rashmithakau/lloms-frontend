import React from "react";
import OutletCard from "../OutletCard/OutletCard";

const OutletList = ({ outlets }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 bg-gray-100 min-h-screen">
      {outlets.map((outlet, index) => (
        <OutletCard 
          key={index} 
          photo={outlet.photo} 
          location={outlet.location} 
          isActive={outlet.isActive} 
        />
      ))}
    </div>
  );
};

export default OutletList;
