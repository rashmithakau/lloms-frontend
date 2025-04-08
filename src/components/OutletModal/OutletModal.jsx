import React, { useState } from "react";
import { saveOutlet } from "../../api/outlet_service/outletController.js";
import Swal from "sweetalert2";

const OutletModal = ({ isOpen, onClose, onSaveSuccess }) => {
    const [formData, setFormData] = useState({
        outletName: "",
        location: "",
        status: "Inactive",
        imageFile: null
    });
    const [loading, setLoading] = useState(false); // Loading state

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true when the request starts

        const data = new FormData();
        data.append("outletName", formData.outletName);
        data.append("location", formData.location);
        data.append("status", formData.status);
        if (formData.imageFile) {
            data.append("imageFile", formData.imageFile);
        }

        try {
            await saveOutlet(data);
            onSaveSuccess();
            onClose();
            setLoading(false); // Set loading to false after successful request

            // Success SweetAlert
            Swal.fire({
                icon: "success",
                title: "Outlet Created Successfully!",
                showConfirmButton: false,
                timer: 1500
            });
        } catch (error) {
            console.error("Error saving outlet:", error);
            setLoading(false); // Set loading to false in case of error

            // Error SweetAlert
            Swal.fire({
                icon: "error",
                title: "Error saving outlet",
                text: "Please try again.",
                confirmButtonText: "Okay"
            });
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-transparent bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Create New Outlet</h2>

                {loading && (
                    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
                        <div className="spinner-border animate-spin text-pink-500 border-4 rounded-full w-12 h-12"></div>
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-2">Outlet Name</label>
                        <input
                            type="text"
                            required
                            className="w-full p-2 border rounded"
                            value={formData.outletName}
                            onChange={(e) => setFormData({ ...formData, outletName: e.target.value })}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2">Location</label>
                        <input
                            type="text"
                            required
                            className="w-full p-2 border rounded"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2">Status</label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded bg-gray-100"
                            value="Inactive"
                            readOnly
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2">Outlet Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setFormData({ ...formData, imageFile: e.target.files[0] })}
                            className="w-full"
                        />
                    </div>

                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border border-pink-500 text-pink-500 rounded hover:bg-pink-100"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
                        >
                            Save Outlet
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default OutletModal;
