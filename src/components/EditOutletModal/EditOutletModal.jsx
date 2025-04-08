import React, { useState, useEffect } from "react";
import { updateOutlet } from "../../api/outlet_service/outletController";
import LoadingWheel from "../loadingWheel/LoadingWheel";

const EditOutletModal = ({ isOpen, onClose, outlet, onSaveSuccess }) => {
  const [formData, setFormData] = useState({
    outletName: "",
    location: "",
    status: "Active",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (outlet) {
      setFormData({
        outletName: outlet.outletName || "",
        location: outlet.location || "",
        status: outlet.status || "Active",
      });
    }
  }, [outlet]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!outlet || !outlet.outletId) {
        throw new Error("Outlet ID is missing");
      }

      setLoading(true);
      await updateOutlet(outlet.outletId, formData);
      setLoading(false);

      onSaveSuccess();
      onClose();
    } catch (error) {
      console.error("Error updating outlet:", error);
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Edit Outlet</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-gray-700">Outlet Name</label>
            <input
              type="text"
              required
              className="w-full p-2 border rounded border-pink-500 hover:border-pink-600 focus:outline-none focus:border-pink-600"
              value={formData.outletName}
              onChange={(e) =>
                setFormData({ ...formData, outletName: e.target.value })
              }
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-gray-700">Location</label>
            <input
              type="text"
              required
              className="w-full p-2 border rounded border-pink-500 hover:border-pink-600 focus:outline-none focus:border-pink-600"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-gray-700">Status</label>
            <select
              className="w-full p-2 border rounded border-pink-500 hover:border-pink-600 focus:outline-none focus:border-pink-600"
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-pink-500 text-pink-500 rounded hover:bg-pink-100 transition-colors"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 transition-colors flex items-center justify-center gap-2"
              disabled={loading}
            >
              {loading ? <>Updating...</> : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditOutletModal;
