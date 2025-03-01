import React, { useState } from "react";
import ApprovalTable from "../../components/ApprovalTable/ApprovalTable";

const initialRows = [
  { id: 1, date: "2025-02-28", time: "10:00 AM", description: "Request A" },
  { id: 2, date: "2025-02-29", time: "11:30 AM", description: "Request B" },
];

function Approval() {
    const [rows, setRows] = useState(initialRows);

    const handleApprove = (id) => {
      alert(`Approved: ${id}`);
      setRows(rows.filter((row) => row.id !== id));
    };
  
    const handleReject = (id) => {
      alert(`Rejected: ${id}`);
      setRows(rows.filter((row) => row.id !== id));
    };
  
    return(<div>
        <h1>Approval</h1>
        <div className="w-full">
           <ApprovalTable rows={rows} onApprove={handleApprove} onReject={handleReject} />
          
        </div>
        
    </div>)
    
}

export default Approval;
