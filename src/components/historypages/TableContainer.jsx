import React from "react";
import TableData from "./TableData.jsx";

const TableContainer = () => {
    return (
        <div
            className="max-h-[60vh] overflow-y-auto"
            style={{
                scrollbarWidth: "thin", // For Firefox
                scrollbarColor: "#dba799 #f1f1f1", // New color for thumb and light gray track
            }}
        >
            {/* Webkit scrollbar customization */}
            <style>
                {`
                ::-webkit-scrollbar {
                    width: 12px;
                }
                ::-webkit-scrollbar-track {
                    background: #f1f1f1;
                    border-radius: 6px;
                }
                ::-webkit-scrollbar-thumb {
                    background: #dba799; /* New scrollbar thumb color */
                    border-radius: 6px;
                }
                ::-webkit-scrollbar-thumb:hover {
                    background: #c48a74; /* Slightly darker shade for hover */
                }
                `}
            </style>
            <TableData />
        </div>
    );
};

export default TableContainer;
