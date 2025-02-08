import CloseButton from "../components/buttons/CloseButton";
import LabelComponent from "../components/InputFields/LabelComponent";
import TextField from "../components/InputFields/TextField";
import DropdownField from "../components/InputFields/DropdownField";
import ImageUploadField from "../components/InputFields/ImageUploadField";
import CustomButton from "../components/buttons/CustomButton";

const AddNewItem = () => {
    return (
      <div>
      
        <div className="flex justify-end mr-1 mt-1">
        <CloseButton/>
        </div>
        
        <div className="flex justify-center">
        <h1 className="text-pink-400 text-2xl font-bold">Add New Item</h1>
        </div>
      <div className="flex justify-center mt-3">

      
      <div className="w-[950px] h-[550px] bg-white border border-gray-300 rounded-lg shadow-lg p-6">
       
        <div className="grid grid-cols-2 gap-5">
      <LabelComponent label="Product ID"/>
      <TextField type="text" value="PD/1052"  />
      <LabelComponent label="Product Name"/>
      <TextField type="text" value="Butter Cake"  />
      <LabelComponent label="Measuring Type"/>
      <DropdownField options={["KG", "LBS", "Units"]} selectedValue="KG"/>

      <LabelComponent label="Unit Price (RS.)"/>
      <TextField type="currency" value="100.00" />
      <LabelComponent label="Photo"/>
      <ImageUploadField/>
      <div></div>
      <div className="grid grid-cols-2 mt-7">
      <CustomButton text="Save" bgColor="bg-pink-400" textColor="text-white" borderColor="border-pink-600" hoverColor="bg-pink-500" />
      <div className="ml-4">
      <CustomButton text="Cancel" bgColor="bg-gray-100" textColor="text-pink-400" borderColor="border-pink-600" hoverColor="bg-gray-600" />
      </div>
      </div>
      </div>
      </div>
      </div>
      </div>
    );
  };
  
  export default AddNewItem;