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
        <div className="container mx-auto p-4">
            {/* Table Header */}
            <div className="flex bg-gray-200 p-3 rounded-t-lg mb-1">
                <div className="w-1/5 text-black font-bold">Order ID</div>
                <div className="w-1/5 text-black font-bold">Date</div>
                <div className="w-1/5 text-black font-bold">Time</div>
                <div className="w-1/5 text-black font-bold">Status</div>
                <div className="w-1/5"></div>
            </div>

            {orders.map((order) => (
                <div key={order.id} className="border-2 border-black rounded-lg mb-4">
                    {/* Main Order Row */}
                    <div className="flex items-center p-3 hover:bg-red-200">
                        <div className="w-1/5 text-black">{order.orderId}</div>
                        <div className="w-1/5 text-black">{order.date}</div>
                        <div className="w-1/5 text-black">{order.time}</div>
                        <div className="w-1/5 text-black">{order.status}</div>
                        <div className="w-1/5">
                            <button
                                className="px-6 py-2 text-base font-semibold text-black bg-500 border-2 border-black rounded-full hover:bg-pink-400 hover:border-transparent hover:text-white transition duration-300"
                                onClick={() => toggleExpand(order.id)}
                                style={{ minWidth: "120px" }}
                            >
                                {expandedOrder === order.id ? "Less" : "See More"}
                            </button>
                        </div>
                    </div>

                    {/* Expanded Section */}
                    {expandedOrder === order.id && (
                        <div className="p-4 border-t-2 border-black">
                            <div className="p-4 rounded-lg text-center bg-transparent">
                                <p className="text-black">No Data Available</p>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default TableData;