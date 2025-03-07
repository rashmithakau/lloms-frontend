import React, { useState } from "react";
import Dropdown2 from "../Dropdown2/Dropdown2";

const FactoryOrderTable = ({ orders }) => {
  const [statuses, setStatuses] = useState({});  // State to track status for each order

  const handleChange = (event, orderId) => {
    setStatuses((prev) => ({
      ...prev,
      [orderId]: event.target.value,
    }));
  };

  const options = [
    { value: "pending", label: "Pending" },
    { value: "confirmed", label: "Confirmed" },
  ];

  return (
    <div className="bg-gray-100 p-6 rounded-3xl">
      <div className="overflow-x-auto overflow-y-auto">
        <div className="max-h-[85vh] overflow-y-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead className="sticky top-0 bg-white">
              <tr className="text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">#</th>
                <th className="py-3 px-6 text-left">Order ID</th>
                <th className="py-3 px-6 text-left">Outlet Name</th>
                <th className="py-3 px-6 text-left">Date</th>
                <th className="py-3 px-6 text-left">Time</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-left"></th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {orders.map((order, index) => (
                <tr
                  key={order.orderId}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="font-medium">{index + 1}</span>
                    </div>
                  </td>
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="font-medium">FO/{order.orderId}</span>
                    </div>
                  </td>
                  <td className="py-3 px-6 text-left">
                    <div className="flex items-center">
                      <span>{order.outletName}</span>
                    </div>
                  </td>
                  <td className="py-3 px-6 text-left">
                    <div className="flex items-center">
                      <span>{order.date}</span>
                    </div>
                  </td>
                  <td className="py-3 px-6 text-left">
                    <div className="flex items-center">
                      <span>{order.time}</span>
                    </div>
                  </td>
                  <td className="py-3 px-6 text-left">
                    <Dropdown2
                      label="Status"
                      value={statuses[order.orderId] || order.status}
                      onChange={(e) => handleChange(e, order.orderId)}
                      options={options}
                    />
                  </td>
                  <td className="py-3 px-6 text-left">
                    <div className="flex items-center space-x-2">
                      <button className="bg-pink-500 text-white py-1 px-3 rounded-full shadow-md hover:bg-pink-600 transition duration-300">
                        See More
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FactoryOrderTable;
