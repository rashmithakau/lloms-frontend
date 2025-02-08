const DropdownField = ({ options, selectedValue }) => {
    return (
      <select
        value={selectedValue}
        className="w-[400px] h-[40px] px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600 focus:outline-none"
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  };
  
  export default DropdownField;