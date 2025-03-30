import React from "react";
import SalesComparisonChart from "../../components/Charts/SalesComparisonChart/SalesComparisonChart";
import SalesStats from "../../components/Charts/SalesStats/SalesStats";
import HourlySalesStats from "../../components/Charts/HourlySalesStats/HourlySalesStats";
import ItemReturnStats from "../../components/Charts/ItemReturnStats/ItemReturnStats";
import CardContainer from "../../components/cardContainer/CardContainer";

function Report() {
  return (
    <CardContainer h="90vh">
      <div className="w-full p-5 space-y-5">
        {/* Sales Comparison Chart */}
        <SalesComparisonChart />

        {/* Flexbox layout for SalesStats and ItemReturnStats */}
        <div className="flex flex-wrap justify-between gap-5">
          <div className="w-full">
            <SalesStats />
          </div>
          <div className="w-full">
            <ItemReturnStats />
          </div>
        </div>

        {/* Hourly Sales Stats */}
        <div className="w-full">
          <HourlySalesStats />
        </div>
      </div>
    </CardContainer>
  );
}

export default Report;
