import { useState } from "react";
import CloseIcon from "../assets/icons/closeButton.png" 
import UploadImage from "../assets/icons/LoadImage.png"
import { addProduct } from "../api/product-service/productController";

function Item({onClose, mode}) {
    
    
    const [productName, setProductName] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const [productMeasuringUnitType, setProductMeasuringUnitType] = useState('');
    const [price, setPrice] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const handleSubmit = async (e) => {
      e.preventDefault();
      
      const formData = new FormData();
      formData.append("productName", productName);
      formData.append("productCategory", productCategory);
      formData.append("productMeasuringUnitType", productMeasuringUnitType);
      formData.append("price", price);
      formData.append("ImageFile", imageFile);
    
      try {
        const response = await addProduct(formData);
        if (response.status === 201) {
          alert("Product is Added Successfully!");
          onClose(); // Close modal after successful submission
        }
      } catch (error) {
        setErrorMessage("Error while saving the product. Please try again.");
        console.error("Error adding product:", error);
      }
    };

    return(
        <div>
            
        <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center z-50">
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
                    onChange={(e)=>{setProductName(e.target.value)}}
                    required
                />
            
            <label className="text-gray-700 text-lg font-medium ml-5">Category</label>
                <select 
                className="md:w-[250px] sm:w-[150px] w-[100px] h-[30px] border border-gray-300 rounded-md bg-gray-100 text-gray-600 focus:outline-none px-3"
                value={productCategory} 
                onChange={(e)=>{setProductCategory(e.target.value)}}
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
                onChange={(e)=>{setProductMeasuringUnitType(e.target.value)}}
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
                    onChange={(e)=>setPrice(e.target.value)}
                    required
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
                            onChange={(e)=>{setImageFile(e.target.files[0])}} 
                        />
                </div>

            <div></div>
            
            <div className="grid grid-cols-2 mt-7">
            <button
                className="md:w-[90px] sm:w-[75px] w-[25px] h-[44px] bg-pink-400 text-white font-semibold rounded-md border border-pink-600 hover:bg-pink-500">
                {mode === "update" ? "Edit" : "Save"}
            </button>
              
            <div className="ml-8">
            <button
                    className="md:w-[90px] sm:w-[75px] w-[25px] h-[44px] bg-pink-400 text-white font-semibold rounded-md border border-pink-600 hover:bg-pink-500"
                    onClick={() => {
                      setProductName('');
                      setProductCategory('');
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
        {errorMessage && <div className="bg-red-500 text-white p-2 rounded mb-4">{errorMessage}</div>}
      </div>
    </div>
    </div>
  );
};
export default Item;