import uploadImage from "../../assets/icons/LoadImage.png";

const ImageUploadField = () => {
    return (
      <div className="md:w-[400px] sm:w-[300px] w-[200px] h-[200px] border-2 border-gray-300 bg-gray-100 rounded-lg flex flex-col items-center justify-center cursor-pointer">
        <label htmlFor="imageUpload" className="flex flex-col items-center">
          {/* Display Imported Image */}
          <img src={uploadImage} alt="Upload Preview" className="w-16 h-16 object-contain" />
  
          <span className="text-gray-600 mt-2">Upload a Photo</span>
        </label>
        <input id="imageUpload" type="file" className="hidden" />
      </div>
    );
  };
  
  export default ImageUploadField;