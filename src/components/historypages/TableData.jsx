import React, { useState } from "react";

const TableData = () => {
    const orders = [
        { id: "01", orderId: "FO/100001", date: "2025-01-01", time: "12:30 PM", status: "Confirmed" },
        { id: "02", orderId: "FO/100043", date: "2025-01-01", time: "12:30 PM", status: "Confirmed" },
        { id: "03", orderId: "FO/100054", date: "2025-01-01", time: "12:30 PM", status: "Confirmed" },
        { id: "04", orderId: "FO/100123", date: "2025-01-02", time: "01:00 PM", status: "Pending" },
    ];

    const [expandedOrder, setExpandedOrder] = useState(null);

    const toggleExpand = (orderId) => {
        setExpandedOrder(expandedOrder === orderId ? null : orderId);
    };

    return (
        <div>
            <table className="table w-full">
                <thead>
                <tr className="bg-200 text-left">
                    <th className="p-3 text-black">Order ID</th>
                    <th className="p-3 text-black">Date</th>
                    <th className="p-3 text-black">Time</th>
                    <th className="p-3 text-black">Status</th>
                    <th className="p-3 text-black"></th>
                </tr>
                </thead>
                <tbody>
                {orders.map((order) => (
                    <React.Fragment key={order.id}>
                        {/* Main Order Row */}
                        <tr className="hover:bg-red-200">
                            <td className="p-3 text-black">{order.orderId}</td>
                            <td className="p-3 text-black">{order.date}</td>
                            <td className="p-3 text-black">{order.time}</td>
                            <td className="p-3 text-black">{order.status}</td>
                            <td className="p-3">
                                <button
                                    className="px-6 py-2 text-base font-semibold text-black bg-500 border-2 border-black rounded-full hover:bg-pink-400 hover:border-transparent hover:text-white transition duration-300"
                                    onClick={() => toggleExpand(order.id)}
                                    style={{ minWidth: "120px" }} // Ensures consistent width
                                >
                                    {expandedOrder === order.id ? "Less" : "See More"}
                                </button>

                            </td>
                        </tr>

                        {/* Expanded Section */}
                        {expandedOrder === order.id && (
                            <tr>
                                <td colSpan="5">
                                    <div className="p-10 rounded-lg text-center bg-transparent">
                                        <p className="text-black">No Data Available</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </React.Fragment>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableData;
