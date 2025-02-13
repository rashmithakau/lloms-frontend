import CloseButton from "./buttons/CloseButton";
import LabelComponent from "./InputFields/LabelComponent";
import TextField from "./InputFields/TextField";
import DropdownField from "./InputFields/DropdownField";
import ImageUploadField from "./InputFields/ImageUploadField";
import CustomButton from "./buttons/CustomButton";

const Item = ({onClose, mode}) => {

    

  return (

    <div>
    <div className="flex justify-center">
   <div className="w-[600px] h-[500px] bg-white border border-pink-300 rounded-2xl shadow-lg shadow-pink-300 p-6 mt-3">
    <div className="flex justify-between">
      <div></div>
   <div className="flex justify-center">
      <h1 className="text-pink-400 text-2xl font-bold">{mode === "view" ? "Product Details" : "Add New Item"}</h1>
      </div>
      <div className="flex justify-end mr-1">
      <CloseButton onClick={()=>onClose()}/>
      </div>
      </div>
      
    <div className="flex justify-center mt-3">

    
    
    
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
    <CustomButton text={mode === "view" ? "Edit" : "Save"} bgColor="bg-pink-400" textColor="text-white" borderColor="border-pink-600" hoverColor="bg-pink-500" />
    <div className="ml-8">
    <CustomButton text="Cancel" bgColor="bg-gray-100" textColor="text-pink-400" borderColor="border-pink-600" hoverColor="bg-gray-600" />
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>
  );
};

export default Item;