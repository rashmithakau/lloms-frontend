import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const itemsData = {
  "Item A": [
    { name: "Outlet 1", value: 30 },
    { name: "Outlet 2", value: 25 },
    { name: "Outlet 3", value: 20 },
    { name: "Outlet 4", value: 15 },
    { name: "Outlet 5", value: 10 },
  ],
  "Item B": [
    { name: "Outlet 1", value: 20 },
    { name: "Outlet 2", value: 30 },
    { name: "Outlet 3", value: 25 },
    { name: "Outlet 4", value: 15 },
    { name: "Outlet 5", value: 10 },
  ],
  "Item C": [
    { name: "Outlet 1", value: 15 },
    { name: "Outlet 2", value: 20 },
    { name: "Outlet 3", value: 30 },
    { name: "Outlet 4", value: 25 },
    { name: "Outlet 5", value: 10 },
  ],
};

const COLORS = ["#3498db", "#f39c12", "#9b59b6", "#e74c3c", "#2ecc71"];

function SalesStats() {
  const [selectedItem, setSelectedItem] = useState("Item A");
  const data = itemsData[selectedItem];
  const totalSales = data.reduce((sum, outlet) => sum + outlet.value, 0);

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-full  h-auto">
      <h2 className="text-2xl font-semibold text-gray-800">Sales Stats</h2>
      <p className="text-gray-500 mb-4">Average sales percentage for top 5 outlets</p>

      <select
        className="mb-6 p-2 border rounded text-gray-700 w-full md:w-1/3"
        value={selectedItem}
        onChange={(e) => setSelectedItem(e.target.value)}
      >
        {Object.keys(itemsData).map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      <div className="w-full h-[300px] md:h-[350px] lg:h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
              label={({ name }) => name}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              content={({ payload }) => {
                if (payload && payload.length) {
                  const { name, value } = payload[0].payload;
                  const percentage = ((value / totalSales) * 100).toFixed(1);
                  return (
                    <div className="p-2 bg-white rounded shadow-md">
                      <p className="text-gray-800 font-semibold">{name}</p>
                      <p className="text-gray-600">{`Sales: ${value}`}</p>
                      <p className="text-gray-600">{`Percentage: ${percentage}%`}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4 border-t pt-4">
        {data.map((outlet, index) => (
          <div key={index} className="text-center">
            <span
              className="block w-3 h-3 mx-auto rounded-full"
              style={{ backgroundColor: COLORS[index] }}
            ></span>
            <p className="text-sm text-gray-600">{outlet.name}</p>
            <p className="text-lg font-semibold text-gray-800">
              {((outlet.value / totalSales) * 100).toFixed(1)}%
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SalesStats;
