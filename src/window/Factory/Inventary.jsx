import React from "react";
import InventoryTable from "../../components/PosTable/InventoryTable";

function Inventary() {
  return (
    <div>
      <InventoryTable outletId={101} type="factory" />
    </div>
  );
}

export default Inventary;
