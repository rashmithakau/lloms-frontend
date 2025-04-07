import React, { useState, useEffect } from "react";
import CardContainer from "../../components/cardContainer/CardContainer";
import LoadingWheel from "../../components/loadingWheel/LoadingWheel"; // Import LoadingWheel
import OutletCardOwner from "../../components/OutletCard/OutletCardOwner";
import { getAllOutlets } from "../../api/outlet_service/outletController";

function Outlet() {
  const [loading, setLoading] = useState(true);
  const [outlets, setOutlets] = useState([]);

  useEffect(() => {
          fetchOutlets();
      }, []);
  
      const fetchOutlets = async () => {
          try {
              const data = await getAllOutlets();
              setOutlets(data);
          } catch (error) {
              console.error("Error fetching outlets:", error);
          } finally {
              setLoading(false);
            }
      };

  return (
    <div className="p-2">
      <CardContainer h="90vh">
        {loading ? (
          <div className="text-center text-gray-600 py-5 text-lg">
            <LoadingWheel />
          </div>
        ) : outlets.length > 0 ? ( // Check if outlets exist
          outlets.map((outlet) => (
            <OutletCardOwner
              key={outlet.id}
              outlet={outlet}
              onClick={() => console.log("Outlet clicked!", outlet.name)}
            />
          ))
        ) : (
          <div className="text-center text-gray-600 py-5 text-lg">
            No outlets available.
          </div>
        )}
      </CardContainer>
    </div>
  );
}

export default Outlet;
