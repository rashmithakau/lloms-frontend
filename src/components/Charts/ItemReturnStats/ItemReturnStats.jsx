import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

// Sample return data for different outlets and months
const returnData = {
  Matara: {
    January: [
      { item: "Bread", returns: 12 },
      { item: "Cake", returns: 5 },
      { item: "Pastry", returns: 7 },
      { item: "Cookies", returns: 9 },
      { item: "Muffin", returns: 10 },
    ],
    February: [
      { item: "Bread", returns: 10 },
      { item: "Cake", returns: 4 },
      { item: "Pastry", returns: 6 },
      { item: "Cookies", returns: 8 },
      { item: "Muffin", returns: 7 },
    ],
    March: [
      { item: "Bread", returns: 15 },
      { item: "Cake", returns: 6 },
      { item: "Pastry", returns: 9 },
      { item: "Cookies", returns: 12 },
      { item: "Muffin", returns: 14 },
    ],
  },
  Galle: {
    January: [
      { item: "Bread", returns: 8 },
      { item: "Cake", returns: 3 },
      { item: "Pastry", returns: 5 },
      { item: "Cookies", returns: 7 },
      { item: "Muffin", returns: 6 },
    ],
    February: [
      { item: "Bread", returns: 9 },
      { item: "Cake", returns: 2 },
      { item: "Pastry", returns: 4 },
      { item: "Cookies", returns: 5 },
      { item: "Muffin", returns: 4 },
    ],
    March: [
      { item: "Bread", returns: 11 },
      { item: "Cake", returns: 5 },
      { item: "Pastry", returns: 7 },
      { item: "Cookies", returns: 10 },
      { item: "Muffin", returns: 8 },
    ],
  },
  Weligama: {
    January: [
      { item: "Bread", returns: 7 },
      { item: "Cake", returns: 4 },
      { item: "Pastry", returns: 6 },
      { item: "Cookies", returns: 5 },
      { item: "Muffin", returns: 8 },
    ],
    February: [
      { item: "Bread", returns: 6 },
      { item: "Cake", returns: 3 },
      { item: "Pastry", returns: 5 },
      { item: "Cookies", returns: 6 },
      { item: "Muffin", returns: 7 },
    ],
    March: [
      { item: "Bread", returns: 9 },
      { item: "Cake", returns: 4 },
      { item: "Pastry", returns: 7 },
      { item: "Cookies", returns: 8 },
      { item: "Muffin", returns: 10 },
    ],
  },
  Baddegama: {
    January: [
      { item: "Bread", returns: 10 },
      { item: "Cake", returns: 6 },
      { item: "Pastry", returns: 4 },
      { item: "Cookies", returns: 8 },
      { item: "Muffin", returns: 5 },
    ],
    February: [
      { item: "Bread", returns: 9 },
      { item: "Cake", returns: 5 },
      { item: "Pastry", returns: 6 },
      { item: "Cookies", returns: 7 },
      { item: "Muffin", returns: 6 },
    ],
    March: [
      { item: "Bread", returns: 13 },
      { item: "Cake", returns: 7 },
      { item: "Pastry", returns: 8 },
      { item: "Cookies", returns: 9 },
      { item: "Muffin", returns: 11 },
    ],
  },
};

function ItemReturnStats() {
  const [selectedOutlet, setSelectedOutlet] = useState("Matara");
  const [selectedMonth, setSelectedMonth] = useState("January");

  const handleOutletChange = (e) => setSelectedOutlet(e.target.value);
  const handleMonthChange = (e) => setSelectedMonth(e.target.value);

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-full mx-auto h-auto">
      <h2 className="text-2xl font-semibold text-gray-800">Item Return Stats</h2>
      <p className="text-gray-500 mb-4">
        Analysis of returned items for the selected outlet and month
      </p>

      {/* Outlet Selector */}
      <div className="mb-4">
        <label className="text-gray-600 mr-2">Select Outlet:</label>
        <select
          value={selectedOutlet}
          onChange={handleOutletChange}
          className="border border-gray-300 rounded px-2 py-1 mb-2 w-full md:w-1/3"
        >
          {Object.keys(returnData).map((outlet) => (
            <option key={outlet} value={outlet}>
              {outlet}
            </option>
          ))}
        </select>
      </div>

      {/* Month Selector */}
      <div className="mb-4">
        <label className="text-gray-600 mr-2">Select Month:</label>
        <select
          value={selectedMonth}
          onChange={handleMonthChange}
          className="border border-gray-300 rounded px-2 py-1 w-full md:w-1/3"
        >
          {Object.keys(returnData[selectedOutlet]).map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>

      {/* Bar Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={returnData[selectedOutlet][selectedMonth]}
          margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="item" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="returns"
            fill="#3498db"
            barSize={30}
            name="Returns"
          />
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-4">
        <p className="text-center text-gray-600">
          Item return count for {selectedOutlet} - {selectedMonth}
        </p>
      </div>
    </div>
  );
}

export default ItemReturnStats;
