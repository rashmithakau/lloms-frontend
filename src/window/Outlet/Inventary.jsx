import React, { useContext } from "react";
import InventoryTable from "../../components/PosTable/InventoryTable";
import AuthContext from "../../context/AuthContext";

function Inventary() {
  const { outletId } = useContext(AuthContext);

  return (
    <div>
      <InventoryTable outletId={outletId} type="outlet" />
    </div>
  );
}

export default Inventary;
