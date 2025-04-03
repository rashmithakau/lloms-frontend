// import React from 'react'
// import CloseIcon from "../../assets/icons/closeButton.png"
// import UploadImage from "../../assets/icons/LoadImage.png"
// import { useState } from 'react';
// import { useEffect } from 'react';
// import axios from 'axios';

// export default function UpdateProduct({item, onClose}) {

//     const [product, setProduct] = useState({
//         productName: '',
//         productCatagory: '',
//         productMeasuringUnitType: '',
//         productStatus: true,
//         todayPrice: 0,
//         lastUpdatedPrice: 0,
//         lastUpdatedDate: '',
//         imageSrc: '',
//       });
    
//       useEffect(() => {
//         if (item) {
//           setProduct({
//             productName: item.productName,
//             productCatagory: item.productCatagory,
//             productMeasuringUnitType: item.productMeasuringUnitType,
//             productStatus: item.productStatus,
//             todayPrice: item.todayPrice ?? 0, // Ensure default to 0 if undefined
//             lastUpdatedPrice: item.lastUpdatedPrice,
//             lastUpdatedDate: item.lastUpdatedDate,
//             imageSrc: item.imageSrc || UploadImage,  // Default image if none
//           });
//         }
//       }, [item]);
    
//       const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setProduct((prevProduct) => ({
//           ...prevProduct,
//           [name]: value,
//         }));
//       };
    
//       const handleImageChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//           const reader = new FileReader();
//           reader.onloadend = () => {
//             setProduct((prevProduct) => ({
//               ...prevProduct,
//               imageSrc: reader.result,
//             }));
//           };
//           reader.readAsDataURL(file);
//         }
//       };
    
//       const handleSubmit = async (e) => {
//         e.preventDefault();
        
//         try {
//           // API call to update the product details
//           const response = await axios.put(
//             `http://localhost:8080/api/v1/product/get-by-id${item.id}`, // Replace with your API URL
//             {
//               productName: product.productName,
//               productCatagory: product.productCatagory,
//               productMeasuringUnitType: product.productMeasuringUnitType,
//               productStatus: product.productStatus,
//               todayPrice: product.todayPrice,
//               lastUpdatedPrice: product.lastUpdatedPrice,
//               lastUpdatedDate: product.lastUpdatedDate,
//               imageSrc: product.imageSrc, // If you're storing images as URLs or base64, include it here
//             }
//           );
    
//           console.log('Product updated successfully:', response.data);
//           onClose(); // Close the modal after successful update
//         } catch (error) {
//           console.error('Error updating product:', error);
//         }
//       };

//       const imageName = product.imageUrl
//           ? product.imageUrl.split("\\").pop()
//           : null;
//         const imageSrc = selectedImage
//           ? URL.createObjectURL(selectedImage)
//           : imageName
//           ? `http://localhost:8080/api/v1/product/url/${imageName}`
//           : UploadImage;
    
//   return (
//     <div>
//       <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center z-50">
//                     <div className="w-[600px] h-[660px] bg-white border border-gray-300 rounded-2xl shadow-lg shadow-gray-100 p-6 mt-3">
//                     <div className="flex justify-between">
//                       <div></div>
                      
//                     <div className="flex justify-center">
//                         <h1 className="text-pink-400 text-2xl font-bold">
//                             Update Product
//                         </h1>
//                     </div>
                      
//                     <div className="flex justify-end mr-1">
//                         <button onClick={onClose}>
//                             <img src={CloseIcon} alt="Close" className="w-6 h-6" />
//                         </button>
//                     </div>
                    
//                     </div>
      
//                     <form onSubmit={handleSubmit}>
//                     <div className="flex justify-center mt-3">
//                     <div className="grid grid-cols-2 gap-5">
//                           <label className="text-gray-700 text-lg font-medium ml-5">Product Name</label>
//                             <input
//                               className="md:w-[250px] sm:w-[150px] w-[100px] h-[30px] px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600 focus:outline-none"
//                               type="text"
//                               name="productName"
//                               value={product.productName}
//                               onChange={handleInputChange}
//                               required                       
//                             />
      
//                           <label className="text-gray-700 text-lg font-medium ml-5">Category</label>
//                             <select 
//                               className="md:w-[250px] sm:w-[150px] w-[100px] h-[30px] border border-gray-300 rounded-md bg-gray-100 text-gray-600 focus:outline-none px-3"
//                               name="productCatagory"
//                               value={product.productCatagory}
//                               onChange={handleInputChange}
//                             >
//                                 <option value="">--</option>
//                                 <option value="BREADS">Breads</option>
//                                 <option value="CAKES">Cakes</option>
//                                 <option value="BISCUITS">Biscuits</option>
//                                 <option value="SHORTIES">Shorties</option>
//                                 <option value="OTHER">Other</option>
//                             </select>
      
//                           <label className="text-gray-700 text-lg font-medium ml-5">Measuring Type</label>
//                             <select 
//                               className="md:w-[250px] sm:w-[150px] w-[100px] h-[30px] border border-gray-300 rounded-md bg-gray-100 text-gray-600 focus:outline-none px-3"
//                               name="productMeasuringUnitType"
//                               value={product.productMeasuringUnitType}
//                               onChange={handleInputChange}
//                             >
//                               <option value="">--</option>
//                               <option value="NUMBER">Number</option>
//                               <option value="KG">Kg</option>
//                               <option value="PACKET">Packet</option>
//                             </select>
      
//                           <label className="text-gray-700 text-lg font-medium ml-5">Status</label>
//                             <select 
//                               className="md:w-[250px] sm:w-[150px] w-[100px] h-[30px] border border-gray-300 rounded-md bg-gray-100 text-gray-600 focus:outline-none px-3"
//                               name="productStatus"
//                               value={product.productStatus.toString()}
//                               onChange={(e) =>
//                                   setProduct({
//                                   ...product,
//                                   productStatus: e.target.value === "true",
//                                   })
//                               }
//                             >
//                                   <option value="">--</option>
//                                   <option value="true">Active</option>
//                                   <option value="false">Inactive</option>
//                             </select>  
      
//                             <label className="text-gray-700 text-lg font-medium ml-5">Today Price (RS.)</label>
//                             <input
//                                 type="number"
//                                 name="todayPrice"
//                                 value={product.todayPrice}
//                                 className="md:w-[250px] sm:w-[150px] w-[100px] h-[30px] px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600 focus:outline-none"
//                                 readOnly
//                             />
      
//                           <label className="text-gray-700 text-lg font-medium ml-5">Latest Update Price (RS.)</label>
//                             <input
//                                  type="number"
//                                  name="lastUpdatedPrice"
//                                  value={product.lastUpdatedPrice}
//                                  onChange={handleInputChange}
//                                 className="md:w-[250px] sm:w-[150px] w-[100px] h-[30px] px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600 focus:outline-none"
//                                 required
//                             /> 
      
//                           <label className="text-gray-700 text-lg font-medium ml-5">Latest Update Date</label>
//                             <input
//                                 type="date"
//                                 name="lastUpdatedDate"
//                                 value={product.lastUpdatedDate}
//                                 onChange={handleInputChange}
//                                 className="md:w-[250px] sm:w-[150px] w-[100px] h-[30px] px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600 focus:outline-none"
//                                required
//                             /> 
      
//                           <label className="text-gray-700 text-lg font-medium ml-5">Photo</label>
//                             <div className="md:w-[250px] sm:w-[150px] w-[100px] h-[130px] border-2 border-gray-300 bg-gray-100 rounded-lg flex flex-col items-center justify-center cursor-pointer">
//                                 <label htmlFor="imageUpload" className="flex flex-col items-center">
//                                     <img
//                                       src={imageSrc}
//                                       alt="Product"
//                                       className="w-50 h-20 object-contain"
//                                     />
//                                 </label>
//                                     <input 
//                                           id="imageUpload" 
//                                           type="file"
//                                           onChange={handleImageChange}
//                                           name="file" 
//                                           className="hidden" 
//                                     />
//                             </div>
      
//                             <div></div>
      
//                             <div className="grid grid-cols-2 mt-7">
//                         <button
//                             className="md:w-[90px] sm:w-[75px] w-[25px] h-[44px] bg-pink-400 text-white font-semibold rounded-md border border-pink-600 hover:bg-pink-500">
//                             Save
//                         </button>
      
//                         <div className="ml-8">
//                             <button
//                                 className="md:w-[90px] sm:w-[75px] w-[25px] h-[44px] bg-pink-400 text-white font-semibold rounded-md border border-pink-600 hover:bg-pink-500"
//                                 type="button"
//                                 onClick={onClose}
//                             >
//                                 Cancel
//                             </button>
//                           </div>
//                           </div>
//                       </div>
//                     </div>
//                     </form>
                  
//                   </div>
//                 </div>
//     </div>
//   )
// }















import React, { useState, useEffect } from 'react';
import CloseIcon from "../../assets/icons/closeButton.png";
import UploadImage from "../../assets/icons/LoadImage.png";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById, updateProduct } from '../../api/product-service/productController';

export default function UpdateItem({ item, onClose }) {
  const id = item?.productId; // Use productId instead of id
  
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    productName: "",
    productCatagory: "SHORTIES",  // Default category
    productMeasuringUnitType: "NUMBER",  // Default unit type
    todayPrice: 0,
    lastUpdatedPrice: 0,
    productStatus: false,
    lastUpdatedDate: "",
    imageUrl: "",
  });
  
  const [selectedImage, setSelectedImage] = useState(null);

  const handleClose = () => {
    onClose(); // Close the popup
  };

  useEffect(() => {
    if (!id) return; // Prevent fetching if no ID is provided

    getProductById(id)
      .then((data) => {
        const formatDate = (date) => {
          const d = new Date(date);
          const year = d.getFullYear();
          const month = String(d.getMonth() + 1).padStart(2, "0");
          const day = String(d.getDate()).padStart(2, "0");
          return `${year}-${month}-${day}`;
        };

        const formattedProduct = {
          productName: data.productName || "",
          productCatagory: data.productCatagory || "SHORTIES",
          productMeasuringUnitType: data.productMeasuringUnitType || "NUMBER",
          todayPrice: data.todayPrice || 0,
          lastUpdatedPrice: data.lastUpdatedPrice || 0,
          productStatus: data.productStatus || false,
          lastUpdatedDate: data.lastUpdatedDate ? formatDate(data.lastUpdatedDate) : formatDate(new Date()),
          imageUrl: data.imageUrl || "",
        };

        setProduct(formattedProduct);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("productName", product.productName);
    formData.append("productCatagory", product.productCatagory);
    formData.append("productMeasuringUnitType", product.productMeasuringUnitType);
    formData.append("todayPrice", product.lastUpdatedPrice);
    formData.append("productStatus", product.productStatus);
    formData.append("date", product.lastUpdatedDate); // Corrected here
    
    if (selectedImage) {
      formData.append("imageFile", selectedImage);
    }

    try {
      const response = await updateProduct(id, formData);
      console.log("Update Response:", response);
      alert("Product updated successfully!");
      onClose(); // Close popup after successful update
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const imageName = product.imageUrl
    ? product.imageUrl.split("\\").pop()
    : null;
  
  const imageSrc = selectedImage
    ? URL.createObjectURL(selectedImage)
    : imageName
    ? `http://localhost:8080/api/v1/product/url/${imageName}`
    : UploadImage;

  return (
    <div>
      <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center z-50">
        <div className="w-[600px] h-[660px] bg-white border border-gray-300 rounded-2xl shadow-lg shadow-gray-100 p-6 mt-3">
          <div className="flex justify-between">
            <div className="flex justify-center">
              <h1 className="text-pink-400 text-2xl font-bold">Update Product</h1>
            </div>
            <div className="flex justify-end mr-1">
              <button onClick={handleClose}>
                <img src={CloseIcon} alt="Close" className="w-6 h-6" />
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="flex justify-center mt-3">
              <div className="grid grid-cols-2 gap-5">
                <label className="text-gray-700 text-lg font-medium ml-5">Product Name</label>
                <input
                  className="md:w-[250px] sm:w-[150px] w-[100px] h-[30px] px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600 focus:outline-none"
                  type="text"
                  name="productName"
                  value={product.productName}
                  onChange={handleInputChange}
                  required
                />

                <label className="text-gray-700 text-lg font-medium ml-5">Category</label>
                <select
                  className="md:w-[250px] sm:w-[150px] w-[100px] h-[30px] border border-gray-300 rounded-md bg-gray-100 text-gray-600 focus:outline-none px-3"
                  name="productCatagory"
                  value={product.productCatagory}
                  onChange={handleInputChange}
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
                  name="productMeasuringUnitType"
                  value={product.productMeasuringUnitType}
                  onChange={handleInputChange}
                >
                  <option value="">--</option>
                  <option value="NUMBER">Number</option>
                  <option value="KG">Kg</option>
                  <option value="PACKET">Packet</option>
                </select>

                <label className="text-gray-700 text-lg font-medium ml-5">Status</label>
                <select
                  className="md:w-[250px] sm:w-[150px] w-[100px] h-[30px] border border-gray-300 rounded-md bg-gray-100 text-gray-600 focus:outline-none px-3"
                  name="productStatus"
                  value={product.productStatus.toString()}
                  onChange={(e) =>
                    setProduct({
                      ...product,
                      productStatus: e.target.value === "true",
                    })
                  }
                >
                  <option value="">--</option>
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>

                <label className="text-gray-700 text-lg font-medium ml-5">Today Price (RS.)</label>
                <input
                  type="number"
                  name="todayPrice"
                  value={product.todayPrice}
                  className="md:w-[250px] sm:w-[150px] w-[100px] h-[30px] px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600 focus:outline-none"
                  readOnly
                />

                <label className="text-gray-700 text-lg font-medium ml-5">Latest Update Price (RS.)</label>
                <input
                  type="number"
                  name="lastUpdatedPrice"
                  value={product.lastUpdatedPrice}
                  onChange={handleInputChange}
                  className="md:w-[250px] sm:w-[150px] w-[100px] h-[30px] px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600 focus:outline-none"
                  required
                />

                <label className="text-gray-700 text-lg font-medium ml-5">Latest Update Date</label>
                <input
                  type="date"
                  name="lastUpdatedDate"
                  value={product.lastUpdatedDate}
                  onChange={handleInputChange}
                  className="md:w-[250px] sm:w-[150px] w-[100px] h-[30px] px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600 focus:outline-none"
                  required
                />

                <label className="text-gray-700 text-lg font-medium ml-5">Photo</label>
                <div className="md:w-[250px] sm:w-[150px] w-[100px] h-[130px] border-2 border-gray-300 bg-gray-100 rounded-lg flex flex-col items-center justify-center cursor-pointer">
                  <label htmlFor="imageUpload" className="flex flex-col items-center">
                    <img
                      src={imageSrc}
                      alt="Product"
                      className="w-50 h-20 object-contain"
                    />
                  </label>
                  <input
                    id="imageUpload"
                    type="file"
                    onChange={handleImageChange}
                    name="file"
                    className="hidden"
                  />
                </div>

                <div className="grid grid-cols-2 mt-7">
                  <button className="md:w-[90px] sm:w-[75px] w-[25px] h-[44px] bg-pink-400 text-white font-semibold rounded-md border border-pink-600 hover:bg-pink-500">
                    Save
                  </button>

                  <div className="ml-8">
                    <button
                      className="md:w-[90px] sm:w-[75px] w-[25px] h-[44px] bg-pink-400 text-white font-semibold rounded-md border border-pink-600 hover:bg-pink-500"
                      type="button"
                      onClick={handleClose}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
