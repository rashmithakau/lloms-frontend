import React from "react";
import OutletCard from "../OutletCard/OutletCard.jsx";
import CardContainer from "../cardContainer/CardContainer.jsx";
import LoadingWheel from "../loadingWheel/LoadingWheel.jsx";

export default function OutletList({ outlets, loading }) {
  return (
      <div>
        <CardContainer h="77vh">
        {loading ? (
          <div className="text-center text-gray-600 py-5 text-lg">
            <LoadingWheel />
          </div>
        ) :
          outlets.length === 0 ? (
            <p className="text-gray-500 text-lg text-center py-5">
              No Outlets Available
            </p>
          ) : (
              outlets.map((outlet) => (
                  <OutletCard key={outlet.id} outlet={outlet} />
              )))}
        </CardContainer>
      </div>
  );
}
