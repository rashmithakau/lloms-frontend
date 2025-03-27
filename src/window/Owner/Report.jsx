import React from "react";
import SalesComparisonChart from "../../components/Charts/SalesComparisonChart/SalesComparisonChart";
import SalesStats from "../../components/Charts/SalesStats/SalesStats";
import HourlySalesStats from "../../components/Charts/HourlySalesStats/HourlySalesStats";
import ItemReturnStats from "../../components/Charts/ItemReturnStats/ItemReturnStats";
import CardContainer from "../../components/cardContainer/CardContainer";

function Report() {
  return (
    <CardContainer h="90vh">
      <div>
        <div className="w-full">
          <div className="m-5">
            <SalesComparisonChart />
          </div>

          <div className="flex w-full justify-center ">
            <div className="m-5">
              <SalesStats />
            </div>
            <div>
              <ItemReturnStats />
            </div>
          </div>
          <div>
            <HourlySalesStats />
          </div>
        </div>
      </div>
    </CardContainer>
  );
}

export default Report;
