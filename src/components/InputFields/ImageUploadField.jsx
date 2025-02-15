import uploadImage from "/src/assets/icons/LoadImage.png"; // Import your image

const ImageUploadField = () => {
  return (
    <div className="md:w-[250px] sm:w-[150px] w-[100px] h-[130px] border-2 border-gray-300 bg-gray-100 rounded-lg flex flex-col items-center justify-center cursor-pointer">
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
