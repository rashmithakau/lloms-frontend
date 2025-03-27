import React from "react";
import BillTable from "../../components/PosTable/BillTable";
import Dropdown from "../../components/Dropdown/Dropdown";

function Billing() {
  return (
    <div>
      <div>
        <div className="">Filter</div>
      </div>
      <div className="">
        <Dropdown categoryList={["cdscds", "fdefs"]} />
      </div>
      <BillTable />
    </div>
  );
}

export default Billing;
