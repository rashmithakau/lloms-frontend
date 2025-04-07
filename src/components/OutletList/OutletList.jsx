import React from "react";
import OutletCard from "../OutletCard/OutletCard";
import CardContainer from "../cardContainer/CardContainer";
import LoadingWheel from "../loadingWheel/LoadingWheel";
import { useState } from "react";

const OutletList = ({ outlets, onCardClick}) => {

  // Check if outlets is an array before trying to map over it
  if (!Array.isArray(outlets)) {
    return <p>Loading or Error: outlets data is not available.</p>;
  }

   const [loading, setLoading] = useState(true);

  return (
    
    <div>
      <CardContainer h="77vh"   >
      {outlets.length > 0 ? (
        outlets.map((outlet, index) => (
          <OutletCard 
            key={index} 
            outlet={outlet}  // Make sure to pass the full outlet object here
            onClick={() => onCardClick(outlet)}
          />
        ))
      ) : (
        <LoadingWheel />
        
      )}
      </CardContainer>



    </div>
  );
};

export default OutletList;
