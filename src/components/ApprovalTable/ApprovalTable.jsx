import React from "react";

function ApprovalTable({ rows, onApprove, onReject }) {
  return (
    <div className="w-full mx-auto overflow-auto border border-gray-300 rounded-lg shadow-lg">
      <table className="w-full border-collapse text-center">
        <thead className="bg-gray-200 sticky top-0 text-gray-700">
          <tr>
            <th className="p-3 border-b">Date</th>
            <th className="p-3 border-b">Time</th>
            <th className="p-3 border-b">Description</th>
            <th className="p-3 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan="4" className="p-5 text-gray-600">
                No records found.
              </td>
            </tr>
          ) : (
            rows.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="p-3">{item.date}</td>
                <td className="p-3">{item.time}</td>
                <td className="p-3">{item.description}</td>
                <td className="p-3 flex justify-center gap-2">
                  <button
                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-700"
                    onClick={() => onApprove(item.id)}
                  >
                    Approve
                  </button>
                  <button
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-700"
                    onClick={() => onReject(item.id)}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ApprovalTable;
