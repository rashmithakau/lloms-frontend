import React, { useState, useEffect } from "react";
import CardContainer from "../../components/cardContainer/CardContainer";
import LoadingWheel from "../../components/loadingWheel/LoadingWheel"; // Import LoadingWheel
import OutletCard from "../../components/OutletCard/OutletCard";

function Outlet() {
  const [loading, setLoading] = useState(true);
  const [outlets, setOutlets] = useState([]);

  useEffect(() => {
    // Simulating data fetching with a delay
    setTimeout(() => {
      setOutlets([
        {
          id: 1,
          name: "Downtown Outlet",
          address: "123 Main St, Colombo",
          mobile: "+94 71 234 5678",
          isActive: true,
          img: "src/assets/profileImages/mathara.jpg",
        },
        {
          id: 2,
          name: "Uptown Outlet",
          address: "456 High St, Colombo",
          mobile: "+94 71 876 5432",
          isActive: false,
          img: "src/assets/profileImages/mathara.jpg",
        },
        {
          id: 3,
          name: "Uptown Outlet",
          address: "456 High St, Colombo",
          mobile: "+94 71 876 5432",
          isActive: false,
          img: "src/assets/profileImages/mathara.jpg",
        },
        {
          id: 4,
          name: "Uptown Outlet",
          address: "456 High St, Colombo",
          mobile: "+94 71 876 5432",
          isActive: false,
          img: "src/assets/profileImages/mathara.jpg",
        },
        {
          id: 5,
          name: "Uptown Outlet",
          address: "456 High St, Colombo",
          mobile: "+94 71 876 5432",
          isActive: false,
          img: "src/assets/profileImages/mathara.jpg",
        },
        {
          id: 6,
          name: "Uptown Outlet",
          address: "456 High St, Colombo",
          mobile: "+94 71 876 5432",
          isActive: false,
          img: "src/assets/profileImages/mathara.jpg",
        },
        {
          id: 7,
          name: "Uptown Outlet",
          address: "456 High St, Colombo",
          mobile: "+94 71 876 5432",
          isActive: false,
          img: "src/assets/profileImages/mathara.jpg",
        },
        {
          id: 8,
          name: "Uptown Outlet",
          address: "456 High St, Colombo",
          mobile: "+94 71 876 5432",
          isActive: false,
          img: "src/assets/profileImages/mathara.jpg",
        },
        {
          id: 9,
          name: "Uptown Outlet",
          address: "456 High St, Colombo",
          mobile: "+94 71 876 5432",
          isActive: false,
          img: "src/assets/profileImages/mathara.jpg",
        },
        {
          id: 10,
          name: "Uptown Outlet",
          address: "456 High St, Colombo",
          mobile: "+94 71 876 5432",
          isActive: false,
          img: "src/assets/profileImages/mathara.jpg",
        },
        {
          id: 11,
          name: "Uptown Outlet",
          address: "456 High St, Colombo",
          mobile: "+94 71 876 5432",
          isActive: false,
          img: "src/assets/profileImages/mathara.jpg",
        },
        {
          id: 12,
          name: "Uptown Outlet",
          address: "456 High St, Colombo",
          mobile: "+94 71 876 5432",
          isActive: false,
          img: "src/assets/profileImages/mathara.jpg",
        },
        {
          id: 13,
          name: "Uptown Outlet",
          address: "456 High St, Colombo",
          mobile: "+94 71 876 5432",
          isActive: false,
          img: "src/assets/profileImages/mathara.jpg",
        },
        {
          id: 14,
          name: "Uptown Outlet",
          address: "456 High St, Colombo",
          mobile: "+94 71 876 5432",
          isActive: false,
          img: "src/assets/profileImages/mathara.jpg",
        },
        {
          id: 15,
          name: "Uptown Outlet",
          address: "456 High St, Colombo",
          mobile: "+94 71 876 5432",
          isActive: false,
          img: "src/assets/profileImages/mathara.jpg",
        },
      ]);
      setLoading(false); // Stop loading after data is set
    }, 1000); // Simulated loading time (1 second)
  }, []);

  return (
    <div className="p-2">
      <CardContainer h="90vh">
        {loading ? (
          <div className="text-center text-gray-600 py-5 text-lg">
            <LoadingWheel />
          </div>
        ) : outlets.length > 0 ? ( // Check if outlets exist
          outlets.map((outlet) => (
            <OutletCard
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
