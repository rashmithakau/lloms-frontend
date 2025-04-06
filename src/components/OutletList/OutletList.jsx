import React from "react";
import OutletCard from "../OutletCard/OutletCard.jsx";

export default function OutletList({ outlets }) {
  return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {outlets.map((outlet) => (
            <OutletCard key={outlet.id} outlet={outlet} />
        ))}
      </div>
  );
}
