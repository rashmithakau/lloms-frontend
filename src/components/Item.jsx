import { useState } from "react";
import CloseIcon from "../assets/icons/closeButton.png";
import UploadImage from "../assets/icons/LoadImage.png";
import { addProduct } from "../api/product-service/productController";
import Swal from "sweetalert2";

function Item({ onClose, mode }) {
  const [productName, setProductName] = useState('');
  const [productCatagory, setProductCatagory] = useState('');
  const [productMeasuringUnitType, setProductMeasuringUnitType] = useState('');
  const [price, setPrice] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false); // ✅ Loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loading

    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("productCatagory", productCatagory);
    formData.append("productMeasuringUnitType", productMeasuringUnitType);
    formData.append("price", price);
    if (imageFile) {
      formData.append("ImageFile", imageFile);
    }

    try {
      const response = await addProduct(formData);
      if (response.status === 201) {
        Swal.fire({
            title: "Success",
            text: "Product Added successfully!",
            icon: "success",
            confirmButtonText: "OK",
            confirmButtonColor: "#ff69b4",
          });
        onClose();
      }
    } catch (error) {
      setErrorMessage("Error while saving the product. Please try again.");
      console.error("Error adding product:", error);
    } finally {
      setLoading(false); // Hide loading
    }
  };

  return (
    <div>
      {loading && (
        <div className="fixed inset-0  bg-opacity-40 z-50 flex items-center justify-center backdrop-blur-sm">
          <div className="bg-white px-6 py-4 rounded-xl shadow-lg text-center">
            <div className="w-12 h-12 border-4 border-t-4 border-gray-200 border-t-pink-400 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-700 font-semibold">Please wait...</p>
          </div>
        </div>
      )}

      <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center z-40">
        <div className="w-[600px] h-[500px] bg-white border border-gray-300 rounded-2xl shadow-lg shadow-gray-100 p-6 mt-3">
          <div className="flex justify-between">
            <div></div>
            <div className="flex justify-center">
              <h1 className="text-pink-400 text-2xl font-bold">
                {mode === "update" ? "Product Details" : "Add New Item"}
              </h1>
            </div>
            <div className="flex justify-end mr-1">
              <button onClick={() => onClose()}>
                <img src={CloseIcon} alt="Close" className="w-6 h-6" />
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="flex justify-center mt-3">
              <div className="grid grid-cols-2 gap-5">
                <label className="text-gray-700 text-lg font-medium ml-5">Product Name</label>
                <input
                  type="text"
                  value={productName}
                  className="md:w-[250px] sm:w-[150px] w-[100px] h-[30px] px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600 focus:outline-none"
                  onChange={(e) => setProductName(e.target.value)}
                  required
                />

                <label className="text-gray-700 text-lg font-medium ml-5">Catagory</label>
                <select
                  className="md:w-[250px] sm:w-[150px] w-[100px] h-[30px] border border-gray-300 rounded-md bg-gray-100 text-gray-600 focus:outline-none px-3"
                  value={productCatagory}
                  onChange={(e) => setProductCatagory(e.target.value)}
                  required
                >
                  <option value="">--</option>
                  <option value="BREADS">Breads</option>
                  <option value="CAKES">Cakes</option>
                  <option value="BISCUITS">Biscuits</option>
                  <option value="SHORTIES">Shorties</option>
                  <option value="OTHER">Other</option>
                </select>

                <label className="text-gray-700 text-lg font-medium ml-5">Measuring Type</label>
                <select
                  className="md:w-[250px] sm:w-[150px] w-[100px] h-[30px] border border-gray-300 rounded-md bg-gray-100 text-gray-600 focus:outline-none px-3"
                  value={productMeasuringUnitType}
                  onChange={(e) => setProductMeasuringUnitType(e.target.value)}
                  required
                >
                  <option value="">--</option>
                  <option value="NUMBER">Number</option>
                  <option value="KG">Kg</option>
                  <option value="PACKET">Packet</option>
                </select>

                <label className="text-gray-700 text-lg font-medium ml-5">Unit Price (RS.)</label>
                <input
                  type="text"
                  value={price}
                  className="md:w-[250px] sm:w-[150px] w-[100px] h-[30px] px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600 focus:outline-none"
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  pattern="^\d+(\.\d{1,2})?$"
                  onInvalid={(e) => e.target.setCustomValidity("Please enter a valid price")}
                  onInput={(e) => e.target.setCustomValidity("")}
                />

                <label className="text-gray-700 text-lg font-medium ml-5">Photo</label>
                <div className="md:w-[250px] sm:w-[150px] w-[100px] h-[130px] border-2 border-gray-300 bg-gray-100 rounded-lg flex flex-col items-center justify-center cursor-pointer">
                  <label htmlFor="imageUpload" className="flex flex-col items-center">
                    {imageFile ? (
                      <img src={URL.createObjectURL(imageFile)} alt="Uploaded" className="w-50 h-20 object-contain" />
                    ) : (
                      <img src={UploadImage} alt="Upload preview" className="w-16 h-16 object-contain" />
                    )}
                    <span className="text-gray-600 mt-2">{imageFile ? "Photo Uploaded" : "Upload a Photo"}</span>
                  </label>
                  <input
                    id="imageUpload"
                    type="file"
                    name="file"
                    className="hidden"
                    onChange={(e) => setImageFile(e.target.files[0])}
                  />
                </div>

                <div></div>
                <div className="grid grid-cols-2 mt-7">
                  <button
                    className="md:w-[90px] sm:w-[75px] w-[25px] h-[44px] bg-pink-400 text-white font-semibold rounded-md border border-pink-600 hover:bg-pink-500"
                  >
                    {mode === "update" ? "Edit" : "Save"}
                  </button>

                  <div className="ml-8">
                    <button
                      type="button"
                      className="md:w-[90px] sm:w-[75px] w-[25px] h-[44px] bg-pink-400 text-white font-semibold rounded-md border border-pink-600 hover:bg-pink-500"
                      onClick={() => {
                        document.querySelector("form").reset();
                        setProductName('');
                        setProductCatagory('');
                        setProductMeasuringUnitType('');
                        setPrice('');
                        setImageFile(null);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>

          {errorMessage && (
            <div className="bg-red-500 text-white p-2 rounded mt-4">{errorMessage}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Item;
