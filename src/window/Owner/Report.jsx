import React, { useState, useEffect } from "react";
import SalesComparisonChart from "../../components/Charts/SalesComparisonChart/SalesComparisonChart";
import SalesStats from "../../components/Charts/SalesStats/SalesStats";
import HourlySalesStats from "../../components/Charts/HourlySalesStats/HourlySalesStats";
import ItemReturnStats from "../../components/Charts/ItemReturnStats/ItemReturnStats";
import CardContainer from "../../components/cardContainer/CardContainer";

function Report() {
  // State to simulate loading
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a delay (e.g., fetching data)
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false after 2 seconds
    }, 1000);

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-opacity-50 backdrop-blur-md flex items-center justify-center z-50">
        <div className="spinner-border animate-spin text-pink-500 border-4 rounded-full w-12 h-12"></div>
      </div>
    );
  }

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
