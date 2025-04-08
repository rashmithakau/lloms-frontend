import React, { useState } from "react";
import api from "../../api/api"; // Centralized API instance
import Swal from "sweetalert2"; // SweetAlert2 for notifications

function AddOutletStaffModal({ isOpen, onClose, outlets }) {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [outletID, setOutletID] = useState("");
    const [loading, setLoading] = useState(false); // Loading state

    const handleSave = async () => {
        setLoading(true); // Set loading to true when submitting form

        try {
            const newStaff = {
                userName,
                password,
                phoneNumber,
                outletID: outletID ? parseInt(outletID) : null, // Convert to number if selected
            };
            await api.post("/user/save-outlet-user", newStaff);
            setLoading(false); // Set loading to false after API response

            // Success SweetAlert
            Swal.fire({
                icon: "success",
                title: "Outlet Staff Added Successfully!",
                showConfirmButton: false,
                timer: 1500
            });

            // Reset form
            setUserName("");
            setPassword("");
            setPhoneNumber("");
            setOutletID("");
            onClose();
        } catch (error) {
            setLoading(false); // Set loading to false in case of error

            // Error SweetAlert
            Swal.fire({
                icon: "error",
                title: "Error adding outlet staff",
                text: "Please try again.",
                confirmButtonText: "Okay"
            });
            console.error("Error adding outlet staff:", error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-transparent bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">Add Outlet Staff</h2>

                {loading && (
                    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
                        <div className="spinner-border animate-spin text-pink-500 border-4 rounded-full w-12 h-12"></div>
                    </div>
                )}

                <form>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1">Username</label>
                        <input
                            type="text"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1">Phone Number</label>
                        <input
                            type="text"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1">Outlet</label>
                        <select
                            value={outletID}
                            onChange={(e) => setOutletID(e.target.value)}
                            className="w-full p-2 border rounded"
                            required
                        >
                            <option value="">Select Outlet</option>
                            {outlets.map((outlet) => (
                                <option key={outlet.outletId} value={outlet.outletId}>
                                    {outlet.outletName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border border-pink-500 text-pink-500 rounded hover:bg-pink-100 mr-2"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleSave}
                            className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
                        >
                            Save Staff
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddOutletStaffModal;
