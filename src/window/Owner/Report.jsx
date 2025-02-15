import React from "react";
import RecentOrdersChart from "../../components/Charts/RecentOrdersChart/RecentOrdersChart";
import TopProducts from "../../components/TopProducts/TopProducts";
import SalesComparisonChart from "../../components/Charts/SalesComparisonChart/SalesComparisonChart";

function Report() {
  return (
    <div>
      <div className="w-full">
        <div className="flex justify-center">
          <div className="w-[50%] h-[50%]">
            <RecentOrdersChart />
          </div>
          <div className="w-[50%] h-[50%]">
            <TopProducts />
          </div>
        </div>
        <div>
          <SalesComparisonChart />
        </div>
      </div>
    </div>
  );
}

export default Report;
