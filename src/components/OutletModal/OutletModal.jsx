import React, { useState } from "react";
import { saveOutlet } from "../../api/outlet_service/outletController.js";

const OutletModal = ({ isOpen, onClose, onSaveSuccess }) => {
    const [formData, setFormData] = useState({
        outletName: "",
        location: "",
        status: "Active",
        imageFile: null
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
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
        } catch (error) {
            console.error("Error saving outlet:", error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-transparent bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Create New Outlet</h2>
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
                        <select
                            className="w-full p-2 border rounded"
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
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