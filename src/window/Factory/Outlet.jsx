import React from "react";
import OutletList from "../../components/OutletList/OutletList.jsx";

function Outlet() {
  const outletsData = [
    {
      photo: "src/assets/profileImages/mathara.jpg",
      location: "Colombo, Sri Lanka",
      isActive: true,
    },
    {
      photo: "src/assets/profileImages/mathara.jpg",
      location: "Galle, Sri Lanka",
      isActive: false,
    },
    {
      photo: "src/assets/profileImages/mathara.jpg",
      location: "Kandy, Sri Lanka",
      isActive: true,
    },
    {
      photo: "src/assets/profileImages/mathara.jpg",
      location: "Colombo, Sri Lanka",
      isActive: true,
    },
    {
      photo: "src/assets/profileImages/mathara.jpg",
      location: "Galle, Sri Lanka",
      isActive: false,
    },
    {
      photo: "src/assets/profileImages/mathara.jpg",
      location: "Kandy, Sri Lanka",
      isActive: true,
    },
  ];

  return (
    <div>
      <OutletList outlets={outletsData} />
    </div>
  );
}

export default Outlet;
