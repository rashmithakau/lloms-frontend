import React from 'react';
import backgroundImage from "../assets/orderhistory/background.png";
import Header from "../components/historypages/Header.jsx";
import TableData from "../components/historypages/TableData.jsx";

const OrderHistoryPage = () => {
    return (
        <div className="w-full min-h-screen bg-transparent relative">
            {/* Background Image with Blur */}
            <div
                className="absolute inset-0 bg-cover bg-center backdrop-blur-md"
                style={{ backgroundImage: `url(${backgroundImage})` }}
            ></div>

            {/* Main Content */}
            <div className="relative z-10 p-8">
                <Header />

                {/* Title */}
                <p className="text-3xl font-bold text-center">
                    Return History
                </p>
                    <TableData />
            </div>
        </div>
    );
};

export default OrderHistoryPage;
