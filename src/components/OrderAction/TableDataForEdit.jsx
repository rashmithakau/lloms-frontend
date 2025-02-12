import React, { useState } from "react";
import { FiEdit, FiTrash } from "react-icons/fi"; // Icons for edit and delete

const TableData = () => {
    const orders = [
        { id: "01", orderId: "FO/100001", outletName: "Mathara", date: "2025-01-01", time: "12:30 PM", status: "Confirmed" },
        { id: "02", orderId: "FO/100043", outletName: "Mathara", date: "2025-01-01", time: "12:30 PM", status: "Confirmed" },
        { id: "03", orderId: "FO/100054", outletName: "Mathara", date: "2025-01-01", time: "12:30 PM", status: "Confirmed" },
        { id: "04", orderId: "FO/100123", outletName: "Mathara", date: "2025-01-02", time: "01:00 PM", status: "Pending" },
    ];

    const [expandedOrder, setExpandedOrder] = useState(null);

    const toggleExpand = (orderId) => {
        setExpandedOrder(expandedOrder === orderId ? null : orderId);
    };

    return (
        <div className="container mx-auto p-4">

            {/* Table Header */}
            <div className="flex bg-200 mx-5 rounded-t-lg">
                <div className="w-1/5 text-black">Order ID</div>
                <div className="w-1/5 text-black">Outlet</div>
                <div className="w-1/5 text-black">Date</div>
                <div className="w-1/5 text-black">Time</div>
                <div className="w-1/5 text-black">Status</div>
            </div>

            {orders.map((order) => (
                <div key={order.id} className="border-1 border-[] rounded-lg mb-6">
                    {/* Main Order Row */}
                    <div className="flex items-center p-3 rounded-lg bg-transparent">
                        <div className="w-1/5 text-[#432634]">{order.orderId}</div>
                        <div className="w-1/5 text-[#432634]">{order.outletName}</div>
                        <div className="w-1/5 text-[#432634]">{order.date}</div>
                        <div className="w-1/5 text-[#432634]">{order.time}</div>
                        <div className="w-1/5 text-[#432634] flex justify-between items-center">
                            <select
                                className="border-2 border-[#432634] rounded-md text-[#432634] px-2 py-1"
                                defaultValue={order.status}
                            >
                                <option value="Confirmed">Confirmed</option>
                                <option value="Pending">Pending</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
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
                                <p className="text-[#432634]">No Data Available</p>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default TableData;
