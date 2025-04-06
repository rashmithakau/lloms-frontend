import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const outletSalesData = {
  "Galle": [
    { time: "8 AM", sales: 25 },
    { time: "9 AM", sales: 40 },
    { time: "10 AM", sales: 55 },
    { time: "11 AM", sales: 45 },
    { time: "12 PM", sales: 60 },
    { time: "1 PM", sales: 65 },
    { time: "2 PM", sales: 50 },
    { time: "3 PM", sales: 75 },
    { time: "4 PM", sales: 70 },
    { time: "5 PM", sales: 55 },
    { time: "6 PM", sales: 85 },
  ],
  "Matara": [
    { time: "8 AM", sales: 20 },
    { time: "9 AM", sales: 35 },
    { time: "10 AM", sales: 50 },
    { time: "11 AM", sales: 40 },
    { time: "12 PM", sales: 55 },
    { time: "1 PM", sales: 60 },
    { time: "2 PM", sales: 45 },
    { time: "3 PM", sales: 70 },
    { time: "4 PM", sales: 65 },
    { time: "5 PM", sales: 50 },
    { time: "6 PM", sales: 80 },
  ],
  "Weligama": [
    { time: "8 AM", sales: 18 },
    { time: "9 AM", sales: 30 },
    { time: "10 AM", sales: 42 },
    { time: "11 AM", sales: 36 },
    { time: "12 PM", sales: 50 },
    { time: "1 PM", sales: 58 },
    { time: "2 PM", sales: 47 },
    { time: "3 PM", sales: 60 },
    { time: "4 PM", sales: 62 },
    { time: "5 PM", sales: 53 },
    { time: "6 PM", sales: 78 },
  ],
  "Baddegama": [
    { time: "8 AM", sales: 15 },
    { time: "9 AM", sales: 28 },
    { time: "10 AM", sales: 38 },
    { time: "11 AM", sales: 33 },
    { time: "12 PM", sales: 44 },
    { time: "1 PM", sales: 52 },
    { time: "2 PM", sales: 43 },
    { time: "3 PM", sales: 55 },
    { time: "4 PM", sales: 57 },
    { time: "5 PM", sales: 48 },
    { time: "6 PM", sales: 70 },
  ],
};

function HourlySalesStats() {
  const [selectedOutlet, setSelectedOutlet] = useState("Galle");

  const handleOutletChange = (e) => {
    setSelectedOutlet(e.target.value);
  };

  const peakHour = outletSalesData[selectedOutlet].reduce((max, current) =>
    current.sales > max.sales ? current : max
  );

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-full mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-1">Hourly Sales Stats</h2>
      <p className="text-gray-500 mb-4 text-sm">
        Average sales throughout the day based on last year's data
      </p>

      {/* Outlet Selector */}
      <div className="mb-4">
        <label className="text-gray-600 mr-2">Select Outlet:</label>
        <select
          value={selectedOutlet}
          onChange={handleOutletChange}
          className="border border-gray-300 rounded px-2 py-1"
        >
          {Object.keys(outletSalesData).map((outlet) => (
            <option key={outlet} value={outlet}>
              {outlet}
            </option>
          ))}
        </select>
      </div>

      {/* Line Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={outletSalesData[selectedOutlet]}
          margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="sales"
            stroke="#3498db"
            strokeWidth={2}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="mt-4">
        <p className="text-center text-gray-600 text-sm">
          Average sales per hour for <strong>{selectedOutlet}</strong>
        </p>
        <p className="text-center text-green-600 text-sm mt-1">
          🟢 Peak Sales at <strong>{peakHour.time}</strong> ({peakHour.sales} sales)
        </p>
      </div>
    </div>
  );
}

export default HourlySalesStats;
