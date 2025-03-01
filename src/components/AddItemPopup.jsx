import { useState } from "react";
import Popup from "./Popup";
import InputField from "./InputField";

const AddItemPopup = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [formData, setFormData] = useState({
    productId: "",
    productName: "",
    measuringType: "",
    unitPrice: "",
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("Saving item:", formData);
    setIsPopupOpen(false);
  };

  return (
    <div className="p-6 flex items-center justify-center min-h-screen bg-pink-100">
      <button
        onClick={() => setIsPopupOpen(true)}
        className="bg-pink-500 text-white px-6 py-3 rounded-full font-semibold shadow-md hover:bg-pink-600 transition"
      >
        + Add New Item
      </button>

      <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
        <h2 className="text-2xl font-bold mb-4 text-pink-600 text-center">
          Add New Item
        </h2>
        <div className="space-y-4">
          {[
            { label: "Product Id", name: "productId", type: "text" },
            { label: "Product Name", name: "productName", type: "text" },
            { label: "Measuring Type", name: "measuringType", type: "text" },
            { label: "Unit Price (R$)", name: "unitPrice", type: "number" },
          ].map(({ label, name, type }) => (
            <InputField
              key={name}
              label={label}
              type={type}
              value={formData[name]}
              onChange={handleChange}
            />
          ))}
          <InputField
            label="Photo"
            type="file"
            onChange={(e) =>
              setFormData({ ...formData, photo: e.target.files[0] })
            }
          />
          <div className="flex justify-end space-x-4 mt-4">
            <button
              onClick={() => setIsPopupOpen(false)}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="bg-pink-500 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-pink-600 transition"
            >
              Save
            </button>
          </div>
        </div>
      </Popup>
    </div>
  );
};

export default AddItemPopup;
