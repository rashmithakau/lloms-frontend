import React from "react";
import OutletCard from "../OutletCard/OutletCard";

const OutletList = ({ outlets, onCardClick}) => {

  // Check if outlets is an array before trying to map over it
  if (!Array.isArray(outlets)) {
    return <p>Loading or Error: outlets data is not available.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 bg-gray-100 min-h-screen">
      {outlets.length > 0 ? (
        outlets.map((outlet, index) => (
          <OutletCard 
            key={index} 
            outlet={outlet}  // Make sure to pass the full outlet object here
            onClick={() => onCardClick(outlet)}
          />
        ))
      ) : (
        <p>Loading or Error: outlets data is not available.</p>
      )}

    </div>
  );
};

export default OutletList;
