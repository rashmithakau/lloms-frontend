import React, { useState } from "react";

const TableData = () => {
    const orders = [
        { id: "01", orderId: "FO/100001", date: "2025-01-01", time: "12:30 PM", status: "Confirmed" },
        { id: "02", orderId: "FO/100043", date: "2025-01-01", time: "12:30 PM", status: "Confirmed" },
        { id: "03", orderId: "FO/100054", date: "2025-01-01", time: "12:30 PM", status: "Confirmed" },
        { id: "02", orderId: "FO/100043", date: "2025-01-01", time: "12:30 PM", status: "Confirmed" },
        { id: "03", orderId: "FO/100054", date: "2025-01-01", time: "12:30 PM", status: "Confirmed" },
        { id: "02", orderId: "FO/100043", date: "2025-01-01", time: "12:30 PM", status: "Confirmed" },
        { id: "03", orderId: "FO/100054", date: "2025-01-01", time: "12:30 PM", status: "Confirmed" },
        { id: "02", orderId: "FO/100043", date: "2025-01-01", time: "12:30 PM", status: "Confirmed" },
        { id: "03", orderId: "FO/100054", date: "2025-01-01", time: "12:30 PM", status: "Confirmed" },
        { id: "02", orderId: "FO/100043", date: "2025-01-01", time: "12:30 PM", status: "Confirmed" },
        { id: "03", orderId: "FO/100054", date: "2025-01-01", time: "12:30 PM", status: "Confirmed" },
        { id: "02", orderId: "FO/100043", date: "2025-01-01", time: "12:30 PM", status: "Confirmed" },
        { id: "03", orderId: "FO/100054", date: "2025-01-01", time: "12:30 PM", status: "Confirmed" },
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

            {orders.map((order) => (
                <div key={order.id} className="border-1 border-[#432634] rounded-lg mb-8">
                    {/* Main Order Row */}
                    <div className="flex items-center p-3  backdrop-blur rounded-lg">
                        <div className="w-1/5 text-[#432634]">{order.orderId}</div>
                        <div className="w-1/5 text-[#432634]">{order.date}</div>
                        <div className="w-1/5 text-[#432634]">{order.time}</div>
                        <div className="w-1/5 text-[#432634]">{order.status}</div>
                        <div className="w-1/5">
                            <button
                                className="px-1 py-2 text-base text-[#432634] bg-500 border-1 border-[#432634] rounded-full"
                                onClick={() => toggleExpand(order.id)}
                                style={{ minWidth: "120px" }}
                            >
                                {expandedOrder === order.id ? "Less" : "See More"}
                            </button>
                        </div>
                    </div>

                    {/* Expanded Section */}
                    {expandedOrder === order.id && (
                        <div className="p-4 border-t-1 border-[#432634]">
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