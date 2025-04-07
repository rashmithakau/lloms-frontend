import React from "react";
import OutletList from "../../components/OutletList/OutletList.jsx";
import { useState, useEffect } from "react";
import axios from "axios";

function Outlet() {

  const [outlets, setOutlets] = useState([]);
  const [selectedOutlet, setSelectedOutlet] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8088/api/v1/outlet/get-all-outlets")
      .then(response => {
        console.log("API response:", response.data); // Log the response
        if (Array.isArray(response.data.data)) {
          setOutlets(response.data.data); // Access the data array from response.data.data
        } else {
          console.error("Unexpected API response format:", response.data);
        }
      })
      .catch(error => {
        console.error("Error fetching outlets:", error);
      });
  }, []);
  
  
  // This function is triggered when a card is clicked
  const handleCardClick = (outlet) => {
    console.log("Card clicked:", outlet);  // You can replace this with your logic (like opening a popup)
    // Example: Open a modal or display more information
  };

  return (
     <div>
        <OutletList outlets={outlets} onCardClick={handleCardClick} /> 
     </div>
  );
}

export default Outlet;
